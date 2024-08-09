{ pkgs, lib, ... }:
{
  programs.starship = import ./config.nix pkgs;
  environment.sessionVariables.STARSHIP_CONFIG = import ./starship.toml.nix pkgs;
}