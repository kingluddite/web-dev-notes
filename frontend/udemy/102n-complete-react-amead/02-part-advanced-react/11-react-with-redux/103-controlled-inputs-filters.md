# Controlled Inputs for filters

## One goal in this page: Learn how to filter by the text value
* Currently in our app the text filtering is working but currently we have no way to write to the store
* In this page we'll learn how to write to the store
  - AKA... Learn how to dispatch from a connected component

## Make a new file for the component filters

`components/ExpenseListFilters.js`

* We'll start off created a basic presentational component

```
import React from 'react';

const ExpenseListFilters = () => (
  <div>
    <h1>Expense List Filters</h1>
  </div>
);

export default ExpenseListFilters;
```

* But we'll need the end user to input text into a text box so change our SFC to this:

```
import React from 'react';

const ExpenseListFilters = () => (
  <div>
    <input type="text" />
  </div>
);

export default ExpenseListFilters;
```

* We'll want this input textbox to appear in our Dashboard
## Import and render component
`ExpenseDashboardPage.js`

```
import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseList />
    <ExpenseListFilters />
  </div>
);

export default ExpenseDashboardPage;
```

* We should now see the textbox

![filter text box](https://i.imgur.com/fmLRUiH.png)

## Goal: Get the old value off of the store
* **remember** There is a value being set behind the scenes
* We set it right away to Water
* Then we set it to Bill
* It is important for us to make sure the input always matches up with the current text on the redux store
* So if that changes via a dispatch call we want to make sure we are reading that value and using it inside of our textbox

## How can we get this done?
* We can do this by connecting ExpenseListFilters to the store

```
import React from 'react';
import { connect } from 'react-redux';

const ExpenseListFilters = props => (
  <div>
    <input type="text" value={props.filters.text} />
  </div>
);

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);

```

* Now view it in the UI and you'll see the input update with the current value of the filtered text
* This is great
  - We are reading off of the store from the ExpenseListFilters component using that data in a meaningful way
  - But this is only 1/2 of the puzzle - How do we dispatch from the component? How do we do something any time the text input gets changed by the user?

## Houston we have a problem
* Warning in console with "You provided a `value` prop to a form field without an `onChange`"
* We'll deal with this momentarily

## Houston we have another problem
* Try to change the text inside the textbox - You can't!
* This problem is related to the warning we received from React in the console
  - "VM6689 checkPropTypes.js:20 Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`"

### Fix for the issue
* When we set the value we're not just setting the initial value
* If we wanted to do that we have access to `defaultValue`
* Let's make that change

```
// MORE CODE

const ExpenseListFilters = props => (
  <div>
    <input type="text" defaultValue={props.filters.text} />
  </div>
);

// MORE CODE
```

* That gets rid of the console warning and we can change the text in the textbox but it is no longer in sync with the current value of the filtered text in our Redux store
* So we don't want to use `defaultValue` and keep using `value` attribute but also we'll use an `onChange` handler
  - `onChange` takes a function and every single time the input changes the function fires
  - We have access to the event object (we'll designate it as `e`)
  - We'll log it out based on the target's value like this:

#
```
// MORE CODE

const ExpenseListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => {
        console.log(e.target.value);
      }}
    />
  </div>
);

// MORE CODE
```

* Now our input updates with the current Redux store filter text value
* We don't get the React warning
* We can type in the input and we see in the console the current value of what we are typing in the input box

## Houston we have a problem
* We see the letter we type appended to the value inside the input but it gets erased and only remembers the last letter we type in

### Solution to this issue
* To make this work we need to change the Redux store from inside this event handler function
  - This means we need to use dispatch() in order to update the store so our key strokes actually result in a change to the input

#
```
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

const ExpenseListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => {
        props.dispatch(setTextFilter(e.target.value));
      }}
    />
  </div>
);

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

* We use React dev tools to see that in the component we have access to the Redux dispatch function via `props.dispatch()`
  - We pass it the current value in our input
  - We make sure to import the `setTextFilter` as a named export
  - And now we'll see the input textbox able to be updated and if we populate it with `Gas` or `Water` only those expenses are filtered out

## Big news!
* We just created a component that is both reading from the store and writing to the store
  - This is essential for any app you make
  - The whole point is for the user to interact with the app
    + to add, remove information
    + We now know how to dispatch from components so we have both sides of the equation figured out!
      * We know how to read from Redux
      * And we know how to dispatch to change the Redux store

## Challenge
* Use what we just figured out to remove an expense from the ExpenseListItem component
* We don't need anything from the state so we can use this:

`export default connect()(ExpenseListItem)`

* We don't need to add a variable with `mapStateToProps`

`ExpenseListItem.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
  <div>
    <h3>Desc: {description} </h3>
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

* When we use connect() we then get access to `dispatch` in our ExpenseListItem component
  - We destructure `id` and `dispatch`
  - **note** Don't pass an argument of `id` to the function passed to the onClick event handler
  - removeExpense action generator is expecting `id` inside an object so when called removeExpense() we pass `id` like this `removeExpense({ id })`

## Test it out in the UI
* Click the `Remove` buttons and the expenses will be removed from the list
* **note** If you refresh the page, the data returns - the change has not persisted

## Next - Continue working on filters for our app
