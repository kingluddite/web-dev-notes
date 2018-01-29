# Mocking Libraries with Jest
* Check out ExpenseForm.js
* Lots of complex stuff in here
* How do we test this stuff?

`src/tests/components/ExpenseForm.test.js`

* **note** We need to move this line to `app.js`

`ExpenseForm.js`

```js
import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'; // move this line
```

* Move to:

`app.js`

```js
// MORE CODE
import 'react-dates/lib/css/_datepicker.css'; // add the line here
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import './firebase/firebase';
// MORE CODE
```

## Back to testing `ExpenseForm.tes.js`
* Begin with simple snapshot

```
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
```

* There is not connected version
* Redux isn't used inside of this component
* So we only need to grab the default export `ExpenseForm`
* ExpenseForm takes an optional expense prop but we'll leave it off for now and check the default value

```js
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});
```

* Hit `w` and then `Enter` to trigger a test run

## Houston we have a problem
* We get an error
* It has to do with moment() and everytime we run it it gives us a different time so the snapshots will never match up and we'll always get errors
* The solution is to "mock out" moment()

### Mocking out moment
* We create a fake version of the moment library that will help us define when the code actually calls this
* We'll just create a moment at a specific point in time

#### Manual mocks page jest API
* [docs](https://facebook.github.io/jest/docs/en/manual-mocks.html)
* This gives developers to create mocks for various libraries
* Example in docs creates a mock of the `fs.js` (filesystem) library
* We are creating a mock of the moment library

### Step 1: Create the mock
* Jest likes you to put that in your tests folder inside `__mocks__`
    - Same naming convention for `__snapshots__`

`src/tests/__mocks__/moment.js`

* We'll call the real version of moment in our real file
* We'll call the mock version of moment in our test file
* timestamp = 0
    - If we are asking for a point in time, it is a fixed point in time

`createAt: props.expense ? moment(props.expense.createdAt) : moment()`

* We test for createdAt moment or a fixed moment()

```js
export default (timestamp = 0) => {
  return moment(timestamp); 
}
```

* How do we get moment?
* We can't just import it `import moment from 'moment'`
    - This will look for the mocked version
    - We have a function that will call itself
    - That will create a stack trace error,
    - We'll run down all the memory and the process will fail
    - We need a way to grab the original version of moment
    - Jest gives us a way to do that
        + require.requireActual(moduleName)
            * This will require the original module, not the mocked one

```js
// import moment from 'moment';
const moment = require.requireActual('moment');

export default (timestamp = 0) => moment(timestamp);
```

* We will still error because the snapshots don't match up
* But hit `u` and a new snapshot is generated and our moment's match up and our test passes
* 34 passed tests

## Challenge
* Create test - should render ExpenseForm with expense data

`ExpenseForm.test.js`

```js
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expenses={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
```

