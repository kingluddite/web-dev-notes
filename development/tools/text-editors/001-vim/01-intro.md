# Intro to Vim
* Never use arrow keys!
* [vim + tmux tute](https://www.youtube.com/watch?v=5r6yzFEXajQ&t=3568s)
## .vimrc
config file

`$HOME/.vimrc`

* Special file in its name and location
* vim knows how to load it at startup time

## help
:h vimrc (will find help in vimrc)

## Keyboard shortcuts

### Navigation
* `k` up
* `j` down
* `$` end of line
* `0` beginning of line
* `w` move ahead word
* `W` move ahead word (delimited by white space)
* `b` move back word
* `B` move back word (delimited by white space)
* `gg` move to beginning of file
* `G` move to end of file
* `e` move ahead to end of word
* `E` move ahead to end of word (delimited by white space)
* `ge` move back to end of word
* `bE` move back to end of word (delimited by white space)

### Search
* `f` + SEARCHCHARACTER (takes you to next instance of that character)
* `F` + SEARCHCHARACTER (takes you to previous instance of that character)
    - To repeat that search `;`
* `t` + SEARCHCHARACTER (takes you forward to just before (until) the instance of that character)
* `T` + SEARCHCHARACTER (takes you backward to just before (until) the instance of that character)
* number + command
    - If I want to go 4 words forward `4w`
    - 10 words backward `10b`
