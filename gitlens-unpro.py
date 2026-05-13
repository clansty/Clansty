#!/usr/bin/env python3
# 用结构化锚点（plan-id 字面量、SubscriptionState 枚举关键字）
# 替代脆弱的单字母变量名，跨 minify 版本稳定；幂等可还原。

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

DEFAULT_EXT_GLOBS = [
    "~/.cursor/extensions/eamodio.gitlens-*",
    "~/.vscode/extensions/eamodio.gitlens-*",
    "~/.vscode-insiders/extensions/eamodio.gitlens-*",
    "~/.vscode-server/extensions/eamodio.gitlens-*",
    "~/.cursor-server/extensions/eamodio.gitlens-*",
    "~/.windsurf/extensions/eamodio.gitlens-*",
    "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/eamodio.gitlens-*",
]


def find_extensions() -> list[Path]:
    found: list[Path] = []
    for pat in DEFAULT_EXT_GLOBS:
        for hit in glob.glob(os.path.expanduser(pat)):
            p = Path(hit)
            if (p / "dist" / "gitlens.js").exists():
                found.append(p)
    return sorted(set(found))


PATCH_MARKER = "/*__unpro__*/"


class PatchError(RuntimeError):
    pass


def _replace_unique(src: str, pattern: re.Pattern, replacement, label: str) -> str:
    matches = pattern.findall(src)
    if len(matches) == 0:
        raise PatchError(f"[{label}] pattern not found")
    if len(matches) > 1:
        raise PatchError(f"[{label}] pattern matched {len(matches)} times, expected 1")
    return pattern.sub(replacement, src, count=1)


def patch_paid_plan_check(src: str) -> str:
    # 锚点：先在源码里找付费 plan 字面量数组的绑定名，
    # 再匹配「函数体只是 return <绑定名>.includes(参数)」的函数。
    # 这种数组字面量在重大重构前不会变。
    plans_re = re.compile(
        r'([A-Za-z_$][\w$]*)=\["student","pro","advanced","teams","enterprise"\]'
    )
    m = plans_re.search(src)
    if not m:
        raise PatchError("paid plans array not found")
    arr_name = m.group(1)

    fn_re = re.compile(
        r"function (?P<fn>[A-Za-z_$][\w$]*)\((?P<p>[A-Za-z_$][\w$]*)\)\{return "
        + re.escape(arr_name)
        + r"\.includes\((?P=p)\)\}"
    )
    return _replace_unique(
        src,
        fn_re,
        lambda m: f"function {m.group('fn')}({m.group('p')}){{return !0{PATCH_MARKER}}}",
        "isSubscriptionPaidPlan",
    )


def patch_compute_state(src: str) -> str:
    # 锚点：解构 account+plan、并对 account?.verified===!1 立刻
    # return ...VerificationRequired 的函数（即 computeSubscriptionState）。
    # 在原 verification 短路之后注入 `return ...Paid;`，剩余分支自然成为
    # 死代码，避免改动后续巨大 switch，降低破坏面。
    pat = re.compile(
        r"(function (?P<fn>[A-Za-z_$][\w$]*)\((?P<p>[A-Za-z_$][\w$]*)\)\{"
        r"let\{account:[^,]+,plan:\{actual:[^,]+,effective:[^}]+\}\}=(?P=p);"
        r"if\([^)]*\?\.verified===!1\)return (?P<enum>[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*)\.VerificationRequired;)"
    )
    matches = pat.findall(src)
    if len(matches) == 0:
        raise PatchError("[computeSubscriptionState] anchor not found")
    if len(matches) > 1:
        raise PatchError(
            f"[computeSubscriptionState] anchor matched {len(matches)} times"
        )
    return pat.sub(
        lambda m: f"{m.group(1)}return {m.group('enum')}.Paid;{PATCH_MARKER}",
        src,
        count=1,
    )


def patch_trial_or_paid(src: str) -> str:
    # 兜底：webview 等地方对 state 做 Trial||Paid 的防御性检查；
    # 放宽为「非空即真」防止遗漏路径退回到 Community 文案。
    pat = re.compile(
        r"function (?P<fn>[A-Za-z_$][\w$]*)\((?P<p>[A-Za-z_$][\w$]*)\)\{return null!=(?P=p)&&\((?P=p)===[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\.Trial\|\|(?P=p)===[A-Za-z_$][\w$]*\.[A-Za-z_$][\w$]*\.Paid\)\}"
    )
    return _replace_unique(
        src,
        pat,
        lambda m: f"function {m.group('fn')}({m.group('p')}){{return null!={m.group('p')}{PATCH_MARKER}}}",
        "isSubscriptionStateTrialOrPaid",
    )


PATCHES = [
    ("isSubscriptionPaidPlan", patch_paid_plan_check),
    ("computeSubscriptionState", patch_compute_state),
    ("isSubscriptionStateTrialOrPaid", patch_trial_or_paid),
]


def patch_file(path: Path, *, dry_run: bool = False, verify: bool = True) -> bool:
    src = path.read_text(encoding="utf-8")

    if PATCH_MARKER in src:
        print("  ✓ already patched, skipping")
        return True

    new_src = src
    for label, fn in PATCHES:
        try:
            new_src = fn(new_src)
            print(f"  ✓ {label}")
        except PatchError as e:
            print(f"  ✗ {label}: {e}", file=sys.stderr)
            return False

    if verify:
        tmp = path.parent / f"{path.stem}.unpro-check.js"
        tmp.write_text(new_src, encoding="utf-8")
        try:
            r = subprocess.run(
                ["node", "--check", str(tmp)],
                capture_output=True,
                text=True,
            )
            if r.returncode != 0:
                print(f"  ✗ node --check failed:\n{r.stderr}", file=sys.stderr)
                return False
        except FileNotFoundError:
            print("  ! node not found, skipping syntax check", file=sys.stderr)
        finally:
            tmp.unlink(missing_ok=True)

    if dry_run:
        print("  (dry-run, not writing)")
        return True

    bak = path.with_suffix(".js.bak")
    if not bak.exists():
        shutil.copy2(path, bak)
        print(f"  → backup: {bak.name}")
    path.write_text(new_src, encoding="utf-8")
    print(f"  → wrote {path}")
    return True


def restore_file(path: Path) -> bool:
    bak = path.with_suffix(".js.bak")
    if not bak.exists():
        print(f"  ✗ no backup at {bak}", file=sys.stderr)
        return False
    shutil.copy2(bak, path)
    print(f"  ↩ restored from {bak.name}")
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description="Patch GitLens to bypass Pro gating.")
    ap.add_argument(
        "paths",
        nargs="*",
        help="Extension dirs (or gitlens.js paths). Auto-detected if omitted.",
    )
    ap.add_argument("--restore", action="store_true", help="Restore .bak files")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-verify", action="store_true", help="Skip node --check")
    args = ap.parse_args()

    targets: list[Path] = []
    if args.paths:
        for raw in args.paths:
            p = Path(os.path.expanduser(raw))
            if p.is_file():
                targets.append(p)
            elif (p / "dist" / "gitlens.js").exists():
                targets.append(p / "dist" / "gitlens.js")
            else:
                print(f"skip {p}: not a gitlens extension", file=sys.stderr)
    else:
        for ext in find_extensions():
            targets.append(ext / "dist" / "gitlens.js")

    if not targets:
        print("no GitLens installations found", file=sys.stderr)
        return 1

    fails = 0
    for t in targets:
        try:
            ver = json.loads((t.parent.parent / "package.json").read_text())["version"]
        except Exception:
            ver = "?"
        print(f"\n[{ver}] {t}")
        try:
            ok = (
                restore_file(t)
                if args.restore
                else patch_file(t, dry_run=args.dry_run, verify=not args.no_verify)
            )
            if not ok and not args.restore:
                fails += 1
        except Exception as e:
            print(f"  ✗ unexpected error: {e}", file=sys.stderr)
            fails += 1

    print()
    if fails:
        print(f"done with {fails} failure(s)", file=sys.stderr)
        return 2
    print("done. restart your editor to apply.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
