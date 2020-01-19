# Testing AddExpenses
* We need to make our test easier

`AddExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        props.dispatch(addExpense(expense));
        props.history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
```

## React Redux Feature
* This will allow us to simplify the code in AddExpensePage a little bit
* Specifically this part of our code

`AddExpensePage.js`

* In the following chunk of code we do 2 things:

1. We call addExpense
2. And we call props.dispatch()

```
// MORE CODE

props.dispatch(addExpense(expense));

// MORE CODE
```

### With regards to testing
* props.dispatch() could easily be a spy
  - We can take the "unconnected" component
  - We could render it using shallow()
  - We could pass in a spy
  - And we could make sure it gets called
* But our code is a little trickier
  - We are referencing a function that is referenced above `addExpense()`
    + Not something that is passed in as a prop
    + That's going to make `AddExpensePage` a little harder to test than it needs to be
      * Lucky for us there is a function in `connect()` that allows us to do this
        - connect(arg1, arg2)
        - We know the first argument is the mapStatesToProp function, since we don't need that for this component we'll pass in `undefined`
        - The second argument is a function called `mapDispatchedToProps()`

## Let's look at mapDispatchToProps
* It is pretty similar to mapStateToProps() but instead of working with the `state` it works with `dispatch`
* It gets called with `dispatch`
  - And that lets gives us access to use dispatch inside of the mapDispatchToProps function
  - And the goal is to return an object

#
```
// MORE CODE
const mapDispatchToProps = (dispatch) => {
  return {
    // on here we are going to define various props
    // and these props are going to call dispatch
  }
}

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

## That will allow us to attract away the commented out code
* And replace it with this code

```
// MORE CODE

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        // props.dispatch(addExpense(expense));
        props.onSubmit(expense)
        props.history.push('/');
      }}
    />
  </div>
);

// MORE CODE
```

* And the new code will be much easier to test than the old code

### How do we get our new code to work?
* We have to setup `onSubmit` inside our mapDispatchToProps function

```
// MORE CODE

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: expense => dispatch(addExpense(expense)),
  };
};

// MORE CODE
```

* Now we have the **exact same functionality** as before but we did all that work to create a component that is far easier to test

## We can even make our code a little more compact
* We will tweak this code so we have a function that just returns an object
* We will remove the `return` and implicitly return an object
* We remove the curly braces and add parentheses (the parentheses are necessary whenever we are implicitly returning an object)
* Then we paste the object in

```
// MORE CODE

const mapDispatchToProps = dispatch => ({
  onSubmit: expense => dispatch(addExpense(expense)),
});

// MORE CODE
```

## Now we need to use mapDispatchToProps
```
// MORE CODE

export default connect(undefined, mapDispatchToProps)(AddExpensePage);

// MORE CODE
```

* Here is our complete "more testable" component

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        // props.dispatch(addExpense(expense));
        props.onSubmit(expense);
        props.history.push('/');
      }}
    />
  </div>
);
const mapDispatchToProps = dispatch => ({
  onSubmit: expense => dispatch(addExpense(expense)),
});
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

## Let's learn more about mapDispatchToProps
* From [the docs](https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object)
* mapDispatchToProps
  - This is a way to return your dispatch function allowing you to abstract them away from the component itself

## But now we want to avoid `inline` functions
* So we'll convert our SFC (Stateless functional component) to a CBC (Class based component)

`AddExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.onSubmit(expense);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: expense => dispatch(addExpense(expense)),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
```

* After we convert we need to make sure we export the "unconnected" version so we can test it (so we placed an `export` in front of our new class definition)

## Now we're finally ready to test
* We create our new test file

`src/tests/components/AddExpensePage.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';

test('should render AddExpensePage correctly', () => {
  const wrapper = shallow(<AddExpensePage />);

})

```

## Does AddExpensePage expect any props?
* Yes it need 2
  - onSubmit
  - history
* We need to make sure we pass those in
  - We can put anything in for those values and we'll use a couple of spies
  - history will equal an object and on that object we'll have a `push` property and we'll set the value for `push` to be a spy

```
// MORE CODE

test('should render AddExpensePage correctly', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(<AddExpensePage />);
})

// MORE CODE
```

* Then we just pass in our prop values for our props

```
// MORE CODE

test('should render AddExpensePage correctly', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage onSubmit={onSubmit} history={history} />
  );
});

// MORE CODE
```

* Now we just take a snapshot of this and we're done

```
// MORE CODE

import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';

test('should render AddExpensePage correctly', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage onSubmit={onSubmit} history={history} />
  );
  expect(wrapper).toMatchSnapshot();
});

// MORE CODE
```

* You save and rerun you code and you will see there is one new snapshot
* Check it out

`src/tests/components/__snapshots__/AddExpensePage.test.js.snap`

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should render AddExpensePage correctly 1`] = `
<div>
  <h1>
    Add Expense
  </h1>
  <ExpenseForm
    onSubmit={[Function]}
  />
</div>
`;
```

## Our text test
* Now we want to test when the form gets submitted
  - Both our spies get called
  - And they get called with the correct information
  - This will be a little tricky

```
// MORE CODE

test('should handle onSubmit', () => {
  //
})

// MORE CODE
```

* We can use what we built in the last test to start off:

```
// MORE CODE

test('should handle onSubmit', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage onSubmit={onSubmit} history={history} />
  );
})

// MORE CODE
```

* We grab our `ExpenseForm` you could see it from our snapshot and we grab the onSubmit prop

```
// MORE CODE

test('should handle onSubmit', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage onSubmit={onSubmit} history={history} />
  );
  wrapper.find('ExpenseForm').prop('onSubmit')();
})

// MORE CODE
```

* We need to pass it an expense (we use our fixtures file)

```
// MORE CODE

import { expenses } from '../fixtures/expenses';

// MORE CODE

test('should handle onSubmit', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage onSubmit={onSubmit} history={history} />
  );
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
});

// MORE CODE
```

* Now we have successfully run all of this code:

![onSubmit](https://i.imgur.com/bDs5QoG.png)

* Now we can make some assertions
  - Checking that both our spies were called with the correct stuff
    + history.push should have last been called with `/`
    + onSubmit should have been called with an expense

```
// MORE CODE

test('should handle onSubmit', () => {
  const onSubmit = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage onSubmit={onSubmit} history={history} />
  );
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(onSubmit).toHaveBeenLastCalledWith(expenses[0]);
});

// MORE CODE
```

* Now if your change your `AddExpensePage` code
  - Maybe you change the path from `/` to `/123` then you will get an error because the spies would not have been called with the correct data

## DRY
* If we are using the same code in lots of places we can refactor
* As you test you will find that you are building up your code

### Jest > Globals > Method (life cycle methods)
* afterAll(fn)
  - [docs](https://jestjs.io/docs/en/api#afterallfn-timeout)
  - Runs a single time after all the test cases in a given file complete
* afterEach(fn)
  - [docs](https://jestjs.io/docs/en/api#aftereachfn-timeout)
  - Runs after each test in the test file completes
* beforeAll(fn)
  - [docs](https://jestjs.io/docs/en/api#beforeallfn-timeout)
  - Runs one time before any of the tests run
* beforeEach(fn)
  - [docs](https://jestjs.io/docs/en/api#beforeeachfn-timeout)
  - Runs one time before each test case

## Using these LCM (Life Cycle Methods)
* We'll be able to setup the spies and the component and then each test case can worry about just using those

`AddExpensePage.test.js`

```
// MORE CODE

import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

let onSubmit, history, wrapper;

test('should render AddExpensePage correctly', () => {

// MORE CODE
```

* We use the comma syntax to define 3 variables
* But we don't give any values to these 3 variables (so they still are undefined)
  - The goal
    + To define these variables and define fresh copies before every single test case (so each test case starts with spies that haven't been called and a wrapper that is what it should be when it first gets rendered)
    + To accomplish this we'll be using `beforeEach(fn)` to run some code before each test case
* **note** All of these LCM functions take a function as an argument
  - So we call these LCM functions and we pass in a **callback**

```
// MORE CODE

let onSubmit, history, wrapper;

beforeEach(() => {
 //
})

test('should render AddExpensePage correctly', () => {

// MORE CODE
```

* The beforeEach() function will run, Jest will be the one that calls it "before each test case"
* Inside `beforeEach()` we define real values for `onSubmit`, `history` and `wrapper`
* We just grab our code that was repeating and remove the `const` as we don't define new variables, instead we want to define a new value for the variables we set above

```
import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import { expenses } from '../fixtures/expenses';

let onSubmit, history, wrapper;

beforeEach(() => {
  onSubmit = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(onSubmit).toHaveBeenLastCalledWith(expenses[0]);
});
```

* Now save and the tests works as before but we found a way to save time with less typing and we get to reuse our test code

## Next
* Go through exact same process for EditExpensePage (Challenge)
  - We'll do some refactoring
  - Add mapDispatchToProps
  - Creating the test file
  - Writing a few test cases
