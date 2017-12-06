# Hello Express!
`node-web-server/`

* `$ npm init -y`

## ExpressJS
* [expressjs website](https://expressjs.com/)

* `$ yarn add express`

## server.js
```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Yo Express');
});

app.listen(3000);
```

`$ nodemon server.js`

* The server will `hang` because it is waiting for requests to come in
* The server won't stop until we tell it to stop with `ctrl` + `c`

## View site
`localhost:3000`

* You will see `Yo Express`

## Open Dev tools to see what type of request was made
* Network tab
* Headers tab
    - General
        + URL that was requested (http://localhost:3000/)
        + method client wanted (GET)
        + status code that came back (200)
    - Response Headers
        + Content-Type
            * Tells the client what type of data came back (HTML web site, text JSON data...)
            * Client could be iphone, ipad, desktop any computer with network capabiltities
            * in this case we see text/html so it is an html page and should be rendered as such

## Render simple HTML
```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Yo Express</h1>');
});

app.listen(3000);
```

* Will output `Yo Express` inside a H1 element

## How can we send JSON back?
* It is really easy with Express

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // res.send('<h1>Yo Express</h1>');
  res.send({
    name: 'John',
    likes: [
      'Soccer',
      'Web Dev',
      'Teaching'
    ]
  });
});

app.listen(3000);
```

* View in page, JSON view chrome extension makes it look pretty
* In Network > Headers > Content-Type... you will see `application/json`
* This tells the requestor this is JSON and should be parsed as such

## Routes are easy
* Above we used the `root route`
* Let's add another route... the `about` route

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // res.send('<h1>Yo Express</h1>');
  res.send({
    name: 'John',
    likes: [
      'Soccer',
      'Web Dev',
      'Teaching'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('the about page');
});

app.listen(3000);
```

* View `localhost:3000/about` and you will `the about page`

## Challenge
* Create a `/bad` route that returns a JSON object with an errorMessage property set to some custom error string of your choosing

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // res.send('<h1>Yo Express</h1>');
  res.send({
    name: 'John',
    likes: [
      'Soccer',
      'Web Dev',
      'Teaching'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('the about page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Sorry you should not see this page'
  });
});

app.listen(3000);
```

## Set up static web server
* We don't want to set up routes for css, javascript and images so that it something a static web server would be useful

