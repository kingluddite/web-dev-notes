# Cut, Copy, Paste
* d and x cut text, not just delete it
* cut = delete and save into a `register` (clipboard)
* register is a clipboard-like storage location

## Unnamed register
* When you cut text vim places it into the unnamed register
* Many call this the `default register`

## Put
* aka paste
* vim calls it put
* `p` pastes clipboard after current line
* `P` puts text before your cursor line
* After you paste/put line it stays in register/clipboard until you replace it

z + enter ---> keeps cursor on same line but moves up window

## standard vs vim
cut = delete
copy = yank
paste = put

yy = yanks entire line
    yyp = yanks line and pastes it below itself
    4yy = yank 4 lines
dd = deletes entire line

u = undo
ctrl + r = redo

## Registers
* Unnamed = ""
    - "" holds text from d,c,x, and y operations
* Numbered="0 "1 ... "9"
    - "0 holds last text yanked (y)
    - "1 holds last ext deleted (d) or changed (c)
    - vim shifts each until it falls off the end with "9j
    - Numbered registers shift with each d or c
* Named

`:reg` - shows you all the registers

`black hole register` ----> "_
* another spot of register

^J - represents a return and when you paste ^J will be replaced with an `enter` (newline)

## Named registers
* 26 named registers from `a` to `z`
* you can specify a register when pasting and yanking or deleting
    - `"ayy` - yanks line into a register
    - paste from a register with `"ap`
* append to named register
    - `"Ayy`
* show only specific registers
    - `:reg a b`
* delete to named registers
    - "dzw"

## Repeating with Registers
[count][register](operator)

or

[register][count]operator


`"hyy` - yank -------- into register



`2"hp` ----> paste 2 lines of dashes
`"h2p` ---> does same thing
