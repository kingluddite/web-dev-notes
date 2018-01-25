# Buffers
* TMUX for multiple screens
* Buffers is vim's built in mechanism for handling multiple files
* You have been using buffers all the time in vim
    - anytime you open a file in vim it opens it in memory
    - that is what vim calls a buffer
    - computer definition of buffer: a temporary memory area in which data is stored while it is being processed or transferred
        + or a buffer is a file loaded into memory for editing
        + the original file remains unchanged until your write that file

## Open mult files
`$ vim buf-ant.txt buf-bed.txt`

* You only see first file
* open more files using `:e`

`:e buf-cat.txt`

`:e buf-data.txt`

## Open multiple files
* Open all files that begin with `buf`
    - `$ vim buf*`
* That is not vim that is the shell command
* This is common way in vim to open multiple files at once
* We only see one but all are open
* To see them all:

`:buffers`

* :h :buffers
* better command to list all open files is `:ls`

## Open another buffer
:buffer 3

### Better way
:b3
:b filename
:b (tab key)
:b ctrl+d (lists buffers)

## next buffer
:bnext
:bn (shorter) ---> loops through buffer list

## previous buffer
:bp

## last
:bl

## first
:bf

## last file
* ctrl + 6

## What does %a mean?
* If you type `:ls` you will see the current buffer with %
    - %a mean it is an active buffer that is loaded and visable
    - The # is an alter buffer that you were previously editing

![buffers listed](https://i.imgur.com/dUj6jUa.png)

* If you see %a + (that means file has been modified but those changes have not been saved)
* If you now try to switch to another buffer without saving your changes (you'll get error ---> no write since last change (add ! to override))

## h (hidden buffers)
* Buffers can be in one of 3 states
    - `active`
        + `loaded` into memory and displayed in window
    - `hidden` loaded into memory and not displayed in a window
    - `inactive` not loaded in a window and being displayed
        + buffers with no indicators have not been loaded into memory
        + when you switch to them they are then loaded into memory
        + when you switch away from them, vim unloads them and frees up that memory
            * even though the file is not loaded into memory, vim remembers the meta data about that file (line you were on...)

## Turn on `hidden` option
`:set hidden`

* This allows you to edit multiple files at once without saving before switching buffers or forcing a switch without an exclamation mark
* Once a buffer is loaded into memory, it stays in memory
    - the buffer you were just editing becomes `hidden`

**note** abandon all changes in all buffers `:qall!`

## Open file without switching to it
:badd modes.txt

## :bd
:buffer delete

:bd 3 (delete buffer 3)

## delete all buffers
:%bd

## Execute a command in every buffer
### `:bufdo`
* Turn on line numbering for each buffer
* :bufdo set nu
* :bn (cycle through to see they all have line numbes)

`:bufdo %s/#/@/g`

* if it gives you a save error
* Save changes along way

`:bufdo %s/#/@/g | w`


* | in vim is command separator 

:wall (write all)

:E (:explore) 
