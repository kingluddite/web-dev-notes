# Watching Files with Grunt
Run grunt forever in the background until you tell it to stop watching

Anytime it notices a change it will rerun the commands we set up for it

## [grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)

### Install grunt-contrib-watch

`$ npm i -D grunt-contrib-watch`

## load task

`gruntfile.js`

```js
// MORE CODE
grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // ADD THIS LINE
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass']);

};
```

Put `watch` task at bottom of other tasks as it happens after all the other tasks

## Preparing to watch

`gulpfile.js`

```
module.exports = function( grunt ) {

const defaults = {
    html: 'index.html',
    sass: {
      all: 'src/sass/**/*.scss',
      main: 'src/sass/style.scss',
    },
// MORE CODE
}
```

* We create a property to hold our `index.html` (**defaults.html**)

Update this:

`gruntfile.js`

```js
// MORE CODE
sass: {
      dist: {
        files: {
          'dist/css/style.css': defaults.sass.main
        }
      }
    },
// MORE CODE
```

## Add our watch task with our new object properties
`gruntfile.js`

```js
// MORE CODE
watch {
    files: [ defaults.html, defaults.sass.all, defaults.js ]
  }
// MORE CODE
```

If you make changes to gruntfile.js. You need to stop the watch and restart it.

