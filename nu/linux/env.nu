$env.EDITOR = "nvim"
$env.SUDOEDITOR = "nvim"

use std "path add"
path add /opt/bin
path add $"($env.HOME)/.cargo/bin"
path add $"($env.HOME)/.local/bin"
