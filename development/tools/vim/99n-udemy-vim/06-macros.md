# Macros
## Best Practices
* Normalize the cursor position
    - Start your macro at `0`
        + This moves your cursor to the beginning of line
* Perform edits and operations
* Position your cursor to enable easy replays
    - When done, move your cursor to the next line with `j`
* Stop recording with `q`

### Example
* Record a macro into the `b` register
    - `q` + `b`
* Go to beginning of line
    - `0`
* Add `TIP: ` at beginning of line
    - Type `i` to enter **insert** mode
    - Type `esc` to enter **normal** mode
    - Type `j` to move down to next line
    - Type `q` to stop the recording
* Replay macro
    - Type `@` + `b` to execute the macro
    - Type `@@` to redo the macro on the next line

**caveat** If you minimize the screen and your line wraps you could mess up your macro as the `j` in the macro moves down to the wrapped line and not the "next" line on a full screen

* How to repeat the macro over the 5 lines at once
    - Type `u` until all the additions are reverted
* note** You can repeat a macro by using a **count**
    - Type `5@b`

## Challenge
* How could you remove first name and last name from the following lines:

```
FIRST NAME: Joseph LAST NAME: Andrews
FIRST NAME: Scott LAST NAME: Young
FIRST NAME: Jessica LAST NAME: Smith
FIRST NAME: Shirley LAST NAME: Landers
FIRST NAME: Pamela LAST NAME: Lewis
```

* Create a macro in the `c` registry
    - Type `qc`
* Normalize your cursor
    - Type `0`
* Delete first 2 words `FIRST NAME: `
    - Type `2dW`
        + **note** Capital `D` ignores punctuation
* Go to next occurence of `L`
    - Type `fL`
* Repeat last command
    - Type `.`
    - The **dot** command repeats last command
* Stop the recording
    - Type `q`
* View the c registry
    - Type `reg: c`

```
--- Registers ---
"c 02dWfL.
```

## Houston we have a problem
* We can see I forgot to position the cursor on the next line
* Since macros uses register we have **good news**
    - registers can be appended to
* Type `enter` to close register window

### Append to a macro
* Type `qC`
    - **note** Using the capitalized register letter appends to that register
* Type `j` to move down a line
* Type `q` to close register and finish update
* Check `c` register again
    - reg: c
    - You now will see

```
--- Registers ---
"c 02dWfL.j
```

### Execute register
* Type `@c`
* Type `@@` until all lines are just the names

```
Joseph Andrews
Scott Young
Jessica Smith
Shirley Landers
Pamela Lewis
```

## Next Challenge
```
BEFORE: "Montgomery", "(Alabama)" => "usa"
AFTER:  'Montgomery', 'Alabama', 'USA'
```

* You want to replace the double quotes with single quotes
* Get rid of the parentheses on the line
* You want to remove the `=>`
    - also known as:
        + `fat comma`
        + `hash rocket`
        + `fat arrow`
* You want to make sure the 3 strings are separated by a comma
* You want USA to be uppercase

### Demo it
* Create a macro in the `d` registry
    - Type `qd`
* Normalize the cursor position to put us at the beginning of the line
    - Type `0`
* Use the substitute command
    - Type

```
:s/"/'/g (and press enter)
```

* Also get rid of Opening parenthesees with substitute command

```
:s/(// (and press enter)
```

* Also get rid of backslash

```
:s/)// (and press enter)
```

* Use substitute yet again to get rid of **space and fat arrow** with a comma

```
:s/ =>/,/ (and press enter)
```

* make usa into USA

```
:s/usa/USA/ (and press enter)
```

* Put cursor on next line
    - Type `j`
* Stop recording macro
    - Type `q`
* Inspect macro we just created

```
--- Registers ---
"d   0:s/"/'/g^M:s/(//^M:s/)//^M:s/ =>/,/^M:s/usa/USA/^Mj
```

* Each time you see `^M` (aka ctrl M) that represents when we pressed the `enter` key

## Houston we have a problem
* Up until now we see how many lines we need to apply our macro to and we use that count
* What about large datasets? Is there a better way to apply our changes to many lines that scroll beyond our screen
* Get line count
    - `ctrl` + g
        + says 50 lines (example)
    - Type `50@c`

### An even better way
* Even if you know the count
* Use the normal mode
    - Enter command mode
    - Enter range
    - Type normal command
    - Follow it with the macro
* Turn on line numbering
* `:set relativenumber!`
* `:set nu`
    - Will give you absolute numbers to enter range
* Enter range
    - `:27,35normal @d`
    - That changes all of them in that range
* Change every line in file with `.,$`
    - That represents every line in the file

## Macros can work on multiple lines
```
amazon.com has address: 
54.239.17.7

google.com has address:
216.58.192.78

wikipedia.org has address:
208.80.154.224
```

* Put the ip at the beginning of line 1
* followed by domain
* And nothing else

## Do it!
* Create macro in `e` register

`qe`

* Place cursor at beginning
`0`
 
* Move to next line
`j`

* delete line
`uppercase D`

* Go up to original line
`k`

* Paste deleted line
`uppercase P`

* Add space after line
`a ` (a + space)

* move cursor after domain
`/ ` and press enter

* delete everything after domain
`D`

* move down
`j`

* Delete blank line
`2dd`

* end recording
`q`

* Run macro twice
`2@e`

```
54.239.17.7 amazon.com
216.58.192.78 google.com
208.80.154.224 wikipedia.org
```

## How to change something in the macro
* How would you insert `0` at the beginning of your macro?
    - We are just working with registers
    - Just paste contents of registers
    - Edit it/Modify it
    - Then yank it back into the register

### Try it:
* Paste contents of a register

`"ap`

* You want to start the line with `A` so NOTE becomes `A NOTE`
* reverse search

`F N`

* Insert A + space

`IA`

* Esc to get back to normal mode
* Save changes in register
    - Position cursor at beginning of line `0`
    - Yank in text `"ay$`

## Saving Macros
* viminfo file
    - .viminfo (mac home directory)
* This file stores:
    - history and non-empty registers
    - When vim starts it reads contents of `.viminfo`
        + Con
            * If you overwrite the register than you lose the contents of your macro
            * way around this problem is:
                - assign your must have macros to registers and just make sure you never use them for anything else

## Better way
* More reliable way to save macros
    - inside your .vimrc file
        + this file contains initialization commands
        + stored in $HOME

### How to do it example
* Let's say we want to add a macro to our `d` register 

`.vimrc`

`let @d = '`

* easiest way to save prerecorded macro is to paste it

`"dp`

* Will give you

```
let @d = '0:s/"/'/g^M:s/(//^M:s/)//^M:s/ =>/,/^M:s/usa/USA/^Mj'
```

* append `'` with:
`a + ' + esc`

* Gives you:

```
let @d = '0:s/"/'/g^M:s/(//^M:s/)//^M:s/ =>/,/^M:s/usa/USA/^Mj'
```

* This is like a variable assignment
* Now when you start vim it will be placed in `d` register
* You can overwrite during vim session but everytime you restart vim, this is the `d` register

# How to write literal characters in .vimrc
`let @t = 'ITTODO: `

Then type ctrl `v` (will output ^)
Then type the character `[`

### Summary
* Start recording :g{REGISTER}
* Append to a macro: q{CAPITAL_REGISTER}
* Playback: @{REGISTER}
* Repeat last played macro: @@
* Normalize cursor position at the beginning of the macro `0`
* Position your cursor at the end of your macro to enable easy repeats
* [range]normal @{REGISTER}
    - :3,47 normal @q
* Repeating a macro [count]@[REGISTER]
* Save macros in vimrc file
    - `let @[REGISTER] = 'keystrokes'`
