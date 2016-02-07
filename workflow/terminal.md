# Terminal

## ZSH
This is a really cool terminal.
Here are free videos to learn how to use them.

[zsh videos](http://commandlinepoweruser.com/)
* Thanks for the tip Sean!

* add powerline fonts
[fonts](https://github.com/powerline/fonts/blob/master/Inconsolata/Inconsolata%20for%20Powerline.otf)

I like ZSH but I also like BASH as I've been using it so long and like the solarized and settings I set for it.

To easily switch to bash from zsh (make zsh your defaut profile). You can have a .bash_profile and a .zshrc file with all your aliases then to switch to bash

```
exec bash -l
```

That will log you in. If you don't do that you will have to refresh your .bash_profile with:

```
$ source ~/.bash_profile
```

## Terminal Cheatsheet
[terminal cheatsheet](https://github.com/0nn0/terminal-mac-cheatsheet/wiki/Terminal-Cheatsheet-for-Mac-(-basics-))

## iTerm is better

The terminal is cool but I really like iTerm (I think it's iTerm2 now).

[Link to iTerm 2](https://www.iterm2.com/features.html)
[How to use iTerm2](https://www.youtube.com/watch?v=SoTDXeyz3AE)
[How to Theme iTerm2](https://www.youtube.com/watch?v=SoTDXeyz3AE)
* Music is loud. Cut the volume and watch the great tutorial.

## Remove file/directory recursively

```
$ rm -R (name_of_file or name of directory)
```

## Move or rename

```
$ cp -R file.js some_folder 
```

**Important** not to add ending `/` or you'll copy just the files inside the directory!

## Home directory

## Clear terminal window when it gets too full

```
$ clear
```

## Quickly change to `home` directory

```
cd (or cd ~)
```

## Grab image from remote location and pull to your computer

```
$ curl https://fbstatic-a.akamaihd.net/rsrc.php/v2/yx/r/038LUUqibNf.png -O /images
```

## List files

```
$ ls
```

## List all files (hidden and and permissions)

```
$ ls -la 
```

## Change Directory

```
$ cd
```

## Make Directory

``` 
$ mkdir 
```

## Make File

```
$ touch 
```

## Move example

```
$ mv 287.jpg images/kitten.jpg
```

# SSH
* Your login, commands, and text are all encrypted when you use SSH
* On a remote shared hosting plan you need to check in the cpanel if this is enabled. If not, enable it.
* SSH allows you to perform secure file transfers and remote logins over an encrypted internet connection. Because you must have the private SSH key in order to authenticate a session, it is almost impossible to perform a brute force attack against an SSH connection. You can use this interface to create new SSH keys, import keys, manage keys, or delete keys in order to allow automated logins to SSH.

```
$ ssh remote_username@remote_host
# example: ssh admin@pizza.com
```

If your don't have a SSH key here is how you generate it:

```
$ ssh-keygen -t rsa -C "your_email@example.com"
```
2LbgWx.i3I%e

```
mysqldump --host=localhost --user=root --password=123 bhs --result-file=/Users/philiphowley/Documents/dev/puPHPet/bhs-wp/workspace/bhs-wp/wp-content/dump.sql
```

vagrant and brew on mac install
[link](http://sourabhbajaj.com/mac-setup/Vagrant/README.html)

moveword issues
the Movefile config
    * spacing is critical
    * comment in ftp (less secure) or ssh (more secure)
    * witch ftp or ssh double check your local and remote settings. I had to change my password on the remote for the database and the ftp
    * check the rules for passwords for remote (use their generator and save to location)

on vagrant box
had problems installing homebrew
found out you need to use linuxbrew
to install linuxbrew you need to make sure you pathe this in the terminal

```
export PATH="$HOME/.linuxbrew/bin:$PATH" 
   export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH" 
   export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
```

Then you will no longer get command not found. I tried to put in vagrant .bashrc file and reset terminal but it did not work.

I did
brew install ruby
because when I tried to install moveword it did not install because the linux version of ruby was too old.

the path of the local file movevile
wher is the database? should a host of 127.0.0.1
the user and password were created and let you know via puPHPet
The `local` vhost is going to be the domain you shared wi
Had problems installing Moveword because my vagrant ruby was too old. I had to upgrade rvm ruby version did that with

```
$ rvm get stable
$ rvm upgrade 2.0.0
```

Had problems with SSH. I didn't want to use FTP because it's not a secure way to transfer files. Since SSH is fully encrypted that is the better (but a little more complicated solution)
had a problem install ruby 2.0.0 - errored out
then looked for most recent ruby and it currently is 2.3.0
So I ran
```
$ rvm install ruby-2.3.0
```
That did the trick!
Now I can see that I have multiple rubies installed and my new ruby version is the default version.

Now I can install wordmove with:
```
$ gem install wordmove
```

So then I see that wordmove is recognized
```
$ wordmove
```

And now I try to push my wordpress from my vagrant spinup server
It says my authenticity of host can't be established. Do I want to continue? Yes
It then asks for my password (password of my remote host). I give it. Sadly, I will have to enter my password at each stage of this because I need to add my key to this vagrant box to not have this happen.

Problem - file permissions
After moving my wordpress files from Vagrant to My host - the file permissions would not let me access the site.

This changed all the folder and file permissions for my site:

```
$ find -type f -exec chmod --changes 644 {} + -o -type d -exec chmod --changes 755 {} +
```

Now once you move your site, you didn't move your wp-config file because those settings are dependent on your environment so you can just go through the browser walk through to create your wp-config file - once it is created you won't have to create it again because only new files are pushed.

To get the site you can then pull that info to your vagrant site. Once you do you will see it says you already have WordPress installed. This is great news. Just browse to your staging URL and you will see your site!

Now browse to enter your admin information:

http://yourstaging.url/wp-admin
Enter in same login information for logging into varant and you are off to the races!

Vagrant
access the database (mysql)
* http://192.168.56.101/adminer/ (or the IP you put in when creating with puPHPet)

### Remove existing files from the repository:

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

# Aliases
## .bash_profile

# Sample .bash_profile

This is your user configuration file. Alias are great to use for moving quickly around your files. Lots of other stuff you can do too but even if you only use aliases, then you will love the `.bash_profile`

```
export PATH=/usr/local/bin:/usr/local/sbin:$PATH
set -o vi

alias md='mkdir'
# running more than one web site on a single machine

## Apache
#alias editVhosts='sublime /etc/apache2/extra/httpd-vhosts.conf'
#alias restartApache="sudo apachectl restart"

# if trying to add IP and domains on your machine
#alias editHosts='sublime /etc/hosts'

# quick access to your bash file
alias bash='sublime ~/.bash_profile'
# refresh your bash 'refrash' lol!
alias refrash='source ~/.bash_profile'

#finding folders fast
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

# make and change into directory you made
function mcd() { [ -n "$1" ] && mkdir -p "$@" && cd "$1"; }

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
