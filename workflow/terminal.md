# Terminal

[sample osx bash profile article](https://natelandau.com/my-mac-osx-bash_profile/)

## Terminal Cheatsheet
[terminal cheatsheet](https://github.com/0nn0/terminal-mac-cheatsheet/wiki/Terminal-Cheatsheet-for-Mac-(-basics-))

## Terminal Commands

```
# Move or rename file
## the mv command and rename or move files
## not to add ending `/` or you'll copy just the files inside the directory!
$ cp -R file.js some_folder

# Simple list of files in directory
$ ls
**Important** not to add ending `/` or you'll copy just the files inside the directory!

## How do I move all files that are inside folder A into folder B
$ mv bhs/* ajax-gulp/


## Clear terminal window when it gets too full
$ clear

## Quickly change to `home` directory
$ cd ~
## or just
$ cd

# List all files (hidden and permissions)
## useful if you want to find out if you have read/write permissions on a folder/file
$ ls -la

# Change Directory
# if you just type cd by itself it takes you to the home directory
# ~ is the symbol for home directory
$ cd some-folder

# Make Directory
$ mkdir some-folder

# Make File
$ touch somefile.html

# Move a file
$ mv file.jpg images/kitten.jpg

# Where are you? (Present Working Directory)
$ pwd

# Clear terminal window when it gets too full
$ clear

# Remove file or folder recursively
## if will not be able to remove empty folders if you don't use the -r flag (recursive)
## the -f flag is force
$ rm -rf some-file.js
$ rm -rf some-folder

# grab image from internet and download to your computer
$ curl -O https://some-file.png
# put in images folder
$ curl -O https://some-file.png /images
# rename and download image
$ curl -O new-name.png https://some-file.png

# zip a file
zip -r archive_name.zip folder_to_compress

# unzip (extract) zip
unzip archive_name.zip
```

[download images with curl](http://osxdaily.com/2014/02/13/download-with-curl)

## Compress files Additional Information

[resource](http://coolestguidesontheplanet.com/how-to-compress-and-uncompress-files-and-folders-in-os-x-lion-10-7-using-terminal/)
### ZIP – Cross Platform

First up is ZIP one of the most commonly used compression techniques used across all platforms

If you want to make a zip without those invisible Mac resource files such as “_MACOSX” or “._Filename” and .ds store files, use the “-X” option in the command so:
```
$ zip -r -X archive_name.zip folder_to_compress
```

### TAR.GZ – Cross Platform

Second up is TAR, an old favourite on Unix/Linux – you add the GZ for the compression – compresses tighter than zip

To compress

```
tar -zcvf archive_name.tar.gz folder_to_compress
```

To extract

```
tar -zxvf archive_name.tar.gz
```

### TAR.BZ2 – Cross Platform

A variation on TAR GZ but with better compression than both tar.gz and zip.

To compress

```
tar -jcvf archive_name.tar.bz2 folder_to_compress
```

To extract

```
tar -jxvf archive_name.tar.bz2
```

### GZ

Without the tar

To extract

```
gunzip archivename.gz
```

# Aliases
## .bash_profile

### Sample .bash_profile

This is your user configuration file. 

Moving from one folder to the next can be time consuming and cumbersome. The GUI Finder is what most people use on their Macs but once you get comfortable with the Terminal you will quickly start using Aliases and these will improve your workflow. They are just short keys you time that will take you to a location on your computer you go to a lot. You add these inside your user configuration file which is usually the `.bash_profile`

Alias are great to use for moving quickly around your files. Lots of other stuff you can do too but even if you only use aliases, then you will love the `.bash_profile`

```
export PATH=/usr/local/bin:/usr/local/sbin:$PATH
# The following MAMP export stuff is needed when you work with WP-CLI
# If you don't use it, you will get lots of errors and spend hours of your life trying to fix them. I just save you hours of your life!!! :)
# Use MAMP version of PHP
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"

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
alias pup='cd ~/Documents/dev/puphpet'
alias notes='cd ~/Documents/dev/notes/web-dev-notes'
alias ..='cd ../'
alias db='cd ~/Dropbox'
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

# make and change into directory you made
function mcd() { [ -n "$1" ] && mkdir -p "$@" && cd "$1"; }

#######################################
# Start an HTTP server from a directory
# Arguments:
#  Port (optional)
#######################################

server() {
  local port="${1:-8000}"
  open "http://localhost:${port}/"
  # Set the default Content-Type to `text/plain` instead of `application/octet-stream`
  # And serve everything as UTF-8 (although not technically correct, this doesnâ€™t break anything for binary files)

  # Simple Pythong Server:
  # python -c $'import SimpleHTTPServer;\nmap = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map;\nmap[""] = "text/plain";\nfor key, value in map.items():\n\tmap[key] = value + ";charset=UTF-8";\nSimpleHTTPServer.test();' "$port"

  # Simple Ruby Webrick Server:
  ruby -e "require 'webrick';server = WEBrick::HTTPServer.new(:Port=>${port},:DocumentRoot=>Dir::pwd );trap('INT'){ server.shutdown };server.start"
}

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

How do I switch to the `bash` shell from zsh?
```
$ exec bash
```

How do I switch from bash to zsh shell?
```
$ exec zsh
```

