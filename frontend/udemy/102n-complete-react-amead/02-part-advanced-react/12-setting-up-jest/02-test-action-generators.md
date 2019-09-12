# Testing Action Generators
* Easy to test
* Great place to start

## `src/actions/expenses.js`
* Clone folder structure to create tests

`src/tests/actions/expenses.test.js`

## Access function
* How will we access the 3 expenses functions?
    - Import them
* Test if removeExpense returns a type of REMOVE_EXPENSE and an id

```js
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  // create a variable to store the returned action
  const action = removeExpense({ id: '123' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123',
  });
});
```

* We tried toBe and it did not work
* Jest told us we should try and use `toEqual()` instead
    - The reason is `obj1 === obj2` and `arr1` === `arr2` can not be equal

![objs and arrs not equal in js](https://i.imgur.com/wfXup00.png)

* toBe() won't work
* toEqual() will
    - Use `.toEqual` when you want to check that two objects have the same value
    - This matcher recursively checks the equality of all fields, rather than checking for object identity—this is also known as **"deep equal"**

## Important Lesson
* When comparing objects or arrays use `.toEqual`
* When using booleans, numbers or strings, use `.toBe`

## editExpense Test
```js
test('should setup editExpense action object', () => {
  const action = editExpense('123', { note: 'New note value' });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'New note value',
    },
  });
});
```

## addExpense
* This is more complex action generator
* Need to write 2 test cases
    - 1. If we pass values in those values get used
    - 2. Check that default values get set up correctly when nothing is passed in

```js
test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 10500,
    createdAt: 1000,
    note: 'my test note',
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

test('should setup add expense action with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 123,
    },
  });
});
```

* the uuid is randomly generated each time so we can test for that but we can test for a string using `expet.any(String)`
