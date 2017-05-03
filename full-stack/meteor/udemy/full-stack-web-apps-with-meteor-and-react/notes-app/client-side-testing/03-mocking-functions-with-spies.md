# Mocking functions with Spies
We will simulate user interaction

* button clicks
* form submits
* essential for testing real world Components

## Spies
A way to mock out real functions

* `Accounts.logout()` is a real function that logs us out of the server and client
* We want to `mock` this function
* We just want to make sure the logout button gets called one time
* Our assertion library has `Spies` built-in so we don't have to add anything else to our test files
* [Documentation for `Spies`](https://github.com/mjackson/expect)

* A Spy is a function

```
it('should call the function', function () {
      const spy = expect.createSpy();

      expect(spy).toHaveBeenCalled();
    });
```

This will generate an test fail and alert us that `spy was not called`

![spy fail](https://i.imgur.com/hfRpUhM.png)

```
it('should call the function', function () {
      const spy = expect.createSpy();
      spy(3, 4, 123);
      expect(spy).toHaveBeenCalled();
    });
```

* This will pass the test
* `spy()` is a mocked function so the arguments called do not matter

## Don't call a function
If something is not valid a function should not be called

```
it('should call the function', function () {
      const spy = expect.createSpy();
      spy(3, 4, 123);
      expect(spy).toNotHaveBeenCalled();
    });
```

This will error because the function was called and should not have been

* There is no limit on how many times you can call a `spy`

### `toHaveBeenCalledWith()`
We can check the arguments inside our `Spy`
```
it('should call the function', function () {
      const spy = expect.createSpy();
      spy(3, 4, 123);
      spy('Todd');
      expect(spy).toHaveBeenCalledWith(3, 4, 123);
    });
```

* This will pass because it's true that 3, 4, 123 were called with our Spy
* But if you just pass 3 by itself, you will get an error because Spy was never called with just the number 3
* But it will pass if you just pass `Todd` by itself because it is true that `Todd` spy was just called with `Todd`

### Most common assertions
* `toHaveBeenCalled()`
* `toNotHaveBeenCalled()`
* `toHaveBeenCalledWith()`

### debugger
```
it('should call the function', function () {
      const spy = expect.createSpy();
      spy(3, 4, 123);
      spy('Todd');
      debugger;
      expect(spy).toHaveBeenCalledWith('Todd');
    });
```

Refresh browser and we free at the point in code where our `debugger` is

### Spy.calls
Very interesting!

* `spy.calls` is an array
    - It stores one item in the array for every time it is called

![spy.calls](https://i.imgur.com/JV8VWWb.png)

This is a great way to check if a spy was called multiple times

![spy.calls error](https://i.imgur.com/LPw6zVr.png)

* Remove debugger

## Let's get the `spy` call inside of `Header`
* We want to insure `Accounts.logout()` gets called in development and production

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
          <button className="button button--link-text" onClick={() => props.handleLogout() }>Logout</button>
        </div>
      </header>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
```

`Header.test.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Header from './Header';

if (Meteor.isClient) {
  describe('Header', function() {
    it('should set button text to logout', function() {
      const wrapper = mount( <Header title="Test Title" handleLogout={() => {}} /> )

      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should have h1 with title', function () {
      const title = 'Test title';
      const wrapper = mount( <Header title={title} handleLogout={() => {}} /> );

      const h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe(title);
    });

     // it('should call the function', function () {
    //   const spy = expect.createSpy();
    //   spy(3, 4, 123);
    //   spy('Todd');
    // 
    //   expect(spy).toHaveBeenCalledWith('Todd');
    // });

    it('should call handleLogout on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount( <Header title="title" handleLogout={spy} /> );

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
```

* If you comment out the click we'll get an error, but when you comment it out we pass our test and we just simulated a click of our logout button
* We commented out the spy 'call the function'



