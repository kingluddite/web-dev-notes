# Vim Plugins
## vim-visual-star-search
https://vimawesome.com/plugin/vim-visual-star-search

* This allows you to select some text using Vim's visual mode and then hit *
and # to search for it elsewhere in the file.  For example, hit V, select
a strange sequence of characters like "$! $!", and hit star.  You'll find
all other runs of "$! $!" in the file.

## Markdown preview
* Plug 'godlygeek/tabular' | Plug 'plasticboy/vim-markdown'
    - Type `:MarkdownPreview` and you can real time edit any markdown file

## Plugin Maintenance
* [is.vim](https://github.com/haya14busa/is.vim) (clear search when you move cursor)
* Vim has a built-in profile set of commands
    - See `:h profile`

* Open vim
* Then run the following

`:profile start profile.log`

* This sets up the file `profile.log` to be the log file
* If it already exists, it will be overwritten
* We now need to tell **vim** what to profile

`:profile func *`

`:profile file *`

* This says to profile all functions and all script files (Overkill, perhaps) * Now, you should do things that make vim act slowly
* They are being profiled in the background
* Once you have concluded, end the profiling

`:profile pause`

* And quit **vim**
* Now, read the `profile.log` file and see what's slow
* Note that this is for slow running inside of vim
* If vim is slow to start up (a different problem), you should start vim with

`vim --startuptime log.txt`

* and read the times, see what's taking so long

## Nerdtree

* [Github](https://github.com/scrooloose/nerdtree)

## Install Nerdtree plugin
```
$ cd ~/.vim/bundle
git clone git://github.com/scrooloose/nerdtree.git
```

* Next add a shortcut to make opening your NERDTree more convenient by adding the following to your vim config file (~/.vimrc)'

```
" Don't try to be vi compatible

" Helps force plugins to load correctly when it is turned back on below
filetype off

set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

" let Vundle manage Vundle
" require!
Bundle 'gmarik/vundle'
" TODO: Load plugins here (pathogen or vundle)
Bundle 'scrooloose/nerdtree'
" MORE CODE
" NERDTree
map <C-n> :NERDTreeToggle<CR>
```

### Nerdtree ?
* When Nerdtree is open type ? and you will see all your options (help)
* As you navigate up down the tree `C` lets you make that folder the root of your nerdtree (I use tip this a lot)

## Open Vim
Open nerdtree with this shortcut:

` (ctrl + n)`

### Other awesome shortcuts

Use the natural vim navigation keys hjkl to navigate the files, or just the arrow keys

* Press `o` to open the file in a new buffer or open/close directory
* Press `ctrl` + `w` + `w` to toggle focus from file to Nerdtree sidebar
* Press `t` to open the file in a new tab
* Press `i` to open the file in a new horizontal split
* Press `s` to open the file in a new vertical split
* Press `p` to go to parent directory
* Press `r` to refresh the current directory

## Install vim.surround plugin
* https://github.com/tpope/vim-surround

`~/.vimrc`

`Bundle 'tpope/vim-surround`

### To use vim.surround
It's easiest to explain with examples. Press cs"' inside

```
$ cd ~/.vim/bundle
git clone git://github.com/tpope/vim-surround.git
```

Surround.vim is all about "surroundings": parentheses, brackets, quotes,
XML tags, and more.  The plugin provides mappings to easily delete,
change and add such surroundings in pairs.

It's easiest to explain with examples.  Press `cs"'` inside

    "Hello world!"

to change it to

    'Hello world!'

Now press `cs'<q>` to change it to

    <q>Hello world!</q>

To go full circle, press `cst"` to get

    "Hello world!"

To remove the delimiters entirely, press `ds"`.

    Hello world!

Now with the cursor on "Hello", press `ysiw]` (`iw` is a text object).

    [Hello] world!

Let's make that braces and add some space (use `}` instead of `{` for no
space): `cs]{`

    { Hello } world!

Now wrap the entire line in parentheses with `yssb` or `yss)`.

    ({ Hello } world!)

Revert to the original text: `ds{ds)`

    Hello world!

Emphasize hello: `ysiw<em>`

    <em>Hello</em> world!

Finally, let's try out visual mode. Press a capital V (for linewise
visual mode) followed by `S<p class="important">`.

    <p class="important">
      <em>Hello</em> world!
    </p>

This plugin is very powerful for HTML and XML editing, a niche which
currently seems underfilled in Vim land.  (As opposed to HTML/XML
*inserting*, for which many plugins are available).  Adding, changing,
and removing pairs of tags simultaneously is a breeze.

The `.` command will work with `ds`, `cs`, and `yss` if you install
[repeat.vim](https://github.com/tpope/vim-repeat)

## add ctrlp
`~/.vimrc`

`Plugin kien/ctrlp.vim`

```
" ignore node_modules and git
let:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'
```

## Ctrlp
* :CtrlPBuffer
  - Open files in buffer and use this command to search through buffer files
* :CtrlPMRUFiles
  - All most recent files updated
  - Add to key binding if you go back to key files a lot
* With CtrlP search open ctlr K and ctrl J to scroll up and down file list
* You can search by path (default search)
* Search for file only when after Ctrl + p type ctrl + d and you will see >d which means path is not used to match search, only the file name is now matched
* If in ctrlp you can use `ctrl` + `f` to switch between file mode, path mode, buffer mode, and MRUF mode
* open file in new tab (ctrl + t)
* open file in vertical split (ctrl + v)
* open it in a horizontal split (ctrl + x)
* to create new files in path `ctrl + y`
    - save you from doing this:

```
$ mkdir -p test/test2
$ cd test/test2
$ touch test
```

* To use it open `ctrlp` search
* You must type exact path match
* Create files and folder and save!

## Open lots of files at once
* `ctrl p` then
* search using ctrl j (down) and ctrl k (up)
* then ctrl z (to mark that file) (again to unmark)
* mark all files you want to open

### clear cache
* f5
    - This assumes you're in `ctrl-p` mode already
    - Note that you can hit `F5` in the middle of a query, i.e., you can type a few characters, find it's not matching a recently updated file, and hit F5 to refresh right then
    - It will automatically show you the match if the file was just added to the ctrl-p cache
* New files won't be seen until you do this
* **note** ctrl y files are seen and are not cached

### :CtrlPLine
* It will search all buffer files for the words you type in the search
* So if I was looking for `jquery` it would highlight the line number in `package.json` (just a simple example)

### :CtrlPMixed
* Allow me to search through files, buffers, MRUs all in one
* This will prevent you from double opening a buffer (example)

## speed up keyboard
* Open settings on mac os sierra
* keyboard settings

![keyboard fast setting](https://i.imgur.com/9gk9Yfz.png)

## Karabiner Elements
* Download
* Open and make this change:

![caps locked mapped to escape](https://i.imgur.com/AowUp7G.png)

* Restart computer

* solarized for vim
* [link](https://github.com/altercation/vim-colors-solarized)

```
$ cd ~/.vim/bundle
$ git clone git://github.com/altercation/vim-colors-solarized.git
```

`.vimrc`

```
syntax enable
set background=dark
colorscheme solarized
```

