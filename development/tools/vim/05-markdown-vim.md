# Markdown vim
* This [video](https://www.youtube.com/watch?v=ONh95PNBW-Q) got me set up
* Here are the steps

## Install vim instant markdown
[link vim instant 05-markdown-vim.md](https://github.com/suan/vim-instant-markdown)

You first need to have node.js with npm installed. Then:

`$ npm -g install instant-markdown-d`

Copy the `after/ftplugin/markdown/instant-markdown.vim` file from this repo into your `~/.vim/after/ftplugin/markdown/` (creating directories as necessary), or follow your vim package manager's instructions

Add this plugin to vimrc

```
Plugin 'terryma/vim-instant-markdown'
Plugin 'vimwiki/vimwiki'
```

:source %
:PluginInstall

## config `vimrc`

```
vim ~/.vimrc


" vimwiki - Personal Wiki for Vim
" https://github.com/vimwiki/vimwiki
set nocompatible
filetype plugin on
syntax on
" vimwiki with markdown support
let g:vimwiki_ext2syntax = {'.md': 'markdown', '.markdown': 'markdown', '.mdown': 'markdown'}
" helppage -> :h vimwiki-syntax 

" vim-instant-markdown - Instant Markdown previews from Vim
" https://github.com/suan/vim-instant-markdown
let g:instant_markdown_autostart = 0  " disable autostart
map <leader>md :InstantMarkdownPreview<CR>
```

## Usage

# hotkeys
Enter - create a new note (cursor must be on a word)
Enter - enter into the note
Backspace - Go back
<leader>md - Open Markdown preview on web browser

## Bugs
* Markdown links seem broken
