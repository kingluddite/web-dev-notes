# Integration Testing in React & Cleanup
* We just wrote a test that let's us know our button is working properly even though we didn't create the UI to see and test it out for ourselves

## **note** We will refactor the structure of our app later
* Create 2 new files:
    - MovieForm.js
    - NewMovie.js
* We will not be writing the actual submits for this stuff
* These will not be saving to a DB
* We'll use mocks to make sure create info is being sent
* We'll use this to test integration testing (like forms where we need to update an input)

`MovieForm.js`

```
import React, { Component } from 'react';

export class MovieForm extends Component {
  render() {
    return (
      <form>
        <input type="text"/>
        <button type="submit"></button>
        </form>
    );
  }
}

export default MovieForm;
```

`NewMovie.js`

```
import React, { Component } from 'react';

// custom components
import MovieForm from './MovieForm';

export class NewMovie extends Component {
  render() {
    return (
      <div>
        <h1>
New Movie
                </h1>
        <MovieForm />
      </div>
    );
  }
}

export default NewMovie;
```

## Update .eslintrc to not prefer stateless components
`.eslintrc`

```
// MORE CODE

"rules": {
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "react/prefer-stateless-function": 0, // add this line
  },

// MORE CODE
```

* Now view the two components and eslint is no longer complaining in red!

## Create 2 test files
`NewMovie.test.js`

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

// custom components
import NewMovie from './NewMovie';

afterEach(cleanup);
```

`MovieForm.test.js`

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

// custom components
import MovieForm from './MovieForm';

afterEach(cleanup);
```

## Write test for NewMovie.test.js
```
// MORE CODE

test('<NewMovie />', () => {
  const { debug, getByTestId } = render(<NewMovie />);

  debug();
});
```

* You could give it a name like `test('<NewMovie /> with user', () => {`
* We use `test()`
    - Other testing frameworks use `describe` or `it`

## What is `cleanup` doing again?
Comment out `afterEach(cleanup)` inside `NewMovie.test.js`

```
// MORE CODE

// afterEach(cleanup);

test('<NewMovie />', () => {
  const { debug, getByTestId } = render(<NewMovie />);

  debug();
});

test('<NewMovieTwo />', () => {
  const { debug, getByTestId } = render(<NewMovie />);

  debug();
});
```

* The first works fine in test
* The second has on body tag but the code has two forms inside it
* Comment in `afterEach(cleanup)` and you will see the duplicated code has been removed from the DOM

## Turn off `jsx-one-expression-per-line` rule
`.eslintrc`

```
// MORE CODE

"rules": {
  "react/jsx-filename-extension": 0,
  "function-paren-newline": 0,
  "react/prefer-stateless-function": 0,
  "react/jsx-one-expression-per-line": 0, // add this line
},

// MORE CODE
```

## Testing analysis
* You will see in NewMovie the h1 and the form output via debug
* This differs than how enzyme works
    - enzyme has several different ways of rendering your components
    - A key way to render a component is through `shallow rendering`
        * So `MovieForm` would never get outputted
        * And what we would see is a `MovieForm` component and not the contents of it
* A huge PRO of react-testing-library believes you never use your components in isolation and you'll want them to work together as well as separate
* So by default react-testing-library will always default to a full on render
* You don't use `shallow rendering` with react-testing-library

## Write some assertions
### We can use test id's on other components
* Why `data-testid` is useful?

```
<h1 data-testid="page-title">New Movie</h1>
```

* If you look for content `New Movie` what if that changes?
* What if your h1 changes to a h2?
* getByTestId is a great way to target parts of your components

## getByTestId vs queryByTestId
* getByTestId is hardcoded, if it exists good, if not it fails
* queryByTestId is less harsh and just checks if it is there
* **note** in the library the name is `getByTestId` but in the html attribute it is `data-testid`

`NewMovie.test.js`

```
// MORE CODE

test('<NewMovie />', () => {
  const { debug, getByTestId, queryByTestId } = render(<NewMovie />);
  expect(getByTestId('page-title').textContent).toBe('New Movie');
  expect(queryByTestId('movie-form')).toBeTruthy();

  debug();
});
```

* That passes because it finds the form with an id of `movie-form`

## Difference between getByTestId and queryByTestId
* I we comment out the MovieForm component like this:

`NewMovie.js`

```
// MORE CODE

export class NewMovie extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="page-title">New Movie</h1>
        {/* <MovieForm /> */}
      </div>
    );
  }
}

export default NewMovie;
```

* If we use `queryByTestId` we get a fail but it doesn't say our code will break, it says we were looking for truthy and got null
* If we use `getByTestId` we get a fail because it is unable to find an id of `movie-form`

## Next - Snapshot testing
