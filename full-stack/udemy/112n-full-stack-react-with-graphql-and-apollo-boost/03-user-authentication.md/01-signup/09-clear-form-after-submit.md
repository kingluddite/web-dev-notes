# Clear form fields after form submission
* We successfully submit our form
* Right after we get back our data we want to clear our form

## Create new function `clearState()`
* We want our `state` object to look like it does initially
* all fields are empty

`Signup.js`

```
// MORE CODE
state = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
// MORE CODE
```

## create new variable
* This will be outside our class
* We'll call it `initialState` and copy and paste our object we assigned to `state` to `initialState`

```
// MORE CODE

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

// MORE CODE
```

### Use `object spread` to save us typing
* This will give us the same values inside an object into another object

```
// MORE CODE

  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    ...initialState,
  };

// MORE CODE
```

## Set the state inside our `clearState` function to the value of `initialState`
* Just use the `object spread` one more time
* This saves you typing again!

`Signup.js`

```
// MORE CODE

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    // call our signupUser function
    // it is a promise so we can use `then()`
    // within `then()` we get our return `data`
    signupUser().then(data => {
      console.log(data);
      this.clearState();
    });
  };

// MORE CODE
```

## Houston we have a problem
* After clearing our form we can still hit submit and we get a nasty error

```
GraphQL error: User validation failed: username: Path `username` is required., email: Path `email` is required., password: Path `password` is required.
```

## Prevent blank form submission
* We need a way to prevent submitting if all fields are empty

## Prevent our form from submitting
* Disable our button on two occasions

1. If we are still loading the Mutation (still in the process of executing)
2. It failed our client side validation (we'll create a new function for this called `validateForm`

`Signup.js`

```
// MORE CODE

<button
  className="button-primary"
  disabled={loading || this.validateForm()}
>Submit
</button>

// MORE CODE
```

## validateForm
* Make sure all form fields have some value
* Make sure `password` and `confirmPassword` are equal to each other

```
// MORE CODE

validateForm = () => {
  const { username, email, password, passwordConfirmation } = this.state;
  const isInvalid =
    !username ||
    !email ||
    !password ||
    password !== passwordConfirmation;

  return isInvalid;
};

render() {

// MORE CODE
```

## Test
### Try to submit empty form
* Try to submit an empty form and you will not be able to
* The submit button has been disabled

### Try submitting with passwords that don't match
* Try to submit with not matching passwords and it won't let you
* Try submitting with empty fields and it won't let you



