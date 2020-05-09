# Testing Spies
* We will learn about "mocked functions" aka **spies**

## Run your tests
`$ npm test -- --watch`

## ExpenseForm.js
* We will be working with this part of our Component code:

![highlighted code](https://i.imgur.com/Spqufkt.png)

* How do we test the code highlighted in the screenshot above?

### Steps to get test the code fragment
1. Render ExpenseForm with valid data
2. Simulate the Submission
3. Make sure the state was cleared
4. (tricky) We need to make sure the onSubmit prop was called with the correct object

#### 1. We have to render ExpressForm with valid data
* We use our fixtures data

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
})

// MORE CODE
```

#### 2. Simulate the submission

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
});

// MORE CODE
```

## What is the purpose of spies?
* To create fake functions that are fake functions
* These fake functions
  - They are created by Jest for us
  - And we can make assertions about these fake functions
    + We can check if the fake function was called
    + We can check if the fake function was called 5 times
    + We can check if the fake function was called with specific arguments

### How do we create a new spy?
`jest.fn()`

* This is a function we call with the arguments and it returns the new spy
* All we need to do it store it on a variable

`const onSubmitSpy = jest.fn()`

* With our spy now in place we now have access to a brand new set of assertions

#### New Spy Assertion - Check that our spy was called
* We don't care how many times it was called
* We don't care what arguments were passed to it

`expect(onSubmitSpy).toHaveBeenCalled()`

* That will throw an error if your spy was never called and pass if it was called
* Let's try it all together

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  // const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // wrapper.find('form').simulate('submit', {
  //   preventDefault: () => {},
  // });
  const onSubmitSpy = jest.fn();
  expect(onSubmitSpy).toHaveBeenCalled();
});

// MORE CODE
```

![spy fails not called](https://i.imgur.com/87uKYYt.png)

## Let's call our spy (and pass our test)
```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  // const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // wrapper.find('form').simulate('submit', {
  //   preventDefault: () => {},
  // });
  const onSubmitSpy = jest.fn();
  onSubmitSpy(); // WE CALL OUR SPY HERE!
  expect(onSubmitSpy).toHaveBeenCalled();
});

// MORE CODE
```

## That is the basics of spies
* We are able to create fake functions (spies)
* We are going to be able to pass these fake functions into our components
* And we are able to make sure these fake functions are called as we expected them to be called

### Let's pull up the Jest documentation and explore
* We navigate to Jest
* [Jest docs](https://jestjs.io/docs/en/expect)
  - toHaveBeenCalledTimes(number)
    + [docs](https://jestjs.io/docs/en/expect#tohavebeencalledtimesnumber)
    + Allows us to check if the spy was called a specific number of times
  - toHaveBeenCalledWith(arg1, arg2, ...)
    + [docs](https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-)
    + We can check if the spy was called with certain arguments
  - toHaveBeenLastCalledWith(arg1, arg2, ...)
    + [docs](https://jestjs.io/docs/en/expect#tohavebeenlastcalledwitharg1-arg2-)
    + Very similar to `toHaveBeenCalledWith` but just checks the last time the spy was called

### Testing spies with ExpenseForm
* We will be using `toHaveBeenCalledWith()` and `toHaveBeenLastCalledWith()`
* We need to check that the spy that was passed into ExpenseForm not only was called with the correct stuff (the object with all of the formatted data)

```
// MORE CODE

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState({
        error: 'Please provide description and or an amount',
      });
    } else {
      this.setState({
        error: '',
      });
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf(),
      });
    }
  };

// MORE CODE
```

* Here is the object we need to check that our spy was called with all the formatted data:

![formatted data](https://i.imgur.com/fvDWCYI.png)

### toHaveBeenCalledWith()
* Let's take this assertion for a test spin
* We want to call our spy with 2 arguments (name and city)
* Then I will check that the spy was called with those that exact name and city

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  // const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // wrapper.find('form').simulate('submit', {
  //   preventDefault: () => {},
  // });
  const onSubmitSpy = jest.fn();
  onSubmitSpy('John', 'Boise');
  expect(onSubmitSpy).toHaveBeenCalled('John', 'Boise');
});

// MORE CODE
```

* That will fail because I now have to use `toHaveBeenCalledWith()` and not `toHaveBeenCalled()`
* Our test will now pass

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  // const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // wrapper.find('form').simulate('submit', {
  //   preventDefault: () => {},
  // });
  const onSubmitSpy = jest.fn();
  onSubmitSpy('John', 'Boise');
  expect(onSubmitSpy).toHaveBeenCalledWith('John', 'Boise');
});

// MORE CODE
```

* And if I pass in a wrong argument our test will fail

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  // const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  // wrapper.find('form').simulate('submit', {
  //   preventDefault: () => {},
  // });
  const onSubmitSpy = jest.fn();
  onSubmitSpy('John', 'Boise');
  expect(onSubmitSpy).toHaveBeenCalledWith('John', 'Boisee'); // wrong!
});

// MORE CODE
```

## Let's try to make this work with Expense form
### Steps
1. We need to create the spy
2. Render ExpenseForm (I want to pass in an expense so when I submit the form there is real valid data and we access one of the expenses via the fixtures file)
  * We will also need to pass in `onSubmit`
  * The component itself is going to call `onSubmit` so it better be defined
    - And we'll set it equal to our spy
3. Simulate that form submission
4. Make assertions about what "should have happened"
  * The error state should now equal an empty string
  * The spy should have been called with specific arguments

#### Step 1:We need to create the spy

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
});

// MORE CODE
```

#### Step 2: Render ExpenseForm
```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
});

// MORE CODE
```

* Our above component now has real valid data
* But we also need to pass in `onSubmit`
  - Our form is going to call onSubmit so we need that prop in our component
  - And we need to set that onSubmit equal to our spy

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
});

// MORE CODE
```

* Now our component is rendered with the spy

#### Step 3: Simulate that form submission
* We already did this before so we can just copy and paste

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
});

// MORE CODE
```

#### Step 4: Make assertions about what should have happened
* Our assertions:
  - The error state should equal an empty string
    + `expect(wrapper.state('error')).toBe('');`
  - The spy should have been called with specific arguments
    + This is trickier
    + We could use `toHaveBeenCalled()`

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenCalled();
});

// MORE CODE
```

* Our tests will pass but this is not the full feature test case we need
* We need to make sure it was called with the correct stuff not "just called"
  - We need to check what the spy was called with is the object that we are hoping for
  - We will use `toHaveBeenLastCalledWith()`
    + This will make sure that our spy was not just called but called with the correct stuff

```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[0]);
});

// MORE CODE
```

* But with the above code we will fail our test
* The reason is when we submit our form we don't have an `id` yet and our expenses[0] does have an id
  - A component might be used with an expense that doesn't have an `id` yet because it's not actually added

## Solution is to define the exact object
```
// MORE CODE

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

// MORE CODE
```

* And our test passes!

## Two more test cases
* onDateChange
* onFocusChange

* They have their own set of problems
  - When they're not set up with onSubmit or onChange handlers
  - They are actually setup by passing them down into `SingleDatePicker`
    + We need a way to figure out how to trigger those props
    + That will make those run and then we can make assertions making sure the state changed correctly

## What do I test
* You will hit your own stride with regards to what you test
  - If you are in the "prototype" stage you may be writing less tests
* If you are doing a production app with lots of users and code you may find yourself writing more code

## Let's test onDateChange
```
// MORE CODE

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState({ createdAt });
    }
  };

// MORE CODE
```

* I will pass a moment instance into `createdAt`
* And I will expect that it gets set on the `state`

```
// MORE CODE

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker');
});

// MORE CODE
```

* We can use `#expenseDatePicker` or `SingleDatePicker` to grab that DOM element for our test
  - Now we have that instance we now need to grab a prop on this instance and call it
  - Let's look at its props:

```
// MORE CODE

  <SingleDatePicker
    date={this.state.createdAt} // momentPropTypes.momentObj or null
    onDateChange={this.onDateChange} // PropTypes.func.isRequired
    focused={this.state.calendarFocused} // PropTypes.bool
    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
    id="expenseDatePicker" // PropTypes.string.isRequired,
    numberOfMonths={1}
    isOutsideRange={() => false}
  />

// MORE CODE
```

* Which `prop` do we want to grab?
  - `onDateChange`

## Houston we have a problem?
* How do we grab props on an instance when we test?
  - Enzyme gives us a brand new method to grab one prop or all props
    + [props docs](https://airbnb.io/enzyme/docs/api/ShallowWrapper/props.html)
      * Let's me read all props
    + [prop([key])](https://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html)
      * Let's me grab one prop using a `key`
  - Both Enzyme `props` and `prop` let us read those prop values

## Back to our test
* We need to grab just one prop so we'll use `prop([key])`

```
// MORE CODE

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker').prop('onDateChange');
});

// MORE CODE
```

* Now we need to call this prop with whatever data it expects to be called with and `onDateChange` expects to be called with a moment instance `moment()`
  - So we import moment
  - And we store it in a variable and pass it in (we do this to make our code more readable)

#
```
// MORE CODE

test('should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker').prop('onDateChange')(moment());
});

// MORE CODE
```

* Make our code more readable:

```
// MORE CODE

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker').prop('onDateChange')(now);
});

// MORE CODE
```

## Now we need to make an assertion
* We want to check that the state was correctly set

```
// MORE CODE

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

// MORE CODE
```

* Our test passes!
  - This means when SingleDatePicker does fire onChange the component is acting correctly

## Challenge
* Create a test that makes sure that `onFocusChange` actually sets `calendarFocused`
  - **remember** This is either `true` or `false` (we initialize at `false`)
  - call it with `true` and make sure `calendarFocused` ends up with `true` in the state
  - **remember** This is an object with the `focused` property on it
  - "should set calendar focus on change"

##
```
// MORE CODE

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toBe(true);
});

// MORE CODE
```

* And slightly more clean with (add a focused variable):

```
// MORE CODE

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('#expenseDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});

// MORE CODE
```

## Recap
* We learned about spies (aka "mocked functions")
  - They allow us to create a little function
  - We can then pass it into our components (or anything else)
  - Then we can make sure that when any event happens the spy was called
    + like:
      * form submission
      * A change event
    + make sure it was called
      * A specific number of times or with specific data
    + This is all well documented in the expect Jest docs
* We also learned how we could access props off of children that our components render
  - This allows to make sure that things were wired up correctly
  - And allows us to make sure that the handler does the correct stuff

## Next - More testing
