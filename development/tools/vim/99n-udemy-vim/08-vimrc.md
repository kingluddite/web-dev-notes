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
