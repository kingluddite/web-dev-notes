# Intro to Git

## VCS
Version Control System

* cowboy coders
    - don't use vcs

* aka
    - revision control
    - source control

## Repository
aka Repo

A collection of all the versions of a project
* what order changes occured in
* description of each change
* who was responsible for each change

Each Project should have its own repo
* you have to explicitly tell VCS when version is finished
    - called "committing"
        + just like you commit something to memory you also commit changes to your repo
        + versions are often referred to as commits

VCS give you a set of tools to review your project history
* you can view and review the full list of commits
* or switch which version your current project folder is displaying
* you can share you repo with others for better collaboration

## Why use Git?
And not one of the other types of version control systems

* git was invented by [Linus Torvalds](https://www.youtube.com/watch?v=NKkvPxYNh9A)
    - father of Linux OS
    - still maintains the Linux kernel
        + heart of every linux system

## Distributed Version Control System (DVCS)
Git is a distributed version control system, which means that there is no "central" repository for any given project; everyone has their own copy of the project repository that they can work with directly.

* Git is a DVCS
* no centralized repo 
* everyone who works on a project has their own repo
    - don't need a network connection to interact with repo
* collaboration is easy

## some VCS are centralized
* 
    - 1 repo
    - if you work on that repo, you do it over a network
        + con
            * hard to work on project without network connection
            * if anything happens to that repo you could lose all or some of repo history
            * hinder collaboration by requiring everything to go through that server

## Github
[github web site](http://github.com)
* most popular git collaborating site
* like a social network for your repos
* share you projects publically or privately
    - people can view your history or make pull requests

## How to install Git
* comes installed on Mac by default

Install on your own server

```
$ sudo apt-get install git
```


### Which version of Git am I running

```
$ git --version
```

### Create your first repo
* this will create a folder and add the .git folder inside it which is the folder that has all the Git magic inside it
* you can create a git repo any time
* if you are inside a project already, just run `git init` without a project name and git will be added to your existing project

```
$ git init my-first-repo
```

remove .git folder

```
$ rm -rf .git
```

when you create files/folders you need to add them

```
$ git add filename
```

* you can use -A to add all files/folders

you also have to commit and leave a clear, meaningful and short message

```
$ git commit -m 'add README '
```

## Make sure you info is correct

```
$ git config --global user.name "John Doe"
$ git config --global user.email "johndoe@example.com"
```

## When to commit?
Is there a good commit message to use?

## Shortcut to commit
```
$ git commit -a -m
```

* the `-a` flag will commit everything
* the `-m` flag prevents you from going to `NANO` editor, and you can type your commit message directly from the terminal
    - just make sure the commit message is inside quotes ''

## The Staging Area

### git status

```
$ git status
```

* show us the current version control status of our project

The staging area are files/directories ready for commits

* you can add one file by naming, more than one file, by naming them, or all  files with the -A flag
* when you add and commit all, the status will be empty

### changes not staged for commit
git lets us know files have changed

* git will give us hints like in a case when we made changes and didn't add yet
    - we can `git add` or we can `git commit -a` to commit all files that have changed
* you can add and commit separate files
    - sometimes you did not want all your changes to be labeled under one commit
        + if you want to break apart commits, just add them in the chunks you want and individually commmit those chunks with meaningful commit messages

## Review our commits

### git log
shows us a log of all our commits

#### info in log
* top will be most recent commits
* unique id - aka hash
    - virtually guaranteed to be unique
* author info
* date/time code committed
* commit message

## checkout individual commit
```
$ git checkout 4cb4e
```

## What is `detached HEAD` state
git is telling you that you checked out an earlier version of your code and if you make any changes right now, things could get messed up

* think it is like the librarian not wanting you to write in the book you checked out
* when you checkout a commit, it is like you are in a time machine and went back in time, your project will be in the exact state it was when you made that commit
* think of commits like snapshot taking at family reunions
    - each year you can take a different snapshot of your family and it will show who was in the family that year
## check what is inside a file

## how to get back to you current project commit

```
$ git checkout master
```

* master is your branch name

## git diff
the difference of changes between 2 versions of your project

show the difference between 2 commits

```
$ git diff 1221f 7ad75
```

# What are branches
think of them like alternate realities for your repos

* you can do different courses of action on your project in parallel
* start with one trunk but as time goes on you'll start to `branch` off the main version

## the master branch
the default branch or the trunk of your repo

* `git status` will tell you what branch you are on
* master should be representative of your code that is deployed in production
* master is the canonical branch

## create a new branch

```
$ git branch new-navbar
```

### you now need to switch to that branch

```
$ git checkout branch new-navbar
```

* git will checkout the latest commit for that branch and that will be the starting point for your branch
    - this commit is know as the HEAD commit for that branch

```
$ git status
```

* should now tell you that you are on the `new-navbar` branch
* make a change to a file
    - add and commit with

```
$ git commit -a -m 'add navbar' 
```

* `$ git log` will show that commit at the top
* `$ git checkout master` takes you back to master
    - the latest commit will not be in master. Why?
        + git knows that commit is only relevant to the branch we created it on

## git checkout -b branch-name
this will let you create a branch and move to it in one line

**note**: when you create a new branch it starts off as a copy of the branch you were in when you created the new branch

## show all branch

```
$ git branch
```

* asterisk will show you which branch you are currently on
 
## delete a branch

```
$ git branch -D branch-name-here
```

* you can not delete a branch if you are inside it



## Tip

See what content is inside a file

```
$ cat file1
```




