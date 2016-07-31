# Setting Up an Express API

GET routes most common
* make get request to server for that website
* the server reads the route your browser requested
* and sends the page to be viewed in your browser

```js
app.get('/todos', function(req, res) {
  res.send('These are the todos!');
});
```

start server

```
$ nodemon
```

open chrome browser

enter this URL in the chrome address bar

`http://localhost:3000/todos`

output: `These are the todos!`

note: we have a bunch of routes already set up
how?
* we are serving the entire publics folder using this:

```js
// tell express to server static files from public folder
app.use( '/', express.static( 'public' ) );
```

* so all files in the public folder have a route
* need to make sure we don't create routes that conflict with our API with the potential routes in our public folder

## Solution
To avoid conflicts with our API routes and routes inside the `public` folder

* Prefix all our API routes with `/api/some-name`

before

/todos

after

api/todos

our new code

```js
app.get( '/api/todos', function( req, res ) {
  res.send( 'These are the todos!' );
} );
```

now browse to `http://localhost:3000/api/todos`
* so now we are browsing to our api namespace

* The second parameter of the app.get() method is a callback function
    - The callback function is used to return information to the browser based on the request its made
        + The information returned is called a `response`
* The res.send() method takes a string
    - and this returns a string with a content type header to the browser of text HTML
    - we will build an API that will return JSON
        + and it needs to return a content type of application/json
            * express will handle this for us if we return a json object

```js
app.get( '/api/todos', function( req, res ) {
  res.send( { todos: [] } );
} );
```

browse to: `http://localhost:3000/api/todos`

here's what you will see in the browser

```json
{
todos: [ ]
}
```

Express knows to return JSON!

We can make our code more readable with this change

```js
app.get( '/api/todos', function( req, res ) {
  res.json( { todos: [] } );
} );
```

Same Output

## Problem
What if I have 100 routes, do I have to preface them all with `/api/`
We can avoid this by using a router.
* router works a lot like an app

## Create a Router

[Express Router Documenation Link](http://expressjs.com/en/api.html#router)

```js
app.use('/', express.static('public'));

var router = express.Router();

router.get( '/todos', function( req, res ) {
  res.json( { todos: [] } );
} );

app.use('/api', router);
```

Test and it works the same but we are now using a Router to save us time

## Comment for future tasks

```js
// TODO: Add POST route to create new entries

// TODO: Add PUT route to update existing entries

// TODO: Add DELETE route to delete entries

app.use( '/api', router );
```


