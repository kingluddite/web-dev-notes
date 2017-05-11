# Logging out and tracking Auth Status
We have `Signup` and `Login` wired up and now we will wire up the log out

## Tracking a user's authentication status over time
* When someone has their browser open and they log in we want to do something when that login event finishes
* We want to redirect them to the links page
* We also want to run custom JavaScript whenever someone logs out

## Tracker.autorun()
To do this we'll have to use `Tracker.autorun()` which we used before

`Link`

```
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Link extends Component {
  onLogout() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <h1>Short Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
};

export default Link;
```

* We'll remove:
    - The `browserHistory` import
    - The `browserHistory.push('/')`
* We'll import `Accounts`

`Link`

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

class Link extends Component {
  onLogout() {
    console.log('logout');
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <h1>Short Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
};

export default Link;
```

## Test it out
1. Log in 
2. Click the `Log Out` button
3. Test if `user()` and `userId()` work in the browser
  * They both should be **null** after logging out
4. Log in and see if they exist
5. Log out and make sure they are **null**

## localStorage
If you log in and refresh the browser you will still be logged in because this information is persisted under `localStorage`

### What the heck is localStorage?
`localStorage` is a **key-value** store

This is great because we can store a token item and set it equal to some value and at some later point in time I can fetch it out of `localStorage`

### Type this in the console

`> localStorage.`

You will see a bunch of methods

![localStorage methods](https://i.imgur.com/w7MV2hf.png)

## set localStorage
`> localStorage.setItem('favSport', 'soccer');`

## get localStorage
`> localStorage.getItem('favSport');` --> "soccer"

Refresh the browser and try to get the `favSport` again from `localStorage` and you will see it persists

**Meteor** uses this exact same technique to store the `token`

`> localStorage`

* We have `Meteor.loginToken`
* `Meteor.loginTokenExpires`
* `Meteor.userId` (_userId of currently logged in user_)

When you log out, this information will no longer be available

## Tracker.autorun()
* In the Score Keep app we were using `Tracker.autorun()` to watch one of our database queries (_where we fetched all of the players_)
* If that result changed (_whether a player got added, removed or updated_) that `Tracker.autorun()` **callback** re-ran and we were able to re-render the browser with the latest information
* We will use a similar but slightly different technique

### Here's what we will do differently
* Instead of watching a query we are going to watch that `Meteor.userId()` method
* When it returns something different we are going to rerun our callback function
* If it goes from **null** to a string we know someone `logged in`
* If it was a string and now it's **null** we know someone `logged out`
* That will enable us to update the browser based on a change to the authentication status

### We need to import Tracker!
To use `Tracker.autorun()` - You know the drill by now :)

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker'; // add this line
// more code
```

* `isAuthenticated` will store the user's authentication status (_true = authenticated, false = not authenticated_)

## Not Not. Who's There?
`const isAuthenticated = !!Meteor.userId();`

This is a [very common technique](http://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript) to generate a **Boolean** value

![get boolean value](https://i.imgur.com/iX2ZEVX.png)

We take a `Truthy` value (_a string with content_) and we convert it to a **Boolean** value

### What is Truthy/Falsey?
[answer](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

`> !!''` - returns `false`

`> !!null` - returns `false` (_what we'll get back if user is not logged in_)

So now we can have a real **Boolean** stored inside `isAuthenticated` and have it updated as that status changes

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

import Link from './../imports/ui/components/Link';
import Signup from './../imports/ui/components/Signup';
import NotFound from './../imports/ui/components/NotFound';
import Login from './../imports/ui/components/Login';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />
    <Route path="*" component={NotFound} />
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

### Test
This code will rerun when we login and out

1. Log in and you'll see `true` in **console**
2. Log out and you'll see `false`

**note** Notice both values remain persistent even after page refresh

### What page is the user on?
* Knowing who is authenticated is not enough
* We also need to know what page they are on

We can get the page the user is on using `browserHistory`

### Test browserHistory
`client/main.js`

Add it to the Global Window scope `client/main.js`

`window.browserHistory = browserHistory;`

`getCurrentLocation()` returns useful information but right now we need **pathname**

[In your app](https://i.imgur.com/5XuwvsS.png) go to different pages and run `> browserHistory.getCurrentLocation()`

Whatever page you are on you will see that inside **pathname**

Using `isAuthenticated` and `browserHistory.getCurrentLocation()` we can figure out how to properly redirect a user

```
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname; // add this line
  console.log('isAuthenticated', isAuthenticated);
});
```

### Define what pages serve what purposes
We will do this using two arrays

* `unauthenticatedPages` - Pages a user should be able to visit if they are not logged in `['/', '/signup']`
* `authenticatedPages` - Pages only accessible if user is logged in `['/links]`

```
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
```

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

import Link from './../imports/ui/components/Link';
import Signup from './../imports/ui/components/Signup';
import NotFound from './../imports/ui/components/NotFound';
import Login from './../imports/ui/components/Login';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />
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
    browserHistory.push('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
  // if private page and not logged in - kick them out
    browserHistory.push('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

### Test it out
1. Log in and you should be taken to the `links` URL
2. Logout and you should be taken to the home URL `/`
3. If you try to go to `/signup` (_and you're logged in_), you will be redirected to `/links`

**note** You can go to 404 pages at any time whether you are logged in or out

## Houston we have a problem
It works but if you log out and then hit the back button in the browser you can get back to the `/links` URL

We just exploited our apps security. This is because the authentication hasn't changed, we just changed the route. We need to run some code when someone visits a route and make sure they have access to that page

## Next
Fixing our routing security issue



