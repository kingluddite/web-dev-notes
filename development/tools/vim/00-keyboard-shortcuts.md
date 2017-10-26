# VIM Keyboard shortcuts

## [My current `.vimrc` file](https://gist.github.com/kingluddite/c32c77724c4705bd05fa17080cfed95e)

## VimAwesome
* Site that lists all plugins and how to install them

1. Search for a plugin
2. Add the plugin to `~/.vimrc`
3. Run to refresh and load plugin(s)

```
:source %
:PluginInstall
```

## Refresh vim
* Think of this as the equivalent to refreshing our bash/zsh shells
* The old fashioned way is to close and reopen but that is too slow
* The faster way is `:e` or force refresh with `:e!`
## HTML comments
* Add a beginning and closing commet
* Type this in Text 
* `product-list|c`

```html
<!-- .product-list -->
<div class="product-list">Sameple</div>
<!-- /.product-list -->
```

## Indenting
* `Vjj` ---> Deselects automatically
* `gu` ---> reselects or `.` (period) to redo last task
* **note** Added `.vimrc` way to use **shift** to keep selection selected

## Nerdtree
* You created a file/folder and Nerdtree isn't showing it to you
* You need to refresh Nerdtree
    - `r` ---> refresh current directory
    - R ----> refresh root directory's listing

### Adding files using Nerdtree
1. `m` ---> toggles menu open/closed
2. `a` ---> to add a file

* No `/` ----> it's a file
* Has `/` ---> it's a folder
* **note** After adding refresh Nerdtree with `r`
* You can also delete, rename and move files/directories

## CtrlP
`Plugin 'kien/ctrlp.vim' "Fuzzy searching if dmenu isn't available`

* Refresh it's cache
* Many times you'll be searching for a file you know exists (because you just created it) but it's not there
  - The reason is CtrlP uses a cache to keep things quick
  - Clear the cache by clicking the `F5` key after hitting the CtrlP keyboard trigger of `ctrl` + `p`
  - **note** If on Mac you need to check the `Use F1, F2, etc. keys as standard function keys` inside `Apple > System Preferences > Keyboard`

![f keys as standard function keys](https://i.imgur.com/QHLj3ZS.png)

## Vim Surround
* Useful plugin for easily surrounding tags or text with what you want
* Let's says I want to surround a word with `<strong>` tags

`csw<strong>` will turn `word` into `<strong>word</strong>`

Add this plugin to `.vimrc`

`Plugin 'tpope/vim-surround'`

## Multi-Change word
* I love multi-cursor in Sublime Text
* There is a plugin in Vim to mimic this behavior but it is buggy and vim default functionality is better and far more powerful
* Steps to replace many

1. Search for word using `/mysearch`
2. Press `enter` on your keyboard

* That will highlight all occurrences of that query

3. `cgn` + your new word
4. Type `n` (next word)
5. Type `.` (dot) to repeat change

* Or save a stroke with just `.` (dot)

## Copy function
* `va{Vy`
  - Say you are inside a function and you want to quickly copy the function so you can paste it somewhere else
  - `v` Switches to visual mode
  - `a` means "around"
  - `{` we search for the surrounding curly braces `{}`
  - `V` Select all lines of function
  - `y` Yanks all lines and puts them into machine clipboard
* **note** If you are nested deep, just keep typing `a{` until you have entire function

## Jump to matching object
* You are on the opening tag and want to jump to the closing tag
* Just type `%` and presto! Your at the closing tag

## Replace all words in file
* `%s/foo/bar/g`
  - Replace all `foo` words with `bar` globally

## Bubble text
* Sublime Text and Atom had a cool bubble text feature
* Just use `ctrl` + `cmd` key and **up/down** arrows will bubble your current line/lines up and down respectively
* How can we replicate this in Vim?
    - I added this inside `.vimrc` and now when I type `ctrl` + `k` will bubble line up and `ctrl` + `j` will bubble line down

`~/.vimrc`

```
" Bubble single lines
nmap <c-k> ddkP
nmap <c-j> ddp

" Bubble multiple lines
vmap <c-k> xkP`[V`]
vmap <c-j> xp`[V`]
```

## Folding
* `zM` close everything
* `zR` open everything
* `za` toggle state of current fold
* `zj` jump to next fold
* `zk` jump to previous fold

`.vimrc`

```
Plugin 'phpfolding.vim'

" Code fold bliss
set foldmethod=indent

" Toggle fold at current position
nnoremap <s-tab> za
```

* **note** php needs special folding

## Undo
* `U`

## Redo
* `Ctrl` + `r`

## Window Mgt
* `:vsp` ---> creates horizontal windows
* `:sp` ---> vertical windows
* Close window with `:q`
* And I added this to `.vimrc` to quickly switch to left and right windows
    - Unfortunately, the up and down down work because `ctrl` + `up` I use to switch to my mac control panel (use to move apps to different desktops)

```
" easy navigation in split windows
nnoremap <C-L> <C-W><C-L> " focus on left
nnoremap <C-H> <C-W><C-H> " focus on right
```

## Save
* Most people are using to `cmd` + `s` but the command key is wack in Vim on Macs
* I recommend using zz instead
* Add this to `.vimrc`

```
" save with zz
nnoremap zz :update<cr>
```

## I hate the escape key
* Switching to Normal mode using the escape key is a fast way to get carpal tunnel
* A better way is to use this keymap to make the key combination of `j` + `k` to switch you to normal mode

`.vimrc`

```
" map jk to esc
:imap jk <Esc>
```

* I also recommend changing caps lock to your escape key
    - [Read more on how to do this here](https://stackoverflow.com/questions/127591/using-caps-lock-as-esc-in-mac-os-x)

## Bookmarks
* normal mode `ma` (local)
  - `mA` (global)
      + Global you can jump to files inside a project
      + Local is per file
* `'a` jumps to line (apostrophe)
* "```a```" (backtic + `a`)
  - Jumps to exact cursor position
* `d'a` ---> delete the 'a' bookmark
    - You an then move and paste it elsewhere with `p`
    - Or "delete line til mark"
    - `d`a` ---> delete from cursor of mark
* `y'a` copy line til mark
* `y` + `backtic` ---> copy cursor until
* `:marks` ----> list all bookmarks

## Movement
* `gg` ---> top of page
* `G` ----> bottom of page
* `21G` ----> move to line 21

## Leader key
* Usually changed to `;`
* I changed it to `,`

`.vimrc`

```
" TODO: Pick a leader key
" let mapleader = ","
```

## Add prettier
* Great for JavaScript

`Plugin 'prettier/prettier'`

## Ohcount
* (install with homebrew `$ brew install ohcount`)
* Counts lines of code in programs

## Vim Comment
* `gc` ---> comment out (visual mode too)
* `gcgc` ---> uncomment
* `gcap` --- comment out program

## Easy Motion
* Quick way to navigate

`.vimrc`

`Plugin 'easymotion/vim-easymotion'`

* With leader key changed to `,` (comma)
* `,,w`
