# React Router
* We completed user authentication
* We can create and delete bins
* Our landing page is complete

* We now need to focus on the bin editor page where we can:
    - The screen that allows a user to edit markdown in a bin
    - See the compiled markdown
    - Also can share a bin

![wireframe review](https://i.imgur.com/Z5EwCmN.png)

Our right wireframe is completed

We now ded to focus on the editor wireframe on the left

* The view the user sees is dictated by the route they are visiting
    - `/bins/:binId` vs `localhost:3000/`
* We need to somehow map the URL the user is visiting to a set of components to display on the screen
    - We will use the popular library called `React Router`

## What is the purpose of React Router?
To look at a URL in the address bar and map it to a set of components

React Router is a 3rd party library and we'll need to install it as a **npm module** to make use of it

### Install React Router
`$ npm install --save react-router`

### How do we user React Router
The key thing to remember here is React Router displays different sets of Components based on the URL

* To do this we will create a mapping of different routes that a user can visit

### Import React Router
`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; // add this line
```

#### Add the `routes` variable
```
const routes = (
    
);

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.render-target'));
});
```

* The `routes` variable is going to contain all of the mappings to different URLs and components that we'll display

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import { Bins } from '../imports/collections/bins.js';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
```

**note** we pass the variable `routes` to ReactDOM.render() and we are not passing JSX like we has before with `<App />`

The `<Router>` tag is the top level tag in the mapping. We pass it a single prop balled `history`
The `browserHistory` object tells the Router how it should keep track of the URL

Within the Router tag we place an assortment of Route tags (_currently we only have one route_)

* Each `<Route>` tag gets exactly two properties
    1. path
    2. component

`<Route path="/" component={App}>`

Can be read as create a new path whenever a user visits `/` (this is `localhost:3000`) aka (_home page/ home route_) and show the Component App

## React Router bugs
React Router 4 is new and they are making lots of changes. Until it is stable use and install this version to replace version 4 of React Router

`$ npm i --save react-router@3.0.2`

That will fix the error




