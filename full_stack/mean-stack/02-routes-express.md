# Setting Up an Express API

GET routes most common
* Make get request to server for that website
* The server reads the route your browser requested
* And sends the page to be viewed in your browser

```js
app.get('/todos', function(req, res) {
  res.send('These are the todos!');
});
```

## Start server

```
$ nodemon
```

## Open chrome browser
Enter this URL in the chrome address bar

`http://localhost:3000/todos`

**output:** 

`These are the todos!`

**note:** - We have a bunch of routes already set up

### How come we have routes already set up?
* We are serving the entire `public` folder using this:

```js
// tell express to server static files from public folder
app.use( '/', express.static( 'public' ) );
```

* So all files in the `public` folder have a route
* Need to make sure we don't create routes that conflict with our **API** with the potential routes in our **public** folder

## Solution
To avoid conflicts with our **API** routes and routes inside the `public` folder

* Prefix all our API routes with `/api/some-name`

### Before

**/todos**

### After

**api/todos**

### Our new code

```js
app.get( '/api/todos', function( req, res ) {
  res.send( 'These are the todos!' );
} );
```

## Browse to 
`http://localhost:3000/api/todos`

* So now we are browsing to our API namespace

* The second parameter of the `app.get()` method is a callback function
    - The callback function is used to return information to the browser based on the request its made
        + The information returned is called a `response`
* The `res.send()` method takes a String
    - And this returns a String with a content type header to the browser of text **HTML**
    - We will build an API that will return JSON
        + And it needs to return a content type of `application/json`
            * Express will handle this for us if we return a **JSON** Object

```js
app.get( '/api/todos', function( req, res ) {
  res.send( { todos: [] } );
} );
```

## Browse to: 
`http://localhost:3000/api/todos`

Here's what you will see in the browser

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
What if I have 100 routes, do I have to preface them all with `/api/`?

We can avoid this problem by using a **router**.
* Router works a lot like an app

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

## Test
It works the same but we are now using a **Router** to save us time

## Comment for future tasks
Always a good idea to plan things out with comments.

_"A goal without a plan is just a wish"_

```js
// TODO: Add POST route to create new entries

// TODO: Add PUT route to update existing entries

// TODO: Add DELETE route to delete entries

app.use( '/api', router );
```
