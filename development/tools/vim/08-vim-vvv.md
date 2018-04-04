# Install vim on vvv

* `$ vagrant ssh`
* `$ cd ~`
* `$ vim .vimrc`
* Grab dotfiles from `https://github.com/kingluddite/dotfiles` and clone somewhere to access files
* Copy code in dotfiles/vimrc into ~/.vimrc
* Install Vundle with inside vim

`$ git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim`

* Open vim `$ vim .vimrc`
  * Run `:PluginInstall`
* Install theme for vim Tender
  * `https://github.com/jacoborus/tender.vim`

```
" Vundle (.vimrc)
" Plugin 'jacoborus/tender.vim'
" MORE CODE
" If you have vim >=8.0 or Neovim >= 0.1.5
if (has("termguicolors"))
 set termguicolors
endif
" MORE CODE
syntax enable
colorscheme tender
" set lighline theme inside lightline config
let g:lightline = { 'colorscheme': 'tender' }
" set airline theme
let g:airline_theme = 'tender'
```

* Copy color to vim if no exist `~/.vim/colors/`, create folder
* `cp ~/.vim/bundle/tender/colors/tender.vim ~/.vim/colors/tender.vim`
  * I had to clone it and then manually move the colors into `~/.vim/colors/`
* Restart vim

## YCM errors

* Install cmake
  * https://geeksww.com/tutorials/operating_systems/linux/installation/downloading_compiling_and_installing_cmake_on_linux.php

`$ cd ~/.vim/bundle/YouCompleteMe`

`$ ./install.py --clang-completer --js-completer`

* https://github.com/Valloric/YouCompleteMe

* Install ZSH `$ apt install zsh`
* Install Oh-my-zsh

`$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

Install z, syntax-highlighter, autocomplete
