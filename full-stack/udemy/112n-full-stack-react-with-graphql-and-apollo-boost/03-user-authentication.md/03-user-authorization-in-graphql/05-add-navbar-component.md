# Add Navbar Component
## Fragment
* New with React allows a parent empty element (otherwise you would have to use a container like `div` and if you didn't you would get an error but adding empty container just clutters up your code)

`components/Navbar.js`

```
import React from 'react';

const Navbar = () => {
  return <nav>Navbar</nav>;
};

export default Navbar;
```

`index.js`

```
import React, { Fragment } from 'react';
// MORE CODE

import App from './components/App';
import Navbar from './components/Navbar';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        // MORE CODE
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
```

* We put `Navbar` above Switch so it will be on all pages
* We put both `Switch` and `Navbar` inside `Fragment` to avoid error

## Unauthorized nav items
* This will show on logic if user not logged in

### NavLink vs Link
* `NavLink` gives us access to extra features using `react-router-dom`

```
// MORE CODE

import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <NavbarUnAuth />
    </nav>
  );
};

const NavbarUnAuth = () => (
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

// MORE CODE
```


