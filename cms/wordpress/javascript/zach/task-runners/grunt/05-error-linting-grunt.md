# Error Linting with Grunt
* Can add linting to Atom or Sublime but some advantages to linting with your build tool
    - May help catch errors we don't notice

## [grunt-contrib-jshint](https://www.npmjs.com/package/grunt-contrib-jshint)
At the point we specify this will check ( _using jshint_ ) if we have any errors

* If there are errors, grunt will kick them back to us and stop the build process in its tracks
* This prevents us from shipping code with errors

## install grunt-contrib-jshint
`$ npm i -D grunt-contrib-jshint`

## Add task to load
```js
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
// ADD THIS LINE
grunt.loadNpmTasks('grunt-contrib-jshint');
```

## Add jshint task
We could use this:

```js
jshint: {
      files: [defaults.js]
}
```

* The above code is perfectly acceptable
* But let's use another method that will also include our `gruntfile.js` so we can check errors on that file as well. If we the above code it will not find errors in `gruntfile.js`.
* Can we add `gruntfile.js` to our array of JavaScript file?
    - No because it will pull in that file with all our other files and we don't want that because our `gruntfile.js` is for development only and our JavaScript is for production.

## A better solution to include `gruntfile.js`

```js
jshint: {
      files: ['gruntfile.js', [defaults.js]]
}
```

* What is the path to `gruntfile.js`?
    - It is where the gruntfile is located. We need no `../` or `/` because we are working inside `gruntfile.js` and using code to point to itself
* `[defaults.js`]
    - We point to our source
    - Alternatively we could use

```js
jshint: {
      files: ['gruntfile.js', '<%= concat.dist.src %>']
}
```

## Adding options
```
jshint: {
  files: ['gruntfile.js', [defaults.js]],
  options: {
    globals: {
      console: true,
      module: true
 }
}
```

* Strip out the `console.log()` we use
* If we use imports and exports ES6

## Register the task
```js
grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
```

* We place `jshint` at the beginning because we want it to run first. If we have errors we don't need to concat and minify

## Remove files to test
Delete `bundle.js` and `bundle.min.js` before we test to make sure those files are created with our build tool

## Run grunt
`$ grunt`

* We use `const` so in order to check for es6 errors add this code:

```js
jshint: {
      files: ['gruntfile.js', [defaults.js]],
      options: {
        globals: {
          console: true,
          module: true
        },
        // ADD THIS LINE (don't forget to add the comma after the preceding closing curly brace `}`)
        esversion: 6
      }
    }
```

Add a semi-colon at the end of `gruntfile.js` and run `$ grunt`. No errors are found.

## Tip
Double up on linter. Have one in your build tool and one in your editor.




