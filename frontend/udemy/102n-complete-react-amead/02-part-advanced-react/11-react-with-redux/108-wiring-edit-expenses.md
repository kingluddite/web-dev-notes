# Wiring up Edit Expenses
* Will be very similar to what we did on the AddExpensePage

`EditExpensePage.js`

```
import React from 'react';

const EditExpensePage = props => {
  console.log(props);

  return <div>Editing the Expense with and id of {props.match.params.id}</div>;
};

export default EditExpensePage;

```

## Just small changes
* We'll modify our state in the ExpenseForm

`ExpenseForm.js`

```
// MORE CODE

export default class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    descError: '',
    amtError: '',
  };

// MORE CODE
```

* Currently we always use:
  - An empty string for the default values for
    + description
    + note
    + amount
  - And we always use the current date for `createdAt`
* The AddExpensePage is fine with those defaults
* The EditExpensePage is not fine with those defaults
  - Why?
    + Because it wants to provide the current values for that expense
    + How can we do this?
      * Easy. Just set up a single optional prop that gets passed into ExpenseForm
        - If the prop exists we'll use those values for our Expense form
        - If not we'll rely on the defaults

## Add link to EditExpensePage
* To get to that page we use this route:

`routers/AppRouter.js`

```
// MORE CODE

      <Route path="/edit/:id" component={EditExpensePage} />

// MORE CODE
```

* Start up app `$ npm run dev-server`
* So enter `http://localhost:8080/edit/1234` and you'll see

[editexpensepage](https://i.imgur.com/SobPvEC.png)

## Challenge
* Make h3 a link on ExpenseListItem.js to link to that specific expense

`ExpenseListItem.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Desc: {description}</h3>
    </Link>
    <p>Amount: {amount} </p>
    <p>Created:{createdAt}</p>
    <button
      onClick={() => {
        dispatch(removeExpense({ id }));
      }}
    >
      Remove
    </button>
  </div>
);

export default connect()(ExpenseListItem);
```

* View the app and now you can link to any individual expense

## Connect EditExpensePage to the Redux store
* We have the `id` ({props.match.params.id}) but that is not enough information
* We want to get the entire expense object

## Steps to do this
1. Import connect
2. Search the expenses array for the `id` that matches the one we have on this page

* We'll need to use mapStateToProps in this component
  - We need to give the component the current expense object
  - We'll be able to access the state (great because that's where the expenses array lives and we're going to search it)
    + What are we searching the expenses array again for?
      * For the matching `id` that we grabbed from the URL using `props.match.params.id`
      * **note** We actually have access to the props as the second argument

```
// MORE CODE

const mapStateToProps = (state, props) => {
  //
}

export default connect(mapStateToProps)(EditExpensePage);
```

* Now we can take some of the current props that were passed into the HOC and we can use them to calculate the props that we want to add on
* So react router renders our HOC
* The HOC component passes the props through and also allows us to add on some new ones
* We'll use the array `find()` method
  - `find()` allows us to search through the array to find a single item
  - We determine whether we found the correct item by returning true from the callback

#
```
import React from 'react';
import { connect } from 'react-redux';

const EditExpensePage = props => {
  console.log(props);

  return <div>Editing the Expense with and id of {props.match.params.id}</div>;
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpensePage);
```

* Now since we are logging props we can see that our EditExpensePage component has access to the individual component
  - Click on the Dashboard and a different expense and you'll see the expense object updates to match that expense
* [expense object is working](https://i.imgur.com/z8CRKIv.png)

## Now we can render ExpenseForm in the EditExpensePage
* We'll also log the expense object when the form is submitted

`EditExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => {
  console.log(props);

  return (
    <div>
      Editing the Expense with and id of {props.match.params.id}
      <ExpenseForm
        onSubmit={expense => {
          console.log(expense);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpensePage);
```

* Enter dummy text into form and submit and you'll see the expense object is logged to the console
* [updated expense object to console](https://i.imgur.com/sVvRotu.png)

## Houston we have a problem
* We see the form but the fields are not populating with their current values
* We just have to pass the expense down as a prop

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        console.log('updated', expense);
      }}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpensePage);
```

## Goal: Do something with this 4 state values
* description
* note
* amount
* createdAt

![4 state values](https://i.imgur.com/HznGHDZ.png)

* Only use the defaults in above screenshot if no expense was passed down to the ExpenseForm
* This will make sure the AddExpensePage ExpenseForm form still works
* And if an expense was passed down this will make sure the EditExpensePage form will work as well

## How can we do this?
* The only way we can do this is look at the props

`ExpenseForm.js`

```
// MORE CODE

export default class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    descError: '',
    amtError: '',
  };

// MORE CODE
```

* Currently there is no way to look at ExpenseForm props
* The only way to access our props is add our state in the constructor function
* description and note are fairly straightforward

```
// MORE CODE

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: '',
      createdAt: moment(),
      calendarFocused: false,
      descError: '',
      amtError: '',
    };
  }

// MORE CODE
```

### amount has some issues we need to deal with
* It currently is a number
* It is a number that stores the total number in cents
* We want a string and we want it with the decimal place in place

```
// MORE CODE

    this.state = {

      // MORE CODE

      amount: props.expense ? (props.expense.amount / 100).toString() : '',

// MORE CODE
```

### moment has an issue to
* We need to populate moment with a specific point in time (not just the time the code runs which is the time we have here)
  - All we do is pass the timestamp into moment

#
```
// MORE CODE

    this.state = {

      // MORE CODE

      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),

// MORE CODE
```

## Test it out in the UI
* Click on expenses and the form should populate
* Click add expense and the form will not populate

## Now we need to be able to modify our expense
* If we update the form we see the client log updates with the new info
* All we need to do now is just dispatch the new info to the Redux store

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
  </div>
);
// MORE CODE
```

## Test in UI
* Click on Expense in dashboard, edit the expense and submit
* You will be redirected to dashboard with the expense updated

### What's up with passing `expense` directly to onSubmit?
* We did this in AddExpensePage and this is when we submit the form with valid data we'll store that in an expense object
  - So when we submit the form we get that data back with all the stuff we want
    + description, amount, note, createdAt
* Remember in ExpenseForm we store all this info inside an object

```
// MORE CODE

  onSubmit = e => {
    // MORE CODE

    this.props.onSubmit({
      description: this.state.description,
      amount: parseFloat(this.state.amount) * 100,
      note: this.state.note,
      createdAt: this.state.createdAt.valueOf(),
    });
  };

// MORE CODE
```

* So we have access to access to expense like this:

`EditExpensePage.js`

```
// MORE CODE

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        console.log(expense);
        props.dispatch(editExpense(props.expense.id, expense));
        // props.history.push('/');
      }}
    />
  </div>
);

// MORE CODE
```

* Test it out and you'll see the expense object is populated in client console
* But we could have named the expense object anything we want and it still would work

```
// MORE CODE

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={junk => {
        console.log(junk);
        props.dispatch(editExpense(props.expense.id, junk));
        // props.history.push('/');
      }}
    />
  </div>
);

// MORE CODE
```

* This works just the same
* This is an important point to understand because props.expense and junk (or expense) are different. One is the object passed to the component and one is the object created when the form is submitted
* We'll change `junk` back to `expense` as it makes more sense (I'll call it expense form object for more code clarity)

```
// MORE CODE

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expenseFormObject => {
        props.dispatch(editExpense(props.expense.id, expenseFormObject));
        props.history.push('/');
      }}
    />
  </div>
);

// MORE CODE
```

* Make the same update in `AddExpensePage.js`

```
// MORE CODE

const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expenseFormObject => {
        props.dispatch(addExpense(expenseFormObject));
        props.history.push('/');
      }}
    />
  </div>
);

// MORE CODE
```

* Test to make sure it still works

## Challenge - Code Refactor
* We only want to show the remove button page from the EditExpensePage

### Remove from ExpenseListItem
* We no longer need to use dispatch so we can remove connect
* We cut the remove button from this component and paste it into EditExpensePage.js
* We also remove the import for the removeExpense Action Generator
* We can also remove the `dispatch` from the destructuring

`ExpenseListItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>Desc: {description}</h3>
    </Link>

    <p>Amount: {amount} </p>
    <p>Created:{createdAt}</p>
  </div>
);

export default ExpenseListItem;
```

`EditExpensePage.js`

* We need to access dispatch via `props.dispatch()`
* We also need the id variable but we don't have that variable in this component but we do have access to `props.expense.id`
* And we need to redirect the user
* Make sure to import the removeExpense Action Generator

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expenseFormObject => {
        props.dispatch(editExpense(props.expense.id, expenseFormObject));
        props.history.push('/');
      }}
    />
    <button
      onClick={() => {
        props.dispatch(removeExpense({ id: props.expense.id }));
        props.history.push('/');
      }}
    >
      Remove
    </button>
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpensePage);
```

## Test it out in the UI
* You should be able to remove expenses from the EditExpensePage
* But if you refresh they all come back (data persistence is something we'll learn soon)

* We need to link to edit expense route
    - /edit/123
* We will add a link on the individual items to that takes us to that individual page

## Challenge
* Make change to ExpenseListItem component that adds the link EditExpensePage passing it the id of that item

```
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount} - {createdAt}
    </p>
    <button
      onClick={() => {
        dispatch(removeExpense({ id }));
      }}>
      Remove
    </button>
  </div>
);

export default connect()(ExpenseListItem);
```

* Click the h3 and it takes us to the edit route passing the item of that item

## EditExpensePage.js
* Connect this component to the redux store
* We have the `id` but we need the entire expense object
    - We'll search the expenses array with an id that matches the id we passed
* This time we do need state so we'll use `mapStateToProps` function and give the component the current expense object
    - We have access to the state in the first argument
    - We have access to the props in the second argument

```js
const mapStateToProps = (state, props) => {

}
export default connect()(EditExpensePage);
```

* We can take some of the current props that were passed into the higher order component (HOC)
    - And we can use them to calculate the props that we want to add on
    - React Router renders our HOC
    - The HOC passes the props through and it also enables us to add on some new ones
    - The array `find()` method
        + Enables us to search through an array looking for a single item
            * We determine if we found the correct item by returning true from the callback

```
import React from 'react';
import { connect } from 'react-redux';

const EditExpensePage = props => {
  console.log(props);
  return (
    <div>
      Editing the expense with <strong>id</strong> of {props.match.params.id}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

* View dashboard
* Click item
* View dev tool
* Expand match > expense and you'll see the data for that expense

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => {
  console.log(props);
  return (
    <div>
      <ExpenseForm
        onSubmit={expense => {
          console.log('updated', expense);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

1. View dashboard
2. Click item
3. We see form but not seeing data populated
    * To do this we take the expense and pass it down

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        console.log('updated', expense);
      }}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

`ExpenseForm.js`

```
// // MORE CODE
export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }
// // MORE CODE
```

1. Click on dashboard
2. Click item
3. You will see the edit form prepopulated with expense item data
4. We can change the form data and see it in the console but we need to dispatch it to our redux store

## Challenge
* Dispatch the action to edit the expense
* Redirect to the dashboard page
* You should test and see the item content on the dashboard is now updated

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense } from '../actions/expenses';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

## Challenge #2
* Remove expense via dispatch and then redirect to dashboard

`ExpenseListItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {amount} - {createdAt}
    </p>
  </div>
);

export default ExpenseListItem;
```

`EditExpensePage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = props => (
  <div>
    <ExpenseForm
      expense={props.expense}
      onSubmit={expense => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
    <button
      onClick={() => {
        props.dispatch(removeExpense({ id: props.expense.id }));
        props.history.push('/');
      }}>
      Remove
    </button>
  </div>
);

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});
export default connect(mapStateToProps)(EditExpensePage);
```

* Now we successfully moved our delete item button to the edit page
* We delete the item and are redirect to the home page (dashboard)
