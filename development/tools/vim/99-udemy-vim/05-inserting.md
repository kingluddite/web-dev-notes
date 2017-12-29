# Inserting
shift + i --> jumps to front of line and insert mode
a ---> move to next character, append and insert mode
A ---> append to end of line and insert mode
o ---> create new line and move cursor to beginning of new line
shift + O ---> move cursor to line above and insert mode
z + enter ---> move document up so easy to read

## Create 80 asterisks
80 + i + shift + * + esc (there will be a slight pause and then 80 asterisks appear)

## create 5 new lines that begin with #
5 + o (new line below) + # + esc

## create 4 lines that begin with "10.11.12."
4 + o + 10.11.12. + esc

## Replace Mode
shift + r ---> 1 character in the line is deleted for every character you type

r ---> just replace one character under the cursor

## Change
c + w ---> change word, deletes word and puts you in insert mode

"acw + cat + esc
Type: :reg a ---> you'll see word we typed is in a register

C --> deleted til end of line and in insert mode

cc ---> change entire line

~ --> toggle case of letter
V~ --> toggle entire line
G~w ---> toggle case of word
G~$ ---> toggle case of sentence
* two of same command operate on entire line
G~~
dd
yy
cc
g + shift + u + w (force word to be uppercase even if one letter is already uppercase)
guu ---> lowercase

## Join lines together
J
you have 2 lines
a space will be appended to current line and the next line will be brought up to join line you're on

* join with no spaces
g + shift + J

join 3 lines
3 + shift + j

