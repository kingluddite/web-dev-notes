# Atom Text editor

## How do I hide files like .DS_STORE?
[here's how](https://discuss.atom.io/t/a-way-to-hide-the-ds-store-files-in-the-tree-view/1431/4)

# terrible beep sound when ctrl + cmd + down arrow fix
[fix for beep sound](https://github.com/atom/atom/issues/1669)

**Tip** in vim-mode preferences, check the `Start In Insert Mode` checkbox

Add tab completion for emmet

keymap.cson
```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

self closing html tags
cmd + option + j

for jsx files

```js
"jsx": {
    "tag_case": "lower",
    "attr_quotes": "double",
    "self_closing_tag": "xhtml"
  }
```

sel_closing_tag (value can be `true`, `false` or `xhtml`)



## Problems opening Atom from terminal
I had to move my destop install into the Applications folder but the `$ $atom .` command would not work. I renamed my atom to atom.app and it still did not work. I received a zsh Atom command not found error. My fix was to remove the existing sym link by deleting it, `$ rm -rf /usr/local/bin/atom` and then adding it again with `$ ln -s /Applications/Atom.app/Contents/Resources/app/atom.sh /usr/local/bin/atom`. And then `$ atom .` worked like a charm!

Add j+j to vim mode
add vim-mode

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

Preferences
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

Tips
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



