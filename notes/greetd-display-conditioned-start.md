# Greetd start only when a display is connected

Date: 2026-06-17

## Goal

This machine may boot in two modes:

- Desktop mode with one or more monitors attached.
- Headless or SSH-only mode with no real display attached.

The desired behavior is:

- Start `greetd` normally when a real monitor is connected at boot.
- Do not start `greetd` when no real monitor is connected.
- Keep `tty1` usable in the headless case.
- Keep `display-manager.service` pointing at the configured `greetd` unit.

## Hardware signal

The useful boot-time signal is the DRM connector status under:

```sh
/sys/class/drm/card*-*/status
```

Example on this machine:

```text
/sys/class/drm/card0-DP-1 connected
/sys/class/drm/card0-DP-2 disconnected
/sys/class/drm/card0-DP-3 connected
/sys/class/drm/card0-HDMI-A-1 disconnected
/sys/class/drm/card0-Writeback-1 unknown
```

`Writeback` and virtual connectors must not count as displays.

## Helper script

The condition script is installed at:

```text
/usr/local/libexec/greetd-has-connected-display
```

Current content:

```sh
#!/bin/sh

for status_file in /sys/class/drm/card*-*/status; do
    [ -e "$status_file" ] || continue

    connector=${status_file%/status}
    case ${connector##*/} in
        *-Writeback-*|*-Virtual-*)
            continue
            ;;
    esac

    if [ "$(cat "$status_file")" = connected ]; then
        exit 0
    fi
done

exit 1
```

Exit codes:

- `0`: at least one real DRM connector is `connected`.
- `1`: no real connected display was found.

## Important systemd trap

The stock Arch `greetd.service` has:

```ini
Conflicts=getty@tty1.service
```

A first attempt used a drop-in with:

```ini
[Service]
ExecCondition=/usr/local/libexec/greetd-has-connected-display
```

That is not enough. If the original unit still has `Conflicts=getty@tty1.service`, systemd can process the conflict before the condition skip protects the service startup. In practice, a headless boot can still stop `getty@tty1.service`.

Resetting `Conflicts=` from a drop-in also did not remove the original conflict reliably for this unit. `systemctl show greetd.service -p Conflicts` still showed `getty@tty1.service`.

The final setup therefore uses a full unit override in `/etc/systemd/system/greetd.service`.

## Final unit

`/etc/systemd/system/greetd.service`:

```ini
[Unit]
Description=Greeter daemon
After=systemd-user-sessions.service plymouth-quit-wait.service
After=getty@tty1.service systemd-udev-settle.service
Wants=systemd-udev-settle.service

[Service]
Type=simple
ExecCondition=/usr/local/libexec/greetd-has-connected-display
ExecStartPre=-/usr/bin/systemctl stop getty@tty1.service
ExecStart=greetd
IgnoreSIGPIPE=no
SendSIGHUP=yes
TimeoutStopSec=30s
KeyringMode=shared
Restart=always
RestartSec=1
StartLimitBurst=5
StartLimitInterval=30

[Install]
Alias=display-manager.service
```

The key difference from the packaged unit is that there is no static:

```ini
Conflicts=getty@tty1.service
```

Instead, `ExecStartPre` stops `getty@tty1.service` only after `ExecCondition` has passed. That keeps `tty1` available when there is no display.

After installing the override, regenerate the alias:

```sh
sudo systemctl daemon-reload
sudo systemctl reenable greetd.service
```

Expected alias:

```text
/etc/systemd/system/display-manager.service -> /etc/systemd/system/greetd.service
```

## Verification commands

Check script syntax:

```sh
sh -n /usr/local/libexec/greetd-has-connected-display
```

Check current hardware condition:

```sh
/usr/local/libexec/greetd-has-connected-display
printf 'exit=%s\n' "$?"
```

Expected with a monitor connected:

```text
exit=0
```

Check the composed unit:

```sh
systemctl cat greetd.service
systemctl show greetd.service \
  -p FragmentPath \
  -p Conflicts \
  -p ExecCondition \
  -p ExecStartPre \
  -p ExecStart
```

Expected shape:

```text
FragmentPath=/etc/systemd/system/greetd.service
Conflicts=shutdown.target
ExecCondition=.../usr/local/libexec/greetd-has-connected-display...
ExecStartPre=.../usr/bin/systemctl stop getty@tty1.service...
ExecStart=...greetd...
```

Validate systemd syntax:

```sh
systemd-analyze verify greetd.service
```

Check enablement and alias:

```sh
systemctl is-enabled greetd.service display-manager.service
readlink /etc/systemd/system/display-manager.service
```

Expected:

```text
enabled
alias
/etc/systemd/system/greetd.service
```

## Simulating the no-display path

The real `/sys/class/drm` tree is read-only, so test the helper by rewriting the path into a temporary tree:

```sh
tmpdir=$(mktemp -d)
mkdir -p "$tmpdir/card0-DP-1" "$tmpdir/card0-HDMI-A-1" "$tmpdir/card0-Writeback-1"
printf disconnected > "$tmpdir/card0-DP-1/status"
printf disconnected > "$tmpdir/card0-HDMI-A-1/status"
printf connected > "$tmpdir/card0-Writeback-1/status"
sed "s#/sys/class/drm#$tmpdir#g" /usr/local/libexec/greetd-has-connected-display > "$tmpdir/check"
sh "$tmpdir/check"
printf 'exit=%s\n' "$?"
rm -rf "$tmpdir"
```

Expected:

```text
exit=1
```

That confirms a connected `Writeback` output is ignored and does not cause `greetd` to start.

## Operational notes

Do not restart `greetd` from inside an active graphical session unless intentionally ending that session. `daemon-reload` and `reenable` are enough to make the next boot use the new unit.

If the packaged `greetd.service` changes in a future update, compare it against the local override:

```sh
systemctl cat greetd.service
pacman -Qo /usr/lib/systemd/system/greetd.service
```

Keep these properties true:

- `FragmentPath` should be `/etc/systemd/system/greetd.service`.
- `Conflicts` should not include `getty@tty1.service`.
- `ExecCondition` should be the display-detection helper.
- `ExecStartPre` should stop `getty@tty1.service` only after the condition passed.
