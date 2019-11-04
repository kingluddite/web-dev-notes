# Testing Action Generators
* We'll write real tests for our expensify app
* We'll start with our simplest code which would be the **action generators**
  - Easy to test
  - Great place to start
  - Help us ease into testing before we dive into more complex testing

## Let's start testing the expenses actions generators

## `src/actions/expenses.js`
```
import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});
```

* We just have 3 functions
* We'll write a little bit of code to make sure our functions work as expected

## Clone folder structure to create tests
* Clone the folders inside of `src` to be inside of `tests`

### Here is the existing structure for our action generators
* src
  - actions
    + expenses.js
    + filters.js
* Here's what your folder structure should now look like:

![new folder structure with tests](https://i.imgur.com/Rv0BJ5u.png)

* Note: As soon as your create this new folder/files you will see 2 failed tests because we have 2 files with no code

![2 failed tests](https://i.imgur.com/pjjKMZl.png)

* The reason we create this structure for tests is so that we can easily find the test files for our app code that will mirror the test in the folder structure
* Delete the `filters.test.js` as it will just keep generating errors because it is empty

### Jump into our first action generator test with expenses
* First question: How can we access these 3 functions?
  - addExpense
  - removeExpense
  - editExpense
* Easy. Since they are all exported we can easily imported them into our test file

### Import the stuff we'll need to use in our tests
`src/tests/actions/expenses.test.js`

* **note** We do have access to es6 and es7 features (depending on how we set up babel)
* These test files are run through our babel setup so we'll be able to use all the great features we've been using up to this point

```
import { addExpense, removeExpense, editExpense } from '../../actions/expenses';
```

## Now we need to call our functions and assert something about the returned value
* Before when learning about Jest tests we had the functions defined at the top of the test file `add.test.js` and now the functions we'll use are imported from another file
* We just have 2 call the 3 action generators in some test cases and then we'll be done

#### Now we'll clone them with one difference
* They'll need the `test.js` extension

`src/tests/actions/expenses.test.js`

### Let's first test with removeExpense
`src/tests/actions/expenses.test.js`

```
import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toBe({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});
```

* Our removeExpense expects an object to be passed with an id property and value
* And it expects to return an object with a type property set to REMOVE_EXPENSE and an `id` set to the value passed `123abc`
* But when we run the test we get an error
* It is a strange object because Jest in the terminal says the strings are the same but yet we get an error and the reason is we can't use `===` to compare 2 objects or arrays

### Test in Chrome console
```
{} === {} // will return false
[] === [] // will return false
```

* The only way we can compare objects to see if they are equal is to check their properties
* The Jest assertion library does support this with `.toEqual()`
  - [.toEqual docs](https://jestjs.io/docs/en/expect#toequalvalue)
  - aka "deep" equality

```
import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});
```

* Now the test passes (we have 4 passed tests now)
* Use `.toEqual` to compare recursively all properties of object instances (also known as "deep" equality)
* It calls `Object.is` to compare primitive values, which is even better for testing than `===` strict equality operator.

### For example, .toEqual and .toBe behave differently in this test suite, so all the tests pass:
```
const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(can1).toEqual(can2);
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });
});
```

* **IMPORTANT**
  - If we are using objects or arrays we'll use `.toEqual()`
  - If we are using booleans, strings, or numbers we'll use `.toBe()`
* **remember** That `.toEqual()` will iterate over all the properties of our object to compare them

## Next Test - Challenge
`src/actions/expenses.js`

```
// MORE CODE

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});
```

### Test the `editExpense` action generator
* **note** there are 2 arguments that you have to pass in, the id and `updates` object and then you'll have to use `.toEqual` to make an assertion about what you got back

```
// MORE CODE

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    description: 'test desc',
    note: 'test note',
    amount: 123,
    createdAt: 123456,
  });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'test desc',
      note: 'test note',
      amount: 123,
      createdAt: 123456,
    },
  });
});
```

* The editExpense() action creator is expecting a string id and an object holding one or more optional values for editing
* The return is expected a type of `EDIT_EXPENSE` and id with a matching string and an `updates` object with the optional properties and values assertion to match our arguments passed to the editExpense() action creator

## Check if bad matches for nested object work as well
* We'll intentionally cause a nested error but changing updates `note` property to have an incorrect value of `test noteeeee`

```
// MORE CODE
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    description: 'test desc',
    note: 'test note',
    amount: 123,
    createdAt: 123456,
  });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'test desc',
      note: 'test noteeeee',
      amount: 123,
      createdAt: 123456,
    },
  });
});
```

* And you'll see that it does spot the nest object error

![nested object error](https://i.imgur.com/T0ema53.png)

* Repair the error by correctly putting `note: 'test note'` in the nested object

## Now we'll write a test for the slightly more complicated `addExpense` action generator
`src/actions/expenses.js`

```
import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* We'll write 2 test cases

1. One test case will make sure if we pass values in those values get used
2. One test case that makes sure the default values get set up correctly when nothing gets passed in

* Problem how do we deal with uuid()?
  - It is a dynamic value that changes every time it is called
  - We can't add it in because we don't know what it will equal
  - As a workaround to this issue we'll use a cool trick
  - If we test the data we'll receive the uuid but we can't test it because we never know what it will be
    + expect() gives us access to a function to work around this issue
      * we can use `expect.any(constructor)` and we can just assert something about the type
        - We can say we expect this to be an object, boolean, number, string.. whatever we want
        - We just want to assert that the id is a string and we don't care about that value as we know it is subject to change
#
```
// MORE CODE

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'test desc',
    note: 'test note',
    amount: 100500,
    createdAt: 1000,
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: 'test desc',
      note: 'test note',
      amount: 100500,
      createdAt: 1000,
    },
  });
});

// MORE CODE
```

* And that will pass the test

## Make it easier to read using the spread operator
```
// MORE CODE

test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'test desc',
    note: 'test note',
    amount: 100500,
    createdAt: 1000,
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

// MORE CODE
```

* And that passes too!

### Now test with no values passed to addExpense
```
// MORE CODE

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
    },
  });
});

// MORE CODE
```

* I had an error in my code of my addExpense, when not passing values I needed to set them to an empty object

```
// MORE CODE

// ADD_EXPENSE
export const addExpense = (
  { description = '', note = '', amount = 0, createdAt = 0 } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// MORE CODE
```

* By not setting the default values to an empty object, I was getting all the values as undefined when not expenseData was passed to addExpense
* After fixing that, my test now passes

## Recap
* We learned about Jest's `.toEqual()` which is a great way to compare objects
* We learned about Jest's `expect.any()` which is a way to assert something about the "type" of the value when you don't actually know what the value will be (this works great for our `id` which will change every time we use it because it uses uuid() to generate a random number every time we create an expense)
