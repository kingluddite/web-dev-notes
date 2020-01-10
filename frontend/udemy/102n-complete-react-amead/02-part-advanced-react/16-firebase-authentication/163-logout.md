# Logout
* Now we'll learn how to log out
* Once we have log in and log out sorted, we'll focus on locking down data
* And handling things like redirecting the user around the app depending on their auth status

## Let's add a Log Out button

* The `Header` component will contain our `private navigation`
  - Currently the `Header` shows up on the Log In page but we'll fix that soon
  - We'll add a simple button to our `Header` like this:

`Header.js`

* The Logout button will start the process for logging a user out

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensifye</h1>
    <nav>
      <li>
        <NavLink to="/" activeClassName="is-active" exact>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/create" activeClassName="is-active">
          Create Expense
        </NavLink>
      </li>
      <li>
        <button>Logout</button>
      </li>
    </nav>
  </header>
);

export default Header;
```

* To wire things up we need to make some other changes
* The button's action will be defined inside `auth.js` using the companion method for `signInWithPopup()` called `signOut()`

`src/actions/auth.js`

* We do not have to provide any arguments to `signOut()`

```
// MORE CODE
// LONG
// export const startLogout = () => {
     // we conform to the Redux Thunk spec by returning a function
//   return () => {
//     return firebase.auth().signOut();
//   }
// }

// SHORT
export const startLogout = () => () => firebase.auth().signOut();
```

* Now with this `async` action in place we can now wire up `Header` to use it

## Stuff we need to do:
* We will need to connect Header to Redux
* We need to import `startLogout()`

`Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; // add this line
import { startLogout } from '../actions/auth'; // add this line

const Header = () => (

// MORE CODE
```

* Now that everything is imported we can now wire up our Header component

## Converting
* Currently by default we are exporting our "non connected component"

`Header.js`

```
// MORE CODE

const Header = () => (
  <header>
    // MORE CODE
  </header>
);

export default Header; // this is the "non connected" component
```

* We'll convert that to this:
* We export Header (above) for testing purposes

`Header.js`

```
// MORE CODE

export const Header = () => ( // we modify this line
  <header>

    // MORE CODE

  </header>
);

export default Header;
```

## Connect Header to Redux

`Header.js`

```
// MORE CODE
export default connect()(Header);
```

* We won't need `state` so we won't add `mapStateToProps`

`Header.js`

```
// MORE CODE
export default connect(undefined, ?)(Header);
```

* We do need `dispatch` so we add `mapDispatchToProps`
    - This will enable us to get `startLogout` and use it in some meaningful way

`Header.js`

```
// MORE CODE
export default connect(undefined, mapDispatchToProps)(Header);
```

* Now we'll define `mapDispatchToProps`

`Header.js`

```
// MORE CODE

import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensified</h1>

    // MORE CODE

    <button onClick={startLogout}>Logout</button>
  </header>
);

// here we define mapDispatchToProps
const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
```

* Now the Header component is all wired up
* Clicking on the button should have an affect on the app

## Take it for a test drive
* Refresh browser and you see `log in` in the browser
* Click the **Log Out** button and the log changes to `log out` in the Chrome console
  - This means we have successfully logged out of the app and now we no longer have access to that privileged information

### Go through Log in/Log out process one more time
* Make sure you can log in and log out and use the console to see if it is in fact authenticating you and logging you out

## Update Header test file
* We need to adjust our test cases for header
* We need to grab the Header `named export`
* Changing:

`import Header from '../../components/Header';`

* to:

`import { Header } from '../../components/Header';`

* And pass in the prop we are expecting `startLogout` and set it equal to an empty function (that does absolutely nothing)

```
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header'; // update this line

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />); // update this
  expect(wrapper).toMatchSnapshot();
});
```

## Now run your test file again

`$ npm run test -- --watch`

### Houston we have a problem
* The test failed but this is to be expected as we just added a new button

### Solution to problem
* We need to update the snapshot (we changed the jsx (added Logout button) so we need to update the snapshot)
* Run the test again
* Type `u` in the test to generate a new snapshot
* And now all the tests past and we have one new snapshot (open it and you'll see it now has the Logout button and it expects a function onClick as a prop)

## Challenge
* Add another test case making sure that when we click the button the correct prop gets called
  - We will accomplish that with `spies`
* Create 2 test cases
  - should call startLogout on button click
  - LoginPage test file --> should call startLogin on button click
 
`Header.test.js`

```
// MORE CODE

test('should call startLogout on button click', () => {
  // we need to create a new spy for startLogout
  // this is the thing we want to confirm when the button gets clicked
  // remember - to create a spy we use jest.fn()
  const startLogout = jest.fn();
  // pass our spy into Header
  // we shallow render our component
  const wrapper = shallow(<Header startLogout={startLogout} />);
  // simulate that we click that button
  wrapper.find('button').simulate('click');
  // make our assertion
  // we just want to make sure startLogout was called
  expect(startLogout).toHaveBeenCalled();
});

// MORE CODE
```

* The test should restart and we should see an entire passing test suite

### Now write a similar test for our Login component
`LoginPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  // we need to create a new spy for startLogin
  // this is the thing we want to confirm when the button gets clicked
  // remember - to create a spy we use jest.fn()
  const startLogin = jest.fn();
  // pass our spy into Header
  // we shallow render our component
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);
  // simulate that we click that button
  wrapper.find('button').simulate('click');
  // make our assertion
  // we just want to make sure startLogout was called
  expect(startLogin).toHaveBeenCalled();
});
```

* Type `w` and `a` if you want to force the tests to run one more time (just in case they didn't)

## Recap
* We now know how to log in and log out (and test them)

## Next
* We will work on this code:

`app.js`

```
// MORE CODE

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});
```

* Above defines what we do when we log in or log out
* And we want to do more than just log `log in` and `log out`
  - If we log in we want to redirect the user to the Dashboard page
  - If we are logging out we want the user to get redirected (regardless of where they are in the site) to the log in page (so they can log in again or leave the application)

