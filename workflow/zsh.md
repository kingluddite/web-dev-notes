# The ZSH shell

**What is the Zsh shell?**
It's just a terminal.

**Why use Zsh?**
This is a really cool terminal.

There are many `Pros` to why you should use the `Zsh` shell. Here's my sales pitch to using it.

* Pros
    + lower case completion** document Document both work with tab
    + history based on what you have already typed in prompt - if you type c and hit up arrow, will only show you `commands with c`
    + Better than man page `ls - tab` see all flags!

Make directory and takes you inside it!

```
$ take
```

### Powerline fonts

* Add powerline fonts
[fonts](https://github.com/powerline/fonts/blob/master/Inconsolata/Inconsolata%20for%20Powerline.otf)

This is what the plain Terminal looks like:
![Terminal](https://i.imgur.com/OTyA3zw.png)

This is what Zsh looks like:
![Zsh](https://i.imgur.com/IiHCOfe.png)

Just based on that alone is cause to use Zsh. But there are tons of other things Zsh give you ability to do. If that doesn't pull you over to the dark side, watch these *[free Videos by Wes Bos](http://commandlinepoweruser.com/).

* Thanks for the tip Sean!

## Oh-my-zsh

[Read more about oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

Great people got together to make working with zsh great.

Install ZSH first

`$ sudo apt-get install zsh`

### Install oh-my-zsh

```
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### See hidden files

When working with zsh you will want to see hidden files. Just add the code below to get it to work.

source: [show hidden files on mac](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/) 

```
$ defaults write com.apple.finder AppleShowAllFiles YES
```

Press return and relaunch finder (_hover over finder icon on dashboard and hold down option key, this will let you relaunch finder)_
* You can also choose from dropdown

Now when you open it up you will see hidden files like `.zshrc` and `.oh-my-zsh`

### Choose a theme

[Lots](https://wiki.github.com/robbyrussell/oh-my-zsh/themes) to choose from.

Here's one theme:

**cobalt2**

[https://github.com/wesbos/Cobalt2-iterm](https://github.com/wesbos/Cobalt2-iterm)

### ~/.zshrc

This is your profile config file for `zsh`. The `bash` shell has the `.bash_profile` file. `zsh` has the `.zshrc` file.

It is located in the user directory (`~/.zshrc`)

Open that file in Sublime Text and change the `ZSH_THEME`.

```
ZSH_THEME="agnoster"
```

## Take the shorter PATH 
One of the first things that bugged me is the long file paths in the Zsh. It made working in zsh problematic. There is an easy solution where you just show the parent and grandparent directorires only.

This is the function that creates the path you see output in the `zsh`

```bash
prompt_dir() {
  prompt_segment blue black '%2/'
  #echo $(pwd | sed -e "s,^$HOME,~," | sed "s@\(.\)[^/]*/@\1/@g")
  #echo $(pwd | sed -e "s,^$HOME,~,")
}
```

Since I have the number 2, I will only ever see 2 directories

Something that looks like this:
![long zsh path](https://i.imgur.com/PvHKlxX.png)

Can be made to look like this:
![short zsh path](https://i.imgur.com/IJWU6Gg.png)

### What is my Path?
If you ever need to find out the full path, just type `$ pwd`.

**What's my current theme in `zsh`?**

Open your `.zshrc` file

```bash
ZSH_THEME="cobalt2"
```

### Where are my Zsh themes located?

Open up that theme by going to your themes folder

```bash
$ cd ~/.oh-my-zsh/themes/
```

I'm using the `cobalt2` theme so I opened that theme up and commented out the existing code _(comments are made using #)_

### Some cool alias' and other butes for your .zshrc

`.zshrc` 

```
# Path to your oh-my-zsh installation.
export ZSH=/Users/philiphowley/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="cobalt2"

#source ~/.rvm/scrips/rvm
#rvm use 2.2.2 --default

# include Z, yo
. ~/z.sh

# =================
# Aliases
# =================

# =================
# Writing Stuff
# =================
alias thm='cd ~/Documents/writing/thm/episodes'
alias hank='cd ~/Documents/writing/thm/episodes/the-handkerchief-party'

# =================
# Learning Stuff
# =================
alias wbn='cd ~/Documents/dev/web-dev-notes/js/es6'
alias wbc='cd ~/Documents/dev/experiments/es6/'
alias zn='cd ~/Documents/dev/web-dev-notes/wordpress/javascript'
alias zc='cd ~/Documents/dev/experiments/zach-js'

# JavaScript unit test practice
alias exercise='cd ~/exercism/'
alias eun='exercism unsubmit'

# =================
# Web Dev Tools
# =================

#hub create
#alias editVhosts='sublime /etc/apache2/extra/httpd-vhosts.conf'
#alias restartApache="sudo apachectl restart"
#alias editHosts='sublime /etc/hosts'
# open bash config file (.bash_profile)
alias bsh='sublime ~/.bash_profile'

# vvv
alias vup="vagrant up && vagrant provision && vagrant ssh"

# open zsh config file (.zshrc)
alias zash='sublime ~/.zshrc'

# refresh the bash
alias refrash='source ~/.bash_profile'

# refrash the zsh
alias zfrash='source ~/.zshrc'

# sass
alias sasswatch='sass --watch scss:css'
alias notes='cd ~/Documents/dev/web-dev-notes'
alias md='mkdir'

# unbounce site files
alias unbounce=' cd ~/Documents/dev/unbounce'

# =================
# WordPress Sites
# =================

alias fair='cd ~/Documents/dev/vvv/vagrant-local/www/fairprogram.org/htdocs'
alias elem='cd ~/Documents/dev/vvv/vagrant-local/www/elementsre.com/htdocs'
alias cre='cd ~/Documents/dev/vvv/vagrant-local/www/createre.com/htdocs'
alias cont='cd ~/Documents/dev/vvv/vagrant-local/www/contmpodesign.com/htdocs'
alias king='cd ~/Documents/dev/vvv/vagrant-local/www/kingluddite.com/htdocs'
alias vvv='cd ~/Documents/dev/vvv/vagrant-local/'
alias exp='cd ~/Documents/dev/experiments'
alias matt='cd ~/Documents/dev/vvv/vagrant-local/www/mattrohde.com/htdocs'

# navigation files
alias sites='cd ~/Sites/'
alias dev='cd ~/Documents/dev'
alias desk='cd ~/Desktop'
alias ..='cd ../'
# go back one directory
alias b='cd ..'
alias ...='cd ../../'                       # Go back 2 directory levels
alias .3='cd ../../../'                     # Go back 3 directory levels
alias .4='cd ../../../../'                  # Go back 4 directory levels
alias .5='cd ../../../../../'               # Go back 5 directory levels
alias .6='cd ../../../../../../'            # Go back 6 dir

# History lists your previously entered commands
alias h='history'

# confirm before executing and be verbose
alias cp='cp -iv'
alias mv='mv -iv'
alias rm='rm -iv'
alias mkdir='mkdir -pv'

# ================
# OS Aliases
# ================

# Show all processes running
alias ps='ps aux'

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
alias db='cd ~/Dropbox'
alias sop='sublime .'
alias phub='hub browse .'


# Kill Mongo process when it gets hung up
alias monkill='ps aux | grep mongod'
alias fm='ps aux | grep mongo'

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
alias gob='git checkout -b '
alias gk='gitk --all&'
alias gx='gitx --all'
alias glog='git log --pretty=oneline --abbrev-commit'
alias up='git pull upstream master'
alias upandaway='git pull upstream master && git push origin master'
# when I mispell git commands the following 2 commands help
alias got='git '
alias get='git '

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
plugins=(git node npm alias-tips)

# User configuration

export PATH="/Library/Frameworks/Python.framework/Versions/2.7/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/git/bin"
export PATH=/usr/local/share/npm/bin:$PATH
export PATH="$HOME/.node/bin:$PATH"
export GEM_HOME=$HOME/.gem
export GEM_PATH=$HOME/.gem
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
#alias server='ssh ph@10.0.1.201'
#exorcism stuff
# current emerging technologies project site
#elements re wp sites

#[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
```

## Keyboard shortcuts
Task | Keyboard shortcut
|--- | ---
| Clear line | `ctrl` + `u`
| Go back to previous directory | type dash `-`
| Autocomplete Folder/File (find stuff in folder and move between them) | press the `tab`
| links inside terminal | `cmd` + click
| search through history | `ctrl` + `r`
| clears screen but still has history | `cmd` + `r`

### Learn with Videos
[Wes Bos Intro](https://www.youtube.com/watch?v=IVgo5msaTlo)

Install oh my zsh
[video tutorial](https://www.youtube.com/watch?v=Tz4kScOIOW0)

[wes bos tips](https://www.youtube.com/watch?v=4q3eO17eEK4)

### Advanced history
### plugins
[wes bos video](https://www.youtube.com/watch?v=JsLHUSlwJBA)

###3 plugins overview
[link](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview)

## Troubleshooting

### You may run into problems with themes

[this link may help](https://github.com/robbyrussell/oh-my-zsh/issues/4182)

### Some problems after installing oh-my-zsh. 

Wordmove was was working great but after installing `zsh` and changing the `~/.zshrc` config and alias I could not get wordmove to work. I got ruby errors saying I did not have permissions. I then used `$ sudo gem install wordmove` and that would not let me install it because I didn't have a ruby 2.0.0 or greater. I did have it install but it did not work. I tried messing with the `.zshrc` PATH config and that didn't work. I got GEM_PATH GEM_HOME errors says they weren't properly defined? I couldn't get brew installed on `vagrant ssh`. I tried to install the linux flavor of brew no luck. It was 2 hours of pain but I finally just uninstall ruby and then reinstalled `rvm 2.2.2`. I checked the version and then installed wordmove and all was well.

**VERY IMPORTANT TIP**: don't install wordmove on osx. Install it on linux box. Following this tip will save you problems because the paths of wordmove are absolute paths based on the linux box.
[link for rvm install](https://rvm.io/rvm/install)

### Problems with ruby version
The error: keeps kicking back to default install of ruby 1.9
**My Solution:** _(I'll walk you through how the error happened and how I fixed it)_

When I tried to use Wordmove
```
$ wordmove
```

`zsh` says `command not found`
![command not found](https://i.imgur.com/hSVc130.png)

```
$ gem list
```

I use the abovi and I see wordmove is a local install

I get these errors:

```
Ignoring executable-hooks-1.3.2 because its extensions are not built.
and
Ignoring gem-wrappers-1.2.7 because its extensions are not built.
```

I run these two lines to fix them:

```
gem pristine executable-hooks --version 1.3.2
gem pristine gem-wrappers --version 1.2.7
```

But it still doesn't find `wordmove` command

I try to install wordmove again

```
$ gem install wordmove
```

But get this error:

`wordmove requires Ruby versio ~> 2.0.`

I type: 
```
$ ruby --version
```

And I see I'm only using the default install of ruby 1.9.3p484

I then show my list of rvms with

```
$ rvm list
```

And see I have `ruby-2.2.1` and `ruby-2.2.2` installed

Looks like `2.2.1` is current

I switch to `2.2.2` with

```
$ rvm use ruby-2.2.2
```

Success! it now understands `wordmove`

Whew!

## Add Oh My ZSH to Vagrant

Are you using Vagrant and VVV? If so, you can create your own `.zshrc` file inside your Vagrant box.

Here's how you install your `zsh` shell inside your vagrant box.

```
# Add zsh shell.
$ sudo apt-get install zsh

$ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

$ sudo chsh -s /bin/zsh vagrant
zsh
```

As n nice addition, make it so that your terminals don't look too similar on your different boxes.

You should visually be able to know that you are on your local computer or on a remote box. I also like to know, when I'm developing locally, when I am in vagrant ssh and when I'm not. If you use zsh on all your different server environments, you can visually know where you are at all times. This is huge for preventing unwanted mistakes from happening.

```
# Change the oh my zsh default theme.
sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="dieter"/g' ~/.zshrc
```

### Need Xcode aggreement?

To bring up xcode aggreement:

```
$ sudo xcrun css
```

## Switching between `bash` and `zsh`

I like `ZSH` but I also like `BASH` as I've been using it so long and like the solarized and settings I set for it.

To easily switch to bash from zsh (make zsh your defaut profile). You can have a `.bash_profile` and a `.zshrc` file with all your aliases then to switch to bash

```
exec bash -l
```

That will log you in. If you **don't** do that you will have to refresh your `.bash_profile` with the following terminal command:

```
$ source ~/.bash_profile
```

## Z.sh

https://github.com/rupa/z

## Useful plugins
* [alias-tips](https://github.com/djui/alias-tips)

## ag
Z is great when you’re moving to a specific directory, but what if you want to find a certain file or line of code? That’s where the silver searcher comes in. The silver search, aka ag, is great. It is an improvement over the many tools there are for searching on the command line. The biggest thing is that it is SUPER FAST. There are a lot of technical things in does in the background to get that speed, but the thing you should know is that it is fast.

You can easily search your entire codebase for a certain function call, or for a file you can’t remember where it was, anything you want. To put it in perspective, I just searched the entire WordPress codebase for wp_insert_post(), and it returned all the results in less than 1/10 of a second. And this is on a four year old machine. Pretty good.

To install `ag`, simply do `$ brew install the_silver_searcher`, and you’re all good to go.
