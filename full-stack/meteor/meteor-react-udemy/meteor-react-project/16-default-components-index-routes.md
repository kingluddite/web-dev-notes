# Default Components Index Routes
We are using React Router so that when they visit a different URL they will see a different set of Components on the screen to make them think and feel that they are navigating to a different HTML page or document

## Review of What we Accomplished thus far
![diagram of our components tree](https://i.imgur.com/0HJDjKn.png)

Showing your components in a tree like this diagram makes it much easier to see all the different routes you will have

* In our project `App` and `Header` will always be visible
    - To make this possible we set this code up in `client/main.js`

```
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/bins" component={BinsMain} />
    </Route>
  </Router>
);
```

And if you look inside of `App.js`

```
import React from 'react';

import Header from './Header';
import BinsList from './bins/BinsList';
export default (props) => {
  return (
     <div>
       <Header />
       {props.children}
     </div>
  );
}
```

You'll see our `Header` Component is contained inside of `App`

With this setup we can be sure that `App` and `Header` will always be visible no matter what

And inside our Router we have:

`<Route path="/bins" component={BinsMain} />`

Which means if a user goes the `http://localhost/bins` they will also see the `BinsMain` component

Two things happened when we nested the `/bins` route
* Our nested routes stack up so we have `/` and `bins` as our two routes
    - So now our nested route becomes`/bins`
    - 
* The second thing that happened is that whenever a user visits `/bins` the `BinsMain` Component was passed to parent component of `App` as `props.children` and then it was up to us to make sure that `props.children` got rendered inside of the `App` component as we did in `App.js`:

```
import React from 'react';

import Header from './Header';
import BinsList from './bins/BinsList';
export default (props) => {
  return (
     <div>
       <Header />
       {props.children}
     </div>
  );
}
```

## Houston our App has one problem!
We can't see the `BinsList` Component anymore

To fix this we can remove `import BinsList from './bins/BinsList';` inside of `App.js` because it is not really being used anymore inside of `App`

### Show App and BinsList Component in our router
![diagram of our components tree](https://i.imgur.com/0HJDjKn.png)

As our diagram shows we should see `App`, `Header` and `BinsList` when we are on the `/` home route

### The `indexRoute` of React Router
* We've already imported `BinsList` and `indexRoute` at the top of `client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import BinsMain from './components/bins/BinsMain';
import BinsList from './components/bins/BinsList';
import { Bins } from '../imports/collections/bins';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BinsList} />
      <Route path="/bins" component={BinsMain} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
```

* We added this line:

`<IndexRoute component={BinsList} />`

### Test in browser
You now see `BinsMain` Component when you are on the `/bins` route and when you are on `/` route you will see `App`, `Header` and `BinsList`. Nice!

**note**
* Whenever we have an `IndexRoute` if the parent has a child that is visible, then the `IndexRoute` is hidden
    - In other words, if we navigate to `/bins` the parent will have a child route of `BinsMain` and that will mean that our `IndexRoute` will be invisible
    - If the parent does not have any visible children, then the `IndexRoute` is visible and it is displayed on the screen
        + So if we visit `/` the parent Component does not have any children then the `IndexRoute` is displayed on the screen

## Next Challenge
Change our `bins` route to `bins/:binId`

