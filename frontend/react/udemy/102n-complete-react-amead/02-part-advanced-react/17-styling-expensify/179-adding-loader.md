# Adding Loader
`app.js`

* This is where our loader resides
* Comment out firebase code
  - This will show the loader screen and never get rid of it
  - This will make it easier to target with styles (we won't have to constantly refresh the page just to see things)

```
// MORE CODE
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     store.dispatch(startSetExpenses()).then(() => {
//       renderApp();
//       if (history.location.pathname === '/') {
//         history.push('/dashboard');
//       }
//     });
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
```

* Make sure you are on `localhost:8080`
* You should just see `Loading...`

## Now we are going to break this out into a separate component
* We'll keep the same Loading message for now

```
// MORE CODE
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

// MORE CODE

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// MORE CODE
```

`src/components/LoadingPage.js`

```
import React from 'react';

const LoadingPage = () => <div>loading</div>;

export default LoadingPage;
```

* You should see `loading` instead of `Loading...`
* If you do, you know our SFC `LoadingPage` is working

## Add our animated gif
* Now we just have to swap out the dots with an HTML `img` element
`LoadingPage.js`

```
import React from 'react';

const LoadingPage = () => (
  <div>
    <img src="/img/loader.gif" alt="loader" />
  </div>
);

export default LoadingPage;
```

* Now we get our loading image

![loading image](https://i.imgur.com/yeMXEiF.png)

### Style the loader
`LoadingPage.js`

```
import React from 'react';

const LoadingPage = () => (
  <div className="loader">
    <img className="loader__image" src="/img/loader.gif" alt="loader" />
  </div>
);

export default LoadingPage;
```

### Create and import `src/styles/components/_loader.scss`
`styles.scss`

```
// MORE CODE
@import './components/list';
@import './components/loader';
```

`_loader.scss`

```
.loader {
  /* Using flexbox to perfectly center an item in the browser */
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  &__image {
    height: 6rem;
    width: 6rem;
  }
}
```

* That will make the loader center in the screen and slightly smaller
* Comment back in firebase code (`app.js`)and the app loads nicely and you briefly see our animated loader

## We need to clean up our tests
* We made a ton of changes to our app
* We need to rerun our test suite and create new snapshots
* Shut down dev server and run jest

`$ npm test --watch`

* You will see a ton of snapshot failures
* Type `u` to create new snapshots
* All tests are passing
* **note** Use the menu to make sure you run all snapshots and generate all new snapshots
* In the end you should have 73 passing tests

## Challenge
* Create a test for loading screen
* Just shallow test

`LoadingPage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

test('should render NotFoundPage correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
```

* Now 74 passing tests
