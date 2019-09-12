# Wiring up Add Expense
* Wire up submit on form that will dispatch the action as the expense
    - Then we'll redirect user to the dashboard page where they can view the new expense they added

## Improve Regular expression
1. Prevent starting with a `.`
2. Enable delete when full number is highlighted
3. Prevent user from clearing date

### 1. Prevent starting with a `.`
* Currently we can start the number with a `.` and that is not good
* change this:

```js
if (amount.match(/^\d*(\.\d{0,2})?$/)) {
  this.setState(() => ({ amount }));
}
```

* To this:

```js
if (amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
  this.setState(() => ({ amount }));
}
```

* That means instead 0 to infinity --> `*`
* We change it to 1 to infinity -->  `{1,}`

### 2. Enable delete when full number is highlighted
* You can't delete it because that no longer matches the regular express
* Now type a number like `123.11`, highlight it and delete it (you can't)
* Change to this:

```js
if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
  this.setState(() => ({ amount }));
}
```

* Now type a number like `123.11`, highlight it and delete it (it now can be deleted)

### 3. Prevent user from clearing date
* There is no reason for a user to clear a date
* Currently they can

```js
onDateChange = createdAt => {
  if (createdAt) {
    this.setState(() => ({ createdAt }));
  }
};
```

* Now user can't clear date
* Try to clear the date (you, can't)

## Challenge
### Create onSubmit handler for form
* We only need to make sure the description and amount are filled out
* Date can't be empty
* note is optional
* show error if description or amount is empty
* add an error state
* Conditionally render error

`ExpenseForm.js`

```
import React from 'react';
// MORE CODE

export default class ExpenseForm extends React.Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    error: '',
  };

  // MORE CODE

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      // display error
      this.setState(() => ({
        error: 'Please provide description and amount.',
      }));
    } else {
      // clear error
      this.setState(() => ({ error: '' }));
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
        // MORE CODE
        </form>
      </div>
    );
  }
}
```

* You get error if either description or amount are empty
* If both are empty and you click submit, the form submits and error clears

## Time to dispatch the action
* We will do this inside the `ExpenseForm` component

`AddExpensePage.js`

```
import React from 'react';
import ExpenseForm from './ExpenseForm';

const AddExpensePage = () => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        console.log(expense);
      }}
    />
  </div>
);

export default AddExpensePage;
```

`ExpenseForm.js`

```
// MORE CODE
onSubmit = e => {
  e.preventDefault();

  if (!this.state.description || !this.state.amount) {
    // display error
    this.setState(() => ({
      error: 'Please provide description and amount.',
    }));
  } else {
    // clear error
    this.setState(() => ({ error: '' }));
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount) * 100,
      createdAt: this.state.createdAt.valueOf(),
      note: this.state.note,
    });
  }
};
// MORE CODE
```

* We need to convert the amount string to the correct format
    - We'll use the JavaScript parseFloat and pass it the string
    - It returns a floating number (number with decimal)
    - We pass it the base 10 second argument
    - Then we need to convert the number by multiplying it by 100

`amount: this.state.amount` "12.33" ---> "12.33"
`amount: parseFloat(this.state.amount)` "12.33" ---> 12.33
`amount: parseFloat(this.state.amount, 10)` "12.33" ---> 12.33
`amount: parseFloat(this.state.amount, 10) * 100` "12.33" ---> 1233

* createdAt is in the moment object so we need to convert it to milliseconds so we use `moment().valueOf()`

## Take the code for a test drive
* Fill out the form, hit submit and see all the data in an object in the dev console
* We are done with our form

## Time to dispatch
* The AddExpensePage needs to dispatch the action the redux store
* We'll need to import the named export `connect` from react-redux and this will connect this component to the store so it can dispatch
* We don't need anything from the state so we can leave the first () of connect empty
* Now we have access to props.dispatch
* We want to dispatch our action generator (that we need to import)
* Then we dispatch addExpense and pass expense as the sole argument

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
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
```

* Enter data into form
* Submit
* Click Dashboard link
* You will see data listed!

## Add the redirect
* When form is submitted we want to be redirected automatically
* React dev tools
* Search for AddExpensePage
* Expand history
* You will see `push`
    - This enables us to programmatically change pages

`AddExpensePage`

```
// MORE CODE
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

* Enter data
* Click submit
* You will be automatically redirected to home page (dashboard) and data is on page
* We won't get a page refresh, instead we are using browser routing
* Anytime you refresh the data does not persist

### Benefit of history.push() method
* It is just like someone clicked that link and it is maintained in the browser history
