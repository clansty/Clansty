#!/usr/bin/env bash

set -Eeuo pipefail

readonly REPO_URL="${RC_REPO_URL:-https://github.com/Clansty/Clansty.git}"
readonly DEFAULT_RC_DIR="${RC_REPO_DIR:-$HOME/rc}"

as_root() {
    if (( EUID == 0 )); then
        "$@"
    elif command -v sudo >/dev/null 2>&1; then
        sudo "$@"
    else
        echo "需要 root 权限安装系统包，但当前系统没有 sudo。" >&2
        exit 1
    fi
}

install_system_packages() {
    if command -v apt-get >/dev/null 2>&1; then
        as_root apt-get update
        as_root env DEBIAN_FRONTEND=noninteractive apt-get install -y \
            ca-certificates curl git zsh neovim ripgrep bat fd-find unzip
    elif command -v pacman >/dev/null 2>&1; then
        as_root pacman -Sy --needed --noconfirm \
            ca-certificates curl git zsh neovim ripgrep bat fd unzip
    else
        echo "暂不支持当前包管理器；目前支持 Debian/Ubuntu 和 Arch Linux。" >&2
        exit 1
    fi
}

resolve_rc_dir() {
    local script_dir
    script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" 2>/dev/null && pwd -P)"

    # 从仓库内执行时复用当前副本，避免安装脚本擅自更新工作区。
    if [[ -f "$script_dir/zsh/rc.zsh" ]]; then
        printf '%s\n' "$script_dir"
        return
    fi

    if [[ ! -e "$DEFAULT_RC_DIR" ]]; then
        git clone "$REPO_URL" "$DEFAULT_RC_DIR" >&2
    elif [[ ! -f "$DEFAULT_RC_DIR/zsh/rc.zsh" ]]; then
        echo "$DEFAULT_RC_DIR 已存在，但不是预期的 rc 仓库。" >&2
        exit 1
    fi

    printf '%s\n' "$(cd -- "$DEFAULT_RC_DIR" && pwd -P)"
}

clone_or_update() {
    local url="$1"
    local target="$2"

    if [[ ! -e "$target" ]]; then
        git clone --depth=1 "$url" "$target"
    elif [[ -d "$target/.git" ]]; then
        git -C "$target" pull --ff-only
    else
        echo "$target 已存在且不是 Git 仓库，无法安全更新。" >&2
        exit 1
    fi
}

install_zsh_components() {
    local zsh_custom="$HOME/.oh-my-zsh/custom"

    clone_or_update https://github.com/ohmyzsh/ohmyzsh.git "$HOME/.oh-my-zsh"
    clone_or_update https://github.com/romkatv/powerlevel10k.git "$zsh_custom/themes/powerlevel10k"
    clone_or_update https://github.com/zsh-users/zsh-autosuggestions.git "$zsh_custom/plugins/zsh-autosuggestions"
    clone_or_update https://github.com/zsh-users/zsh-syntax-highlighting.git "$zsh_custom/plugins/zsh-syntax-highlighting"
    clone_or_update https://github.com/zsh-users/zsh-history-substring-search.git "$zsh_custom/plugins/zsh-history-substring-search"
    clone_or_update https://github.com/junegunn/fzf.git "$HOME/.fzf"
    "$HOME/.fzf/install" --bin
}

link_config() {
    local source="$1"
    local target="$2"
    local backup

    if [[ -L "$target" ]] && [[ "$(readlink -f "$target")" == "$(readlink -f "$source")" ]]; then
        return
    fi

    if [[ -e "$target" || -L "$target" ]]; then
        backup="$target.before-rc-$(date +%Y%m%d-%H%M%S)"
        mv -- "$target" "$backup"
        echo "已备份 $target 到 $backup"
    fi

    ln -s "$source" "$target"
}

install_command_aliases() {
    mkdir -p "$HOME/.local/bin"

    if command -v batcat >/dev/null 2>&1 && ! command -v bat >/dev/null 2>&1; then
        ln -sfn "$(command -v batcat)" "$HOME/.local/bin/bat"
    fi
    if command -v fdfind >/dev/null 2>&1 && ! command -v fd >/dev/null 2>&1; then
        ln -sfn "$(command -v fdfind)" "$HOME/.local/bin/fd"
    fi
}

set_default_shell() {
    local zsh_path target_user
    zsh_path="$(command -v zsh)"
    target_user="${SUDO_USER:-$(id -un)}"

    if ! grep -Fxq "$zsh_path" /etc/shells; then
        printf '%s\n' "$zsh_path" | as_root tee -a /etc/shells >/dev/null
    fi

    if [[ "$(getent passwd "$target_user" | cut -d: -f7)" != "$zsh_path" ]]; then
        as_root chsh -s "$zsh_path" "$target_user"
    fi
}

main() {
    local rc_dir

    install_system_packages
    rc_dir="$(resolve_rc_dir)"
    install_zsh_components
    install_command_aliases
    link_config "$rc_dir/zsh/zshrc.zsh" "$HOME/.zshrc"
    link_config "$rc_dir/zsh/.p10k.zsh" "$HOME/.p10k.zsh"
    set_default_shell

    echo "zsh 环境已初始化。重新登录，或执行 exec zsh。"
}

main "$@"
