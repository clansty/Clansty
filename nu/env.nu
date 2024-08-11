$env.ENV_CONVERSIONS = {
    "PATH": {
        from_string: { |s| $s | split row (char esep) | path expand --no-symlink }
        to_string: { |v| $v | path expand --no-symlink | str join (char esep) }
    }
    "Path": {
        from_string: { |s| $s | split row (char esep) | path expand --no-symlink }
        to_string: { |v| $v | path expand --no-symlink | str join (char esep) }
    }
}

def s --wrapped [cmd, ...args] {
    if $env.USER != root {
        sudo $cmd ...$args
    } else {
        run-external $cmd ...$args
    }
}

alias la = ls -la
alias ll = ls -l

alias g = git
alias pull = g pull
alias grep = find
alias rm = rm --trash --recursive
alias dig = dog
alias ping = gping
alias curl = curlie
alias vi = nvim

alias docker-ip = docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
alias dockers = docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'

alias ip = s ip -color -human-readable -pretty
alias ipa = ip -brief a
alias wg = s wg
alias sctl = s systemctl
alias sctlu = systemctl --user
alias jctl = s journalctl
alias jctlu = journalctl --user-unit
alias apt = s apt
alias dpkg = s dpkg
alias df = df -h
alias yay = paru

def nrb --wrapped [...args] {
    s nixos-rebuild switch --flake $"path:($env.HOME)/nixos" --log-format internal-json -v -L ...$args o+e>| nom --json
}
alias nrbu = nrb '--recreate-lock-file'
alias ngc = s nix-collect-garbage -d

def gacp [...message: string] {
    git add .
    git commit -m ($message | str join " ")
    git push
}

def gac [...message: string] {
    git add .
    git commit -m ($message | str join " ")
}

def "from env" []: string -> record {
  lines 
    | split column '#' 
    | get column1 
    | filter {($in | str length) > 0} 
    | parse "{key}={value}"
    | update value {str trim -c '"'}
    | transpose -r -d
}

# 防止为空时报错
if (sys host).name? == 'Windows' {
    source windows/env.nu
} else {
    source linux/env.nu
}
