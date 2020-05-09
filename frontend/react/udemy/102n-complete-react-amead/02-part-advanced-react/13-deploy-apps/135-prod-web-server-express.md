# A Production Web Server with Express
* We are going to focus on creating a development production server

## Currently how do we serve up our app?
* A dev-server and live-server
  - Both are not suitable for production
  - They are useful:
    + They come with great features
      * Live reload
      * Automatically run webpack
      * But we don't need that stuff in production and that stuff would take up valuable resources to get that working

## Express server
* We will create a very simple Express server
  - It will be small (14 lines of Node.js)
  - It will be responsible for serving up our public directory in Production
  - Once that server is in place we'll be able to take all of our code and get it up on Heroku

### Create a new directory called `server` in our root app
* Inside it create a file called `server.js`
* We are just using basic Express

### Install express
`$ npm i express`

* [Express docs](https://expressjs.com/)
* Once we install we will require into our node file and get the server up and running
  - **IMPORTANT** What we are doing here will NOT RUN THROUGH WEBPACK
  - **IMPORTANT** What we are doing here will NOT RUN IN THE BROWSER
  - **IMPORTANT** What we are doing WILL RUN IN THE COMMAND LINE using the `node` Terminal command

## 1.   Now we want to load in Express

`server/server.js`

```
const express = require('express');

```

## 2. Create a new instance of Express
* We have a Express library imported but not an Express app yet
* So let's create a new Express app

```
const express = require('express');
const app = express();
```

* We create a variable `app` and assign it to whatever we get back from calling `express()` as a function
* We do not need to pass any arguments to express()

## 3. Congrats! We now have an Express application
* We now have to tell Express where our files live
* We also need to tell Express what port it should listen on

## 4. Tell Express where our files live?
* We will tell Express to serve up the public folder and everything inside
* `app.use()` - this is one way we can customize our Express servers and we'll be using this to register some **middleware**

### What is middleware?
* Something that runs for each request
  - So if someone makes a request to the server we might want to run some code that logs something to the screen (example)
  - If something makes a request, we might want to run some code that serves up that asset from the public directory (we are going to do this now!)
    + Good news is all that code is built in and to utilize it we just need to take advantage of a function that comes from Express which is `express.static()`

`server.js`

```
const express = require('express');
const app = express();

app.use(express.static());
```

* We will call `express.static()` inside of `app.use()`
  - And we'll take the return value of `express.static()` which is just a function and pass it into `app.use()`

### express.static()
* **note** `static()` takes an argument - it takes the path to that public folder
  - We'll create a variable to hold this path
  - We'll use the path module again for this
    + In webpack.config.js we used this before:

`webpack.config.js`

```
// MORE CODE

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },

// MORE CODE
```

* Above path lets us join up the current directory with the public directory
* We will now do something very similar in `server.js`
* We'll need to require `path`
  - **note** `path` is built in to Node.JS so we don't need to manually install it with `$ npm i path`
  - We'll use path.join() again and then pass in the pieces to the path and `join()` pieces them together
  - We need to go from the current directory `server` then go up a directory `'..'` then we go into the `public` directory

`server.js`

```
const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(path.join(publicPath)));
```

## We now have a Express app that will serve up all assets from that directory

## We now need to start up the server and listen on a specific port
* We'll use port 3000 (this is a port available on all Operating Systems - we should be able to attach to for development purposes without getting any warnings from your OS)
* The listen() method takes the Port as the first argument and a callback function as the second function
  - We'll pass a message that our server is running in a log as the second argument

`server.js`

```
const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(path.join(publicPath)));

app.listen(3000, () => {
  console.log('Server is running. You better go get it! LOL');
});
```

## Now we have a working Express Server

## Let's run our server
* We'll use the `node` command
* This will allow us to run a Node script file and we have one `server.js` that we just created

`$ node server/server.js`

* And you will see the very unexciting message in the Terminal "Server is running. You better go catch it! LOL"
* This means our server is running

## View in browser
* Before we do this delete your `dist` folders
* Let's try to view this server by visiting `http://localhost:3000`

## We get errors!
* Files are not found
* We now need to generate these files with `$ npm run build:prod`
* Now that we have all our production assets in place, we can then run our Express server again with `$ node server/server.js`
* Refresh `http://localhost:3000` and you'll see our app

## We have a problem but it may be hard to see
* Click on a link and we'll see another page in our app
* But refresh the browser on that page and you'll see `Cannot GET /create`

### Why are we getting this error?
* Because there is not file called `create` file or folder inside our `public` folder

### We need to fix this
* We need to serve up `index.html` for all files that don't have a match
* Doing this will ensure that our browser router will still work

### We did this before
* We did this inside our `webpack.config.js`

```
// MORE CODE

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },

// MORE CODE
```

* We set `historyApiFallback` to true and this served up `index.html` in the public folder every single time we got a 404
* Now we need to do the exact same thing in server.js in order to make sure all non matches in the URL of the browser still work in our app

## app.get()
* We'll use this to set up a function to run when someone makes a get request to our server
  - We will call it with 2 arguments
    + 1. path - We'll use `*` to match all unmatched routes (so if it is in the public folder great, if not, we'll serve up index.html every single time)
    + 2. a function to run - Here will process all the unhandled requests
      * This function will get 2 arguments (req (request) and res (response))
        - request - contains information about the request to the server
        - response - contains information about the response from the server
          + The response object lets you manipulate the response your Express server makes to whoever made the HTTP request
          + In our case we want to use a single method `res.sendFile()`

### res.sendFile()
* This will allow us to send that file back and we'll be done with this task
  - We need to provide the path to that file
    + Here we use the same path as before but point to `index.html`

`server.js`

```
const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(path.join(publicPath)));

// server index.html to all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running. You better go catch it! LOL');
});
```

* All the methods discussed can be found in the docs
  - [express.static()](https://expressjs.com/en/4x/api.html#express.static)
  - [res.sendFile()](https://expressjs.com/en/4x/api.html#res.sendFile)
  - [app.get()](https://expressjs.com/en/4x/api.html#app.get.method)
  - [app.listen()](https://expressjs.com/en/4x/api.html#app.listen)
  - [app.use()](https://expressjs.com/en/4x/api.html#app.use)

## Restart server
* Test if visiting the `/create` page works now
* It should! If it does Congrats!

## Recap
* Learn the basics of Express
* We set up a 15 line server
  - With this server
    + We create an app
    + We tell it to use a public directory to use all our static assets
    + We instruct the server that if what the person requests isn't in the public folder than just give them back the index.html file
    + We told the server to start on port 3000
    + Now we have our production server

## Next - Get the app up on Heroku
* We have to teach it 2 things
  - 1. Run our node server
  - 2. Run our webpack
* When we do this we'll have an easy to use build process
