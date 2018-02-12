# Add a Date Picker
* [momentjs](http://momentjs.com/)
* [airbnb/react-dates](https://github.com/airbnb/react-dates)
    - [samples of date picker](http://airbnb.io/react-dates/?selectedKind=DateRangePicker%20%28DRP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)
    - [SingleDatePicker](http://airbnb.io/react-dates/?selectedKind=SingleDatePicker%20%28SDP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

## Install both
`$ yarn add moment react-dates`

* Need to install dependency for react-dates

`$ yarn add react-addons-shallow-compare`

## start server again
`$ yarn run dev-server`

`ExpenseForm.js`

```
import React from 'react';
import moment from 'moment';

const now = moment();
console.log(now);
// MORE CODE
```

* View in dev tools
* Open moment and `__proto__` chain to see where all the methods are defined (and there is a ton of them we now have access to)

## Get the date out with `format()`
`console.log(now.format());`

* Outputs `2018-01-20T16:37:07-08:00`

## Moment site documentation
* View Docs > Display
* Add your tokens to format and you get the date you want

`console.log(now.format('MMM'));` ---> Jan

`console.log(now.format('MMM Do, YYYY'));` --> Jan 20th, 2018

* space and commas have no special meaning so add them to make your date look nicer

## Add SingleDatePicker from react-dates
`ExpenseForm.js`

```
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
// MORE CODE
```

* We import both the SingleDatePicker and the css needed for that picker

`ExpenseForm.js`

```
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM Do, YYYY'));
export default class ExpenseForm extends React.Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;

    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => {
    this.setState(() => ({ createdAt }));
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
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
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
          />
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

### Change number of months shown to 1
```
<SingleDatePicker
  date={this.state.createdAt}
  onDateChange={this.onDateChange}
  focused={this.state.calendarFocused}
  onFocusChange={this.onFocusChange}
  numberOfMonths={1}
/>
```

## Pick any day in future or past (past by default is not allowed)
```
<SingleDatePicker
  date={this.state.createdAt}
  onDateChange={this.onDateChange}
  focused={this.state.calendarFocused}
  onFocusChange={this.onFocusChange}
  numberOfMonths={1}
  isOutsideRange={() => false}
/>
```

## Check state of date
* View React dev tools
* Search for ExpenseForm
* Change date to past or future and see how when you view state and expand Moment object you see date updates in real time

## Next - dispatch an action
* All of our form data is being updated in component state in real time
* We need to dispatch an action to update the redux store when the form gets submitted
