# Vi mode
* Using `ctrl-r` to Search and Auto-complete from History
* Many know about using the arrow keys to invoke previous commands from history, but relatively few know that you can invoke `ctrl-r` to be brought to a history auto-complete prompt
* Once you find what you were looking for you can hit enter and execute it or you can modify it before doing so. And now that your CAPSLOCK key is remapped, it’s easy to get in the habit

## Iterm
* Split panes
* Mouseless copy
* Paste history
* Full screen
* Unixyness
* Expose tabs
* Tagged profiles

## zsh plugins
* [osx](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/osx)
    - spotify, sign up for dev account, create fake app, grab
    - This command line application needs to connect to Spotify's API in order to
    - find music by name (super cool!)

### To get this to work
* You need to sign up (or in) and create an 'Application' at [spotify developers site](https://developer.spotify.com/my-applications/#!/applications/create)
* Once you've created an application, find the 'Client ID' and 'Client Secret' values, and enter them into your shpotify config file at '/Users/philiphowley/.shpotify.cfg'
* **note* Be sure to quote your values and don't add any extra spaces!
* When done, it should look like this (but with your own values):

```
CLIENT_ID="abc01de2fghijk345lmnop"
CLIENT_SECRET="qr6stu789vwxyz"
```

* Then you can type `$ spotify play album "Boxer"` and it will play it!

## Copy Paste
* Simply use the global register '+':

`"` + `y` will yanks to system clipboard.
`"` + `p` will pastes from the system clipboard

* I set the this option as `unchecked` (against the advice in this [article](https://evertpot.com/osx-tmux-vim-copy-paste-clipboard/))

# iTerm2 
* Has a setting that allows terminal applications to access the clipboard
* This works through ANSI escape sequences, and you actually want this OFF
* Before today I had this setting on, which kinda worked but it always truncated the clipboard, which made it completely frustrating for copy-pasting larger things such as logfiles
* So to repeat this, the “Allow clipboard access to terminal apps” must be OFF

# Remap CapsLock
* Easy to remap caps lock to `escape`
* Mac > Preferences > Keyboard > Modify Keys
