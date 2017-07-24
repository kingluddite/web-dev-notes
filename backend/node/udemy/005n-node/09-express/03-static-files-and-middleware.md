# Static Files and Middleware
* Requests that happen between the request and response
* We need a way to have common plugins between request and response

## Middleware
* Code that sits between two layers of software
* In the case of Express, **sitting between** the `request` and the `response`
* Express provide easy way to plugin middleware between the request and response

## I need to handle files being downloaded
* It is just a HTTP request
    - So I need to manually deal with every kind of request that comes in for things that make my app work
    - If I have a css file that styles my app, then the browser will request it, it will make an HTTP request to get that CSS file
        + I don't want to manually deal with that
            * Whatever files (css, JavaScript, images...) that are sitting on the server, if they're requested in the URL then they should just  be hooked to and streamed automatically to the response
            * I don't want to have to manually respond to every file that I might put of that kind, ie. static files

## Static
* In other words, not processed by code in any way
    - In other words
        + HTML
        + CSS
        + image files
        + These and other are **"static"** files but we still need to deliver them when they're requested via a HTTP request
        + **note** The request doesn't just somehow connect to the file, we are just getting the request and the server has to decide what to do with it

## Add static files to our Application
* We'll set this up so we can just push these files to our Application and they will just be properly downloaded

### Create `public` folder
* This is the standard name for the folder where you sit your static files
* Create a simple `styles.css`

`/public/styles/styles.css`

```css
body {
  background-color: #000000;
  color: #ffffff;
}
```

### How do I use this style?
* How can I make sure this file will be downloaded when it's requested by any HTTP request?
    - By using **middleware**

`app.js`

```js
// more code
const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
// more code
```

* Now when anyone requests in the URL `/assets` express will look in the `/public` folder for those static files

### Update HTML
* We add the link tag and point to our CSS file by using the `assets/` path
`app.js`

```js
// more code
app.get('/', function(req, res) {
  res.send('<html><head><link href="assets/styles/styles.css" type="text/css" rel="stylesheet" /></head><body><h1>Hello World</h1></body></html>')
});
// more code
```

### Steps
1. The browser will download this HTML

```html
<html><head><link href="assets/styles/styles.css" type="text/css" rel="stylesheet" /></head><body><h1>Hello World</h1></body></html>
```

2. It will see the `<link />` tag
3. The browser will generate a HTTP request for `mydomain/assets/style.css`
4. That HTTP request will be handled by node
5. And when it sees the `/assets` and it says **"OK, anything after `/assets` I will look for it inside the `/public` folder"**

* This is **middleware** (between the request and response)

6. Node will respond by streaming back this file for me

### Take it for a test drive
* Browse to `localhost:3000`
* You will see our home page has a black background and white text
* The styles.css was requested and we responded by downloading the proper file for the browser

![localhost 3000](https://i.imgur.com/kFCSvHc.png)

### View the Chrome Dev Network tab
![chrome network tab](https://i.imgur.com/Oll0VHW.png)

* localhost shows our request for the HTML
* The browser saw the link tag and generated the second request for the styles.css

#### Click on styles.css in Network tab
* Under `Header`

![headers](https://i.imgur.com/MpwsFq8.png)

* You will see the URL request is `http://localhost:3000/assets/styles/styles.css`
* Node caught the `/assets` and said **"OK, let's pass that to the middleware"**
* The middleware said **"OK, I'll look for that file inside the `/public` folder"** and it streamed it back

### We check the response
![the response](https://i.imgur.com/PI1NEdu.png)

* We got the file back in the browser
* I can put anything I want inside the public folder that is purely static content and any requests, node will handle for me because I have the middleware installed for it

## Can I make my own middleware?
Yes

* Because `app.use('/' function)`
    - `app.use()` just takes a route and uses a function

### Create a simple middleware that logs the URL when you visit the `/` route
* Express provides `next()` for middleware to the function you give as the callback when the route is matched
* It just means is run the next middleware
* The `app.get()` are also just **middleware**
    - I'm capturing a request and doing something before the response is sent
        + So between the request layer and response layer of node and express I have something in between them (something in the middle)
        + I can do whatever I want when that particular request comes in and after I do my stuff, I say "Keep on going" when I use **next()**

### Test it out
`$ nodemon app.js` (_should still be running if it is you don't need to type this in the terminal_)

* You will see this in the terminal

![Request URL: /](https://i.imgur.com/hP1aITU.png)

* After it runs my custom middleware `next()` will run the next middle which is (the code that loads the HTML and CSS):

```
// more code
app.get('/', function(req, res) {
  res.send('<html><head><link href="assets/styles/styles.css" type="text/css" rel="stylesheet" /></head><body><h1>Hello World</h1></body></html>')
});
// more code
```

### Try other routes
* `/api`
* `/person/joe`

Each route will run our custom middleware before running the routes middleware

![view of custom middleware on routes](https://i.imgur.com/UtfNDe5.png)

### Middleware and connecting middleware together is powerful
* It let's me build reusable ways of dealing with HTTP requests and responses
* I can use other people's middleware (like express's **static** middleware to save me time)
* And I can do whatever I want with the request and response and I can specify it according to the route

### What if I leave off the route?
* Instead of this `app.use('/', function)` I use `app.use(function)`
    - Then it will happen for every request no matter what the route
    - You could have a **logger**
    - You can install all other people's middleware at the **npm registry**

### Middleware Resources
* [writing middleware](https://expressjs.com/en/guide/writing-middleware.html) 
* [express middleware](https://expressjs.com/en/resources/middleware.html)

### Let's add cookies to Express
* Click on the [cookie-parser link](https://expressjs.com/en/resources/middleware/cookie-parser.html)
* Read the cookie-parser documentation

#### Install it
`$ npm i cookie-parser -S`

* Check out `package.json` and see how it was added as a dependency

#### Use it in my code
`app.js`

```js
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser());
// more code
```

* Since no route is provided this middleware will run on every request
* This middleware will take the HTTP request, which includes cookies as a string separated by semi-colons
* cookies are little pieces of information stored on your browser, that gets sent along for the ride with every HTTP request to a particular site (the cookie for that site)
* This middleware pulls that out of the HTTP request (that string), breaks it apart and then adds it on to the request as a `cookies` property to the request `req.cookies`, and then calls `next()`
    - So that when you go to `get()` the route `get('/', function)` you can just grab the `.cookies` property and get all the values in the cookie so you now have a convenient way to grab a cookie that was over on a user's browser

### Using cookie-parser

`app.js`

```js
// more code
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)

  res.send('<html><head><link href="assets/styles/styles.css" type="text/css" rel="stylesheet" /></head><body><h1>Hello World</h1></body></html>')
});
// more code
```

## Popular middleware
* body-parser (working with form data)
* compression
* passport (authentication)
    - A person must be logged in before you finish giving them the response
