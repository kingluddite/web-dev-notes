# Setting up routes
We will set up routes

![set up routes diagram](https://i.imgur.com/czlwVsG.png)

* `/` - root
* `/signup`
* `/links`
* `/blabla` - 404

We're working on a **client-side** router so we'll spent most of our time inside `client/main.js`

### browserHistory
There are few different types of histories

We will be using the **HTML5 history API**. It let's us have really clean URLS (like `/signup`)

#### hashHistory is dead
* You could also use hash history `/#/signup`
* It works fine for the most part but don't use it because hash routing is dead

### Apps using browserHistory
Twitter uses **browserHistory** to switch **URLs**, we can render something new without going through a whole page refresh

### Starting with React Router
`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import App from './../imports/ui/components/App';
import Link from './../imports/ui/components/Link';
import Signup from './../imports/ui/components/Signup';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Signup}/>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

You will see `Signup` on the page but if you change the url to anything other than `/` you will see nothing show up (_**React Router** will show you a warning that no routes match_)

## Exercise
Add a new route that will point to `/links` and shows the `Link` Component

Make sure both routes show their respective Components

### Solution
`client/main.js`

```
const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup}/>
    <Route path="/links" component={Link}/>
  </Router>
);
```

## Create a base route
When someone comes to our home page `/`

## Create 404 route
When creating Components now that you know how easy they are to create, just duplicate a working component and change the names

`NotFound.js`

```
import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return(
      <div>
        NotFound
      </div>
    );
  }
};

export default NotFound;
```

### Import it into `client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import App from './../imports/ui/components/App';
import Link from './../imports/ui/components/Link';
import Signup from './../imports/ui/components/Signup';
import NotFound from './../imports/ui/components/NotFound';

const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup} />
    <Route path="/links" component={Link} />
    <Route path="*" component={NotFound} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

* `<Route path="*" component={NotFound} />`
    - This finds a pattern of anything, so it not routes are matching we send the user to the `NotFound` Component
    - Test it in the browser and you'll find any non-match route gets our 404 page

## Create Login route `/login`

`Login.js`

```
import React, { Component } from 'react';

class Login extends Component {
  render() {
    return(
      <div>
        Login
      </div>
    );
  }
};

export default Login;
```

Add `/` route and point to `Login` Component

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import App from './../imports/ui/components/App';
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

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

Browse to `/` of your app and you should see `Login` on the screen

**note** **Router** and **Route** are both Components
