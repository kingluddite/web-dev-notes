# Git Branches
## Topics we'll address
* What is a branch?
* How to create a new branch
* How to switch between branches
* Merge one branch into another

## Working in the Terminal
* Have `$ gulp watch` working in one tab
* Open up a new Terminal tab with `cmd` + `t`
* List all current branches in our repo

`$ git branch`

## What is a branch?
Think of a branch as a version of our project

## What is the `master` branch
* Think of it as the `main` branch
    - Or
        + primary
        + live
        + production

...version of our project

## Rule #1
Don't commit work in progress code to the `master` branch

* Instead create a new branch for each **new feature** of our project

### Add all changes to the staging area
`$ git add -A`

### Check your status
`$ git status`

### How can we remove one file from the staging area?
* Let's say `index.html` is in our staging area

`$ git reset app/index.html`

### Run status again
`$ git status`

* You will see we removed `index.html` from **Staging area**

### Add index.html back to Staging area

`$ git add app/index.html`

### Commit changes
`$ git commit -m 'Complete large hero block and intro content block`

### Check status again
`$ git status`

You should see `working tree clean`

![working tree clean](https://i.imgur.com/Enpkqdm.png)

### New Branch
Now we're ready to create a new branch

#### How to create a new branch
* Let's say we are creating an ordered list from one to 10

`$ git branch top-ten-list`

### Show all branches
`$ git branch`

* You should see this:

![branches](https://i.imgur.com/IZrUlu7.png)

The asterisk represents the branch we are current inside

## Change to the `top-ten-list` branch
* Git refers to this as `checking out` a branch

`$ git checkout top-ten-list`

* Now we are inside this new `top-ten-list` branch
* `$ git branch`
    - Notice the asterisk is now on the `top-ten-list` branch

`index.html`

```html
// more code
<body>
  <ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ol>
// more code
```

```
$ git status
$ git add .
$ git commit -m 'Started top ten list'
```

* You're done for the day
* You go home

## Next day
You start on the `master` branch

`$ git checkout master`

* Notice your top ten list is gone
* Becuase it only exists in the `top-ten-list` feature branch
* We are ready to work on that feature so we switch to that branch

`$ git checkout top-ten-list`

* Now our top ten list is back
* We finish coding it

```html
// more code
<body>
  <ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>5</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
  </ol>
// more code
```

* Update git

```
$ git status
$ git add .
$ git commit -m 'Complete top ten list'
```

### Merge changes into master branch
`$ git checkout master`

* Now we merge

`$ git merge top-ten-list`

### Push commits to Github
`$ git push origin master`

#### Checkout commit history
![commit history](https://i.imgur.com/fQEZyjm.png)

Git took our commits from another branch and merged them into the commits on the master branch

### Create a new branch
`$ git branch top-fifteen-list`

### Change into that new branch
`$ git checkout top-fifteen-list`

```html
// more code
<body>
  <ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>5</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
  </ol>
// more code
```

### Stage and commit files in one move
* Only works with files that have already been created

### Push a branch to GitHub
`$ git push origin top-fifteen-list`

### Check out your remote repo on GitHub
* You will not see your commit for the `top-fifteen-list` branch because you are looking at the `master` branch
* Switch to the `top-fifteen-list` branch by selecting it in the dropdown

![top fifteen list branch](https://i.imgur.com/H3kryM5.png)

* And now you will see your last commit

![last branch commit](https://i.imgur.com/rhZgtBX.png)

### We need to alter our list to make it a top 20 list
* We'll keep the branch name the same for simplicity

```
  <ol>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>5</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>20</li>
  </ol>
```

* Add and Commit the changes to your repo
* Push the branch to Github

### Now we are ready to merge
* We'll let GitHub handle the merge this time
* Click the top most page of the repo `travel-site`
* You will see this:

![pull request](https://i.imgur.com/Xcd42tD.png)

* Click `Compare & pull request`

## What is a pull request?
A request to merge one branch into another

* The `master` branch will be our **base**
* The `top-fifteen-list` branch will be the branch we are merging in
* When using pull-requests you are ususally working on a team
* You usually **assign** this `pull request` to someone else on your team
    - They then can do a **peer review** on your code to make sure things look good
    - More on **peer reviews** on Github [read more](https://softwareengineering.stackexchange.com/questions/301448/how-to-do-peer-reviews-on-github-pull-requests)
    - [Assign it to yourself for this example](https://i.imgur.com/6z2wVvZ.png)
    - Also leave a comment like `I know it says top 15 but now it is top 20. What do you think?`
* Click `Create pull request` button
* You will see a summary of what the pull request is doing:

![summary pull request](https://i.imgur.com/OPbYOmF.png)

* Scroll down and click `Merge Pull Request` and then `Confirm merge`
* Than you will see Pull request is successfully merged and closed

![Pull request successfully merged and closed](https://i.imgur.com/X2UoJ9s.png)

* You will see a delete branch button
    - Once you have merged a branch you can delete it
    - It is a good pruning practice to delete merged branches
    - They can grow large and unruly very quick so delete them

### Back on your local machine
* Checkout the master branch

`$ git checkout master`

* You will see that the list is no longer going to 20
* That is because our merge happened remotely on GitHub's servers not on our local copy of our repo
* We just need to pull in the latest copy of master onto our machine with:

`$ git pull origin master`

* Now we have our top 20 list

## Keep our local repo clean of merged branches
`$ git branch`

We see `top-fifteen-list` and `top-ten-list` branches

`$ git branch -d top-fifteen-list`

`$ git branch -d top-ten-list`

`$ git branch` - we only have the `master` branch left

### Delete the list
We don't need it and it was just an exercise to practice Git

* Add and commit that change

`$ git commit -am 'remove test list'`

### More Branch topics to cover
* `--no-ff` merge option (no fast forward option)
* How to deal with merge conflicts

### Next
* We will be creating a feature section
* Create a new branch called `our-features`

`$ git checkout -b our-features`

* This is a shortcut to create and switch to a new branch in one line

