# Vim Navigation
* j k l h

* Move page down `ctrl` + `f` (forward)
* Move up page `ctrl` + `b` (back)

## center page
* `z` + `enter`

## word moving
* `w` move right one word (uses punctuation as boundries)
* `W` move right one word ignores punctuation
* `b` moves left one word (uses punctuation as boundries)
* `B` moves left one word ignores punctuation

## Move to first character in line
`shift` + `6` (^)

## Move to last character in line
`shift` + `4` ($)

## Move to line number
* `11` + `gg` or  `11` + `G`

## What is line mode?
* When you are in vim and type `:`

## top of page `gg`
## bottom of page `G`

## How many lines are in a file? `ctrl` + `g`

## Give me lots of info about my file: `g` + `ctrl` + `g`

# Deleting
* `x` deletes cursor to right
* `X` deletes cursor to left
* `d` + `j` deletes current line and below it (jklh)
* `d0` deletes to beginning of line
* `D` deletes to end of line
* `dd` deletes current line
* `3dd` deletes 3 lines

## [count]operation{motion}
* `5dw` delete 5 words

## the period `.` repeater - repeats last command

# Cut, Copy Paste
* `d` and `x` CUT test (they don't just delete it)
* CUT === saves to register

## What is the register?
* A clipboard-like storage location
* The default register
    - When you "cut" text it gets put in the default register
    - aka unnamed register

## What is put?
* aka Paste
* `p` pastes clipboard after current line
* `P` pastes after cursor line
* **note** After you paste line it stays in register/clipboard until your replace it
* `put` aka 'paste'
* `cut` aka 'delete'
* `yank` aka `copy` 
* `yy` yank line
* `yyp` yanks line and pastes below itself
* `4yy` yanks 4 lines

## undo/reduo
* `u` undo
* `ctrl` + `r` redo

# Registers
* `:reg` shows all registers
    - `:reg a b` show only specific registers
* `"ayy` yanks line into register a
    - `"app` pastes register a
* `dzw` delete 2 named registers
* `"Ayy` append to `a` register

## Move to end of work in view mode
* `V` + `e`
