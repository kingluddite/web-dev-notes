# GIT
Version Control. You need to know how this works.

## Some Useful GIT commands

### How do I push all branches to remote?
```
$ git push --all origin
```

### How do I remove a remote origin

```
$ git remote rm origin
```

### How do I add a remote origin?

```
$ git remote add origin https://github.com/USERNAME/REPONAME
```

### How to I grab remote branches?

Let's have a chat about this because it's kind of strange. So you have remote branches on your origin repo. If you use 'git pull' it will pull down that branch but if you type `git branch` you will not see it.

To see all remote branches you use `git branch -a`

With the latest version of git, you can use `git fetch` to grab the remote branches and then you can check into that branch with `git checkout [branch name]`

How to delete a branch?

```
$ git branch -d {the_local_branch} (use -D instead to force deletion without checking merged status)
```


If you have an older version of git, you'll need to update or use the older syntax.
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
When you start a project you create a folder. If you want to starting using git for version control of your project, add the following `init` command while you are inside the root of your folder.

```
$ git init
```

## Remove a git repo
You would think this would be simple. If I see something I should just be able to type `rm` and remove it. For files, it is that simple but for folders you run into problems and that is why the `-rf` flag is important. If you want to delete a folder and everything inside it recursively, use the `-rf` flag like in the example below were you are removing the entire .git folder and all of its version control knowlege of your project. 

```
$ rm -rf .git
```

## Forking vs Cloning a repo
You see a repo you like. Just grab its repo url and clone it to a spot on your computer and you are off and running. But what if you like the project so much you want to work on it and make it better. This is the whole impetus behind the open source movement. That is where forking comes into play. Instead of just cloning it, you fork it and that fork takes a copy of that open source community repo and puts that exact copy (github shows an animation of a photocopy machine making a copy of a book) to your repo. If you look at the Github UI you will see they are telling you this information.

![Github UI shows forked repo](https://i.imgur.com/fsSP24C.png)

When you set up your own Github repo you traditionally refer to that as your remote `origin master`. So when you are working on your own project you will add and commit locally and then push to your remote repo (origin master). But when you fork you also have access to `upstream` repo you forked from.

A good tip is to check your remote connections information and this will show you where your remote origin master is and where your `upstream` is. If you don't see it, you may need to add it depending on what you are doing for your project.

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

# Git

## Global config

```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

## Problems

### Can't Push

If you get this error

![ssh permissions error](https://i.imgur.com/TBXPtvt.png)

I get this every now and then. I usually occurs when I for some reason or another delete or change my SSH keys. The solution is just to make sure github has your SSH key in the settings. If not, login and go to your profile on Github. Go to settings and then click the SSH and GPG button. Go the the terminal and quickly copy your SSH key using this command:

```bash
$ pbcopy < ~/.ssh/id_rsa.pub
# Copies the contents of the id_rsa.pub file to your clipboard
```

[link to article](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

Add a new SSH key. Give it a name.
Paste your copied key into the textarea.
Save.

Try to push again and it should work now.

<<<<<<< Updated upstream
## Git Aliases
These aliases should be in your `.zshrc`

`.zshrc`

```
# ====================
# Git Aliases
# ====================
alias gs='git status'
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
## Starting a fresh project

If you plan on starting a new project with an existing repo, be sure and clear out that repos git data at the start to create a fresh history:

```
$ rm -rf .git && git init
$ git commit -m "Initialize Repo"
```

## Errors

I get this error a lot. If you see something like this and are wondering what is wrong? It means you forgot to add and commit your first repo commit

Usually get it when I first run `git init` and then try to `hub create` and when I `git push origin master` I get the following error.

![common git repo create error](https://i.imgur.com/8dU3F81.png)

Just add and commit and you should be good to go.

