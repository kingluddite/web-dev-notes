# VIM
:windo difft (show diff of open files)

## Delete to beginning of line
`d0`

## Talk on going mouseless with Vim, Tmux, and Hotkeys
[ref](https://www.youtube.com/watch?v=E-ZbrtoSuzw&t=1050s)
## Operators

c | change
d | delete
y | yank into register
~ | swap case
gu | make lowercase
gU | make uppercase
! | filter to external program
< | shift left
`>` | shift right
= | indent

## | Text objects
aw | a word
iw | inner word
aW | a WORD
iW | inner WORD
ap | a paragraph
ip | inner paragraph
ab | a bracket
ib | inner bracket
at | a tag block
it | inner tag block

## Motions
% | go to first matching paren / bracket
[count]+ | down to first non-blank char of line
[count]$ | to end of line
[count]f/F{char} | to next occurrence of {char}
[count]/t/T{char} | to before next occurrence of {char}
[count]h/k/l | left, down, up, or right
[count]]m | Go to beginning of next method (LIFE SAVER)
[count]w/W | go a word/WORD to the right
[count]b/B | go a word/WORD to the left
[count]/e/E | go to the end of word/WORD right

## Putting it all together
[count][operator][text object / motion]

6+ = 6x go down to line start
gUaW = capitalize a WORD
3ce = 3x change to word end
4$ = 4x go to end of line
d]m = delete to start of next method
% = jump to match of next paren or bracket

## Advanced Navigation
* Flying at Warp Speed

### 6 core topics
1. Various Motions
  * Using the screen and scrolling instead of using j k h l all the time
  ![various motions](https://i.imgur.com/guxV7cl.png)
  * H M L
    - High Middle Low of screen
  * zt, zz, zb (instead of going to the high, middle or low of the screen, this moves the screen such that your cursor is at the high/middle/low of the screen)
  * go up (ctrl up arrow) half a screen
  * go down (ctrl down arrow) half a screen
  * go up a full screen length (ctrl - b)
  * go down a full screen length (ctrl - f)
  * scroll up (ctrl + y)
  * scroll down (ctrl + e)
2. Editing
3. Searches
4. Marks
5. Tags
  * Allow you to jump to the definition of certain key words
6. Jumplist + Changelist

16:48


quit all
`$ qa!`
## Find and replace in multiple files
* Install
  - fcf
    + `$ brew install fzf`
  - fcfvim
  - riprep
    + `$ brew install ripgrep`

## Find things in a line
* `f` + type letter you are looking for
* `F` same thing as above but in reverse order
* `t` + type letter you are looking for (drops you right in front of that letter)
* `T` same thing as above but in reverse
* If you are at the end of the line in `COMMAND` mode and type `I` you will be brought to the beginning of the line in INSERT mode
* If you are at the beginning of the line in COMMAND mode and type `A` you will be brought the beginning of the line in `INSERT` mode

## Finding things in an entire file
* Type `/` and the word you want, let's use `the`, it will highlight all of those `the` words, hit enter and all the matches will be highlighted
  - Type `n` key to cycle through each of the matches until it gets to the end and if you hit `n` again it will start at the top again and keep cycling through
  - You can use `shift` + `n` and it will cycle through the highlighted words in reverse
  - You can also use `?` to do a search and by default it searches in reverse and if you type `n` you go backwards and `shift` + `n` goes forwards

### replace words globally
`:%s/the/foobar/g`

* Typing the above out is a bit slow and tedious, there is a faster way and that is hover over word and type `shift` + `8` (which is the `*`)
  - You will see the word you are over is in the search bar

### Undo
`u`

### A better way to replace words with keybindings
* I added this in my .vimrc

```
" -----------------------------------------------------------------------------
" Basic mappings
" -----------------------------------------------------------------------------
" Press * to search for the term under the cursor or a visual selection and
" then press a key below to replace all instances of it in the current file.
nnoremap <Leader>r :%s///g<Left><Left>
nnoremap <Leader>rc :%s///gc<Left><Left><Left>

" The same as above but instead of acting on the whole file it will be
" restricted to the previously visually selected range. You can do that by
" pressing *, visually selecting the range you want it to apply to and then
" press a key below to replace all instances of it in the current selection.
xnoremap <Leader>r :s///g<Left><Left>
xnoremap <Leader>rc :s///gc<Left><Left><Left>
```

1. Put cursor over word you want to change
2. `shift` + `8`
3. Type word you want to replace and all matching words
  * **note** You could add `gc` at end an it will ask you to confirm each change (optional)
  * Use the `leader` + r + c to get that output
4. Press enter
5. All words from that point on will be replaced with your new word
6. Type `u` to undo changes

**note** If you don't see a word like this `%s//foobar/g` that means vim will replace your new world with the highlighted word

* You can also visually select a phrase and use `*` to select another match and keep pressing `n` to get more matches then just use `leader` + `r` to replace all the phrases with the new one you type * you need to add vim-visual-search plugin

The second keybinding is if you just want to change a word in a visual selection of text
1. move to the word
2. Type `*`
3. Visual mode and select chunk of code
4. leader + r and
5. enter
6. All the matching words in that section will change

## Multi-cursor (kindof but better)
* add a key binding in vimrc
* hover over word
* type `s` + `*`
* type replacement word
* hit escape
* press `.` to replace each word (you could hit `n` and go one by one and then hit . if you want to replace it)

## Swap Files
* `.swp` files are for backing up and you really shouldn't turn the backup system off

### A better solution is to add this in your `vimrc`
`.vimrc`

```
" create backups
set backup
" tell vim where to put its backup files
set backupdir=/tmp
```

* After adding that to your `vimrc` file, make sure to refresh your source 

`$ source ~/.zshrc`

* If you have a lot of files ending with `~` you can delete them with:

`$ find . -name '*~' -exec rm {} \;`

## To Clean out ALL vim Swap Files in a Directory
* If you are sure you don’t need any vim swap files in a directory tree and want to get rid of them, you can use the following command in the directory while vim is not running (not even in another window or even a different login session):
* This will delete all files whose names end with `.swk`, `.swl`, `.swm`, `.swn`, `.swo`, or `.swp` in the current directory tree

`$ find . -type f -name "*.sw[klmnop]" -delete`

## Visual Block Mode (DID NOT WORK)
1. `ctrl` + `v`
2. Select column
3. Move to right to highlight all words
4. `x` to cut them
5. `shift` + `i` to type new word
6. `esc` and all words will be updated at same time

## Open html file in Chrome browser (file:///)
`:!open % -a Google\ Chrome`

## Find each occurrence of `foo` (in all lines aka "globally"), and replace it with `bar`

`:%s/foo/bar/g`

## Replace all spaces with underscore
`:%s/ /_/g`

* Example: `One Two Three` gets transformed into `One_Two_Three`
* **note**: You need to add a `\` in front of the period – 

`:%s/\./ /g`

* This is because **regular expressions** use `.` as an "any character" wildcard

## Keyboard Shortcuts
### Closing tabs and windows
| Keyboard Shortcut      |    Action |
| :-------- | --------:|
| `:qa`  | Closes all tabs and vim |
| `:wqa`  | Closes all tabs and saves and vim |
| `:tabo` | Closes all tabs but current tab |
| `:on` | Closes all windows except current |

## Paste inline into tag
* Go to beginning of line `^`
* `D` to delete until end (inline)
* Place cursor `<h3></h3>` (over open p tag's closing chevron)
  - changes this:

```
<h3></h3{numeral(amount / 100).format('$0,0.00')}
```

* into this:

`<h3>{numeral(amount / 100).format('$0,0.00')}</h3>`

## Toggle Uppercase/Lowercase
* Switch to visual mode
* U uppercase
* u lowercase

## Switch tabs
gt - next tab
gT - previous tab

## Undo/Redo
| Command | Description |
| ------- | -------- |
| `u` | Undo
| `ctrl` + `r` | Redo Undo

## Search and replace
* https://vim.fandom.com/wiki/Search_and_replace



## Multi-change word
1. Search for word using `/` and follow it with the word your are searching
  * example: `/people`
2. Press enter (that will highlight all words that match search)
3. Type `cgn` and type new word
4. Enter into **Normal** mode
5. Type `n` to get to next word match
6. Type `.` to repeat (keep typing to keep repeating changes)

## Folding
| Command | Description |
| ------- | -------- |
| `zM` | close everything | 
| `zR` | open everything | 
| `za` | toggle state of the current fold | 
| `zj` | jump down to next fold | 
| `zk` | jump up to previous fold | 
| `zk` | jump up to previous fold | 
| `zO` | Open all of the nested folds | 
| `zc` | Close all of the nested folds |

## Basic Vim
| Command | Description |
| ------- | -------- |
| `:PluginInstall` | Install Vundle Plugins |
| `:UltiSnipsEdit` | Creates a Ultisnip Snippet |
| `:version` | Gives you vimrc info |
| `h j k l` | Navigate left, down, up, right
| `w` | move to next word
| `b` | move back a word
| `e` | move to end of word

## NerdTree
| Command | Description |
| ------- | -------- |
| `r` | Refresh current directory listing |
| `R` | Refresh root directory listing |

:help NERDTreeMappings

If windows are open you can maximize current and minimize all others with
```
(Ctrl-Wo means holding Ctrl press W, and then o)
```

A better way: `:tab sp` splits current window into new tab
* to close current window and return to splits `ctrl` + `w` and press `c`

`t:` Open the selected file in a new tab
`i:` Open the selected file in a horizontal split window
`s:` Open the selected file in a vertical split window
`I:` Toggle hidden files
`m:` Show the NERD Tree menu
`R:` Refresh the tree, useful if files change outside of Vim
`?:` Toggle NERD Tree's quick help

### Directories
Direct­ories
o: open & close
O: recurs­ively open
x: close parent
X: close all children recurs­ively
e: explore selected dir

### Tree navigation
p: go to parent
P: go to root
K: go to first child
J: go to last child

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

## EasyMotion
| Command | Description |
| ------- | -------- |
| `<Leader><Leader>w` | I set my leader to <space> so type <space> twice + `w` and type letter you want to move to - so awesome! |

## Prettier
| Command | Description |
| ------- | -------- |
| `<leader>` + `p` | If I have eslint and prettier installed I can use my leader key (which I set to the spacebar) + `p` and that will format my javascript using prettier |

## CtrlP
| Command | Description | Use Case
| ------- | -------- |
| `F5` | Clear Cache | You are searching for a file, you know it exist but it's not there, clear the cache and you will see it in your search
| `<c-v>` | split vertical |
| `<c-x>` | split horizontal |
| `<c-t>` | new tab |

## CtrlP
`Plugin 'kien/ctrlp.vim' "Fuzzy searching if dmenu isn't available`

* Refresh it's cache
* Many times you'll be searching for a file you know exists (because you just created it) but it's not there
  - The reason is CtrlP uses a cache to keep things quick
  - Clear the cache by clicking the `F5` key after hitting the CtrlP keyboard trigger of `ctrl` + `p`
  - **note** If on Mac you need to check the `Use F1, F2, etc. keys as standard function keys` inside `Apple > System Preferences > Keyboard`

![f keys as standard function keys](https://i.imgur.com/QHLj3ZS.png)

## Vimdiff
* `$ vimdiff file1 file2`
* line command
  - `:diffthis`
  - `:difft`
* `$ gvimdiff file1 file2`
  - brings up mavvim

## Git difftool
git config --global diff.tool vimdiff
git config --global difftool.prompt false
git config --global alias.d difftool

### screens
```
<C-w>s - :split window horizontally (editing current buffer)
<C-w>v - :vsplit window vertically (editing current buffer)
```

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

## Vim Surround
* Useful plugin for easily surrounding tags or text with what you want
* Let's says I want to surround a word with `<strong>` tags

`csw<strong>` will turn `word` into `<strong>word</strong>`

* surround word with {}
  - `ysiw}` makes hello become `{hello}`
  - `ds"` makes `"hello"` be `hello`

Add this plugin to `.vimrc`

`Plugin 'tpope/vim-surround'`

## Sublime had a cool feature to highlight a word and change all words with that spelling. How can I do that in Vim?
* I love multi-cursor in Sublime Text
* There is a plugin in Vim to mimic this behavior but it is buggy and vim default functionality is better and far more powerful

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

`.vimrc`

```
" Code fold bliss
set foldmethod=indent

" Toggle fold at current position
nnoremap <s-tab> za
```

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

## Broken Stuff
## HTML comments (todo: fix)
(Emmet - broken (tab doesn't work because of conflict ultisnip tab))
* I like to add closing comments when I type an HTML block tag
* `.product-list|c`
  - That will add a closing comment

## Vim can be slow so here's how you speed it up
  * (cursorline, cursorcolumn, vim-powerline, vim-airline, matchit.vim, etc.) slow down Vim in the terminal most significantly
  * Here are some lines from my `.vimrc` to keep things speedy:

  ```
  let loaded_matchparen=1 " Don't load matchit.vim (paren/bracket matching)
  set noshowmatch         " Don't match parentheses/brackets
  set nocursorline        " Don't paint cursor line
  set nocursorcolumn      " Don't paint cursor column
  set lazyredraw          " Wait to redraw
  set scrolljump=8        " Scroll 8 lines at a time at bottom/top
  let html_no_rendering=1 " Don't render italic, bold, links in HTML
  Also see :help slow-terminal
  ```

  * add this to Profile in iTerm settings changing from login shell to command 

  `/usr/local/bin/zsh -il` 

  * In iTerm's Preferences > Profiles > General > Command

  # vim-react-snippets
  ```
  " React code snippets
  Plug 'epilande/vim-react-snippets'

  " Ultisnips
  Plug 'SirVer/ultisnips'

  " Trigger configuration (Optional)
  " let g:UltiSnipsExpandTrigger="<C-l>"
  ```

  ## Snippets

  #### vim-react-snippets
  ### React Snippets

  | Trigger  | Content |
  | -------: | ------- |
  | `rrcc→`  | React Redux Class Component |
  | `rcc→`   | React Class Component |
  | `rfc→`   | React Functional Component |
  | `rsc→`   | React Styled Component |
  | `rsci→`   | React Styled Component Interpolation |


  #### Lifecycle

  | Trigger  | Content |
  | -------: | ------- |
  | `cwm→`   | `componentWillMount() {...}` |
  | `cdm→`   | `componentDidMount() {...}` |
  | `cwrp→`  | `componentWillReceiveProps(nextProps) {...}` |
  | `scup→`  | `shouldComponentUpdate(nextProps, nextState) {...}` |
  | `cwup→`  | `componentWillUpdate(nextProps, nextState) {...}` |
  | `cdup→`  | `componentDidUpdate(prevProps, prevState) {...}` |
  | `cwu→`   | `componentWillUnmount() {...}` |
  | `ren→`   | `render() {...}` |


  #### PropTypes

  | Trigger    | Content |
  | -------:   | ------- |
  | `pt→`      | `propTypes {...}` |
  | `pt.a→`    | `PropTypes.array` |
  | `pt.b→`    | `PropTypes.bool` |
  | `pt.f→`    | `PropTypes.func` |
  | `pt.n→`    | `PropTypes.number` |
  | `pt.o→`    | `PropTypes.object` |
  | `pt.s→`    | `PropTypes.string` |
  | `pt.no→`   | `PropTypes.node` |
  | `pt.e→`    | `PropTypes.element` |
  | `pt.io→`   | `PropTypes.instanceOf` |
  | `pt.one→`  | `PropTypes.oneOf` |
  | `pt.onet→` | `PropTypes.oneOfType (Union)` |
  | `pt.ao→`   | `PropTypes.arrayOf (Instances)` |
  | `pt.oo→`   | `PropTypes.objectOf` |
  | `pt.sh→`   | `PropTypes.shape` |
  | `ir→`      | `isRequired` |

  #### Others

  | Trigger  | Content |
  | -------: | ------- |
  | `props→` | `this.props` |
  | `state→` | `this.state` |
  | `set→`   | `this.setState(...)` |
  | `dp→`    | `defaultProps {...}` |
  | `cn→`    | `className` |
  | `ref→`   | `ref` |
  | `pp→`    | `${props => props}` |

## Remove next character multiple lines
```
  d/}/e
  does the job.

  d/} deletes until the } but adding the /e flag moves the cursor on the last char of the match, effectively deleting everything between the cursor and the }, inclusive.

  Using visual selection works too, in a slightly more intuitive way:

  v/}<CR>d
```
