{ pkgs, lib, ... }@input:
let
  cfg = pkgs.callPackage ./config.nix { };

  settingsFormat = pkgs.formats.toml { };

  userSettingsFile = settingsFormat.generate "starship.toml" cfg.settings;

  settingsFile = if cfg.presets == [ ] then userSettingsFile else
  pkgs.runCommand "starship.toml"
    {
      nativeBuildInputs = [ pkgs.yq ];
    } ''
    tomlq -s -t 'reduce .[] as $item ({}; . * $item)' \
      ${lib.concatStringsSep " " (map (f: "${cfg.package}/share/starship/presets/${f}.toml") cfg.presets)} \
      ${userSettingsFile} \
      > $out
  '';
in
settingsFile
