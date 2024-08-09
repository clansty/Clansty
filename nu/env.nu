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

alias la = ls -la
alias ll = ls -l

alias g = git
alias grep = find
alias rm = rm --trash --recursive
alias dig = dog
alias ping = gping
alias curl = curlie
alias vi = nvim

alias docker-ip = docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
alias dockers = docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'

if (which nixos-rebuild | is-not-empty) {
    def nrb [...args] {
        sudo nixos-rebuild switch --flake $"path:($env.HOME)/nixos" --log-format internal-json -v -L $args o+e>| nom --json
    }
    alias nrbu = nrb '--recreate-lock-file'
    alias ngc = sudo nix-collect-garbage -d
}

if (which paru | is-not-empty) {
    alias yay = paru
}

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
if (sys host | select -i name).name == 'Windows' {
    source windows/env.nu
} else {
    source linux/env.nu
}
