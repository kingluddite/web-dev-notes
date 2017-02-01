# Atom Text editor

## Add package
* language-gitignore
* atom-beautify
* color-picker
* emmet
* pigments
* file-icons
* javascript snippets
* language-babel
* linter-eslint
* markdown-preview-plus
* open-in-browser
* vim-mode
* autoclose-html
* fold-comments
* linter
* [hyperclick](https://leveluptutorials.com/tutorials/react-tips/quickly-navigating-components-with-hyperclick)
* js-hyperclick
* linter-write-good
* [platformio-atom-ide-terminal](https://github.com/platformio/platformio-atom-ide-terminal)

So atom won't autodect `.gitignore` as text file and format it wrong

## Autocomplete Plus
This problem drove me nuts. Every keystroke I received autocomplete tips. Easy fix is to open the setting of the Autocomplete Plus package and uncheck the `Show Suggestions On Keystroke` checkbox.

![show suggestion](https://i.imgur.com/z9DdB4a.png)

## Key Binding Resolver
You add a package but the shortcut doesn't work.
Here's how to resolve that.
I know that Emmet and Block Travel packages have a conflict. To use Block travel you use `alt` + up/down arrow and you move through your document rather quickly. It's a useful package but it won't work if you have Emmet installed because Emmet has keyboard shortcut bindings that conflice with Block Travel. You can see this by pressing `cmd` + `.` and then using your short cuts of `alt` + up/down arrow. You will see that Emmet is used before Block Travel. You can then go to Emmet and comment out it's keyboard binding (clicking on the link in the Key Binding Resolver will take you directly to the code to comment out.) Unfortunately, this code will be removed if Emmet updates. And you'll have to do this again. There is a better way but for now this is what we'll use.

**tip** problems with language syntax - disable stuff you are not using. It will cause lots of problems with JavaScript, JSX, Meteor, React, Babel.

## Default Atom Features

### Keyboard Shortcuts
* [Flight Manual Link](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee)
* [link](https://github.com/nwinkler/atom-keyboard-shortcuts)
* [Cheat Sheet Link](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee)

Reload Atom - `ctrl` + `alt` + `cmd` + `L`

### Navigation Features
* `opt` + `right/left` arrow moves to next or previous word
* `cmd` + `right/back` arrow jumps to beginning or end of line
* `cmd` + `up/down` arrow goes to top or bottom of document
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

##### How to create your own custom snippets

Example: I don't like the default snippet for `style`. It adds this
`<style media="screen"></style>` and I just want `<style></style>`

Open snippets in Atom file menu. That will open `snippets.cson`. At the bottom type `snip` (the snippet for creating snippets) and change it to this:

```
'.text.html.basic':
  'Simple Style':
    'prefix': 'style'
    'body': """
        <style>
          ${1:Object}
        </style>
    """
```

This is a multiline snippet (using """ and """ at beginning and end enable you to do this)

If you just want a one liner use this format

```
'.text.html.basic':
  'Simple Style':
    'prefix': 'style'
    'body': '<style>${1:Object}</style>'
```

[Read this for more details](https://www.sitepoint.com/use-code-snippets-atom/)

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

## Misc keyboard shortcuts
* Wrap in tag keyboard shortcut - `alt` + `shift` + `w`
* Create new folder - `shift` + `a`
* Toggle tree view - `ctrl` + `0`
* Open folder - press enter when on folder
* New file in tree - `a`

## Problem working with JavaScript and JSX
**atom beautify** causes proplems when working with React and Meteor. I had to disable the javascript language and use JSX or JavaScript meteor. But when just working with JavaScript I needed to turn back on the JavaScript syntax to get the linter to work.

## Easy move files across panes

```js
'atom-workspace atom-text-editor:not([mini])':
  'ctrl-alt-]': 'window:move-active-item-to-pane-on-right'
  'ctrl-alt-[': 'window:move-active-item-to-pane-on-left'
```

## Install these packages
* **pigments** - shows the colors you are using
* **tree view package** - use ctrl + 0 to toggle focus

## toggle active file or tree view (to navigate through)
`ctrl` + `0` (use to toggle between tree view and active file)

## switch syntax
Open command palette and search for "Grammar Selector: Show"

## How do I hide files like .DS_STORE?
[here's how](https://discuss.atom.io/t/a-way-to-hide-the-ds-store-files-in-the-tree-view/1431/4)

# Terrible beep sound when ctrl + cmd + down arrow fix
[fix for beep sound](https://github.com/atom/atom/issues/1669)

**Tip** in **vim-mode** preferences, check the `Start In Insert Mode` checkbox

Add tab completion for **emmet**

`keymap.cson`

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

Self closing html tags

`cmd` + `option` + `j`

for jsx files

```js
"jsx": {
    "tag_case": "lower",
    "attr_quotes": "double",
    "self_closing_tag": "xhtml"
  }
```

* self_closing_tag (value can be `true`, `false` or `xhtml`)

### Add vim-mode

Add `j` + `j` to vim mode

```js
#keymap.cson
'atom-text-editor.vim-mode.insert-mode':
  'j': 'exit-insert-mode-if-preceded-by-j'
```

```
#init.coffee
atom.commands.add 'atom-text-editor', 'exit-insert-mode-if-preceded-by-j': (e) ->
  editor = @getModel()
  pos = editor.getCursorBufferPosition()
  range = [pos.traverse([0,-1]), pos]
  lastChar = editor.getTextInBufferRange(range)
  if lastChar != "j"
    e.abortKeyBinding()
  else
    editor.backspace()
    atom.commands.dispatch(e.currentTarget, 'vim-mode:activate-normal-mode')
```

* Restart Atom

Now `j` + `j` works just like the key binding in Sublime Text

## Add bracket matcher update settings
Open atom beautifier and add proper spacing in settings
change to see .gitignored files/folders

## Preferences
* Core Settings
  - Check close empty windows
  - Project Home
    + Change to the location where you store your projects
* Editor
  - Scroll Past End
  - key bindings - searchable
  - tab type - soft
  - tab length - 4
  - soft wrap
  - show invisibles
* Packages
  - atom-wrap-in-tag
  - built into Atom

## Tips
* If you drag a file into atom it opens up the entire folder inside atom
* Click empty tab to quickly create a new file
* `cmd` + `\` (toggle sidebar)
* Split /right/left/top/bottom
* Open files (cmd + t or cmd + p)


## How to add snippets
[add snippets in atom](https://www.sitepoint.com/use-code-snippets-atom/)

## Scrolling in Vim Mode using Atom
If you are getting strange characters popping up, this will help remove it and you can scroll without a problem (does it globally).

```
$ defaults write -g ApplePressAndHoldEnabled -bool false
```

# Atom Packages and Themes

Packages are to Atom what Plugins are to WordPress

Search on atom.io or within Atom
* Simple Panes
* Minimap
* Block travel
* Definition
* Jumpy
* Highlight Selected

## Simple Panes
### install
`$ apm install simple-panes`

'cmd + k' (let go of key) then arrow (right/down) (and that file will move to the right pane)

**tip** reload a current window
Click Atom Help on main menu
Type `Reload` and you will see where that is on your interface and the current shortcut `ctrl` + `opt` + `cmd` + `L`

## Minimaps

## Block Travel
### install
`$ apm install block-travel`

When I installed and reloaded this. I had to comment out a conflict in Emmet. Then I restarted Atom and then `alt` + `down arrow` moved me down a chunk of code. This is a very useful package.

## Goto Definition
### install
`$ apm install goto-definition`

### keyboard shortcut (didn't work - figure this one out later)
`alt` + `cmd` + `enter`

## Highlight Selector
Highlights other instances of selected element, variable...
* enable background for easier visibility

# Atom Language Related Packages
* JavaScript Snippets
* WordPress for Atom
* Atom wrap in tag
* Babel
* Atom Easy JSDoc

## [JavaScript Snippets](https://atom.io/packages/javascript-snippets)

## [WordPress For Atom](https://atom.io/packages/atom-wordpress)

`$ apm install atom-wordpress`

## [Atom wrap in tag](https://atom.io/packages/atom-wrap-in-tag)

### Install
`$ apm install atom-wrap-in-tag`

### Keyboard shortcut
`alt` + `Shift` + `w`

## [language-babel](https://atom.io/packages/language-babel)

### install
`$ apm install language-babel`

## [Atom easy JSDoc package](https://atom.io/packages/atom-easy-jsdoc)

### install
`$ apm install atom-easy-jsdoc`

# Atom Tool Packages
* Linter (checks for errors in code)
    - also install linter-eslint
    - `$ apm install linter-eslint`
    - shows you bullets when you have errors
* (**Dead Package!**)Terminal-plus (have your terminal right inside your text editor)
    - `cmd` + `shift` + `t` opens new terminal tab
    - open multiple and `cmd` + `shift` + `k` (or `j`) and navigate to right or left terminal window
    - toggle open/closed with `ctrl` + `~`
    - close a specific terminal with `cmd` + `shift` + `x`
* PlatformIO IDE Terminal (replaces Terminal-plus)
* Git-plus

# Atom Styling Packages
* File icons
* Copy as RTF
    - if you wanted to copy code and format it for a slide in a presentation
    - highlight code, right click, select copy as RTF
    - when you copy and paste, it doesn't use your theme, it uses a theme in it's settings, change that to match your presentation
* Chrome Color Picker

# Atom Themes
Atom has two types of themes

* UI Theme
* Syntax Theme
* Theme respository
* 3rd party sites
* Install within Atom or Command Line

Checkout a bunch of atom themes here [atomthemes.io](http://atomthemes.io/)
* this is the best way to scroll to find a theme you like

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

* WebStorm (JavaScript IDE)
