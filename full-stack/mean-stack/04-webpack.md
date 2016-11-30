# Setting up webpack
Our Angular app is small now. If it grows, it could become problematic quickly.

* We will want to improve it.
* Add new features to it.
* When we add JavaScript files to our app we need to include them in our **index.html** file (and in the right order!)

This can become a huge pain

* Modular loaders help developers by bunding up JavaScript files into a single file

## webpack is a modular loader
* Allows you to install your vender resources using npm and reference them the same way you would in node by using the require method

### Install webpack
* webpack is only a development dependency
* Not a dependency for our app when it is running in production

```
$ npm install webpack --save-dev
```

Or exact with

```
$ npm install webpack --save-dev --save-exact
```

If you are using Zsh and get `command not found: webpack`

Install it globally.

```
$ npm i -g webpack
```

If that doesn't work, [check this out](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) (it changes the path where you install packages and you need to add this path to to your ZSH)

If you will work with webpack, install webpack-dev-server too

```
$ npm i -g webpack-dev-server
```

When installing **npm** packages, you can provide the optional `--save-exact` (or -E) command line flag in order to save the dependency with an exact version instead of npm's default semver range operator.

The `--save-exact` flag needs to be used in conjunction with the **--save** or **--save-dev** flags, otherwise the dependency will not get saved to your `package.json` file.

#### package.json fragment
```js
"devDependencies": {
    "webpack": "^1.13.1"
  }
```

With webpack our browser won't be loading our JavaScript directly
* So we need to move our JavaScript files from our public `scripts` folder
* To a new folder called app

Move **public/scripts** into **app/scripts**

### Caution
When you move all these you need to also move app.js outside `scripts` but inside `app`

![file structure](https://i.imgur.com/ot0v3QF.png)

### Debug webpack

`$ webpack --display-error-details`

## Research git mv vs mv by itself

In index.html

### Change the script links from:

```html
  <script src="/vendor/angular.js"></script>
  <script src="/scripts/app.js"></script>
  <script src="/scripts/controllers/main.js"></script>
  <script src="/scripts/controllers/todo.js"></script>
  <script src="/scripts/services/data.js"></script>
  <script src="/scripts/directives/todo.js"></script>
</body>
</html>
```

### To this:

```html
  <script src="/scripts/vendor.bundle.js"></script>
  <script src="/scripts/todo.bundle.js"></script>
</body>
</html>
```

* `vendor.bundle.js` will contain all of our 3rd party libraries
    - Angular and the larger the project, the larger the 3rd party dependencies
* `todo.bundle.js` will have all of our application's code

webpack will create these two files so we won't need to manage these script tags again

We need to give webpack instructions in order for it to work properly

Create **webpack.config.js**

```js
var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: ['angular']  
    },
    output: {
        path: __dirname + '/public/scripts',
        filename: 'todo.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};
```

### Test out the config with webpack with:

```
$ webpack
```

[bundling Angular with webpack](http://blog.teamtreehouse.com/26017-2)

**app.js**

```js
'use strict';

var angular = require( 'angular' );

angular.module( 'todoListApp', [] );

require( './scripts/controllers/main.js' );
```

Run webpack again

**main.js**

```js
'use strict';

var angular = require( 'angular' );

angular.module( 'todoListApp' )
  .controller( 'mainCtrl', function( $scope, dataService ) {

    dataService.getTodos( function( response ) {
      var todos = response.data.todos;
      $scope.todos = todos;
    } );

    $scope.addTodo = function() {
      $scope.todos.unshift( {
        name: "This is a new todo.",
        completed: false
      } );
    };

  } );
```

## Run webpack again

Make **app.js** look like this:

```js
/*jslint node: true */
"use strict";

var angular = require( 'angular' );

angular.module( 'todoListApp', [] );

require( './scripts/controllers/main.js' );
require( './scripts/controllers/todo.js' );
require( './scripts/services/data.js' );
require( './scripts/directives/todo.js' );
```

At the top of all of your Angular files ( `/controllers/main.js` , `/controllers/todo.js` , `/directives/todo.js`, `/services/data.js` ) below the 'use strict' statement : You need to add the following.

```js
var angular = require('angular');
```

## Run `webpack` again
It should work as it did before but now you have taking care of including a bazillion `<script>` tags at the bottom of **index.html**
