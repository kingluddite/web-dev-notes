# Creating Expense Add/Edit Form
* We want to filter events with meaningful dates
* So we first need to add them

## Add Expenses right from the UI
* DRY
    - We will create code that will be reusable on both AddExpensePage and EditExpensePage

`ExpenseForm.js`

```
import React from 'react';

class ExpenseForm extends React.Component {
  render() {
    return <div>ExpenseForm</div>;
  }
}

export default ExpenseForm;
```

* AddExpensePage.js

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

* View and see basic dummy form on UI via `http://localhost:8080/create` route

`ExpenseForm`

```
import React from 'react';

export default class ExpenseForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Description" autoFocus />
          <input type="number" placeholder="Amount" />
          <textarea placeholder="Add a note for your expense (optional)" />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
```

* We won't worry about date field as we'll use third party for that
* We want to use local state to track changes
    - Only when user does something with form will will do something with their form data
    - We'll keep track of all their changes and when they submit form we'll dispatch to redux

```
import React from 'react';

export default class ExpenseForm extends React.Component {
  state = {
    description: '',
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input type="number" placeholder="Amount" />
          <textarea placeholder="Add a note for your expense (optional)" />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
```

* We don't just set value of description input because that would create a read only field and react would give us the onChange error
* We add state (that is why we created a class component and not a stateless functional component)
* Whatever user types in field we add to the local state for this component 

## Test state
* View UI
* View React Dev tool
* Search for ExpenseForm component
* Fill out description field
* Watch how state changes in real time
* **note** If we don't use `onChange` we then have a **read only** input field

## Challenge
* Do same thing for note field

```
import React from 'react';

export default class ExpenseForm extends React.Component {
  state = {
    description: '',
    note: '',
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input type="number" placeholder="Amount" />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
```

## Gotchas
* You get a strange error if you did this:

```
onNoteChange = e => {
  // const note = e.target.value;
  this.setState(() => ({ note: e.target.value }));
};
```

* You can use e.target inside function
* But you can't use it inside a callback, since the callback doesn't run right away

### Workaround - e.persist()
```
onNoteChange = e => {
  // const note = e.target.value;
  e.persist();
  this.setState(() => ({ note: e.target.value }));
};
```

* Either way works
* Those are your two options
* I will use the first way

```
onNoteChange = e => {
  const note = e.target.value;
  this.setState(() => ({ note }));
};
```

## The number field
* Good thing is we can only enter numbers in the field
* But with decimals we need to limit it to only 2 decimals (example: 100.01)
* To do this we need to use a text field
    - And use our own validation code

### regex101.com
* Great site for created regular expressions
* Look for a digit `/d`
* We don't want anything but a digit to start so we use `^`
    - `^/d`
    - But that will only match first digit and we want to get all digits
    - `^/d*`
    - But add a decimal and we lose the full match
    - Not all numbers will have decimals so they are optional
    - So to create an optional group you use `()?`
    - But we need to show a `.` and we have to escape that `\.`
    - And we want numbers to follow the `.` do `\.\d`
        + `^\d*(\.\d)`
    - But we want to have only two numbers so we use {0,2} (low end 0, high end 2)
        + `^\d*(\.\d){0,2})?$`
        + `$` means our number ends here

![regex101.com](https://i.imgur.com/I1WFM7Y.png)

```js
onAmountChange = e => {
  const amount = e.target.value;

  if (amount.match(/^\d*(\.\d{0,2})?$/)) {
    this.setState(() => ({ amount }));
  }

};
```

* We set up a default state for amount

```
import React from 'react';

export default class ExpenseForm extends React.Component {
  state = {
    description: '',
    note: '',
    amount: '',
  };
// MORE CODE
```

* We add our amount event handler

```
// // MORE CODE
<input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
<textarea
  placeholder="Add a note for your expense (optional)"
  value={this.state.note}
  onChange={this.onNoteChange}
/>
// // MORE CODE
```

* Now you can type as many numbers as you want
* Can't type letters
* Can type only one decimal
* Can only type two numbers after the decimal
