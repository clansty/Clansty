# GPG YubiKey pinentry and SSH notes

Date: 2026-06-16

## Goal

This machine is used in two modes:

- Desktop session with a display attached.
- SSH-only session with the YubiKey still plugged into the machine.

The desired behavior is:

- Desktop prompts use graphical pinentry.
- SSH prompts use curses pinentry.
- No manual `pinentry-program` edits.
- No gpg-agent restart just to switch prompt mode.
- Restarting `scdaemon` must still let GnuPG read the YubiKey through GnuPG's direct smartcard path.

## Symptoms

`~/.gnupg/gpg-agent.conf` originally pinned:

```conf
pinentry-program /usr/bin/pinentry-gnome3
```

That works on desktop but is wrong over SSH without a display.

The shell startup also had:

```sh
export GPG_TTY="$(tty)"
```

When run from a non-TTY context, localized `tty` output became the literal environment value:

```text
GPG_TTY=不是一个 tty
```

That breaks terminal pinentry.

The YubiKey issue was separate from pinentry. After killing/restarting `scdaemon`, `gpg --card-status` failed with:

```text
gpg: selecting card failed: No such device
gpg: OpenPGP card not available: No such device
```

The journal showed:

```text
scdaemon: ccid open error: skip
scdaemon: check permission of USB device at Bus 003 Device 007
```

The USB device was visible but not writable by the SSH session user:

```text
/dev/bus/usb/003/007 root:root 0664
```

## Root causes

`gpg-agent` is long-lived, so a simple wrapper that only checks the wrapper process environment is not enough. The agent may keep desktop/systemd environment while the current request comes from SSH. The useful information is sent to pinentry through the Assuan protocol, for example:

```text
OPTION ttyname=/dev/pts/5
OPTION ttytype=tmux-256color
```

For SSH authentication, the OpenSSH agent protocol does not carry the current TTY. GnuPG documents that the current terminal must be refreshed with:

```sh
gpg-connect-agent updatestartuptty /bye
```

The YubiKey failure was not a PC/SC problem. GnuPG direct smartcard access was correct. The problem was that the first boot-time `scdaemon` could keep an already-open device handle, but a later newly started `scdaemon` from SSH had to open the USB device again and lacked write permission.

## Final setup

`~/.gnupg/gpg-agent.conf` points to a dotfiles-managed wrapper:

```conf
enable-ssh-support
pinentry-program /home/clansty/rc/bin/pinentry-auto
```

`~/rc/bin/pinentry-auto` is a tiny pinentry protocol proxy:

- If the request has display information, it starts `/usr/bin/pinentry-gnome3`.
- If the request has a real `ttyname`, it starts `/usr/bin/pinentry-curses`.
- It keeps the gpg-agent protocol stable by answering early `OPTION` requests and forwarding them to the selected backend.

`~/rc/shell/gpg-agent-env.sh` is sourced by zsh and bash startup files:

```sh
source "$HOME/rc/shell/gpg-agent-env.sh"
```

It does three things:

```sh
SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"
```

only when needed, then:

```sh
if tty -s; then
  GPG_TTY="$(tty)"
  export GPG_TTY
  gpg-connect-agent updatestartuptty /bye >/dev/null 2>&1 || true
fi
```

The `tty -s` guard is important. Do not go back to unconditional `GPG_TTY="$(tty)"`.

Desktop sessions also need their display environment imported into the user systemd manager:

```sh
systemctl --user import-environment DISPLAY WAYLAND_DISPLAY XDG_CURRENT_DESKTOP XDG_SESSION_TYPE DBUS_SESSION_BUS_ADDRESS
```

This matters because `gpg-agent` is socket-activated by user systemd. The agent process environment may contain only `DBUS_SESSION_BUS_ADDRESS` and no `DISPLAY` or `WAYLAND_DISPLAY`, even though the terminal shell has a working desktop environment. In that state, a pinentry wrapper launched by `gpg-agent` cannot infer the graphical session from its own environment.

`pinentry-auto` therefore also reads:

```sh
systemctl --user show-environment
```

when deciding whether a graphical pinentry is available.

For direct GnuPG smartcard access from SSH, `/etc/udev/rules.d/70-yubikey-gpg.rules` grants Yubico USB devices to the existing `uucp` group:

```udev
SUBSYSTEM=="usb", ATTR{idVendor}=="1050", MODE="0660", GROUP="uucp", TAG+="uaccess"
```

The user is already in `uucp`, so a newly started `scdaemon` can open the YubiKey without depending on graphical-seat ACLs.

Do not add `disable-ccid` to `~/.gnupg/scdaemon.conf` for this setup. That switches scdaemon away from GnuPG's direct CCID path toward PC/SC and is not what this machine uses.

## Verification commands

Reload agent config without killing the agent:

```sh
gpg-connect-agent RELOADAGENT /bye
gpg-connect-agent 'GETINFO pid' /bye
```

Confirm new interactive shells get a real tty:

```sh
zsh -lic 'printf "tty=%s GPG_TTY=%s\n" "$(tty)" "$GPG_TTY"'
```

Confirm device permissions:

```sh
getfacl -p /dev/bus/usb/003/007
```

Expected shape:

```text
owner: root
group: uucp
user::rw-
group::rw-
other::---
```

Confirm card survives a scdaemon restart:

```sh
gpg-connect-agent 'SCD KILLSCD' /bye
gpg --card-status
```

Expected first line:

```text
Reader ...........: 1050:0407:0015598150:0
```

PC/SC should not be involved:

```sh
systemctl is-active pcscd.socket pcscd.service
```

Expected:

```text
inactive
inactive
```
