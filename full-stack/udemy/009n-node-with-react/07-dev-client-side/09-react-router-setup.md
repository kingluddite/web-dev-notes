# React Router setup
* Based on the route the user is visiting we want to show different content on the screen
* User comes to `ourdomain.com/` show this:

![landing page mockup](https://i.imgur.com/vgNLRjJ.png)

* When user navigates to `ourdomin.com/surveys` show this:

![surveys mockup](https://i.imgur.com/0NOAVYD.png)

* When user comes to `ourdomain.com/surveys/new` show this

![surveys new mockup](https://i.imgur.com/rLDQQ4x.png)

## Let's set up some Routes!
* A route is a pairing between the address the user is looking at
* And the Components that should be displayed on the screen at any given time
* `App.js` is responsible for our that initial view layer setup
* And our top level `index.js` file is responsible for all Redux setup (data setup) of our Application
* `react-router-dom` contains a set of React Router helpers specifically themed around enabling you to navigate around the DOM (or at least an environment that uses the browser DOM)
    - There is also `react-router-native` which is used with React Native
    - There is also the core React Router library
        + The core React Router library contains some logic that is shared between both React-router-dom and react-router-native libraries
        + In the end, any app we ever create we really only care about `react-router-dom` and we don't have to worry about those other two
* We are going to import `BrowserRouter` and `Route`
    - `BrowserRouter` - Think of this as the brains of React Router
        + It is what tells React Router how to behave
        + It is what looks at the current URL
        + And then changes the set of components that are visible on the screen at any given time
    - `Route` - Is a React Component that is used to set up a rule between a certain route that a user might visit inside our Application and a set of Components that will actually be visible on the screen

## Set up Some Dummy Components
`App.js`

```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return <div>Hi There!</div>;
};

export default App;
```

