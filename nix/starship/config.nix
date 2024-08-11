{ pkgs, lib, ... }:
let
  catppuccin = pkgs.fetchFromGitHub {
    owner = "catppuccin";
    repo = "starship";
    rev = "ca2fb0600730fd3958a2cb4d4ca97c401877b365";
    sha256 = "sha256-KzXO4dqpufxTew064ZLp3zKIXBwbF8Bi+I0Xa63j/lI=";
  };
in
{
  enable = true;
  package = pkgs.starship;
  settings = {
    character = {
      success_symbol = "[➜](bold green)";
      error_symbol = "[➜](bold red)";
    };
    add_newline = true;
    time = {
      disabled = false;
      format = "[$time]($style)";
    };
    status.disabled = false;
    shell.disabled = false;
    fill.symbol = " ";
    hostname.ssh_only = false;
    right_format = "[nya~](flamingo)";
    username = {
      format = "[$user]($style) @ ";
      aliases = {
        clansty = "🐱";
        Clansty = "🐱";
        root = "👻";
        Administrator = "👻";
      };
      show_always = true;
    };
    format = lib.concatStrings [
      "$username$hostname$localip$shlvl$singularity$kubernetes$directory$vcsh$fossil_branch$fossil_metrics$git_branch$git_commit$git_state$git_metrics$git_status$hg_branch$pijul_channel$docker_context$fill"
      "$all$time$line_break"
      "$shell$jobs$status$os$container$character"
    ];
  } // lib.importTOML "${catppuccin}/palettes/macchiato.toml";
  presets = [
    "nerd-font-symbols"
  ];
}
