# Tmux Intro
* Terminal multiplixer
* [documentation](https://github.com/tmux/tmux/wiki)
* If you are using multiple terminal windows and want to make life easier for yourself, switch to tmux

## Install tmux on remote server
* [Youtube video tutorial](https://www.youtube.com/watch?v=BHhA_ZKjyxo)

## Install homebrew
`$ brew install tmux`

## Run tmux
`$ tmux`

## split current window vertically
`$ ctrl b + %` (remember % is `shift` + `5`)

## Slit current window horizontally
`$ ctrl b + :split-window`

## Rename windows
`$ ctrl b + ,`

## Create new window
`$ ctrl b + c

* tmux windows start at 0
* Next window is 1
* Next window is 2...

## Move between windows
`$ ctrl b + w`

## Move between panes
`$ ctrl b + arrow` (Use your direction)

## Connect to remote server from 3 different panes in one window at the same time
* We would have to do this 3 separate times in 3 separate times
* But with tmux we can sync panes and type once and ssh 3 times simultaneously

`$ ctrl + b + :setw synchronize-panes on`

## Turn sync panes off

`$ ctrl + b + :setw synchronize-panes off`

## Create a session that sticks
`$ tmux new -s testing`

### Detach from session
`ctrl b + d`

#### List all tmux sessions
`$ tmux ls`

#### Attach to a detached session
* any time you can bring that session back (attach it)
* `testing` replace this word with the detached session's name you want to attach

`$ tmux a -t testing`

