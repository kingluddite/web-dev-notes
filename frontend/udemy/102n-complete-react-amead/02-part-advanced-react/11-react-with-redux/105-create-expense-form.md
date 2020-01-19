# Creating Expense Add/Edit Form
* We'll now focus on a page that doesn't exist
* We need a way to create expenses with meaningful dates so we can test our sorting better
* After we are done this page of notes the end user should be able to add expenses right from the UI
  - So we won't be adding a ton of code inside the AddExpensePage component
  - Instead we'll render a single component that has the complexity built in
  - We'll add that same complexity inside EditExpensePage

## ExpenseForm
* This will be the form we'll use for adding and editing
* Create this new SFC inside components
* This will contain
  - All the form fields
  - All the validation
  - All the logic to get that form to work

```
import React from 'react';

const ExpenseForm = () => (
  <form>
    <input />
  </form>
);

export default ExpenseForm;
```

* But we need to create a CBC because we'll need state

`ExpenseForm.js`

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  render() {
    return <div>Expense Form</div>;
  }
}
```

* Add this component to our AddExpense component

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

## View in UI
* You'll see our very basic form rendered to the page

![add expense](https://i.imgur.com/W3iqc3O.png)

## Time to build out our form
* And the inputs we'll need
* We'll work on `amount` and `note`
* We will deal with `createdAt` later (we'll use a 3rd party date picker)

### description text field
* `type` is `text`
* We'll set a `placeholder`
* We'll use `autoFocus` (it will automatically put the cursor on that input - this is good UX)
* But eslint says using autoFocus is bad for accessibility so we'll remove it

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Description" />
      </form>
    );
  }
}
```

* Here is our form so far:

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Description" />
        <input type="number" placeholder="Amount" />
        <textarea placeholder="Add a note for your expense (optional)" />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

## local component state
* We'll use local component state to track the changes to all of these inputs
* Only when the user actually submits the form will we do something with that information and try to update our Redux store
  - So we'll track the changes to every single input
  - When they submit the form we'll send the changes off to the Redux store
    + This will create the new expense or edit an existing expense

## We'll start with state and description
* The note is optional
* The number we'll start at `0`
* The description is the thing the end user needs to add

### Step 1 - Set the current value
* We'll set the value to the current value of the state

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  state = {
    description: '',
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Description"
          value={state.description}
        />
        <input type="number" placeholder="Amount" />
        <textarea placeholder="Add a note for your expense (optional)" />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

## Houston we have a problem!
* Don't forget to use `this` as it represents the class

`ExpenseForm.js`

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  state = {
    description: '',
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
        />
        <input type="number" placeholder="Amount" />
        <textarea placeholder="Add a note for your expense (optional)" />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

* **remember** Above will just create a 'read only' value and we want to give the user the ability to change the value (don't believe me... try to type inside the Description textbox ---- you can't!)
* So we also need to set up an `onChange` event handler
  - We'll set it equal to an function we haven't created yet `onDescriptionChange`

#
```
// MORE CODE
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input type="number" placeholder="Amount" />
        <textarea placeholder="Add a note for your expense (optional)" />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

### Let's right our function
* We'll need to pass the event object because that is where the value lives we need to access
* We grab the existing description text and set the state

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  state = {
    description: '',
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState({
      description,
    });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input type="number" placeholder="Amount" />
        <textarea placeholder="Add a note for your expense (optional)" />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

* Use the React dev tools to see how when you update the description textbox the state updates

![update state of description](https://i.imgur.com/rnlUQS1.png)

## Challenge
* Do same thing for our note textarea

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
  };

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

  render() {
    return (
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
          onChange={this.onNoteChange}
          value={this.state.note}
        />
        <button>Add Expense</button>
      </form>
    );
  }
}
```

* Now note and description can be updated in the local state of our class component
* **note** If you add new lines you'll see the react dev tool shows you that new lines were added

![new lines added in notes](https://i.imgur.com/vzIW3Or.png)

## Did you try this way instead?
```
// MORE CODE

  onNoteChange = e => {
    // const note = e.target.value;
    // e.persist();
    this.setState({
      note: e.target.value,
    });
  };

// MORE CODE
```

* I could not generate the error but this is supposed to trigger a warning about synthetic event

![synthentic warning](https://i.imgur.com/7nbZ1cV.png)

* The problem is that if you try to use e.target.value inside the callback it isn't supposed to work, because the callback doesn't run right away
* It does work if you pull it out first (like we did the previous way we had it)
* There is a work around if you get this error, if you must keep the original synthetic event around use e.persist();

### e.persist()
```
// MORE CODE

  onNoteChange = e => {
    // const note = e.target.value;
    e.persist();
    this.setState({
      note: e.target.value,
    });
  };

// MORE CODE
```

* And that will work

## Let's talk about `amount`
* We will only allow you to enter number
* We will limit the numbers aften the decimal
* We will need to override how we are working with amount now
  - Instead of just blinding taking the input and setting it for amount we will use a bit of conditional logic in our onChange handler
  - We currently can't add letters because we used the type of `number` - that is good
  - But we are working with money and we only want 2 decimals and right now we can type a gazillion numbers after our decimal - this is not good

## To fix this
* We need to switch from number type to text
* And we'll have to add our own validation in

```
import React, { Component } from 'react';

export default class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
  };

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

  onAmountChange = e => {};

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          onChange={this.onAmountChange}
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

### We'll use regex
* Great [site for regular expressions](https://regex101.com/)

#### Practice using this web site
* Let's look for a digit
  - Enter 1095 in 'Test String' box
* Gives you an explanation when using `\d` (matches a number [0-9])

![digit search](https://i.imgur.com/KHWl8Q7.png)

But if you enter `a1095` in Test String that is not good so we want to force the number to begin with a number

## The ^ (carrot)
* This will force the number to begin with a digit

`^\d`

* `a1095` won't match
* `1095` will match!

## Problem is it is only matching the 1st digit
* We can easily match all numbers just by appending a `*`

`^\d*`

* Now we have a full match of 1095
* We can add as many numbers as we want which is good

## Houston we have a problem
* When we add a decimal we lose the match

1095.123

* Decimals are optional so we need to use a new group `()` and append a `?` to make it optional
* Matches between 0 and 1 times so 1095.50.50 won't work

## Match the `.`
* We need to escape this character as it is reserved

`^\d*(\.)?`

* But we are looking for numbers after it

`^\d*(\.\d)?`

* That will only find 1 number
* We just want 2 numbers after it  

`^\d*(\.\d{2})?`

* but we want a range of 0 to 2 numbers

`^\d*(\.\d{0,2})?`

* But if we have this number `1095238423498234.12333`
* We don't want a match so we add a `$` at the end

`^\d*(\.\d{0,2})?$`

* Now we don't get a match
* But this will match

![full match](https://i.imgur.com/rZwxTfw.png)

* Now we need to plug this into our code using the string match() method
  - match() takes our regex in (we need to add in the `/` (website added it for us) but we'll need to add them in our code)

`ExpenseForm.js`

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

<input
  type="text"
  placeholder="Amount"
  value={this.state.amount}
  onChange={this.onAmountChange}
/>

// MORE CODE
```

## Test in UI
* You can now only enter numbers and if you want to add a decimal you can only add 2 decimal points
* If our regex has a match we can set state if not it won't
* We could have checked later on when we submit the form but doing it this way makes sure the number is entered in the format we want (money)

## Recap
* We set up the 3 inputs we need and validated them in local state of the component
* We are tracking their values over time

## Next
* We'll work on formatting the date for our app

## We are going to reuse a form
* The form we will create will be used for both creating and editing expenses
* This is following the DRY principal

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
