# Testing User Interaction
* Our submit form has a lot of handers
    - onChange handlers
    - onSubmit handlers
* We will test and simulate these events
* example
    - I submit a form with no data I get an error on screen
    - How can we write a test case to do that?

## Test 1 - Error if form submitted without description or amount
* simulate
    - [docs (enzyme)](http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html)
    - check initial state
    - interact with component
        + this is important part and where we simulate an event
    - checking final state

`ExpenseForm.test.js`

```
// MORE CODE
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit');
});
```

* We get an error because we are not passing the event, we are faking it
* We use this to fake the event

```
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
});
```

* Now the test passes
* Now we need to test the state by fetching it off of wrapper
* We should see that there is an error
* .state (enzyme)
    - Allows us to fetch the state from a component
    - [docs for state](http://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html)
* .state example

```js
const wrapper = shallow(<MyComponent />);
expect(wrapper.state().foo).to.equal(10);
expect(wrapper.state('foo')).to.equal(10);
```

* We will write an expect statement that fetches the state and makes sure that it is NOT an empty string

```js
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
});
```

* We submit not info and we should have a error state with something > 0

```js
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  // wrapper.find('form').simulate('submit', {
  //   preventDefault: () => {},
  // });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
});
```

* But if we never submit the form the state of error should be the default of '' (empty string)
* **note** You can add as many snapshots as you want into your test cases
  - take a snapshot before changes and after changes

```js
test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});
```

* 36 tests pass
* Check snapshot to make sure error shows up

`ExpenseForm.test.js.snap`

```
// // MORE CODE
exports[`should render error for invalid form submission 2`] = `
<div>
  <p>
    Please provide description and amount.
  </p>
  <form
// // MORE CODE
```

* And if you scroll up you'll see no error

```
exports[`should render ExpenseForm correctly 1`] = `
<div>
  <form
    onSubmit={[Function]}
  >
```

## Simulate a change
```js
test('should set description on input change', () => {

})
```

### Goal
1. Render expense form
2. Change the input
3. Make an assertion checking that the description state was set

### .at()
* [docs for .at()](http://airbnb.io/enzyme/docs/api/ShallowWrapper/at.html)

```js
test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);

  wrapper
    .find('input')
    .at(0)
    .simulate('change', {
      target: { value },
    });
  expect(wrapper.state('description')).toBe(value);
});
```

* 37 tests passed

### Break it
`ExpenseForm.js`

```js
onDescriptionChange = e => {
  const description = `${e.target.value  }!`;
  this.setState(() => ({ description }));
};
```

* That will generate an error because the `description` values don't match up in the snapshop

## Challenge
* Make test case for `note`

```js
test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('textarea').simulate('change', {
    target: { value },
  });
  expect(wrapper.state('note')).toBe(value);
});
```

## Challenge
* Test with valid amount
  - `should set amount if valid input`
  - 23.50
* Test with invalid amount
  - `sould not set amount if invalid input`
  - 12.144

```js
test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value },
    });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '23.144';
  const wrapper = shallow(<ExpenseForm />);

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value },
    });
  expect(wrapper.state('amount')).toBe('');
});
```

* The second test should not allow a number with 3 decimals so the value should not change and be an empty string `''`
* Change that to a number and you will see a failing test
* You should have 40 passing tests
