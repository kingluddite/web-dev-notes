# iTerm2
## Did you lose your font icons?
* Profile change font and size (use my dotfiles)

![use dotfiles](https://i.imgur.com/6iwamYK.png)

* to speed up GENERAL uncheck GPU rendering and it will speed up iTerm a ton

`cmd` + `d` - split window

## Making the clipboard work between iTerm2, tmux, vim and OSX
* I was having problems yanking in vim and pasting into Sublime Text
* I turned off allowing clipboard access in iTerm and then this worked fine
* [resource](https://evertpot.com/osx-tmux-vim-copy-paste-clipboard/)

## Dim others except focused window
* This is great if your workflow involves using multiple terminal windows open at one time

## High contrast tab
* Makes you see active tab better

## Hide from command tab switch and dock
* I like this because I use `esc` to toggle iterm

## Multiple windows
* You can open preferences and under tab choose
* Light (High Contrast)
* Increase dimming (to help show active terminal)
* Check dim inactive split panes
* Check dim background windows
(This will help make sure your current terminal is easily seen)

## Change keyboard shortcuts to move faster by words left and right
[stackoverflow](http://stackoverflow.com/questions/81272/is-there-any-way-in-the-os-x-terminal-to-move-the-cursor-word-by-word/8250989#8250989)
I used the above tutorial to make `cmd` + `left arrow` move left one word and `cmd` + `right arrow` move right one word

| Keyboard Shortcut      |    Value |
| :-------- | --------:|
| `ctrl` + `a`  | moves you to front of line |
| `ctrl` + `e`     |   moves you to end of line |
| `ctrl` + `u`    |    clears line (oh-my-zsh) |


## Oh My ZSH
| Keyboard Shortcut      |    Value |
| :-------- | --------:|
| `$ ctrl` + `u`    |    clears line
| `$ take` | better than `mkdir folder-name` because it creates the folder and moves you into it | 

### Video Tutorial for iTerm
[Installing iTerm or Cygwin - Command Line Power Use](https://www.youtube.com/watch?v=jnLA6yAZkaY)

* windows uses [cygwin](http:/www.cygwin)
* makes windows unix based

### Preferences

## iTerm is better than Terminal
* [Link to iTerm 2](https://www.iterm2.com/features.html)
* [How to use iTerm2](https://www.youtube.com/watch?v=SoTDXeyz3AE)
* [How to Theme iTerm2](https://www.youtube.com/watch?v=SoTDXeyz3AE)
**note**  Music is loud. Cut the volume and watch the great tutorial
* [Setting Documentation](https://www.iterm2.com/documentation-preferences.html)
* Preference recommendations
[sourabhbajaj](http://sourabhbajaj.com/mac-setup/iTerm/README.html)
* [adamwadeharris](http://www.adamwadeharris.com/my-iterm-2-setup/)

## Problems seeing text in iTerm
* Change Minimum contrast and it will make invisible text no so invisible
![min contrast](https://i.imgur.com/8hZX0Ut.png)

## Terminal
| Command | Description |
| ------- | -------- |
| `ctrl` + `p` | See previous command in history | This saves from stretching to see previous terminal history using up arrow

## Mac Terminal tip: pbcopy and pbpaste
Let you write and read from the OS X clipboard

`$ cat file.txt | pbcopy`

* That's a lot faster than:

1. opening the file
2. Selecting everything
3. Copying it!

`$ pbpaste > example.css`

* Quicker than firing up Sublime/Atom/VS Code...

Even do fancier things like:

`$ tail -n 10 /var/log/messages | pbcopy`

