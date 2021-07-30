# nvim cheatsheet
## Vim Surround plugin
https://github.com/tpope/vim-surround
* This is awesome

How to delete curly braces around a word

`ds{`

## Navigation fast
`ctrl-u` move up half page
`ctrl-d` move down half page
## Detect if a key is bound to something in vim
`:map` user-defined mappings

`:map!` plugin mappings

`:help index` built-in mappings

* **note** mappings are in the... mappings.vim file

## source Neovim
* If you install a plugin

`:PlugInstall` and then source it with `:source $MYNVIM`
## close all buffers
`%bd!`

## change around word
`caw`

## moving to next spot in emmet snippet for vim is `ctrl` + `j`

## notes for M1 homebrew

- had issues with python 3
  this solved it: https://github.com/neovim/neovim/issues/9460

```
The could been an issue when upgrading the pip package, which was renamed from neovim to pynvim, you can try:

pip3 uninstall neovim
pip3 uninstall pynvim
pip3 install pynvim
```

- multiple versions of Python instructions - https://www.wrighters.io/you-can-easily-and-sensibly-run-multiple-versions-of-python-with-pyenv/

## folding

- These settings fixed issues I was having with folding
- I was in html and tried to folder and got `no fold` error
- I made these changes and folding is working again

`nvim/general/settings`

```
 set foldmethod=indent "syntax highlighting items specify folds"
 set foldnestmax=10
 set nofoldenable
 set foldlevel=2
 set foldcolumn=1 "defines 1 col at window left, to indicate folding"
 let javaScript_fold=1 "activate folding by JS syntax"
 set foldlevelstart=99 "start file will all folds opened"
```

## Copying multiple words (from different lines) and paste them at once

- Use an uppercase register when yanking (copying):

`"Ay`

- `"A` says to append to the a register, as opposed to `"a` which would replace the contents of the a register
- Once you've copied everything into the register, you can then paste it all at once with:

`"ap`

- And then you can clear (empty) with:

`qaq`

- **note** Alternatively, if you just want to avoid having previous stuff in there, you can copy your first word using the lower case register: `"ay`
- **note** Remember, `a` and `A` refer to the same register, they just affect how things are added
  - `A` append
  - `a` replace

## Open NERDTREE by default

- This is great. It opens nerdtree and puts your cursor on the right so you can start searching!

- [source](https://stackoverflow.com/questions/1447334/how-to-add-nerdtree-to-your-vimrc)
- If, however, you're annoyed by the fact that the cursor always starts in the NERDTree window, you can add a second autocommand that will move the cursor into the main window:

```
autocmd VimEnter * NERDTree
autocmd VimEnter * wincmd p
```

## How to disable netrw

- I tried to use this and hated it
- I wanted to turn it off
- I added the plugin and pointed to that plugin

`init.vim`

- Comment this line in:

```
// MORE CODE

source $HOME/.config/nvim/plug-config/netrw.vim

// MORE CODE
```

- And added this to `netrw.vim`
  - [source](https://github.com/bling/dotvim/issues/4)

```
let g:loaded_netrw       = 1
let g:loaded_netrwPlugin = 1
" Changing the directory view in netrw
" let g:netrw_liststyle = 3

" Removing the banner
" let g:netrw_banner = 0

" let g:netrw_browse_split = 4
" let g:netrw_altv = 1
" let g:netrw_winsize = 25
" augroup ProjectDrawer
"   autocmd!
"   autocmd VimEnter * :Vexplore
" augroup END
"
```

## Delete several words

`*cgn`

- Breakdown:

* `*`: start a search for the word under the cursor (`g*` if you don’t want the word boundaries)
* `c`change
* `gn` the next match

- So you put your cursor somewhere in a word, press `*cgn`, type the replacement, hit `<esc>`, and then hit `.` to change the next occurence

If you already searched for the word, ignore the \* and just cgn.

## Select current word

`viw`

## Select opening and closing tag

`vat`

## Indenting with ==

- To indent the current line you’d run `==`
- Indenting 4 lines below the current line you’d run `4==`
- To indent a block of code, you can place your cursor at one of the braces and use command `=%`
- To fix indentation in entire file, run `gg=G`

  - Command `gg` will take you to the top of the file, command `=` is the indentation command, and `G` at the end tells Vim to run indentation command to the end of the file

- As an additional step, you can add a mapping for a command like **gg=G``zz**
  - This one will basically fix indentation in the entire file, get the cursor back to where it was, and put the current line in the middle of your window

## coc-bookmark deprecated error

- After uninstalling with `:Uninstall coc-bookmark` it would just automatically reintall once I opened neovim
- I had to remove coc-bookmark from `plug-config/coc/coc-extensions.vim`
- Then Run uninstall again

## Rebuild

- Remove from extensions
- Then `:CocInstall coc-fzf-preview`
- `:CocRebuild`
- That fixed it!

## I was having COC add double quotes when I altered code and saved

- I needed to open coc config `:CocConfig` and add this:
  - **note** Just added the prettier lines
  - And that worked!

```
{
  "coc.preferences.formatOnSaveFiletypes": [
    "css",
    "html",
    "javascript",
    "javascriptreact",
    "json",
    "jsonc",
    "python",
    "typescript",
    "typescriptreact"
  ],
  "coc.preferences.formatOnType": true,
  "powershell.integratedConsole.showOnStartup": false,
  "prettier.arrowParens": "avoid",
  "prettier.printWidth": 100,
  "prettier.tabWidth": 4,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "python.formatting.provider": "yapf",
  "python.jediEnabled": false
}
```

## Ts server was driving me nuts

- I wanted to turn it off so this is what I used:

```
"javascript.suggestionActions.enabled": false,
"typescript.suggestionActions.enabled": false,
```

- to disable tsserver suggestion

- And this:

```
// MORE CODE

  "javascript.validate.enable": false,
  "typescript.validate.enable": false,
// MORE CODE
```

- To disable tsserver validation totally, same as VSCode
- Run `:CocUpdate` to update coc-tsserver
- [source](https://www.reddit.com/r/neovim/comments/9q0d0a/cocvim_for_javascript_but_get_tsserver_errors_in/)

## vim multi cursor

- Plugin
- You can do this with macros in vanilla vim but this is still very useful

`ctrl` + `n` to select word
`c` to change

### How to get out

- `esc` + `esc`

### Multicursor all words that match

`alt` + `n` to select all matching words
`c` to change

### To ignore word boundry and select all

- By default it acknowledges word boundaries

`g` + `ctrl` + `n`

- And `g` `alt` + `n` selects every matching pattern

### working with mulicursor in javascript

- Use `v` to be in visual mode
- Then use `ctrl` + `n`

### using regex

- Select group of text
- Enter command mode
- `:MultipleCursorsFind`

example: just select text that is in angle brackets
`>\zs.*\ze<`

## delete to the beginning of the line

`$ d0`

## Clear all buffers (`:Buffers`)

`:%bd|e#`

- Use this:

`%bd | e# | bd#`

## Update All matching phrases in our project

- [source](https://dev.to/iggredible/how-to-search-faster-in-vim-with-fzf-vim-36ko)

```
:grep "pizza"
:cfdo %s/pizza/donut/g | update
```

1. `:grep pizza` uses ripgrep to succinctly search for all instances of "pizza"
   - By the way, this would still work even if we didn't reassign `ripgrep` to replace default `grep`
   - We would have to do `:grep "pizza" . -R` instead of `:grep "pizza"`
2. We run `:cfdo` because `:grep` uses quickfix
   - `:cfdo` executes any command we pass (in this case, our command is `%s/pizza/donut/g)` on all entries in our quickfix list
   - To **run multiple commands**, we can chain it with pipe (|)
   - The first command we are executing is pizza-donut substitution: `%s/pizza/donut/g`
   - The second command, `update`, saves each file after the first is finished

## Updating specific files

1. Clear buffers
2. `:Files`
3. Select a file or multiple files with `Tab / Shift+Tab`
4. `:bufdo %s/pizza/donut/g | update`

## Close a tab (buffer)

`:bd`

## Search

- Using FZF

`ctlr` + `f`

## Vimrc files to reference

- [nickj dotfiles](https://github.com/nickjj/dotfiles/blob/master/.vimrc)

## Add e7 react snippets used in VSCode into nvim

- https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

### Conquer of Completion

- It is possible to use this package in your vim/neovim text editor, to make this possible, make sure you have the coc.nvim previously configured, then add this command to your init.vim

`Plug 'dsznajder/vscode-es7-javascript-react-snippets', { 'do': 'yarn install --frozen-lockfile && yarn compile' }`

- Update your vim / neovim settings with `:source %` and then install the new package with `:PlugInstall`

## Buffer tabs

Switch between them with `<TAB>`

## Get buffer numbers

`:buffers`

## Delete a buffer tab

`:bd 6` (the number of the buffer)

## Plugins

- Add Markdown
- [youtube vid tutorial](https://www.youtube.com/watch?v=22JAs0kNA9k&feature=youtu.be)

```
Plug 'godlygeek/tabular' | Plug 'tpope/vim-markdown'
Plug 'iamcco/markdown-preview.nvim', { 'do': 'cd app & yarn install' }

" Dim paragraphs above and below the active paragraph.
Plug 'junegunn/limelight.vim'

" Distraction free writing by removing UI elements and centering everything.
Plug 'junegunn/goyo.vim'
```

- Open markdown file in browser

`:MarkdownPreview`

### Make markdown look like github css

- [link to repo](https://github.com/sindresorhus/github-markdown-css)

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
