# How Authentication works in MEAN app
## How Authentication works in a normal Application
![client server relationship](https://i.imgur.com/tKcLqph.png)

### Session
* In a normal auth app the authentication is managed by a `session`
    - We keep a `session` on the **server**
    - And a `cookie` on the **client**
    - And we use these both to know if the **client** is logged in and then we delete or invalidate the `session` when the **client** logs out

## But in an Angular2 app auth is handled differently
* We shouldn't use a `session`
* Authentication status shouldn't be stored in `session` client since **client** only reaches to **server** to <u>fetch or put data</u>

## Takeaway
* Sessions are not the solution when creating SPA (Single Page Apps) because we only render one page and we don't continuously re-render pages

## A different approach with SPAs
![new spa way of auth](https://i.imgur.com/FXx8Ze6.png)

* We will log our user in on the server, and upon logging in we check on the server if the login data is valid but then instead of saving this in our session, we instead send back a token to the client
* This `token` contains the encrypted user info and some other data
* This `token` can be stored on the client, in the browser
* And if we want to fetch data, say we want to create a message and only authenticated users can do this

![attach token](https://i.imgur.com/CSM3lD6.png)

* We attach the token to our **request** and then on the server we can validate this `token` and if it is and matches the data we have on the server (the server is the one that created the token), we can extract encrypted data (user data), if all is good, we either send back data to the client or we create a resource on the server or Database

## Next
* How to create a user
* How to create a token
* To to login a user
* How to log out a user
* How to store the token
* How to attach the token to future requests


