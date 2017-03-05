# Integrate our Store with React Router

## Tell our router about our `store`

`/client/reduxstagram.js`

### Bind React and Redux together
```
// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // add this line
```

Redux can work with anything, not just React. Here we add the Provider which binds them together

### Import our `store`
`import store from './store';`

### Import the `named export` of our browserHistory
Using our `history` variable (We created this in `store.js`)

`import store, { history } from './store'`

And our `client/reduxstagram.js` should look like this now:

```
import React from 'react';

import { render } from 'react-dom';

// import css
import css from './styles/style.styl';

// import components
import Main from './components/Main';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={PhotoGrid}></IndexRoute>
      <Route path="/view/:postId" component={Single}></Route>
    </Route>
  </Router>
)

render(router, document.getElementById('root'));
```

## View in browser
React and Redux should now be working

In `posts.js` and `comments.js` we use `console.log()` to give us the state and action and our console is giving us both

It is a whole bunch of info (If we opened an object we could see all our posts)we can't make sense of yet but it is a good start

### How can we get all of our actions firing?
* incrementing likes
* adding/removing comments

`reduxstagram.js`

Wrap our router inside `<Provider store={store}></Provider>`

```
const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
      <IndexRoute component={PhotoGrid}></IndexRoute>
      <Route path="/view/:postId" component={Single}></Route>
    </Route>
  </Router>
  </Provider>
)
```

## swap our history
We will now swap out our `browserHistory` with our `history`

```
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
      <IndexRoute component={PhotoGrid}></IndexRoute>
      <Route path="/view/:postId" component={Single}></Route>
    </Route>
  </Router>
  </Provider>
)
```

### Test to see if what we did actually works
View app in browser, check React tab, click on Provider element and you will see the `store` exists under Props

![our store exists](https://i.imgur.com/EKpp2OM.png)

### Console test
After clicking Provider element in React tab, switch to console and clear.

Type `$r` and you'll see Provider
`$r.store` shows you our entire store

`$r.store.getState()` - drill down to see all elements inside our store

![our store](https://i.imgur.com/No1zCVG.png)

## What's next?
How do we actually dispatch the actions that we have in actionCreators in order to update our actual state


