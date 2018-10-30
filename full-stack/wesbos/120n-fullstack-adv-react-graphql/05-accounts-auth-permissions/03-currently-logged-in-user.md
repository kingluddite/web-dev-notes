# Currently Logged in User with Middleware and Render Props
* How to display the currently logged in user

## Cookie Time
* We recently created a user and when we did that we added a cookie to our browser
    - It is a `token` with a `value`

![our cookie](https://i.imgur.com/RlgQff1.png)

* That value contains the actual `jwt`

```
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam52ODdiMzMyaXNwMDk5NXlsNGd0aXp6IiwiaWF0IjoxNTQwODczMzQxfQ.yf2h1tVdS2w0KFC6AHKRyhJ7T9H_EZsxWJRjxyc4wGw
```
    
## Test the jwt
* Copy the `jwt` in the browser
    - the token value
    - and paste it here:

`https://jwt.io/`

* Paste into the `encoded` part:
    - You can see that once you do that we can see that it is Decoded into
        + HEADER (Algorthym & token type)
        + PAYLOAD (Data)
        + VERIFY SIGNATURE

* The Payload will look like:

```
{
  "userId": "cjnv87b332isp0995yl4gtizz",
  "iat": 1540873341
}
```


![jwt.io](https://i.imgur.com/k3X9qri.png)

1. On every single request (`req`) this `token` will come along for the ride
2. We'll take that `token`, **decode** it with `jwt` on the **backend**
3. And then stick the `userId` onto every single request `req`

* This means that if we every need to know who the user is, we can quickly query the `db` since we know the `userId`

## Backend
### We need to decode the JWT so we can get the user `id` on every request
`backend/src/index.js`

```
// MORE CODE

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// Use express middleware to populate current user
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  console.log('Middleware is in da house!');
  next();
});

server.start(

// MORE CODE
```

* We create custom middleware
* Very simple as it will just log out every time we make a `req`
* Test it out in browser and Click on Home page and then Signup page and then Sell page
    - Each click and you'll see our `Middleware is in da house` console.log() with each request
    - **note** On the home page we have 4 requests so we get for logs in the backend terminal

## send() ==== this code doesn't work and is under repair
* We can also use this:

```
// MORE CODE

server.express.use((req, res, next) => {
  console.log('Middleware is in da house!');
  res.send('test');
  // next();
});

// MORE CODE
```

* ASK Wes Bos - TODO: Look at above - did not work
    - after commenting out `next()` we are supposed to be able to see
    - send() breaks it and that is the point of middleware is that it enables you to step in between requests or before a request and do a little of extra work
    - I was gets a CORS error

## next()
* We use `next()` to keep our server moving onto the "next" middleware
    - This is enables us to modify the request
    - And send the request going so our db and our yoga server will be able to pick it up with no problem

## How can we pull the `token` out of the `req`?
`index.js`

```
// MORE CODE

server.express.use((req, res, next) => {
  // grab our token from the cookie
  const { token } = req.cookies;
  console.log(token);
  next();
});

// MORE CODE
```

* After saving check the terminal
    - The **server** (terminal) should show you the logged `token`
    - Now the `token` comes along for the ride every time
        + This is the awesomeness of using `cookie-parser` because it enables us to access any cookies that come along with the `req` just by saying `req.cookies.token`

### Log out `req.cookies`
```
server.express.use((req, res, next) => {
  console.log(req.cookies);
  // grab our token from the cookie
  // const { token } = req.cookies;
  // console.log(token);
  next();
});
```

* WE log out cookies and if we go into the client Applications tab of Chrome console we can manually add a cookie and then we will now see it in the terminal
* **note** I had a hard time updating the cookie as the page kept refreshing before I could enter it in
* This is the benefit of using cookies is I did not have to manually send that along for the ride it just came with it
    - But with localStorage you have to explicitly send it over every single time
    - This isn't an issue if you just have a client side app
        + expecially with Apollo as you can just tell it to pull it from localhost and you don't have to manually do it every single time
    - But because this is a server side render (SSR), when we refresh this page or visit for the very first time, there is no way for me to send the localStorage along for the ride (and that is why we are using cookies for authentication)

## Now let's get back to decoding our token
* Make sure there is a token
    - There may not always be a token
    - We also add in the secret (it is optional) but it is good to also add in our SECRET to make sure know one has monkeyed with it and added in their own values to the `jwt` (because anyone can edit the cookies and say they are an administrator)

`index.js`

```
// MORE CODE

server.express.use((req, res, next) => {
  // grab our token from the cookie
  const { token } = req.cookies;
  // check if there is a token
  if (token) {
    const { userId } = jwt.veryify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId
  }
  next();
});

// MORE CODE    
```

* Regardless of if there is a token or not a token
* We will call `next()` and that will pass along the `req`
* It will not send a `res` directly from this middleware, it will pass it along the line and later when we get into one of our resolvers (be that a query or a mutation resolver) we'll be able to easily access this `userId` without having to decode the `jwt` every single time

## Problem
* We are using `jwt` so we need to require it

`index.js`

```
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '.env' });

// MORE CODE
```

## Now we need to add in the Query for our currentUser
stop at 7:47
