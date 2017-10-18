# Utilities
## Copy and Paste
* From Vim (iTerm) into OSx clipboard

* This took a while to figure out
* Do this:
* Make Iterm settings look like this:
* Do this inside your `~/.vimrc`

![iterm settings](https://i.imgur.com/OQ8B7oC.png)

Add this to vimrc
```
" set clipboard to easily copy from vim and paste into OSx
set clipboard=unnamed
```

## ~/.vimrc
* make jk escape

```
" map jk to esc
:imap jk <Esc>
```

## Link to my `~/.vimrc` gist
[link](https://gist.github.com/kingluddite/c32c77724c4705bd05fa17080cfed95e)
