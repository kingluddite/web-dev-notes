# More React Router
## Tree diagram
![tree diagram](https://i.imgur.com/LmVQoID.png)

## Create new BinsMain.js
`client/components/bins/BinsMain.js`

```
import React, { Component } from 'react';

class BinsMain extends Component {
  render() {
    return (
      <div>BinsMain</div>
    );
  }
}

export default BinsMain;
```

## How can we get `BinsMain` to show up using React Router?
We need this to show up whenever user visits route `bins/abcd` (aka `bins/whatever-the-bin-id-is`)

And we want this to be shown within the `App` Component because this is the only one that also shows the `Header` Component

## Add imports to `main.js`
`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import BinsMain from './components/bins/BinsMain'; // add this line
import BinsList from './components/bins/BinsList'; // add this line
import { Bins } from '../imports/collections/bins';
```

## Add Nested Route

`client/main.js`

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
      <Route path="/bins" component={BinsMain} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
```

`App.js`

This is our current code

```
import React from 'react';

import Header from './Header';
import BinsList from './bins/BinsList';
export default () => {
  return (
     <div>
       <Header />
       <BinsList />
     </div>
  );
};
```

We currently have `BinsList` showing at all times and we know longer want this to be the case.

We want `App` to be able to show any arbitrary child component that we want to pass to it. So, from now on, `App` is going to act more like a wrapper of sorts.

### `{props.children}`
To make sure that `App` renders any child that is passed to it, we will replace `<BinsList />` in the above code with `{props.children}` instead

`App.js`

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

* We also pass `props` to the default export

### Test in browser
You will see that `/` home path works and if you manually enter `/bins` that we now see the `BinsMain` text
