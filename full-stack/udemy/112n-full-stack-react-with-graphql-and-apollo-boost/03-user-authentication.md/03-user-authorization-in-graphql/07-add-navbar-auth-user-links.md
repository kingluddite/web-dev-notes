# Add Navbar Links for Auth User
## How does is the active link styled with CSS?


`App.css`

```
.active {
  font-weight: bold;
}
```

## Create NavbarAuth
* This will be nav links for when user is logged in

`Navbar.js`

```
// MORE CODE

import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav>
      <NavbarAuth />
    </nav>
  );
};

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
      <NavLink to="/genealogy/add">Add Genealogy</NavLink>
    </li>
    <li>
      <NavLink to="/profile">Profile</NavLink>
    </li>
    <li>
      <button>Signout</button>
    </li>
  </ul>
);

// MORE CODE
```

## Test it in browser
* Now we see our `NavbarAuth`

## AddGenealogy
* Create it inside our `Genealogy` folder
* It will be a SFC

`components/Genealogy/AddGenealogy.js`

```
import React from 'react';

const AddGenealogy = () => {
  return <div>Add Genealogy</div>;
};

export default AddGenealogy;
```

## Create Profile component
* Create a new `profile` folder

`components/Profile/Profile.js`

```
import React from 'react';

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
```

## Import both components so we can use them in our routes
`index.js`

```
// MORE CODE

import Search from './components/Genealogy/Search';
import Profile from './components/Profile/Profile';
import AddGenealogy from './components/Genealogy/AddGenealogy';

// MORE CODE

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/genealogy/add" component={AddGenealogy} />
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
* Make sure correct components are loading

## Next - Make Navbar dynamic 


