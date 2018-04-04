# React Router

## What is routing?
When you change the URL, the page that is rendered changes

[React Router 4](https://reacttraining.com/react-router/) - Allows you to show and hide items depending on what you want the user to see

We will create logic that says if I'm on the store page, show me the App Component, if I'm on the home page, show me the TeamPicker Component and if no matches show the 404 (which is the NotFound Component)

**note** Everything in React is a Component. Even the Router is a Component

**note** Our router will be a stateless functional component

* We store our Router in the `Root` variable which is a common naming convention
* We import BrowserRouter, Match and Miss from react-router
* `Match exactly pattern="/" />` - When I am on the home page
* You need to wrap your Matches inside a `div` to remove the `single React element child`
* If you are passing items other than "Strings" you need to wrap them inside `{}` curly braces

`index.js`

```
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/App';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={TeamPicker} />
        <Match pattern="/team/:teamId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
```

* We use `Match` to find patterns that match and when they do, send to that Component

* We added a `div` parent element inside `BrowserRouter` because we will get an error. Usually all rendered JSX needs one parent. You would think that BrowserRouter is one parent but it does not count as a parent in this particuluar case and you need to add a nested `div`
* We can set a dynamic URL in the pattern `/team/133434` would match the pattern
  - What the heck is `:teamId`?
    + That is how we create a dynamic route
=======
* We can set a dynamic URL in the pattern `/team/133434` would match the pattern

* If the pattern doesn't match, we send them to our 404
    - We make the NotFound Component. I made it a stateless functional component
    - We use `Miss` and point it to our NotFound Component

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

* We need to import this Component into our `index.js`
