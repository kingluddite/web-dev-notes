# Tmux Cheatsheet
## Adding ruby for tmuxinator
* tmuxinator is a simple tool you can use to define and manage different tmux configurations
* tmuxinator requires the Ruby interpreter (so you need to have that on your system)
    - Ruby is already on Mac
    - However if y ou plan to use Ruby for anything beyond tmuxinator it is strongly incouraged to install Ruby through RVM
    - I used [this site](https://kemalmutlu.medium.com/installing-ruby-on-rails-macbook-pro-m1-4272da855fb3)
* On M1 use iTerm and open it via Finder and check `Open using Rosetta` option

### Install ruby and rbenv

`$ brew install rbenv ruby-build`

```
# Add rbenv to bash so that it loads every time you open a terminal
$ echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.zshrc
source ~/.zshrc
# Install Ruby
$ rbenv install 2.7.2
$ rbenv global 2.7.2
$ ruby -v
```

### Install tmuxinator
`$ gem install tmuxinator`

### Choose your default editor
* In .zshrc

`export EDITOR=nvim`

* Source your .zshrc (I use an alias I called `zfrash` to do this)

## Not using mouse in terminal
* So how can you scroll?
    - Prefix + `[` (then use arrow keys to scroll)

## Show keybindings (out of the box)
`$ man tmux`

`Prefix tmux ?`
## Refresh tmux
* Changes to the config file aren't read by tmux automatically
* So if you are editing your .tmux.conf file while tmux is running you have choices for the change to take effect:
    - Completely close ALL tmux sessions (not fun)
    - Enter tmux's Command mode with **Prefix** `:` and then type:
        + `source-file ~/.tmux.conf`

## Quick way to reload Tmux config
`$ Prefix r`

## Prefix
* This is the combo you start with before you type other commands in Tmux
* The out of the box Prefix is `ctrl-b` but that is a bit hard to type
* I changed the Prefix to `ctrl-a`
* And I used Karibiner Elements on Mac to change my Caps Loc to my left control

![switch caps lock to contrl](https://i.imgur.com/mANdoxO.png)

## Panes
* Open horizontal `Prefix -`
* Open vertical `Prefix | (shift)`
* Close pane `exit`

## Moving between panes
* Prefix h,j,k,l

## Moving between windows
* Prefix ctrl-h and Prefix ctrl-l

## Resizing panes
* Prefix H,J,K,L (shift)

`~/.tmux.conf`

```
# Fix issue with incorrect Vim colors
set -g default-terminal "xterm-256color"

# # If you kill tmux server or shut down your computer tmux sessions come back to life
# set -g @plugin 'tmux-plugins/tmux-resurrect'

# start with window 1 (instead of 0)
set -g base-index 1

# don't rename windows automatically
set -g allow-rename off

# enable vi mode keys
set-window-option -g mode-keys vi

# mouse control (clickable windows, panes, resizable panes)
set -g mouse on

# vi-escape delays - https://www.johnhawthorn.com/2012/09/vi-escape-delays/
set -s escape-time 0

# reload config file
bind r source-file ~/.tmux.conf

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'
# Other examples:
# set -g @plugin 'github_username/plugin_name'
# set -g @plugin 'github_username/plugin_name#branch'
# set -g @plugin 'git@github.com:user/plugin'
# set -g @plugin 'git@bitbucket.com:user/plugin'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```

## List all sessions
`$ prefix + s`

* https://gist.github.com/MohamedAlaa/2961058
* https://michaelsoolee.com/moving-tmux-panes/#:~:text=To%20move%20your%20tmux%20panes,in%20a%20clock%2Dwise%20direction

## Tmux cheat sheet & quick reference
https://tmuxcheatsheet.com/

## Get excited about tmux sessions, windows, panes and buffers together!
https://www.youtube.com/watch?v=hbs7tuwpgZA
## Tmux resurrect
* You'll need to install the tmux plugin manager (tpm)
    - https://github.com/tmux-plugins/tpm
Restore tmux environment after system restart.

Tmux is great, except when you have to restart the computer. You lose all the running programs, working directories, pane layouts etc. There are helpful management tools out there, but they require initial configuration and continuous updates as your workflow evolves or you start new projects.

tmux-resurrect saves all the little details from your tmux environment so it can be completely restored after a system restart (or when you feel like it). No configuration is required. You should feel like you never quit tmux.

It even (optionally) restores vim and neovim sessions!

Automatic restoring and continuous saving of tmux env is also possible with tmux-continuum plugin.

* [docs](https://github.com/tmux-plugins/tmux-resurrect)
* If you shut down your computer and want to bring all your tmux sessions back to life?

### Save tmux resurrect `Prefix + Ctrl-s` (SAVE)
* And when you want to restore your tmux sessions after turning off your computer or killing your tmux server

## Timux Zoom
* You have multiple panes open and you want to zoom one
* Remember there is a difference between panes (total separate terminal) vs splitting windows (splitting windows is a terminal specific function)
* So if you have a new terminal open (use ctrl + b + z will zoom the current window to show all of that pane) - use again to toggle back to former size
* Navigating between panes is ctrl + b and use arrow keys
* To close a pane you use `ctrl + b + c` and yes to close the pane
* How do you zoom z window

### Tmux Window zoom
* when multiple windows are open and you want one file to be open full use `:tabnew %`
* Then to close that window use `:wq`

## Kill all server
`$ killall tmux`

## [exited] in tmux
* Anytime I try to open a new tmux session I get this in my terminal

![tmux not working and getting this](https://i.imgur.com/wlFfNFz.png)

* The fix is simple

`$ killall tmux`

[the source of the fix and more details](https://superuser.com/questions/397076/tmux-exits-with-exited-on-mac-os-x)

* **note** If you are on a M1 macOS chip you will get this error after the install:
Error: Cannot install under Rosetta 2 in ARM default prefix (/opt/homebrew)!

```
To rerun under ARM use:
    arch -arm64 brew install ...
```

So use this `arch -arm64 brew install reattach-to-user-namespace`

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
`:%bd|e#` (kills all buffers but current one)

### Kill all buffers
* If you have a ton of buffers and want to clean them up with one command, here it is:

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
## maximize split window temporarilly
* :tabedit % (maximizes)
* :q (returns to split window)

## Make current window max and close others
* `ctrl` + `w` + `o`

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
