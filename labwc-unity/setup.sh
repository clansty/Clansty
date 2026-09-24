#!/usr/bin/env bash
set -euo pipefail

if [[ $# != 2 || ( $1 != install && $1 != uninstall ) ]]; then
    printf '用法：setup.sh install|uninstall /完整路径/Editor/Unity\n' >&2
    exit 2
fi

action=$1
editor_dir=$(cd -- "$(dirname -- "$2")" && pwd)
if [[ $(basename -- "$2") != Unity ]]; then
    printf '请指定 Editor/Unity 文件。\n' >&2
    exit 2
fi
editor="$editor_dir/Unity"
backup="$editor.real"
script_dir=$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")
wrapper="$script_dir/editor-wrapper"

if [[ $action == install ]]; then
    if [[ -L $editor || ! -f $editor || ! -x $editor || -e $backup || -L $backup ]]; then
        printf '未修改：Unity 不是普通可执行文件，或已有软链接/备份。\n' >&2
        exit 1
    fi
    mv -- "$editor" "$backup"
    if ! ln -s -- "$wrapper" "$editor"; then
        mv -- "$backup" "$editor"
        exit 1
    fi
    printf '已安装：%s\n原程序：%s\n' "$editor" "$backup"
else
    if [[ ! -L $editor || $(readlink -f -- "$editor") != "$wrapper" || ! -f $backup || ! -x $backup ]]; then
        printf '未修改：启动入口不是本 wrapper，或原程序备份不存在。\n' >&2
        exit 1
    fi
    mv -Tf -- "$backup" "$editor"
    printf '已恢复：%s\n' "$editor"
fi
