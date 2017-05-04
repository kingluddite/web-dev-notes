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

We will be using the **HTML5 history API**. It let's us have really clean URL's (like `/signup`)

#### hashHistory is dead
* You could also use hash history `/#/signup`
* It works fine for the most part but don't use it because **hash routing** is dead

### Apps using browserHistory
* Twitter uses **browserHistory** to switch **URLs**
* We can render something new without going through a whole page refresh

### Starting with React Router

#### Let's link between two "pages"
* The concept of "pages" are different in the world of React
* We don't link to different HTML pages
* We have Components and we render them to the screen
* Depending on the `Client-side` router we render different Components based on the URL
* The user thinks they are going to different pages but we know better :)

##### Link.js
Duplicate `Signup.js` and name it `Link.js` and place it inside the `components` folder

`Link.js`

```
import React, { Component } from 'react';

class Link extends Component {
  render() {
    return (
      <div>
        Link
      </div>
    );
  }
};

export default Link;
```

* Don't import it just yet! We will do that soon I promise

Functional stateless Component - Our Router!

```
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Signup}/>
  </Router>
);
```

* We'll plugin this into `client/main.js` and if it works it should show our `Signup` Component when we visit our `root URL` --> **localhost:3000**

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
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

* You will see `Signup` on the page
* If you change the **URL** to anything other than `/`
    - Try visiting `http://localhost:3000/bla` and you will see nothing show up
    - But if you check out the Chrome console (_This is the `Client` telling you information about itself you will see a warning letting you know that no routes match_)
* `/` is our `Base root` (_aka Home Page_)

![no routes match](https://i.imgur.com/gQMWZv6.png)

## Exercise
Add a new route that will point to `/links` and shows the `Link` Component

Make sure both routes show their respective Components

<details>
  <summary>Solution</summary>
`client/main.js`

```
const routes = (
  <Router history={browserHistory}>
    <Route path="/signup" component={Signup}/>
    <Route path="/links" component={Link}/>
  </Router>
);
```
</details>

## Create 404 route
When creating Components now that you know how easy they are to create, just duplicate a working component and change the names

`NotFound.js`

* This doesn't need to be a class-based Component so we can make it a **Stateless functional component**
* We'll learn the difference between the two and when to use each

```
import React from 'react';

export default NotFound = () => {
    return(
      <div>
        NotFound
      </div>
    );
};
```

### Import it into `client/main.js`

```
// more code
import NotFound from './../imports/ui/components/NotFound'; // add this line

// more code
```

* `<Route path="*" component={NotFound} />`
    - This finds a pattern of anything, so it not routes are matching we send the user to the `NotFound` Component
    - Test it in the browser and you'll find any non-match route gets our 404 page

## Create Login route `/login`
* We will make Login Component and make it be the first Component our user see so we'll set that as our base route
* We'll add a `/signup` route

`Login.js`

```
import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        Login
      </div>
    );
  }
};

export default Login;
```

### Updating our Routes

`client/main.js`

```
// more code
import Login from './../imports/ui/components/Login'; // add this line

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

* Browse to `/` of your app and you should see `Login` on the screen
* `/signup` will show you `Signup`
* `/links` will show you `Link`
* `/abc` will show you `NotFound`

**note** **Router** and **Route** are both Components
