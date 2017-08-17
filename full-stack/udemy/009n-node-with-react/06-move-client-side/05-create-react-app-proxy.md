# The Beauty of Create React App's Proxy
* We only want to use relative links on our React front end
* But we want the React front end server magically forward requests over to our Express server
* The issue is when you use relative links the browser will automatically prepend on the current domain
    - So localhost:3000 domain on a `/google/auth` relative path will convert to `localhost:3000/google/auth`
    - The problem is we want it to magically change to `localhost:5000/google/auth` (That is our backend server)
    - We fixed this by adding this in our client `package.json`

`package.json` (client)

```
// more code
"proxy": {
  "/auth/google": {
    "target": "http://localhost:5000"
  }
},
// more code
```

* We also said we would fix that mismatch Error

![mismatch error](https://i.imgur.com/W5R4vxU.png)

* The reason for the error is Google things we're trying to go back to `localhost:3000/auth/google/callback` and that is not authorized
* The easy solution is just to add this link into our Google dev console as an authorized callback

![add new authorized callback](https://i.imgur.com/EbMbWJs.png)

* After saving it takes about 3 minutes for the URI to be registered

## Test it out
* New tab
* Browse to `localhost:3000`
* Click link
* You will see it now works

## Talk more about this "proxy" code:
`package.json` (client)

```
// more code
"proxy": {
  "/auth/google": {
    "target": "http://localhost:5000"
  }
},
// more code
```

* What does the above code mean in "simple speak"
    - Make a proxy
        + If anyone visits the route `/auth/google`
        + On our react server
        + Automatically forward the request to `http://localhost:5000`
        + And it is implied that if we go to `http://localhost:5000` we are really going to `http://localhost:5000/auth/google`

## What is really going on with our server in development mode
![dev mode diagram](https://i.imgur.com/x6IXYWD.png)

* When we are running our app
    - The server for the react side
    - The server for the Express app
* On our local machine
* Imagine there is two distinct layers of our app
    1. Server #1
    2. Server #2

* When we visit `localhost:3000`
    - The server will return to us the `bundle.js` file
        + This will contain all our development assets
            * The react library
            * All the different components
            * Etc..
* Any time our app needs any data from our API or from our Express app, that request will go to the `create-react-app` server to a proxy that is automatically built-in and included with `create-react-app` server
* That proxy will then take that request and forward it on to the Node/express API server
* And that is exactly what we did when we added that script to `package.json` of `client`

## It works on Development but what about when we deploy to Heroku?
### Do we then have to change the proxy to our Heroku domain?
* The great answer is we don't have to change the proxy again for deploying to Heroku, it will automatically do it for us

### How is that possible?
* In production, the create-react-server DOES NOT EXIST!

## In Production everything will change
![production heroku diagram](https://i.imgur.com/GUhlDii.png)

### Steps in production
* Before we deploy our app
* We are going to BUILD our react project
* When we build our project, create react app will take all the JavaScript files, all the different CSS files, all the images, everything inside of the `src`
    - `Create-react-app` will run **webpack** and **babel** over all those files and then save a final production build of our app inside the `pubic` folder `/client/src/public`
* Then whenever someone comes to our app running on heroku
* We are only going to be running our Node/Express API
* And any time someone comes to our app we will automatically send them back our HTML file and the newly build `bundle.js` that was just placed into that `build` folder by `webpack`

### Let's show you how this works
* Open a new tab in your terminal
* `$ cd client`
* Run the build statement `$ npm run build`
    - The create-react-app will create an `optimized production build`
    - And it will place it inside our build directory `build`
    - Once all that is created inside `build` that is it!
        + We no longer have any need to run the `create-react-app` Application whatsoever
        + All `create-react-app` gives us is things like:
            * livereload
            * linting
            * error checking
            * all def stuff

### The build assets
* This is what was created by the create-react-app

![build assets](https://i.imgur.com/A2uY65n.png)

* Our entire JavaScript Application is inside the `build/static/js` folder
    - `main.RANDOMSTRING.js` is inside the entire app
* When we deploy to production we no longer need to run the create-react-server
* We just have to one time:
    - build our Application
    - Commit the stuff
    - Deploy the Application to Heroku
    - And we leave it up to the express server to serve all these different JavaScript files

## Takeaway
* That is why when we set up our proxy server we really only have to set up our development environment only
* Because the `create-react-server` doesn't exist inside production

## Question!
* If the `create-react-app` server doesn't exist in production, how do we do all this route rewriting in production?
    - That is the whole key and why everything works out so well when we just use the relative routes
    - When we use `relative` routes throughout our Application, the browser will automatically **prepend on** the current domain to the `/auth/google`
        + In development when we access our create-react-app server at `localhost:3000` the browser wants to think that this link wants to take us to localhost:3000 and that's why we need that proxy setting in client `package.json` and that is why when we hit localhost:3000 it will forward it on to our express server on localhost:5000
* But in **production** when our application loads up, the browser see that we are at `some-heroku.app.domain.com` and that point in time this relative link `/auth/google` will automatically turn into `https://some-heroku.app.domain.com/auth/google`
* That is the beauty of this stuff
* It all works so perfectly between development and production
