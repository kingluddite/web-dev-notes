# Basic Meteor Accounts System
* Open `.meteor/packages` and make the following update:

```
// MORE CODE
apollo

accounts-password
```

* You then get an error to install bcrypt
* This is an annoying error
* Just install it to fix

`$ meteor npm i bcrypt`

* After intalling error will go away

## We now have access to the meteor accounts packages
* We have global access to `Acccounts`

## Houston we have a problem
* There was a bug with bcrypt and meteor needs to be updated (7/25/2018)
    - `$ meteor update --release 1.6.1.2`

![error](https://i.imgur.com/fPH6oCZ.png)

## Update meteor patch
`$ meteor update --patch` (A patch for Meteor 1.6.1.3)

### Show how Accounts work

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ResolutionForm from './ResolutionForm';

console.log(Accounts);

// MORE CODE
```

## Another bug so update meteor with:
`$ meteor update` (now will be Meteor `1.7.0.3`)

## Run meteor
`$ meteor`

* You will see in the client that AccountsClient is globally avaiable
* Open dev tools to see this is action

![Accounts in dev tools](https://i.imgur.com/gByUhBS.png)

## Better to use explicit imports
* Not required but I recommend it
* The reason is I like to know everything that is used in each component and I don't want items to appear magically like Accounts

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
// MORE CODE
```

* Works the exact same but you now are saying that you are using Accounts in this app

## Create a user
* You will see this is a method inside our dev tool
    - Along with a whole bunch of other methods and properties

`/imports/ui/RegisterForm.js`

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class RegisterForm extends Component {
  registerUser = e => {
    e.preventDefault();
    Accounts.createUser(
      {
        email: this.email.value,
        password: this.password.value,
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.registerUser}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <button type="submit">Register User</button>
      </form>
    );
  }
}
```

* Add form to App

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';

const App = ({ loading, resolutions }) => {
  if (loading) return null;
  return (
    <div>
      <RegisterForm />
      <ResolutionForm />
      <ul>
// MORE CODE
```

* Enter `jdoe@joe.com` for email and `a12345` for password and press `enter`
* You will see **undefined** in chrome console
* Enter `> Meteor.userId()` inside the chrome console
* You will see something like `< "iMfQMgs28NJwggtB7"`
    - This is the id of the user you just created

![jdoe@joe.com](https://i.imgur.com/rUHTFPm.png)

* So we get back the id of the user we created and just logged in as
* Congrats your registration form works!

## Add a login
* This will not be DRY at first but we'll improve on it later

`ui/LoginForm.js`

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class LoginForm extends Component {
  login = e => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      console.log(error);
    });
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <button type="submit">Login User</button>
      </form>
    );
  }
}
```

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const App = ({ loading, resolutions }) => {
  if (loading) return null;
  return (
    <div>
      <LoginForm />
      <RegisterForm />
      <ResolutionForm />
      <ul>
// MORE CODE
```

`LoginForm.js`

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class LoginForm extends Component {
  login = e => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      console.log(error);
    });
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <button type="submit">Login User</button>
      </form>
    );
  }
}
```

## Logout
* First see that we are logged in with:
    - `> Meteor.userId()`
        + You will see an id string returned
* Logout
    - `> Meteor.logout()`
    - Undefined will be returned
* Try to see if you are still logged in
    - `> Meteor.userId()`
    - `null` is returned which means... Nope. No longer logged in
* But log in with your email and password
    - email (jdoe@joe.com)
    - pwd (a12345)
        + nothing will be returned
        + But use `> Meteor.userId()` and you'll see the user ID (this means you are logged in again)

## This is very cool
* In this short amount of time we have access to a fully functional login system and build in a super fast amount of time
