# Set up Project

## Required Installs
* npm
* node.js
* mongoDB

**You need to have latest versions of all of the above installed**

FYI: pug aka jade

[Starting Express site](https://fonts.googleapis.com/icon?family=Material+Icons', rel='stylesheet)

## The routes we have already
* GET route to `/` (aka the root)
    - renders home page
* GET route to `/about`
    - renders about page
* GET route to `/contact`
    - renders contact page

## Three links have broken routes
* SIGN UP
* MY PROFILE
* LOGIN

## app.js
* This is our main application file

## Modules needed
* We need some modules to get this app working
    - express
        + Makes the app work
        + body-parser
            * Reads the body of requests sent to the server by a browser

## Static Routes
* Our `express.static()` line tells express to serve static assets from the `/public` folder

## Views

**app.js** fragment

```js
app.set('view engine', 'pug');
# where to store our pug files
app.set('views', __dirname + '/views');
```

* `__dirname()` is used in node and refers to the file path from the server's root to our application's root folder

## Pug
Here we are telling express that we want to use the pug templating engine
* **Pug** is renamed version of **Jade** (_most popular templating engine for express_)
    - Had to change the name to pug because someone was already using the name `Jade` for another software project
    - **Pug** streamlines writing **HTML** and provides conditional logic that make **HTML** templates fast to create and versatile to use

## Routes
Routes set up here

**app.js**

```js
var routes = require('./routes/index');
app.use('/', routes);
```

### Boilerplate code
* File not found errors
* Server errors
* Spin up server on port 3000

## Routes defined in `routes/index.js`
3 get routes defined

## How to shut down app
`ctrl` + `c`
