# Intro to vim
## 3 modes
* Normal/Command Mode
* Insert Mode
* Line Mode
* There are other modes, too..

* Line mode (examples :q, :PluginInstall)

## Quickstart
* Open Terminal
* `$ vim`
* Exit vim `$ :q!`

## Create new file in vim
`$ vim abc` + `enter`

* Enter insert mode with `$ i`
* Switch to normal mode `escape`
* Enter command mode by typing `:`
* Save file with `:wq` + `enter`

## vim navigation
* j k l h

* Move page down `ctrl` + `f` (forward)
* Move up page `ctrl` + `b` (back)

## word moving
* `w` move right one word (uses punctuation as boundries)
* `W` move right one word ignores punctuation
* `b` moves left one word (uses punctuation as boundries)
* `B` moves left one word ignores punctuation

* (super cool feature) You navigate to a spot but it is too low on your screen `z` + `enter` keeps the cursor where it is but moves the page up for a better UX

## Move to first character in line
`shift` + `6` (^)

## Move to last character in line
`shift` + `4` ($)

## Move to line number
* `11` + `gg`

or

* `11` + `G`

### You can use line mode to get to line number
`:25` will take you to line 25

## Top of page `gg`
## Bottom of page `G`
* Or Use Line mode with `:$`

## How many lines in file?
`ctrl` + `g`

* tell you cursor column, how far you're down the page

* `g` + `ctrl` + `g` gives you lots more info about your doc
    - word count/bytes

`:set ruler` - gives you line number in lower right

* turn off ruler

`:set noruler`

## toggle rules
:set ruler! (toggles on and off)
