# Mocking Libraries with Jest
* Testing complex code bases

## We will test ExpenseForm.js
```
import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// the js date way to create a new date
const date = new Date();

// the moment way
const now = moment();

export default class ExpenseForm extends Component {
  // static propTypes = {
  //   j
  // }

  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      descError: '',
      amtError: '',
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState({
      description,
    });
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState({
      note,
    });
  };

  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        amount,
      });
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description) {
      this.setState({
        descError: 'Please provide description',
      });
    } else {
      this.setState({
        descError: '',
      });
    }

    if (!this.state.amount) {
      this.setState({
        amtError: 'Please provide amount',
      });
    } else {
      this.setState({
        amtError: '',
      });
    }
    // console.log('form submitted');
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount) * 100,
      note: this.state.note,
      createdAt: this.state.createdAt.valueOf(),
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.descError && <p>{this.state.descError}</p>}
        {this.state.amtError && <p>{this.state.amtError}</p>}
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
          id="expenseDatePicker" // PropTypes.string.isRequired,
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          onChange={this.onNoteChange}
          value={this.state.note}
        />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

* Create test file `ExpenseForm.test.js`

## We'll make a couple of changes
* The css for react-dates - we use it in other files so this import really confusing
* We'll temporarily move it to `app.js`

## Goal is start with simplest test first - snapshots
* Import `react`, shallow
* There is no connected version, Redux isn't used inside of here, so we just grab the only thing inside that file which is a default Export

`ExpenseForm.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
```

### Now we create our first test case
* We want to make sure we test the we render our ExpenseForm correctly

```
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});
```

* **Note** ExpenseForm takes an optional `expense` prop but we will leave that off for now using the default values
* Everytime we run the test the first time it passes
  - But this time if we re-run our test suite (press `w` key` to get more options and the press **Enter** to trigger a re-run) it will fail

## We fail a test
* It has to do something with the old date and new date
* What is causing this failing test?
* The problem is that inside Expense form we are grabbing moment() at the current point in time

```
// MORE CODE

    this.state = {

      // MORE CODE

      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),

      // MORE CODE

    };

// MORE CODE
```

* The `moment()` will create a different point in time every time we run it so our snapshots will never match
  - This is a problem!
  - We need a way to consistently get the same date back every time without changing how our code works (If we can't fix this roadblock we'll never be able to do snapshot testing with moment())

## Solution - mock out moment()
* We need to create a fake version of moment library that will allow us to define what happens when the code actually calls `moment()`
  - Fix - We'll just return a moment at a specific point in time

### Jest Docs
* Jump to the "Manual Mocks" documentation page
* [manual mocks docs](https://jestjs.io/docs/en/manual-mocks)
  - This is where we (the test writers) have the option to create mocks for various Libraries
  - The example creates a mock of the `fs` library
  - We will create a mock of the `moment` library

#### Create a `__mocks__` folder
* Where do I create it?
  - Jest likes you to put it inside your `tests` folder
  - `__mocks__` is the exact same naming convention for `snapshots`
  - Inside `__mocks__` create `moment.js` (this will be the mocked version of moment.js)
  - When we import moment we expect something to come back on the default (and in this case we expect it to be a function we can call - sometimes we call it with nothing and sometimes we pass in a value)

`__mocks__/moment.js`

```
export default () => {
  //
}

```

* By default we will export an arrow function
* This will be the function that we call inside of the "mocked" moment library
  - When I call `moment()` in the real app, it will call the moment library
  - When I call `moment()` in my test file I'll be calling the "mocked" version of my library

## Pass an argument to our mocked moment
* I'm going to ask for a timestamp, if it exists great, if not I'll set it to 0

```
export default (timestamp = 0) => {
  //
}

```

* This will let us time travel
* If we are asking for a point in time, its a fixed point in time
* Then all we need to do is return an instance of moment at that point in time

```
export default (timestamp = 0) => moment(timestamp);

```

* This will make sure that both calls to moment work

```
// MORE CODE

    this.state = {

      // MORE CODE

      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),

      // MORE CODE

    };

// MORE CODE
```

* moment(props.expense.createdAt) works as normal
* moment() will use our mock time to make sure our snapshots can match

## Houston we have a problem?
* How do we get moment?
* Can we do this?

```
import moment from 'moment';

export default (timestamp = 0) => moment(timestamp);

```

* If we import `moment` it will look for the mocked version (essentially we have a function that calls itself and that will generate a **stack trace error** - it will run down the memory and eventually the process will fail)

## Is there any way we can grab the original version moment
* And Jest gives us a way to do this
* To ensure that a manual mock and its real implementation stay in sync, it **might be useful to require the real module using** `jest.requireActual(moduleName)` in your manual mock and amending it with mock functions before exporting it. (used to be called `require.requireActual(moduleName`))

```
// import moment from 'moment';
const moment = jest.requireActual('moment');

export default (timestamp = 0) => moment(timestamp);

```

* Save the moment mocked file and see how our test works out

## Our test still fails
* This is expected
* Type `u` to create a new snapshot and our test now passes
  - Now our moment() snapshot will always match because we forced the moment() to start at a specific moment in time, if no point in time was provided
  - If you open the snapshot you'll see the date always used is:
    + `1970-01-01T00:00:00.000Z` (epoch - no time passed as argument for timestamp and epoch will be the default value used)

## Challenge
* Render a test for rendering the data
* "should render ExpenseForm with expense data"
* Make sure to pass in data from one of the expenses from fixtures

## Solution
```
// MORE CODE

import { expenses } from '../fixtures/expenses';

// MORE CODE

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

```

* When you view the snapshot you will see

```
// MORE CODE

exports[`should render ExpenseForm with expense 1`] = `
// MORE CODE
```

* And if you scroll down you will see the form is filling in the values with the values we gave it from our expenses[0] fixture
  - textarea value is empty - because the fixtures value for that expense did not have a note (empty string)
* The test passes

## Next
* Deal with real complex real world scenarios
  - Like actually running events
    + Changing inputs
    + Submitting forms
    + Clicking buttons
