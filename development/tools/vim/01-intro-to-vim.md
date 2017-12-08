# Intro to Vim
## [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)

## YCM [link](https://valloric.github.io/YouCompleteMe/)
* `$ brew install cmake`

```$ cd ~/.vim/bundle/YouCompleteMe
./install.py --clang-completer
```

* Install latest version of macvim
* Latest version of XCode
* `$ softwareupdate --list`

## Vim speed
* Log your speed
* `$ vim --startuptime s.log s.log`
* Sort your log
  - Open log and type:
  - `$ :.,$!sort -n -r -k 2`
* Add vim to Chrome so you don't need a mouse when you serf the web   

## Set up Vim   
* here is my [.vimrc](https://gist.github.com/kingluddite/c32c77724c4705bd05fa17080cfed95e)
* here is my [.zshrc](https://gist.github.com/kingluddite/773fa05efffe05b6b56e7d599cef1dfa)
* Install Firacode with brew

`$ brew tap caskroom/fonts`

`$ brew cask install font-fira-code` (ref - https://github.com/tonsky/FiraCode/wiki)

* Make this your setting in iTerm2

![iterm preferences](https://i.imgur.com/tUqDvl3.png)

* I use Vundle instead of pathogen

## Keyboard Shortcuts
* vim
    - Enter vim
* :w filename.txt
    - Will create a file and save it
* :w + enter
    - Saves an existing file
* shift + i
    - Will place you at the begging of the line and in insert mode
* i (insert)
    - Will put you in insert mode before the current location of the cursor
* a (append)
    - Will put you in insert mode and place your cursor after the current location of it
    - shift + a
        + Will place the cursor at the end of the line and in insert mode
* q! (! is called a "bang")
    - Exit out of vim without saving
* Change cursor to box

## Visual Mode
* `v`
* Hover over what you want to copy
* Type `y` to yank
* Move to where you want to paste an type `p` and your copied text will be appended after where the cursor is positioned
    - shift + p
        + Will paste before cursor
* u
    - Undo

* redo
    - Type stuff
    - u to undo
    - ctrl + r to "redo"
* shift + v
    - highlights entire line in visual mode
    - y to yank
    - p to paste (goes to next line)
    - why the next line?
        + At the end of the highlighted line there is an invisible NEW LINE character that also gets yanked in
        + **Note** if you manually highlight line, then yank, then paste, you'll see it is pasted on same line (because you did not also copy the new line character)
* yy
    - quick way to select line and new line character
    - then just `p` to paste to next line

## Navigating inside vim
* Never use the arrow keys
* h - left
* j - down
* k - up
* l - right

* Create a file called maze.txt
* Save this:

```
Start ######
           #   ####
           #####  #
                  #
                  #
                  #
######            #
#    #            #
#    #            #
#    ##############
#
#             ####
#             #  #
#   ####    ###  ###
#   #  #    #      #
#####  ######      ##
                    #
          ########  #
          #      #  #
          #      #  #
  #####   #      ####
  #   #   #
  #   #   #
  #   #####
  #
  #
  ########################  End
```

## Word moving
The rain in spain falls mainly on the plain

* w
    - move to next word
* b
    - move back word
* e
    - move to end of the word

**note**

* paren(thetical)
    - w
        + If you are at the beginning and type `w` it will take you to the left parenthesee
    - Why is vim doing this?
        + Vim treats special characters as being their own words
        + Way around this is `shift` + `w`
            * That will take you to next word
            * shift + B takes you back to the next word
        + shift + E
            * Takes you to the real end of a word, ignores special characters and doesn't treat them as words

## Search fun
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic aliquid ex odio iure, natus beatae dolore, tenetur optio enim. Expedita sit velit autem harum nemo fugit debitis ut neque, animi.

* f + [search letter] and you will jump to that word
    - type semi-colon `;`
        + And you go to the next occurence of that word (only works to end of line)
        + To search backwords use commas `,`

* You can see that semi-colon is further to right than comma so this will help you remember it is forward and comma `,` is backward
* We can use in visual mode
    - v
    - f + , (highlights to first comma)
    - y (to yank)
    - shift + A (to go to end)
    - enter (to go to next line)
    - escape
    - p (paste)

![comma semi-colon](https://i.imgur.com/WLUItL2.png)

* t
    - Until
    - Use like search, if you search for comma it will take you up and until the first comma

## ultisnips
* Had problems with this
* The issue was where it was creating the snippet. this explains is:

```
Let say I am working in the folder /home/me/myProject, my vim configuration folder is /home/me/.vim. I am currently working on a JavaScript file.

If I have an already /home/me/.vim/UltiSnips/javascript.snippets file and I do a :UltiSnipsEdit: I open and edit /home/me/.vim/UltiSnips/javascript.snippets.

If I do not have a /home/me/.vim/UltiSnips/javascript.snippets file and I do a :UltiSnipsEdit: I open and edit /home/me/myProject/UltiSnips/javascript.snippets.

In a nutshell: UltiSnipsEdit creates a snippet in the local folder, instead of in the configuration folder, if no snippet file was already present in the configuration folder. Also, the snippets in this local file are not recognized.
```

Solution: put this in your vimrc

let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips', 'UltiSnips']

add this

`Plugin 'sirver/ultisnips'`

this video helps understand: http://vimcasts.org/episodes/meet-ultisnips/

type this to create your snippet (it will be saved to correct location if you follow first big paragraph above)

`:UltiSnipsEdit`

Here is a simple example of a snippet (it will create a snippet in the folder of the file type you are currently working inside)

```
snippet log
console.log(${1:value});$2
$0
endsnippet
```

* You have snippet delimiters
* snippet trigger
* tabstops

`~/.vimrc`

```
" better key bindings for UltiSnipsExpandTrigger
let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips', 'UltiSnips']
let g:UltiSnipsExpandTrigger = "<tab>"
let g:UltiSnipsJumpForwardTrigger = "<c-j>"
let g:UltiSnipsJumpBackwardTrigger = "<c-k>"
```
now you can ctrl j to go to next tabstop and ctrl + k to go to previous tab stop

look more into vim supertab
look more into youcomplete me

## Why is trigger not working?
You may add a rule inside vimrc. You first need to check that you are using the correct vimrc? Usually it is inside `~/.vimrc` but you can check by using `:version` inside vim and it will give you info like this:

```
 system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
      user exrc file: "$HOME/.exrc"
  system gvimrc file: "$VIM/gvimrc"
    user gvimrc file: "$HOME/.gvimrc"
    system menu file: "$VIMRUNTIME/menu.vim"
```

Then you need to see if another Plugin/keymap is overwriting your keymap/trigger. A good example of this is I wanted to use tab trigger with the emmet vim plugin but after adding the code necessary to the vimrc file it did not work. I then used this code `:verbose imap <tab>` to find out that the ultisnips plugin was using tab and that is why it was not working. Have tab work for both plugins didn't look easy so I just commented out Ultisnips because I use emmet more and I'll just comment it back in when I need it. Not a perfect solution but it works

