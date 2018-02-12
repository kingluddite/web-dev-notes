# Create Web Server
* We will create a folder that anyone can see
* Make sure you don't put important stuff inside this folder

`/public/help.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Help Page</title>
</head>
<body>
 <h1>Help Page</h1>
 <p>Some text here</p>
</body>
</html>
```

* We want to serve help.html in our app without having to manually configure it
* We'll do that using Express `middleware`

## Middleware
* Let's you configure how your Express App works
* Think of it like a 3rd party add on

### How to add Middleware
* Call `app.use()`
* This is available off of the use() method on the Express object

## express.static()
* Takes the absolute path of the file you want to serve up
* We need to provide the path from our harddrive
    - This can be tricky because our apps move around

### __dirname()
* Variable that gets passed into our file by the wrapper function and __dirname stores the path to your project's directory
* So it will store the path to `node-web-server` so we just need to add to it `/public`

`server.js`

```js
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
// more code
```

* View in browser
* Browse to `http://localhost:3000/help.html` and you'll see our static help.html page and we didn't have to create a route for it

## Simple
* Because it is so easy to set up a static directory express apps have been the go to place to go for apps that don't need a back end

### Simple static setup for simple web site with static assets
`server.js`

```js
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000);
```

## app.list()
* Takes a second argument
* Can take time for the server to get started
* We can let the user know when the server is up and ready to go and what port it is running on
* It will output this log message on the server side (not the client side)




