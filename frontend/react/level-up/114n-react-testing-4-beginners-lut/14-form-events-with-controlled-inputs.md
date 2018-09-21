# Form Events with Controlled Inputs
* We want our onSubmit function to be called with a text property with an empty string value

`MovieForm.test.js`

```
// MORE CODE

const onSubmit = jest.fn();

test('<MovieForm />', () => {
  const { queryByTestId, getByText } = render(
    <MovieForm submitForm={onSubmit} />,
  );
  expect(queryByTestId('movie-form')).toBeTruthy();
  fireEvent.click(getByText('Submit'));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'yo',
  });
});
```

* We get an error
* Why?

`MovieForm.js`

```
import React, { Component } from 'react';

export class MovieForm extends Component {
  state = {
    text: '',
  };


  render() {
    const { submitForm } = this.props;
    const { text } = this.state;

    return (
      <form
        data-testid="movie-form"
        onSubmit={() => submitForm({
          text,
        })
        }
      >
        <input type="text" />
        <button>Submit</button>
      </form>
    );
  }
}

export default MovieForm;
```

* We set our state to have a `text` property with `''` as the value
* We destructure `text` from `state`
* We pass `text` to our `submitForm({ text })` function
* Change 'yo' in our test to `''` and you will see the test pass

## We don't have a controlled component yet
* Many times in react you have a controlled component
* Controlled components are great for using and controlling your data but what about testing?

### Hmmm. What if we wanted to modify our form
* Let's add a label
* The form will have an id
* You usually want an `onChange` method
    - We'll set the state of text to be whatever user types in the input box

`MovieForm.js`

```
import React, { Component } from 'react';

export class MovieForm extends Component {
  state = {
    text: '',
  };

  render() {
    const { submitForm } = this.props;
    const { text } = this.state;

    return (
      <form
        data-testid="movie-form"
        onSubmit={() => submitForm({
          text,
        })
        }
      >
        <input
          type="text"
          id="text"
          onChange={event => this.setState({ text: event.target.value })}
        />
        <button>Submit</button>
      </form>
    );
  }
}
 // MORE CODE
```

* We are using an inline function to keep this example simple
* You will see how snapshots can be annoying
    - Get used to it when it is a known change just update the snapshot with `u` key in terminal

## Add semantic label
`MovieForm.js`

```
// MORE CODE

<label htmlFor="text">
  Text
  <input
    type="text"
    id="text"
    onChange={event => this.setState({ text: event.target.value })}
  />
</label>
<button>Submit</button>

// MORE CODE
```

* update snapshot

`MovieForm.test.js`

```
// MORE CODE

test('<MovieForm />', () => {
  const { queryByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />,
  );
  expect(queryByTestId('movie-form')).toBeTruthy();
  fireEvent.click(getByText('Submit'));
  console.log(getByLabelText('Text').outerHTML);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'hello',
  });
});

```

* We fail 1 test
* But we can see our log is `<input type="text" id="text">
* We'll get rid of that log

```
// MORE CODE

test('<MovieForm />', () => {
  const { queryByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />,
  );
  expect(queryByTestId('movie-form')).toBeTruthy();

  getByLabelText('Text').value = 'hello';

  fireEvent.click(getByText('Submit'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'hello',
  });
});
```

* But why is our test still failing?
    - React should have gotten that value
    - React would have fired an onChange
    - And it would have updated the state
    - But it doesn't!
    - Maybe we need to fire and onChange and then onChange can be fired on the input itself

`MovieForm.test.js`

```
// MORE CODE

test('<MovieForm />', () => {
  const { queryByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />,
  );
  expect(queryByTestId('movie-form')).toBeTruthy();

  getByLabelText('Text').value = 'hello';
  fireEvent.change(getByLabelText('Text')); // add this

  fireEvent.click(getByText('Submit'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'hello',
  });
});
```

* Our test passes
* This is new syntax that used to not work

## Here is an alternative syntax that is a bit easier to read and understand
```
// MORE CODE

test('<MovieForm />', () => {
  const { queryByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />,
  );
  expect(queryByTestId('movie-form')).toBeTruthy();

  // note: might not work
  // getByLabelText('Text').value = 'hello';
  // fireEvent.change(getByLabelText('Text')); // add this

  // old syntax that works
  fireEvent.change(getByLabelText('Text'), {
    target: { value: 'hell' },
  });

  fireEvent.click(getByText('Submit'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'hello',
  });
});
```

* Change `hell` above to `hello` and our code passes

## Tips for running tests
* You typically have a form component that is a generic form component
* And then you pass in an `onSubmit` prop
* Then in this instance to test those components you create a spy function ( a mocked function aka a fake function that spys on how many times it was clicked and with what)
* Then you expect that it has been run a certain amount of times
* And that is has been run with the correct information
    - Or the information that we are expecting it to have
* That way if you add mistakes in the code it will be easy to spot and fix

## Next - Testing For Errors & Global Mocks
* Working with real life code
* We want to test Movie.js so create `Movie.test.js`
* Pull in the top part code we used before in other tests as it will be common to use on all tests

### Common code used as boilerplate for testing
```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

// custom components
import MovieForm from './MovieForm';

afterEach(cleanup);
```

`Movie.js`

* It was missing some required propTypes

```
// MORE CODE

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

// MORE CODE
```

* That is all the information this component will be using

## But how do we pass into a component those props and how do we test this?
* Before we saved the render() to a variable
* We can save typing and not always do that

`Movie.test.js`

```
// MORE CODE

test('<Movie />', () => {
  render(<Movie />);
});
```

* Our test fails
* Tells us we are missing prop types

## How can we test when an error should be expected
* We are using this component and we are expecting there to be an error
* If we don't pass any props than this should throw errors
* Currently it is just an console error
* First we must mock the console.error
    - You can mock functions that are just called

`console.error = jest.fn();`

`Movie.test.js`

```
// MORE CODE

console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toBeCalled();
});
```

* But we are getting a fail because it can't read property of `id` of undefined
* This means we need to return `null` or the `movie`
* We can go into our Movie.js and use conditional to render null or the movie

`Movie.js`

```
// MORE CODE

const Movie = ({ movie }) => {
  if (!movie) return null;
  return (
    <Link to={`/${movie.id}`}>
      <Overdrive id={`${movie.id}`}>
        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      </Overdrive>
    </Link>
  );
};

// MORE CODE
```

* Now the test passes

## What was the purpose of this test?
* We wanted to make sure we received a console error if we did not pass any props into the component
    - Essentially we are testing that we added propTypes to our component
* We can spy on any function
    - Just like this console error we made a spy out of it
    - If you remove our expect of console.error you will see warning and we want to not see that and test to make sure it is not appearing

```
// MORE CODE

// console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  // expect(console.error).toBeCalled();
});
```

* Yes the test passes but the error is still obnoxious

## Next - render our movie
* Right now we have no movie and we return `null` and an error is being called
* We will have multiple tests per file
* We will test a component that uses a react router link
