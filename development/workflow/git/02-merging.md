# Merging with Git

* think of merging like the opposite of branching
* branching gives you a separate timeline to work on
    - merging takes 2 separate timelines and merges them together
    - also combines the commits into one cohesive timeline

## Merge conflict
when you merge two branches and the same files in each branch were worked on and changed

* git tries to resolve the merge conflicts on its own but if not, you will have to manually merge them by saying which code to keep and which code to delete
* if you merge code that does not involve the same file, the merge will be a simple command

## how to merge

```
$ git merge new-navbar
```

* make sure you are on the `master` branch and use `git branch` to ensure this and to know the name of which branch you want to merge

* the merge will only affect the master branch
    - you'll see that git has added a merge to the commit history
    - but if you got to new-navbar branch, the merge is not there

## Hard Conflict
making change to same line of same file
* error message - "Automatic merge failed; fix conflicts and then commit the result"

You will follow git's instructions to open the file with the conflict

you will see something like:

```
<<<<<< HEAD
This is file1, yo
This is file1, bam!
>>>>>>> new-nav
```

The `conflict markers` show us where the conflict occurred during the merge and also lets us compare both versions of the change to decide what we want to do with the file
the angle brackets show us whole area of conflict and the ===== shows us the separation between the two versions (labels to right of brackets show us which version is which)

note: `HEAD` the name for the latest commit in the current branch.

remove the conflict markers and make the change you feel is correct by either choosing one change over the other or combining them or even removing them both

now the conflict has been resolved but we need to let git know

```
$ git add
$ git commit
```

* git will know we are merging so it will add a useful merge message automatically that we can edit as we want

# Remote Repos

## cloning
create a copy of your repo on their computer

```
$ git clone ~/my-git-project my-new-git-project-name
```

* will create a perfect copy of original repo
* git also created a remote repo when it created this one

```
$ git remote
```

shows a list of all remotes available
* when you clone a repo, git automatically creates a remote named `origin` for you

why origin?
because your repo originated as a copy of that particular code

* your origin repo is not affected at all by the clone
* cloning creates a copy of the original without changing it in any way (non destructive copy)

but how can we get our local and remote repos to talk to each other

## Manually adding a remote repo

```
git remote add our-clone ~/path/to/your/new/clone/project
```

list remotes with

```
$ git remote
```

and now you should see that you added the remote repo

## Git Pull
pull changes from a remote repo

```
$ git pull origin name-of-branch
```

* if you get a merge conflict, handle it normally
* git assumes you are by default trying to push and pull from origin

## Git Push
push changes to a remote repo

You create a branch. add and make commits. then you want to push to remote

```
$ git push origin name-of-branch
```

* first argument needs to be name of remote

# Github

## Issues
## Pull Requests
You have code you want people to `pull` into their projects
* great tool for collaboration

### Discussion, Commits, Files Changed
* easy to add comments if we want to contribute to the code ourselves

## Watch the project
* if any major changes happen to project 

## star project
add to list of favorite projects

## Fork
create a clone of project in our own github account

## Workflows
* [feature branches](http://martinfowler.com/bliki/FeatureBranch.html)

# git-flow
A collection of Git extensions to provide high-level repository operations for [Vincent Driessen's branching model](http://nvie.com/posts/a-successful-git-branching-model/)

* [github repo](https://github.com/nvie/gitflow)
* For the best introduction to get started with git flow, please read [Jeff Kreeftmeijer's blog post](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/):
* [How to use a scalable Git branching model called git-flow (by Build a Module)](https://buildamodule.com/video/change-management-and-version-control-deploying-releases-features-and-fixes-with-git-how-to-use-a-scalable-git-branching-model-called-gitflow)
* [A short introduction to git-flow (by Mark Derricutt)](https://vimeo.com/16018419)
* [On the path with git-flow (by Dave Bock)](https://www.youtube.com/watch?v=7vw1dGHjnOk)
* [git-flow tab completion](https://github.com/bobthecow/git-flow-completion)
