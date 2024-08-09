{ pkgs, ... }: 
{
  environment.systemPackages = with pkgs; [
    git curl wget neovim ripgrep duf bat gdu unzip
    nushell starship carapace dogdns curlie fd gping openssh
  ]
}