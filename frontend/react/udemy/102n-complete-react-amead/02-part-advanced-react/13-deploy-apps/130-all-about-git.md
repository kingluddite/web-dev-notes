# What is Git?
* First initialize a repository (aka repo)
  * Just a folder that sits inside your project
  * Each project you work on would have a single repo

`$ git init`

* When we create this repo it will immediately pick up all the files that make up our project

### Untracked files
* `src/app.js`
* `src/components/Header.js`

### What is the goal?
* To take these untracked files that Git doesn't know about and somehow get them all the way over to `Commits` (see diagram below)
    - `commits` are kind of like "save points" aka **snapshots**
* We will need to track the changes to all those files and we'll do that will a few Git commands   

![untracked files diagram](https://i.imgur.com/Xm4MHxe.png)

### `$ git add`

* Takes "Untracked Files" files and makes them "Staged Changes"
  * `Staged Changes` make up everything that will be in the next **commit**
  * I could gather up all the files that I want to save and I could save them all in a "commit"
      - You could have all files in "Staged Changes"
      - Or you could just have a subset of your files in "Staged Changes"

![staged changes](https://i.imgur.com/wF1cED2.png)

* **note** Staged changes still are not tracked by Git
* It just helps you line up your next **save** point
* Once you have files in "Staged Changes" you can then make a `commit`

### Commit `$ git commit -m 'message here about your commit`

![commit](https://i.imgur.com/RLqds7F.png)

* Creates a random unique identifier

![random unique id](https://i.imgur.com/vDWJU4m.png)

* We now committed our changes to `src/app.js` file

## Unstaged Changes - What if we make changes to src/app.js?
* "Unstaged Changes" contains things that Git is tracking but you haven't told it to move over to "Staged Changes"

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
    - The commits are the "save points" throughout our project
