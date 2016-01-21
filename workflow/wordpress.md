# WordPress
[download](https://wordpress.org/download/)

## Local Environment
* Use MAMP
    - Pro not needed (use free version)
    - [download](https://www.mamp.info/en/downloads/)
    - Using MAMP preferences
        + Change URL from `http://localhost:8888` to `http://localhost`
        + Change root from `htdocs` to `Sites`
        + Add `Sites` to Mac Favorites (easy access)
        + Extract WordPress
            * Rename to your project
                - example: `bhs-wp`
        + Restart MySQL and Apache
        + Open MAMP `start page`
    - Create empty database (with a name like `bhs`) using phpMyAdmin
        + MAMP MAC default user is `root` (production different!)
        + MAMP MAC default password is `root` (production different!)
        + permissions on production and how you set it up on a host like godaddy is different

Change host information

WordPress Workflow
[part 1 video](https://www.youtube.com/watch?v=rOjuLJ8L0Zk)
[part 2 video](https://www.youtube.com/watch?v=J1-lsAoUnUY)
* basic starter theme [olympos github to clone](https://github.com/ivandoric/olympos.git)

Git clone into your wp themes folder
You could also download a zip file but that would create an extra 2 steps where you would have to extract and then delete the extracted file. (ABC - always be clean) Cloning is faster.
* Open WordPress site in ST3
* Save site as a project
    - Store all your projects in a separate projects file - just an easier way to do this. If you don't and store it inside your actual theme, you will have to add it to your gitignore file which is an extra step.
        + Add `st3-projects` folder to Mac Favorites sidebar for easy access 

* always name your theme the same so easy to switch between projects

## Deploy WordPress
[part 3 video](https://www.youtube.com/watch?v=BWf1Aly9Dkk)
* URLs different locally, staging, production
* problem absolute vs relative URLS
    - download db dump
    - find/replace all URLS and replace with new URL (either dev or production)
    - then you have to upload your database to the server
Staging server for clients with Git on it
* shared hosting rarely has git on it
* you have the db and the files in this solution you can use git to push the files and wordmove to move the db
* DB can not be versioned (problem)

### WordMove
Wordmove is a nice little gem that lets you automatically mirror local Wordpress installations and DB data back and forth from your local development machine to the remote staging server. SSH and FTP connections are both supported.

####Screencasts

Push all WordPress, including database and uploads: [video](http://vimeo.com/74648079)
Pull database and uploads, adapting paths and urls: [video](http://vimeo.com/74646861)
Push only theme, transfer only modified files: [video](http://vimeo.com/74647529)
Installation

That's easy:
```
$ gem install wordmove
```

Go to root of WP project

```
$ wordmove init
```

Looking for help
* will show you options for pushing
```
$ wordmove help push
```

## Dev Environment
### GoDaddy Example
* Create Database
* Create User for Database
* Create Permissions for User for Database
* Create SubDomains
* FileZilla (FTP - free), Transmit (FTP - not free)
* SSH
* Migrate Database
* Backup Database
* Installing WP

### AWS
    

```
# history -c && exit
```

# Gulp

## Install Gulp globally

```
$ sudo npm install -g gulp
```

[WordPress Gulp Tutorial](http://code.tutsplus.com/tutorials/using-gulp-for-wordpress-automation--cms-23081)

## Gulp And WordPress

Navigate to WP Theme folder

```
$ cd Sites/bhs-wp/wp-content/themes/
```

Create the `gulp-animation` folder and initiate a `npm project` inside it

```
$ mkdir wp-gulp-automation
cd wp-gulp-automation 
npm init
```

Accept the defaults (yes, yes, yes...)

Your `package.json` file has been created.

### Install Gulp locally to your file

```
npm install gulp --save-dev
```

* `node_modules` has been created
    - all project dependencies are inside that folder
    - `--save-dev` updates your developer dependencies (stuff you need for development not for production) - gulp is for development environment

### gulpfile.js

```
var gulp = require('gulp');
 
gulp.task('default', function(){
 
    console.log('default gulp task...')
 
});
```

### Install Gulp Sass

```
$ npm install gulp-sass --save-dev
```


`gulpfile.js`

```
var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
 
    gulp.src('./css/src/*.scss')
 
        .pipe(sass())
 
        .pipe(gulp.dest('./css'));
 
});
 
gulp.task('default', ['sass']);
```

You can now run with `gulp` or `gulp sass` command in Terminal.

## Lint and Concat JS files

```
$ npm install gulp-jshint --save-dev
$ npm install gulp-concat --save-dev
```

gulpfile.js

```
...
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin');
...
```

Finished File

gulpfile.js

```
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('sass', function () {
  gulp.src('./css/src/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src('js/src/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('js'));
    .pipe(livereload());
});

gulp.task('img', function() {
  gulp.src('img/src/*.{png,jpg,gif}')
    .pipe(plumber(plumberErrorHandler))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('img'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('css/src/*.scss', ['sass']);
  gulp.watch('js/src/*.js', ['js']);
  gulp.watch('img/src/*.{png,jpg,gif}', ['img']);
});

gulp.task('default', ['sass', 'js', 'img', 'watch']);

```


## Starter Themes
Famous Ones
