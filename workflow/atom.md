# Atom Text editor

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

