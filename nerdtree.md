# NERDtree
## toggle sidebar
<kbd>Ctrl</kbd> + <kbd>o</kbd>

## Split file to right
1. Navigate to file in explorer
2. Press <kbd>s</kbd>

## NERDTree Menu
1. Hover over file
2. Press <kbd>m</kbd>

* <kbd>a</kbd>dd a child
* (m)ove the current node
* (d)elete the current node
* (r)eveal in finder the current node
* (o)pen the current node with the system editor
* (q)uicklook the current node
* copy (p)ath to the clipboard
* (l)ist the current node
* Run (s)ystem command in this directory

# nvim
## Navigation
| keyboard binding  | action  | notes |
|---|---|---|
| <kbd>k</kbd> | move up 1 line  | `k` is an [ascendor](https://en.wikipedia.org/wiki/Ascender_(typography)) so movement is up
| <kbd>j</kbd> | move down 1 line  | `j` is an [descender](https://en.wikipedia.org/wiki/Descender) so movement is down
| <kbd>h</kbd> | move left 1 space | `h` is to the left of `j`
| <kbd>;</kbd> | move right 1 space | `;` is to the right of `l`
| <kbd>ctrl</kbd> + <kbd>u</kbd>| move up half page | 
| <kbd>ctrl</kbd> + <kbd>d</kbd>| move down half page | 

* delete line `dd`

## Custom Key Mappings
* Set up in your mappings config file

| keyboard binding  | action  | notes |
|---|---|---|
| <kbd>j</kbd> + <kbd>k</kbd> | switch to command mode (custom map) |
| <kbd>z</kbd> + <kbd>z</kbd> | save file |


# tmux
* I turned mouse off (this makes navigating harder)ls
* Default Prefix is `ctrl-b`
* But I changed it to `ctrl-a` (home keys!)

## start up tmux
`$ tmux`

## kill a window
`ctrl-a` x then type `y` when it asks you to delete window

## show sessions
`ctrl-a` + `s`

## detach from a session
`ctrl-a` + `d`

## create a new named session
`$ tmux new-session -s development`

## reload tmux without closing down tmux
`Prefix-r`

## Buffers
### Kill all buffers but the current one
`:%bd|e#` (command mode)

* `%bd` - delete all buffers
* `e#` - open the last buffer for editing
* `|` - The pipe in between just does one command after another

`:%bd|e#|bd#` - to delete the `[No Name]` buffer that gets created

### Scrolling through output with Copy Mode
####  How do I get INTO Copy mode?
`Prefix` + <kbd>[</kbd>

####  How do I get OUT OF Copy mode? `Prefix` + <kbd>[</kbd>
`Prefix` + <kbd>enter</kbd>

### Moving faster than one key at a time in output
#### Jump to next word
<kbd>w</kbd> 

#### Jump back one word
<kbd>b</kbd> 

#### Jump to that character on same line
<kbd>f</kbd> + <kbd>any character</kbd>

#### Jump back to that character on same line
<kbd>F</kbd> + <kbd>any character</kbd>

### Moving Quickly Through the Buffer
#### Move up one page
<kbd>ctrl</kbd> + <kbd>b</kbd>

#### Move down one page
<kbd>ctrl</kbd> + <kbd>f</kbd>

#### Move to top of buffer history
<kbd>g</kbd>

#### Move to bottom of buffer history
<kbd>G</kbd>

### Searching through the Buffer
#### Search upwards for phrases or keywords
* while in copy mode + <kbd>?</kbd> + phrase + Enter (jumps to first occurence)
    - Press <kbd>n</kbd> to jump to next occurence
    - Press <kbd>N</kbd> to jump back to previous occurence

#### Search downwards for phrases or keywords
* while in copy mode + <kbd>/</kbd> + phrase + Enter (jumps to first occurence)
    - Press <kbd>n</kbd> to jump to next occurence
    - Press <kbd>N</kbd> to jump back to previous occurence
## No Mouse in Tmux? (Off and not the default On)
* Have turned this setting off
* How to navigate without a mouse
    - Let's say you build Gatsby and you get an error
    - You will be stuck and not able to scroll up through the terminal
    - To use your keyboard you have to `Prefix` + <kbd>[</kbd> + `up` or `/down` arrows
    - How to end scroll mode
        + Pressent <kbd>enter</kbd>

## Panes
* Open horizontal `Prefix -`
* Open vertical `Prefix | (shift)`
* Close pane `exit`

## Moving between panes
* Prefix h,j,k,l

## Moving between windows
* Prefix ctrl-h and Prefix ctrl-l

## Save tmux resurrect 
`Prefix` + `ctrl-s`

## Restore tmux resurrect
`Prefix` + `ctrl-r`

## Resizing panes
* Prefix H,J,K,L (shift)

## Sessions
### Kill session with name (or number)
`$ tmux kill-session -t NAME_OR_NUMBER`

* Don't be inside the session you are trying to end

## Windows
### Move to next window
`Prefix` + `n`

### Move to previous window
`Prefix` + `p`

# Sublime Text
* Preview Markdown
* Vim is running in Sublime Text
* I have bought a one time forever license (if you ever uninstall you need to grab that license number and reuse it or you will get ad popups)

## Open folder in sublime
`$ sop .`

## toggle sidebar
`cmd-k` + `cmd-b`

## enter command mode in vim
`jk`

# VS Code
* Vim is running in VS Code

# Chrome and Firefox Browser
## Chrome Extensions
* Vimium is running

# Alfred App
* Snippets
* Bookmarks

# Google Keep
* All valuable links

# ZSH (my shell preference)

# Alias
`$ notes` navigates to my `notes` folder which houses all of my web notes in markdown

## Git aliases
* Git Status `$ gs`
* Git add `$ ga .`
* Git commit `$ gc -m 'message'`

# functions
* Wes Bos Command Line

# Postman

# Insomnia

# Workbench

# MongoDB Compass

# Homebrew

# Dotfiles

# Terminal (Alacritty) (backup is Iterm)

# macOS My operating system

# Git

# Github

# Alfred app
* Snippets
    - `!gat` - http://localhost:8000 (run Gatsby Local server)
    - `!san` - http://localhost:3333 (run Sanity local server)
    - `!pg` - http://localhost:8000/___graphql (run GraphQL Playground Local server (aka GraphiQL))

# Databases
```
brew install sqlite3
brew install postgresql
brew services start postgresql
```

* **PROBLEM** You may see an error like this when you type ‘psql’ command:

`psql: FATAL: role “postgres” does not exist`

* **solution** To solve this problem, go to this [link](https://stackoverflow.com/questions/15301826/psql-fatal-role-postgres-does-not-exist#answer-15309551)

# Rectangle
* This tool replaces Spectacle which is no longer managed and they recommend using Rectangle
* I like to move windows around with keyboard shortcuts

## Main keys bindings I use
* Top left quarter <kbd>cmd</kbd> + <kbd>cntl</kbd> + <kbd>alt</kbd> + <kbd>[</kbd>
* Top right quarter <kbd>cmd</kbd> + <kbd>cntl</kbd> + <kbd>alt</kbd> + <kbd>]</kbd>
* Bottom right quarter <kbd>cmd</kbd> + <kbd>cntl</kbd> + <kbd>alt</kbd> + <kbd>'</kbd>
* Bottom left quarter <kbd>cmd</kbd> + <kbd>cntl</kbd> + <kbd>alt</kbd> + <kbd>;</kbd>
* Full screen <kbd>cmd</kbd> + <kbd>cntl</kbd> + <kbd>alt</kbd> + <kbd>space</kbd>
* Next Screen (I use multiple monitors) <kbd>cmd</kbd> + <kbd>cntl</kbd> + <kbd>alt</kbd> + <kbd>p</kbd>