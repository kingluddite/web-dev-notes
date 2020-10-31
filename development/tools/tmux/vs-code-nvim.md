# VS Code and neovim
* Tmux to switch between files
* `ctrl` + `b` (leader)

## vim plug
* Declare all your plugins

### most important is `neoclide/coc.nvim`
`vim-plug/plugins.vim`

* This gives us autocompletion
```
// MORE CODE

Plug 'neoclide/coc.nvim', {'branch': 'release'}
// MORE CODE
```

## Tips
* Don't use nerdtree or ctrlP
    - it is slow
    - FZF is faster
    - use vim ranger
* vim-which-key
* vim-leader-guide
