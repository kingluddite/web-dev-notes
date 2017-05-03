# Setting Inputs and Submitting
* Learn how to set form data from our tests
    - We'll be able to set a value for email and password
    - We'll be able to simulate a form submit
    - Make sure our prop loginWithPassword was called with the correct data

## Two test cases
`it('should call loginWithPassword with the form data');`

* This test case will make sure that when we supply form data and submit the form, `loginWithPassword` gets that data

`it('should set loginWithPassword callback errors');`

* This test case will verify when our callback function gets fired (see below) we should verify that when an error is provided the error message gets set on the error state and if there is no error provided that the error gets cleared

highlighted below

![callback error function](https://i.imgur.com/2EhDQlI.png)

### Pending tests
```
it('should call loginWithPassword with the form data');

it('should set loginWithPassword callback errors');
```

Above `pending tests` are valid and rendered differently

* hover over and you'll see `pending`

![pending tests](https://i.imgur.com/JbIqD5J.png)

But we are going to set tests up for both of these

* ref - [ref enzyme documentation](http://airbnb.io/enzyme/docs/api/ReactWrapper/ref.html)

### `.node`
`wrapper.ref('email').node` => this converts our enzyme wrapper into a regular DOM element (so now we can use standard vanilla JavaScript to manipulate this element)

* [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
    - you will see it has access to `value`

```
wrapper.ref('email').node.value = email;
wrapper.ref('password').node.value = password;
```

### Simulate a form submit
We already used `simulate` to simulate a **click**

`wrapper.find('form').simulate('submit');`

### Time to start making our assertions
Everything should have occurred so let's start with our assertions

* We set the values
* We triggered a submit
    - This means `loginWithPassword` should have been called with the correct arguments
        + arg1 - object with email property set equal to whatever email was in input
        + arg2 - not an object - just the password
        + arg3 - a function
        + we just care about arg1 and arg2

```
it('should call loginWithPassword with the form data', function() {
      const email = 'phil@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });
```

* [enzyme state documentation](http://airbnb.io/enzyme/docs/api/ReactWrapper/state.html)

## Final `Login` test code

`Login.test.js`

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

    it('should call loginWithPassword with the form data', function() {
      const email = 'phil@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error').length).toNotBe(0);

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error').length).toBe(0);
    });
  });
}
```

