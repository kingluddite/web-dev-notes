# gulpfile.js

## Starter skeleton

`gulpfile.js`

```js
var gulp = require('gulp');

gulp.task('demo', function() {
  console.log('Demo working');
});

gulp.task('default', ['demo']);
```

## require()
A feature of Node

The `gulpfile.js` file is running in the Node environment. Node can read and write files. (Something that JavaScript in the browser CAN NOT do)

With `require()` Gulp is smart enough to look at the parameter (name of file to require), then subsequently looks into `package.json`, find the named package and then pulls it in through the `node_modules` folder.

If the file does not exist inside `node_modules` yet, it will error out saying it can't find package and you must use `$ npm install` to grab the package and put it into `node_modules`.

`var gulp = require('gulp');`

Now the Gulp object is assigned to the `gulp` variable. This gives us access to the `gulp.src`, `gulp.dest`, `gulp.task`, gulp.watch` methods

## gulp.task()

`gulpfile.js`

```js
// MORE CODE
gulp.task('demo', function() {
  console.log('Demo working');
});
// MORE CODE
```

* takes two parameters
    - 1) unique name of task
    - 2) anonymous function

**note** Looks like we are writing JavaScript using functions instead of using JSON format like grunt. JavaScript developers prefer this

**note** The console.log() in this example will not be output in the browser but since we are in the node environment it will be output in the terminal

## `default`
`gulpfile.js`

`gulp.task('default', ['demo'])`

* Calling `gulp.task()` again but `default` is reserved to Gulp
    - Typing `$ gulp` with no additional parameters, it will run the `default` task
* Second parameter is what we want to run when running `default` task

# Run gulp
`$ gulp`

![example of gulp default output](https://i.imgur.com/5RMx2yT.png)
