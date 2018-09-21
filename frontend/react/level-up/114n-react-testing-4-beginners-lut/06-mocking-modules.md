# Mocking Modules
`App.test.js`

```
import { total } from './App';

// This is dumb in practice, but a needed
// technical skill.
// Do not create mock functions and test them
// in the real world
const add = jest.fn(() => 3);

// Unit test
// It only tests one thing
test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);
  expect(add).toHaveBeenCalledWith(1, 2);
  // expect(add(5, 2)).toBe(7);
});

// test('total', () => {
//   expect(total(5, 20)).toBe(`$25`);
// });
```

* Create new file `add.js`

`src/add.js`

```
export const add = (x, y) => x + y;
```

`App.js`

```
import { add } from './add';

export const total = (shipping, subTotal) => {
  return '$' + add(shipping, subTotal);
};
```

`App.test.js`

```
import { total } from './App';

// Integration tests
// Tests things working together
test('total', () => {
  expect(total(5, 20)).toBe(`$25`);
});
```

`add.test.js`

```
import { add } from './add';

// Unit test
// It only tests one thing
test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);
  expect(add).toHaveBeenCalledWith(1, 2);
  expect(add(5, 2)).toBe(7);
});
```

## Run test
`$ npm test`

* Our test is failing with `jest.fn() value must be a mock function or spy`

## Why did it fail?
* We can call `toHaveBeenCalledTimes()` and `toHaveBeenCalledWith()` because these are spy functions
* spy functions are mock or fake functions and they are named `spy` because they are in effect `spying` on a function and reporting on things like how many times it was clicked
    - think of spys as function private detectives

## Get rid of the spy stuff
`add.test.js`

```
import { add } from './add';

// Unit test
// It only tests one thing
test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});
```

* All our test now pass

### This will pass too
`App.test.js`

```
import { total } from './App';

// Integration tests
// Tests things working together
test('total', () => {
  expect(total(5, 20)).toBe(`$25`);
  expect(total(5, 95)).toBe(`$100`);
});
```

* We just add two numbers and add a dollar sign
* We did that and both tests pass

## Mostly do integration tests
* If your stuff doesn't work together, then it doesn't work!

## Imagine this
* Imagine `add.js` goes off, hits and API and returns a number. Nothing else happens
* We don't want to spend time testing the API, making a bunch of API calls
* We know what it returns and we just want to test that it gives us the number we expect

### Let's check add and make it into a mock function
* But how do we do that from inside of total
* We are testing the total component here
* And we don't see the word `add` anywhere inside `App.test.js`

## Will this pass?
```
import { total } from './App';

const add = jest.fn(() => 10);

// Integration tests
// Tests things working together
test('total', () => {
  expect(total(5, 20)).toBe(`$25`);
  expect(total(5, 95)).toBe(`$100`);
});
```

* Yes because we don't care about the add jest function
* add is not being used at all
* We need to mock this import

`App.js`

```
import { add } from './add'; // mock this import

export const total = (shipping, subTotal) => {
  return '$' + add(shipping, subTotal);
};
```

* This means we will be mocking a dependency

`App.test.js`

```
import { total } from './App';
import { add } from './add';

jest.mock('./add');

// Integration tests
// Tests things working together
test('total', () => {
  expect(total(5, 20)).toBe(`$25`);
  expect(total(5, 95)).toBe(`$100`);
});
```

* This will fail
* We removed `const add = jest.fn(() => 10);` because we receieved a duplicate `add` fail
* Now our test is running and we are received `"$undefined"`

```
import { total } from './App';
import { add } from './add';

jest.mock('./add');

// Integration tests
// Tests things working together
test('total', () => {
  total(2, 5);
  // expect(total(5, 20)).toBe(`$25`);
  expect(add).toHaveBeenCalledTimes(1);
  // expect(total(5, 95)).toBe(`$100`);
});
```

* Our tests pass
* This sets up a mock spy of an internal dependency
* We never used add anywhere and yet we could test it was called 1 time

`App.test.js`

```
import { total } from './App';
import { add } from './add';

jest.mock('./add', () => ({
  add: jest.fn(() => 25)
}));

// Integration tests
// Tests things working together
test('total', () => {
  expect(total(5, 20)).toBe('$25');
  expect(add).toHaveBeenCalledTimes(1);

  add.mockImplementation(() => 30);

  expect(total(5, 25)).toBe('$30');
  expect(add).toHaveBeenCalledTimes(2);
});
```
