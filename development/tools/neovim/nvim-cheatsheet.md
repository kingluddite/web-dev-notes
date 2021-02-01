# nvim cheatsheet
## delete to the beginning of the line
`$ d0`

## Clear all buffers (`:Buffers`)

`:%bd|e#`

* Use this:

`%bd | e# | bd#`

## Update All matching phrases in our project
* [source](https://dev.to/iggredible/how-to-search-faster-in-vim-with-fzf-vim-36ko)

```
:grep "pizza"
:cfdo %s/pizza/donut/g | update
```

1. `:grep pizza` uses ripgrep to succinctly search for all instances of "pizza"
    * By the way, this would still work even if we didn't reassign `ripgrep` to replace default `grep`
    * We would have to do `:grep "pizza" . -R` instead of `:grep "pizza"`
2. We run `:cfdo` because `:grep` uses quickfix
    * `:cfdo` executes any command we pass (in this case, our command is `%s/pizza/donut/g)` on all entries in our quickfix list
    * To **run multiple commands**, we can chain it with pipe (|)
    * The first command we are executing is pizza-donut substitution: `%s/pizza/donut/g`
    * The second command, `update`, saves each file after the first is finished

## Updating specific files
1. Clear buffers
2. `:Files`
3. Select a file or multiple files with `Tab / Shift+Tab`
4. `:bufdo %s/pizza/donut/g | update`

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
