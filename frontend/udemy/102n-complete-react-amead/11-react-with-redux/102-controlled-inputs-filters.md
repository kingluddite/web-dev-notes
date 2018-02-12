# Controlled Inputs for filters
* Learn how to filter by the text value
* Learn how to dispatch from a connected component

`components/ExpenseListFilters.js`

```
import React from 'react';

const ExpenseListFilters = () => (
  <div>
    <input type="text" />
  </div>
);

export default ExpenseListFilters;
```

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

* Get the old value off of the store
    - `water` and `bill`

`app.js`
```js
// // MORE CODE
store.dispatch(setTextFilter('water'));

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
}, 3000);
// // MORE CODE
```

* Important to make sure the input matches up with the current `text` value in the redux store
* We do this by connecting `ExpenseListFilters` to the store

`ExpenseListFilters.js`

```js
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

* Now you'll see the current value of filters text inside the input
* But we can't type inside the input (problem)
* And we get a warning not providing `onChange` handler
    - The reason is we rendered a **read only** field

## Provide an `onChange` handler
* It takes a function
    - Every single time the input changes the event fires

```
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
```

* The value never changes but the log shows the one character entered
* The error disappears
* To fix this we need to change the redux store inside the onChange handler

## React Dev Tools
* We have to dig down to get to our element

```
Provider > AppRouter > Router > div > Switch > Route > ExpenseDashboardPage > div > Connect(ExpenseListFilters) > ExpenseListFilters
```

* We see under Props `dispatch` and `filters`
    - `dispatch` is the exact same distpatch we were accessing on the `store`
        + We can access `dispatch` directly from within this component!
        + We'll import and use `setTextFilter`

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

* Now we can enter text inside the field and we update the redux store
    - We can't see the redux store (we need a dev tool)
    - The page updates with our search!
    - We are now reading and writing to the redux store

## Challenge
* Add a remove 
    - That will dispatch an action when it is clicked
        + import the correct action generator from the actions expenses file
        + connect this component to access dispatch
        + wireup onClick
        + You will need access to the id to remove the item
        + hint: when we use `connect()` we do not have to take anything from the state (even though we don't get values from state we still get access to dispatch)

`ExpenseListItem.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
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

* Click the remove button and the items are removed
* But the change does not persist
* Refresh and they are back
* We will work on making this persistant in the future
