# Securing API Keys
* `clientID`
    - Public token
    - We can share this with the public
* `clientSecret`
    - Private token
    - We don't want anyone to see this!
    - If someone has access to this secret they will have elevated privileges inside our OAuth account (this is bad news!)

## Houston we have a problem
* We are using Git
* Our files are available in the public
* Where do we put our `clientSecret` without anyone seeing it?
* If you also push your site up to Github then everyone in the world can have access and read your `clientSecret`

## How can we securely store our `clientSecret` API key
* We will change our setup to be more secure and act differently on our dev server vs our remote production heroku server

![dev and heroku API key setup](https://i.imgur.com/Lo2gwvg.png)

## config folder
* Create `config/keys.js`
* All of our sensitive keys will be placed inside this JavaScript file
    - And we'll make sure we never ever commit it to Git

`/config/keys.js`

```js
module.exports = {
  googleClientID: '1005918912077-sre6e8et2sabtf7rtrcidh5k939abcde.apps.googleusercontent.com',
  googleClientSecret: 'gcCJByKtspHxUU_xE_abcd'
}
```

* We declare a `module.exports() = {}` statement
* This created an object and assigned it to the `module.exports` property
* That enables us to **require** both of these properties into another file
* We will user this CommonJS to export code and make it available at other places in our Application

## Make sure we never EVER EVER commit this file to source control with Git
* Simple!
    - Just add `keys.js` to our `.gitignore`

`.gitignore`

```
node_modules
keys.js
```

* Atom editor greys out files in .gitignore
* We will revisit this API storage later to make it more efficient
* Here is the final `index.js`

```js
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

