# Merge Conflicts
* What is a merge conflict?
* How do we resolve a merge conflict?
* How do we avoid merge conflicts?

## What is a merge conflict?
* Git is good at taking two versions of a project and merging them together
* We merged many times with no problems
* But if we ask Git to read our minds, we'll get a merge conflict

### Two examples
* Successful merge
* Failed Merge

#### Successful merge
* 2 developers working on a project (john/jane)

![2 devs](https://i.imgur.com/9UfH7T9.png)

* John pulls down the master branch from Github and makes some changes

![john makes changes](https://i.imgur.com/okU3DQ2.png)

* Jane is working on the site at the same time and before john can push his changes she makes changes and pushes them up to Github

![jane's changes](https://i.imgur.com/3bCjGKC.png)

* John's copy of master branch is now outdated compared to the copy on Github
* John will try to push his copy to Github and it will fail because his repo is outdated
* All John has to do is run a `$ git pull origin master`
* He will pull down the latest changes from Github
* And then Git can automatically merged his outdated commit with Jane' recent commit
* If you are on the command line and Git is trying to perform a merge you will see this screen

![Git merge branch screen](https://i.imgur.com/wwUI3J2.png)

* People have problems with this screen
* You might wonder what keys you are supposed to press
* `escape key` + `:wq` + `enter`
* That will make a successful automatic merge
* Then John can now push his changes to Github with `$ git push origin master`
* Git can save the day and merge the code because the lines of code each team member added are different from each other
    - One added to the beginning of the list
    - The other added to the end of the list

## Unsuccessful Merge
* The next day John pulls down the master branch to his computer

![john pulls down master branch](https://i.imgur.com/GJAaZSD.png)

* Jane pulls down the master branch
* Jane and John start editing the same lines of code

![same lines of code editing](https://i.imgur.com/K49A6da.png)

* Jane pushes her changes up to Github before John
* John tries to push his changes to Github and it will fail because his repo is outdated
    - But this time when John tries to fix things with `$ git pull origin master`
    - Git will NOT be able to automatically merge and save the day
    - Instead John will run into a merge conflict
    - The conflict is John and Jane both want to commit different changes to the same lines of code
    - Git won't pick sides and it wants you to decide
    - We need to step in and make a judgement call and choose which code to use for those lines
    - The Terminal will tell which files have conflicts
    - Open the file and you will see something like this:

![merge conflict code](https://i.imgur.com/7lT0bZh.png)

HEAD will be the commit that John tried to push
and following that are the matching lines of code that Jane pushed

We need to:

* Remove the label lines Git added to the file
* We need to decide which conflicting lines should be in our code

![decide on code](https://i.imgur.com/hdTifof.png)

* Add the file that had the conflict `$ git add index.html`
* Commit the changes `$ git commit -m 'Resolve merge conflict`
* `$ git push origin master`

## How can we avoid merge conflicts?
* Run `git pull` command as often as possible
* Make it part of your routine
* Anytime you sit down to work on your project, pull down first
    - Get into work - git pull
    - Run to meetings and come back - git pull
    - after lunch - git pull
* Communicate with your team
* Standardize white space settings in text-editor
    - tab (2 or 4 space, single tab space character)
    - convert indentation to spaces or
    - convert indentation to tabs
    - tab width
* Think of 'git merge' as a two-way street
    - Stop thinking that we only merge feature branches into master
    - Think of it as we can also merge the master branch into our feature branch
    - While we have our feature branch checked out, let's merge master into our feature branch
        + If we do this often enough we will likely avoid conflicts
        + If we run into conflict when we merge master into our feature branch when we finally do merge our branch into master the conflicts will be easy to fix
