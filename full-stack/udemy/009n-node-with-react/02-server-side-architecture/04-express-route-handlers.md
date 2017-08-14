# Express Route Handlers
## Analyze this code snippet

`index.js`

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(5000);
```

![route handler diagram](https://i.imgur.com/OZ0LhiR.png)

* `app` - Represents the underlying Express server
    - The Express server has some amount of route handlers associated with it
* `get` - By calling `get` we are creating a brand new route handler
    - `app.get()` and everything inside it we refer to as a **route handler**
    - Our specific route handler in this example is watching for incoming HTTP requests with a very specific method
    - HTTP request methods are used to indicate the type or what the request is attempting to accomplish
    - Express has access to several other HTTP methods

![Http methods diagram](https://i.imgur.com/6ZMIpgO.png)

* `get` - Get info
* `post` - Send info
* `put` - Update all the properties of something
* `delete` - Delete something
* `patch` - Update one or two properties of something

## `/`
* This tells the Express server to watch for requests trying to access a very particular route
    - Our example here is watching the root route `/`
    - This is known as the `route portion of the handler`
    - Anytime someone visits `localhost:5000/`, they will hit this route
    - Even if you just type `localhost:5000` and no forward slash, it still interprets it as the root route
        + It is an implied forward slash
* We could create another route pointing to `/about` and if someone visits `localhost:5000/about` then it would execute our route handler for that route

## Arguments to the arrow function
`(req, res) => {}`

* `req` - short for **request**
    - It is a JavaScript object that represents the incoming request
    - The object has a lot of data about who is making the request and a bunch of other data like the browser... 
* `res` - short for **response**
    - This is the `res` object
    - This represents the `response` or the data that is about to be sent back to whoever made the incoming request

## The body of the arrow function
* `res.send({ hi: 'there' })`
    - This tells Express that we want to immediately close the **request**
    - And send back the **response** containing the JSON data `hi: 'there'`

## The second arg was an arrow function
* The second argument is called by Express, anytime some request comes into this route we defined `/`
    - Over time this handler might be called hundreds of thousands of times a day, or even dozens of times in a single second
    - This function will be executed every single time a single request comes in attempting to make a `get` request to the route of `/`

## app.listen(5000)
* This tells Node that it wants it to listen to incoming traffic on port 5000
    - It looks like Express is listening to the port
    - But really, behind the scenes, Express is still telling Node to listen to port 5000
