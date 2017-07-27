# Setting up the Course Project
* Install NodeJS
* Install Seed Project
* Install Dependencies
    - Server side dependencies (like Express JS)
    - Client side dependencies (like Angular 2)

## NodeJS
* Need latest version v8.1.4 (as of 7/25/2017)

## Project
* (local) - `/Documents/dev/experiments/mean-stuff/udemy/008-practical-mean-e/seed-project`
* There is a zip file
* Extract and that will be the starter project
* `$ cd seed-project`
* `$ yarn install` (you can use npm or yarn)

### Run our project
#### First run our client side code
* `$ npm run build`
* This runs Angular and will watch for any changes we make to our Typescript code

#### Run our Server side code
* Open a new Terminal tab
* `$ npm start`
* This runs our server side code

#### Open browser
`http://localhost:3000`

* You will see our project is working when you see `Hello World!`
* This is Angular 2 working

## Understanding our project
### Angular Stuff
* `/assets/app`
    - Holds Angular 2 app
* `/assets/app/app.component.ts`
    - Basically set up which HTML code should get rendered when we load this component
        + We are using `app.component.html`

`app.component.html`

```
<h1>We update our current site content!</h1>
```

* Refresh browser and it will change our web page

## Server Side Stuff
* bin
    - Holds our NodeJS server
* public
* routes
* views

### NodeJS is not like PHP
* With PHP we write some code and then have a server like Apache running our code
* With NodeJS we create the server itself and all of that is done in the `/bin/www` file
    - We set up the port we want to listen to
    - And to start the server
* `/public`
    - `/public/js`
        + Holds the JavaScript folder with our bundled Angular 2 Application because in the assests folder we create it but we then server it from the server (we need to load it there initially)
        + And it lives in the bundle.js file and it is put there automatically by our build tools
        + Don't change anything in this `js` folder since it is all auto generated
    - `/public/stylesheets`
        + Holds basic stylesheet info
* `/routes`
    - We just have one route on the server

`app.js`

```js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
```

* We render `index` which refers to the `index.hbs`

`views/index.hbs`

```html
<!DOCTYPE html>
<html>
<head>
    <base href="/">
    <title>Angular Messenger</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel='stylesheet' href='/stylesheets/style.css'/>

</head>
<body>
<my-app>Loading...</my-app>

<script src="/js/app/bundle.js"></script>
</body>
</html>
```

* This is an extension using **handlebars** as a templating languag
* We could use this to build HTML templates on the server
    - We won't use that in this course but this is where it is done
* This is the one and only file that gets sent from the server to the client
    - We would expect this file to hold our angular 2 app
        + We see we have bootstrap linked
        + We have our stylesheet linked
        + And we have `<my-app>Loading</my-app>`
            * Not a default HTML element
            * It is the component we build with Angular 2
* We also import `bundle.js`
    - Includes our own code
    - The angular 2 framework
    - The dependencies
    - The Polyfills Angular 2 needs

`app.js`

* Main file starting our ExpressJS app on the server
* Each request reaching our server is funneled  through `app.js`
    - Some methods are applied to the request
    - Some data is extracted
    - Some `headers` are set
* And then (IMPORTANT) it is dispatched to the right route

![routes](https://i.imgur.com/trYv8ZZ.png)

## Seed files for build process
* package.json
    - most important file
        + manages prod and dev dependencies
* tsconfig.aot.json
* tsconfig.json
* webpack.config.common.js
* webpack.config.dev.js
* webpack.config.prod.js

## Our scripts
`package.json`

```js
// more code
 "scripts": {
    "start": "node ./bin/www",
    "build": "del-cli public/js/app && webpack --config webpack.config.dev.js --progress --profile --watch",
    "build:prod": "del-cli public/js/app && ngc -p tsconfig.aot.json && ngc -p tsconfig.aot.json && webpack --config webpack.config.prod.js --progress --profile --bail && del-cli 'public/js/app/**/*.js' 'public/js/app/**/*.js.map' '!public/js/app/bundle.js' '!public/js/app/*.chunk.js' 'assets/app/**/*.ngfactory.ts' 'assets/app/**/*.shim.ts' 'assets/app/**/*.ngsummary.json' 'assets/app/**/*.ngstyle.ts'"
  },
// more code
```

* `$ npm start` - Will start our node server living in `bin` folder
* `$ npm build` - Start our front end asset compilation and create bundle
