if ($env.HOME | path join rc | path exists) == false {
    exit
}

cd ($env.HOME | path join rc)
git fetch origin --quiet
let reslog = git log HEAD..origin/main --oneline

if $reslog != "" {
    print $"\r\n>> (ansi red)Updating rc(ansi reset) <<\r"
    git -c 'color.ui=true' pull o+e>| str replace --all "\n" "\r\n" | str replace --all "+" $"(ansi green)+(ansi reset)" | str replace --all "-" $"(ansi red)-(ansi reset)" | print
    print "\r"
}
