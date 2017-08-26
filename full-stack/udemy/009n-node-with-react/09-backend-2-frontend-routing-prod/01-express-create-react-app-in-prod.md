# Express with Create-React-App in Production
* Let's do another deployment of our app to Heroku
* We deployed twice but were just deploying our Express server
* But we just added React
    - A major architectural piece to our app
    - Which is the client side app
    - How will that affect our deployment process?
    - It will be a big change now that we have the create-react-app inside our app

## How our server works inside of production vs development
![dev mode diagram](https://i.imgur.com/AqDK5cD.png)

* Whenever the browser goes to `localhost:3000`
* The browser will say I need stuff from the react side of the app `bundle.js`, I also need an HTML file and some CSS
* The `Create-react-app` server that exists inside our client app would see that incoming request and say "Ok, I got ya covered. Here's your HTML document, CSS and JavaScript"
* The app boots up
* The app makes some API requests
* And eventually that got handled by the Express API
* But let's focus on that first step, that `Create-react-app` was responsible for serving up all these assets (HTML, JavaScript and CSS files)

### But in production things will change a little
![prod mode diagram](https://i.imgur.com/FFpYKLq.png)

* Now when our app makes a request to ourdomain.com
* The assumed flow is (the way we want it to be) is when the browser reaches out to the server and says, "Hey I need HTML, CSS and JavaScript files" we are hoping that the Express server will respond with all the relevant assets
    - Because now our whole `Create-react-app` layer is gone in the production world

#### How do we make sure that when the Express server is running in production mode it needs to be in charge of handling all of these assets?
* Change into the client directory (command line)
* Run `$ npm run build`
    - We didn't put this script together
    - It came with `Create-react-app`
    - This builds all of our assets inside the client side of our project
    - So whenever we are ready to deploy we need to run this build script
* Files created in build (You will see this in Terminal):

```
73.27 KB (+25.12 KB)  build/static/js/main.3ce3315a.js
21.68 KB (+21.4 KB)   build/static/css/main.3d4e2f2b.css
```

* Random numbers are appended onto file names as a form of cache busting
* This is what was created in the client build step

![client build output](https://i.imgur.com/1CldW36.png)

### Problem getting Express to serve assets
![problem serve assets Express diagram](https://i.imgur.com/kK6PWCp.png)

* I have one request diagrammed out
* We just did this with stripe
* We take a post request `/api/stripe`
* Express would say "you are trying to give me a stripe token"
* It would process the request
* We have some logic
* At the end of the day Express did something with request and sent a response back
* What happens if we make a .get() request to `/surveys`
    - We didn't define this router on Express server
    - But we did define that router inside our React Router configuration

`App.js`

```html
// more code
<BrowserRouter>
  <div>
    <Header />
    <Route exact path="/" component={Landing} />
    <Route exact path="/surveys" component={Dashboard} />
    <Route path="/surveys/new" component={SurveyNew} />
  </div>
</BrowserRouter>
// more code
```

* So some routes are handled by `React Router` inside our app and some other routes that are being handled by Express server

`authRoutes.js`

```js
// more code
pp.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
// more code
```

* We need to instruct Express server that if it ever sees a route that it doesn't know about
* We will make the assumption that then that route is probably trying to be defined by `React Router`
    - And then it will say, I will hand you back the HTML file `index.html`
    - So when a visitor visits `/surveys` route
    - The Express server doesn't know that route
    - It sends `index.html` back to the browser
        + Inside that `index.html` there is a script tag to load up our `main.js`
        + Then that `index.html` inside the browser says, "In order for me to work properly, I'm going to also need this `main.js` file"
        + So the browser makes another request for the `main.js` file
            * Asking for `/client/build/static/js/main.js`
            * Then we instruct the Express server that if it doesn't recognize this route, it should forward it on and grab `main.js` and send it back to the browser
        + At that point our browser has access to the `index.html` to `main.js` (The react side of our app)
            * It loads them both up inside the browser
            * `React Router` loads up and sees the current URL `ourdomain.com/surveys`
                - And then `React Router` says "OK, based on this URL, I'm going to show the Dashboard Component"

`<Route exact path="/surveys" component={Dashboard} />`

## There is a big distinction between these two routes
* `/surveys`
    - Express understands it has to send back an `index.html` document
* `/client/build/static/js/main.js`
    - This is a reference to an actual file, so send back that file (rather than the HTML document)

## The build process we use on the client side of our app
