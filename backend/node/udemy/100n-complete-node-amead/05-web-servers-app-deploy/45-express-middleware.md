# Express Middleware
* Express Middleware is a fantastic tool
* It enables you to add things to Express
* If Express doesn't have something you want, you can add something to Express and teach it how to use it

## We already added Middleware
`app.use(express.static(__dirname + '/public'));`

* We taught Express how to work with static files
* `app.use()` is how you register middleware
    - app.use() takes 
* We can use middleware to see if someon is logged in or not

## The importance of `next()`
* Tell Express when our middleware is done
* If you don't call `next()` future middleware will never fire/run
    - Here is an example that proves it will stop the server from firing anything else
    - It just "hangs"

`server.js`

```js
const hbs = require('hbs');
const express = require('express');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  // next();
});
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
// more code
```

* Stop and restart the server

`$ nodemon server.js -e js,hbs`

* View `localhost:3000` and watch the server hang forever

## Fix it
```
app.use((req, res, next) => {
  // next();
});
```

## Create first middleware
* Create logger
* Log out all request that comes into server
* store timestamp to record when someone made request for specific URL
* `new Date().toString()` - creates nice `readable` timestamp

`server.js`

```js
// more code
app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now}:`);
  
  next();
});
// more code
```

![server logger](https://i.imgur.com/nRN96HS.png)

### Let's explore the `request` object **req**
* stores everything about the request
* The http method, path, query parameters (anything that comes from the client, whether client is app/browser/iphone)

### http method and path
* We'll pull this off `req`
* [documenatation on request for express](https://expressjs.com/en/4x/api.html#req)

```js
// more code
app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`);
  
  next();
});
// more code
```

`Tue Nov 28 2017 14:32:50 GMT-0800 (PST): GET /about`

* You see the method and url `/about`
* Middleware is executed in the order you call app.use()

`server.js`

```js
const hbs = require('hbs');
const express = require('express');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintentance',
  });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send(`<h1>Yo Express!</h1>`);
  res.render('index.hbs', {
    pageTitle: 'Home',
    welcomeText: 'Welcome to this website. It is great to see you here',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.listen(3000, () => {
  console.log('Server is working on port 3000 yo!');
});
```

* We move static files line below maintenance mode and this means even stuff inside public will not be seen (when it came before the maintence line it was seen)
* Comment out main mode so the site will work as expected, comment it in when you want to switch to maint mode

`views/maintenance.hbs`

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maintenance</title>
</head>
<body>
  <h1>We'll be right back</h1>  
</body>
</html>
```




