# Negative Assertions & Testing with React Router
## What about when we are checking if something has not been called?
```
test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).not.toHaveBeenCalled();
});
```

* That will fail because it was called
* **tip** You can throw a `now` into any test in Jest

## How do we add our movie?
* The movie is coming from the API
* So we need to hit the API? No!
    - Instead we'll use mocked data (aka fake data)
    - We need an `id`, `title` and `post_path` so we can just create a fake movie on the fly

```
// MORE CODE

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalledTimes(1);
});

const movie = {
  id: '123',
  title: 'A fist full of dollars',
  poster_path: 'fist-dollars.jpg',
};

test('<Movie /> with movie', () => {
  render(<Movie movie={movie} />);
  expect(console.error).not.toHaveBeenCalled();
});
```

* We get a Fail and the error is `Invariant Violation: You should use not use <Link> outside a <Router>`
    - Why?
        * If you are using React Router, you can't use React Router without or at least components without some sort of container that actually wraps your route
        * No way around this unless you don't want to use React Router
        * We need to import `MemoryRouter` from 'react-router-dom'

## MemoryRouter
* A fake router from react-router-dom
* From the start we were just rendering a single component
* You can render a tree of components and is very common in react
* If you use Apollo there is a dependency to have a fake client, so you wrap your client, you wrap your MemoryRouter and then it would run the test

`Movie.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

// MORE CODE

const movie = {
  id: '123',
  title: 'A fist full of dollars',
  poster_path: 'fist-dollars.jpg',
};

test('<Movie /> with movie', () => {
  render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
});
```

* Our test is failing
* It shouldn't be but it is
* It says `the prop "movie" is marked as required in "Movie", but its value is "undefined"`
    - But this is wrong
    - We did pass the movie prop but it is not seeing it

## What is going on?
* When we created a spy function this keeps a record every single time
* If it gets called once it is listed as permanently called once
* When we ran our first test, it was called
* When we ran our second test, it was called with undefined
* This is a HUGE pitfall that could cost someone hours of their life trying to figure it out
* The answer is we need to RESET this specific `spy` in between tests

### afterEach() will save the day!
* We can pass an arrow function to afterEach() and it will let us do multiple steps

```
afterEach(() => {
  cleanup();
  console.error.mockClear();
});
```

* And here is what our code looks like:

`Movie.test.js`

```
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

// custom components
import Movie from './Movie';

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalledTimes(1);
});

const movie = {
  id: '123',
  title: 'A fist full of dollars',
  poster_path: 'fist-dollars.jpg',
};

test('<Movie /> with movie', () => {
  render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
});
```

* Now all our tests will pass
* Now we have control and told it to reset our mock after each step

## Review of all the steps
1. We mock our console.error()

```
// MORE CODE
console.error = jest.fn();
// MORE CODE
```

2. We check to make sure the console.error has been called

```
// MORE CODE

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalledTimes(1);
});

// MORE CODE
```

3. We define some fake data

```
// MORE CODE

const movie = {
  id: '123',
  title: 'A fist full of dollars',
  poster_path: 'fist-dollars.jpg',
};

// MORE CODE
```

4. We pass that fake data into a component where we have a "fake component" wrapping around it (so react router does not cry!)

```
// MORE CODE

test('<Movie /> with movie', () => {
  render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
});

// MORE CODE
```

5. Then we expect there to have been no error

```
// MORE CODE

expect(console.error).not.toHaveBeenCalled();

// MORE CODE
```

* Why was no error called?
    - Because we cleaned up the error by using `cleanup()` and `.mockClear()`
