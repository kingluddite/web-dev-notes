# Testing Signup
`Signup`

* import `react-meteor-data`

Here is the converted code from class-based to "Containerized" base

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Signup extends Component {
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

    this.props.createUser({email, password}, (err) => {
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

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

//export default Signup;
export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  }
}, Signup);
```

* Log out of test
* Log in to app
* Create user
* Log out
* It should work just as it did before
* Run test suite again

`Signup.test.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Signup from './Signup';

if (Meteor.isClient) {
  describe('Signup', function() {

  });
}
```

* Signup and Login will have similar testing code
* You could copy and paste Login into Signup to start this testing process

```
if (Meteor.isClient) {
  describe('Signup', function() {
    it('should show error message', function() {
      const error = 'This aint working';
      const wrapper = mount(<Signup createUser={() => {}} />);

      wrapper.setState({ error });
      const paraErrorText = wrapper.find('p').text();
      expect(paraErrorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });
  });
}
```

* Comment out other two `it` statements
* Test and Signup should pass

## Test that `this.props.createUser()` gets called with correct arguments
* createUser() takes just two args
    - first is object with email and password
    - second is callback function that renders the error

Uncomment second test case
* make sure password we use is at least 9 characters long

```
it('should call createUser with the form data', function() {
      const email = 'phil@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });
```

This will pass the second `Signup` test

## Write test to check length of password

```
    it('should set error if short password', function() {
      const email = 'test@email.com';
      const password = '123   ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });
```


