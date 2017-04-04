# Creating Middleware
## Finding Tokens in URLS

### Where will we add our Middleware?
`server/main.js`

#### WebApp
* We need some way or some method to add a Middleware to our application
* **WebApp** object - This is the actual server component of Meteor. It is a part of Meteor that handles incoming requests and figures out what to do with them
* We can use this **WebApp** object to add more Middleware to our application (**note** Middlewares are just functions that are called when a request comes in)

##### First import the WebApp
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp'; // Add this line

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});
```

Now let's use WebApp with:

```
import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

WebApp.connectHandlers.use(req => console.log(req));
```

* `req` is short for **request**
* `.use()` will add a Middleware

Now whenever a `request` comes into our application it will execute this function

`req => console.log(req)`

* The first argument is going to be the incoming request. This `req` object just has a bunch of data about the incoming data

Stuff like:

* cookies
* Here's when it was issued
* URL they were trying to reach
* stuff relevent to their request

### Refresh your browser
Look at the terminal and you'll see it hangs but it is filled with all kinds of information about the request

The dump of info we see it the `console.log(req)`

We found the right spot to add Middleware now we need to figure out what to do with it when a user visits our app with a URL we care about

We need to take that URL and test to see if it corresponds to a token link in our `Links` collection

### connectRoute
This is a 3rd party that will help us inspect the URL

* This library is used to parse URLs and do different things based on the form of the URL

**note** connectRoute works just like Express' built in router

#### Install connectRoute as a package
`$ npm install --save connect-route`

#### Import ConnectRoute
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route'; // add this line
```

**note** The purpose of ConnectRoute is to look at the URL and based on the form of the URL (based on what characters are in it) we can instruct this object to run different functions

#### Writing our Middleware
`server/main.js`

```
const middleware = ConnectRoute(function(router) {
  router.get('/:token', (req) => console.log(req));
});

WebApp.connectHandlers.use(middleware);
```

##### Talking about what the above chunk of code does
* We replaced our previous console.log by passing WebApp `middleware`
* ConnectRoute creates a Middleware that will take a an incoming HTTP request (req) and if the incoming request matches the form `/:token` (**note** it says `token` but it means match "anything") it will then (if there is a match) execute the following function `(req) => console.log(req)`

##### Finding Matches
```js
// localhost:3000/ NO MATCH
// localhost:3000/books/gone_with_the_wind NO MATCH
// localhost:3000/abcd WE HAVE A MATCH!!!
```

So `router.get()` is looking for slash `/` and any characters after it. No other slash is in there. Just a single string of characters

If there is a match, it will then run this function `console.log(req)`

**note** All of this stuff is really not Meteor stuff. It is really entering into the realm of `node.js`

### Visit `localhost:3000`
All works well but if you visit `localhost:3000/abcd` the browser will hang and you'll see the console.log(`req`) in the terminal

This tests and varifies that the router logic matched and we got the `console.log()` of our request object (`req`)

**note**
At the bottom of the terminal (the end of our console.log(req)) you will see `params: { token: 'abcd' }` and this was the value we entered in the browser after `localhost:3000`

The reason it is called `token` is because we specifically called it `token` in this line of our code:

`router.get('/:token', (req) => console.log(req));`








