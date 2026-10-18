#!/bin/bash
# 诊断 tmux 内的扩展键：请求 kitty keyboard protocol 后打印收到的原始字节
# 用法：在 tmux pane 里运行，按 Shift+Enter，看是否出现 ^[[13;2u
printf '\e[>1u'                 # push flags=1（disambiguate escape codes），即 Claude Code 做的事
printf '\e[?u'                  # 查询当前 flags
printf 'TERM=%s  client_features=%s\r\n' "$TERM" "$(tmux display -p '#{client_termfeatures}' 2>/dev/null)"
printf '现在按 Shift+Enter（期望 ^[[13;2u），按 Ctrl+C 退出\r\n'
stty raw -echo
cat -v
