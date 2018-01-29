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
