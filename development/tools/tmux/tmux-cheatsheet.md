# Tmux Cheatsheet
* https://gist.github.com/MohamedAlaa/2961058
* https://michaelsoolee.com/moving-tmux-panes/#:~:text=To%20move%20your%20tmux%20panes,in%20a%20clock%2Dwise%20direction 

## prefix
`$ ctrl + b`

## panes
Open up a horizontal pane

`$ prefix + "`

## Resize down
`prefix + :`

* Then `:resize-pane -D 20`
    - `-D` Down
    - `20` units to move down

* Resize up with `:resize-pane -U 4`
* Resize left with -L
* Resize right with -R

## Split vertical is %
* Makes sense as the top and bottom of the percent

## Move panes
`prefix + o` (cycles through open panes)

## Version
`$ tmux -v`

## Run Tmux
`$ tmux -u`

## Buffers
### Kill all buffers
* If you have a ton of buffers and want to clean them up with one command, here it is

`:bufdo bd`

### Delete buffer by buffer number
`:bd n` (example: `:bd 29`)

## Sessions
### list all sessions
`$ tmux list-sessions`

### create session
`$ tmux new -s NAMEOFSESSION`

### detach from tmux
`ctrl` + `b` + `d` (you are detached!)

### attach to tmux
`$ tmux attach -t NAMEOFSESSION` (and now you are attached!)

### kill all sessions
`$ tmux kill-server`

### kill all sessions except for the one you're in
`$ tmux kill-session -a`

## kill a specific session (aka a targeted session)
`$ tmux kill-session -t TARGETSESSIONNAME`

## Window managment in Tmux
### Create a new window

`ctrl` + `b` + `c`

### Splitting windows - Vertical splits

`ctrl` + `b` + `%` (splits into 2 vertical windows)

### close pane
* `ctrl` + `b` + `x`

### Close window in session
* You have a bunch of windows running in your session and you want to get rid of one, here's how:

`$ exit`

### Move cursor to open split windows
* `ctrl` + `b` + `h` (left)
* `ctrl` + `b` + `;` (right)

### Change background color of tmux window
`$ ctrl + b + :select-pane -P 'bg=red'`

### Make tmux screen wider
`ctrl` + `b` + `alt` + `right arrow`

## Resources
### GNU Stow
* GNU Stow - https://www.gnu.org/software/stow/
* GNU Stow is a symlink farm manager which takes distinct packages of software and/or data located in separate directories on the filesystem, and makes them appear to be installed in the same place
* [managing dotfiles with stow great informative article](https://alexpearce.me/2016/02/managing-dotfiles-with-stow/)

### Tmux dotfile examples
* https://github.com/hamvocke/dotfiles/blob/master/tmux/.tmux.conf
* 
