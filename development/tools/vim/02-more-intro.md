# Vim Fun

## Vim understands English... kind of
* v + i + (
    - That will highlight everything inside parenthesees
* v + a + (
    - View around parenthesees
* v + i + {
    - View in curly braces
* We can also do it with square brackets
    - v + i + [
* v + i + w
    - anywhere inside a word and this will highlight the word
    - v + i + W
        + View inside big word even with special chars
* v + i + "
    - View inside quotation marks
* Yank power!
    - Do same thing and cut out view part with:
        + `yank + i + {`

## Delete stuff
* d + i + (
    - Delete innner parenthesee
* d + a + (
    - Delete around parenthesee
* c + i + (
    - Deletes inner stuff
    - But also puts you in insert mode
* c + a + (
    - Change around parenthesee

### Delete 'til'...
```
function thisIsAFunctionName(one, two) {
  console.log('this is a super super super super long sentence');
}
```

* If you start at first line
* f + F (will jump to `Function` part of function name)
* d + t + N
    - Will delete word until Name from where you are
* You can also use
    - c + t + N
        + That will delete word til where you are but also put you in insert mode

# Move down fast
* ctrl + d
    - moves you down a full screen worth of text
* ctrl + u
    - move up a full screen worth of text
* ctrl + f
    - flip to the next page
* ctrl + b
    - flip back to the previous page
* gg
    - go to top of page
* g
    - go to bottom of page

## Search
* type `/` followed by your search term
* type `n` and it will go to next occurence of that term
* rinse and repeat
* shift + N
    - Takes you in the opposite direction
* shift ?
    - Searches up (/ searches down)

## Vim plugins
* Use a package manager

### ~/.vimrc
* Add this

```
" Note: Skip initialization for vim-tiny or vim-small
if !1 | finish | endif

if has('vim_starting')
  if &compatible
    set nocompatible              " Be iMproved
  endif

  " Required:
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

" Required:
call neobundle#begin(expand('~/.vim/bundle'))

" Let NeoBundle manage NeoBundle
" Required:
NeoBundleFetch 'Shougo/neobundle.vim'

NeoBundle 'https://github.com/easymotion/vim-easymotion'

call neobundle#end()

" Required:
filetype plugin indent on

" If there are uninstalled bundles found on startup,
" this will conveniently prompt you to install them.
NeoBundleCheck
```

* Then type `$ vim ~/.vimrc`
* And it will ask if you want to install the [easymotion](https://github.com/easymotion/vim-easymotion) plugin

## Useful plugins
* EasyMotion
    - leader leader `\\`
    - `\\w` - go forward
    - `\\b` - go back
    - Then target the highlighted word
* Fugitive
    - makes git better
* Ctrl + p
    - open files and fuzzy search
    - shortcut to open (mvim is <Space>f) [shows all files in current directory] and then type letters in word and press enter to open file

## Uninstall plugin
* Remove code in .vimrc
* `:NeoBundleClean`
        - Then click `y` to remove 

## Beginning and end of line
* shift + ^
    - first character in line
* end of line
    - shift + 4
![diagram for begin end line](https://i.imgur.com/r0qkrnu.png)
* tip:
    - rexEx uses:
        + ^ for beginning of line
        + $ for end of line
* 0
    - takes you all the way to the left (even before indentation)
    - take you to the `0th` character

## top and bottom of file
* gg
    - top of file
* shift + g
    - takes you to the end of the file
* d + shift + G
    - deletes whole file

## indenting
* Normal Mode
    - > + >
        + right indent
    - < + <
        + left indent
* Visual Mode
* >
    - right indent
* <
    - left indent

## Install Macvim
* `$ brew install Macvim`
* `$ brew linkapps`  (MacVim is keg-only)

## remapping (add to .vimrc)
* insert mode
    - `inoremap jk <Esc>`
* command mode
    - `cnoremap jk <Esc>`

.vimrc

`nnoremap <leader>av :tabnew $MYVIMRC<CR>`

## line numbers
* In .vimrc add `set number`
* Go to line number
* `20G` - go to line #20
* You are on line 10
* You tell it to d24G
    - it will delete all line number from 10 to 24

