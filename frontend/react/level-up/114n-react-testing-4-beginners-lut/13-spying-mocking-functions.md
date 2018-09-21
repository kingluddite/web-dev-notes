# Spying & Mocking Functions in React
`MovieForm.js`

```
import React, { Component } from 'react';

export class MovieForm extends Component {
  render() {
    return (
      <form data-testid="movie-form">
        <input type="text" />
        <button>Submit</button>
      </form>
    );
  }
}

export default MovieForm;
```

## Test whether our form is submitting correctly whenever we sent it some data
### How do we do that?
* We want to submit this thing with the value from the state of input type `text`

#### First look for a button with text of Submit
```
test('<NewMovie />', () => {
  const { debug, getByTestId, queryByTestId } = render(<NewMovie />);
  expect(getByTestId('page-title').textContent).toBe('New Movie');
  expect(queryByTestId('movie-form')).toBeTruthy();

  fireEvent.click(getByText('Submit'));
});
```

* Now add click event on button

`MovieForm.js`

```
// MORE CODE

export class MovieForm extends Component {
  render() {
    return (
      <form data-testid="movie-form">
        <input type="text" />
        <button onClick={() => console.log('clicked')}>Submit</button>
      </form>
    );
  }
}

// MORE CODE
```

* You will see `clicked` in terminal test that passed

## Now test that the event is fired
* We want the text value of the input coming into the function and need to test for this

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

* Test passes

## How can we check if our form is submitting correctly?
### Let's create and test MovieForm.js
* Now we are testing the form itself
    - Did the input update
    - Did onSubmit call with what we thought it was going to call

`MovieForm.test.js`

```
// MORE CODE
test('<MovieForm />', () => {
  const {
    debug, getByTestId, queryByTestId, getByText,
  } = render(<MovieForm />);

  expect(queryByTestId('movie-form')).toBeTruthy();

  fireEvent.click(getByText('Submit'));
});
```

* Passes
* Have a form with id of `movie-form`
* Test a click event that button has text `Submit` (yes it is case sensitive)

## onSubmit form
* Usually when you have a generic form component the function that's being called on the form submit is being passed into the component
    - Comes from a GraphQL mutation or something else
    - The form is at a higher level
    - That function that is run is passed into the component 

```
// MORE CODE

afterEach(cleanup);

const onSubmit = () => console.log('hi');

test('<MovieForm />', () => {
  const {
    debug, getByTestId, queryByTestId, getByText,
  } = render(
    <MovieForm submitForm={onSubmit} />,
  );

  expect(queryByTestId('movie-form')).toBeTruthy();

  fireEvent.click(getByText('Submit'));
});

```

* Above is an important step
    - We are passing a function that was just defined in our test
    - And we are passing it into an actual react component
    - And when we click on that button in that component we are running that function
    - This is good but it is just a normal function
    - What is better than a normal function is a **spy** (aka mock function)
        + a mock function is a fake function
        + a spy is a way to spy on that fake function and determine whether or not it was called or anything like that

## How to create a spy mock function in Jest
1. It is simple
2. We already did it 

* Change this code:

```
const onSubmit = () => console.log('hi');
```

* To this code:

```
const onSubmit = jest.fn();
```

* Our tests will still pass
* Now what we can do and what we couldn't do before when we were using just a generic function is:

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
});

```

* Our test passes
* But if you change the number of times called from `1` to `2` it will fail

## Review
* We imported what we needed
* We created a **spy** function to spy in on our function
* Then we rendered our MovieForm while passing in that spy as the `submitForm` prop
* In our MovieForm we used our prop that could have been any normal function (maybe it's an API call, maybe it's a redux action, could be anything) but regardless we are passing it in as a prop and we can use it in our function
* Then we run our test to click the form button and magically the onSubmit was called
    - Keep in mind the onSubmit in MovieForm

![submitForm](https://i.imgur.com/tXvigm5.png)

* Keep in mind the onSubmit is from here (see highlighted code above screenshot) and not the `onSubmit` inside `<form onSubmit={}>`
    - So we are testing to see that `submitForm` function was called

## Testing submitForm was submitted with the values we were expecting it to be submitted with
