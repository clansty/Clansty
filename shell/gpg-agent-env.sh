if command -v gpgconf >/dev/null 2>&1; then
  _gpg_agent_ssh_sock="$(gpgconf --list-dirs agent-ssh-socket 2>/dev/null || true)"
  if [ -n "$_gpg_agent_ssh_sock" ] && { [ -z "${SSH_AUTH_SOCK:-}" ] || [ ! -S "${SSH_AUTH_SOCK:-}" ]; }; then
    export SSH_AUTH_SOCK="$_gpg_agent_ssh_sock"
  fi
  unset _gpg_agent_ssh_sock
fi

if tty -s; then
  GPG_TTY="$(tty)"
  export GPG_TTY

  if [ -n "${DISPLAY:-}${WAYLAND_DISPLAY:-}" ] && command -v systemctl >/dev/null 2>&1; then
    systemctl --user import-environment DISPLAY WAYLAND_DISPLAY XDG_CURRENT_DESKTOP XDG_SESSION_TYPE DBUS_SESSION_BUS_ADDRESS >/dev/null 2>&1 || true
  fi

  if command -v gpg-connect-agent >/dev/null 2>&1; then
    gpg-connect-agent updatestartuptty /bye >/dev/null 2>&1 || true
  fi
fi
