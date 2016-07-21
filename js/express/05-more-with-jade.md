# Making Lists in Jade Templates

`localhost:3000/blog`

Shows `this page is under construction`

In `app.js` replace:

`res.send('under construction')` 

With

`res.render('blog', XXX);`

Currently our data in in an object
But usually in JavaScript when a method iterates through a data type, that data type should be an array.
>>>>>>> clean up Express notes

## Use Debugger to show how to convert an Object into an array
We have `posts.json` which is an object and we need to turn it into an array.

Restart server with default break flag

`$ nodemon --debug-brk src/app.js`

Launch `node-inspector` in another iTerm window

`$ node-inspector`

Grab the **URL** and paste into Chrome browser

Set a break point in `app.js` file (on line `var app = express();`)
>>>>>>> clean up Express notes

Hit play
Until `var app = express();` is highlighted in blue
Manipulate chrome so you see sources up top and console down on the bottom

Type `posts` in Console
Expand Object

![posts Object expanded](https://i.imgur.com/rIVbyup.png)
that is loaded from `post.json` file
to turn this object into an array we need to do a few different things

1. use `Object.keys()` method to generate an array of keys from our posts object

![Object.keys(posts)](https://i.imgur.com/wSaKklE.png)

Clear it and bring it back so it just says `Object.keys(posts)` since it is an **array** we can use the **array** `map()` method, which allows us to iterate through each item in the **array** and to create a new **array** (we want the new array to be the values of each post object), the `map()` method receives a `callback` and the **parameter** of that `callback function` is going to be the `key` of the current position of the **array**

![Object.keys(posts).map()](https://i.imgur.com/Bz8qC4U.png)

So now we can say for each value, return the object that corresponds to that value in the posts

![return posts[value]](https://i.imgur.com/iCmsuxV.png)

And now we'll end up with an **array** of each **object**

Remember
`Object.keys` returns a value of each **key** in the **array**
we use the `map()` method to iterate through each value in the **array**
we pass a callback function to the map method that says "for each value that we are iterating through, return that value from our original posts objects"
and since we are returning each value, the map function turns that, into an **array**

And this is the final array that we will pass into our Jade template

```js
var postsLists = Object.keys(posts).map(function(value) {
                                     return posts[value]});
```

* We store it inside a variable so we will have access to it

```js
app.get( '/blog/:title?', function( req, res ) {
  var title = req.params.title;
  if ( title === undefined ) {
    res.status( 503 );
    // pulling in our array of objects
    res.render( 'blog', { posts: postsLists } );
  } else {
    var post = posts[ title ] || {};
    res.render( 'post', { post: post } );
  }
} );
```

## Create the blog template

`$ touch src/templates/blog.pug`

`blog.pug`

```
extends ./layout.pug

block content
  each post in posts
    // do something
    h1 #{post.title}
```

* **note** `post` could be named anything but `post` is most logical in this case
* `posts` is what we are rendering in our blog route and it holds our array of objects

![you should see this output](https://i.imgur.com/bbyAu61.png)

After running server and viewing in browser

## Add a paragraph with the description

```
extends ./layout.pug

block content
  each post in posts
    // do something
    h1 #{post.title}
    p #{post.description}
```

### Notes about Jade lists
Stuff inside each blog gets repeated for entire list
Whatever variable you use is what use use for the dynamic variable inside the Jade template (_in our case we used 'post'_)

When using jade variables inside attribute use this syntac

```
a(href='/blog/' + post.title).btn
```

But when just text in HTML use this syntax

```
h2.section-heading #{post.title}
```

Jade let’s you iterate over objects: http://jade-lang.com/reference/iteration/ However, in our case, iterating over our “mock” post data as an object would be even less realistic. 

In a JavaScript application, when data is meant to be iterated through, it will typically be provided in an array format.

Improved blog template

```
extends ./layout

block content

    for post in posts
        section.post
          .container
            .row
              .col-lg-8.col-lg-offset-2.text-center
                h2.section-heading #{post.title}
                hr.light
                p.text-faded #{post.description}
```

## Using Logic in Jade Templates

How can we create a new different navbar just for the blog page?

Doing this `res.locals.path = path;`

**note** the `locals` object is what gets rendered in the template
is exactly the same as doing this (you can use either way)

`res.render('index', {path: path});`

We don't have to use path = false because when it is not defined that is the same as path being false

## [The Express Generator](http://expressjs.com/en/starter/generator.html)
faster way to get your app started

`$ npm install express-generator -g`

Once installed we can install express with

`$ express TESTAPP`

* Use any project name you want
* Follow instructions given to cd into project and npm install
* npm start to start the server
    - many developers use this to start the server

`package.json`

```json 
"scripts": {
    "start": "node ./bin/www"
  },
```

A script that let's us run the server

View `localhost:3000` and you'll see the default starting express page

They have a **routes** folder
* index.js
* users.js

Two different files for two different modules

They tie the get method to a router object instead of the app object

They define router at the top of the index.js page

* This is a fancy way to modularize your app

`users` and `index` are tied to the same `/` path, how come they don't conflict?

In `app.js` both the routes is pointing to `./routes/index`
and users is pointing to `./routes/users`

The routes are assigned to the app toward the bottom of app.js

The index routes are going to be mounted directly to the root namespace of the app
But the routes for the users are routed to the users namespace

This means the root route for the users route (in users.js) will render at the path users

So if you visit `localhost:3000/users` you'll see 'respond with a resource'

## Where to go with Express from here
Express as a REST API Server
Still handles requests but all it does is send back data


## Create API endpoint

`res.json()` method exactly same as `res.send()` method
big difference is `res.json()` can coerce null and undefined values into valid **json** (super handy if you plan on sending data to the server with express)

```js
app.get('/posts', function(req, res) {
  res.json(postsLists);
});
```

Start **server**, view in Chrome by visiting `localhost:3000/posts` and you will see the **json**

`http://localhost:3000/posts?raw=true`

```js
app.get('/posts', function(req, res) {
  if (req.query.raw) {
    res.json(posts);
  } else {
    res.json(postsLists);
  }
});
```

Just by changing the **URL** the data and how it is sent can change

### Common uses
* Angular on the front end
* Consuming the Express **REST API**
* Mongo running as a database
* All of the above is known as the **MEAN Stack**

There is a full generator for MEAN stack apps

* Documentation on the **res.json** method: http://expressjs.com/4x/api.html#res.json
* The MEAN Stack Generator: http://mean.io/#!/
* A popular node client for PostgreSQL: https://github.com/brianc/node-postgres
* A popular node client for MySQL: https://github.com/felixge/node-mysql/
