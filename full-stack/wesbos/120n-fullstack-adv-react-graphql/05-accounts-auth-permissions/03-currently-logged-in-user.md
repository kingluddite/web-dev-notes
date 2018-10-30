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
