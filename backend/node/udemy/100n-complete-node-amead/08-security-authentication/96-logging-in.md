# Loggin In POST /users/login
* We'll set up a route for logging in existing users
* As it stands right now, the only way we get a `x-auth` token back is on the signup call
* if you lose the token or you sign in from a different device, you'll need a way to get a new one
    - Currently, that is not possible
    - you can't make another call to the POST /users route because the email already exists, so that call will return a 400 status

## We need a dedicated route for logging in users
* Route we'll use POST `/users/login`
* When we make a post request to this route we will also send data
    - an `{email, password}` in the request body
    - The password will be in plain text
    - So...
        + We'll need to find a user in the mongodb user's collection who:
            1. has an email matching the email sent in
            2. has a hashed password equals the plain text password when passed through the `bcrypt` compare method

```js
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
```

## Challenge
* Set up this route
* Then pick up the email and password from the request body
* To verify that the route is setup correctly use res.send() and send back the body data
* fire up server
* make login call in Postman pass in an email and password
* and make sure you get the email and password back

### Solution
```js
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  console.log(body.email);

  res.send(body);
});
```

* Start up server

`$ nodemon server/server.js`

Postman, Make POST {{url}}/users/login (Todo App Local)

```js
{
 "email": "mike@mike.com",
 "password": "sithlord"
 }
```
