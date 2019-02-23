# Add Navbar Links for Auth User

## Create NavbarAuth
* This will be nav links for when user is logged in

`Navbar.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <NavbarAuth />
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

const NavbarAuth = () => (
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
      <NavLink to="/cologne/add">Add Cologne</NavLink>
    </li>
    <li>
      <NavLink to="/profile">Profile</NavLink>
    </li>
    <li>
      <button>Signout</button>
    </li>
  </ul>
);

export default Navbar;
```

## Test it in browser
* Now we see our `NavbarAuth`

## AddCologne
* Create it inside our `cologne` folder
* It will be a SFC (stateless functional component)

`components/cologne/AddCologne.js`

```
import React from 'react';

const AddCologne = () => {
  return <div>Add Cologne</div>;
};

export default AddCologne;
```

* But I like to always make class based components (CBC) so I transform it from a SFC to a CBC

`AddCologne.js`

```
import React, { Component } from 'react';

class AddCologne extends Component {
  render() {
    return <div>Add Cologne</div>;
  }
}

export default AddCologne;
```

## Create Profile component
* Create a new `profile` folder

`components/profile/Profile.js`

```
import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return <div>Profile</div>;
  }
}

export default Profile;
```

## Import both components so we can use them in our routes
`index.js`

```
// MORE CODE

import Search from './components/cologne/Search';
import AddCologne from './components/cologne/AddCologne';
import Profile from './components/profile/Profile';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/cologne/add" component={AddCologne} />
        <Route path="/profile" component={Profile} />
        // MORE CODE
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
```

## Test in browser
* Make sure your new components are correctly loading

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add navbar auth user links`

## Push to github
`$ git push origin auth` 

## Next - Make Navbar dynamic 


