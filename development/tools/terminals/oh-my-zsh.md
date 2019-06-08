# oh-my-zsh
## Error on update
```
[Oh My Zsh] Would you like to update? [Y/n]: Y
Updating Oh My Zsh
error: cannot pull with rebase: You have unstaged changes.
error: please commit or stash them.
There was an error updating. Try again later?
```

### Why problem?
You made a changes to the config files probably. Go to your oh-my-zsh directory and type in git status

`$ cd ~/.oh-my-zsh`

`$ git status` - you will see changes were made

* Stash the changes

`$ git stash` (Or add and commit if you want the changes to stay)

### Run upgrade of zsh
`$ upgrade_my_zsh`


## Where is the ZSH_CUSTOM folder located?
By default, it is at `$ZSH/custom`; that is, the custom directory under your oh-my-zsh installation, which is at `~/.oh-my-zsh` by default.

If you want to use a different location, you can set $ZSH_CUSTOM to a different path in your `~/.zshrc` before loading **oh-my-zsh**.

or use

`$ echo $ZSH_CUSTOM`

## Useful plugins
* alias-tips: An oh-my-zsh plugin to help remembering those aliases you defined once
