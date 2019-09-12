# All about Git

## Access key

* You want to setup SSH on Github
* If you do you won't ever have to worry about Access key on Macs

  * This is a program that will ask you to store you password
  * SSH bypasses this so set it up and Access key will never bother you again

* save points
* git-scm.com
  * download for mac
    * install defaults
  * use homebrew

## your current version of git

`$ git --version`

## What is Git?

* first initialize a repository (aka repo)
  * just a folder that sits inside your project
* `$ git init`
  * immediately picks up all the files that make up our project

### Untracked files

![untracked files diagram](https://i.imgur.com/Xm4MHxe.png)

* Goal: race to commit!

### `$ git add`

* Takes "Untracked Files" files and makes them "Staged Changes"
  * Makes up everything that will be in the next **committ**

![staged changes](https://i.imgur.com/wF1cED2.png)

* **note** Staged changes still are not tracked by Git
* It just helps you line up your next **save** point
* Once you have files in Staged Changes you can then make a `commit`

### Commit `$ git commit -m 'message here about your commit`

![commit](https://i.imgur.com/RLqds7F.png)

* Creates a random unique identifier

![random unique id](https://i.imgur.com/vDWJU4m.png)

* We now committed our changes to src/app.js file

## Unstaged Changes - What if we make changes to src/app.js?

![unstaged changes](https://i.imgur.com/a2lXQsi.png)

* Since that file is already being tracked by git it now gets moved to Unstaged Changes
* If we add a new file say `package.json` that gets added to Untracked Files

![new file](https://i.imgur.com/sMYR2iN.png)

## Add just two files

![adding 2 files](https://i.imgur.com/w83RZcN.png)

* After add 2 files

![two files added](https://i.imgur.com/XuaCXtM.png)

## Run new commit

![new commit](https://i.imgur.com/az14SD4.png)

* New commit added
* We now have another commit id

![second commit added](https://i.imgur.com/bogNou5.png)

* Our repo now has 2 commits
