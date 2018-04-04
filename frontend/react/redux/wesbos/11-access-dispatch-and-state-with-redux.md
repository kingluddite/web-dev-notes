# Accessing Dispatch and State with Redux
How do I get my `state` to go into `Main`

## Regular React
In regular **React** we take the element in what ever level it lives on (_let's say we are talking about the `Provider` element_) and we pass it down every single level and you keep going until you finally get to the thing that you want (like `Single` or `PhotoGrid`)

## The Redux Way
**Redux** gives us `connect` and `connect` will allow us to inject that **data** at whatever level we actually need it and then we can pass it on down or if it is a couple more levels deeper than that, we can connect it at whatever level we need the actual data

We will connect the data to the Component that we need (Main). And that is the Component we need to inject the data into

## We need to tap into our actionCreators
* `increment()`
* `addComment()`
* `removeComment()`

### So how can we expose these functions to buttons
### How do we expose the data to our Component?
That is where React connect comes in

`Main` Component is essentially a presentational Component (_just HTML/DOM markup_). We are going to take this `Main` Component and infuse it with the `actionCreators` as well as the **data**

* And the way we do that is we create a second Component that will kind of `sprikle` the stuff on top

## Create `App.js`
`$ touch client/Component/App.js`

`App.js`

```js
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from '.Main';
```

**note** Using `*` which will pull all three exported functions from `actionCreators.js`

## Now we need to make our App Component

`const App = connect(mapStateToProps, mapDispatchToProps);`

* We imported `connect()` from **react-redux**
    - It takes two arguments
        1. `mapStateToProps` (posts and comments)
        2. `mapDispatchToProps` (actionCreators)

Both of those functions will take the `state` (our `posts` and `comments` and our **dispatch**) and our `dispatch` (our `actionCreators`) and it will surface those **data** and the functions via `props` in our Component

```js
function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
```

## Export so it is available to other files

`export default App;`

### Final App.js
```js
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps);

export default App;
```

## We need to change `Main` Component in `reduxstagram.js` to `App`

`reduxstagram.js`

```
import React from 'react';

import { render } from 'react-dom';

// import css
import css from './styles/style.styl';

// import Components
import App from './Components/App';
import Single from './Components/Single';
import PhotoGrid from './Components/PhotoGrid';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" Component={App}>
      <IndexRoute Component={PhotoGrid}></IndexRoute>
      <Route path="/view/:postId" Component={Single}></Route>
    </Route>
  </Router>
  </Provider>
)

render(router, document.getElementById('root'));
```

## One last change
App.js

Change this:

```js
const App = connect(mapStateToProps, mapDispatchToProps);
```

To this:

```js
const App = connect(mapStateToProps, mapDispatchToProps)(Main);
```

### What does that do?
It will take our regular `Main` Component (just a `div`, `h1`, `Link`, and child Components) and it will add all the **props**, all the **data** from `state to props` (mapStateToProps) and it will add all of our `actionCreators` **dispatch to props** as well

But if we click on `Provider` > `Router` > `RouterContext` > `Connect(Main)` > Main

Then we see all the info we could possibly want under the `Props`

Some things we have access to:

* addComment()
* posts
    - All the **data** we have about the `posts`
* comments
* removeComment()
* increment()

All of our **actionCreators** all of our data is now available to our `Main` Component and that was done because we used `connect`

So if you ever groaned about having to have to pass data down to React Components multiple levels, you still do have to pass down **data** from Component to Component if it's just a couple of levels deep

But in this case we have five levels deep we'd have to pass down our `props` and passing that down is a pain so rather than doing that in those cases you can simply `connect` it and `connect` will **inject** the **data** from our `store` into whatever level Component that we need
