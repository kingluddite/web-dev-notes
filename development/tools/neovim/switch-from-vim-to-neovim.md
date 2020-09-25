## Switch from vim to neovim configuration
copy over vimrc file to neovim

## how to install neovim
`$ brew install neovim`

## Where is neovim config located on Mac?
`~/config/nvim/init.vim

## Open file in neovim
`$ nvim init.vim`

## Copy over .vimrc to init.vim
* Inside file in neovim use `:r ~/.vimrc` (Super powerful!)

## You should be able to use your vimrc with neovim
* Reload current configuration file
```
map <C-u> :source ~/.vimrc<CR>
```

* Change this to point to neovim's config

```
map <C-s> :source ~/.config/nvim/init.vim<CR>
```

## Use different program for Plug on neovim
* See resources for github link

```
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

* This is BETTER! (it will autoload and create autoload directory)
* It will autoload anything you put inside it

```
curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

## Create a directory called `vim-plug` inside your nvim config folder
`$ mkdir vim-plug`

* Install it anywhere
* Run the Plug install command with (inside init.vim) with `:PlugInstall`

## After install I had one error
* I commented out this line

```
"set term=xterm-256color
```

## Open chrome from terminal
`$ chrome` (yep it's an alias)

## Use airline for vim (status bar)
* Follow the video in resources and use website for code

## Using nvim
* Run with `$ nvim`

## Run commands
`:` and type the command you want and press tab and you'll get options

### Check plugin status
`:PlugStatus`

### source (you don't need to leave vim to refresh your new settings)
`: source $MYVIMRC`

## Navigating
* highlight over file path and type `gf` and it will open file in "buffer"
    - press `ctrl` + `o` to come back
* press tab to circle through open "buffer" files
* TODO :vsplit works (vertical split) but adjust sizing of windows alt + hkjl does not work?
* 
## Resources
* [Switching from vim to Neovim & rebuilding config](https://www.youtube.com/watch?v=Kx-SDJwL01o)
* [Setting up Neovim for web dev 2020](https://medium.com/better-programming/setting-up-neovim-for-web-development-in-2020-d800de3efacd)
* [ben awad - configure vim like vscode](https://www.youtube.com/watch?v=gnupOrSEikQ)
* [Vim plug github](https://github.com/junegunn/vim-plug)
* [install airline for neovim](https://www.youtube.com/watch?v=-AIdjwIGfqM)
* [blog for airline neovim config](https://www.chrisatmachine.com/Neovim/05-vim-airline/)
* [why nvim is awesome](https://www.youtube.com/watch?v=65Wq4fjREUU)
* [start nvim from scratch](https://www.youtube.com/watch?v=QB9V__3VO2s)
startify
* [general settings](https://www.chrisatmachine.com/Neovim/02-vim-general-settings/)
    - click around
    - line numbers
    - clipboard
* Install python3 and node
* Had to install pip (https://stackoverflow.com/questions/17271319/how-do-i-install-pip-on-macos-or-os-x)
* This command in settings will auto source when saved
```
au! BufWritePost $MYVIMRC source %      " auto source when writing to init.vm alternatively you can run :source $MYVIMRC
```

* [Install python 3 on mac](https://opensource.com/article/19/5/python-3-default-mac#what-to-do)
    - * **remember** to close and open terminal for checking health again

* Themes
    - https://www.chrisatmachine.com/Neovim/03-vim-themes/
    - Lots of themes
        + https://github.com/rafi/awesome-vim-colorschemes
* COC (Conquerer of Completion)
    - lots of stuff - https://github.com/neoclide/coc.nvim/wiki
    - After installing use :checkhealth to see that it was correctly installed
    - `:CocInfo`
    - [coc extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions)
    - `:CocInstall coc-json` (install any of the list of extensions)
    - `:CocList commands` will show you all of your commands
    - `:CocList extensions` toggle over it and tab to disable, enable...
    - `:CocConfig` (only need to do this once)

* [full repo of chrisAtMachine](https://github.com/ChristianChiarulli/nvim/blob/master/vim-plug/plugins.vim)
* Install watchman
    - [docs](https://facebook.github.io/watchman/)
    - `$ brew install watchman`
    - **Note**: watchman can be a memory hog, to stop all watchman processes and free up some memory run

`$ watchman watch-del-all`

## Automatically reinstall the extensions you use
* If you use neovim and already have node installed, you can use the following script to reinstall your favorite extensions

```
#!/usr/bin/bash

set -o nounset    # error when referencing undefined variable
set -o errexit    # exit when command fails

# Install extensions
mkdir -p ~/.config/coc/extensions
cd ~/.config/coc/extensions
if [ ! -f package.json ]
then
  echo '{"dependencies":{}}'> package.json
fi
# Change extension names to the extensions you need
npm install coc-snippets coc-python coc-tsserver coc-html coc-css coc-json coc-yaml --global-style --ignore-scripts --no-bin-links --no-package-lock --only=prod
```

type `gd` to see where it is defined
type `ctrl` + `o` to get out of there
type `shift` + `k` to get full path that file/asset
type `gr` to see everywhere that component is being used (example Layout in gatsby app)

## coc Explorer (use instead of NERDtree)
`:CocInstall coc-explorer` (after opening nvim with `$ nvim`)
* [coc-explorer extension docs](https://github.com/weirongxu/coc-explorer)
* open with `space` + `e`
* `d` to delete buffer
* `tab` to move between buffers
* just press tab and then type to fuzzy find what you want to do

## Nerd fonts
* https://www.chrisatmachine.com/Linux/05-nerd-fonts/
* Nerdfonts cheatsheet - https://www.nerdfonts.com/cheat-sheet
* https://github.com/ryanoasis/nerd-fonts
    - patched-fonts > hack
        + grab one of each
            * grab the regular ttf
* restart terminal and choose hack and you will see icons if you `nvim .` and space + e

![hack working](https://i.imgur.com/fh89ckr.png)


## Ranger
* https://www.chrisatmachine.com/Neovim/07-ranger/
    - open when nvim is open with `space` + `r`
    - press `l` to opens files
    - press `q` to close it

## FZF
:History command history
:Lines all lines:
key bindings
* ctrl + r --> history
* ctrl + t --> search for files

## startify
* recent files and projects
    - Open a bunch of files in buffer with `gf`
    - Then use `:SSave`
        + Also use `:SLoad`
        + brew install figlet  `$ brew install figlet`
        + `figlet -c kingluddite`
* in settings of plugin we tell it all of our sessions will be:

`let g:startify_session_dir = '~/.config/nvim/session'`

* It will remember your session you last were in and bring you right back to it by clicking on the session you saved and it's name

## Sneak
* https://github.com/justinmk/vim-sneak

## Alacritty
* https://www.chrisatmachine.com/Linux/06-alacritty/
* open new instance -added binding `ctrl` + `n`

### Alacritty color schemes
* https://github.com/alacritty/alacritty/wiki/Color-schemes

## Snippets
* https://www.chrisatmachine.com/Neovim/17-snippets/

## Neofetch
`$ brew install neofetch`

## Git
`Git TYPE SPACE` + Then press `Tab` and you'll get all your choices
* `Gbrowse` open the file up on github
* `:GV` git commit browser (all commits)
* `:GV!` git commits that only affect current file
* Press `Tab` to get out of git window
* press 'o' to open and 'l' to list

## Find all files in folder named "Hack"
`ls | grep Hack`

## Ben Awad video 
* [ben awad configure vim like vscode](https://www.youtube.com/watch?v=gnupOrSEikQ)
* [getting to work with zshrc and alt key](https://jdhao.github.io/2018/11/05/fzf_install_use/#make-fzf-work-under-zsh-on-macos)
