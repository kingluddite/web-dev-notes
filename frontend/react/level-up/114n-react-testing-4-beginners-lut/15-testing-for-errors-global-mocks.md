# Testing for Errors & Global Mocks
* **note** Lots of pitfalls you will experience in this page of notes
    - Go over and over them so you will be ready when you see these issues arise
* In other test platforms you use describe and it to differentiate between Test Suites and Tests
* But react-testing-library treats the individual file as the test suite which may be a better way to do this

## Test multiple times using different states
`Movie.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';

// custom components
import Movie from './Movie';

afterEach(cleanup);

console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toBeCalled();
});

test('<Movie /> with movie', () => {
  render(<Movie />);
  expect(console.error).toBeCalled();
});
```

## toHavBeenCalledTimes(n)
```
test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('<Movie /> with movie', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalledTimes(1);
});
```

* All pass

