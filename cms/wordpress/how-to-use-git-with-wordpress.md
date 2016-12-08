## Get Git!
Inside your theme you need to start listening with Git (and add version control to your theme)

`$ git init`

## Add with Git

First check your site with `$ git status`

You will see `node_modules` and that we are tracking it. We don't want to as this code we never edit because it's 3rd party code. We use it but it is not ours so therefore we don't need to add it to our git repo. If we added `node_modules` to all our repos, we would waste space needlessly. Give a hoot. Don't pollute! `:)`

### .gitignore

This file will allow git to ignore `node_modules`

Add it to the root of your custom theme.

`$ touch .gitignore`

And add `node_modules` to that file. You can do that through the terminal with:

`$ echo "node_modules" >> .gitignore`

Save and check the status with

`$ git status`

And you will see `node_modules` is no longer being watched by git.

#### Now we are ready to add our new stuff to gits staging area.

`$ git add -A`

## Commit with Git

`$ git commit -m 'initialize repo'`

## Never work in the master branch

The master branch is for your production code.

Whenever you are working on a new feature you should create a feature branch.

## Create a feature branch

`$ git checkout -b my-first-feature-branch`

Now you just created a new branch named `my-first-feature-branch` and switched into it (that's what the -b flag did)

This branch has everything the master branch had but you now can add new stuff without worrying it will mess up the master branch.

Save and commit.

`$ git add style.css`

`$ git commit -m 'add background color'`

## Switch back to the master branch
`$ git checkout master`

Notice how we don't see our new style in the master branch? This is because branches don't see each other. They are self contained. When you create a branch, it takes a copy of the branch you are in and puts it inside the new branch.

## Merge Branch
We want to take the code we had in our `my-first-feature-branch` branch and merge it into the master branch. We can do that with:

`$ git merge my-first-feature-branch`

Now the master branch will have the new body background.

I won't keep adding branches in my notes but you should get into this habit. Never work with new stuff in the master branch. Create a new branch and when you know it works and it is what you want. Add, commit and switch back to the master branch and merge your changes.
