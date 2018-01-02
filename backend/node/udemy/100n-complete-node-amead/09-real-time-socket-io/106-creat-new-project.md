# Create new Socketio project
`$ take node-chat-app`

## Create our package.json
`$ yarn init -y`

## Git
`$ git init`

### Different setup
* We will have a frontend
    - html and js that runs in browser

### Structure
* server - holds node stuff
    - purpose
        + will be root of node app
        + will create a new express app
        + will configure the public directory to be the static folder that express serves up
        + will call app.listen() to start up server
* public - holds html, styles and client side JavaScrip
    - index.html
        + This will be the markup page we serve when someone visits the app

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node Chat App</title>
</head>
<body>
  <p>The Chat App</p>  
</body>
</html>
```

`server.js`

* We want to setup so the server to serve up the `public` directory
* In our previous app `todo app`, the server.js was in the root of the project
    - server.js is not in the root of our server in this app
    - So we have to `../` to get into `node-chat-app` and then down to `public`
    - This will make setting up the express middleware a bit harder
    - We will use a built-in node module that makes it easy to convert paths

## An Explanation
* 2 log files
* 1st log will show old way
* 2nd way will show a better way

```
console.log(__dirname); // will provide absolute path to server directory
console.log(__dirname + '/../public'); // goes into server, then out of server, then into public (not a great solution)
```

### Path
* This is a module that comes built-in with node called `path`
* [path documentation](https://nodejs.org/api/path.html)
    - We'll use [join](https://nodejs.org/api/path.html#path_path_join_paths)
    - `join` takes your partial paths and **joins** them together

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

* In the above example the last part says `../` and so it goes from inside `quux` to back inside `asdf` and **path** is smart enough to not include the `../` and just put the end result path
* We will just the same thing to clean up our path

```js
const path = require('path');

const publicPath = path.join(__dirname, '../public');

console.log(__dirname + '/../public');
console.log(publicPath);
```

* Output

```
/Users/henryford/Documents/node-chat-app/server/../public
/Users/henryford/Documents/node-chat-app/server/public
```

* The second log shows the path we want to provide to express to serve our public assets

## Install Express
`$ yarn add`

### Challenge
* Create brand new express application
* Configure the express static middleware to serve up the public folder
* Call app.listen() on port 3000
    - Add a callback function to print a message to the terminal server is up on port 3000
* Visit localhost:3000 to see if you see the message in paragraph of `index.html` in browser and server started log message inside terminal

`server.js`

```js
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`App started on port ${port}. VROOOOOOM!`);
});
```

* Start server `$ nodemon server/server.js`
* See `The Chat App` in browser and `App started on port 3000. VROOOOOOM!` in terminal
* **note** We don't configure express() by passing it arguments, instead we configure express by calling methods on `app`
    - To create routes, add middleware or start up the server
    - `const app = express()`
* We use process.env.PORT so we can work locally on port 3000 and then when we push to Heroku it will choose whatever port it needs to (as we have no way to tell Heroku what port we want to use)

## Add start script and node engine
```json
// MORE CODE
"scripts": {
    "start": "node server/server.js"
},
"engines": {
    "node": "9.3.0"
}
// MORE CODE
```

* You need the correct version of node on your computer for engines
* If you don't put the correct version, it will fail when you deploy to Heroku
* Find the correct version with `$ node -v`
* Enter the correct version as your engine

## Next - Add socket.io on `client` and `backend`

### Challenge
* Create `.gitignore` with `node_modules` inside
* Create a heroku app and deploy to it

### Solution
* `$heroku login`
* `$heroku keys:add` (adds ssh to heroku if you have a pub key created)
* `$heroku keys` (lists keys on heroku)
* `$ssh -v git@heroku.com` ---> tests ssh key on heroku
* `$env` ---> lists environment keys on your machine
* `$git add .`
* `$gc -m 'initialize repo'`
* `$heroku create`
* `$git push heroku master`
* `$heroku open`

#### Create on github
* `$ hub create`
* `$ git push origin master`

You should shee `The Chat App` on the heroku live URL
