# How to set up your computer before class begins.

## Installs

### Spectacle
Mac Window Management

[Where can I download it?](https://www.spectacleapp.com/)

### Install Alfred App

[Where can I download it?](https://www.alfredapp.com/)

Make sure to install it in your Applications folder when it asks you.

Open Preferences and make these changes
[General](https://i.imgur.com/F1Ou3aL.png)
[Features](https://i.imgur.com/vBWiKh6.png)

### Install Sass
```
$ sudo gem install sass
```

### Sublime Text 3
* [Where Can I download Sublime Text 3?](https://www.sublimetext.com/3)

What do I need to install for Sublime Text 3?
[Package Controller](https://packagecontrol.io/installation)

What Packages do I need to install on Sublime Text 3?
* Emmet
* SidebarEnhancements
* AutoFileName
* MarkdownEditing
* MarkdownPreview
* HTML-CSS-JS Prettify
* Sass
    - for Sass Syntax

**note**: You will install node (see below). Once that is installed you will set HTML-CSS-JS Prettify to format on save by opening the command palette (`cmd` + `shift` + `p`) and typing `option` and choosing this:

![prettify options](https://i.imgur.com/1DFfbgL.png)

That will open the `HTMLPrettify.sublime-settings` file and make this change:

```js
  // Automatically format when a file is saved.
  "format_on_save": true,
```

Now (_if you have installed node_) all your **CSS**, **JS** and **HTML** will autoformat on save.

You can alter the formatting options inside the `.jsbeautifyrc` file
* Open command palette and type `pretty pref`

### Iterm 2

I suggest setting these preferences
![General](https://i.imgur.com/lRaU1E0.png)

![Profile > General](https://i.imgur.com/gNK4HXz.png)

**Note** `Profile` > `Colors` - If you are using the `bash` shell, follow these instructions, if you are using the `zsh` shell, you must be a rock star and you probably know how to set up your `zsh` better than me so I'll leave you at it. 

Back to the `bash` shell. First, you need to make the colors look cool so download `Solarized` 

[download link](http://ethanschoonover.com/solarized). 

Once you have that, extract the zip file and look for the `iTerm2` folder. Import the two themes from the `iTerm2` folder into the `Profile` > `Color` section of the `iTerm2` **preference** panel. 

After importing, select the following:
![Dark Solarized](https://i.imgur.com/szNQCZ5.png_)
![Profile Text](https://i.imgur.com/oq5af1P.png)
![Profile Window](https://i.imgur.com/JmMiOvx.png)
![Profile Terminal](https://i.imgur.com/HzENjkR.png)
![Keys](https://i.imgur.com/QBswDmJ.png)

### Open Sublime Text 3 from the Terminal

Type this inside your Terminal

```
$ sudo ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
```

Now test to see if it works by creating a folder called `test` on your desktop and inside this folder create a file called `junk.txt`. Browse to the inside of the `test` folder using the terminal and once inside, type `sublime .`

If Sublime opens, you are ready to move on to the next installation. If it doesn't, contact me and I'll help you troubleshoot.

### .bash_profile
If you are using the bash shell you need to create one. So in the Terminal, type `cd` and that will take you to your `home directory`.

Once there create your `.bash_profile` file.

```
$ touch .bash_profile
```

You need to open `.bash_profile` in and text editor and I suggest the VI editor

```
$ vi ~/.bash_profile
```

Now VI is not the easiest editor to learn how to use. It is an old school editor and so the GUI stuff you are used to on MAC is no where to be found in the VI editor. All we want to do is insert some text, exit and save.

Here is the text we want to insert into our .bash_profile file. Highlight all of the following text and copy it.

```bash
export PATH=/usr/local/bin:/usr/local/sbin:$PATH
# The following MAMP export stuff is needed when you work with WP-CLI
# If you don't use it, you will get lots of errors and spend hours of your life trying to fix them. I just save you hours of your life!!! :)
# Use MAMP version of PHP
#PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
#export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
#export PATH="/Applications/MAMP/Library/bin:$PATH"

set -o vi

# =================
# Aliases
# =================

## Apache
#alias editVhosts='sublime /etc/apache2/extra/httpd-vhosts.conf'
#alias restartApache="sudo apachectl restart"

# if trying to add IP and domains on your machine
#alias editHosts='sublime /etc/hosts'

## General aliases

alias md='mkdir'

# quick access to your bash file
alias bash='sublime ~/.bash_profile'

# refresh your bash 'refrash' lol!
alias refrash='source ~/.bash_profile'

# finding folders fast
# Sites is a file that many mac developers use to host their local dev files.
# Old Mac OS had it created by default, no you have to create it
alias sites='cd ~/Sites/'
alias desk='cd ~/Desktop/'
alias notes='cd ~/Documents/dev/web-dev-notes'
alias ..='cd ../'                           # go back 1 directory
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 directory levels

# clear screen on terminal
alias cls='printf "\33c\e[3J"'

# open up sublime from terminal
alias sop='sublime .'

# LS lists information about files.
# show slashes for directories.
alias ls='ls -F'

# long list format including hidden files and include unit size
alias ll='ls -la'

# go back one directory
alias b='cd ..'

# History lists your previously entered commands
alias h='history'

# If we make a change to our bash profile we need to reload it
alias reload="clear; source ~/.bash_profile"

# confirm before executing and be verbose
alias cp='cp -iv'
alias mv='mv -iv'
alias rm='rm -iv'
alias mkdir='mkdir -pv'

# ====================
# Git Aliases
# ====================
alias gs='git status'
alias gap='git add -p'
alias ga='git add '
alias gb='git branch '
alias gc='git commit'
alias gd='git diff'
alias go='git checkout '
alias gk='gitk --all&'
alias gx='gitx --all'
alias glog='git log --pretty=oneline --abbrev-commit'
# when I mispell git commands the following 2 commands help
alias got='git '
alias get='git '

# =================
# Additional Aliases
# =================

# Kill Mongo process when it gets hung up
alias monkill='ps aux | grep mongod'

# Hide/show all desktop icons (useful when presenting)
alias hide_desktop="defaults write com.apple.finder CreateDesktop -bool false && killall Finder"
alias show_desktop="defaults write com.apple.finder CreateDesktop -bool true && killall Finder"

# Hide/show hidden files in Finder
alias hide_files="defaults write com.apple.finder AppleShowAllFiles FALSE && killall Finder"
alias show_files="defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder"

# List any open internet sockets on several popular ports.
# Useful if a rogue server is running
# http://www.akadia.com/services/lsof_intro.html
# http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
alias rogue='lsof -i TCP:3000 -i TCP:4567 -i TCP:8000 -i TCP:8888 -i TCP:6379'

# ================
# Application Aliases
# ================
alias chrome='open -a "Google Chrome"'

# =================
# History
# =================

# http://jorge.fbarr.net/2011/03/24/making-your-bash-history-more-efficient/
# Larger bash history (allow 32Â³ entries; default is 500)
export HISTSIZE=32768
export HISTFILESIZE=$HISTSIZE

# don't put duplicate lines in the history.
export HISTCONTROL=ignoredups

# ignore same sucessive entries.
export HISTCONTROL=ignoreboth

# Make some commands not show up in history
export HISTIGNORE="h"

# =================
# nvm (load io.js as node)
# =================

###export NVM_DIR=~/.nvm
####source ~/.nvm/nvm.sh
####nvm use iojs-v1.6.2 2&> /dev/null

# =================
# Functions
# =================

# =================
# Tab Improvements
# =================

## Tab improvements
# ## Might not need?
# bind 'set completion-ignore-case on'
# # make completions appear immediately after pressing TAB once
# bind 'set show-all-if-ambiguous on'
# bind 'TAB: menu-complete'

# =================
# Sourced Scripts
# =================

# Builds the prompt with git branch notifications.
if [ -f ~/.bash_prompt.sh ]; then
  source ~/.bash_prompt.sh
fi

# A welcome prompt with stats for sanity checks
if [ -f ~/.welcome_prompt.sh ]; then
  source ~/.welcome_prompt.sh
fi

# bash/zsh completion support for core Git.
if [ -f ~/.git-completion.bash ]; then
  source ~/.git-completion.bash
fi

# ====================================
# Environmental Variables and API Keys
# ====================================

# Sexy Bash Prompt, inspired by "Extravagant Zsh Prompt"
# Screenshot: http://img.gf3.ca/d54942f474256ec26a49893681c49b5a.png
# A big thanks to \amethyst on Freenode

if [[ $COLORTERM = gnome-* && $TERM = xterm ]]  && infocmp gnome-256color >/dev/null 2>&1; then export TERM=gnome-256color
elif infocmp xterm-256color >/dev/null 2>&1; then export TERM=xterm-256color
fi

if tput setaf 1 &> /dev/null; then
    tput sgr0
    if [[ $(tput colors) -ge 256 ]] 2>/dev/null; then
      MAGENTA=$(tput setaf 9)
      ORANGE=$(tput setaf 172)
      GREEN=$(tput setaf 190)
      PURPLE=$(tput setaf 141)
      WHITE=$(tput setaf 256)
    else
      MAGENTA=$(tput setaf 5)
      ORANGE=$(tput setaf 4)
      GREEN=$(tput setaf 2)
      PURPLE=$(tput setaf 1)
      WHITE=$(tput setaf 7)
    fi
    BOLD=$(tput bold)
    RESET=$(tput sgr0)
else
    MAGENTA="\033[1;31m"
    ORANGE="\033[1;33m"
    GREEN="\033[1;32m"
    PURPLE="\033[1;35m"
    WHITE="\033[1;37m"
    BOLD=""
    RESET="\033[m"
fi

parse_git_dirty () {
  [[ $(git status 2> /dev/null | tail -n1) != "nothing to commit (working directory clean)" ]] && echo "*"
}
parse_git_branch () {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"
}

PS1="\[${BOLD}${MAGENTA}\]\u \[$WHITE\]at \[$ORANGE\]\h \[$WHITE\]in \[$GREEN\]\w\[$WHITE\]\$([[ -n \$(git branch 2> /dev/null) ]] && echo \" on \")\[$PURPLE\]\$(parse_git_branch)\[$WHITE\]\n\$ \[$RESET\]"
#Always use color output for `ls`
if [[ "$OSTYPE" =~ ^darwin ]]; then
alias ls='ls -G'
else
alias ls='ls –-color'
export LS_COLORS=’no=00:fi=00:di=01;35:ln=01;36:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.gz=01;31:*.bz2=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.avi=01;35:*.fli=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.flac=01;35:*.mp3=01;35:*.mpc=01;35:*.ogg=01;35:*.wav=01;35:’
fi

# Setting PATH for Python 2.7
# The orginal version is saved in .bash_profile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/2.7/bin:${PATH}"
export PATH

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
```

Now that you have that chunk of code saved to the clipboard and have .bash_profile opened in the VI editor.

Type `i` on your keyboard. This puts you in `insert` mode in the VI editor. This just enables you to be able to insert or type stuff.

Type `ctrl` + `v` to past your chunk of code into the VI editor.

Click the `esc` key (top left of your keyboard). This will put the VI editor into COMMAND mode.

Type `:` + `w` + `q` + `!`
* This is letting you `write` + `quit` + `force` which is strange way of writing the new stuff, exiting the program and saving your changes.

You won't see anything happen after these changes until you reset the terminal with this command (you always need to do this whenever you make changes to your `.bash_profile` file)

```
$ source ~/.bash_profile
```

You should now see some color on your terminal Woo Hoo!
* If not, let me know and I'll help you troubleshoot.

#### Coolness of this .bash_profile
You just added a bunch of useful aliases that will help you navigate around your Mac like a champ. Bring your laptop to parties and impress people with how fast you can navigate folders. You will be the hit of the party.

You also can now open Sublime Text 3 in the Terminal with by just typing this alias `sop`.

### Install Homebrew

[Where is the homebrew site?](http://brew.sh/)

Copy and paste this into your terminal. Follow the defaults to install it.

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Once homebrew is installed you can type this

```
$ brew
```

And won't get `command not found` error.

Now install the cool `tree` program for Macs

```
$ brew install tree
```

### Install Node

```
$ brew install node
```

Helpful brew stuff

See if brew is sick

```
$ brew doctor
```

Update brew

```
$ brew update
```

Upgrade all installed brew packages

```
$ brew upgrade
```

## Make Sublime Text look cool

* Install the following packages (if not you will get errors)
  - Material Theme
  - Seti UI

```js
{
  "bold_folder_labels": true,
  "caret_extra_bottom": 3,
  "caret_extra_top": 3,
  "caret_extra_width": 2,
  "caret_style": "phase",
  "close_windows_when_empty": true,
  "theme": "Material-Theme.sublime-theme",
  "color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
  "create_window_at_startup": false,
  "default_line_ending": "LF",
  "drag_text": false,
  "draw_white_space": "all",
  "ensure_newline_at_eof_on_save": true,
  "fade_fold_buttons": false,
  "font_face": "Menlo",
  "font_options":
  [
    "subpixel_antialias"
  ],
  "font_size": 24.0,
  "highlight_line": true,
  "highlight_modified_tabs": true,
  "hot_exit": false,
  "ignored_packages":
  [
  ],
  "line_padding_bottom": 2,
  "line_padding_top": 2,
  "overlay_scroll_bars": "enabled",
  "remember_open_files": false,
  "rulers":
  [
    80
  ],
  "saves_on_focus_lost": true,
  "scroll_past_end": true,
  "tab_size": 2,
  "theme": "Seti.sublime-theme",
  "translate_tabs_to_spaces": true,
  "trim_trailing_white_space_on_save": true,
  "word_separators": "./\\()\"':,.;<>~!@#$%^&*|+=[]{}~?",
  "word_wrap": true,
  "wrap_width": 80
}
```

### Change MAMP configurations

1. First create a `Sites` folder in your `home directory`

I say `home directory` a lot. If you ever just type `cd` by itself in the terminal, it will take you to your `home directory`. The `~` is the key that represents the `home directory` so you could also type this `cd ~` and that will take you to your `home directory`. (I just type `home directory` 5 times. Yikes!)

### Install WP-CLI

[Where is site?](http://wp-cli.org/)

Download it

```
$ curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
```

Check if it works

```
$ php wp-cli.phar --info
```

Change so we can just use `wp` to get it working

```
$ chmod +x wp-cli.phar
$ sudo mv wp-cli.phar /usr/local/bin/wp
```

If you did things correctly, this next command will spit out php info

```
$ wp --info
```

If you get php info, success. If not, contact me and I'll help you troubleshoot.

## Atom Install
If you are more comfortable using Atom, feel free. Here is Mitch's install instructions with a bunch of Atom plugins pre-installed.

# Finished!





