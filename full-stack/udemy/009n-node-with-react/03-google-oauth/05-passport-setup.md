# Passport Setup
## Install Passport
`$ yarn add passport passport-google-oauth20`

## Why passport-google-oauth20?
* If you click on Strategies and view the [google oauth github page](https://github.com/jaredhanson/passport-google-oauth), it recommends you use [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2)
    - You can't put `.` inside git repo name so they named it `20`

## index.js
* We'll start with everything placed inside `index.js`
* Over time we will refactor the code into multiple files

### require Passport and Google Strategy
```js
const express = require("express");
const passport = require("passport"); // add this line
const GoogleStrategy = require("passport-google-oauth20").Strategy; // add this line
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

* Create a new instance of the Google Strategy

`passport.use(new GoogleStrategy());`

* It tells my app "Yo, I want to authenticate my users with Google"
* Inside the GoogleStrategy() constructor we will pass in some configuration tells the Google Strategy how to authenticate users inside my app

`passport.use()`

* This is generic for passport
    - This is how we tell passport that there is a new Strategy available
