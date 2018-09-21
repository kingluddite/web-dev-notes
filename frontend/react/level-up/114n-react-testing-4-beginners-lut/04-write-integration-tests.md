# Writing Integration Tests
* Stop tests from running in terminal
* `ctrl` + `c`

## Use VS Code to test
* `ctrl` + `~` opens terminal in VS Code
* Move terminal in VS code to side
* Click `double tablet` icon in termial inside VS to align terminal to right side of your code inside VS code
* `cmd` + `b` to get rid of files panel
* Run `$ npm test` in the terminal inside VS Code
* And you see your tests are passing

`App.js`

```
export const add = (x, y) => x + y;

export const total = (shipping, subTotal) => {
  return '$' + add(shipping, subTotal);
};
```

`App.test.js`

```
import { add, total } from './App';

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});

test('total', () => {
  expect(total(5, 20)).toBe(25);
});
```

## Fail
* We run the test and it fails
* Why?
* Because we should be received a string of `$25` and not a number

`App.test.js`

```
import { add, total } from './App';

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});

test('total', () => {
  expect(total(5, 20)).toBe(`$25`);
});
```

* This is an integration test
    - We aren't just testing the functionality of `total`
    - We are also testing the functionality of `add`
    - Because `total` relies on `add`

`App.js`

```
export const add = (x, y) => x - y;

export const total = (shipping, subTotal) => {
  return '$' + add(shipping, subTotal);
};
```

* Now both tests fail

### How do I write a unit test for a function that relies on another function?
* We'll learn about this later

### Next - Mocking
