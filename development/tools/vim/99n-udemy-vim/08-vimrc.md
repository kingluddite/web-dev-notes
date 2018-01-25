# vimrc
* rc = run commands (unix/linux)
* each time vim starts it runs commands in the .vimrc file
* system-wide vimrc and personal vimrc
    - unix/linux/mac: ~/.vimrc
    - windows: $HOME/_vimrc

## Version
`:version`

* Click spacebar to get to part that shows where system and local vimrc files are located
* Each line is executed as a command
    - set ruler = :set ruler
    - lines in vimrc file are NOT preceded with colon

## :set
* all the options that are set at something other than their default

## the `?`
* `:set incsearch?`
    - If it returns incsearch it means that option is turned on
    - If not it will say `noincsearch`

### help
* `:h hsl`
    - says **boolean** means `on` or `off`

### turn on hls
* `:set hsl`

### disable hls
* `:set nohls`

### toggle hls on/off
* `:set hls!`

### numbers as value of setting
* `:set history?`
* `:h history` + `ctrl` + `d`
    - lots of options
    - we want the one surrounded by single quotes `'history'`
* `:set history=500`
* up arrow shows history of commands
* :set history& (returns command to its default)
* :set
    - won't see history because :set only shows options that differ from their default value

### :e command
* edit command
    - `:e ~/.vimrc`

### 379 options in Vim
* view options `:h option-list`
* ctrl + f to scroll down long list
*   `:options` (other way to view options)

### Good to have a large history
* Change to 1000
* `set history=1000`
* You won't see this until your restart vim
    - You need to exit out of vim and start it again
    - :set history? (should now be set to 1000)

### Comments
Use `"` 

### Show the cursor position
`set ruler`

### Show incomplete commands
```
" show incomplete commands
set showcmd
```

* That lets you know when you are typing commands, when it is complete it goes away

### Show completion matches on status line
`set wildmenu`

`:h :hist`

* Hit tab key to scroll through all options
* When you have this set you'll get tabs that let you scroll through

## set scrolloff
`set scrolloff=5`

* When you use z + enter it scrolls down 5 lines from the top

## smartcase
* Tells vim to override the ignorecase if the search pattern contains uppercase letters
* ignorecase

## line numbering
* set number

## set ai (set autoindent)
* copies the indentation from current line when starting a new line
    - important setting for coders

## set si (smart indent)
* this is cool

```
log() {
    will put code here
}
```

## set bg
* Makes vim easier to see depending on our theme

## :color
* Will tell you your color scheme

### Set up a color scheme
`/Users/MYUSERNAME/.vim/colors`

* Any colors in here will be available as an option

## :map
* Change the behavior of mapped keys
* Allows you to bind a series of vim commands to a single key
* **most common** Define a series of keys to a function key

### :map format
`map KEY KEYSTROKES`

* <CR> ---> carriage return (enter key)

`map <F2> iJohnSmith<CR>123 Main Street<CR>Anytown, NY<CR><ESC>`

### Characters you can use with :map
<BS> Backspace
<CR> Enter
<Enter> Enter
<Return> Enter
<Space> Space
<Up> up arrow (other arrow keys available too)
<Insert> Insert
<Del> Delete
<Home> Home
<End> End
<PageUp> Page-Up
<PageDown> Page-Down
<Tab> Tab
<bar> '|'
<C-X> Ctrl-X
<F1>-<F12> Function Keys

### example
```
map <F3> i<ul><CR><Space><Space><li></li><CR><Esc>0i</ul><Esc>kcit
map<F4> <Esc>o<li></li><Esc>cit
```

**note** When remapping keys you can override existing vim commands

## Leader key
* By default leader key is `\`
* This gives you your own namespace which won't collide with any vim commands
* Many people start their custom mappings with a leader key

`map <leader>w :w!<CR>`

### Change default leader key
`let mapleader=","`

* Place this statement before the special leader variable otherwise mapping will use the default leader key

```
map <leader>w :w!<CR>
let mapleader=","
```

## Restart vim
* You can close and reopen to get vimrc to refresh
* Or you can `:source .vimrc`

## View all current mappings
`:map`

* View help `:h mapping`

## Make a vimrc file
`:mkvimrc`

### Reload
`:e` + enter`

* vmap - visual map (mapping only available in visual mode)
* nmap - normal map (mapping only available in normal mode)

#### Recursive Key Mapping
* **note** by default key mappings are recursive so if you use a map key in another key mapping it gets expanded there as well
    - vnoremap and nnoremap disables that functionality
    - it disables recursive keymapping for that map
    - vnoremap (visual)
    - nnoremap (normal)

## modeline
* " vim: set ft=vim :
    - ft ----> file type (Forces vim to treat this as a vim file type)
* :h modeline

## Simple vimrc
* set bg=dark
* color slate
* set wildmenu
* set ruler
