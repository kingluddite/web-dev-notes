# Version Control Scheme
`keys.js`

```js
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
} else {
  // we are in development - return the dev keys
}
```

* On our local machine the NODE_ENV will never be equal to `production` so we'll always trigger the `else`

`keys.js`

```js
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev'); // eslint-disable-line global-require
}
```

* That's the only change we need to make for local development
* We can still require in `keys.js`

`index.js`

```js
// more code
const secretKeys = require('./config/keys');
// more code
```

* And in development it will work just like it did before

## Production Keys setup

`keys.js`

```js
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod'); // eslint-disable-line global-require
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev'); // eslint-disable-line global-require
}
```

## Create production keys file
* Create `/config/prod.js`

`prod.js`

```js
// prod.js - production keys here!!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  randomCookieKey: process.env.RANDOM_COOKIE_KEY
};
```

* This is a one time setup that we'll add from time to time but once we set it up we are good to go
* We will export an object out of this file where the values inside that object are being pulled from environment variables in the Heroku environment
* Copy all content from `dev.js` and paste into `prod.js`
* **note** - Naming convention, it is common to spell production environment variables like this: `GOOGLE_CLIENT_ID`

## Update our version control setup
![version control update](https://i.imgur.com/rqHQaGh.png)

* We no will commit `config/keys.js`
    - We commit this so app knows what to do in dev or prod
    - We will commit the `prod.js` file
        + This is **important**
            * When we push our app to heroku, we DO want to include `prod.js`
            * If we ignored `prod.js` in `.gitignore` heroku would deploy and read `keys.js` and it would require `prod.js` which is ignored and then that in turn would generate a big fat error that would break our site
            * `prod.js` has the import secret environment variable names that we will define on Heroku and this file is used to find and use them
    - We WILL NOT commit the `dev.js` file

## Update .gitignore
`.gitignore`

```
node_modules
dev.js
```


