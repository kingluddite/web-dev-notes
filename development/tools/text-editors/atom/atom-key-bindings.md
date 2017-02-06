# Atom Keybindings I Use

## add this to `keymap.cson` so you can type `j` + `j` to enter normal mode

```
'atom-text-editor.vim-mode-plus.insert-mode':
  'j j': 'vim-mode-plus:activate-normal-mode'
```

## add this to get vim-surround to work
Add to `keymap.cson`

No need to add vim-surround as package it is built into vim-mode-plus but is not activated by default since it is not a default feature of Vim

```
'atom-text-editor.vim-mode-plus:not(.insert-mode)':
  'y s': 'vim-mode-plus:surround'
  'y s w': 'vim-mode-plus:surround-word'
  'd s': 'vim-mode-plus:delete-surround'
  'c s': 'vim-mode-plus:change-surround'
```

## Easy move files across panes

```js
'atom-workspace atom-text-editor:not([mini])':
  'ctrl-alt-]': 'window:move-active-item-to-pane-on-right'
  'ctrl-alt-[': 'window:move-active-item-to-pane-on-left'
```

Add tab completion for **emmet**

`keymap.cson`

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

for jsx files

```js
"jsx": {
    "tag_case": "lower",
    "attr_quotes": "double",
    "self_closing_tag": "xhtml"
  }
```

* self_closing_tag (value can be `true`, `false` or `xhtml`)
