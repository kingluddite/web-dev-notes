# Private and Public Routes
We just used `Tracker.autorun()` to watch the user authentication status

It works but it is not the complete picture when creating **public** and **private** pages using `React Router`

## The Good News
* We log in and get redirected to the `/links` URL - This is good :)

## The Bad News
* But I can always use the browsers **back** button to view the login page even though I shouldn't be able to (_Because when we refresh the page we get kicked away from the login page and back to the `/links` page_)
* And the same thing is true the other way around
* If I log out I leave the **private page** and go to the **home page** `/` but the `back button` takes me back to the **private page** but the **page refresh** kicks me back to the **home page** - This is not good :(

![browser's back button](https://i.imgur.com/0Sai24W.png)

```
if (Meteor.userId()) {
    
}
```

### Am I logged in?
* `Meteor.userId()` will return a **Truthy** value if logged in 

### Am I logged out?
* `Meteor.userId()` will return a **Falsey** value if not logged in

`client/main.js`

```
// more code
import Login from './../imports/ui/components/Login';
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.push('/links');
  }
};

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} />
    <Route path="*" component={NotFound} />
  </Router>
);
// more code
```

1. Now log in
2. Hit the back button and you'll see that you can't see the login page

## Exercise
Now create a function that will work the same way but when you are logged out it will prevent you from hitting the back button to go back to the private `/links` page

<details>
  <summary>Solution</summary>
`client/main.js`

```
// more code
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.push('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.push('/');
  }
};

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);
// more code
```
</details>

### Test
You should see that you have locked down your routes with these two functions

## But we broke our browser back button
1. Make sure you are logged into your app
2. Open a new tab (_We do this to get a fresh history_)
3. Go to [google.com](https://google.com)
    * The back button will take us to the blank page
    * The forward button will take us to [google.com](https://google.com)
    * All good so far!
4. Then enter `http://localhost:3000` and press enter
    * Since you are logged in you will immediately be taken to the `/links` - * All good so far!
5. Hit back button and you'll see we can't get back to `google.com`
6. This is our problem Houston!

## We'll fix this
Two ways to change pages

1. `browserHistory.push()` - nothing wrong with it but it is not perfect for every scenario

### Let's analyze what we did

1. We started on a **blank page**
2. We then went to `google.com`
3. We then went to `localhost:3000` and our app saw we were logged in and sent us to `localhost:3000/links`
    * We tried to go back but we couldn't and that is because we used `browserHistory.push()` and that: 
      + <u>Adds on to our browser</u> history
      + And we want to **replace our browser history** instead

So now when we go to `localhost:3000` and it takes us to `localhost:3000/links` it won't push it but instead it will replace it and that means when we do hit the back button in the browser we'll get back to `google.com`

## Replace our push with replace

### browserHistory.replace()
We'll replace all our cases of `browserHistory.push()` with `browserHistory.replace()`

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

// import App from './../imports/ui/components/App';

import Link from './../imports/ui/components/Link';
import Signup from './../imports/ui/components/Signup';
import NotFound from './../imports/ui/components/NotFound';
import Login from './../imports/ui/components/Login';
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }

});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

### Test... Problem Solved!
Try it now and you'll see the back button works as it should in the new browser tab

**note** If **you hold the history tab** (_cool tip_) you can see the full history and you can see that when you visit `localhost:3000` it was replaced with `localhost:3000/links`
