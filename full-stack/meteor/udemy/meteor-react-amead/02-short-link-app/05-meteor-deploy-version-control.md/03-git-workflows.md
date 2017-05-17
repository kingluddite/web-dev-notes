# Git Workflows
Make this change to `Login`

`<h1>Short Link Login</h1>`

`$ git status` - one changed file

## `$ git checkout FILENAME`
* You made mistakes and want to revert
* You can't just use `cmd` + `z` to undo (It's not that easy :) )

`$ git checkout -- imports/ui/components/Login.js`

**note** That did affect changes to our working directory and reverted the file to what it was before we made the change

### Revert all changes
`$ git checkout .`

### Create readme.md
`$ touch readme.md` and add this content

`# Practice Meteor React App`

#### Make this change to `Login`

`<h1>Short Link Login</h1>`

`$ git status`

Will show you that Login has been modified and you have a new file. Just like the diagram (Untracked) and Modified files for changes not staged for commit

`$ git add .` (add everything)

`$ git status` - run this all the time to make sure git did what you wanted

## Just remove from staging area
It won't remove your changes but just remove from staging area

`$ git reset HEAD .`

Use this to get back to where you started

`$ git add .`

Adds everything

`$ git commit -m 'add readme'`

Take second snapshot by committing changes

`$ git log`

Will show two commits

This is the workflow you will do 99% of the time

* Stackover for other 1%

## Add Git alias to Bash or ZSH
`~/.zshrc`

```
# ====================
# Git Aliases
# ====================
alias gs='git status'
alias gpush='git push origin master'
alias gpull='git pull origin master'
alias gap='git add -p'
alias ga='git add '
alias gb='git branch '
alias gc='git commit'
alias gd='git diff'
alias go='git checkout '
alias gob='git checkout -b '
alias gk='gitk --all&'
alias gx='gitx --all'
alias glog='git log --pretty=oneline --abbrev-commit'
alias gitl='git log --pretty=oneline'
alias lgl='git log --oneline --decorate'
# when I mispell git commands the following 2 commands help
alias got='git '
alias get='git '
alias glog='git log --pretty=oneline --abbrev-commit'
alias up='git pull upstream master'
```

