# Gulp
https://css-tricks.com/gulp-for-beginners/
[github of csstricks gulp](https://github.com/zellwk/gulp-starter-csstricks)
JavaScript task runner

* [using gulp with bootstrap 4](http://blog.marcrudkowski.com/using-gulp-with-bootstrap-4/)

* Task set in JavaScript file. 
* They are compiled and run.
* Tasks can run one after the other
* Some tasks can depend on other tasks

**Example**

1. Task - Concatenate JavaScript
2. Task - Minify JavaScript

**Note:** Tasks can be run all at the same time or in parallel

## gulpfile.js
The file that gulp looks for defined tasks in

**What do I need to run gulp?**
* Node
* NPM (node package manager)

## How can I tell if Node is node installed?

```
$ which node
```

## How can I tell if `npm` is installed?

```
$ which npm
```

**Note:** When you install `node`, **npm** is installed too.

## Install `gulp` and `http-server` globally

```
# Install gulp globally
$ npm install -g gulp

# Install http-server globally
$ npm install -g http-server
```

## Installing Node devDependencies

### Difference between dependencies and dev dependencies

This is an app with a **package.json**. That file has information inside it with stuff we need to use for our app.

First we need to get the app. We can do this by cloning the github repo.

1. Clone this repo

```
$ git clone https://github.com/kingluddite/gulp-basics-test.git
```

2. Navigate into the directory

```
$ cd gulp-basics-test
```

3. Remove git from this repo

```
$ rm -rf .git
```

4. Add git to your project

```
$ git init
```

5. Install the project's node dependencies

```
$ npm install
```

* This installs all the devDependencies

## Some Git tips

* Checkout the branch for the video you want to follow along with

```
$ git checkout <some-branch>
```

* You can also checkout particular files from another branch in git like so:

```
$ git checkout master -- package.json
```

## We need a server
Change Server Ports

We need a server to serve some pages. Node provides us a great solution and we even can choose the port we want to use.

**How do I change http-server to port 3000 instead of 8080?**

More conventional to serve node apps on port 3000

```
$ http-server -p 3000
```

## --global vs -g

This:

```
$ npm install --global http-server
```

Is the same as this:

```
$ npm install -g http-server
```

**How do I run the server?**

```
$ http-server
```

## package.json
In order to add gulp to our project we have to use `package.json` which lists the packages node dependencies

Sample **package.json**

```json
{
  "name": "sample-gulp-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

**Useful Tip**: If you use `git init` before `npm init` it will point to your git repo when creating your `package.json` file.

We cloned a repo and inside that repo there is an existing package.json with some devDependencies. Eventually, our package.json file will look like this but we will add the devDependencies one by one and talk about them as we add them. Before we delete `package.json` take note of this part of that file. We will be adding these modules one by one.

```js
"devDependencies": {
    "del": "^1.2.0",
    "gulp": "^3.8.11",
    "gulp-concat": "^2.5.2",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.0.1",
    "gulp-sourcemaps": "^1.5.2",
    "gulp-uglify": "^1.2.0"
  }
```

## Delete **package.json**

`$ rm -rf package.json`

## How do I kill the server?
`ctrl` + `c`

## Create package.json

```
$ npm init
```

**tip:** fast way to create **package.json** 

`$ npm init -y`

You can fill in all the answers to the questions if deploying to production

Or if you are testing for fun just accept all defaults and type `yes` to generate the `package.json` file

## Add Gulp

```
$ npm install gulp
```

## Install vs dependency install
That just installs gulp but we want to do more.

We want to also add gulp to our development dependencies so type this:

```
$ npm install gulp --save-dev
```

* You will now have info to show what **dev dependencies** and **versions** should be installed
* You never need to install gulp on **production servers** so that is why we list it as a development only dependency

**Gulp was added**

`package.json` (_code fragment_)

```js
"devDependencies": {
    "gulp": "^3.9.0"
  }
```

* The version number may be different (depending on how old my notes are :) )

## Multiple npm installs 

```bash
$ npm install gulp-autoprefixer gulp-changed gulp-imagemin gulp-less --save-dev
```

**Note:** Gulp needs to be installed globally and locally in our `package.json`

## The gulpfile

### Open final-gulpfile.js
This is what our finished gulpfile.js will look like. Take a quick glance to see if you can figure out what this file is trying to accomplish.

Now we are going to built this step-by-step.

If you type this

```
$ gulp
```

And get this error:

![no gulpfile error](https://i.imgur.com/qd4x94L.png)

Then you need to browse to root of your project and create `gulpfile.js`.

`$ touch gulpfile.js`

## `use strict`
Causes the node engine to run the file in a strict interpretation of the JavaScript

(_see my `use strict` notes in web-dev-notes_)

## Coding gulpfile.js

```js
'use strict';

var gulp = require('gulp');

gulp.task("hello", function() {
  console.log("Hello!");
});
```

* `task(name, callback)`

Then to run that task:

```
$ gulp hello
```

**Output**:
![output](https://i.imgur.com/luacgqv.png)

## Default task

```js
gulp.task("default", ["hello"], function() {
  console.log("This is the default task");
});
```

So we just have to type `gulp` and gulp will run all the tasks and we don't have to name them all to run them all. Cool!

This will run all the dependencies (second parameter of task()) before running the default task and all we have to do is type `gulp` in the Terminal. Cool!

# Gulp

## Gulp plugins

### Gulp concat
combines multiple files into 1 file

```
$ npm install gulp-concat --save-dev
```

It will be added as a dev dependency to `package.json`

```
"devDependencies": {
    "gulp": "^3.9.0",
    "gulp-concat": "^2.6.0"
  }
```

Turn 3 into 1 files

```html
<script src="js/jquery.js"></script>
<script src="js/sticky/jquery.sticky.js"></script>
<script src="js/main.js"></script>
```

Convert into `app.js` (one single file) Cool!

```js
'use strict'

var gulp   = require('gulp'),
    concat = require('gulp-concat');

gulp.task("concatScripts", function() {
  gulp.src([
    'js/jquery.js',
    'js/sticky/jquery.sticky.js',
    'js/main.js'])
  .pipe(concat("app.js"))
  .pipe(gulp.dest("js"));
});

gulp.task("default", ["hello"], function() {
  console.log("This is the default task");
});
```

* Add the **gulp-concat** require
* Can't use `-` because JavaScript will think it is math operator
    - That is why we name the variable `gulp` and not `gulp-concat`
* We first grab the source files using `gulp.src()` method
    - This method creates `readable stream of data`
        + In memory piece of data that can be used by the application
        + Streams are a node thing
            * There are huge benefits to running streams in memory verses writing to disk
* We use `.pipe` to get `readable stream of data` to our next method
    - `.pipe(concat("app.js"))`
        + We pipe the stream of data to the `concat()` method and give the name of the file we are going to create
        + Then we pipe that file to its destination `.pipe(gulp.dest("js"));`
            * gulp.dest() method actually persists `readable stream of data` (aka `writing it to disk`)
        * We want the concatenated file to end up in the `js` folder so that is why we add it as the destination
* Order may be important (in or example it is)

### Run the new gulp concat task
```
$ gulp concatScripts
```

* Gulp plugins are installed with **npm**

# Minifying JavaScript Files
* Compresses file and eliminates space
* Quicker downloads
* Faster sight
* Can even rename variables for performance

[How Minification Works](http://alistapart.com/article/better-javascript-minification)

## gulp-uglify
Gulp package that compresses files

### Install
```
$ npm install gulp-uglify --save-dev
```

**Tip:**
Good to doublecheck package was installed so you know team members can install the right dependencies

Add require for gulp-uglify and here is the task

```js
gulp.task("minifyScripts", function() {
  gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(gulp.dest('js'))
});
```

## gulp-rename
You don't want to overwrite your concatenated file so this enables you to create a new file name for your minimized file.

Add the require variable for **gulp-rename**

```js
gulp.task("minifyScripts", function() {
  gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'))
});
```

**Tip**
You can't debug minified code so you need both files.

1. Minified for production
2. Concatenated and uncompressed for debugging



