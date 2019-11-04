# Add a Date Picker
* We'll add a calendar picker to pick the day you add the expense

## Moment.js
* Is a time library
* It makes it real easy to work with, manipulate and format time
* We'll use it now with our date picker
* We'll use it later to format our timestamp
  - Turns `1410715640579` to `Sunday, October 13, 2019`
* [momentjs docs](http://momentjs.com/)

## airbnb/react-dates
* We'll also need this
* [airbnb/react-dates](https://github.com/airbnb/react-dates)
* This will make is easy to drop a calendar picker into your apps
    - [samples of range of dates date picker](http://airbnb.io/react-dates)
      + We won't need that in this app
    - We'll use the SDP (SingleDatePicker) - click on it from the website above
      + End users will just this to pick the date their expense will be associated with

## Install both of these tools
`$ npm i moment react-dates`

`$ yarn add moment react-dates`

### react-addons-shallow-compare
* react-dates also needs you to install a dependency
* We won't use this but it is required that you install it
* react-addons-shallow-compare is a simple utility library
  - It is currently no longer supported but react-dates hasn't changed their code to not rely on it

`$ npm i react-addons-shallow-compare`

`$ yarn add react-addons-shallow-compare`

## Start app again
`$ npm run dev-server`

## Let's play around with moment.js
* Import it into ExpenseForm.js
* Let's experiment by logging stuff to screen

### Create a new date the js way
```
const date = new Date();
```

* Now we can pull out from `date` the number of seconds, months, years and we can use those to create a formatted string
* But the js date API is terrible
  - It is super complex to get even the simplest thing printed
  - You can use moment in all apps when working with date and avoid the headache of the native date API to JavaScript
  - Moment is the standard currently for working with dates

## Let's take moment for a test spin
`ExpenseForm.js`

```
// MORE CODE

import React, { Component } from 'react';
import moment from 'moment';

// the js date way to create a new date
const date = new Date();

// the moment way
const now = moment();

export default class ExpenseForm extends Component {

// MORE CODE
```

* Now we have a tons of moment methods at our fingertips
* Let's see them all

`ExpenseForm.js`

```
// MORE CODE

// the moment way
const now = moment();
console.log(now);

// MORE CODE
```

* Open console tab in Chrome and expand Moment and then expand the `__propt__` chain (look at all those methods we can work with!)

![lots of methods](https://i.imgur.com/paTIElm.png)

* **note** We'll only use a small subset of these methods

## Get the date out using moment.js
* Use the `format()` method
* You can call `format()` with no arguments at all and it will print a formatted version

```
// MORE CODE

// the moment way
const now = moment();
console.log(now.format()); // 2019-10-13T11:42:35-07:00

// MORE CODE
```

* Obviously `2019-10-13T11:42:35-07:00` is not very reader friendly
* But to make it prettier is when we use the methods and provide arguments to them
* **note** Good news - momentjs has great documentation

## We want to display time
* Easy just go to the website click Docs in the navbar and click the `Display` link
* [Display Time docs](https://momentjs.com/docs/#/displaying/)

```
moment().format();// "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)

moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"

moment().format("ddd, hA");                       // "Sun, 3PM"
moment('gibberish').format('YYYY MM DD');         // "Invalid date"
```

They have a table where they list all the `Tokens` which are just strings that we plug into moment methods as arguments and it will output what the table shows you

## Let's turn our moment `now` into a 3 character representation of the current month
```
// the moment way
const now = moment();
console.log(now.format('MMM')); // Oct (my current month)
```

## Now let's add the cardinal day using `Do`
```
// the moment way
const now = moment();
console.log(now.format('MMM Do')); // Oct 13th
```

* The space has no special meaning other than separating the 2 values with a space

## Add a 4 digit year
```
// the moment way
const now = moment();
console.log(now.format('MMM Do YYYY')); // Oct 13th 2019
```

## If you want to add a comma - easy just add a comma
```
// the moment way
const now = moment();
console.log(now.format('MMM Do, YYYY')); // Oct 13th, 2019
```

* We don't need to use a ton of moment to get the react-dates library working
* We'll just use it in a very basic sense
* We need to create a new moment and pass that in (that's how react-dates gets populated with its initial day)
  - Then we also need to work with moment because when the end user interacts with that calendar and they pick a day, we get that day back
    + This means that as a programmer we need to be able to work with moment objects being generated by other libraries
    + We know enough to get all that done so let's start integrating the react-dates library

## Let's import the SingleDatePicker
* It is a named export

`ExpenseForm.js`

```
import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

 // MORE CODE
```

### We also need to import CSS for this date picker
* We could import this wherever we like but I'll import it in the component that is using it

```
import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// MORE CODE
```

* Make sure you have no errors before continuing
* Scroll down to the react-dates doc until you get to the `SingleDatePicker`

### Required props for SingleDatePicker
* Here is the minimum REQUIRED setup you need to get the SingleDatePicker working:

```
<SingleDatePicker
  date={this.state.date} // momentPropTypes.momentObj or null
  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
  focused={this.state.focused} // PropTypes.bool
  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  id="your_unique_id" // PropTypes.string.isRequired,
/>
```

* Add this to our code

`ExpenseForm.js`

* First let's use moment to create our createdAt date in state and pass that down to our new datepicker

```
// MORE CODE

export default class ExpenseForm extends Component {
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment()
  };

// MORE CODE
<input
  type="text"
  placeholder="Amount"
  value={this.state.amount}
  onChange={this.onAmountChange}
/>
<SingleDatePicker
  date={this.state.createdAt} // momentPropTypes.momentObj or null
  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
  focused={this.state.focused} // PropTypes.bool
  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
  id="your_unique_id" // PropTypes.string.isRequired,
/>

// MORE CODE
```

* We need to create a handler for when the date change

```
// MORE CODE

onDateChange = createdAt => {
  this.setState({ createdAt });
};

render() {

// MORE CODE

        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="your_unique_id" // PropTypes.string.isRequired,
        />

// MORE CODE
```

* Above is similar to our previous event handlers but this one gets called by the 3rd party library `react-dates`

## We'll default our date picker to not focused

```
  state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false // add this line
  };

```

* We could use `focused` but let's use `calendarFocused` to be more specific

```
        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // ADD THIS LINE
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          id="your_unique_id" // PropTypes.string.isRequired,
        />
```

* We also have to provide a handler
* When the end user interacts with that calendar there will be times the 3rd party library needs to tell you that it will close (so all we need to do is provide a handler - we'll call this handler `onFocusChange`)

```
// MORE CODE

        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          onFocusChange={this.onFocusChange} // ADD THIS LINE
          id="your_unique_id" // PropTypes.string.isRequired,
        />

// MORE CODE
```

* We look at their docs and see

```
onFocusChange={({ focused }) => this.setState({ focused })}
```

* The first argument is an object, they are destructuring it and grabbing the focused property and then they just set that to state
  - We'll use the property we set up `calendarFocused`

```
// MORE CODE

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  render() {

// MORE CODE
```

## UPDATE!!!
* Note RTFM issue (Read the F****** Manual) - An expression that means trying to do something without reading the instructions first

![need this to work](https://i.imgur.com/YsW6Vmq.png)

### View in UI
* On Add Expense page we see the calendar is working

### Yes the current CSS is terrible!
* Need to install dependency for react-dates
* But I can pick dates and the textfield updates
* But I can't go back in time and we'll need to fix that
* I can only pick current day or days in future

### I only want to see 1 month
* Just do this:

```
// MORE CODE

        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
          id="expenseDatePicker" // PropTypes.string.isRequired,
          numberOfMonths={1} // ADD THIS LINE
        />

// MORE CODE
```

* View and now you'll see we just see a single month

## Now we need to use months in past
* So we'll use `isOutsideRange` this takes a function that takes the day in question as an argument
  - We don't care about any day as it will never be outside of the range
  - All we need to do is return `false` and that will make every single day available to us

```
  <SingleDatePicker
    date={this.state.createdAt} // momentPropTypes.momentObj or null
    onDateChange={this.onDateChange} // PropTypes.func.isRequired
    focused={this.state.calendarFocused} // PropTypes.bool
    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
    id="expenseDatePicker" // PropTypes.string.isRequired,
    numberOfMonths={1}
    isOutsideRange={() => false}
  />

```

* Now all days past and present are available to us
* View in UI and check for yourself

## Check to see how our state updates with the moment js date object
![the date picker is working - look at our state updated!](https://i.imgur.com/MQUqh0p.png)

## Recap
* We installed moment and react-dates
* moment makes working with time easier
* react-dates is a calendar picker that requires moment
  - When we create a calendarDayPicker we need to provide it with an initial value and we do this by providing the current time to our picker and we dump that in the date picker so the current date is what we see when our component loads
  - We track changes and track changes to focused
* We added some customization
  - We changed the number of months
  - We changed so we could see months in the past
  - The docs offer a ton of other options available to us too!
  - The docs aren't that great so you may need to search to find answers to unique questions

## Congrats!
* All of our component state values are being tracked
  - description, amount, createdDate, note
  - All are getting changed in real time

## Next
* We'll dispatch an action when the form is submitted to save our data
