# Testing Spies
* mocked functions === "spies"

## How do we test this code `ExpenseForm.js`
```js
} else {
  // clear error
  this.setState(() => ({ error: '' }));
  this.props.onSubmit({
    description: this.state.description,
    amount: parseFloat(this.state.amount) * 100,
    createdAt: this.state.createdAt.valueOf(),
    note: this.state.note,
  });
}
```

# Steps
1. Render ExpenseForm with valid data
    * Easy
        - We can use our fixtures data with 1 expense item
2. Simulate the submission
3. Make sure the state was cleared
4. Trickier! We need to make sure that the onSubmit prop was called with this object (the correctly formatted information)
    * We can do this using `spies`

## Experiment with spies
* Learn how they work
* We will create fake functions
    - We can check if the fake function was called
    - It if was called 5 times
    - We can check if it was called with specific arguments

### jest.fn()
* How we create a spy
* A function we call with no arguments and it returns the new spy
* We just need to store it in a variable

```js
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
})
```

* We now have access to a new set of assertions
* We need to check that our spy was called

```js
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  expect(onSubmitSpy).toHaveBeenCalled();
});
```

* That will generate an error because we didn't submit the spy

```js
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  onSubmitSpy(); // we call our spy!
  expect(onSubmitSpy).toHaveBeenCalled();
});
```

* Our test passes (41!)
* [docs for spies](https://facebook.github.io/jest/docs/en/expect.html)
    - `.toHaveBeenCalledTimes(number)`
    - `.toHaveBeenCalledWith(arg1, arg2, ...)`
    - `.toHaveBeenLastCalledWith(arg1, arg2, ...)`

```js
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  onSubmitSpy('joe', 'LA');
  expect(onSubmitSpy).toHaveBeenCalledWith('joe', 'LA');
});
```

* We call with args and check that is was called with those args

## Follow our 4 steps
1. Create spy

```js
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
});
```

2. Render ExpenseForm

```js
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0] />);
});
});
```

* We also have to pass in our `onSubmit` and set it equal to our spy

```
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
});
```

3. Similuate that form submission

```
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
});
```

* Now the form was submitted
    - We can make some assertions about what should have happened:
        + The error state should be an empty string
        + The spy should have been called with certain args

```
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenCalledWith(expenses[0]);
});
```

* This won't work
* Our expense might not have an id
* And if you look at the test you'll see we are missing an 'id' and they are not considered matches

```
test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});
```

* Now our test passes
* The error was cleared and the correct data was passed on submit
* We wouldn't have been able to do this without using `spies`

## onDateChange and OnFocusChange
* New problems to figure out
* How do we trigger these when they are not setup with onSubmit or onChange handlers?
    - They are setup by passing them down into SingleDatePicker
    - Need to figure out how to trigger those props

### onDateChange
* `props`
    - [docs](http://airbnb.io/enzyme/docs/api/ShallowWrapper/props.html)
    - also `prop`

* import moment and SingleDatePicker

```js
import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { SingleDatePicker } from 'react-dates';
// MORE CODE
test('should set new date on data change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});
```

* 42 tests passed

## Challenge
* onFocusChange sets calendarFocused

```js
test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});
```



