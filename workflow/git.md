# GIT
Version Control. You need to know how this works.

## Useful git

### Stash
When you want to pull down the latest changes but you are in the middle of working on something. You can temporarily `stash` them with:

```
$ git stash
```

### Stash Pop
And then when you have pull down changes you can get your stashed data back with:

```
$ git stash pop
```

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

## Forks
When you want to jump in to the world of open source development you are going to fork someone else's repo. This is in contrast to just simply cloning the repo.

When you fork someone else's repo, you get and exact copy of the repo (think xerox copy machine) but it is added inside your repo. You can take this code and totally do whatever you want with it but if you want to contribute to the open source project you can make pull requests to the other person's repo that you forked. They can accept and add your changes or deny or deny and ask for improvements before adding.

When changes happen to this forked repo by the creators of it, you can pull down the new modifications only if you add `upstream` capability to your report. This is the direct connection to communicate from them to you and you to them.

[Here is the link to add that capability](https://help.github.com/articles/syncing-a-fork/)
