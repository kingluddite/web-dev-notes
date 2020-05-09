# Testing Expense List Filters
## Starting file
`ExpenseListFilters.js`

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

class ExpenseListFilters extends Component {
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

## Refactor ExpenseListFilters
* It is already a CBC - class based component
    - Because we used `state`
* We will still break out inline functions (makes testing easier)
* Add `mapDispatchToProps()`

## Create new test file
`src/tests/components/ExpenseListFilters.test.js`

## Inline functions broken out into methods
* We'll take the onChange handler and moving it out and define above

### Take this chunk:

```
// MORE CODE

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
            props.dispatch(setTextFilter(e.target.value));
          }}
        />

// MORE CODE
```

* And convert to this
`ExpenseListFilters.js`

```
// MORE CODE

  onTextChange = e => {
    props.dispatch(setTextFilter(e.target.value));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />

// MORE CODE
```

## We'll also change this chunk:
```
// MORE CODE

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

// MORE CODE
```

* To this:

```
// MORE CODE

  onSortChange = e => {
    if (e.target.value === 'amount') {
      this.props.dispatch(sortByAmount());
    } else if (e.target.value === 'date') {
      this.props.dispatch(sortByDate());
    }
  };

  render() {
    return (
      <div>
        // MORE CODE

        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}
        >
          // MORE CODE

        </select>

// MORE CODE
```

## Good - all our inline functions have been broken out into methods

## Next - Time to break out all the `dispatch` calls as well
* Now add `mapDispatchToProps` like we did before
* We'll implicitly return both mapStateToProps and mapDispatchToProps (instead of explicitly returning them)

```
// MORE CODE
const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  //
});

export default connect(mapStateToProps)(ExpenseListFilters);
```

* We need to pass something into the object in our mapDispatchToProps
  - We will pass 5 things!
    + 2 ways to change the sort
      * sortByDate()
      * sortByAmount()
    + 2 ways to change the date
      * setStartDate
      * setEndDate
    + 1 way to change text
      * setTextFilter

`ExpenseListFilters.js`

* **note** Make sure to export the "unconnected" named export

```
export class ExpenseListFilters extends Component {

  // MORE CODE


  render() {
    // MORE CODE

  }
}

 // MORE CODE


const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEdnDate: endDate => dispatch(setEndDate(endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
```

* And we also add mapDispatchToProps as 2nd argument up above!
* Once that is setup we can tweak all the code above that uses `dispatch`

```
// MORE CODE

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = e => {
    this.props.dispatch(setTextFilter(e.target.value));
  };

  onSortChange = e => {
    if (e.target.value === 'amount') {
      this.props.dispatch(sortByAmount());
    } else if (e.target.value === 'date') {
      this.props.dispatch(sortByDate());
    }
  };

// MORE CODE
```

* And modify it to look like this:

```
// MORE CODE

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = e => {
    props.setTextFilter(e.target.value);
  };

  onSortChange = e => {
    if (e.target.value === 'amount') {
      this.props.sortByAmount();
    } else if (e.target.value === 'date') {
      this.props.sortByDate();
    }
  };

// MORE CODE
```

## Time to test
`ExpenseListFilters.test.js`

```
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
```

* We need to add new `src/test/fixtures/filters.js` file

`filters.js`

```
import moment from 'moment';

const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days'),
};

export { filters, altFilters };
```

## Challenge
* should handle text change
* should sort by date
* should sort by amount
* should handle date changes
* should handle date focus changes

### Challenge Solution
* Create 5 tests quickly

```
test('', () => {
  //
});

test('', () => {
  //
});

test('', () => {
  //
});

test('', () => {
  //
});

test('', () => {
  //
});

```

## should handle text change
```
// MORE CODE

test('should handle text change', () => {
  const value = 'racek';
  wrapper.find('input').simulate('change', {
    target: { value },
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

// MORE CODE
```

## should sort by date
```
// MORE CODE

test('should sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters,
  });
  wrapper.find('select').simulate('change', {
    target: { value },
  });
  expect(sortByDate).toHaveBeenCalled();
});

// MORE CODE
```

## should sort by amount
```
// MORE CODE

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value },
  });
  expect(sortByAmount).toHaveBeenCalled();
});

// MORE CODE
```

## should handle date changes
```
// MORE CODE

test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// MORE CODE
```

## should handle date focus changes
```
// MORE CODE

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
});

// MORE CODE
```

* **note** You will get an error with `DateRangePicker`
Use this instead for both `handle date changes` and `handle date focus changes` tests:

```
wrapper.find('withStyles(DateRangePicker)')
```

## Final Test code
`ExpenseListFilters.test.js`

```
// MORE CODE

import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter;
let sortByDate;
let sortByAmount;
let setStartDate;
let setEndDate;
let wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters,
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'racek';
  wrapper.find('input').simulate('change', {
    target: { value },
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters,
  });
  wrapper.find('select').simulate('change', {
    target: { value },
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value },
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
    startDate,
    endDate,
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(
    calendarFocused
  );
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

// MORE CODE
```

![54 tests pass](https://i.imgur.com/lI8PsH1.png)

