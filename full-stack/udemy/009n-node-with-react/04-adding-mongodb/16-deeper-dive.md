# Deeper Dive
## app.use()
* app.use() wires up `middleware` inside of our app
* middlewares are small functions that can be used to modify our incoming requests to our app before they are sent off to route handlers

![cookier diagram](https://i.imgur.com/K77dRcP.png)

* Our request comes in and a middle ware extracts cookie data from request
* Other Passport middle ware pulls the id out of the cookie data
* We use the Passport deserializeUser() method to turn user id into a use and add it to the request object
* So these three middlewares are making minor adjustments to the request object as it works it way to a route
* So middlewares are all about doing some pre-processes of the incoming requests before they are sent off to our routeHandlers
* Middlewares are a great location to locate some logic that is common to many different route handlers
* So for our app we may want to authenticate every single route handler that we have
    - We may want to know about every single use coming into our app
    - rather than adding some logic to every single routeHandler we can instead just wire up these middewares one time then they will automatically be used for every request that comes into our app
    - What if I don't want to run these middlewares on every route handler?
        + No problem. You can do that
        + We'll use an example of how to do this shortly

## How Express Works
![Express diagram](https://i.imgur.com/YOSbRxG.png)

1. A request from browser comes into our app
2. That app object is created by the Express library
3. The request object is then piped into all the different middleware
4. Then they are sent off to the different routeHandlers we have registered
5. We do a bunch of stuff to the info from the request and formulate a response and send it back to whoever made the initial request

* Middlewares and routeHandlers are the majore topics of Express (90% of What Express does and is used for)
* Express is a very light weight framework

## What is going on with cookieSession?
`index.js`

```js
// more code
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [secretKeys.randomCookieKey]
  })
);
// more code
```

## Temp change in our routeHandler
`authRoutes.js`

```js
// more code
app.get('/api/current_user', (req, res) => {
  res.send(req.session);
  // res.send(req.user);
});
```

* Log in `localhost:5000/auth/google`
* Then visit `http://localhost:5000/api/current_user`
* You will see this:

![session](https://i.imgur.com/IUA3hje.png)

* The screenshot is of our req.session object
* Let's breakdown this process

![breakdown cookie process](https://i.imgur.com/6KuOfVn.png)

* When the cookie session extracts the cookie data
* It does but then it assigns it to the req.session property
* So req.session contains the data that req.session is trying to store inside the cookie
* When we pass that data onto Passport, Passport is not really looking at the cookie, it is looking interally at `req.session` and then pulls the relevant data out of it and then passes it on to deserializeUser() and all that other stuff
    - We see one piece of data in our app is being managed by Passport and that data is an object with a user key and the user and a long string as a value
    - You will see that the id of my user is identical to the id in our `MongoDB` user's record `_id`

   * Change our route back

`authRoutes.js`

```js
// more code
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});
// more code
```

* If you read Express documentation they will recommend two different libraries
* What is the difference between the library that we just used `cookie-session` and the other library that Express recommends called `express-session` [link](https://www.npmjs.com/package/express-session)
    - Both libraries accomplish the same thing
    - But they do it in a VERY different fashion

## What does express-session library do?
Why is it so different?

![more session diagrams](https://i.imgur.com/hPjsFPT.png)

* We want to get some unique identifiable piece of info into the user's cookie that so that it could be relayed with every follow up request that the user ever makes
* The key difference between the cookie-session library and the express-session library is exactly how that data is stored inside of the cookie
* When we make use of the cookie-session library we say that the cookie is the session, the cookie contains all of the data related to the current session, it contains the actual user `id`
    - We look into that cookie
    - We decode the value in there
    - And the cookie value is what we just saw above
* This is what is stored inside our cookie using `cookie-session`

![session](https://i.imgur.com/IUA3hje.png)

## How does express-session work?
* We did not use this one
* This behaves slightly differently than cookie-session
* express-session works by storing a reference to a session inside the cookie
* So when you use it and look inside that cookie you will see that it is storing and id `session_id` to a session
    - So whenever a request comes back around for express-session, express-session takes the id out of there
    - It then looks up all of the relevant session data
        + This is commonly referred to as a `session store`
    - So the cookie only contains this one very small id and nothing else and then to access all the data associated with that particular cookie we store all the relevant data inside some other outside database
        + Or some remote store of data

![further clarification digram diff express-session and cookie-session](https://i.imgur.com/PZXjVlG.png)

* The cookie gets parsed we just see something like `session_id = 234`
* To figure out the data inside that cookie we would go to the session store and we would look up this very particular session_id of 234 and that in turn would return us a little object of all of the relevant data

## Takeaway
* express-session - We store all the data outside the cookie
* cookie-session - We store all the data inside the cookie

## So why do we care about using one or the other?
* With express-session we can store as much data as we want to inside of that Session store because that is some big bucket of data that we can host on our server and we can stuff as much as we want inside of it
* But with a cookie we are limited to around 14 kilobytes and that's all we have access to
* Our app only cares about the user id, so `cookie-session` works better for us

## express-session
* If you make use of this scroll to the bottom of the npm documentation page and look at `Compatible Session Stores`
* You need to set up one of those session stores

![session stores](https://i.imgur.com/JLKxzOQ.png)

* By using cookie-session we totally avoid having to do this step

## Let's take a visual look as cookies are being set on our server
* Google Chrome
* Open the developer tab
* Right click and click `inspect`
* Open Network tab
    - This shows all the network requests being recorded
    - We'll walk through the authentication flow and look at our cookie and see how it's being set by our server
* Logout - Visit `localhost:5000/api/logout`
* `cmd` + `r` to refresh browser
* Look at logout and click it

![logout](https://i.imgur.com/W7oJXqV.png)

* By clicking on it you are clicking on the request that was just made
    - It will contain the response we just got back from the server
    - In the `Headers` tab
        + You'll see a list of all the response headers
        + These are Headers that were included with the response that got sent back to us
        + One of the Headers is the `Set-Cookie` Header
        + You need to be viewing this as you are logged in and then visit the logout api route and you will see the session

![Set Cookie Header](https://i.imgur.com/6zQ6GxP.png)

* **note** Whenever the cookie-session runs, it will always encrypt our cookie so the cookie we see in the screenshot above is encrypted so a malicious user can't hijack our cookie and pretend they are a different user
* Now visit `localhost:5000/auth/google`
* Then click on the red callback

![red callback](https://i.imgur.com/tLuzl0I.png)

* And now you'll see the session is significantly longer because it is still encrypted but it now contains the user id
    - So that is why it is longer
* But if we visit `localhost:5000/api/current_user` we don't get back any response Header because on that route we are not modifying our cookie in any way
    - We are reading the cookie
    - But remember the client automatically includes the cookie with any request that it sends to the server

![cookie in request](https://i.imgur.com/LLxSSP6.png)

```js
app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});
```

* When you logout if you were to decrypt the session stored in the cookie it would just say, 'empty session'

