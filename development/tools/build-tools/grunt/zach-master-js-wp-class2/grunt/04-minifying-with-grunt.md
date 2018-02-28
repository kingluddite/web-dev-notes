# Minifying with Grunt
* Shrinking down javascript
* Renaming, anything to get them as small as possible
* Will help with performance of our app

## [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* Library that exists outside of grunt
* This is a special version that has hooks we need

## Install as dev dependency
`$ npm i -D grunt-contrib-uglify`

`gruntfile.js`

```js
// MORE CODE
grunt.loadNpmTasks('grunt-contrib-concat');
// add this line to add uglify
grunt.loadNpmTasks('grunt-contrib-uglify');
// MORE CODE
```

We want to first concat and then uglify. This works better than uglifying every file and then concatenating them all.

## uglify

`gruntfile.js`

```
// MORE CODE
uglify: {
      // what files do you want me to minify?
      dist: {
        files: {
          'MINIFIED-FILE-NAME': 'BUILD-FILE-NAME'
        }
      }
// MORE CODE
```

Knowing this, convert our code to the following:

```
uglify: {
      // what files do you want me to minify?
      dist: {
        files: {
          'dist/js/bundle.min.js': 'dist/js/bundle.js'
        }
      }
    }
```

Above works fine but we are repeating ourselves with `dist/js/bundle.js` in two places

```
uglify: {
      // what files do you want me to minify?
      dist: {
        files: {
          'dist/js/bundle.min.js': '<%= concat.dist.dest %>'
        }
      }
    }
```

You could also store it inside our `defaults` object and call it. Either way works.

Here's how you would do that

```js
module.exports = function( grunt ) {
  const defaults = {
    js: [
      'src/js/data.js',
      'src/js/helpers.js',
      'src/js/model.js',
      'src/js/router.js',
      'src/js/view.js',
      'src/js/editor.js',
      'src/js/app.js'
    ],
    destinations: 'dist/js/bundle.js'
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [defaults.js],
        dest: defaults.destinations
        //dest: 'dist/js/bundle.js'
      },
    },

    uglify: {
      // what files do you want me to minify?
      dist: {
        files: {
          //'dist/js/bundle.min.js': '<%= concat.dist.dest %>'
          'dist/js/bundle.min.js': defaults.destinations
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

}
```

* `bundle.js` from concat
* `bundle.min.js` from uglify

You may have two build systems

1. One build system not compressed, for development and working locally
2. Another build system for development with everything compressed and ready to ship

Remember to point your html to the new minified JavaScript file

`<script src="dist/js/bundle.min.js"></script>`





