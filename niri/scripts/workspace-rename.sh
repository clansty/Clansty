#!/usr/bin/env bash
# 给当前 niri workspace 重命名
# 依赖: fuzzel (Wayland dmenu)
# 用法: 弹输入框，预填当前名称；空字符串提交 = 清除；ESC = 取消

set -eu

current=$(niri msg --json workspaces \
    | python3 -c 'import sys,json; ws=[w for w in json.load(sys.stdin) if w.get("is_focused")]; print(ws[0].get("name") or "" if ws else "")')

if name=$(printf '' | fuzzel --dmenu --lines 0 \
        --prompt '工作区名称: ' \
        --search "$current" \
        --placeholder '留空以清除名称'); then
    if [ -n "$name" ]; then
        niri msg action set-workspace-name "$name"
    else
        niri msg action unset-workspace-name
    fi
fi
