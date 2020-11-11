# Tmux Cheatsheet
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
`$ tmux new -s bn`

### detach from tmux
`ctrl` + `b` + `d` (you are detached!)

### attach to tmux
`$ tmux attach` (and now you are attached!)

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

