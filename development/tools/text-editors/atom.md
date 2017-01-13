# Atom Text editor

Add package
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

So atom won't autodect .gitignore as text file and format it wrong

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

wrap in tag keyboard shortcut - `alt` + `shift` + `w`
create new folder - `shift` + `a`
toggle tree view - `ctrl` + `0`
open folder - press enter when on folder
new file in tree - `a`

## working with javascript
atom beautify causes proplems when working with React and Meteor. I had to disable the javascript language and use JSX or JavaScript meteor. But when just working with JavaScript I needed to turn back on the JavaScript syntax to get the linter to work.

## Easy move files across panes

```js
'atom-workspace atom-text-editor:not([mini])':
  'ctrl-alt-]': 'window:move-active-item-to-pane-on-right'
  'ctrl-alt-[': 'window:move-active-item-to-pane-on-left'
```

## install these packages
pigments - shows the colors you are using
tree view package - use ctrl + 0 to toggle focus

## toggle active file or tree view (to navigate through)
`ctrl` + `0` (use to toggle between tree view and active file)

## switch syntax
open command palette and search for "Grammar Selector: Show"

## How do I hide files like .DS_STORE?
[here's how](https://discuss.atom.io/t/a-way-to-hide-the-ds-store-files-in-the-tree-view/1431/4)

# terrible beep sound when ctrl + cmd + down arrow fix
[fix for beep sound](https://github.com/atom/atom/issues/1669)

**Tip** in vim-mode preferences, check the `Start In Insert Mode` checkbox

Add tab completion for emmet

`keymap.cson`

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

self closing html tags

`cmd` + `option` + `j`

for jsx files

```js
"jsx": {
    "tag_case": "lower",
    "attr_quotes": "double",
    "self_closing_tag": "xhtml"
  }
```

self_closing_tag (value can be `true`, `false` or `xhtml`)

## Problems opening Atom from terminal
I had to move my desktop install into the Applications folder but the `$ $atom .` command would not work. I renamed my atom to `atom.app` and it still did not work. I received a zsh Atom command not found error. My fix was to remove the existing sym link by deleting it, `$ rm -rf /usr/local/bin/atom` and then adding it again with `$ ln -s /Applications/Atom.app/Contents/Resources/app/atom.sh /usr/local/bin/atom`. And then `$ atom .` worked like a charm!

### add vim-mode

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

restart Atom

Now j+j works just like the key binding in Sublime Text

## Add bracket matcher update settings
## Open atom beautifier and add proper spacing in settings
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
* if you drag a file into atom it opens up the entire folder inside atom
* click empty tab to quickly create a new file
* cmd + \ (toggle sidebar)
* split /right/left/top/bottom
* open files (cmd + t or cmd + p)


## How to add snippets
[add snippets in atom](https://www.sitepoint.com/use-code-snippets-atom/)

## Scrolling in Vim Mode using Atom
If you are getting strange characters popping up, this will help remove it and you can scroll without a problem (does it globally).

```
$ defaults write -g ApplePressAndHoldEnabled -bool false
```



