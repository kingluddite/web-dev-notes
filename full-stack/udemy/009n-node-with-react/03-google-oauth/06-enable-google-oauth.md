# Enabling Google OAuth API
* We need to give our Google Strategy two important options
    1. Client ID
    2. Client Secret
* We get the `Client ID` and `Client Secret` directly from Google's Oauth's Service
    - Check out our OAuth Flow
    - When we take a user and first throw them over to Google
        + Google has to Identify where that user is coming from
        + To make this possible we have to sign up with the Google Oauth API
            * We register
            * We tell Google we have people who want to use OAuth with our app

## Signing Up with Google OAuth
* This is complicated
* Browse to [Google Console](https://console.developers.google.com)
    - You need to create an account with Google if you don't already have one
    - Create a new project
    - Click this [dropdown](https://i.imgur.com/n4i1cxE.png)
    - Click the `+` sign [screenshot](https://i.imgur.com/T2oCqMx.png)
    - Enter `emaily-dev` as the name
    - Click Enable APIS and Services
    - Search for `OAuth` and you won't find it???
        + You need to search for `google+` API
        + Then in the results click Google+ API
        + (lame that you can't search for oauth!)
        + [Click Enable at top](https://i.imgur.com/VTZpqHJ.png)
    - Just enabling the API is not enough
        + I also have to generate and API credential
        + Click on [Credentials](https://i.imgur.com/kask6bH.png)
        + Click on `Create credentials` dropdown and select `OAuth client 
        + Now we need to set up a product name for our `consent screen`
            * What is the `consent screen`?
                - When the user is prompted if they grant permission for our site to use their Google profile
            * Click on `consent screen` and just fill out the product name `emaily-dev` (all other info is optional)
            * Click `Save` at bottom of `consent screen`
        + Select the `Web application` as the **Application type**
        + Leave Name as **Web client 1**
        + We will fill in under Restrictions **Authorized JavaScript origins** and **Authorized redirect URIs**
            * We'll just put in some values now and come back and talk in more detail about each later on
            * `Authorized JavaScript origins` - http://localhost:5000
            * `Authorized redirect URIs` - http://localhost:5000/*
        + Click `Create`
        + A popup will appear with the `client ID` and the `client secret`
            * Copy and paste both into `index.js` like this:

`index.js`

```js
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

// clientID 1005918912077-sre6e8et2sabtf7rtrcidh5k939abcde.apps.googleusercontent.com
// clientSecret gcCJByKtspHxUU_xE_abcd
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```
