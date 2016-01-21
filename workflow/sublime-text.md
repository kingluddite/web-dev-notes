## Install Sublime Text 3 (ST3) (Free Trial)
* IDE - Integrated Development Environment
[Download Link](http://www.sublimetext.com/)
[How Best to Use Tutorial](http://code.tutsplus.com/courses/perfect-workflow-in-sublime-text-2)
[Other Modern Book/Video Tutorial](https://sublimetextbook.com/) (Not Free)
* `Mac instructions` After downloading, extract and place inside Applications folder
* Make sure you download ST3 (and not ST2)

Add the following package to ST3:
* Package Installer ([link](https://packagecontrol.io/installation))
    - enables you to install other packages
* Copy the code below

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

* In ST3, use keybord shortcut `ctrl` + `~`
    - To close `ctrl` + `~` again
* In the white box that opens up on the bottom of ST3, paste the code you have copied to the cliboard.
* You now have the ability to add other packages to ST3

Add this Package (first and most important):
* Following the pattern
    - `ctrl` + `shift` + `p`
    - Search for your package (`Skuzzy Search`)
    - When package highlighted, click `RETURN` to install it

## More Useful Packages
* Emmet
  - Super awesome productivity tool
  - [Video](https://www.youtube.com/watch?v=8n923UBjV9w)
* AutoFileName
  - Quickly find files in your project)
* SidebarEnhancements
  - Give you many more options when right click on sidebar)
* MarkdownEditing
  - Write in markdown
  - If you don't know how to use Markdown, it's easy and now that Github uses it for the README, it's a must to know. I love it for taking notes. Make life easier.
* MarkdownPreview
  - See your markdown in nice readable view
* Origami
  - Window management
* html css prettify
  - Make your code pretty
* Bootstrap 3 snippets
  - Quickly grab Twitter Bootstrap snippets for your project
* gist
  - Add token to pull down gists after adding gist plugin
    + Get from github login page
* AdvancedNewFile
* Comment-Snippets
* HTML-CSS-JS Prettify
* Sass
* SassBeautify
* Vintage Mode
* SublimeLinter (JS, CSS, HTML)
* Meteor Snippets
* Hayaku
  - write CSS faster
  - [more info](https://github.com/hayaku/hayaku/#readme)
WordPress specific packages
* GhostText
  - ![ghost text chrome extension](https://www.dropbox.com/s/msgdu3qtcvnc3ck/Screenshot%202016-01-19%2013.34.00.png?dl=0)
  - Also add GhostText package for ST3
    + This enables you to work on your wordpress site in the browser, let's say you are typing up a post but if you use ghost editor, you can easily switch to your editor from the post, make the entry using ST3, save and it will add your post. Very Cool!
**Note:** to remove package `ctrl` + `shift` + `p` and type `packre`
Select `Package Control: Remove Package` and press `ENTER`

* Sublinter 3
  - SublimeLinter-phplint

Install phplint using homebrew
```
$ brew install homebrew/php/phplint
```
  - SublimeLinter-jshint

* install node.js
* install jshint globally

```
$ npm install -g jshint
```

Project

Adding a project.sublime-project file can help speed up your workflow especially if you are working between multiple projects.

[more info on ST3 project file settings](http://code.tutsplus.com/tutorials/sublime-text-2-project-bliss--net-27256)

before you run gulp you need to install all the dependencies

```
$ npm install
```

   
## Add Vim Mode to ST3

`Preferences` > `Settings - User`

Change this:

```js
{
    "ignored_packages":
    [
        "Vintage"
    ]
}
```

To this:

* By default Vim mode is turn off, so you are turning it on by making sure it is not ignored.

```js
{
    "ignored_packages":
    []
}
```

**Recommended** Enter Vim Mode with keyboard shortcut

Sublime Text 3 > Preferences > Key Bindings - User

Add this code:

```js

{ "keys": ["j", "j"], "command": "exit_insert_mode",
    "context":
    [
        { "key": "setting.command_mode", "operand": false },
        { "key": "setting.is_widget", "operand": false }
    ]
}
```

### Keyboard key repeat
When working with Sublime Text 3 you must make this change or you won't be able to uses VIM mode without going insane

Add this in the terminal

```
$ defaults write com.sublimetext.3 ApplePressAndHoldEnabled -bool false
```

[more info here](https://gist.github.com/kconragan/2510186)

### Sublime Text Useful keyboard shortcuts

#### Go to line
`ctrl` + `g`

#### Find Packages
`cmd` + `shift` + `p`

#### Move Line Up/Down
`cmd` + `ctrl` + up/down arrows

#### Command Mode (Vim)
`j` + `j`

#### Get out of Command Mode (Vim)
`esc`

#### Visual Mode (Vim)
* Command mode first and then `v` to enter visual mode

#### Insert Mode (Vim)
* When in Command mode type `i` to enter insert mode

### Other ST3 keyboard shortcuts

* sublime text keyboard shortcuts (mac)
`ctrl` + `w` (wrap)

* join line you are currently on with line below it
`cmd` + `j`

* duplicate line
`ctrl` + `shift` + `d`

* open command PALETTE
`ctrl` + `shift` + `p`

* uppercase
`cmd + k`, `cmd + u`

* lowercase
`cmd + k`, `cmd + l`

* alpha sort ignoring capital letters
    - highlight words, f5

* alpha sort lines starting with capital letters first, then alphabetize lines starting with lowercase letters
    - highlight words ctrl + f5

* remove duplicates
Edit > permute lines > unique

* delete current line
`ctrl` + `shift` + `k`

* goto line
`ctrl` + `g`

* move line
`ctrl` + `super` + up/down

* block comment
`cmd` + `shift` + `/`

* single line comment
`cmd` + `/`

* show/hide sidebar
`cmd + k`, `cmd + b`

* paste formatted code
`cmd` + `shift` + `v`

* multi-cursor
`cmd` + `click`

* switch project
`cmd` + `ctrl` + `p`

* multiple cursor and 1
`cmd` + `d`

* steroids mult cursor
`ctrl` + `cmd` + `g`

* goto anything
`cmd` + `p`

* switch between open tabs
`ctrl` + `tab`

## Open ST3 from within iTerm
* This will save you time as it always is a pain to get this working just right.
* Open a tab inside iTerm and type:

```
$ echo $PATH
```

* You should see `/usr/local/bin`

* Change into the `local` directory

```
$ cd /usr/local
```

* Check to see if `bin` is listed inside `/usr/local`

```
$ ls
```

* If you don't see it, create the `bin` directory
    - If you don't use `sudo` you will get a permissions error

```
$ sudo mkdir bin
```

**Note:** When and when not to use `sudo` will drive you bonkers. On a Mac sometimes you can get away without using `sudo` and sometimes you can't. Never quite figured out the difference as of yet so I just use `sudo` whenever I enter a Terminal command and get a permission error from that command.

Add type this inside iTerm

```
$ sudo ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
```

### Test to see if it works

* Type the following in iTerm and press `RETURN` to see if ST3 opens the folder you are in on your machine

```
$ sublime ~/.bash_profile
```

#### Add an Alias to make opening ST3 easier
* That will open up an empty file `.bash_profile` inside ST3. This is a convenience file you can put short cuts (`alias`) to help speed up your workflow.

In your `.bash_profile` add this:

```
alias sop="sublime ."
alias refrash="source ~/.bash_profile"
```

Now you need to either restart iTerm or use type this shortcut inside iTerm:

```
$ source ~/.bash_profile

```

* Now if you type `sop` in the terminal, that shortcut (aka `alias` in Mac talk) is all you need to type to open files or folders inside ST3.

Let's add another alias (inside `.bash_profile`) that we can type to refresh iTerm anytime we add other aliases.

```
# this is a comment
# you alread had this first alias
alias sop="sublime ~/.bash_profile"
# now you have two aliases!
alias refrash="source ~/.bash_profile"
```

You need to type `sublime ~/.bash_profile` one more time just to get this alias working but you will just need to type the `refrash` alias after that and you should be good to go.

Here are a couple links explaining what we just did in more details
[link 1](http://ashleynolan.co.uk/blog/launching-sublime-from-the-terminal)
[link 2](http://olivierlacan.com/posts/launch-sublime-text-3-from-the-command-line/)

# Sample .bash_profile

This is your user configuration file. Alias are great to use for moving quickly around your files. Lots of other stuff you can do too but even if you only use aliases, then you will love the `.bash_profile`

```
set -o vi
#alias ll='ls -laF'

#alias server='ssh ph@10.0.1.201'
alias md='mkdir'
#alias editVhosts='sublime /etc/apache2/extra/httpd-vhosts.conf'
#alias restartApache="sudo apachectl restart"
#alias editHosts='sublime /etc/hosts'
alias bash='sublime ~/.bash_profile'
alias refrash='source ~/.bash_profile'
alias micro='cd ~/Dropbox/meteor-stuff/microbook'
#finding folders fast
alias sites='cd ~/Sites/'
alias desk='cd ~/Desktop/'
alias ..='cd ../'
alias db='cd ~/Dropbox'
alias glog='git log --pretty=oneline --abbrev-commit'
alias met='cd ~/Dropbox/meteor-stuff'
alias lub='cd ~/Dropbox/meteor-stuff/lub_v2'
alias mf='cd ~/Dropbox/meteor-stuff/book_final'
alias cv='cd ~/Dropbox/phil-stuff/civitas-fc/app/soccermatters'
alias scheduler='cd ~/Dropbox/meteor-stuff/scheduler'
alias goal='cd ~/Dropbox/meteor-stuff/goal'
alias carbrands='cd ~/Dropbox/meteor-stuff/carbrands'
alias todo='cd ~/Dropbox/meteor-stuff/todo_list'
alias cat='cd ~/Dropbox/meteor-stuff/calendar_app_tutorial'
alias sop='sublime .'


#alias mysql='/Applications/MAMP/Library/bin/mysql -u root -p'
function starterTemplate {
 git clone https://github.com/JeffreyWay/Starter-Template.git
}
#export PS1="\u@\h:\W $ "

#export CLICOLOR=1
#export LSCOLORS="exfxcxdxbxegedabagacad"

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

# export PATH="/usr/local/mysql/bin:$PATH"
# export PATH="/usr/local/bin:$PATH"
export PATH=$PATH:/Users/phowley/mongodb/bin
```

## ST3 Config

* Found these config setting sprawled out throughout the web. Worth checking out.

```js
{
  "bold_folder_labels": true,
  "caret_extra_width": 1,
  "caret_style": "wide",
  "color_scheme": "Packages/User/Monokai (SL).tmTheme",
  "fade_fold_buttons": false,
  "font_size": 20,
  "highlight_line": true,
  "highlight_modified_tabs": true,
  "ignored_packages":
  [
    "",
    "CSS"
  ],
  "index_files": false,
  "line_padding_bottom": 1,
  "line_padding_top": 1,
  "save_on_focus_lost": true,
  "scroll_past_end": true,
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "word_wrap": true
}
```

## ST3 Snippets
If you find yourself typing the same stuff over and over again, it might be time for a snippet. Customizing your snippets will get you great power and flexibility

* Tools > New Snippet
* Make sure you save with this extension `.sublime-snippet`

```xml
<snippet>
  <content><![CDATA[
<!-- END ${1:name} -->${2}
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>endcom</tabTrigger>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <!-- <scope>source.python</scope> -->
</snippet>
```

**I want to work on the same file on the left and right panel? How can I?**
1. Open file
2. Then... File > New View Into File
