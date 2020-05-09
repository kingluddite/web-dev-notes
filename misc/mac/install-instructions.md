# This is how I like to set up my Mac

## I have come up with a fast way to install Sublime Text and all my apps
* [Install Sublime Text super fast](https://github.com/kingluddite/sublime-text-bootstrap)
* [My dotfiles](https://github.com/kingluddite/dotfiles)

* [Install Homebrew](https://brew.sh/)
* Install tree `$ brew install tree`
* Install node `$ brew install node`
* Install yarn `$ brew install yarn`
* Install cask `$ brew tap caskroom/cask`

* Install gulp globally `$ sudo npm install gulp-cli -g`
* Add prettier globally `$ yarn global add prettier`
* [Install Sublime Text 3](https://www.sublimetext.com/3)
* Install iTerm2
  - Settings (Preferences)

## [My .zshrc](https://gist.github.com/kingluddite/773fa05efffe05b6b56e7d599cef1dfa)

* [Install oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
[Install Pip](https://stackoverflow.com/questions/17271319/how-do-i-install-pip-on-macos-or-os-x)

`$ sudo easy_install pip`

[Install cobalt wes bos theme](https://github.com/wesbos/Cobalt2-iterm)

![profile](https://i.imgur.com/5JV0lAp.png)

  - Import cobalt 2 and select it

![cobalt](https://i.imgur.com/zTTso7j.png)

* Changes text to powerfont and cursor to vertical line

![text and cursor](https://i.imgur.com/lur91zJ.png)

* Set window transparency

![window transparency](https://i.imgur.com/YlT46iA.png)

### Add the following Sublime Text 3 packages using: `cmd` + `shift` + `p` (for each one)
* SidebarEnhancements
* Advanced New File
* Markdown Extended
* Markdown Preview
    - You need to set the default browser to Chrome (or it will keep opening in Safari)
    - [In user settings](https://i.imgur.com/lvrdTdM.png) of Markdown Preview enter this code:
    - You also want to install MarkdownEditing
    - In order to see the default color setting, quit Sublime Text and reopen
    - Than you can choose different themes with
    - `cmd + shift + p` "MarkdownEditing: Change color scheme..."

```
{
    /*
        Sets the default opener for HTML files

        default - Use the system default HTML viewer
        other - Set a full path to any executable. ex: /Applications/Google Chrome Canary.app or /Applications/Firefox.app
    */
    "browser": "/Applications/Google Chrome.app"
}
```
* Oceanic Next Color Scheme
* Sass
* Seti_UI
* HTML-CSS-Javasript Prettify
* LiveReload
  - To use:
    + cmd + shift + p
    + live reload: enable/disable plugin
    + enable simple reload
    + Now when you want to view markdown preview with:
      * cmd + shift + p
      * preview in browser > markdown
      * You will see your markdown formatted nicely in browser
      * And changed you make to markdown file will automatically update in browser... in real time!
* Emmet
* JavaScript Next Snippets
* Origami
* OpenInBrowser
* jsPrettier
  - You also already installed this globally
  - To get it working in Sublime Text, copy the default settings to user settings and just change the autosave setting to `true` and the single quotes setting to `true`

## Add Sublime Preferences
* After they are installed [use this gist](https://gist.githubusercontent.com/kingluddite/0bd73f49cedeb95402436767ddbcdbfd/raw/cc10bb588f7d91662f4a2857dec3cf06e5d42a5b/Preferences.sublime-settings) to set their preferences
  - You may have to remove the theme from the preferences and manually intall it

* Make Chrome your default browser
    - I Use Emmet to create a quick dummy.html file inside a folder on my desktop
    - I right click on file and choose Open in finder
    - I right click file and choose get info and make these changes

![change all to chrome](https://i.imgur.com/HqHyb7t.png)

* [Download Mac2Imgur](https://github.com/mileswd/mac2imgur)
* Sign up for an account
* Install Alfred App

![Settings](https://i.imgur.com/8kx68af.png)

![Settings](https://i.imgur.com/5ddxNTq.png)

* Web-Dev-Notes
  - Fork my repo `https://github.com/kingluddite/web-dev-notes`
  - Save them to `~/Documents/dev`
  - Create an alias inside `.zshrc`

### See hidden files

When working with zsh you will want to see hidden files. Just add the code below to get it to work.

source: [show hidden files on mac](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/)

```
$ defaults write com.apple.finder AppleShowAllFiles YES
```

* Add these alias' to your .zshrc

```
# =================
# Aliases
# =================

# =================
# Web Dev Tools
# =================

# open bash config file (.bash_profile)
alias bsh='sublime ~/.bash_profile'

# open zsh config file (.zshrc)
alias zash='sublime ~/.zshrc'

# refresh the bash
alias refrash='source ~/.bash_profile'

# refrash the zsh
alias zfrash='source ~/.zshrc'

# sass
alias sasswatch='sass --watch scss:css'

# =================
# My Web Dev Notes
# =================
alias notes='cd ~/Documents/dev/web-dev-notes'

# =================
# Navigate Files
# =================

alias md='mkdir'
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

# =================
# Mongo Stuff
# =================
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
```

* open in sublime text command

`$ sudo ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime`

* Add LastPass Chrome Extension
  - I created an account already and use that for password management
  - Store important info in vault

**note**: By default Vim mode is turn off, so you are turning it on by making sure it is not ignored.

```js
{
    "ignored_packages":
    []
}
```
### Enter Vim Mode with keyboard shortcut

I like to add a keyboard shortcut to quickly enter Vintage Mode. There is an option to jump right into Vintage Mode when you open Sublime Text but I'm not a fan of that. With the following `key binding` implemented, I can quickly jump into Vintage mode by just typing the `j` + `j` key binding keyboard shortcut. Here's how you set this up.

`Sublime Text 3` > `Preferences` > `Key Bindings` - `User`

**Add this code:**

```js

{ "keys": ["j", "j"], "command": "exit_insert_mode",
    "context":
    [
        { "key": "setting.command_mode", "operand": false },
        { "key": "setting.is_widget", "operand": false }
    ]
}
```

## [Install z](https://github.com/rupa/z)
* This make remember common files you were working on a snap
* `$ touch ~/z.sh`
* [Copy this code](https://github.com/rupa/z/blob/master/z.sh) and place it inside `~/z.sh`
* Then, in your `.zshrc` file, include the following and then source your `.zshrc` file again.

```
# include Z, yo
. ~/z.sh
```

[Install zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

[Install zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

Install tree `$ brew install tree`

Then make sure your directories aren't too long

# Put this in your .zshrc or .bashrc file
# Install `tree` first — brew install tree
function t() {
  # Defaults to 3 levels deep, do more with `t 5` or `t 1`
  # pass additional args after
  tree -I '.git|node_modules|bower_components|.DS_Store' --dirsfirst --filelimit 15 -L ${1:-3} -aC $2
}

Use Trash CLI instead of the more dangerous and permanent `$ rm -rf yada-yada-yada`

`$ npm install --global trash-cli`

Make your return key escape (great for vim)

![convert caps lock to escape](https://i.imgur.com/wnNXmh7.png)

## Make sure you have php7 running
### First install Brew on your MAC
1. `$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
1. `$ brew update`
2. `$ brew tap homebrew/php`
3. Install PHP 7.0.+ 

`$ brew install php70`

4. Install mcrypt

`$ brew install mcrypt php70-mcrypt`

5. Finally, install composer

`$ brew install composer`

6. Test
* Now if you run `$ php -v`, you will get PHP 5.5 or something
* This is the default PHP version that is shipped with OSX and cannot be removed
* You just need to edit your path to ensure that PHP 7.0 is picked up in your `.zshrc` file

`export PATH="$(brew --prefix homebrew/php/php70)/bin:$PATH"`

* You can add multiple paths - just separate each path with colons `:`
  - Like this:

`export PATH="$HOME/.npm-packages/bin:$(brew --prefix homebrew/php/php70)/bin:$PATH"`

* To debug any issue with any package, you can run `$ brew info php70` etc
* Also, if you are getting seemingly unrelated errors, make sure to update bash/zsh: `$ brew upgrade bash` and `$ brew upgrade zsh`
* If everything is setup correctly, running `$ php -v` should give you 7.0.+
