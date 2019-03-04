# Add Navbar Component

`components/shared/Navbar.js`

```
import React, { Component } from 'react';

class Navbar extends Component {
  render() {

    return (
      <div>Navbar</div>
    )
  }
}

export default Navbar;
```

## Fragment
* New with React allows a parent empty element (otherwise you would have to use a container like `div` and if you didn't you would get an error but adding empty container just clutters up your code)
* 
`index.js`

```
import React, { Fragment } from 'react';
// MORE CODE

import App from './components/App';
import Navbar from './components/shared/Navbar';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/elements" component={Elements} />
        <Redirect to="/" />
      </Switch>
      <Footer />
  </Router>
);

// MORE CODE
```

* This will generate an error where Router is only allowed one child
* Let's fix this with Fragment

```
import React, { Fragment } from 'react';
// MORE CODE

import App from './components/App';
import Navbar from './components/shared/Navbar';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/elements" component={Elements} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

// MORE CODE
```

* There is a shortcut for using Fragment (remember you need to use the latest React which Create React App is using)

```
import React from 'react';
// MORE CODE

import App from './components/App';
import Navbar from './components/shared/Navbar';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/elements" component={Elements} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  </Router>
);

// MORE CODE
```

## Switch from Fragment to div
* But we will use a `div` and as we'll style it to center our web app

```
import React from 'react';
// MORE CODE

import App from './components/App';
import Navbar from './components/shared/Navbar';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <div id="wrapper">
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/elements" component={Elements} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  </Router>
);

// MORE CODE
```

* We put `Navbar` above `Switch` so it will be on all pages
* We put both `Switch` and `Navbar` inside `Fragment` to avoid an error

## Unauthorized nav items
* This will show on logic if user not logged in

### NavLink vs Link
* `NavLink` gives us access to extra features using `react-router-dom`
* One feature is it makes it easy to see what is the active page
  - It adds a className of `active` on the active page that we can target with CSS

`Navbar.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <NavbarUnauth />
    </nav>
  );
};

const NavbarUnauth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

export default Navbar;
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add navbar component`

## Push to github
`$ git push origin auth`
