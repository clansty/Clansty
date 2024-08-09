{ pkgs, lib, ... }:
let
  starship-config = pkgs.callPackage ./starship/starship.toml.nix { };
in
pkgs.writeShellScript "init" ''
  cp ${starship-config} nu/gen/starship.toml
''
