# Powerlevel10k 的即时提示必须尽早载入，才能避免 shell 启动时出现明显延迟。
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# 通过真实文件路径定位仓库，允许 rc 仓库不放在固定目录。
typeset -gx RC_DIR=${${(%):-%N}:A:h:h}
export ZSH="${ZSH:-$HOME/.oh-my-zsh}"
[[ -d "$HOME/.fzf/bin" ]] && export PATH="$HOME/.fzf/bin:$PATH"

ZSH_THEME="powerlevel10k/powerlevel10k"
DISABLE_MAGIC_FUNCTIONS="true"
ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"
plugins=(
  git
  fzf
  extract
  zsh-autosuggestions
  zsh-history-substring-search
  zsh-syntax-highlighting
)

if [[ ! -r "$ZSH/oh-my-zsh.sh" ]]; then
  print -u2 "找不到 $ZSH/oh-my-zsh.sh，请先运行 $RC_DIR/setup-zsh.sh"
  return 1
fi

source "$ZSH/oh-my-zsh.sh"
source "$RC_DIR/zsh/rc.zsh"
[[ -r "$RC_DIR/shell/gpg-agent-env.sh" ]] && source "$RC_DIR/shell/gpg-agent-env.sh"
[[ -r "$HOME/.p10k.zsh" ]] && source "$HOME/.p10k.zsh"

# 机器专属环境变量不应进入公共 rc 仓库。
[[ -r "$HOME/.zshrc.local" ]] && source "$HOME/.zshrc.local"
