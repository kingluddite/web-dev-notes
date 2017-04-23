# Node HTTP and Connect
## Node HTTP
We will learn about the Node HTTP Server that is running behind the scenes. This is the only reason we can visit `localhost:3000` and this is responsible for running our Application and when we visit that URL we get some stuff back

## Connect
Very popular npm library that makes it easy to extend your server and adding on various functionality

We need to know both of these if we plan on setting up **redirecting** for our links (which is the entire goal of our Application)

* Each link will have an `id` associated with it
* When someone visits our app and uses that `id` we redirect them to our final destination
    - Someone enters `http://domain.com/123`
    - Our server will see that domain, search the collection for a match and if it finds one it will redirect the user to the long domain (in our collection)
    - The will never even see our client side app

* We need ways to set Headers
* Manipulate data that comes back
* Connect and HTTP Server will enable us to do that and a whole lot more

[node http module documenation](https://nodejs.org/api/http.html)

* [Class: http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)
    - Will enable us to respond to requests ([respond to our custom URL](https://i.imgur.com/6sQd554.png))
* [Class: http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
    - This will let us figure out what URL is trying to be loaded so we can determine if their is some sort of link id in the URL
    - This will let us know if we should redirect or show the Application
        + if it's
            * /123 - we want to redirect
            * /links` we don't want to redirect

## [Connect](https://github.com/senchalabs/connect)
Connect is used behind the scenes in the ultra popular Express library

* We will use Connect because it allows us to intercept a request and make changes to it
    - We will be able to say, "Hey, on these conditions we want to go ahead and make a change to the request or the response and that will allow us to redirect"
    - This is possible via **Middleware**
    - [Use Middleware](https://github.com/senchalabs/connect#use-middleware)

```
app.use(function middleware1(req, res, next) {
  // middleware 1
  next();
});
```

### Practice on Server
`server/main.js`

#### Goals
* How can we attach our own Middleware?
* How do we teach the Meteor server to do stuff?

`meteor/webapp` - gives us access to the server behind the scenes (_the one serving up our content and it will allow us to teach it to do something new_)

`import { WebApp } from 'meteor/webapp';`

* This will allow us to attach some Middleware

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use(() => {
    console.log('This is from my custom middleware Yo!');  
  });
});
```

* Refresh your browser and be aware it will not refresh and just **hang**
* View the Terminal server and you'll see `This is from my custom middleware Yo!`
* Open the tab and send another request (localhost:3000) and it will **hang** also but we will see the same Terminal server message
* When you register Middleware you are teaching your server how to do something new but you can also break your Application

### req, res and next
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
  });
});
```

## req (request)
* Stores things about the incoming request
    - What headers were used
    - What URL did they try to visit
    - And a ton of other stuff

## res (response)
*  This allows us to respond to the http request
    -  We could redirect them to a different page
    -  We want to set a header (503) saying the app is under maintenance

## next
* Very important!
* next is just a function
* When your Middleware is done you call `next` and it allows the Application to keep on moving

## How can we fix the bug of our page hanging?
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    next(); // add this line
  });
});
```

* Just call `next()`
* Now we have a Middleware function that prints something everytime a **request** comes through but it doesn't change the **request** at all
* By calling `next()` we allow the `server` to process the **request** normally as it would (this results in the web page showing up)
* After refreshing the page, our app works but we still get our server message in the Terminal
* If you don't call `next()` your app will never respond to the request

1. Request comes in
2. Run our Middleware one at a time
3. Meteor says "send them that page"

## Digging in to `req` and `res`
What exactly lives in the **request** and the **response** objects?

So far, all that we learned about node is not useful

We need to parse the URL and see if we need to do something with it. How can node help us do that?

### What is inside req (request)?
```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    next();
  });
});

```

* Refresh the app
* Will show a ton of stuff
* We'll pay attention to:
    - `req.url` - returns the url that was used when they loaded the page in the browser
        + We can use this to get the URL that was sent across the wire
    - `req.method` - gives access to the HTTP method that was used
    - `req.headers` - object that stores all the request headers
    - `req.query` - empty object - captures the query string sent across the wire (_http://localhost:3000/?name=joe&age=10_) and it will show up as `{ name: 'joe', age: '10' }`

## What is inside the res (response)?
We will need to learn how to set a HTTP status code for a given request

We need to do 4 things to set up the redirect
1. Set HTTP status code
2. Set HTTP headers
3. Set HTTP body
4. End HTTP request

* View your app in the browser
* Check the `Network` tab in Chrome tools
* Refresh and you'll see all the network requests that this specific page made
    - There is a ton
    - A lot is attributed to the DDP Web Sockets going back and forth
* Scroll to top and you'll see exact same URL that you have in the browser
    - Try it with this url: `http://localhost:3000/links?test=123abc`
    - Click that link and you can view some details about the request
        + Headers, response, cookies...
        + We will focus on what is under **General**

![General](https://i.imgur.com/WSMUqZe.png)

* Request Method: `GET`
* Response Status Code: 200

## Custom Status Code using Middleware
[Web Site for all HTTP status codes](https://httpstatuses.com/)

```
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP status code
    res.statusCode = 404;
    // Set HTTP headers
    // Set HTTP body
    // End HTTP request
    next();
  });
});
```

Refresh and you'll see 404 in Network but page loads

## res.setHeader(name of header you are trying to set, the value for that header)

```
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP status code
    res.statusCode = 404;
    // Set HTTP headers
    res.setHeader('my-cool-header', 'I am so cool');
    // Set HTTP body
    // End HTTP request
    next();
  });
});
```

![custom header](https://i.imgur.com/EZrrcco.png)

You never know the header was set unless you dive into the network tab. The Application works as it is supposed to

## res.write
We can completely override what is shown in browser window

```
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP status code
    res.statusCode = 404;
    // Set HTTP headers
    res.setHeader('my-cool-header', 'I am so cool');
    // Set HTTP body
    res.write('<h1>Middleware will save the day</h1>');
    // End HTTP request
    next();
  });
});
```

![middleware](https://i.imgur.com/iyEf8FR.png)

If you view the link and click the `Response` tab you will see the raw unparsed response

![raw response](https://i.imgur.com/NlDQYF8.png)

* `Preview` tab will show the preview of the response as HTML

## How can we terminate the request?

### res.end()
* Will hijack a lot of stuff similar to `res.write()` does
* It is not passive like setting a header or statusCode, this will cause our Middleware to completely take over the server
* To show what happens we'll comment out our `res.write()` line

```
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP status code
    res.statusCode = 404;
    // Set HTTP headers
    res.setHeader('my-cool-header', 'I am so cool');
    // Set HTTP body
    // res.write('<h1>Middleware will save the day</h1>');
    // End HTTP request
    res.end();
    next();
  });
});
```

* Refresh browser and you won't see anything on the screen
* We can see Header information
* But no Response tab or Preview tab
* `res.end()` immediately terminates to the HTTP request and it sends that response back, which means that things changed previously like statusCode and Header are going to show up but by the time our Middleware is done and Meteor tries to respond to the request adding on the HTML it can't do that because we already called `res.end()` which terminates the request

```
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware Yo!');
    console.log(req.url, req.method, req.headers, req.query);
    // Set HTTP status code
    // res.statusCode = 404;
    // // Set HTTP headers
    // res.setHeader('my-cool-header', 'I am so cool');
    // // Set HTTP body
    // // res.write('<h1>Middleware will save the day</h1>');
    // // End HTTP request
    // res.end();
    next();
  });
});
```

* We set our app back so that it will run (commend out HTTP stuff)
* Remove query string and just view `localhost:3000/links`
* We will only use `Connect` to call **use** which will enable us to intercept the **request** and make changes to it

## Next
Making our redirect work
