{
  description = "Clansty's workspace config and rc files";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs:
    inputs.flake-utils.lib.eachSystem [ "x86_64-linux" "aarch64-linux" ]
      (system:
        let
          pkgs = import inputs.nixpkgs {
            inherit system;
            config.allowUnfree = true;
            config.allowUnsupportedSystem = true;
            config.allowBroken = true;
          };
        in
        {
          apps = {
            copy-gen-conf = {
              type = "app";
              program = "${pkgs.callPackage ./nix/copy-gen-conf.nix { }}";
            };
          };
        }) // {
          nu-config-dir = ./nu;
          nixosModules = {
            apps = import ./nix/apps.nix;
            starship = import ./nix/starship/module.nix;
          }
        };
}
