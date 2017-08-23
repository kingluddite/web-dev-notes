# Why this architecture
![dev mode diagram](https://i.imgur.com/cmcWlPo.png)

## Discussion on:
* How react and express server are working together
* And the differences between the development world and production world

### Why didn't we use this approach? It seems more reasonable
![reasonable setup](https://i.imgur.com/dNEuFmC.png)

* We have 1 create-react-app server
    - That serves us the bundle.js file
* Then we have a completely separate API
* Then we'll figure out some elegant solution with domains for prod and dev
* This is a fine approach
* We could have done this

## But...
* There we a couple of things that prevented (or more pointedly offered challenges) us from implementing the above architecture in our app
    - We wanted to keep things easier and straightforward and kept things the way they are

## Two reasons why this approach (see diagram) makes our life easier
![dev mode diagram](https://i.imgur.com/5nLGprg.png)

### Reason #1 - Cookies
* We are using cookies as the absolute lynch pin for authentication in our Application
* Once the user enters the OAuth flow we will set up so sort of authentication in the user's cookie that will identify the user
    - And every subsequent request back to our server by that user will contain that user's `id`

![cookies diagram](https://i.imgur.com/g53f66O.png)

#### Cookies not included!
* If a browser at `localhost:3000` makes some sort of AJAX request, maybe fetch a list of surverys, when we make that request at a server at localhost:3000, which is the exact same domain that the browser is currently at
    - Cookies will be included with the request
* But if we a request to localhost:5000 (in other words, to some different domain that houses our API server), cookies are NOT INCLUDED with that request by default
    - Because our host is currently pointed at localhost:3000
    - This is purely a **security issue**
    - The browser gets very suspicious if the the domain is localhost:3000 and then it switches to localhost:5000
        + It starts to wonder, "Hmm, why are they trying to make a request to a different domian? A different server? A different port?"
        + The browser thinks it may have loaded up some malicious code that is attempting to make a request maliciously to some different domain
        + So by default the browser WILL NOT include cookies with that request
        + A different port is considered a different domain

![diff domains](https://i.imgur.com/CKZRkuU.png)

* But using this architecture, we avoid the above roadblock

![dev mode diagram](https://i.imgur.com/16jEfPn.png)

* As far as the browser is concerned, any API request we make at all from the browser will always be pointed back at `create-react-app` in development and then `create-react-app` will automatically proxy that request onto the express API
* The browser doesn't know and doesn't care that that proxy is there
    - The proxy makes the browser think it's at `localhost:3000` and it's making a request to `localhost:3000`
    - It's the same domain so I'll include the cookies
    - All is A-O-K
    - The proxy takes that request, it takes a copy of the cookies and forwards it on to the Express API
* On the Express API server we got our cookies, we know who the user is, so we'll formulate a response, send it back and it eventually will end up back up at the server

## Production
![prod mode diagram](https://i.imgur.com/uIqD0Ud.png)

* The browser will always be at livedomain.com and we are going to make a request at our Express API server on the EXACT SAME domain and none of this cross domain cookie stuff is an issue at all
* **note** The browser has APIs where we could send cookies across domains
    - But life is easier when we don't have to worry about these advanced issues
    - We don't have to worry about JSON tokens
    - We don't have to worry about Headers inside of React app

### Takeaway
* We took our approach because it was an easy straight forward approach

## Big Issue #2 - CORS issue
![CORS issue diagram](https://i.imgur.com/2PpHRss.png)

* Nearly identical in nature
* Our browser is located on localhost:3000 and we attempt to make some type of AJAX request to a server also located at location localhost:3000, the browser says, OK, fantastic, no issues here whatsoever! 
* Go ahead make your request. Everything is A-O-K

### Security Issue!
* But again if we attempt to make a request from localhost:3000 in a browser and we attempt to make a network request over to a different domain or a different port, that is counted as what we refer to as a CORS request
    - What is CORS?
    - Cross Origin Resource Sharing
* Making an Ajax request from a server with a different domain the browser assumes you are doing something malicious
    - You loaded up some bad JavaScript and you are trying to bring something bad over from some other domain
* We could have gotten around this too
* We could configure our other server `localhost:5000` Express API in such a way that it says to the browser you are making a CORS request but it's fine, this browser is safe, allow the request, here's the JSON you requested
* But by not having to worry about a second domain, it all works out and our lives became easier

#### In Development Mode
![dev mode diagram](https://i.imgur.com/LyU0I9X.png)

* Whenever we make a request from the browser we are making a request from localhost:3000/whatever
* That request will be sent to the proxy
* The proxy will then forward that request onto the Express API server
* The API sends a response back
* And that gets communicated back to the browser
* As far as the browser is concerned it only made a request to localhost:3000
* And it doesn't think that CORS is even remotely an issue here
* Even though the server is being ran on localhost:5000 which would qualify as a CORS request
* So, yet again, the proxy saves us again in development mode

#### In Production Mode
![production mode diagram](https://i.imgur.com/h9JzEGV.png)

* The browser will see livedomain.com/whatever in address bar
* And when we make an API request from the browser to our Express server API which is located at livedomain.com/whatever
* It is the same domain so CORS is not an issue
* Just like cookies were not an issue as well

### Walking through entire OAuth flow with proxy involved
![entire OAuth flow with proxy for dev mode](https://i.imgur.com/3rwRmoc.png)

### Dev setup
* Here is how the proxy is working with the Express API in the development world
* Remember when using relative paths in links the browser will automatically assume the domain is the same as what is in the browser currently

### The dev flow for proxy steps
1. The user is at localhost:3000 in the browser
2. They click on a link that says `/auth/google`
3. The browser sees that it is a relative path so it will automatically prepend on `localhost:3000/auth/google`
4. The request is issued so it looks like we are navigating to this other location (route)
5. It goes to the `create-react-app` server and the proxy that sits inside it
6. The proxy sees the request incoming to /auth/google
7. When that request comes in the proxy automatically looks into the client package.json file for the `proxy` and it says this person is trying to make a request to `/auth/google`
    * It asks itself, "Do I have any settings around that route?"
    * And it sees that it does which is a target of `http://localhost:5000`
8. The proxy sees that request and decides that it is responsible for that request
9. And it tells that request to just sit, "Hey browser, hold up for a second I need to figure out what to do with you"
10. The proxy then takes that exact request and copies the whole thing, word for word, line for line - It takes the request and copies it
11. The proxy sends the copy of the exact same request and sends it on to the new route `http://localhost:5000/auth/google` (the target specified inside the package.json proxy setting) - It appends on `/auth/google`
12. **note** The request from the browser is still sitting there, still pending
13. The proxy sent the copy of the request out to the Express API
14. The Express API picks up the request and says, "Oh you are trying to OAuth, to get into our OAuth flow, please go over to Google.com"
15. They go over to Google.com
16. After that here is your callback URL (the think we specified in the Google Strategy)

`passport.js`

```
// more code
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
// more code
```

* So the callbackURL is `/auth/google/callback` with a relative path

17. That response if created by the Express API `/auth/google/callback`
18. It sends it back to the proxy
19. The proxy takes the response
20. It takes the pending request that was sitting there from the browser
21. And it sends it on back to the browser
22. The browser sees `/auth/google/callback` and it says, "Oh I guess I need to go over to google", that's the request I just made
    * It doesn't know that the proxy did a copy and did all this stuff
23. The request then goes to Google
24. And when it returns it will go to `/auth/google/callback`
    * That is a relative route
    * The relative route will automatically have `localhost:3000` prepended to make `localhost:3000/auth/google/callback`
25. When we get that callback
26. When we get redirected by Google
27. Google will attach and attempt to send us back to localhost:3000/ not localhost:5000 (not the Express API server)
28. The user sees that consent screen, that these emaily guys want to get access to your profile, is that OK?
29. The user says, yeah, that's ok
30. So Google says. Cool. Authentication done.
31. It's time for you to go back to localhost:3000/auth/google/callback
32. But when we comeback from the google Oauth flow we also put our `code` in there as well
    * localhost:3000/auth/google/callback?code=111222333
    * The code is in the URL from the google API
    * From the google Oauth flow
33. Then we get sent on back
34. And the request again at localhost:3000 runs into the proxy in our create react app
35. Again - same flow as before - The request sits pending
36. The proxy sees this request form localhost:3000/auth/google/callback that will be picked up by that same client rule in package.json `/auth/google` even though it says `/auth/google/callback`
37. Then the proxy says I'm in charge of this route I will take things over from here
38. It copies the request
39. It sends the copied request to the Express API
40. Our API takes the `code` (111222) that was in the URL
41. It goes and fetches the profile it does all that fancy stuff that we discussed before
42. When everything is said and done it sends back some response that says
    * Ok you're logged in now, here's your cookies!
43. The Express server than responds back and says OK, everything looks good
    * We did not set up the route for the response when it comes back yet
    * But we will in a bit
44. It sends the response back to the browser
45. When the redirect is sent back to the browser
46. The Express API will say just go to `/` or the root route in our app
47. And the browser will interpret that to mean go back to `localhost:3000/`
    * Because it will automatically prepend on the current domain

## Takeaway
* The browser automatically prepends the domain to any relative route
* That is what makes things work so nice for us

## Let's go through the production flow
* It's much more straightforward

![prod flow](https://i.imgur.com/2NI7HTC.png)

1. We start in the browser at `livedomain.com`
    * This is production
    * We no longer have the create react app server
    * We no longer have the proxy
    * Everything is running on livedomain.com domain
2. User clicks on button that says "take me to" `/auth/google`
3. The browser prepends livedomain.com to /auth/google
4. The browser gets sent on to our Express API
    * no create react server
    * no create react proxy
5. The API says, Oh you are trying to Oauth, go over to Google
    * When you are done with google
    * Go back to `/auth/google/callback`
6. Then the browser says, Ok everything looks good on return I'll go to `/auth/google/callback`
7. We go to google.com
8. Oath is complete
9. We go back to livedomain.com/auth/google/callback?code=111222
    * the browser prepends livedomain.com to the relative path again
10. We then go back to the Express API
11. Our Express API fetches the API
12. Our express API sets the cookie
13. And eventually dumps the user back at the root route livedomain.com of our app

## Takeaway
* Using cookies is a more secure way then handling JWT JSON web tokens













