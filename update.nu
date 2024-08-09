if ($env.HOME | path join rc | path exists) == false {
    exit
}

cd ($env.HOME | path join rc)
git fetch origin --quiet
let reslog = git log HEAD..origin/main --oneline

if $reslog != "" {
    echo $"(ansi red)Updating rc(ansi reset)"
    git pull
}
