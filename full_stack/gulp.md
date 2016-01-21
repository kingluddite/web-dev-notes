# Gulp
JavaScript task runner
Task set in JavaScript file. They are compiled and run.
Tasks can run one after the other
some tasks can depend on other tasks
Example
1. Task - Concatenate JavaScript
2. Task - Minify JavaScript

Or Tasks can be run all at the same time in parallel

Pipelines - task setups

## gulpfile.js
The file that gulp looks for defined tasks in

What do I need to run gulp?
* Node
* NPM (node package manager)

Is node installed?
```
$ which node
```

Is NPM installed?
```
which npm
```

Install gulp and http-server globally

```
# Install gulp globally
npm install -g gulp
# Install http-server globally
npm install -g http-server
```

## Clone a repo
```
# Clone this repo
git clone https://github.com/hdngr/treehouse-gulp-basics.git
# Navigate into the directory
cd treehouse-gulp-basics
# Install the project's node dependencies
npm install
# Checkout the branch for the video you want to follow along with
git checkout <some-video>
```

You can also checkout particular files from another branch in git like so:

```
git checkout master -- package.json
```

How do I change http-server to port 3000 instead of 8080?
More conventional to serve node apps on port 3000
```
$ http-server -p 3000
```

This
```
$ npm install --global http-server
```

Is the same as this:
```
$ npm install -g http-server
```

Run the http server with:
```
$ http-server
```

## package.json
In order to add gulp to our project we have to use `package.json` which lists the packages node dependencies
* also contains
    - version of our project
    - url of our project's git url

## Kill Server
`ctrl` + `c`

## Create package.json
```
$ npm init
```

You can fill in the answer to the question if deploying
Or if you are testing for fun just accept all defaults and type `yes` to generate the `package.json` file

## Add Gulp
```
$ npm install gulp
```

That just installs gulp but we want to do more.
We want to also add gulp to our development dependencies so type this:

```
$ npm install gulp --save-dev
```

* you will now have info to show what dev dependencies and versions should be installed
* you never need to install gulp on production servers so that is why we list it as a development only dependency

Gulp was added
partial of `package.json`

```
"devDependencies": {
    "gulp": "^3.9.0"
  }
```

**Note:** Gulp needs to be installed globally and locally in our `package.json`

## The gulpfile
if you type this
```
$ gulp
```

and get this error
![no gulpfile error](https://i.imgur.com/qd4x94L.png)

**Productivity Tip**
Add the ability to open files from the Terminal inside ST3
How?
[TODO] Add instructions here
Browse to root of your project. I want to create a gulpfile.js.

When added you can do this to open a file inside ST3 with this command:

```
$ sop gulpfile.js
```

Then save (`cmd` + s) and the file is saved in the root of my project. Cool!

## `use strict`
Causes the node engine to run the file in a strict interpretation of the JavaScript

[use strict workshop](https://teamtreehouse.com/library/the-javascript-use-strict-statement)

## Coding gulpfile.js

```
'use strict'

var gulp = require('gulp');

gulp.task("hello", function() {
  console.log("Hello!");
});
```

* task(name, callback)

Then to run that task:
```
$ gulp hello
```

**Output**:
![output](https://i.imgur.com/luacgqv.png)

## Default task
So we just have to type `gulp` and gulp will run all the tasks and we don't have to name them all to run them all. Cool!

```
gulp.task("default", ["hello"], function() {
  console.log("This is the default task");
});
```

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
```
<script src="js/jquery.js"></script>
<script src="js/sticky/jquery.sticky.js"></script>
<script src="js/main.js"></script>
```

Convert into `app.js` (one single file) Cool!

```
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

* Add the gulp-concat require
* Can't use `-` because JavaScript will think it is math operator
    - that is why we name the variable `gulp` and not `gulp-concat`
* We first grab the source files using `gulp.src()` method
    - This method creates `readable stream of data`
        + in memory piece of data that can be used by the application
        + streams are a node thing
            * there are huge benefits to running streams in memory verses writing to disk
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

* Gulp plugins are installed with npm

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

```
gulp.task("minifyScripts", function() {
  gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(gulp.dest('js'))
});
```

## gulp-rename
You don't want to overwrite your concatenated file so this enables you to create a new file name for your minimized file.

Add the require variable for gulp-rename

```
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



