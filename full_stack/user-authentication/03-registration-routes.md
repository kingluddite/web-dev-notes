# Registration Routes
* Users sign up on site
* Their information will be added to the database

## Define Routes
* To see the registration form
* To submit registration information

### Our Current Routes
* GET /
    - the Home page
* GET /about
    - the About Us page
* GET /contact
    - the Contact Us page

### Add /register route
* **GET** `/register`
    - The Sign Up form
* **POST** `/register`
    - To add sign up data to the database

**router/index.js**

```js
// GET /register
router.get( '/register', function( req, res, next ) {
  // just quick test if route is working
  // by sending some text back to client
  return res.send( 'Register today!' );
} );
```

* `router.get()` method accepts two arguments
    - Route
        + `/register`
            * Not concerned about **req**
                - User just asking for registration form
            * String endpoint
    - **callback** function
        + Tells express what to do when the user requests this endpoint
        + Accepts three arguments
            * **req** (request object)
                - Has all the information related to the request that was sent from the client
            * **res** (response object)
                - Lets us send data back to the user
                - We will use this parameter to send back our response
            * **next** (function)
                - Tells express to continue on to the `next` piece of middleware (in other words, what function should express run after this callback)

## Test
1. View in browser by running `$ node app.js`
2. Visit [http://localhost:3000](http://localhost:3000)
3. Click on **SIGN UP** button
4. You should see text in browser saying '**Register today!**'

## Add a post route to `/register`
Post route to `/register` is where we receive the information entered into the register form

* We'll use that data to create a new user in the DB
* Let's test it out with this:

**router/index.js**

```js
// POST /register
router.post( '/register', function( req, res, next ) {
  return res.send( 'user created' );
} );
```

## Test
We can't yet. 

We first need to create a registeration form. Then we'll be able to post information to this route.

## Other ways to start server

### Add start task to package.json
* Start task can start the express app for you
* Can run commands with additional arguments (if you need them)
    - Examples
        + Start up server on specific port
        + Can specify settings for server

#### Our current package.json file

```js
"scripts": {
    "start": "node ./app"
}
```

**What does `./` mean?**

Look in the current directory

With node you do not have to include the `.js` extension when referencing a JavaScript file

So both of these are the same

* `node ./app`
* `node ./app.js`

#### How to use start task in package.json
`$ npm start`

### Nodemon
* Helpful `node.js` application
* Reloads automatically each time you make a change
* **nodemon** is a wrapper for node
    - Runs node but includes a `watch command` that watches for changes to the application code, and then _restarts the server_ when changes are made
* Install **nodemon** globally (other apps can use it too)
    - `$ npm install -g nodemon`
        + If you just wanted to install it locally just for this project
            * `$ npm install --save-dev nodemon`
* Start nodemon with `$ nodemon`




