# Atom Packages I Use Often

## Install packages with:

`$ apm install NAMEOFPACKAGEHERE`

## Various Packages

I use the following packages a lot:

| Package | Purpose | Link
| ------- | -------- | -------- |
| Color Picker | Enables you to easily get color information from your code | [Link](https://atom.io/packages/color-picker) |
| Platformio | Use terminal inside Atom | [Link](https://github.com/platformio/platformio-atom-ide-terminal) |
| Pigments| Shows Color in Code | [Link](https://github.com/abe33/atom-pigments) |
| File Icons | Makes your Editor looks cook with icons | [Link](https://atom.io/packages/file-icons) |
| JavaScript Snippets | Help you type JavaScript fast | [Link](https://atom.io/packages/javascript-snippets) |
| Language Babel | ES6 syntax | [Link](https://atom.io/packages/language-babel)
| Linter es6lint | Essential code checker for ES6 | [Link](https://atom.io/packages/linter-eslint) |
| Vim Mode Plus | Super Productivity Mode | [Link](https://atom.io/packages/vim-mode-plus) |
| Language Gitignore | syntax checker for gitignore | [Link](https://atom.io/packages/language-gitignore) |
| Markdown Preview Plus | See Markdown in Atom | [Link](https://atom.io/packages/markdown-preview-plus)

**Tip** in **vim-mode-plus** preferences, check the `Start In Insert Mode` checkbox

These are some packages I find useful, and their most useful key bindings. A list of my favorite packages can be found [here](https://atom.io/users/nwinkler/stars).

| Command | Mac OS X | Windows | Linux | Package |
| ------- | -------- | ------- | ----- | ----------- |
| Block Travel up/down | `alt-up`, `alt-down` |  |  | [Block Travel](https://atom.io/packages/block-travel) |
| Beautify | `ctrl-alt-b` |  |  | [Beautify](https://atom.io/packages/atom-beautify) |
| Expand Abbreviation | `shift-cmd-e` | `ctrl-e` | `ctrl-e` | [Emmet](https://atom.io/packages/emmet) |
| Incremental Search | `cmd-i` |  |  | [Incremental Search](https://atom.io/packages/incremental-search) |
| Git Plus Menu | `shift-cmd-h` | `ctrl-shift-h` | `ctrl-shift-h` | [Git Plus](https://atom.io/packages/git-plus) |
| Jumpy | `shift-enter` |  |  | [Jumpy](https://atom.io/packages/jumpy) |
| Minimap Toggle | `ctrl-k ctrl-m` |  |  | [Minimap](https://atom.io/packages/minimap) |
| Open File in Browser | `ctrl-alt-m` |  |  | [Open in Browser](https://atom.io/packages/open-in-browser) |
| Run Script | `ctrl-cmd-i` |  |  | [Script](https://atom.io/packages/script) - Keybinding remapped from original `cmd-i` to avoid conflict with Incremental Search |
| Open Terminal | `ctrl-alt-t` |  |  | [Term2](https://atom.io/packages/term2) |
| Open Project | `ctrl-cmd-p` | `alt-shift-p` | `ctrl-alt-shift-p` | [Project Manager](https://atom.io/packages/project-manager) |
| Open In | `ctrl-alt-o` |  |  | [Open In](https://atom.io/packages/open-in) |
| Sublime Style Column Selection | `alt-mouse` |  |  | [Sublime Style Column Selection](https://atom.io/packages/Sublime-Style-Column-Selection) |

## Add bracket matcher update settings
Open atom beautifier and add proper spacing in settings
change to see .gitignored files/folders

* autoclose-html
* fold-comments
* linter
* [hyperclick](https://leveluptutorials.com/tutorials/react-tips/quickly-navigating-components-with-hyperclick)
* js-hyperclick
* linter-write-good


## Problems With Packages
### Autocomplete Plus
This problem drove me nuts. Every keystroke I received autocomplete tips. Easy fix is to open the setting of the Autocomplete Plus package and uncheck the `Show Suggestions On Keystroke` checkbox.

![show suggestion](https://i.imgur.com/z9DdB4a.png)

## Key Binding Resolver
You add a package but the shortcut doesn't work.
Here's how to resolve that.
I know that Emmet and Block Travel packages have a conflict. To use Block travel you use `alt` + up/down arrow and you move through your document rather quickly. It's a useful package but it won't work if you have Emmet installed because Emmet has keyboard shortcut bindings that conflice with Block Travel. You can see this by pressing `cmd` + `.` and then using your short cuts of `alt` + up/down arrow. You will see that Emmet is used before Block Travel. You can then go to Emmet and comment out it's keyboard binding (clicking on the link in the Key Binding Resolver will take you directly to the code to comment out.) Unfortunately, this code will be removed if Emmet updates. And you'll have to do this again. There is a better way but for now this is what we'll use.

**tip** problems with language syntax - disable stuff you are not using. It will cause lots of problems with JavaScript, JSX, Meteor, React, Babel.

## Problem working with JavaScript and JSX
**atom beautify** causes proplems when working with React and Meteor. I had to disable the javascript language and use JSX or JavaScript meteor. But when just working with JavaScript I needed to turn back on the JavaScript syntax to get the linter to work.

## Scrolling in Vim Mode Plus using Atom
If you are getting strange characters popping up, this will help remove it and you can scroll without a problem (does it globally).

```
$ defaults write -g ApplePressAndHoldEnabled -bool false
```

# Atom Packages and Themes

## Vim-Mode-Plus
In settings check `Use clipboard as default Register` and then you can use vim and what you copy with yank `y` is saved to your clipboard so you can paste into other applications with `cmd-p`

Packages are to Atom what Plugins are to WordPress

Search on `atom.io` or within Atom
* Simple Panes
* Minimap
* Definition
* Highlight Selected

## Simple Panes
### install
`$ apm install simple-panes`

'cmd + k' (let go of key) then arrow (right/down) (and that file will move to the right pane)

**tip** reload a current window
Click Atom Help on main menu
Type `Reload` and you will see where that is on your interface and the current shortcut `ctrl` + `opt` + `cmd` + `L`

## Minimaps

## Block Travel
### install
`$ apm install block-travel`

When I installed and reloaded this. I had to comment out a conflict in Emmet. Then I restarted Atom and then `alt` + `down arrow` moved me down a chunk of code. This is a very useful package.

## Goto Definition
### install
`$ apm install goto-definition`

### keyboard shortcut (didn't work - figure this one out later)
`alt` + `cmd` + `enter`

## Highlight Selector
Highlights other instances of selected element, variable...
* enable background for easier visibility

# Atom Language Related Packages
* JavaScript Snippets
* WordPress for Atom
* Atom wrap in tag
* Babel
* Atom Easy JSDoc

## [WordPress For Atom](https://atom.io/packages/atom-wordpress)

`$ apm install atom-wordpress`

## [Atom wrap in tag](https://atom.io/packages/atom-wrap-in-tag)

### Install
`$ apm install atom-wrap-in-tag`

### Keyboard shortcut
`alt` + `Shift` + `w`

## [language-babel](https://atom.io/packages/language-babel)

### install
`$ apm install language-babel`

## [Atom easy JSDoc package](https://atom.io/packages/atom-easy-jsdoc)

### install
`$ apm install atom-easy-jsdoc`

# Atom Tool Packages
* Linter (checks for errors in code)
    - also install linter-eslint
    - `$ apm install linter-eslint`
    - shows you bullets when you have errors
* (**Dead Package!**)Terminal-plus (have your terminal right inside your text editor)
    - `cmd` + `shift` + `t` opens new terminal tab
    - open multiple and `cmd` + `shift` + `k` (or `j`) and navigate to right or left terminal window
    - toggle open/closed with `ctrl` + `~`
    - close a specific terminal with `cmd` + `shift` + `x`
* PlatformIO IDE Terminal (replaces Terminal-plus)
* Git-plus

# Atom Styling Packages
* Copy as RTF
    - if you wanted to copy code and format it for a slide in a presentation
    - highlight code, right click, select copy as RTF
    - when you copy and paste, it doesn't use your theme, it uses a theme in it's settings, change that to match your presentation
* Chrome Color Picker

# Atom Themes
Atom has two types of themes

* UI Theme
* Syntax Theme
* Theme respository
* 3rd party sites
* Install within Atom or Command Line

Checkout a bunch of atom themes here [atomthemes.io](http://atomthemes.io/)
* this is the best way to scroll to find a theme you like
