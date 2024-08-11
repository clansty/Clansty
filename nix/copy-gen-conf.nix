{ pkgs, lib, ... }:
let
  starship-config = pkgs.callPackage ./starship/starship.toml.nix { };
in
pkgs.writeShellScript "init" ''
  cp -f ${starship-config} nu/gen/starship.toml
''
