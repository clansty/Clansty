#!/usr/bin/env bash

set -x -e

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
        s pacman -Sy --needed --noconfirm "$@"
    elif has apt; then
        s apt install -y "$@"
    elif has dnf; then
        s dnf install "$@"
    elif has brew; then
        brew install "$@"
    fi
}

export PATH=$HOME/.local/bin:$PATH
install-package git curl wget neovim ripgrep duf bat gdu unzip

mkdir -p ~/.local/bin
TMPDIR=$(mktemp -d)
pushd $TMPDIR

if has pacman; then
    if ! has paru; then
        s pacman -S --needed --noconfirm base-devel
        git clone https://aur.archlinux.org/paru-bin.git --depth=1
        cd paru-bin
        makepkg -si
    fi
    paru -Sy --needed --noconfirm starship nushell carapace-bin dog curlie fd gping openssh

elif has apt; then
    echo "deb [trusted=yes] https://apt.fury.io/rsteube/ /" | s tee /etc/apt/sources.list.d/rsteube.list
    if ! has starship; then
        curl -sS https://starship.rs/install.sh | sh -s -- --yes --bin-dir ~/.local/bin
    fi
    if ! has curlie; then
        curl -sS https://webi.sh/curlie | sh
    fi

    if ! has dog; then
        wget https://github.com/ogham/dog/releases/download/v0.1.0/dog-v0.1.0-x86_64-unknown-linux-gnu.zip
        unzip dog-v0.1.0-x86_64-unknown-linux-gnu.zip
        mv -f bin/dog ~/.local/bin
        chmod +x ~/.local/bin/dog
    fi

    if ! has nu; then
        wget https://github.com/nushell/nushell/releases/download/0.96.1/nu-0.96.1-x86_64-unknown-linux-gnu.tar.gz
        tar -xzf nu-0.96.1-x86_64-unknown-linux-gnu.tar.gz
        mv -f nu-0.96.1-x86_64-unknown-linux-gnu/nu* ~/.local/bin
    fi

    if ! has gping; then
        NAME=$(lsb_release --codename --short)
        if [ "$NAME" != "trixie" ]; then
            echo "deb [signed-by=/usr/share/keyrings/azlux.gpg] https://packages.azlux.fr/debian/ $NAME main" | s tee /etc/apt/sources.list.d/azlux.list
            install-package gpg
            curl -s https://azlux.fr/repo.gpg.key | gpg --dearmor | s tee /usr/share/keyrings/azlux.gpg > /dev/null
        fi
    fi

    s apt update
    install-package fd-find carapace-bin gping ssh
fi

popd

pushd ~
if [ -d rc ]; then
    pushd rc
    git pull
    popd
else
    git clone https://github.com/clansty/Clansty.git rc
fi
pushd rc

mkdir -p ~/.config/nushell/
cat <<EOF > ~/.config/nushell/config.nu
source $PWD/nu/config.nu
EOF

cat <<EOF > ~/.config/nushell/env.nu
\$env.RC_DIR = "$PWD"
source $PWD/nu/env.nu
EOF

which nu | s tee -a /etc/shells
s chsh -s $(which nu) $USER
