# Notes App
[Github](https://github.com/andrewjmead/notes-meteor-course)
[demo](http://notes-mead.herokuapp.com/)

## Create boilerplate project
Generic and reusable that you can clone when starting a new meteor Application

* We'll duplicate shortlink app and strip out anything that was specific to that app

## Remove the following
* node_modules
* remove **.git** (`$ rm -rf .git`)
* Delete
    - `imports/api/links.js`
    - `imports/ui/components/AddLink.js`
    - `imports/ui/components/LinksList.js`
    - `imports/ui/components/LinksListFilter.js`
    - `imports/ui/components/LinksListItem.js`

## Keep
`imports/client/styles`

`client/main.html`

```
<head>
  <title>Meteor Boilerplate</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
  <div id="app"></div>
  <!-- /#app -->
</body>
```

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
```

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

});
```

`package.json`

```
{
  "name": "short-link",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "meteor-node-stubs": "~0.2.4",
    "moment": "^2.18.1",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-router": "^3.0.5",
    "simpl-schema": "^0.2.3"
  },
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint": "^3.19.0",
    "eslint-plugin-react": "^6.10.3"
  },
  "engines": {
    "node": "4.6.2"
  }
}
```

`readme.md`

```
# Boilerplate Meteor Project

This includes a basic React and auth setup
```

`imports/api/users.md`

```
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({
    email
  });

  return true;
});
```

`imports/routes/routes.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// import App from './../imports/ui/components/App';

import Signup from './../ui/components/Signup';
import Dashboard from './../ui/components/Dashboard';
import NotFound from './../ui/components/NotFound';
import Login from './../ui/components/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/links" component={Dashboard} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);
```

`imports/startup/simple-schema-configuration.js`

```
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((error) => {
  return new Meteor.Error(400, error.message);
});
```

Rename `Link.js` to `Dashboard.js`

```
import React from 'react';

import Header from './Header';

export default () => {
      return (
        <div>
          <Header title="Your Links" />
          <div className="page-content">
            Dashboard page content
          </div>
        </div>
      );
}
```

`Login`

One small change

`<h1>Login</h1>`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);


    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      // console.log('Login callback', err);
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
};

export default Login;
```

`NotFound`

```
import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>404 Page Not Found</h1>
          <p>Hmmm, we're unable to find that page</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
        </div>
      </div>
    );
};
```

`Header`

```
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const Header = (props) => {

    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{props.title}</h1>
          <button className="button button--link-text" onClick={() => Accounts.logout() }>Logout</button>
        </div>
      </header>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
```

`Signup`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    if (password.length < 9 ) {
      return this.setState({ error: 'Password must be more than 8 characters long.'});
    }

    Accounts.createUser({email, password}, (err) => {
       if (err) {
          this.setState({error: err.reason});
       } else {
          this.setState({error: ''});
       }
    });
  }

  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
};

export default Signup;
```

`$ meteor reset` - reset Application data

* Make new Github Repo `meteor-react-boilerplate`
* `$ git init`
* Git add, commit and push to new remote repo



