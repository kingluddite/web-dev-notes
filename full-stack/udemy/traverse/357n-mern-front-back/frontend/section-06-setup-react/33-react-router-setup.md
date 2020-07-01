# React Router Setup
* Import react router

`App.js`

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// custom components
import Navbar from './components/Navbar';
import Landing from './components/Landing';
// styles
import './App.css';

const App = () => (

// MORE CODE
```

* For the router to work we have to wrap everything in the `Router`

## Routes
* Use `Route` to point to the components
* View in browser
    - Ignore error Switch is defined but never used
        + We are going to wrap the rest of our routes inside a `Switch`

```
// MORE CODE
const App = () => (
  <Router>
    <>
      <Navbar />
      <Route exact path="/" component={Landing} />
    </>
  </Router>
);

export default App;
```

## auth folder - For Login and Register
* `components/auth/Login.js`
* `components/auth/Register.js`
* Use snippet `rafce`

`Login.js`

```
import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
```

`Register.js`

```
import React from 'react';

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
    </div>
  );
};

export default Register;
```

## UI
* We use `section className="container`
    - Every page within the them, except for the landing page has a class of `container` to push everything to the middle
    - But the Landing page we want the image to go all the way over so it doesn't have a class of `container `
* `exact` to match the URL exactly
* We import our auth components
* We wrap our Login and Register in a `Switch`

`App.js`

```
// third party dependencies
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// custom components
import Navbar from './components/Navbar';
import Landing from './components/Landing';

// auth custom components
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// styles
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
      <Route exact path="/" component={Landing} />
    </Fragment>
  </Router>
);

export default App;
```

* Test it out and you'll see browsing to `/register` and `/login` in the browser will show you the Register and Login components respectively

## Change `a` to using Link from `react-router-dom`
* We want the links to be internal and that is why we import and use `<Link to="" />`

`Navbar.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="!#">Developers</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
```

## Test Navbar
* Links will work without page refresh using React Router

## Also update Landing Links
`Landing.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
```

## Test Landing page buttons
* Those links work now as well

## Next - Create forms
* Create Register form using `useState` hook

