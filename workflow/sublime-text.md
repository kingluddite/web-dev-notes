# Sublime Text 3
Is a text editor. There are a lot of [text editors out there](https://en.wikipedia.org/wiki/List_of_text_editors).

## Sublime Project file

When you have a bunch of project files they can be hard to navigate so on a Mac here is how you clear them. Go into the Session of ST3 and find this file

```
cd /Users/phowley/Library/Application Support/Sublime Text 3/Local
```

Then open this file in Sublime
```
sop Session.sublime_session
```

And manually remove all the history.

You can also go to Project > open recent > clear all


* this helps you organize your files especially if you are working with WordPress
[sublime project bliss](http://code.tutsplus.com/tutorials/sublime-text-2-project-bliss--net-27256)

I like ST3 and use it exclusively. [Atom](https://atom.io/) is also very popular. If you know of an text editor you think is super awesome, let me know.

## Learning Resources for Sublime Text
* [Free video tutorial on st2](http://code.tutsplus.com/articles/perfect-workflow-in-sublime-text-free-course--net-27293)
  - a bit outdated but has a lot of great information
* [More updated book and videos to learn the power of ST3](https://sublimetextbook.com/)
  - Not Free
 
## Install Sublime Text 3 (ST3)
* Cost - It's free. Well, it's not really free but you can download and use it. If you don't [pay the fee ($70)](http://www.sublimetext.com/buy) you can use it for free as long as you want but you will get annoying popups that you can not remove until you pay for the license. The IDE is really cool and if you use it a lot and it helps you make money, you should shell out the cash to help the creators out for creating a great IDE.
* IDE - Integrated Development Environment
* [Download Link](http://www.sublimetext.com/)
* [How Best to Use Tutorial](http://code.tutsplus.com/courses/perfect-workflow-in-sublime-text-2)
* [Other Modern Book/Video Tutorial](https://sublimetextbook.com/) (Not Free)
* `Mac instructions` After downloading, extract and place inside Applications folder
* Make sure you download ST3 (and not ST2)

## Packages
To make ST3 productive you need to add packages. The first package to install is the one that enables you to add other packages.

* Here's how you install it.
  - Package Installer ([link](https://packagecontrol.io/installation))
* Copy the code below

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

* In ST3, use keybord shortcut `ctrl` + `~`
    - To close `ctrl` + `~` again
* In the white box that opens up on the bottom of ST3, paste the code you have copied to the cliboard.
* You now have the ability to add other packages to ST3
* Make sure you are installing the code for ST3 and not ST2 or you will run into problems down the road.

## Adding Packages
Adding packages is really quick, painless and kind of fun.
* Type this keyboard shortcut
    - `ctrl` + `shift` + `p`
    - Search for your package (`Skuzzy Search`)
      + Skuzzy search is a fancy term for you just type some letters in what you are looking for and terms will pop up that contain those letters.
    - When package highlighted, click `RETURN` to install it

## More Useful Packages To Check Out
[Make your theme look cool with icons](https://packagecontrol.io/packages/Seti_UI)

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
* Bootstrap 3 snippets
  - Quickly grab Twitter Bootstrap snippets for your project
* [Bootstrap 4 snippets](https://github.com/degouville/sublime-bootstrap4)
* gist
  - Add token to pull down gists after adding gist plugin
    + Get from github login page
* AdvancedNewFile
* Comment-Snippets
* HTML-CSS-JS Prettify
  - needs `node.js` to work (install with brew)
  - I like to change the following preferences
    + "format_on_save": true (HTMLPrettify.sublime-settings)
    + I like spaces around selectors in JavaScript
      * "space_in_paren": true (in `.jsbeautifyrc`)
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
  - (icon) ![ghost text chrome extension](https://i.imgur.com/FeiS6Vx.png)
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
  - [SublimeLinter-jshint video](http://www.kingluddite.com/screencasts/sublime-text-sublimelinter-and-jshint)

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

Type this inside iTerm2

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

## ST3 Config

Sublime Text > Preferences > Settings - User

* Found these config setting sprawled out throughout the web. Worth checking out.

**Note** Before you add this to your ST3 Sublime User Settings:

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
