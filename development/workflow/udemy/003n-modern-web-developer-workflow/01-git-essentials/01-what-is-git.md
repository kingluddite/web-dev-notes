# What is Git?
1. What is Git
2. Why should we learn Git?
3. Where do we begin?

## What is Git
Most popular VCS - Version Control System

What does git do?
helps us manage our project's files

Git is a tool we install on our computer

## What does Git do that makes managing our files easier?
* History
    - Git keeps track of every change we make to our project
* Collaboration
    - You don't want to override each other's progress
    - Git makes collaboration easy
    - Makes you able to be more productive in a team
    - No waiting for others changes, you can work on your changes and team members can work on their changes at the same time
    - Git merges changes for us
* Feature branches
    - header-changes
    - footer-changes

![visual for feature branches](https://i.imgur.com/O3IYf6z.png)

* When we are finished our header-changes we fold in back into our tree (master branch)
* Do the same with footer-changes

## Vocab
Project = Repository (repo)

Git saves all changes in repo

### Working directory
* Folder on your computer where your project lives
* Git's job is to track any changes we make in this folder

### Commit
Only when we actively commit changes does Git save them

### Staging
We stage our changes before we commit them
Before you sell a home, you first have to get it ready or staged
Staging means preparing, getting ready
Staging enables us to control what gets committed
We don't always want to push every change we made into a commit
We add files to Staging area and when I'm happy they are what I want to commit, I commit them

git status
git add -A (add all changes)
git commit -m 'your message here'

## Bring back lost files
If all your files were deleted

`$ git checkout -- .`

And our files are right back where we last had them

Even if all your files content or entire files and folder are deleted as long as you have `.git` you can restore them with `$ git checkout -- .`

Git != GitHub

Github is one of many services that can host your repos
Github is the most popular

`$ git push origin master`

Pushes our commit to Github

`$ git pull origin master`

### Tell git about you
`$ git config --global user.name "PEH2"`

`$ git config --global user.email "youremail@address.com"`

* pwd
* cd
* drag fold on top of command line
* mkdir
* touch

## Create new reop
`$ git init`


.DS_Store - system file on Macs

## Clone
Copy an existing repository from a server to our computer's hard drive

Public Repo - everyone in world can see your code (doesn't mean they can change your code)

BitBucket - offers private repos for free

Repo-names: use dashes on Github

### Add origin
`$ git remote set-url origin https://github.com/USERNAME/REPONAME`

