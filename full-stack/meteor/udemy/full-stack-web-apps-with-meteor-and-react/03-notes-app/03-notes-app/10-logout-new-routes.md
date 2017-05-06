# Setting up Logout to work with new routes
## Houston on we have a problem
* In our latest changes we broke something
* We'll need to refactor it to fix it

### What is the problem?
* Click on a note
* Makes sure url has `dashboard/SOMEID`
* Click Logout button
    - Notes do go away (good)
    - But we did not get redirected to the login page (very bad)

`routes.js`

```
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
```

And we added this route

`<Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage} />`

We need to find a way to know when we are on the above route, we need to find a way to redirect away when the **auth** status changes

We now have to work with dynamic routes `:id` and our current system will not work with this and so we need to make a bunch of changes but this will make our app routing system more robust and this is now becoming more of a real world app because dynamic URLs are a fact of life in modern day apps

## Find New Way
How can we determine if pages are to be seen by authenticated or unauthenticated users

`const authenticatedPages = ['/dashboard'];`

We don't know right now what will be after dashboard because it is now a dynamic URL

## Put decision if auth or unauth in the hands of the Route itself
* We add a made up attribute `privacy` (we could name it anything) and depending on the page we enter a value of **auth** or **unauth**

```
// more code
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} privacy="unauth" onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} privacy= "unauth" onEnter={onEnterPublicPage} />
    <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage} />
    <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} />
    <Route path="*" component={NotFound} />
  </Router>
);
// more code
```

## Step 1 - Track what type of page we are on
* If I'm on the home page I should have a variable somewhere that lets me know I'm on an **unauth** page
* If I login and switch to the Dashboard, that value should switch from **unauth** to **auth**
* As that status changes we know what type of page were on and act accordingly

### React Router Nested routes
`beforeEach` - it gets called before every test and what we are doing now is similar to that

* We are going to do something every single time the page changes

```
export const routes = (
  <Router history={browserHistory}>
    <Route>
      <Route path="/" component={Login} privacy="unauth" onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} privacy= "unauth" onEnter={onEnterPublicPage} />
      <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage} />
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
```

* Our app still works
* You can provide `<Route>` without any path/component or anything
* But this will enable us to track page changes
* We are going to use both of the following:

```
// more code
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter onChange>
// more code
```

* We want to do something when the app first loads **onEnter**
* We want to do something when it changes **onChange**

```
export const globalOnChange = () => {
  console.log('globalOnChange');
};
export const globalOnEnter = () => {
  console.log('globalOnEnter');
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} privacy= "unauth" onEnter={onEnterPublicPage} />
      <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage} />
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
```

* Test it out and surf around the app going to different routes and you will see when each event fires and why we need both
* `onEnter` handler gets called with **nextState**
    - That stores information on where the app is about to go
* `onChange` handler gets called with **prevState** and **nextState**
    - So we know what page we are coming from and what page we are going to

## How can we figure out what `privacy` value is?
We will use **debugger** inside our code

```
export const globalOnChange = (prevState, nextState) => {
  console.log('globalOnChange');
};
export const globalOnEnter = (nextState) => {
  console.log('globalOnEnter');
  debugger;
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" onEnter={onEnterPublicPage} />
      <Route path="/signup" component={Signup} privacy= "unauth" onEnter={onEnterPublicPage} />
      <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage} />
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
```

Go to sign up route and in console:

`> nextState`

* We'll see `location` but that doesn't have info we need
* `params` won't give us what we need
    - It is an empty object but could be populated on other routes
* `routes` will!
    - routes is an array
    - routes[0] is global route we defined (5 children)
    - routes[1] is our `/signup` route and you'll see `privacy` with **unauth**
        + This is what we need to wire up our feature

So we will be grabbing the last route in the `routes` array, we'll grab the `privacy` value off of that, store it and we'll be able to determine what type of page we are on

## Grab the last route
`const lastRoute = nextState.routes[nextState.routes.length - 1];`

## Store privacy value in Session
`Session.set('currentPagePrivacy', lastRoute.privacy);`

* `privacy` values can be:
    - `auth`
    - `unauth`
    - `undefined` (404)

```
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
```

And we can reuse some code as we know it does the same thing

```
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
```

### Add to Tracker.autorun()
`client/main.js`

```
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy'); // add this

  console.log('currentPagePrivacy', currentPagePrivacy); // add this
  onAuthChange(isAuthenticated);
});
```

* Test in app
* You will see when you refresh you get **undefined** and then **unauth**
* If you click on 'need an account' or 'already have an account' you will see nothing happens because `Tracker.autorun()` only runs when the value changes
* If you log in you'll see the value change to **auth**

## Next - Finish hooking up Logout to work with new Routes
