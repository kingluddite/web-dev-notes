# Coding Environments

## Code Editors
Software for editing code, often extendable.

* Atom
* Sublime Text (Sublime Text Power User - Wes Bos)

# Atom

## Default Atom Features

### Keyboard Shortcuts
* [Flight Manual Link](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee)
* [link](https://github.com/nwinkler/atom-keyboard-shortcuts)
* [Cheat Sheet Link](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee)

### Navigation Features
* `opt` + right/left arrow moves to next or previous word
* `cmd` + right/back arrow jumps to beginning or end of line
* `cmd` + up/down arrow goes to top or bottom of document
* `cmd` + `shift` + right/left arrow highlights line from that spot
* `cmd` + `opt` + right/left highlights words at a time
* `ctrl` + `g` (jump to a line number)
* `cmd` + \ (toggle tree view)
* Navigating by symbols (or methods)
    - `cmd` + `r` (then search for what you want to work to in that file)
* Bookmarks (jump to any section of code)
    - `cmd` + `f2` (add a bookmark)
        + to use `f2` to jump to that bookmark or shift f2 to go backwards
    - `ctl` + `f2` (shows all bookmarks so you can easily jump to them)
        + you can set bookmarks all over your project and easily jump to them

### Search Features
* **find and replace**
    - Add the word you want to replace and do it case by case or through all occurences

#### Find in current file or selection
* `cmd` + `f` (simple search by default searches current open page)
    - But if we have a group of code selected we could search 'only in selection option' (`opt` + `cmd` + `s`)
    - But if you are searching through entire doc and you want to do a search for a word where several hits appear, use `cmd` + `g` to toggle through them all

#### Find across project
    - `cmd` + `shift` + `f`
    - you could search a specific file using regex
        + /js/*.js*

#### Find a symbol
    - `cmd` + `r` (find all methods or symbols inside a particular file)

#### Find a file
    - `cmd` + `t` (gives you a list and start typing for fuzzy search so you don't have to take your hands off the keyboard)

#### Snippets and Autocomplete
* Default snippets
    - html + tab (html page)
* You can create your own snippets
* You can add Snippets via packages
* Autocomplete by default
    - Type a word and hit enter and it will type the rest of the word (in dropdown)
    - Autocomplete tells you `f` it is a function

#### Folding
* Collapse / expand blocks of code
    - Hover over and click little down arrow
        + When you do you will see ... at end
            * Line numbers show you that lines are missing because they are collapsed
            * Click again to expand
                + `cmd + ]` opens code chunk
                + `cmd` + `[` collapses code chunk
        + **note** If you are in a large function with lots of nested ifs and other stuff, if you keep using the collapse keyboard shortcuts, it will keep toggling up to the very top level
        + **tip** Collapse the methods that are working and open the one's that are not working, helps you focus better
* Improves navigation and concentration
* Can quickly access via shortcuts

#### Panes
* View multiple files at once
* can split into multiple columns and rows
* panes can contain tabs as well
* click on tabs after opening files and split up/down/left/right
* `cmd` + `shift` + `p` (type Panes) and keep typing to create that pane

## Integrated Development Environment (IDE)
Code editor with additional tools and extensive built-in features

* WebStorm (JavaScript IDE)

