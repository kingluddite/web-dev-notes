# Deleting with Vim
x - deletes cursor to right
X - deletes cursor to the left

## Think in Vim
* Look for pattern 
operation{motion}

## dw ---> delete word

`d` = The delete **operation**
`w` = The word **motion**

* `d` + `l` ====> delete character on the left
    - `x` shortcut for this
* `d` + `j` ====> deletes current line and line below it

* `d` + `k` ====> Deletes current line and line above it

* `d` + `0` ====> Delete to beginning of line
* `d` + `$` ====> Delete to end of line
    - `D` ===> shortcut for `d` + `$`

`dd` - delete current line

* `3dd` - delete 3 lines

## [count]operation{motion}
5dw (delete 5 words)

## [count]operation[count]{motion}

## The period `.` repeater
* `dd` - deletes a line
* `.` - will repeat the last command

### 3 things ! does in Vim
1. force an action `:q!`
