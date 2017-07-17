# What is Git?
1. What is Git
2. Why should we learn Git?
3. Where do we begin?

## What is Git
Today's most popular **VCS** - Version Control System

## What does git do?
* Helps us manage our project's files
* Git is a tool we install on our computer

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

* When we are finished making our changes in our `header-changes` branch we fold in back into our tree (_master branch_)
* Do the same with `footer-changes` branch

## Web Dev Vocab
* Project = Repository (_repo_)
* Git saves all changes in **repo**

### Working directory
* Folder on your computer where your project lives
* Git's job is to track any changes we make in this folder

### Commit
Only when we actively commit changes does Git save them

### Staging
* We `stage` our changes before we `commit` them
* **analogy** Before you sell a home, you first have to get it ready or staged
* Staging means preparing, getting ready
* Staging enables us to control what gets committed
* We don't always want to push every change we made into a commit
* We `add` files to **Staging area** and when we are happy they are what we want to `commit`, we `commit` them

`$ git status`

`$ git add -A` (_add all changes_)

`$ git commit -m 'your message here'`

## Bring back lost files
* If all your files were deleted, you can bring them back to life with the following command:

`$ git checkout -- .`

* And presto! Our files are right back where we last had them
* Even if all your files content or entire files and folder are deleted as long as you have `.git` you can restore them with `$ git checkout -- .`

### Git != GitHub
* Github is one of many services that can host your repos
* Github is the most popular

### Push changes to Github

`$ git push origin master`

### Pull changes from Github

`$ git pull origin master`

### Tell git about you
* `$ git config --global user.name "PEH2"`
* `$ git config --global user.email "youremail@address.com"`

## Talk to the terminal
* `pwd`
* `cd`
* `mkdir`
* `touch`

**note** You can also drag your folder from inside finder onto the command line and that will place the path inside the Terminal

## Create new reop
`$ git init`

### .gitignore
* `.DS_Store` - system file on Macs
* We will add this to our `.gitignore`

## Clone
* Copy an existing repository from a server to our computer's hard drive
* `Public Repo`
    - Everyone in world can see your code (_doesn't mean they can change your code_)

## BitBucket - offers private repos for free

## Repo-names: use dashes on Github
* Won't allow you to have projects with spaces in their names

### Add origin
* Use this so you can push/pull your repo to/from Github

`$ git remote set-url origin https://github.com/USERNAME/REPONAME`
