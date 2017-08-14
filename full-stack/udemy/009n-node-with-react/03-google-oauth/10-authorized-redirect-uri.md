# Authorized Redirect URI's
* We just got the `redirect_uri_mismatch` error

Let's disset the URL google sent us to:

`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1005918912077-sre6e8et2sabtf7rtrcidh5k939qt2dd.apps.googleusercontent.com`

* base URL - `https://accounts.google.com/o/oauth2/v2/auth`
* query string - `?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1005918912077-sre6e8et2sabtf7rtrcidh5k939qt2dd.apps.googleusercontent.com`
* Let's break up all the properties of the query string on their own lines

```
?response_type=code&
redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
scope=profile%20email&
client_id=1005918912077-sre6e8et2sabtf7rtrcidh5k939qt2dd.apps.googleusercontent.com
```

* We see the response_type=code and remember we knew that Google would send us back from their server to our Express app a code, well... Here's the code!
* The redirect_uri looks to be the cause of the problem... let's come back to that in a moment
* We see the scope with the two pieces of info we want access to: The user's `profile` and `email`
* We also see our `clientId` which identifies our Application to Google servers

### Now back to `redirect_uri`
* It looks like it is matching our routeHandler
    - http localhost auth google callback

### The problem is we want to try to prevent hacking
* Take the entire URL we got from Google
* It is trying to authenticate a user
* If I was a malicious user, I could replace our client ID with airbnb_client_google_oauth ID (clientID is public so everyone knows it)
* And we want to hijack users who think they are authenticating with airbnb but instead we'll send them back to our servers and forward all their account info (this is not good!)
    - To do this we could change the `redirect_uri` and instead of sending them back to airbnb's oauth at airbnb.com, I would change it to my server at my-hacker-server.com/auth
    - Then we can trick users into clicking this link, the user would be presented with it looks like airbnb is trying to access your profile, the user says yes I trust airbnb but then google would send the user back to `my-hacker-server.com/auth` with a special code in the URL and our hacker server could then make that follow up request to google and say hey give me some info about this user
    - So it is easy to see how this whole OAuth could be manipulate to steal user data maliciously
* The reason is we did not properly set up our account to tell Google that our route was a valid URL to direct the user to
    - Google tracks internally what valid URIs or URLs they can direct the user to and since they did not see a match for our app, we got the error
* The error page gives you a URL to return you to the OAuth API page where you can change the `Authorized redirect URIs` from `localhost:5000/*` to `localhost:5000/auth/google/callback`
    - **Note** After you make the change you might still see the error
        + The reason is after you change it takes the Google servers a little bit of time to update the change
        + Wait 5 minutes
* After 5 minutes browser to `localhost:5000/auth/google`
    - You will see a screen like this:

![content permission screen](https://i.imgur.com/xTjdmRF.png)

* Select the email account
* And you will get this nasty error `Cannot GET /auth/google/callback`
* We see our URL says something like: `ocalhost:5000/auth/google/callback?code=4/yUO6RHEqzTWW9NW531FSYyUKkhS6uRPOvbli9sq1eVU#` so we know google sent us back but the problem is our server currently is not set up to handle this route
    - We need to set up this routeHandler now
    - We have the code from google and we now need to exchange it with google servers
* We made it all the way to the `Send request to google with code included part`

![OAuth flow diagram](https://i.imgur.com/iE76iwz.png)

`app.get('/auth/google/callback', passport.authenticate('google'));`

* We altered `index.js` so we need to restart our server
* We will add `nodemon` soon to make this restart server process less tedious
* Browse again to `localhost:5000/auth/google`
* It takes to the constent permission screen
* Choose the account
* And it just "hangs"
    - The server shows a really long string (this is our `accessToken` we logged earlier)
    - It comes from our callback

```
},
    accessToken => {
      console.log(accessToken);
    },
  ),
);
```

## Why's it hanging?
* We didn't tell it what to do after we got the profile and email
* We will add a routeHandler that will take our profile and email and show the user some content



