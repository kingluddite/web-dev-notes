# Search
`components/cologne/Search.js`

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
// MORE CODE

import Navbar from './components/sharedNavbar';
import Search from './components/cologne/Search'; // add

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <div id="wrapper">
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        // MORE CODE
      </Switch>
    <div id="wrapper">
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
