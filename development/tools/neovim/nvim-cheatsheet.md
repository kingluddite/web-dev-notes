# nvim cheatsheet
## Close a tab (buffer)
`:bd`

## Search
* Using FZF

`ctlr` + `f`

## Vimrc files to reference
* [nickj dotfiles](https://github.com/nickjj/dotfiles/blob/master/.vimrc)

## Add e7 react snippets used in VSCode into nvim
* https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

### Conquer of Completion
* It is possible to use this package in your vim/neovim text editor, to make this possible, make sure you have the coc.nvim previously configured, then add this command to your init.vim

`Plug 'dsznajder/vscode-es7-javascript-react-snippets', { 'do': 'yarn install --frozen-lockfile && yarn compile' }`

* Update your vim / neovim settings with `:source %` and then install the new package with `:PlugInstall`

## Buffer tabs
Switch between them with `<TAB>`

## Get buffer numbers
`:buffers`

## Delete a buffer tab
`:bd 6` (the number of the buffer)

## Plugins
* Add Markdown
* [youtube vid tutorial](https://www.youtube.com/watch?v=22JAs0kNA9k&feature=youtu.be)

```
Plug 'godlygeek/tabular' | Plug 'tpope/vim-markdown'
Plug 'iamcco/markdown-preview.nvim', { 'do': 'cd app & yarn install' }

" Dim paragraphs above and below the active paragraph.
Plug 'junegunn/limelight.vim'

" Distraction free writing by removing UI elements and centering everything.
Plug 'junegunn/goyo.vim'
```

* Open markdown file in browser

`:MarkdownPreview`

### Make markdown look like github css
* [link to repo](https://github.com/sindresorhus/github-markdown-css)

Folding is enabled for headers by default.

The following commands are useful to open and close folds:

zr: reduces fold level throughout the buffer
zR: opens all folds
zm: increases fold level throughout the buffer
zM: folds everything all the way
za: open a fold your cursor is on
zA: open a fold your cursor is on recursively
zc: close a fold your cursor is on
zC: close a fold your cursor is on recursively
