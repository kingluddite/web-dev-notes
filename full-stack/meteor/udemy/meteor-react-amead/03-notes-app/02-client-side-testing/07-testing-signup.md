# Testing Signup
`Signup`

* import `react-meteor-data`

Here is the converted code from class-based to "Containerized" base

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data'; // add this line
import PropTypes from 'prop-types';

export class Signup extends Component { // change this line
// more code

this.props.createUser({ email, password }, (err) => { // change this line

// change all the rest of this code
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

1. Log out of test suite
2. Log in to app
3. Create user
4. Log out
5. It should work just as it did before
6. Run test suite again

### Move to our test file
We can just copy `Login.test.js` code and paste into our new `Signup.test.js`

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
* `createUser()` takes just two args
    - first is object with email and password
    - second is callback function that renders the error

### Uncomment second test case
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

## Final `Signup.test.js`

```
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show error messages', function () {
      const error = 'Test Error Message';
      const wrapper = mount(<Signup loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      const errorText = wrapper.find('p').text();

      expect(errorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function () {
      const email = 'test@test.com';
      const password = 'testpassword';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.node.email.value = email;
      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', function () {
      const email = 'test@test.com';
      const password = 'shortpwd             ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.node.email.value = email;
      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      // Expect error state to have length greater than zero
      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('should set createUser callback errors', function () {
      const password = 'validlengthpassword';
      const reason = 'This is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}

```


