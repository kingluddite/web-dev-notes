# React Router

## What is routing?
* When you change the URL, the page that is rendered changes

[React Router 4](https://reacttraining.com/react-router/)

* Allows you to show and hide items depending on what you want the user to see
* We will create logic that says:
    - If I'm on the store page, show me the `App`
    - If I'm on the home page, show me the `TeamPicker` a
    - If no matches show the 404 (which is the NotFound Component)

## Everything in React is a Component
* Even the Router is a Component

**note** Our router will be a Stateless Functional Component (SFC)

* If you are passing items other than "Strings" you need to wrap them inside `{}` curly braces
* 

`index.js`

```
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TeamPicker from './TeamPicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TeamPicker} />
      <Route path="/team/:123" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
```

* We can set a dynamic URL in the pattern `/team/133434` would match the pattern

## What the heck is `:teamId`?
* That is how we create a dynamic route
* We can set a dynamic URL in the pattern `/team/133434` would match the pattern
* If the pattern doesn't match, we send them to our `404`
    - We make the `NotFound` Component a Stateless Functional Component
    - We use `Miss` and point it to our `NotFound` Component

```
import React from 'react';

const NotFound = (props) => {
  return (
    <header className="top">
      <h1>Not Found</h1>
    </header>
  )
}

export default NotFound;
```

* We need to import this Component into our `index.js
