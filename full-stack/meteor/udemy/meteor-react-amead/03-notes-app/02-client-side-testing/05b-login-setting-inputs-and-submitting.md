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

```
it('should call loginWithPassword with the form data', function () {
  const email = 'test@test.com';
  const password = 'testpassword';
  const spy = expect.createSpy();
  const wrapper = mount(<Login loginWithPassword={spy} />);

  wrapper.ref('email').?
});
```

### How do we set the value of `email`?
We access **node**

### `.node`
* `wrapper.ref('email').node` => this converts our `enzyme` wrapper into a regular DOM element
* So now we can use standard vanilla JavaScript to manipulate this element
* We are using `input` so we have an instance of `HTMLInputElement`

* [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
    - you will see it has access to the input's `value`

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
        + `arg1` - **object with email property** set equal to whatever email was in input
        + `arg2` - NOT AN OBJECT - just the password
        + `arg3` - a function that returns an error and we don't care about this for this test
        + we just care about `arg1` and `arg2`

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

* We do not use `toHaveBeenCalledWith()` becuause that needs all arguments and we are only using two of the three
* [enzyme state documentation](http://airbnb.io/enzyme/docs/api/ReactWrapper/state.html)

## Final `Login` test code
* Using `refs` have changed and this is [the new way to deal with them](https://facebook.github.io/react/docs/refs-and-the-dom.html)
* Below is the code altered to address the new way to work with `refs`

`Login.test.js`

```
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = 'Test Error Message';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      const errorText = wrapper.find('p').text();

      expect(errorText).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'test@test.com';
      const password = 'testpassword';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.node.email.value = email;
      wrapper.node.password.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error').length).toNotBe(0);
    });
  });
}
```

`Login.js`

```
// more code
render() {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
      {this.state.error ? <p className="errors">{this.state.error}</p> : undefined}

      <form
        className="boxed-view__form"
        onSubmit={this.handleSubmit.bind(this)}
        noValidate
      >
        <input type="email" ref={ (input) => { this.email = input; }} placeholder="Email" />
        <input
          type="password"
          ref={ (input) => { this.password = input; }} placeholder="Password"/>
        <button className="button form__button" type="submit">Login</button>
      </form>

      <Link to="/signup">Have an account?</Link>
    </div>
    {/* END .boxed-view__box */}
  </div>
  // END .boxed-view
  );
}
// more code
```

## Next
Do the same thing with `Signup`
