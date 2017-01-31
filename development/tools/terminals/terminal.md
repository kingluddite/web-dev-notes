# Terminal

[10 Terminal Commands that will bost your productivity](https://code.tutsplus.com/articles/10-terminal-commands-that-will-boost-your-productivity--net-14105)

## How to DNS lookup with Mac Terminal
`$ dig ns www.domain.com`

# curl command would open Sublime and can't write to body error in terminal.
I had to jump into `.bashrc` `.zshrc` and `.bash_profile`. I found out that if you type `alias` in the terminal it will list all your alias' in alphabetical order and which file they are in. Turns out I used a reserved word for an alias which was `bash`. I need to find and comment out all of them to get curl to work again. the curl command was using the `bash` word in the script

`curl -s https://php-osx.liip.ch/install.sh | bash -s 7.1`

* I was trying to download the latest version of PHP

And when it got to `bash` in that command, it would open Sublime Text and the bash file.

Here was my alias that caused the problem (I also had the alias in both .bash_profile and .zshrc so I had to comment them both out)

`alias bash='sublime ~/.bash_profile'`
 
I just commented it out and, refreshed with `source ~/.bash_profile` and it worked again. But I wasted two hours trying to figure this out.

##iTerm2
Add visor
preferences > keys > Hotkey
* check Hotkeytoggle a dedicated window with profile
* Choose Hotkey Window from dropdown
* [more info](http://apple.stackexchange.com/questions/48796/iterm-as-a-slide-out-terminal-from-the-top-of-the-screen)
* remove animation
  - `defaults write com.googlecode.iterm2 HotkeyTermAnimationDuration -float 0.00001`

## select beginning of line
`ctrl` + `a`
## select end of line
`ctrl` + `e`
## kill to end-of-line
`ctrl` + `shift` + k
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
iterm2 Preferences
To jump between words and start/end of lines in iTerm2 follow these steps:

Go to iTerm2 Preferences (⌘,)
Open the “Keys” tab
Add the following Global Shortcut Keys
Jump to beginning of word

Keyboard Combination: ⌥←
Action: Send Escape Sequence
Escape: b
Jump to end of word

Keyboard Combination: ⌥→
Action: Send Escape Sequence
Escape: f
Jump to beginning of line

Keyboard Combination: ⌘←
Action: Send Hex Code
Escape: 0x01
Jump to end of line

Keyboard Combination: ⌘→
Action: Send Hex Code
Escape: 0x05
Don't forget to remove the previous bindings:

Open the “Profiles” tab
Click the sub-tab ”Keys”
Remove the mappings for key combinations ⌥← and ⌥→

## Hush login
remove login at top of Mac terminal
[how to do it](http://osxdaily.com/2010/06/22/remove-the-last-login-message-from-the-terminal/)

```
$ touch ~/.hushlogin
```

# Coding Environments

## Code Editors
Software for editing code, often extendable.

* Atom
* Sublime Text (Sublime Text Power User - Wes Bos)

# Atom

## Default Atom Features

### Keyboard Shortcuts
* [Flight Manual Link](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee)
* [link](https://github.com/nwinkler/atom-keyboard-shortcuts)
* [Cheat Sheet Link](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee)

### Navigation Features
* `opt` + right/left arrow moves to next or previous word
* `cmd` + right/back arrow jumps to beginning or end of line
* `cmd` + up/down arrow goes to top or bottom of document
* `cmd` + `shift` + right/left arrow highlights line from that spot
* `cmd` + `opt` + right/left highlights words at a time
* `ctrl` + `g` (jump to a line number)
* `cmd` + \ (toggle tree view)
* Navigating by symbols (or methods)
    - `cmd` + `r` (then search for what you want to work to in that file)
* Bookmarks (jump to any section of code)
    - `cmd` + `f2` (add a bookmark)
        + to use `f2` to jump to that bookmark or shift f2 to go backwards
    - `ctl` + `f2` (shows all bookmarks so you can easily jump to them)
        + you can set bookmarks all over your project and easily jump to them

### Search Features
* **find and replace**
    - Add the word you want to replace and do it case by case or through all occurences

#### Find in current file or selection
* `cmd` + `f` (simple search by default searches current open page)
    - But if we have a group of code selected we could search 'only in selection option' (`opt` + `cmd` + `s`)
    - But if you are searching through entire doc and you want to do a search for a word where several hits appear, use `cmd` + `g` to toggle through them all

#### Find across project
    - `cmd` + `shift` + `f`
    - you could search a specific file using regex
        + /js/*.js*

#### Find a symbol
    - `cmd` + `r` (find all methods or symbols inside a particular file)

#### Find a file
    - `cmd` + `t` (gives you a list and start typing for fuzzy search so you don't have to take your hands off the keyboard)

#### Snippets and Autocomplete
* Default snippets
    - html + tab (html page)
* You can create your own snippets
* You can add Snippets via packages
* Autocomplete by default
    - Type a word and hit enter and it will type the rest of the word (in dropdown)
    - Autocomplete tells you `f` it is a function

#### Folding
* Collapse / expand blocks of code
    - Hover over and click little down arrow
        + When you do you will see ... at end
            * Line numbers show you that lines are missing because they are collapsed
            * Click again to expand
                + `cmd + ]` opens code chunk
                + `cmd` + `[` collapses code chunk
        + **note** If you are in a large function with lots of nested ifs and other stuff, if you keep using the collapse keyboard shortcuts, it will keep toggling up to the very top level
        + **tip** Collapse the methods that are working and open the one's that are not working, helps you focus better
* Improves navigation and concentration
* Can quickly access via shortcuts

#### Panes
* View multiple files at once
* can split into multiple columns and rows
* panes can contain tabs as well
* click on tabs after opening files and split up/down/left/right
* `cmd` + `shift` + `p` (type Panes) and keep typing to create that pane

## Integrated Development Environment (IDE)
Code editor with additional tools and extensive built-in features

# Command Line

## Common Terms
* Operating System (OS)
    - Software that supports the core functionality of a computer, peripherals and applications (i.e. Mac or Android)
* Unix and Linux
    - Unix is an OS (paid) that evolved into Linux (GNU) [for free], which runs on all Macs and many web servers running web sites.
* Disk Operating System (DOS)
    - Group of OS (often meaning MS-DOS for Windows). Windows now supports Linux *
* Application (App)
    - Program designed to perform specific set of related tasks. Runs in an OS.
* Shell
    - User interface for OS or Application.
    - Two types:
        + GUI
        + CLI
* Graphical User Interface (GUI)
    - Allows app or OS interactions using peripherals and a designed interface.
* Command Line Interface (CLI)
    - A text input/out interface or interloper for an OS or an Application
* Bash (Bourne-Again Shell (Bash)
    - The most common shell or CLI for Linux. Default on Macs.
    - There are other Shell options (like Zsh)
* Console
    - Text only application that provide CLI access. (i.e. Terminal, iTerm)
    - **note** when we use the command line we are using a console but what we are typing and interacting with is actually the bash (or shell) that lets us do command line interactions
    - the terms often get lumped together but it is important to know the subtle differences
* The Command Line
    - A generic term for CLI commands used to interact with the OS, apps or small scripts or tools. Often refers to using an app like Terminal

# The Command Prompt
We open our terminal and the first thing we see is the `Command Prompt`

* Displays before command line input
    - Includes:
        + Computer name
        + Username
        + (and maybe much more as this can be configured)
    - Highly Customizable

[Change the name of your macOS user account and home folder](https://support.apple.com/en-us/HT201548)

In Mac Preferences:

![make computer name shorter](https://i.imgur.com/gYK06ub.png)

[Change your default terminal prompt](https://mattmazur.com/2012/01/27/how-to-change-your-default-terminal-prompt-in-mac-os-x-lion/)

## The Command Line Syntax
* Commands
* Options
* Parameters

`$ command` (first thing you type is the command)

`$ command --option` (long way to type out options)

`$ command -o` (short way to type out options)

`$ command -oa` (short way and combining options)

`$ command -o parameter` (short way with options and parameters)

If you working with git or some other tool you may see

`$ tool command -o parameter`

## Basic Commands
* pwd - Current directory
* cd - Change directory
    - `$ cd ../` (back out of a folder)
* ls - List items in directory
* touch - Create a file
* mkdir - Create a directory
* cp - Copy files
    - you can copy a folder into another folder and rename it at the same time
        + `$ cp styles.css css/new-style.css`
        + you can do the same thing with the `mv` command
            * it won't duplicate it but it will rename it
* mv - Move files
* rm/rmdir - Deleting
    - `rmdir name-of-directory`

[Index of Linux Commands](http://www.linfo.org/command_index.html)

[ls](http://linuxcommand.org/man_pages/ls1.html)

[Learning the Shell](http://linuxcommand.org/lc3_learning_the_shell.php)

**notes**
* if you folders have spaces then type `$ ls "My Desktop"`
* if you are getting low in the terminal type `ctrl` + `l` (and then you can scroll back up)
    - `ctrl` + `k` clears screen but you can't scroll back up

## Options

ls -l (long form view of your files)
ls -al (it will show all files) (hidden files too and permissions)

## Command Line Tips
* clear screen
* command history
* tab autocomplete
* piping
* open Command
* head and tail commands

clear screen
`ctrl` + `l`
`cltr` + `k` (hard clearing)

`up arrow` shows history

autocomplete
begin name and tab to autocomplete

you can use `\` to escape spaces

## piping

`$ touch README.md | ls`

That will create a file and then list all the files that are now in the pwd

this won't work
`$ cd css | ls`

you need to type it like this

`$ (cd css; ls )`

* the above is using something called `subshells`

# open a folder inside the finder
open . (opens current folder in finder)
you can drag and drop any folder from finder and it will put the full path into the Terminal

`$ atom .` (opens directory into atom)

## Head and Tail

`$ head style.css`

Will show you the first lines of that file 

`$ tail style.css`

Shows you the bottom lines of that file

## Wes Bos Command Line
* Using iTerm
* ZSH as a bash alternative
* ZSH Plugins
* Oh My ZSH Themes
* Z shortcuts
    - build up your Z Database (amazing and saves you a ton of time with changing directories), in time z becomes faster than the mouse
* Advanced History
* Use Trash instead of `rm`

Practice these more
* iTerm and Coding Environment
* Explore ZSH Themes (Create Your Own)
    - `$ atom ~/.zshrc`

Add `ZSH_THEME="random"`

open a bunch of tabs and you will see different themes
when you find one you like:

`$ print $RANDOM_THEME`
then you can save the theme and rename it and tweak it
comment out a bunch so you can jump back to one if you want

* Switching between bash and zsh
`$ exec bash`
`$ source ~/.bash_profile`

`$ exec zsh`

also you can use (wonky)
`$ chsh -s /bin/bash`
enter your password
restart terminal window

or
`$ chsh -s /bin/zsh`
enter password
restart terminal window

## scp
Transfer files from local to remote and vice versa

The syntax for scp is:

If you are on the computer from which you want to send file to a remote computer:

scp /file/to/send username@remote:/where/to/put
Here the remote can be a FQDN or an IP address.

On the other hand if you are on the computer wanting to receive file from a remote computer:

scp username@remote:/file/to/send /where/to/put
scp can also send files between two remote hosts:

scp username@remote_1:/file/to/send username@remote_2:/where/to/put
So the basic syntax is:

scp username@source:/location/to/file username@destination:/where/to/put
You can read man scp to get more ideas on this.

### example
on local computer and grabbing remote file and placing on desktop

```$ scp myusername@1.2.3.4:/home/myusername/public_html/staging/dev_myusername.com/myusername.sql ~/Desktop
myusername.sql
```

Look on your desktop and there it shall be. And no FTP needed!






