# Refactoring Router Code
## Moving Time!
* We are going to move what we need from `client/main.js` into a new file `routes.js`
* This will keep our `client/main.js` lean and mean

## Create a new file 

`imports/routes/routes.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// import App from './../imports/ui/components/App';

import Link from './../ui/components/Link';
import Signup from './../ui/components/Signup';
import NotFound from './../ui/components/NotFound';
import Login from './../ui/components/Login';
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

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
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
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);
```

### Tracker.autorun()
* Knowing when a user has an authenticaton status change is very useful
* It won't just be useful for our `router` but other parts of our app

Cut all of the [router specific code](https://i.imgur.com/5m84Bux.png) and we will break it out into its own function and then we can call this function in `Tracker.autorun()`

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from './../imports/routes/routes';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

## Server side code refactoring
We want to do the same refactoring we did `client-side` on the `server-side`

### users.js
Create a new file `imports/api/users.js`

This file will be responsible for making the call to the `Accounts` method

`users.js`

```
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  try {
    new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    }).validate({
      email
    });
  } catch (e) {
    throw new Meteor.Error(400, e.message);
  }

  return true;
});
```

`server/main.js`

```
import { Meteor } from 'meteor/meteor';

import '../imports/api/users';

Meteor.startup(() => {

});
```

**note** We just pull in our `users.js` and it will execute the code. We are not pulling off any `named exports` or `default exports` and that is why we just provide a **relative path**

### Test
Your app should work just like it worked before but now it is structured better
