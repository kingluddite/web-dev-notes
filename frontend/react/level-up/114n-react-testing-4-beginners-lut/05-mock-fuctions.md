# Mock Functions & Why
* We will create fake functions using jest mock

`App.test.js`

```
import { total } from './App';

const add = jest.fn();

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});

// test('total', () => {
//   expect(total(5, 20)).toBe(`$25`);
// });
```

* Now we run our test
* We define add so we don't get that error but now we receive an error but add is undefined
* This seems strange
    - Why do we have an empty function that isn't doing anything?
    - Why are we testing an empty function?
    - The reason is we are not testing that function but we are testing whether we have access to that function

```
import { total } from './App';

const add = jest.fn(() => 3);

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);
});
```

* This will pass
* But this will fail

```
import { total } from './App';

const add = jest.fn(() => 3);

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);
});
```

* We said add would only be called 1 time but it was called two times so the test fails

## .toHavBeenCalledWith(arg1, arg1)
```
import { total } from './App';

const add = jest.fn(() => 3);

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add).toHaveBeenCalledTimes(1);
  expect(add).toHaveBeenCalledWith(1, 2);
});
```

* Test will pass because it was called only 1 time and the args passed were `1` and `2`
* If I used different args that were not called the test would fail
* This is a silly example but when we test inside react we will test if a function was called and called with the proper arguments
    - Sometimes args are coming in from form fields, sometimes from props... and other different places so testing if we have the right args is important

## Next - Test add function as if it were an external dependency
* We will be able to test `total` function without testing `add` function 
