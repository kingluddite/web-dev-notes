# Filtering By Dates
* We will now use the range picker from react-dates library
* [airbnb react dates](https://github.com/airbnb/react-dates)
* [link to rangepicker demo](http://airbnb.io/react-dates/?selectedKind=PresetDateRangePicker&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)
    - Enables us to pick a start date and end date

`filters.js`

```js
import moment from 'moment';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
};
// MORE CODE
```

* Change the default date for start date and end date
    - We want start date to be at beginning of current month
        + moment **Start of Time** [docs](http://momentjs.com/docs/#/manipulating/start-of/)
        + moment **End of Time** [docs](http://momentjs.com/docs/#/manipulating/end-of/)
    - We want the end date to be at the end of the current month

## Wire up date range picker
* View <DateRangePicker /> component on docs page for react-dates
* We'll need to convert our `ExpenseListFilters` functional stateless component into a class based component because we need to use state
    - It is common to start off with FSC and then switch to CBC
     
`ExpenseListFilters.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters';

const ExpenseListFilters = props => (
  <div>
    <input
      type="text"
      value={props.filters.text}
      onChange={e => {
        props.dispatch(setTextFilter(e.target.value));
      }}
    />
    <select
      value={props.filters.sortBy}
      onChange={e => {
        if (e.target.value === 'date') {
          props.dispatch(sortByDate());
        } else if (e.target.value === 'amount') {
          props.dispatch(sortByAmount());
        }
      }}>
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

`ExpenseListFilters.js`

```
import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../actions/filters';

class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={e => {
            this.props.dispatch(setTextFilter(e.target.value));
          }}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={e => {
            if (e.target.value === 'date') {
              this.props.dispatch(sortByDate());
            } else if (e.target.value === 'amount') {
              this.props.dispatch(sortByAmount());
            }
          }}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId="start"
          endDate={this.props.filters.endDate}
          endDateId="end"
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
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

* Now you can select a range of dates

## Houston we have a problem
* Our filters are not working at all
* We again don't have a way to go back in time
* We see multiple calendars
* Just like we did before

```
<DateRangePicker
  startDate={this.props.filters.startDate}
  startDateId="start"
  endDate={this.props.filters.endDate}
  endDateId="end"
  onDatesChange={this.onDatesChange}
  focusedInput={this.state.calendarFocused}
  onFocusChange={this.onFocusChange}
  numberOfMonths={1}
  isOutsideRange={() => false}
/>
```

* At a way to clear dates

```
<DateRangePicker
  startDate={this.props.filters.startDate}
  startDateId="start"
  endDate={this.props.filters.endDate}
  endDateId="end"
  onDatesChange={this.onDatesChange}
  focusedInput={this.state.calendarFocused}
  onFocusChange={this.onFocusChange}
  showClearDates={true}
  numberOfMonths={1}
  isOutsideRange={() => false}
/>
```

## Fix broken filters
* In our current code `ExpenseListFilters` we had start date and end date that were numbers
* We will refact our code to use moment methods
* We will use the Query method for moment
    - [docs for Query method](http://momentjs.com/docs/#/query/)
    - all methods return true or false (very handy for us!)
    - We will use `isSameOrBefore` and `isSameOrAfter`
* We will update this code:

`src/selectors/expenses.js`

```
export default (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
```

* Change to this:

```
import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate }) =>
  expenses
    .filter(expense => {
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
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
```

* View dashboard
* Date is old with no match so no expenses are shown
* Clear and all are shown

## Try this
1. Create a new expense (/create) route
    * description: first of month
    * amount: 100
    * start date: 1/1/2018
2. Make sure date range is 1/1/2018 - 1/31/2018

* Only 1 expense should show up

3. Add expense for 31st of month (make it up)

* We are sorting by date so the last expense should show up first
* Experiment with range of dates to see how the expenses only appear when they are in that range

