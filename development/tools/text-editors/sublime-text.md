# Sublime Text 3
Is a text editor. A few years ago I was using `Dreamweaver` as were many people. There were other popular `Text Editors` like `Text Wranger` and `Coda` but Sublime Text came out of nowhere and took the coding world by storm. It was fast and free (if you could put up with the pop up alert windows or pay the low fee to own a copy yourself).

Dreamweaver was a full `IDE` but was way too bulky for your average coder. It had a `FTP` program built into it which lots of people loved but the free Filezilla made FTP free and simple. People wanted to know why Sublime Text didn't have FTP baked into it, and it probably was because most developers began to use the more secure SSH. Now people with `SSH` power, could transfer files directly from the `Terminal`, that was faster and more secure.

There are a lot of [text editors out there](https://en.wikipedia.org/wiki/List_of_text_editors).

I like ST3 and use it exclusively. [Atom](https://atom.io/) is also very popular. If you know of an text editor you think is super awesome, let me know.

## Sublime Text 3 Install instructions for classroom

1. First Install Package Controller

### Package Controller
Open sublime and use keyboard shortcut **(` + ctrl)** - that is the backtick key + control key

## TrailingWhiteSpaces
* I hate this plugin, all your spaces are highlighted and so distracting

In the box that opens paste:

```
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

* Restart Sublime

### Add the following packages using: `cmd` + `shift` + `p` (for each one)
* SidebarEnhancements
* Advanced New File
* AutoFileName
  - Give you dropdown of path to assets
* Markdown Extended
* Markdown Preview
* Oceanic Next Color Scheme
* Sass
* Seti_UI
* HTML-CSS-Javasript Prettify
* LiveReload
* JavaScript ES6 Next Syntax
* JavaScript Babel (if you are working with React)
* Emmet
* OpenInBrowser
* Origami
* Add Sublime Preferences
* After they are installed [use this gist](https://gist.githubusercontent.com/kingluddite/0bd73f49cedeb95402436767ddbcdbfd/raw/cc10bb588f7d91662f4a2857dec3cf06e5d42a5b/Preferences.sublime-settings) to set their preferences

`Sublime Text` > `Preferences` > `Settings`

## Add a way to open Sublime inside Terminal:

```
$ sudo ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
```

## Test if it works:

1. Create a folder named "test" on the Desktop and a file inside that folder called `test.html`
2. Then type `$ sublime`

## Sublime Project file
* This helps you organize your files especially if you are working with WordPress

I really like this option for when I'm working with WordPress. Instead of having to navigate internally in Sublime Text (ST) to get to my `themes`, `core`, and `plugins` folder I can quickly create a Sublime Text Project file. This file gives me the ability to point to several different parts of my site and see the different entry points in the files panel.

If I set this up for all the sites I'm developing, I can use the keyboard shortcut:

`ctrl` + `cmd` + `p`

to quickly jump between Project files of different projects. A huge time saver.

When you have a bunch of project files they can be hard to navigate so on a Mac here is how you clear them.

Using the Terminal, go into the Session of ST and find this file

```
cd /Users/phowley/Library/Application Support/Sublime Text 3/Local
```

Then open this file in Sublime Text
```
$ sop Session.sublime_session
```

**What the heck is the `sop` command?**

It is not a native command and if you get a `command not found` error when you type it, it means you have to open your bash file (or zshrc file) to set your aliases.

And manually remove all the ST Project file history

You can also go to `Project` > `open recent` > `clear all`

[sublime project bliss](http://code.tutsplus.com/tutorials/sublime-text-2-project-bliss--net-27256)

* The above link, although written for ST2, is still a very good resource for working with ST Project files

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

## Snippets and Scopes
[Link to all scopes in Sublime Text 3](https://gist.github.com/J2TeaM/a54bafb082f90c0f20c9)

## Adding Packages
Adding packages is really quick, painless and kind of fun.
* Type this keyboard shortcut
    - `ctrl` + `shift` + `p`
    - Search for your package (`Skuzzy Search`)
      + Skuzzy search is a fancy term for you just type some letters in what you are looking for and terms will pop up that contain those letters.
    - When package highlighted, click `RETURN` to install it

# Themes
* [Wes Bos Colbalt 2](http://wesbos.com/cobalt2-theme-sublime-text-2/?__s=3m6qdsdm1nam29tcfziq)

* [Hopscotch](https://packagecontrol.io/packages/Hopscotch%20Color%20Scheme?__s=3m6qdsdm1nam29tcfziq)
## More Useful Packages To Check Out
[Make your theme look cool with icons](https://packagecontrol.io/packages/Seti_UI)

`sublime user preferences`

To turn this on, simply put this in your settings file:

```js


"indent_guide_options":
    [
        "draw_normal",
        "draw_active"
    ],

```

* [Can I Use](https://packagecontrol.io/packages/Can%20I%20Use?__s=3m6qdsdm1nam29tcfziq)
  -  find out browser support for various things in CSS3 and HTML5. With this package you can quickly check caniuse without having to leave the editor
* Emmet
  - Super awesome productivity tool
  - [Video](https://www.youtube.com/watch?v=8n923UBjV9w)
* [Sublime Gulp](https://packagecontrol.io/packages/Gulp?__s=3m6qdsdm1nam29tcfziq)
  - let's you run Gulp scripts right from Sublime as well as provides a set of useful snippets. Gives you coloured output you see in the build window.
* AutoFileName
  - Quickly find files in your project)
* SidebarEnhancements
  - Give you many more options when right click on sidebar)
* Glue (_I installed this and after trying it out, uninstalled it_)
  - add your terminal inside Sublime Text
  - [link](http://sweetme.at/2014/04/07/glue-a-terminal-for-sublime-text/)
* **JavaScript & Node JS Snippets** provide snippets for some of the most used JavaScript functions and methods.
* editorconfig
  - helps developers define and maintain consistent coding styles between different editors and IDEs [editorconfig.org](http://editorconfig.org)
    + [videos (3 parts)](https://www.youtube.com/watch?v=YbHw1VdjWbA)
* Style Sorter
  - helps the messy CSS or SASS user by rearraging the stylesheet attributes based on the type and attribute.
* MarkdownEditing
  - Write in markdown
  - If you don't know how to use Markdown, it's easy and now that Github uses it for the README, it's a must to know. I love it for taking notes. Make life easier.
* [Case Conversion](https://github.com/jdc0589/CaseConversion)
  - Keybindings
    + To snake_case: "ctrl+alt+c", "ctrl+alt+s"
    + To camelCase: "ctrl+alt+c", "ctrl+alt+c"
    + To PascalCase: "ctrl+alt+c", "ctrl+alt+p"
    + To dot.case: "ctrl+alt+c", "ctrl+alt+d"
    + To dash-case: "ctrl+alt+c", "ctrl+alt+h"
    + To separate words: "ctrl+alt+c", "ctrl+alt+w"
    + To separate with forward slashes: "ctrl+alt+c", "ctrl+alt+/"
    + To separate with backslashes: "ctrl+alt+c", "ctrl+alt+b"
    + To toggle between snake_case, camelCase and PascalCase: "ctrl+shift+-"
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
* [AdvancedNewFile](https://github.com/skuroda/Sublime-AdvancedNewFile)
  - faster file folder creation inside ST
  - `super+alt+n`
* Comment-Snippets
* HTML-CSS-JS Prettify
  - needs `node.js` to work (install with brew)
  - I like to change the following preferences
    + "format_on_save": true (HTMLPrettify.sublime-settings)
    + I like spaces around selectors in JavaScript
      * "space_in_paren": true (in `.jsbeautifyrc`)

If you want to keep spacing in certain areas of text use this:
/* beautify preserve:start */
CODE IN HERE WILL NOT BE FORMATTED
/* beautify preserve:end */

**tip** make the above a snippet for ease of use

[How to add snippets](http://www.millwardesque.com/speed-development-using-keyboard-triggered-snippets-sublime-text-2/)

quickly add keybinding to add new snippet

`  { "keys": ["ctrl+n", "ctrl+s"], "command": "new_snippet"},`

[link to list of sublime text 3 commands](http://codezag.com/list-sublime-text-3-commands/)

* Sass
* SassBeautify
* Vintage Mode
  - See Vintage Mode Heading below for more info
* SublimeLinter (JS, CSS, HTML, PHP)
  - jslinter
    + [article with more info on this](https://scotch.io/tutorials/how-to-catch-your-errors-in-sublime-text-3)
    + things I like my js linter to have
      * change these in the user settings for sublimelinter
      * SublimeLinter.sublime-settings

```js
"lint_mode": "background",
"mark_style": "outline",
"show_errors_on_save": true,
```
* the background option shows the errors in the background and this is the most inobtrusive way to be alerted on errors
* outline is a great way to point out where errors are in your code
* show errors on save is key to show you the error of your way on every save

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

## Vintage Mode
The best coders I know use Vim and the reason is they've learned to do everything with just their keyboard. If you never use your mouse, you quickly learn that typing and getting stuff done gets easier and faster.

## Excluding Files & Folders From Search
There may be files or folders that you do not want to see in your Goto Anything searches. Things like compiled JavaScript from CoffeeScript, compiled CSS from Sass or any other assets. If you'd like to exclude specific files you can by modifying your user settings file (_Preferences → Settings - User_) and defining the binary_file_patterns property.

`"binary_file_patterns": [".DS_Store", ".gitignore", "*.psd"]`

The example above ignores any .DS_Store, .gitignore or .psd files. To exclude entire folders, you can append a forward slash / to the end of a folder name.

"binary_file_patterns": ["node_modules/", "vendor/", "tmp/"]

**Note:** You may be tempted to use the `file_exclude_patterns` or folder_exclude_patterns properties to exclude files from Goto Anything instead of `binary_file_patterns`; While these both do the job, they also happen to remove those files and folders from the sidebar - which may not be a desirable outcome.

### Some useful ideas to ponder with how you could use this info:

```
  "file_exclude_patterns": [".pyc", ".pyo", ".exe", ".dll", ".obj",".o", ".a", ".lib", ".so", ".dylib", ".ncb", ".sdf", ".suo", ".pdb", ".idb", ".DS_Store", ".class", ".psd", ".db"],
  "binary_file_patterns": [".jpg", ".jpeg", ".png", ".gif", ".ttf", ".tga", ".dds", ".ico", ".eot", ".pdf", ".swf", ".jar", "*.zip"],
```

## Project

You have the option of using Vim mode in Sublime (called `Vintage Mode`). While it doesn't have all the bells and whistles of Vim, it has enough to make you dangerous. If you want to see all the possibilities out there, [check out this link](https://www.maketecheasier.com/vim-keyboard-shortcuts-cheatsheet).

I use vintage mode in Sublime Text everytime I use Sublime Text. In order to use this properly, you need to follow several steps and learn several keyboard shortcuts. Here are the steps and the keyboard shortcuts.

### Open the User Preferences file and remove `Vintage` from the ignored files.

#### Open Preferences File

`Preferences` > `Settings - User`

**Change this:**

```js
{
    "ignored_packages":
    [
        "Vintage"
    ]
}
```

**To this:**

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
## Useful Vintage Commands

If you want to copy your vintage to the machine clipboard

`"*y`

### Select multiple cursors keyboard shortcut
* `shift-alt-down` or `shift-alt-up` to put multi-cursor at multiple lines
* Or you can select multiple lines first, then selection -- split into lines (in Mac, you can use `cmd-shift-L`

## Vintage includes most basic actions:

Key | Function
--- | --- |
Escape Key |  Gets out of the current mode into the `command mode`  (_All keys are bound of commands_)
i | `Insert mode` for inserting text (_Keys behave as expected_)
d | delete
y | copy
gu | lower case
gU | upper case
g~ | swap case
g? | [rot13](https://en.wikipedia.org/wiki/ROT13)
< | unindent
> | indent
h | left
j | down
k | up
l | right
b | move backward one word (previous alphanumeric word)
B | move backward one word (delimited by a white space)
5b | move backwards 5 words
w | move forward one word (next alphanumeric word)
W | move forward one word (delimited by a white space)
5w | move forward 5 words
G | move to the end of the file
gg | move to the beginning of the file
0 | move cursor to beginning of line
$ | move cursor to end of line
a | Insert text after the cursor
A | Insert text at the end of the line
i | Insert text before cursor
o | Begin a new line below the cursor
O | Begin a new line above the cursor
{ | Jump to previous paragraph
} | Jump to next paragraph
dd | delete line
3dd | delete three lines
dgg | delete to beginning of file
d) + return | delete to end of sentence
dG | delete to end of file
x | delete charcter
dw | delete word
d0 | delete to the beginning of a line
d$ | delete to end of the line
d | delete word
c | change
y | yank
> | shift right
> | shift left
~ | switch case
dit | delete inner tag
di' | delete inside single quote
v | enter visual mode (must be in command mode first)
V | enter line in visual mode (must be in command mode first)
/search_text | search document for search_text going forward
?search_text | search document for search_text going backward
n | move to the next instance of the result from the search
N | move to the previous instance of the result
u | undo last operation
ctrl + r | redo the last undo
yy | copy current line into storage buffer
p | paste storage buffer after current line
P | paste storage buffer before current line
r{text} | Replace the character under the cursor with {text}
R | Replace characters instead of inserting them
^ | moves the cursor to the first non-empty character of the line

### Keyboard key repeat

When working with Sublime Text 3 you must make this change or you won't be able to uses VIM mode without going insane. So if you are moving around the document with your keyboard you'll want to hold a key down and keep moving up or down your document. By defaut on Macs you'll have to press your keyboard key every time you want to move. The following command will enable you to just hold the key down and it will keep moving the way you want. You would think this setting would be `on` by default but it's not. So make life better and make the following change using your Terminal.

Add this in the terminal

```
$ defaults write com.sublimetext.3 ApplePressAndHoldEnabled -bool false
```
## Project File

Adding a project.sublime-project file can help speed up your workflow especially if you are working between multiple projects.
[more info here](https://gist.github.com/kconragan/2510186)

### Sublime Text Useful keyboard shortcuts

[Visual Mode info for copy and paste](http://vim.wikia.com/wiki/Cut/copy_and_paste_using_visual_selection)

Keyboard Shortcut | Function
--- | --- |


[more info on ST3 project file settings](http://code.tutsplus.com/tutorials/sublime-text-2-project-bliss--net-27256)

before you run gulp you need to install all the dependencies

```
$ npm install
```

[more info here](https://gist.github.com/kconragan/2510186)

### Sublime Text Useful keyboard shortcuts ()

| Keyboard Shortcut | function  |
| ----------------- |:-----------------:|
| `ctrl` + `g`      | Go to line|
| `cmd` + `shift` + `p`  |  Find Packages |
| `cmd` + `ctrl` + up/down arrows  | Move Line Up/Down  |
| `ctrl` + `shift` + `w` | wrap highlighted |
| `cmd` + `j` | join line you are currently on with line below it|
| `ctrl` + `shift` + `d` | duplicate line |
| `ctrl` + `shift` + `p` | open command Palette |
| `cmd + k`, `cmd + u` | uppercase |
| `cmd + k`, `cmd + l` | lowercase |
| `ctrl` + `shift` + `k` | delete current line |
| `ctrl` + `g` | goto line |
| `ctrl` + `super` + up/down | move line |
| `cmd` + `shift` + `/` | block comment |
| `cmd` + `/` | single line comment |
| `cmd + k`, `cmd + b`| show/hide sidebar |
| `cmd` + `shift` + `v` | paste formatted code |
| `cmd` + `click` | multi-cursor |
| `cmd` + `ctrl` + `p` | switch project |
| `cmd` + `d` | multiple cursor and 1 |
| `ctrl` + `cmd` + `g` |steroids mult cursor |
| `cmd` + `p` | goto anything |
| `ctrl` + `tab` |switch between open tabs |
| highlight words, `f5` | alpha sort ignoring capital letters |
| highlight words ctrl + f5 | alpha sort lines starting with capital letters first, then alphabetize lines starting with lowercase letters |
| Edit > permute lines > unique | remove duplicates |
 `ctrl` + `shift` + `k`|delete current line
`cmd` + `click` | multi-cursor add one at time

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
  "binary_file_patterns": ["*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip", "node_modules/**"],
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

## How do you set the default syntax for a file type?
On my laptop whenever I opened markdown files, they would open with Markdown syntax instead of the MultiMarkdown. I had to manually change all my markdown files to MultiMarkdown and it was time consuming and a pain.
To change all markdown files, just have one open and then click the main `View Menu` and follow this:

`View` > `Syntax` > `Open all with current extension as` > `MultiMarkdown`

## My default user settings for sublime text

[link to gist](https://gist.github.com/kingluddite/0bd73f49cedeb95402436767ddbcdbfd)

## Key bindings

[link to gist](https://gist.github.com/kingluddite/8dfe308886e7b3876ac40eb246f74f99)

## Markdown Preview
Getting it to work in LivePreview

[link](https://github.com/revolunet/sublimetext-markdown-preview/issues/389)

1. Sublime Text > Package Settings > Markdown Preview > Settings - User

2. Added

```
{
  "enable_autoreload": true
}
```

3. Saved, shut down Sublime Restarted
4. Then when opened file in browser and refresh the update worked
5. To not have to refresh I installed the LiveReload package for ST
6. Restarted ST
7. Open markdown file in browser
8. Open palette in ST
9. Selected this [screenshot](https://i.imgur.com/rRyJ6mJ.png) (enabled/disable plugins)
10. Choose Enable SimpleReload
11. Then as I made changes and saved them, the page refreshed

Here were two links that helped me figure this out
https://huima.wordpress.com/2014/06/29/sublimetext-markdown-preview-live-reload-epic-markdown-writing-environment/

https://forum.sublimetext.com/t/how-to-use-livereload-in-sublime-text-3/16356/14

Hopefully this saved people the hour it took me. Was it worth it? Of course :)

## Use React With Sublime (08.08.2017)
### Babel
* Install the `Babel` Package
  - This makes it easy for you to write common React functions
### AutoComplete JSX/HTML `Emmet`
* You obviously need to have Emmet installed
* In order to get Emmet to work in JSX files, you’ll need to add the following to your Key Bindings — User file (you can access it under Preferences)

`Default (OSX).sublime-keymap -- User`

```
{"keys": ["tab"], "command": "expand_abbreviation_by_tab", "context":
  [
    { "operand": "source.js", "operator": "equal", "match_all": true, "key": "selector" },
    { "match_all": true, "key": "selection_empty" },
    { "operator": "equal", "operand": false, "match_all": true, "key": "has_next_field" },
    { "operand": false, "operator": "equal", "match_all": true, "key": "auto_complete_visible" },
    { "match_all": true, "key": "is_abbreviation" }
  ]
}
```

* Add the `SublimeLinter` package
* Add the `SublimeLinter-contrib-eslint` package
* Shut down and Start up Sublime Text
* You should see error
* Open JavaScript file and choose

![open files as](https://i.imgur.com/OvQxHXf.png)

## FAQ and Troubleshooting

##### What is my first step to find out what trouble I have?

Use SublimeText console and SublimeLinter debug mode.

1. Check `Tools -> SublimeLinter -> Debug Mode`.
2. Open console `View -> Show Console`.

Then open any JS file and run `Tools -> SublimeLinter -> Lint This View`. It must be an output in console after, something like that:

```
SublimeLinter: eslint: 1.js ['/Projects/sample/node_modules/.bin/eslint', '--format', 'compact', '--stdin', '--stdin-filename', '@']
```

##### I've got 'SublimeLinter: ERROR: eslint cannot locate 'eslint' in ST console when I try to use locally installed `eslint`.

You **must** have `package.json` file if install `eslint` locally. Also, restart project or ST itself after to make sure SublimeLinter uses correct `eslint` instance.

```
npm init -f
npm install eslint
```

##### Plugin still does not work or there are errors in ST console.

Update `eslint` instance, probably you use outdated version and SublimeLinter does not check it properly sometimes.

##### There are no errors in console, but plugin does nothing.

ESLint >2.0.0 does not enable any default rules and you should have config file for your code. Run in your console:
```
eslint --init # if eslint is global
./node_modules/.bin/eslint --init # if eslint is installed locally
```

[link to sublime jsx setup with react](https://codepen.io/mi-lee/post/sublime-text-setup-for-react-js-development)

You also have to point your linter to where node is located
[point node to linter](http://jonathancreamer.com/setup-eslint-with-es6-in-sublime-text/)

Add tab trigger for emmet
[video ](http://wesbos.com/emmet-react-jsx-sublime/)
[gist](https://gist.github.com/wesbos/2bb4a6998635df97c748)

```
{
  "keys": ["tab"],
  "command": "expand_abbreviation_by_tab",

  // put comma-separated syntax selectors for which
  // you want to expandEmmet abbreviations into "operand" key
  // instead of SCOPE_SELECTOR.
  // Examples: source.js, text.html - source
  "context": [
    {
      "operand": "meta.group.braces.round.js, text.html",
      "operator": "equal",
      "match_all": true,
      "key": "selector"
    },

    // run only if there's no selected text
    {
      "match_all": true,
      "key": "selection_empty"
    },

    // don't work if there are active tabstops
    {
      "operator": "equal",
      "operand": false,
      "match_all": true,
      "key": "has_next_field"
    },

    // don't work if completion popup is visible and you
    // want to insert completion with Tab. If you want to
    // expand Emmet with Tab even if popup is visible --
    // remove this section
    {
      "operand": false,
      "operator": "equal",
      "match_all": true,
      "key": "auto_complete_visible"
    },
    {
      "match_all": true,
      "key": "is_abbreviation"
    }
  ]
}
```

## Useful packages
Scopehunter - shows you the scope you are in, useful for stuff like you want tab to work in emmet and it isn't in jsx and you want to find your scope so you can add it into your keybinding - Wes Bos talks about it in his video to solve tab issue inside JSX (http://wesbos.com/emmet-react-jsx-sublime/)

### In ST3 settings file remove `node_modules` from search:
```
"binary_file_patterns": ["*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip", "node_modules/**"],
```

### Navigate Sidebar sublime text
`cntrl` + k, ctrl + b  ----> toggle sidebar
`ctrl` + 0 -----> focus sidebar
`up/down arrow` ---> navigate sidevar folder/file list
`right arrow` ---> expand directory
`left arrow` ---> collapse directory
`enter arrow` ---> open file

### Open in Chrome
* Create a new build system
* On mac and sublime text 3 , which version is 3103, the content should be
* You can add a new "Build System" under

`Tools` -> `Build System` -> `New Build System...`

```
{
    "shell_cmd": "open -a 'Google Chrome' '$file'"
}
```

* To run this build
  - `cmd` + `b`

## Add closing comment tags HTML
[article](http://iaintnoextra.tumblr.com/post/68089741466/automatically-add-closing-comments-to-html-using)

* Just paste this code into the user emmet package
* [emmet user settings for closing comments]( http://pastebin.com/RWd7MreL)

## Using jsPrettier package
User settings;

```js
{
  // Turns on/off autoformatting on save
  "auto_format_on_save": true,

  "prettier_options": {
    // Fit code within this line limit
    "printWidth": 80,

    // If true, will use single instead of double quotes
    "singleQuote": true,

    // Controls the printing of trailing commas wherever possible.
    //
    // Valid options:
    //
    // "none" - No trailing commas
    // "es5"  - Trailing commas where valid in ES5 (objects, arrays, etc)
    // "all"  - Trailing commas wherever possible (function arguments)
    "trailingComma": "all",

    // Controls the printing of spaces inside array and objects
    "bracketSpacing": true,

    // If true, puts the `>` of a multi-line jsx element at the end of
    // the last line instead of being alone on the next line
    "jsxBracketSameLine": false,

    // Which parser to use. Valid options are "flow", "babylon",
    // "typescript" and "postcss".
    //
    // If CSS or TypeScript is detected in Sublime Text, the parser option
    // will always be internally overridden and set to "postcss" or
    // "typescript" respectively.
    "parser": "babylon",

    // Whether to add a semicolon at the end of every line (semi: true), or
    // only at the beginning of lines that may introduce
    // ASI failures (semi: false)
    "semi": true
  }
}

```

## How to remove empty spaces in document
1. Select the text
2. Press:

* `Ctrl` + H on PC, or
* `Command` + `Alt` + `F` on Mac or
* Click `Find->Replace`.
* Make sure you have selected 'regular expression' by pressing:

* `Alt` + `R` on PC or
* `Command` + `Alt` + `R` on Mac or
* Click `.*` in the Find box.
* Find what: `^\n`
* Replace With: (_nothing, leave in blank_)

## Reg Ex Phone number
`[0-9]{3}+[.]+[0-9]{3}+[.]+[0-9]{4}`
