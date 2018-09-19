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
