# Make navbar dynamic
## We need to add logic
* To show the logged in user or public navbar (auth or unauth)

## Pass down `data` in withSession

`withSession.js`

```
// MORE CODE

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data);

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

// MORE CODE
```

## Pass down `session` into Navbar
`index.js`

```
// MORE CODE

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        // MORE CODE
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
```

## pull out `session` from props of `Navbar`
* Set up conditional to show `auth nav` or `unauth nav`
* If we have a current logged in user (getCurrentUser) and it is not `null` we'll load `navbarAuth` otherwise we'll load `navbarUnAuth`

`Navbar.js`

```
// MORE CODE

const Navbar = ({ session }) => {
  return (
    <nav>
      {session && session.getCurrentUser ? <NavbarAuth /> : <NavbarUnAuth />}
    </nav>
  );
};

// MORE CODE
```

# Test in browser
* When not logged in you see the public nav `NavbarUnAuth`
* When logged in you see private nav `NavbarAuth`

## Convert Navbar from SFC to CBC
`Navbar.js`

```
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const { session } = this.props;

    return (
      <nav>
        {session && session.getCurrentUser ? (
          <NavbarAuth session={session} />
        ) : (
          <NavbarUnAuth />
        )}
      </nav>
    );
  }
}

```

## Welcome user when logged in
* Use a `<h2>Welcome, user name</h2>`
* Pass down `session` to `NavbarAuth`
* Use `Fragment` to prevent common parent tag error

`index.js`

```
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = ({ session }) => {
  return (
    <nav>
      {session && session.getCurrentUser ? (
        <NavbarAuth session={session} />
      ) : (
        <NavbarUnAuth />
      )}
    </nav>
  );
};

const NavbarAuth = ({ session }) => (
  <Fragment>
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
        <NavLink to="profile">Profile</NavLink>
      </li>
      <li>
        <button>Signout</button>
      </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
  </Fragment>
);

// MORE CODE

export default Navbar;
```

## Test in browser
* Log in and you will see username welcome

## Make our Nav organized
`Navbar.js`

```
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// apollo stuff
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// styles
import './index.css';

// custom components
import App from './components/App';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import withSession from './components/withSession';
import Search from './components/Cologne/Search';
import AddCologne from './components/Cologne/AddCologne';
import Profile from './components/Profile/Profile';

// our apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  },
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/profile" component={Profile} />
        <Route path="/cologne/add" component={AddCologne} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);
```

### Create `Navbar` folder and we'll put 3 files inside it:
* `Navbar.js`
* `NavbarUnAuth.js`
* `NavbarAuth.js`

#### Make it clear which nav we see
* Just added a `<h2></h2>` in both navs so you can easily see what navbar you are seeing

`Navbar.js`

```
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

// custom components
import NavbarAuth from './NavbarAuth';
import NavbarUnAuth from './NavbarUnAuth';

class Navbar extends Component {
  render() {
    const { session } = this.props;

    return (
      <nav>
        {session && session.getCurrentUser ? (
          <NavbarAuth session={session} />
        ) : (
          <NavbarUnAuth />
        )}
      </nav>
    );
  }
}

export default Navbar;
```

`NavbarAuth.js`

```
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

class NavbarAuth extends Component {
  render() {
    const { session } = this.props;
    return (
      <Fragment>
        <h2>Auth</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
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
        <h2>
          Welcome <strong>{session.getCurrentUser.username}</strong>
        </h2>
      </Fragment>
    );
  }
}

export default NavbarAuth;
```

`NavbarUnAuth.js`

```
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

class NavbarUnAuth extends Component {
  render() {
    return (
      <Fragment>
        <h2>Unauth</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
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
      </Fragment>
    );
  }
}

export default NavbarUnAuth;
```


