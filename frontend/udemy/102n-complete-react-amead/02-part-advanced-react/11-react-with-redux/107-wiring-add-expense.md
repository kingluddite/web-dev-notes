# Wiring up Add Expense
* We setup on submit from the form and that will allow us to dispatch the action that adds the expense and then we'll redirect the user over to the dashboard page where they can view the new expense they added

## Improve our Regular Expression (just a small change)
* Currently we can start off using a `.` and we don't want that to be a possible entry by the end user
  - We want to force as least one number to come before the dot

#
```
// MORE CODE

  onAmountChange = e => {
    const amount = e.target.value;

    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState({
        amount,
      });
    }
  };

// MORE CODE
```

* Let's look at our current RegEx

`amount.match(/^\d*(\.\d{0,2})?$/)`

* When we use `*` after `d` says "allow between 0 and infinity" of whatever is just before it (which is a number)
  * So currently we could have 0 number or 10,000,000 numbers
  * What we really want is a range of "1 and infinity" and we'll use the **range operator** to get that done
    - We use this `{1,}`
      + Which means on the low end we'll use 1 and on the high end we'll set it to infinity (and we leave the value after the comma empty to represent infinity)

`amount.match(/^\d{1,}(\.\d{0,2})?$/)`

* And we'll plug that into our `onAmountChange()` method:

```
// MORE CODE

  onAmountChange = e => {
    const amount = e.target.value;

    if (amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        amount,
      });
    }
  };

// MORE CODE
```

## Try it out
`$ npm run dev-server`

* Try to start with a `.` in the amount field and you won't be able to
* **note** Make sure you are on the `/create` route
* But you can still type a number like `123.00`

## Houston we have a problem!
* If you highlight the value and hit the delete key... nothing happens!
* The reason is our regular expression no longer matches an empty string
  - So if we want the user to be able to clear the value we'll need to add something to the front of our condition
    + `if there is no amount or the amount is a match`

```
// MORE CODE

  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        amount,
      });
    }
  };

// MORE CODE
```

* Now the value can be highlighted and deleted

## Other nice fixes
* For Description and Amount we will eventually make the fields required and we'll provide an error message if they don't
* But our date has a problem
  - We can highlight the date and delete it and there is no practical reason why we should allow an end user to be able to do this

```
// MORE CODE

  onDateChange = createdAt => {
    this.setState({ createdAt });
  };

// MORE CODE
```

* We'll modify this
* `onDateChange` will be called with a date if one was picked
* If it was cleared it will be called with nothing
* If we add an if statement we can check if there's a value
  - If there is a `createdAt` value then set state to that value, else do nothing

```
// MORE CODE

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };

// MORE CODE
```

* Now our code prevents the user from being able to clear the date value
* But we can still change dates in past or future

## Now we'll setup the onSubmit handler for the form
* We do this by adding the onSubmit prop to our form element

`ExpenseForm.js`

```
// MORE CODE

  render() {
    return (
      <form onSubmit={this.onSubmit}>

// MORE CODE
```

### Now let's create our method
* When the user submits the form we need to prevent the default page refresh

```
// MORE CODE

  onSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
  };

  render() {

// MORE CODE
```

#### Test it out
* Submit the form and you'll see `form submitted` in the client console
* Comment out `e.preventDefault()` just to see what the full page refresh will look like
* By prevented the form's default submit behavior we're now going to take control of what happens by using JavaScript

## Form validation
* We just want to check that there's a value for description (we don't care what the format is)
* If there is a value for amount we already know it will be in the right format (because we added the regular expression checking)
* We know they can't clear the date so they'll always be something there   
* **note** The note field is optional so it's perfectly fine to leave it blank

## Challenge
* You'll need to add an error property to your state and set it to an empty string
* I create an error string for amount and description to fire off either if the validation condition is satisfied

```
// MORE CODE

export default class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    descError: '', // add this
    amtError: '', // add this
  };

  // MORE CODE

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
    console.log('form submitted');
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.descError && <p>{this.state.descError}</p>}
        {this.state.amtError && <p>{this.state.amtError}</p>}

        // MORE CODE

      </form>
    );
  }
}

// MORE CODE
```

* You may see this error

![componentWillReceiveProps warning](https://i.imgur.com/hi4E6xs.png)

* The fix is simple

`$ npm i react-redux@latest`

* Test again still get warning on `/create` route
* I tried to update [but still no update](https://github.com/airbnb/react-dates/issues/1748)

`$ npm i react-dates@latest`

* Just have to look at warning until a code fix comes around

## Let's dispatch our action
* We have our "dummy" text in place when we submit the form and the client console says "form submitted"

## Where will we dispatch this action?
* Not in this `ExpenseForm` component
* Why not you ask?
* Because the whole goal of this component is to be reused in either adding expenses or updating expenses
  - So we'll use the same form `ExpenseForm` in both `AddExpensePage` and `EditExpensePage`
  - And at end of day if we are adding or editing we'll need to dispatch different stuff
  - So what we'll end up doing is just pass the data up and this will allow us to determine what to do with the data when the user submits the form on a dynamic basis
    + So for AddExpensePage component -> we can dispatch the addExpense action
    + For the EditExpensePage component -> we can dispatch the editExpense action

## Let's start with `AddExpensePage` component
`AddExpensePage.js`

```
import React from 'react';
import ExpenseForm from './ExpenseForm';

const AddExpensePage = () => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm />
  </div>
);

export default AddExpensePage;
```

* We'll need to pass the data up from this component and this will allow us to determine what to do with the data when the user submits the form
* We'll provide a single prop on our ExpenseForm component instance which will be `onSubmit`
  - We'll set this up to be a function
  - The function will get called when the form gets submitted with valid data and we get that data back

```
// MORE CODE

const AddExpensePage = () => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm onSubmit={(expense) => {
      //
    }} />
  </div>
);

// MORE CODE
```

* So above we see we get the `expense` object back with all the properties on it (`description`, `amount`, `createdAt` and `note`)

## Now let's call it making sure we get the expense
```
// MORE CODE

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

// MORE CODE
```

* But where will we call this `expense` prop?
  - Inside ExpenseForm (where our "form submitted" console log was)

`ExpenseForm.js`

* Open React Dev tools and search for ExpenseForm and you'll see that `onSubmit` is a prop that has `onSubmit()` function as it's value

```
// MORE CODE

  onSubmit = e => {
    // MORE CODE

    // console.log('form submitted');
    this.props.onSubmit();
  };

// MORE CODE
```

* Test it out and nothing happens
* The reason is we need to call the `onSubmit()` function with some data that is inside an object
  - We'll need to create an object with all of our data for the expense

```
// MORE CODE

    // console.log('form submitted');
    this.props.onSubmit({
      description: this.state.description,
      amount: this.state.amount,
      note: this.state.note,
      createdAt: moment(),
    });
  };

  render() {

// MORE CODE
```

## View in UI console
* Add an expense with valid data
* Submit the form and you'll see the client console with something like this:

![expense object](https://i.imgur.com/CGVUdpg.png)

## Houston we have 2 problems!
1. The amount is a string - we need it to be a number (we want the number with decimal to be parsed to be just cents and not dollars and cents)
2. createdAt is already using moment() to create a timestamp. We need to take the current timestamp and get its value

### Let's deal with the amount first
* Whenever you get a value from a text field it will be a string
* We want to use parseFloat to turn our string to a decimal number and then we just multiply it by 100 to get cents

```
// MORE CODE

    // console.log('form submitted');
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount) * 100,
      note: this.state.note,
      createdAt: moment(),
    });
  };

  render() {

// MORE CODE
```

* Ok, the amount is working as we expect!

## Now let's get our createdAt to be a timestamp
```
// MORE CODE

    // console.log('form submitted');
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount) * 100,
      note: this.state.note,
      createdAt: this.state.createdAt,
    });
  };

  render() {

// MORE CODE
```

## Houston we have a problem!
* But when we submit the form we see that createdAt isn't a timestamp but instead it is a Moment object

![a Moment object](https://i.imgur.com/eLyHnlp.png)

### Solution is in Moment.js docs
* Look at [the Display docs](https://momentjs.com/docs/#/displaying/)
* And specifically the [Unix Timestamp in milliseconds](https://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/)
  - JavaScript works in milliseconds so that's what we'll be using
* We'll use `moment().valueOf();`
  - So we just need to do this `this.state.createdAt.valueOf()`

```
// MORE CODE

    // console.log('form submitted');
    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount) * 100,
      note: this.state.note,
      createdAt: this.state.createdAt.valueOf(),
    });
  };

  render() {

// MORE CODE
```

* And create a valid expense and submit the form

![the correct expense object](https://i.imgur.com/n24tBhU.png)

* Now it is sending the AddExpensePage the correct expense object

## We are finished with the ExpenseForm
* Now all the work will be completed in the AddExpensePage component
* The `AddExpensePage` needs to dispatch the given action to the Redux store
* To do this we'll need to import a couple things to this component
  - We'll import the named export `connect` from react-redux
  - We don't need anything from state so we can leave the mapStateToProps empty

```
import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';

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

export default connect()(AddExpensePage);
```

* After adding the above modification to our code we now have access to `props.dispatch()`
* See for yourself and view the React dev tools and you'll see the AddExpensePage has `dispatch: dispatch()` listed under props

![dispatch under props](https://i.imgur.com/pYvBjlS.png)

## Use the props in our Component
```
import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        props.dispatch(????)
      }}
    />
  </div>
);

export default connect()(AddExpensePage);
```

## What are we going to dispatch?
* An action

### We already have an Action Generator
* We just need to import it (remember it is a named export)

```
import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
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

* Let's look at our addExpense action generator

```
// MORE CODE

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* You see that this action generator is expecting an object with the following properties passed into it: description, amount, note, createdAt
* This is great because this is the object we created and submitted when our end users fills out our form correctly and submits it

## After submitting nothing cool happens
* That was not very exciting
* Did our app break?
* No, it doesn't redirect just yet but if you click on the Dashboard link, you should see the expense you created added to the list of expenses

![expenses added to dashboard](https://i.imgur.com/qxFAQmc.png)

* If you use the React Dev tool and view ExpenseList you'll see all the expenses are listed in the props expenses Array
* You'll see our amounts and timestamps are on the ExpenseList

## Now we need to automate the redirect
* When we do submit the form we want to automatically redirect the user to the Dashboard page
* **remember** The components we render get access to a bunch of special props
  - We explored that when we set up URL parameters
  - Don't remember, see for yourself using the React Dev tools
  - Examine the AddExpensePage component and you'll see some extra props
    + history
    + location
    + match

## We are going to use one of the `history` methods
* On `history` we have access to `push`

![push from history](https://i.imgur.com/1P7GU3n.png)

* push() is how we can programmatically change pages
  - `push()` does take a single string argument and that will be your `path`
    + so the create page would be `props.history.push('/create'` and dashboard would be our home page which would be `props.history.push('/')`

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

// MORE CODE
```

* Using `props.history.push('/')` will not use the full page refresh instead it will switch over using browser routing

## Now the CreateExpensePage is now complete!
* We have validation
* We have our date picker
* We have automatic redirect
* We did all of that while at the same time creating a component that we can reuse while editing our expenses

## Recap
* We passed the date right out of ExpenseForm
* We did that by passing in a prop that gets passed in from the parent
* We did this because we want to reuse ExpenseForm on AddExpensePage and soon also on the EditExpensePage
* Since both EditExpensePage and AddExpensePage need to dispatch different actions we have abstracted that way from ExpenseForm and we just defined 2 lines of code what to do when the date is valid (inside AddExpensePage)
* We will do the exact same with EditExpensePage
* When we did dispatch we added the data to the Redux store
* Then we used the history.push() method to programmatically switch pages

### Is the "back" button preserved in the browser?
* Yes it is
* So after creating an expense and getting redirected to the dashboard, you can click the back button to go back to the Add Expense page
* So using the history.push() method is just as if an end user clicked on a link
## Next - Focus on Editing our expenses






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
