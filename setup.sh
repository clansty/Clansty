#!/usr/bin/env bash

s() {
    if [ "$EUID" -ne 0 ]; then
        sudo "$@"
    else
        "$@"
    fi
}

has() {
    command -v "$1" &> /dev/null
}

install-package() {
    if has pacman; then
        s pacman -Sy --needed "$1"
    elif has apt; then
        s apt install -y "$1"
    elif has dnf; then
        s dnf install "$1"
    elif has brew; then
        brew install "$1"
    fi
}

install-package git curl wget neovim ripgrep duf bat gping gdu

mkdir -p ~/.local/bin

if has pacman; then
    if ! has paru; then
        pushd /tmp
        s pacman -S --needed base-devel
        git clone https://aur.archlinux.org/paru.git
        cd paru
        makepkg -si
        popd
    fi
    paru -Sy --needed starship nushell carapace-bin dog curlie fd
elif has apt; then
    echo "deb [trusted=yes] https://apt.fury.io/rsteube/ /" | s tee /etc/apt/sources.list.d/rsteube.list
    curl -sS https://starship.rs/install.sh | sh -- --bin-dir ~/.local/bin
    curl -s https://packagecloud.io/install/repositories/Inveracity/nushell/script.deb.sh | s bash
    curl -sS https://webi.sh/curlie | sh
    install-package fd-find nushell carapace-bin
    pushd /tmp
    wget https://github.com/ogham/dog/releases/download/v0.1.0/dog-v0.1.0-x86_64-unknown-linux-gnu.zip
    unzip dog-v0.1.0-x86_64-unknown-linux-gnu.zip
    mv bin/dog ~/.local/bin
    chmod +x ~/.local/bin/dog
fi

pushd ~
git clone git@github.com:clansty/Clansty.git rc
pushd rc

cat <<EOF > ~/.config/nushell/config.nu
source $PWD/nu/config.nu
EOF

cat <<EOF > ~/.config/nushell/env.nu
\$env.RC_DIR = "$PWD"
source $PWD/nu/env.nu
EOF
