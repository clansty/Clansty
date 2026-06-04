# History: keep per-session ↑↓ navigation
# Commands still save to file immediately, but other windows' new commands
# won't appear until next shell start
unsetopt share_history
setopt inc_append_history

# Environment
export EDITOR="nvim"
export SUDOEDITOR="nvim"

# PATH
[[ -d /opt/bin ]] && export PATH="/opt/bin:$PATH"
[[ -d "$HOME/.cargo/bin" ]] && export PATH="$HOME/.cargo/bin:$PATH"
[[ -d "$HOME/.local/bin" ]] && export PATH="$HOME/.local/bin:$PATH"

# sudo wrapper: skip sudo if already root
s() {
    if [[ $EUID -ne 0 ]]; then
        sudo "$@"
    else
        "$@"
    fi
}

# Aliases
alias la='ls -la'
alias ll='ls -l'
alias pull='git pull'
alias vi='nvim'
# alias rm='gio trash'
alias df='df -h'

# Tool replacements (guarded)
(( $+commands[dog] ))    && alias dig='dog'
(( $+commands[gping] ))  && alias ping='gping'
(( $+commands[curlie] )) && alias curl='curlie'

# Docker
alias docker-ip="docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'"
alias dockers="docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'"

# Network / systemd
alias ip='s ip -color -human-readable -pretty'
alias ipa='s ip -color -human-readable -pretty -brief a'
alias wg='s wg'
alias sctl='s systemctl'
alias sctlu='systemctl --user'
alias jctl='s journalctl'
alias jctlu='journalctl --user-unit'
alias dpkg='s dpkg'
alias apt='s apt'
alias pacman='s pacman'

alias codex='codex --dangerously-bypass-approvals-and-sandbox'
alias claude='claude --dangerously-skip-permissions'


# Nix
nrb() {
    if (( $+commands[nom] )); then
        s nixos-rebuild switch --flake "path:$HOME/nixos" --log-format internal-json -v -L "$@" |& nom --json
    else
        s nixos-rebuild switch --flake "path:$HOME/nixos" -v -L "$@"
    fi
}
alias nrbu='nrb --recreate-lock-file'
alias ngc='s nix-collect-garbage -d'

# Git helpers
gacp() {
    git add . && git commit -m "$*" && git push
}

gac() {
    git add . && git commit -m "$*"
}

# Arch
updsrcinfo() {
    makepkg --printsrcinfo > .SRCINFO
}
