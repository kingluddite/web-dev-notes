# Access and Refresh Tokens
![flow diagram](https://i.imgur.com/GcBcgzn.png)

* The callback creates the accessToken and we can use that and create a new user and save that user and the accessToken to the Database

`index.js`

```js
// more code
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    },
  ),
);
// more code
```

* Restart server
* Visit `localhost:5000/auth/google`
* View the terminal and you'll see 'access token', no refresh token, and a chunk of info in the profile

## Access token
* This token let's google know that we have permission to do things to the user's account
* If they let us we could delete emails, it is very important and could give us lots of power but we won't be using it in our app

## Refresh token
* Allows us to refresh the token
* This could give us the ability to reach into the user's account and update the token for a certain amount of time
* We won't be using this

## Congrats - We are done with the Passport side of our app
* Now we need to take the Google data and do something with it

## Nodemon
* Will restart our server for us whenver their is a change to `index.js`
* We no longer have to manually restart our server

### Install it
`$ yarn add nodemon`

### Update `package.json`

```
// more code
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
},
// more code
```

### Run it
`$ npm run dev`

* We put commands inside scripts to help us not have to remember all of them
* Great for us and great for members of our team


