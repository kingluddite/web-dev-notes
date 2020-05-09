# Filtering By Dates
* We will now use the range picker from `react-dates` library
* [airbnb react dates](https://github.com/airbnb/react-dates)
* [link to rangepicker demo](http://airbnb.io/react-dates/?selectedKind=PresetDateRangePicker&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)
    - Enables us to pick a start date and end date

## Files we will be working with
* app.js
* ExpenseListFilters.js
* expenses.js
* filters.js

`filters.js`

* We'll be making changes to `startDate` and `endDate` so that it can work with what the react-dates component expects
  - [docs for moment on start of time](https://momentjs.com/docs/#/manipulating/start-of/)
    + docs > manipulate > start of time
  - [docs for moment on end of time](https://momentjs.com/docs/#/manipulating/end-of/)
    + docs > manipulate > end of time

`src/reducers/filters.js`

```
// MORE CODE

import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {

// MORE CODE
```

* We could use start of year and end of year but we want to not overwhelm the user and just limit the amount of expenses they see over time

## Now we'll wire up the daterangepicker
* Find the docs for this component
* [react-dates](https://github.com/airbnb/react-dates)

```
<DateRangePicker
  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
/>
```

* We will add this to ExpenseListFilters
* We'll need class here so we'll convert this to a class based component
* We convert to a class
* We add state and want to track `calendarFocused`
  - We default this to `null`

#
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={props.filters.text}
          onChange={e => {
            props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          value={props.filters.sortBy}
          onChange={e => {
            if (e.target.value === 'amount') {
              props.dispatch(sortByAmount());
            } else if (e.target.value === 'date') {
              props.dispatch(sortByDate());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

* We use `null` for calendarFocused because it will be `null` for us or it will be a string
* We don't need to do anything with calendarFocused other than keep track of it and pass it down to react components

## Import DateRangePicker
`ExpenseListFilters.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';

// MORE CODE
```

* Now because we are using a class we access props via `this` and not just `props`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null,
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={e => {
            props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          value={this.props.filters.sortBy}
          onChange={e => {
            if (e.target.value === 'amount') {
              this.props.dispatch(sortByAmount());
            } else if (e.target.value === 'date') {
              this.props.dispatch(sortByDate());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

## Add an instance of the DateRangePicker
```
// MORE CODE
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

## We have 3 more required props
* Next - What we do when the dates change?

```
// MORE CODE

        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
        />

// MORE CODE
```

* Now we'll define the `onDatesChange` function above
* This function will be called by the react-dates library
  - It will get called with an object
    + On that object we'll have a start date and an end date
    + We'll could just create a variable and pull them off or we could destructure and pull them off and we'll do the latter

```
// MORE CODE

  onDatesChange = ({ startDate, endDate }) => {
    //
  }

  render() {

// MORE CODE
```

* Now that we have the values we just need to dispatch the correct actions to get the filters to change
  - For us we have those
    + setStartDate and setEndDate

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from '../actions/filters';

// MORE CODE
```

* All we need to do is dispatch and pass in the start and end dates

```
// MORE CODE

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

// MORE CODE
```

## Now we'll plug in the state we're tracking


### Change the default value for startDate and endDate
* We want to default to just showing the expenses for the current month
* We will switch up startDate and endDate to be moment instances instead of numbers

```
// MORE CODE

        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
        />
      </div>

// MORE CODE
```

## Now we need to provide the changeHandler
```
// MORE CODE

        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
        />

// MORE CODE
```

* Now we'll define that above

```
// MORE CODE

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }

  render() {

// MORE CODE
```

## View in UI
* It works as a date range picker
* We can pick the start and end dates
* Our filters are not working at all
* Problems
  - We don't have a way to go back in time
  - We are seeing multiple calendars

## Houston we have a problem
* The filtering has no effect
* We have to change how we are filtering
  - In the past we used numbers for startDate and endDate
  - So we used `>=` and `<=`

`src/selectors/expenses.js`

```
// MORE CODE

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      // console.log(expense.createdAt >= startDate);
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()

// MORE CODE
```

* Now we update the above code to some super useful moment js methods
* We will use moment js docs (Docs > Query)
  - We will use `Is Same or Before` and `is Same or After`

### startDate
* Remove the ternary operator and we'll start from scratch

```
// MORE CODE

      const startDateMatch =
      const endDateMatch =

// MORE CODE
```

* We first need to check if there is even a startDate
  - We gave the user the option to clear those dates so we must now check if a startDate exists
    + `const startDateMatch = startDate ?`
      * If there is no start date we'll never filter anything out so we'll return `true`
        - `const startDateMatch = startDate ? XXX : true`
        - If there is a startDate we want to use momentjs' `isSameOrBefore`
        - `startDate.isSameOrBefore()` - we need to pass it the `createdAt` value
          + We can create a new momentjs instance based off of `expense.createdAt` and we can pass that in like this:
            * **note** In moment you can pass in either text based date `moment('2010-10-20`) or Moment instances (we'll use the latter)
            * We also need to import moment since we are using it
            * `isSameOrBefore()` also has a second argument we can pass in (year, month, day) - we'll use `day`

```
// MORE CODE

import moment from 'moment';

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      // console.log(expense.createdAt >= startDate);
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })

// MORE CODE
```

## Test in UI
* Clear dates and nothing shows up - filter is working
* Add an expense on 1st of month (enter current month day 1) and it will appear in expense list
* Add an expense for 31st of month (or 30th or 28th)
* And that will appear also
* Change it to 2nd to 10th (nothing will show up)
* Show from 1st to 3rd (one match will show up)

## We can do the following
* Filter by date and description
* And one way to sort - by date or amount

## Recap
* We needed to make some changes on how we manage startDate and endDate
  - Before they were numbers but now since we are using the react-dates picker they will be moment instances
    + startDate is start of month
    + endDate is end of month
* We set up the DateRangePicker component
  - We passed in startDate and endDate as props
  - On change we changed them
  - We added some customization
    + Add ability to clear the dates
    + We set it to just one month
    + And we set it to be able to pick dates in the past
* In our expenses selector file
  - We changed how we compared the values
    + We went from numbers to moment instances
    + We had to go from comparing numbers to comparing moment instances

## Fix the errors on the DateRangePicker
`ExpenseListFilters.js`

```
// MORE CODE

        <DateRangePicker
          startDateId="MyDatePickerStart"
          endDateId="MyDatePickerEnd"
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

// MORE CODE
```
