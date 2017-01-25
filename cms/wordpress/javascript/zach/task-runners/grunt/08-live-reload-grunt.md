# Live Reload with Grunt

## [grunt-contrib-connect](https://www.npmjs.com/package/grunt-contrib-connect)

## Connect
* Connect is a node server
* Will be able to run JavaScript natively
* Will also be able to tie in behind the scenes with other tools like `watch`
* We don't need to be inside of Desktop Server moving forward unless we want to
* Connect exists outside of the grunt world

## Why -D?
Development only code. Not code or libraries that will be bundled in with our actual project

## Install Connect
`$ npm i -D grunt-contrib-connect`

## Why so many ports?
port 8080 is default port for websites that we don't need to state
But when running servers locally you will use many ports because you can't run an app on the same port. We use mulitple ports to avoid duplicating ports which would cause an error

`gruntfile.js`

```js
connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          keepalive: true
        }
      }
    }
```

* `keepalive`: if we don't use it it would spin up the server and instantaneously shut it down
    - keep it on until we tell you to turn it off

## load task
* Add to bottom of others

`gruntfile.js`
```js
// MORE CODE
grunt.loadNpmTasks('grunt-contrib-connect');
// MORE CODE
```

## register task
We WILL NOT do this:

`grunt.registerTask('default', ['connect']);`

Why?

Try it and see for yourself.

`$ grunt`

And then browse to `http://localhost:9000`

And then make a change to your JavaScript

`src/js/app.js`

```js
init: function( ) {
        model.init( );
        router.init( );
        view.init( );
        editor.init( );
        // ADD THIS LINE
        console.log( 'Hello!');
}
```

If you open the Chrome inspector, you will not see your update to `app.js` after you make it. Why? Because the `watch` command never ran.

## How can we fix this?
We will need to run multiple terminals within our project

## How can we stop a server?
`ctrl` + `c`

## Run grunt connect and grunt watch
Open two terminals.

`$ grunt` in one and `$ grunt watch` in the other

## Running individual tasks specifically
**note** You can run any of the grunt tasks directly

* `$ grunt sass`
* `$ grunt concat`
* `$ grunt uglify`
* `$ grunt jshint`
* `$ grunt watch`
* `$ grunt connect`

## Using npm to run tasks
`package.json` can run its own custom scripts

Update this code inside `package.json`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

with this code:

```json
"scripts": {
    "start": "grunt connect"
  },
```

## Now run that npm command inside `package.json`

`$ npm start`

* That will run `grunt connect` in the background
* And it has your server `http://localhost` up and running

## Why would you do this when you could just run `$ grunt connect`?
It applies a layer of abstraction from what ever tool your using and your `npm` main package so if you swap out and run a different server you could just change that inside your `package.json` "scripts" and then run `$ npm start` and it will do the same thing. Or if down the road you change to gulp or webpack, you can then change `package.json` "scripts" to `$ gulp start` or `$ webpack start` and always your main `npm` command will still be `$ npm start`

## Change back to `watch` task
Change back to `watch` from `connect`

`grunt.registerTask('default', ['watch']);`

## run connect through package.json npm
`$ npm start`

## New Terminal
Open a new terminal and run watch
`$ grunt`

## Changes appear on refresh
Make another change to `app.js` and refresh the browser and you will see your updated console log statement in the chrome inspector

# Problem
We still have to manually refresh this page. We want to make changes and anytime we do, automatically refresh the page.

## Solution: livereload
Update `gruntfile.js`

```js
connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          livereload: true,
          keepalive: true
        }
      }
    }
```

* `livereload: true` - be open to any pings coming in that tell us we need to reload

## Add options to `watch` command
* Set up options to tell it to ping the server when it needs to reload

`gruntfile.js`

```js
watch: {
      files: [ defaults.html, defaults.sass.all, defaults.js ],
      tasks: ['jshint', 'concat', 'uglify', 'sass'],
      options: {
        livereload: {
          host: 'localhost',
          post: 9000,
          reload: true
        }
      }
    },
```

* Call livereload, on localhost, `post` to port 9000 and auto refresh when it is pinged

Terminal inside Atom
`ctrl` + `~` (toggles open close terminal window)
`cmd` + `shift` + `k` and `cmd` + `shift` + `j` will bounce you back and forth between the open terminal windows (if there are more than one)
`cmd` + `shift` + `t` (opens new terminal tab)

## Should refesh automatically
My code did not refresh automatically. Had to do use manual refreshes to see updates to `app.js`. After making the following changes my page was auto refreshing.

### Problem
If we make a change to html, js and sass are updated too which is not necessary. We can improve our code. If we have a large app, the delay of update could take quite long and make developing for that site time consuming and frustrating.

We can improve our `watch` to separate into `html`, `sass` and `js`

`gruntfile.js`

From this:

```js
watch: {
      files: [ defaults.html, defaults.sass.all, defaults.js ],
      tasks: ['jshint', 'concat', 'uglify', 'sass'],
      options: {
        livereload: {
          host: 'localhost',
          post: 9000,
          reload: true
        }
      }
    },
```

Into this:

```js
watch: {
      html: {
        files: defaults.html
      },
      sass: {
        files: defaults.sass.all,
        tasks: ['sass']
      },
      js: {
        files: defaults.js,
        tasks: ['jshint', 'concat', 'uglify', 'sass']
      },
      options: {
        livereload: {
          host: 'localhost',
          post: 9000,
          reload: true
        }
      }
    },
```

### Review of new watch changes:
* html - Check for default html
* sass - Check for changes to Sass
* js - Check for changes to js

If we change the background variable, the page refreshes with the new color automatically. Since it only checks the sass, it runs faster.

Try also by changing `app.js` and it also updates fast.

Try it also with HTML and it refreshes automatically as well.

## Additional Grunt plugins
[more grunt plugins](http://gruntjs.com/plugins)

* clean
* minify css

## Grunt Review
* Solid Grunt workflow
* Practice applying to another project
* Explore other Grunt plugins
* Grunt does go deeper
  - Don't get frustrated with complexity and problems. With time and practice you will get more comfortable with the complexity
