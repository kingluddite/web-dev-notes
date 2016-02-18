# ZSH

## Keyboard shortcuts
Clear line: `ctrl` + `u`

[Wes Bos Intro](https://www.youtube.com/watch?v=IVgo5msaTlo)

[wes bos tips](https://www.youtube.com/watch?v=4q3eO17eEK4)
cool stuff
* auto complete (tab to find stuff in folder and move between them)
names with spaces, tab arrow to where you want to get to
## oh my zsh
[link](https://github.com/robbyrussell/oh-my-zsh)
This is a really cool terminal.
Here are free videos to learn how to use them.
better than man page `ls - tab` see all flags!
links in terminal - cmd + click takes you to URL
take (make directory and takes you inside it)
advanced history
ctrl + r (allows you to search through your history)
cmd + r (clears screen but still has history)
### plugins
[wes bos video](https://www.youtube.com/watch?v=JsLHUSlwJBA)

###3 plugins overview
[link](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview)

## problems with ruby version
keeps kicking back to default install of ruby 1.9
so i use $ wordmove
and zsh says command not found
![command not found](https://i.imgur.com/hSVc130.png)
if I use $ gem list I see wordmove is a local install
I get these errors
Ignoring executable-hooks-1.3.2 because its extensions are not built.
and
Ignoring gem-wrappers-1.2.7 because its extensions are not built.
and run these two lines to fix them
gem pristine executable-hooks --version 1.3.2
gem pristine gem-wrappers --version 1.2.7
but still doesn't find wordmove command
so i try to install wordmove again
with $ gem install wordmove
but get error
"wordmove requires Ruby versio ~> 2.0."
I type: $ ruby --version
and I see I'm only using the default install of ruby 1.9.3p484
I show my list of rvms with
$ rvm list
and see I have ruby-2.2.1 and ruby -2.2.2 install
looks like 2.2.1 is current
I switch to 2.2.2 with
$ rvm use ruby-2.2.2
Success! it now understands wordmove

## Add Oh My ZSH to Vagrant

```
# Added zsh shell.
$ sudo apt-get install zsh
$ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh 
$ sudo chsh -s /bin/zsh vagrant
zsh
```

As an nice addition, so that your terminals don't look too similar on the different boxes

```
# Change the oh my zsh default theme.
sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="dieter"/g' ~/.zshrc
```

You may run into problems with themes

[this link may help](https://github.com/robbyrussell/oh-my-zsh/issues/4182)


Theme - cobalt2
[https://github.com/wesbos/Cobalt2-iterm](https://github.com/wesbos/Cobalt2-iterm)

Install oh my zsh
[video tutorial](https://www.youtube.com/watch?v=Tz4kScOIOW0)
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

to bring up xcode aggreement if you need it
```
$ sudo xcrun css
```

* good stuff
* lower case completion document Document both work with tab
* history based on what you have already typed in prompt - if you type c and hit up arrow, will only show you 'commands with c'

when working with zsh you want to see hidden files on you finder
* just add the code below to get it to work. When you add it and hit return you need to relaunch finder (hover over finder icon on dashboard and hold down option key, this will let you relaunch finder (can also choose from dropdown) now when you open it up you will see hidden files like `.zshrc` and `.oh-my-zsh`)

Caution: some problems after installing oh-my-zsh. Wordmove was was working great but after installing zsh and changing the ~/.zshrc config and alias i could not get wordmove to work. I got ruby errors saying I did not have permissions. I then used sudo gem install wordmove and that would not let me install it because I didn't have a ruby 2.0.0 or greater. I did but it did not work. I tried messing with the zshrc PATH config and that didn't work. I got GEM_PATH GEM_HOME errors says they weren't properly defined? I couldn't get brew installed on ssh of vagrant. I tried to install the linux flavor of brew no luck. It was 2 hours of pain but I finally just uninstall ruby and then reinstalled rvm 2.2.2. I checked the version and then installed wordmove and all was well.

Note: don't install wordmove on osx. Install it on linux box. Following this tip will save you problems because the paths of wordmove are absolute paths based on the linux box.
[link for rvm install](https://rvm.io/rvm/install)

tip: [show hidden files on mac](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/)
```
defaults write com.apple.finder AppleShowAllFiles YES
```
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


.zshrc file 

```
# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="cobalt2"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

# User configuration

export PATH=$HOME/bin:/usr/local/bin:$PATH
# export MANPATH="/usr/local/man:$MANPATH"

source $ZSH/oh-my-zsh.sh

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# LS lists information about files.
# show slashes for directories.
alias ls='ls -laF'
# long list format including hidden files and include unit size
alias ll='ls -la'

#alias server='ssh ph@10.0.1.201'
#exorcism stuff
# current emerging technologies project site
alias bhs='cd ~/Documents/dev/projects/bhs'
alias exercise='cd ~/exercism/'
alias eun='exercism unsubmit'
alias md='mkdir'
alias fm='ps aux | grep mongo'
alias code='cd ~/code/'
alias eltodo='cd ~/Dropbox/work/elementsre/todos'

#hub create
#alias editVhosts='sublime /etc/apache2/extra/httpd-vhosts.conf'
#alias restartApache="sudo apachectl restart"
#alias editHosts='sublime /etc/hosts'
alias bash='sublime ~/.bash_profile'
alias watch='sass --watch scss:css'
alias refrash='source ~/.bash_profile'
alias notes='cd ~/Documents/dev/notes/web-dev-notes'

#finding folders fast
alias sites='cd ~/Sites/'
alias chrome='open -a "Google Chrome"'
alias phub='hub browse kingluddite'
alias desk='cd ~/Desktop/'
alias gitl='git log --pretty=oneline'
alias lgl='git log --oneline --decorate'
alias ..='cd ../'
# go back one directory
alias b='cd ..'
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 directory levels

alias db='cd ~/Dropbox'
alias glog='git log --pretty=oneline --abbrev-commit'
alias lub='cd ~/Dropbox/meteor-stuff/lub_v2'
alias sop='sublime .'
alias up='git pull upstream master'
# History lists your previously entered commands
alias h='history'

# confirm before executing and be verbose
alias cp='cp -iv'
alias mv='mv -iv'
alias rm='rm -iv'
alias mkdir='mkdir -pv'

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

# ================
# Application Aliases
# ================
alias chrome='open -a "Google Chrome"'

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

```

## Z.sh

https://github.com/rupa/z

## tips
type dash - and you go back to previous directory

