Invoke-Expression (&starship init powershell)

Set-PSReadLineKeyHandler -Chord Alt+Backspace -Function BackwardKillWord
Set-PSReadLineKeyHandler -Chord Alt+LeftArrow -Function BackwardWord
Set-PSReadLineKeyHandler -Chord Alt+RightArrow -Function NextWord

Set-PSReadLineKeyHandler -Chord Ctrl+D -ScriptBlock {
    exit
}

Set-Alias history psch

# 从 env.nu 转换的 alias
Set-Alias la Get-ChildItem -Force
Set-Alias ll Get-ChildItem -Force

Set-Alias g git
Set-Alias pull "git pull"
Set-Alias grep find
Set-Alias dig dog
Set-Alias ping gping
Set-Alias curl curlie
Set-Alias vi nvim

# Docker aliases
function docker-ip {
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $args
}
function dockers {
    docker ps --format 'table {{.Names}}`t{{.Image}}`t{{.Status}}'
}

# System aliases
function ip {
    if ($IsWindows) {
        ipconfig
    } else {
        ip -color -human-readable -pretty
    }
}
function ipa {
    if ($IsWindows) {
        ipconfig /all
    } else {
        ip -brief a
    }
}
Set-Alias wg wg
Set-Alias sctl systemctl
Set-Alias sctlu "systemctl --user"
Set-Alias jctl journalctl
Set-Alias jctlu "journalctl --user-unit"
Set-Alias apt apt
Set-Alias dpkg dpkg
Set-Alias df Get-Volume
Set-Alias yay paru

# Git functions
function gacp {
    param([string[]]$message)
    git add .
    git commit -m ($message -join " ")
    git push
}

function gac {
    param([string[]]$message)
    git add .
    git commit -m ($message -join " ")
}

# 其他函数
function updsrcinfo {
    makepkg --printsrcinfo | Out-File -FilePath .SRCINFO -Force
} 