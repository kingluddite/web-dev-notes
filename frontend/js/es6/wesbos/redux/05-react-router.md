# React Router
## How it works
Render out the Router to the page and then it will dictate which Components render based on routes in URL

### Import our Components
`Main.js`

```
// import components
import Main from './components/Main';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';
```

### Import Dependencies we need from React Router
* Router
* Route
* IndexRoute
* browserHistory

```
// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
```

**note** We are just using browserHistory temporarily

* We will eventually put Redux into that browserHistory

## Change our render to point to `router`

**tip** Rendering multiple lines of JSX use parenthesees

```
const router = (
 // JSX here!
)
```

**note** The router in React is also a Component!

### This allows us to do HTML5 push state
```
const router = (
  <Router history={browserHistory}>
    
  </Router>
)
```

## Point our home page to the Main app
```
<Route path="/" component={Main}>

</Route>
```

At the very top level of our app, use the `Main` Component

## How our app will work
Main will always be visible in our app but nested inside it will either be our Single component or our PhotoGrid component. How can we tell our router to route this way? Through nesting routes

### Nesting routes
```
<Route path="/" component={Main}>
  <IndexRoute component={PhotoGrid}></IndexRoute>
  <Route path="/view/:postId" component={Single}></Route>
</Route>
```

* If we are on the home `/` route, show the `Main` and `PhotoGrid` Components
* If we are on `/view/:postId` route, show `Main` and `Single` Components

**note** PhotoGrid and Single are children of the Main Component. That is why inside our Main Component we used the `this.props.children` and passed it `this.props`

`Main.js`

```
const Main = React.createClass({
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Reduxstagram</Link>
        </h1>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
});
```

If we view our app in the browser we will have an error but if we change to point our render to `router` inside of `<Main />`, the error will disappear

```
const Main = React.createClass({
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
Error is gone and our app is working

### View React tab
* You will see Router is works
* You will see Main Component and on home page you will also see PhotoGrid Component
* If you go to a URL with something like this (it matches our router pattern for the Single Component) `http://localhost:7770/view/34234234`, you will see the Main and Single Components
* If you dive into the React inspector and highlight Single Component then hit the back button and switch back and forward buttons you will see how fast react changes the DOM by swapping out the Components necessary to match the routers. How cool is that?!

**note** the HTML5 push state is in charge of swapping this out, and it does it without a page refresh!


