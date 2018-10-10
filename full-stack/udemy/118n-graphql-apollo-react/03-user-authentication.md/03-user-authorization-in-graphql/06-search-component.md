# Search
`components/Cologne/Search.js`

```
import React from 'react';

const Search = () => {
  return <div>Search</div>;
};

export default Search;
```

## Add Search route
`index.js`

```
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import Search from './components/Genealogy/Search';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        // MORE CODE
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
```

## Test
* Test and you'll see that the `navbar` is showing and as you click on nav links those pages are highlighted in `navbar`
* How does is the active link styled with CSS?

`App.css`

```
.active {
  font-weight: bold;
}
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add search component`

## Push to github
`$ git push origin auth` 
## Next - add the auth navbar
