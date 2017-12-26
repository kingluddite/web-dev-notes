# Intro to React Router
* Not just for React
    - Android
    - IOS
    - Web
* [learn about more](https://reacttraining.com/react-router/)

## Install React Router
* We could install `react-router` but that has mobile stuff built into it
* Since we are only working on desktop we can install `react-router-dom` instead
* If you were only building for mobile you would install `$ yarn add react-router-native`

`$ yarn add react-router-dom`

* It is a big download and will take time

## Create multiple pages for expensify app
* We'll import react-router-dom
* And we have access to a gaggle of named exports (see API of documenation page)

`app.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
```

* We use BrowserRouter once to create the router
* We will use Route for each route to different pages

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const routes = <BrowserRouter />;
ReactDOM.render(routes, document.getElementById('app'));
```

* That is a bare-bones use of React Router and we will see a blank page
* There are no errors in the console
* It is empty because we provided no instances of the Route component

## Route
`<Route path component />`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
  <div>This is from the dashboard component yo!</div>
);

const routes = (
  <BrowserRouter>
    <Route path="/" component={ExpenseDashboardPage} />
  </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));
```

* Will render `This is from the dashboard component yo!` to the browser
* BrowserRouter must have a single element inside it
    - So create a `div` inside `BrowserRouter` and nest  `<Route>` s inside it

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
  <div>This is from the dashboard component yo!</div>
);

const AddExpensePage = () => (
  <div>This is from the add expense component yo!</div>
);

const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={ExpenseDashboardPage} />
      <Route path="/create" component={AddExpensePage} />
    </div>
  </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));
```

* All works well on home page `/` route
* But if you manually navigate to `/create` you will get an error

## Houston we have a problem
* We want to navigate via client side route but by default we are navigating to server side route and that will give us a 404 because that route does not work
* The first time we visit our app the browser needs to grab the initial html and load the javascript before it can do anything (before the react router code even runs)
    - And that's what's happening here
    - The browser's trying to fetch `/create` from the server and the server is saying that it doesn't exist and that is why we are getting `Cannot GET /create`

### Why it doesn't cause 404 when we use "/"?
Because when you visit the root route `/`  of most web servers, if there is an `index.html` file available, it will serve that as the default

## How do we fix this?
* We need to make an adjustment to our dev server configuration
* We need to send back `index.html` FOR ALL ROUTES and then let react router decide what should be shown to the screen

### We need to make a config change to `webpack.config.js`
* So all routes point to `index.html` and React Router decides what to do
* Change this

```
// MORE CODE
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

To this:

```
// MORE CODE
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }
};
```

* This tells the dev server that we're going to handle routing via our client-side code
* And that it should return `index.html` for all 404 routes
* Save and restart dev server
* Visit `http://localhost:8080/create`
* And you will see this on the screen (the `/create` route content:

```
This is from the dashboard component yo!
This is from the add expense component yo!
```

## Houston we have a problem
* It is showing both routes content
* React Router only cares if our route starts with `/`, that's a match so it shows the home page
  - it it matches /create so it shows that page
  - You also see both pages with /create/some/other/page

### Fix problem by adding `exact`
* `exact` is **false** by default
* Set it to true

`app.js`

```
// MORE CODE
const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
    </div>
  </BrowserRouter>
);
// MORE CODE
```

* Visit `http://localhost:8080/` and you'll see the home route

## Challenge
* Add /edit route pointing to EditExpensePage
* Add /help route pointing to HelpPage

### Solution
```
// MORE CODE
const EditExpensePage = () => <div>This is the edit expense page</div>;

const HelpPage = () => <div>This is the help page</div>;

const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpensePage} />
      <Route path="/edit" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
    </div>
  </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));
```


