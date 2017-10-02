# Intro to Vim
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
