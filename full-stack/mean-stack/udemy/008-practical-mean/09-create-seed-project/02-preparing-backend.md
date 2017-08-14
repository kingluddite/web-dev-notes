# Preparing the Backend

## Git
`$ git init`

## .gitignore
`$ touch .gitignore`

`.gitignore`

```
.idea
/node_modules
npm-debug.log
/public/js
```

* All our JavaScript files inside `public` will be compiled so we don't need to store them on Git/Github
* But if we deploy to Heroku, we need to remove `/public/js` or else the app won't deploy anything
* Delete `/images` folder inside `public` (I won't be using it)
* Rename `javascripts` to `js` (personal preference)
* Inside `routes/`
    - Delete `routes/users.js`
    - Rename `index.js` to `app.js`
* Inside `views` delete:
    - `error.hbs` (all our errors will be sent to frontend for Angular to deal with)
    - `layout.hbs` (we only have one server side template and that is index.hbs)
    - Remove all code from inside `index.hbs` and we'll work on that file later

`/app.js`

* Update our routes

```js
// more code
var appRoutes = require('./routes/app');

var app = express();
// more code
```

### Handling Errors
* I never want to render errors on server
* I want to render `index.hbs` to let Angular2 take over

`/app.js`

```js
// more code
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
```

* I also remove both routes and replace with one `appRoutes`
* This will handle all my incoming **requests**

## One other optional change
* Use this if your Angular2 server is on a different server than your backend
* If you don't do this, you would get CORS errors
    - Because you are trying to access your backend from a different origin because your frontend is on a different server
    - It is not allowed by default
    - To allow it:
    - `app.use()` is middleware to be run on **every request**

## CORS
* `res.setHeader('Access-Control-Allow-Origin', '*');` - Allows any other domain to access this server
    - You could change `*` to specific IP addresses or domains
    - **Note** This is only incoming requests through HTTP
    - Not SSH requests
* second CORS

```
res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
```

* Above sets up what headers I want to allow on incoming requests

* The third CORS parameter specifies which HTTP methods I want to allow
    - We are using them all
    - `OPTIONS` is automatically sent with PATCH or DELETE requests when sending AJAX requests

```
res.setHeader(
  'Access-Control-Allow-Methods',
  'POST, GET, PATCH, DELETE, OPTIONS'
);
```

## `next()` is important
* After my three CORS params, I need to call `next()` so that the request will continue
* I am not handling the request here and I'm not sending a response, I'm just setting some header
* So calling `next()` is key so that the request has to chance of finally reaching our routes

`/app.js`

```js
// more code

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS'
  );
  next(); // important so that we make it to our routes!
});

app.use('/', appRoutes); // Yes we made it to our routes because of the previous next()
```

* Our backend is ready

## Next - Let's jump to focusing on on Angular2 frontend
