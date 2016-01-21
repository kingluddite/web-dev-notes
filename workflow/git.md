# GIT
Version Control. You need to know how this works.

## Initialize git repo locally

```
$ git init
```

## Remove a git repo

```
$ rm -rf .git
```

## Grab changes instructors make from forked repo

```
$ git pull remote upstream
```

## What are my push and fetch remote connections?

```
$ git remote -v
```

## Add stuff to local repo

```
$ git add -A
```

## Commit stuff to local repo

```
$ git commit -m 'your commit message'
```

## Using origin master and production master
* This is how you can have a staging and production repos on same project folder

```
$ git push -u production master
$ git push -u origin master
```

## Push local changes to remote

```
$ git push
```

## Remove file from staging

```
$ git reset HEAD config.codekit
```

## Check current status

```
$ git status
```

## Create a branch

```
$ git branch (name of branch) 
```

You then need to checkout of current branch
  and move to new created branch with:

```
  $ git checkout (name of branch)
```

Add + commit changes in that branch
Move back to master ($ git checkout master) 
And merge changes into master

```
$ git merge
```

#### Git config
[link](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

##### Useful git config settings
`/etc/gitconfig`

```
alias.add-commit=!git add -A && git commit
alias.s=status -s
alias.lg=log --oneline --decorate --all --graph
user.name=pip_lineupbuilder
user.email=howley.phil@gmail.com
core.autocrlf=input
color.ui=true
push.default=simple
pull.rebase=true
rerere.enabled=true
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
```

## Deploy a site using Git

[video tutorial](https://www.youtube.com/watch?v=9qIK8ZC9BnU)

