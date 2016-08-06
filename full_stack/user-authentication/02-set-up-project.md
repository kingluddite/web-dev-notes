# Set up Project

## Required Installs
* npm
* node.js
* mongoDB

**have latest versions of all of them installed**
FYI: pug aka jade

[Starting Express site](https://fonts.googleapis.com/icon?family=Material+Icons', rel='stylesheet)

Routes already
* GET route to `/` (aka the root)
    - renders home page
* GET route to `/about`
    - renders about page
* GET route to `/contact`
    - renders contact page

Broken routes
* sign up
* my profile
* login

app.js
main application
we need some modules to get this app working
* express
    - makes the app work
* body-parser
    - reads the body of requests sent to the server by a browser
* our `express.static` line tells express to serve static assets from the `/public` folder
* `__dirname()` is used in node and refers to the file path from the server's root to our application's root folder

* here we are telling express that we want to use the pug templating engine
    - pug is renamed version of jade (most popular templating engine for express)
    - had to change the name to pug because someone was already using the name `jade` for another software project
    - pug streamlines writing HTML and provides conditional logic that make HTML templates fast to create and versatile to use

```js
app.set('view engine', 'pug');
# where to store our pug files
app.set('views', __dirname + '/views');
```

routes set up here
```js
var routes = require('./routes/index');
app.use('/', routes);
```

### boilerplate code
* file not found errors
* server errors
* spin up server on port 3000


routes defined in routes/index.js
3 get routes defined

shut down app
ctrl + c


