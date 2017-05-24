# Testing Login
* Login is more complex than `Header`
* We have a form that gets submitted
* We have errors that get conditionally shown
* We use a method that is available via an **import**
    - This will be hard to mock out unless we switch over to using a `Container` Component (we will do this)

## Switch to using a Container
1. import it

`import { createContainer } from 'meteor/react-meteor-data';`

2. Restructure the exports for login
* We want to export export the regular React Component that we wrote
    - This will be converted from a default export to a named export

`export class Login extends Component {`

* We also want to export the `Container-ized` version
    - Let's set up the default export
    - change this `export default Login;`

To this:

```
// export default Login;
export default contentContainer(() => {
  return { 
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
```

* now instead of using `Meteor.loginWithPassword()` in the Component, all we have to do is access the **prop**

So this: `Meteor.loginWithPassword({email}, password, (err) => {`

Becomes this: `this.props.loginWithPassword({email}, password, (err) => {`

* Behind the scenes
    * It is doing the exact same thing
    * But now our Component is way easier to test
    * We'll be able to inject those `spies`
        - make sure they are called/not called depending on the actions we take in the test file

### Set up the PropTypes
```
Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};
```

### Whew! We are finished making changes to `Login`
* Save and make sure app is still working in browser
* Log in and make sure app is working as expected

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Login extends Component {
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

    this.props.loginWithPassword({email}, password, (err) => {
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

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

// export default Login;
export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);
```

* Log out of app
* Shut down app

## Start up test suite
`$ npm test`

`Login.test.js`

## Grab our imports

* We'll be imported same stuff we imported in `Header.test.js` so copy and paste it to the top

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// change this to Login
import { Login } from './Login';
```

## Make sure we are on the client
```
if (Meteor.isClient) {

}
```

## Set up our `describe()` block
```
if (Meteor.isClient) {
  describe('Login', function() {

  });
}
```

### First test
#### Setting the error `state` works correctly
* We will set an error message and make sure it shows up in a **paragraph** tag and we'll make sure that when we clear that error, the **paragraphy** goes away

```
if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount();
    });
  });
}
```

* We need access to `Login` (non-containerized Login) so we import that named export

`import { Login } from './Login';`

* We add our Login JSX inside `mount()` and we know it takes a prop because we just told it to take in a [prop](https://i.imgur.com/LTP5jyZ.png) `loginWithPassword`
* We are not triggering any form submit, all we are checking is the error paragraph so we can pass in an empty function, we won't pass in a `spy`, we could but we won't end up using it in our assertions so we won't add it
* We will set some state on this Component and we will set it equal to this error message and that will enable us to verify that the error paragraph is showing up correctly
    - enzyme gives you [an API for this](http://airbnb.io/enzyme/docs/api/mount.html)
    - We've already used `.text()` - [documentation](http://airbnb.io/enzyme/docs/api/ReactWrapper/text.html)
    - Now we'll use is [`.setState`](http://airbnb.io/enzyme/docs/api/ReactWrapper/setState.html)
        + Works just like `.setState()` inside a Component

`wrapper.setState({ error });`

* Now that we have an error in place we can:
    - Verify that there is a paragraph showing up
    - and that its text content does in fact equal `This is not working`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      const paraErrorText = wrapper.find('p').text();
      expect(paraErrorText).toBe(error);
    });
  });
}
```

That should show pass test under **Login** of `should show error messages`

### Clear the state check
And make sure there is no `paragraph` tag

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      const paraErrorText = wrapper.find('p').text();
      expect(paraErrorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });
  });
}
```
