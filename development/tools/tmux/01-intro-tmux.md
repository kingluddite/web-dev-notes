# Tmux Intro
## Great resources
* [tmux cheat sheet](https://gist.github.com/afair/3489752)
* [greatest tmux sheet](https://gist.github.com/spicycode/1229612)
* https://danielmiessler.com/study/tmux/

## gd and gD
* Quickly navigate around files by "jumping" into a function or file

1. gd will take you to the local declaration
2. gD will take you to the global declaration

## Kill node
`$ htop`

* Search for node
* Hit enter
* Press F9 to kill the process

## Kill port number
* Maybe you forgot to shut down an app running somewhere else - here's how
* 1. `$ lsof -w -n -i tcp:8080` (enter your port number)
* 2. `$ kill -9 processId`

## vim
### Remove highlights
* When searching for something you will see that it highlights the term and it's hard to remove the highlight, here's how to quickly remove the highlight
`:noh<cr>`

## All about buffers

### Kill all buffers
* If you have a ton of buffers and want to clean them up with one command, here it is

`:bufdo bd`

### Delete buffer by buffer number
`:bd n` (example: `:bd 29`)

## All about sessions

### attach and detach session

## VS code
### vim-tmux-navigator
* This plugin is a repackaging of Mislav Marohnić's tmux-navigator configuration described in this [gist](https://gist.github.com/mislav/5189704)
* When combined with a set of tmux key bindings, the plugin will allow you to navigate seamlessly between `vim` and `tmux` splits using a consistent set of hotkeys
    - [vim-tmux-navigator](https://github.com/christoomey/vim-tmux-navigator)

* Jump out of tmux and jump back in whenever you want

#### detach from tmux
`ctrl` + `b` + `d` (you are detached!)

#### attach to tmux
`$ tmux attach` (and now you are attached!)
    
## kill all tmux sessions
* You can run multiple sessions and if you want to blow them all up, here's how:
    - You can use `tmux kill-server` to cleanly and gracefully kill all tmux open sessions (and server)
    - If you are inside a tmux session you would like to keep, use 
        + `tmux kill-session -a` to close all other sessions
    - To close a specific session, use tmux list-sessions to identify the session you want to kill, and then use
        + `tmux kill-session -t targetSession` to kill that specific session
    - Also you can grossly kill all tmux processes with 
        + `pkill -f tmux`

## kill targeted session
`$ tmux kill-session -t TARGETSESSIONNAME`

### create session
`$ tmux new -s bn`

* Will create a new session called `backupsession`
* just like starting tmux but this is a named session
* `htop`
    - keeps polling proc every second
    - if I close ssh session it will kill htop
* Will bring you back to the shell but that htop process is still running

`$ ps aux | grep htop`

* If you log out of session `$ logout` (normally would kill all process)
* That would close connection and bring you back to original machine
* Log out of client
* Go home for the day
* Problem at night
* SSH back into server

### What tmux sessions do I have running?
* `$ tmux list-sessions`

* You will see `backupsession`
* You can reattach to it

`$ tmux attach -t backupsession`

* So htop was tied to session on tmux as opposed to tied to shell

## Super Basic Tmux
## Tmux
`$ tmux -u` runs it

`$ nvim`

## Window managment in Tmux
### Splitting windows
#### Vertical splits

`ctrl` + `b` + `%` (splits into 2 vertical windows)

## close pane
* `ctrl` + `b` + `x`

## get rid of window
* You have a bunch of windows running in your session and you want to get rid of one, here's how:

`$ exit`

## Move cursor to open split windows
* `ctrl` + `b` + `h` (left)
* `ctrl` + `b` + `;` (right)

## Create a  dow
`ctrl` + `b` + `c`

## How to navigate between windows
`ctrl` + `b` + `p` (previous)
`ctrl` + `b` + `n` (next)

## Make tmux screen wider
`ctrl` + `b` + `alt` + `right arrow`

## htop
* Watch and manage system resources efficiently
* https://www.cyberciti.biz/faq/install-htop-on-macos-unix-desktop-running-macbook-pro/

## change bg color of tmux window
`$ ctrl + b + :select-pane -P 'bg=red'`

* All the following are supported:
    - black
    - red
    - green
    - yellow
    - blue
    - magenta
    - cyan
    - white
    - default
    - bright
    - bold
    - dim
    - underscore
    - blink
    - reverse
    - hidden
    - italics
    - color0 ... color255, colour0 ... colour255 and RGB strings (#ff0000)

#### Windows

* `bind-key v split-window -h`
* `bind-key s split-window -v`

## Cycle through windows
* Use `C-b` + `'` to select the window index
* Use C-b w to get an interactive index to choose from (0-9a-z)

## Add bindings to cycle through quickly in tmux.conf
```
bind -r C-h select-window -t :-
bind -r C-l select-window -t :+
```

## Make alt + arrow keys move panes
![image of iterm meta keys](https://i.imgur.com/r6J9r98.png)

* Terminal multiplixer
* [documentation](https://github.com/tmux/tmux/wiki)
* If you are using multiple terminal windows and want to make life easier for yourself, switch to tmux

## dot-tmux
* [my tmux dotfile](https://github.com/kingluddite/dot-tmux)

## Refresh tmux
* After adding the tmux dotfile you need to refresh it to make the changes take effect
* This can be done either:

### From within tmux
* `Ctrl` + `b` and then `:` to bring up a command prompt, 
* And typing:

`:source-file ~/tmux.conf`

### Or simply from a shell:
`$ tmux source-file ~/tmux.conf`
`$ tfresh` (dotfile alias)

## Install tmux on remote server
* [Youtube video tutorial](https://www.youtube.com/watch?v=BHhA_ZKjyxo)

## Vi mode (these are inside the tmux dotfile)
* enable Vi mode in tumux (add to ~/.tmux/tmux.conf)

### Test if Vi mode is working
* `ctrl` + `b` + `:` ---> `list-keys -T copy-mode-vi`
    - Will list all vi-like functionality available in this mode

### Vi mode tricks
* With this done, within a tmux instance, pressing `Ctrl` + `B` and then `[`` will enter copy mode
    - Allowing you to copy text or view the history of the buffer
    - Including searching with `/` and `?`

#### Most of the basic `vi` movements work
* Including
    - **Screenwise vertical movement** commands like:
        + `Ctrl` +`f` and `Ctrl` +`B`
    - **Leave this mode**
        + Press `Enter`
    - **Start a selection**
        + By:
            1. Pressing space on a character
            2. Moving to another
            3. And then pressing `Enter`
* **note** If you have text copied like this you can paste it into any tmux window in that session by pressing` Ctrl+B` and then `]`

## more like vim
*  `v` starts a selection and `y` finishes it in the same way that Space and Enter do (dotfile)

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
`$ ctrl b + c`

* tmux windows start at 0
* Next window is 1
* Next window is 2...

## kill window
`ctrl` + `b` + `&`

## Move between windows
`$ ctrl b + w`

## kill pane
`ctrl` + `b` + `x`

## Move between panes
`$ ctrl b + arrow` (Use your direction)

## Scroll in pane
`$ ctrl b + [` then use normal nav keys to scroll (arrows)
or crl b + PgUp
or vi mode skift k down or shift j (up)

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

