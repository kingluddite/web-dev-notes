# The Theory of Authentication
![http is stateless](https://i.imgur.com/oRKEkh2.png)

## HTTP is stateless
* We communicate between our browser and our server via HTTP requests
    - Ajax requests are still just HTTP requests

### What is stateless?
* Between any two HTTP requests we make, HTTP has no way to share information between those two requests or any requests

#### Scenario
1. I log in with a username and password. It checks that my username and password match with what's stored in the Database
2. Some time later (in the future) I request something from that site
3. It will say, "Who the heck are you?"
    * The server has no idea who I am
    * That is because info between requests is not shared

### How do we get around this?
![how we get around statelessness](https://i.imgur.com/3kZTBvL.png)

* The above chart is what is happening with every authentication scheme you ever used in your life

## General Idea behind Authentication
1. Your browser makes some request to a server
2. "Please log me in!"
3. You provide an email/password or some combination of that (maybe a username)
4. The server receives it and says "OK you are now logged in"
5. The server will respond with some **unique identifying information about you
    * cookie or a token or something similar
    * Best to refer to it as a `token` over a `cookie`
    * The server gives back to the client, this is my proof that 5 minutes ago this was the same user
    * The token corresponds to whoever made this initial request
6. (key here) Any follow up requests to the server we will include the token - little identifying piece of info
    * That token proves we are the same person who made that login request 5 minutes ago.. one day ago.. or three days ago... you get the idea
    * We send the token with the request
7. The server sees the request with the token so it gives the response with a list of that user's posts (or whatever was asked for in the request)
8. The server sends back a response of the POSTs that belong to that user that logged in 5 minutes ago

## Takeaway
* We can never rely on raw HTTP requests to remember us between requests

## How can we apply this information? - Cookie Based Authentication
![using cookies](https://i.imgur.com/evsYerR.png)

* Our app will use `cookie-based authentication`

1. Our initial request to our server
    * "Please log me in"
    * It could be an email or username but we will use Google OAuth
    * When we make our request we will generate some information
2. In the response we send back to the user in that initial OAuth request we will include a `Header` inside of the response that gets sent back to the Client/Browser
    * The Header will have a property called `Set-Cookie` and it will be set to have a value of some random `token`
    * That `token` is what we will use to uniquely identify that user
3. (very important part) - When the browser sees the response come back and it sees in the Header of the Response, the browser will automatically strip off the `token`, it will store it into the browser's memory
    * And the browser will automatically append that `cookie` with any follow up request sent to the server
4. A follow up request is sent
5. The server will see the `cookie` which is the exact same identifying `token` that the server provided to this user previously and it will conclude that this person who sent the request is the same person who sent the request to login before
6. The server will send back the data the user requested

## Why are we using Cookie-based authentication?
* It is very elegant and a reasonable solution for the type of app we are building
* This is great because we won't have to worry about dealing with this cookie on the React side of the app
* From React's perspective, it will feel like we are just "magically" logged in and the reason this is possible is because the browser itself is responsible for handling all the `cookie` stuff
    - We are not
    - The React side of our app doesn't care about cookies

### Shortcomings of the cookie-based authentication approach
* jwt - JSON Web tokens
    - Or other token based strategies that don't involve cookies
    - There is a very good reason to use those strategies
    - In future notes, we'll talk about these other approaches and the pros and cons to using cookies 







