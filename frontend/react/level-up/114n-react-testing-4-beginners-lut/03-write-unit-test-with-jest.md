# Writing Unit Tests With Jest
* Let's write some real code

`App.js`

```
// more concise way to write same function
// export const add = (x, y) => x + y;

export const add = (x, y) => {
  return x + y;
};
```

`App.test.js`

```
import { add } from './App';

console.log(add(1, 2));
// test('Fake Two', () => {
//   expect(false).toBeTruthy();
// });
```

### Run Test
* It is still running so it will output test results
* 1 fail
* But our log result of 3 shows up so we know our code is running

## Tip
* Name the test after the function or the name of the react component

```
import { add } from './App';

console.log(add(1, 2));

// name after react component
test('<App>', () => {
  expect(true).toBeTruthy();
});

// name after function
test('add', () => {
  expect(true).toBeTruthy();
});
```

## Write our first real test
* If using VS Code download the `Jest` plugin to get API hints
```
import { add } from './App';

console.log(add(1, 2));

test('add', () => {
  const value = add(1, 2);
  expect(value).toBe(3);
});
```

* This will `pass` and be `true` because we expect the number to be 3 and it is
* If you change to 4 it will `fail` and be `false` and it will say in terminal `expected value to be 4` and `Received` 3

## Practical Queston
* This answer is simple
* Writing this test seems stupid
* Why do I even have to write this test
* It seems like a total waste of time

### Here's why you test
* What if you refactored your code and you still were running your tests

`App.js`

```
export const add = (x, y) => x - y;
```

* You mistakenly changed addition to subtraction and now your code failes
* If you didn't test you would not know this without running your app
* It saves you time when troubleshooting

## To test or not to test...
* If you have a static site you don't need testing
* But if have a site that is constantly growing and growing you need testing

### More efficient way to write the same test
* Remove the variable

```
import { add } from './App';

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});
```

* Both tests pass
* Usually don't need 2 tests testing same kind of thing

`App.js`

```
export const add = (x, y) => 3;
```

`App.test.js`

```
import { add } from './App';

test('add', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(5, 2)).toBe(7);
});
```

* But now we will get one false because we hard code a 3 solution
* The 2nd test will fail

### Revert to both tests passing with:
```
export const add = (x, y) => x + y;
```

## Unit test
* This test we just did is called a `Unit test`
    - Because it only tests one thing
* With regards to React a Unit test would not render the children components inside a component
    - It would just render that one shell
    - And it would leave the child component alone

## Integration Tests
* Like in react you have one component that renders one component that renders another component that renders another component
* Or one function that goes off and runs another function and another function
* This is about code working together
