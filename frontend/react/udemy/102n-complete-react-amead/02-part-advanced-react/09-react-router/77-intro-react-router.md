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

`$ npm i react-router-dom`

## Create multiple pages for expensify app
* We'll import `react-router-dom`
* And we have access to a gaggle of named exports (see API of documenation page)

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
```

* We use `BrowserRouter` once to create the router
* We will use `Route` for each route to different pages

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
  - Use React Dev Tool to see that `BrowserRouter` is on page

## Add a Route
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
ReactDOM.render(routes, document.getElementById('root'));
```

* Will render `This is from the dashboard component yo!` to the browser
* If you don't provide a component you will get this error:

```
Warning: Failed prop type: Invalid prop 'component' supplied to 'Route': the prop is not a valid React component
    in Route
```

* **note** `BrowserRouter` must have a single element inside it
    - We have one child element inside BrowserRouter
    - Let's add another

## Add another route pointing to another "page" component
`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
  <div>This is from the dashboard component yo!</div>
);

const AddExpensePage = () => (
  <div>This is from the add expense component yo!</div>
);

const routes = (
  <Router>
    <Route path="/" component={ExpenseDashboard} />
    <Route path="/create" component={AddExpensePage} />
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
```

* **note** This use to cause an error because `BrowserRouter` was only allowed to have one child but looks like this is no longer an issue as it works
* **note** It is common to use an **alias** and rename `BrowserRouter` to `Router` (less letters to type)
* **note** Below shows where you may see people putting a `div` inside BrowserRouter (no longer necessary)

```
 // MORE CODE

const ExpenseDashboardPage = () => (
  <div>This is from the dashboard component yo!</div>
);

const AddExpensePage = () => (
  <div>This is from the add expense component yo!</div>
);

const routes = (
  <Router>
    <div>
      <Route path="/" component={ExpenseDashboardPage} />
      <Route path="/create" component={AddExpensePage} />
    </div>
  </Router>
);
ReactDOM.render(routes, document.getElementById('root'));
```

## Checking our routes
* All works well on home page `/` route
* But if you **manually** navigate to `/create` (in browser) you will get an error

## Houston we have a problem!
* **important concept** We want to navigate via **client side route** but by default we are navigating to **server side route** and that will give us a 404 because that route does not work because it does not exist
* The first time we visit our app:
  - The browser needs to grab the initial HTML
  - And load the JavaScript
  - BEFORE it can do anything (before the react router code even runs)
      + And that's what's happening here
      + The browser's trying to fetch `/create` from the server and the server is saying that it doesn't exist and that is why we are getting `Cannot GET /create`

![GET error](https://i.imgur.com/824ifBR.png)

### Good Question: Why we don't get a 404 server error when we use "/"?
* Because when you visit the root route `/` of most web servers, if there is an `index.html` file available, it will serve that as the default

## Tell the server about our client side routs (SOLUTION)
* We need to make an adjustment to our dev server configuration
* We need to send back `index.html` FOR ALL ROUTES
  - And then let react router decide what should be shown to the screen

### We need to make a config change to `webpack.config.js`
* So all routes point to `index.html` and React Router decides what to do
* Change this

`webpack.config.js`

```
// MORE CODE
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
};
```

* To this:

`webpack.config.js`

```
// MORE CODE
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }
};
```

* And that it should return `index.html` for all 404 routes

## We just told the dev-server to handle our routing via our client-side code
* We're doing this the "Client-Side" Way!
* This tells the dev server that we're going to handle routing via our client-side code

### Save and restart dev server
* Visit `http://localhost:8080/create`
* And you will see this on the screen (the `/create` route content:

```
This is from the dashboard component yo!
This is from the add expense component yo!
```

## Houston we have a problem
* It is showing **both** routes content!
* React Router only cares if our route starts with `/`, that's a match so it shows the home page
  - it it matches /create so it shows that page
  - You also see both pages with /create/some/other/page

### Add `exact` Route prop
* When react router matches our paths it just cares if the path at least starts with whatever we have so since both our paths start with `/` that is a match so it will show both components from 2 different paths
* If we have 10 routes we would show all 10 components
  - This is obviously bad and not what we want
  - You would also get a match with `/create/other/route` since it starts with `/`
  - We need a way to tell the Route to exactly match

## Fix problem by adding `exact`
* [exact docs](https://reacttraining.com/react-router/web/api/Route/exact-bool)
* When we set `exact` it changes how matching works
* `exact` is **false** by default
* Set it to **true**

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

### exact={true} is same as exact
`<Route path="/" component={ExpenseDashboardPage} exact={true} />`

* **Efficiency tip** Save's time and space!

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

## Recap
* Learned how to use ReactRouter
* When we have our first page load we are using server side routing
  - You can see this when you visit `localhost:8080/create` and we get that strange error `Cannot GET /create` in the browser and in the console we see the 404 GET error saying `http://localhost:8080/create` is not found. That route doesn't exist on our server
  - The first time we visit our application the browser needs to grab the initial HTML and load the JavaScript before it can do anything (before the react router code even runs)
  - We need to tell our dev-server to send back `index.html` for all routes
    + When I go to the root route `/' of my app I want to serve up `index.html` and let react router figure out what component should be shown
    + If I go to the `/create` route I want to serve up `index.html` and let react router determine what component to show in the browser

`webpack.config.js`

```
// MORE CODE
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }
};
```

* Above tells our dev-server that we'll be handling routing via our client side code and that it should return `index.html` for all 404 routes
* We will learn how to do this in production later on but for now this is how we set this up in development
