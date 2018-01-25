# Multiple Windows
* Help system uses 2 windows
* ctrl + w cycles through open windows

## Split window horizontally
* short form of split command
    - `:sp`
    - We are looking at same buffer in two windows
    - If you need to edit two sections of same file this is handy
    - A change to one changes both
    - ctrl + w + s

## Open other buffer file in other window
* `:sp buf-bed.txt`

## vertical split
* `:vs`
* also ctrl-w + v

## close window
* `:q`
* ctrl-w + q

## create 4 windows with 4 buffers loaded into them
:sp buf-bed.txt
:sp buf-dad.txt
:sp buf-cat.txt
:sp buf-ant.txt

* Close all windows except current
* `:on` ---> :only (ctrl-w o)

## Combine vertical and horizontal window splits
:sp buf-bed.txt
:sp buf-dad.txt
:vp buf-cat.txt

ctrl + w + w (twice) ---> navigates to 3rd window
split that window

:vp buf-ant.txt

### Navigate open window
ctrl-w h (left)
ctrl-w j (down)
ctrl-w k (up)
ctrl-w l (right)

* use alt key and hjkl

### Resize window
ctrl-w -
ctrl-w +

Which keys are generatred on mak
`$ sed -n l` (type keys and note character generated)

* I used this to get the alt key working as a map

* ctrl-w r (rotates windows)

:ball (open all buffers)
:ba

## execute command in all open windows
:windo %/#/@/g

* windo command works on windows
* buff command works on buffers
* :h ctrl-w (lists all keyboard shortcuts)
* ctrl-w = (resize all windows equally)
