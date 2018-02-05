# Logout
`auth.js`

```
import { firebase, googleAuthProvider } from '../firebase/firebase';

const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

// export const startLogout = () => {
//   return() => {
//     return firebase.auth().signOut();
//   }
// }

export const startLogout = () => () => firebase.auth().signOut();

export default startLogin;
```

## Wireup the Logout button
`Header.js`

* We will need to connect Header to redux
* We need to export our connected version of Header

* current `Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensified</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button>Logout</button>
  </header>
);

export default Header;
```

* We'll convert that to this:
* We export Header (above) for testing purposes

`export const Header = () => {`

* We won't need state so we won't add `mapStateToProps`
* We do need dispatch so we add `mapDispatchToProps`
    - This will enable us to get startLogout and use it in some meaningful way

`Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = props => (
  <header>
    <h1>Expensified</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
```

## Take it for a test drive
* Houston we have a problem
* Clicking Logout doesn't work
* The reason is `auth.js`
    - You need to know the difference between named exports and default exports to fix this
    - We have a default export and a named export and we need to change this
    - Both need to be named exports so change this:

`auth.js`

```js
import { firebase, googleAuthProvider } from '../firebase/firebase';

const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

// export const startLogout = () => {
//   return() => {
//     return firebase.auth().signOut();
//   }
// }

export const startLogout = () => () => firebase.auth().signOut();

export default startLogin;
```

* To this:

```js
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

// export const startLogout = () => {
//   return() => {
//     return firebase.auth().signOut();
//   }
// }

export const startLogout = () => () => firebase.auth().signOut();
```

* And now we need to make one more change:

`LoginPage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import startLogin from '../actions/auth';
// MORE CODE
```

* Make this modification:

```
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth'; // convert to named export
// MORE CODE
```

## In case you get login errors update `firebase.js`
```js
firebase.initializeApp(config);

// change for refresh
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // add this

export { firebase, googleAuthProvider, database as default };
```

* **note** I thought I had added it but it was missing from my code

## Now take if for a test drive
* All should work now
* We can log in and out

## Update Header test file
* We need to grab the Header named export
* changing:

`import Header from '../../components/Header';`

* to:

`import { Header } from '../../components/Header';`

```
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
```

* We need to update the snapshot (we changed the jsx (added Logout button) so we need to update the snapshot)
* type `u` in the test to generate a new snapshot
* We are failing a test on Login

`LoginPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});
```

* Just changed to named export of LoginPage

## Challenge
1. Should call startLogout on button click
2. LoginPage test file --> Should call startLogin on button click

`Header.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} />);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
```

* All tests should pass

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
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
```

* All tests should pass
* For peace of mind type `w` and `a` to run all tests
