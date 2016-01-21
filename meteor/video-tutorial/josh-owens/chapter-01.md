# Meteor

## Chapter 1
Create a meteor project

```
$ meteor create my-project
```


Intialize Git for your project

```
$ git init .
```

See what's inside your folders

* Install homebrew
* Install tree `brew install tree`

```
$ tree
```

Run Meteor

```
$ meteor run
```

* .meteor
    - .packages

## Add packages

iron router

```
$ meteor add iron:router
```

## Atmosphere
* [bootstrap](https://github.com/twbs/bootstrap)

```
$ meteor add twbs:bootstrap
```

Terminal Copy files
Go into folder with files you want to copy

```
$ cp -R * ../twitter-clone-6/
```

* the `/` at the end of the path is important, it means grab all the files inside the folder and copy them, not the folder itself

## Add files to git staging

```
$ git add .
```

## Commit files

```
$ git commit -m "you commit message here"
```

### Create User Stories

[sample user stories](https://github.com/meteorclub/twitter-clone-class-6/issues?q=is%3Aissue+is%3Aclosed)

### Set your remote Github origin
* Create your github repo manually or using terminal
* Install Hub with brew [hub link](https://hub.github.com/)

```
$ git remote set-url origin {github repo url here}
```

## Push to Github

```
$ git push origin master
```

## Working Start file
[working start files](https://github.com/meteorclub/twitter-clone-class-6/tree/2e679b0b56d24f18781529357397b4d239dcc925)

* When you clone a repo you clone it and all it's commits. The commit we want to switch to (the starting point) is the following SHA #:
`2e679b0b56d24f18781529357397b4d239dcc925`

How to see that commit (and only its files)

```
$ git checkout 2e679b0b56d24f18781529357397b4d239dcc925
```

When you clone that file you will get an error because iron-router is not installed. Install that package. (see above for instructions how). Also add `bootstrap` and `stylus` packages.









