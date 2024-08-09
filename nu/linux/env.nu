alias ip = ip -color -human-readable -pretty
alias ipa = ip -brief a
alias sctl = sudo systemctl
alias sctlu = systemctl --user
alias jctl = sudo journalctl
alias jctlu = journalctl --user-unit
alias apt = sudo apt
alias dpkg = sudo dpkg
alias df = df -h

use std "path add"
path add $env.HOME/.local/bin
path add $env.HOME/.cargo/bin
