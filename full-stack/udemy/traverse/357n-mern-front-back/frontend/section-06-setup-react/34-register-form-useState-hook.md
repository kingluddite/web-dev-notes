# Register Form & useState Hook
* Grab the form from `register.html` in UI theme

```
// MORE CODE

     <h1 class="large text-primary">Sign Up</h1>
      <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form class="form" action="create-profile.html">
        <div class="form-group">
          <input type="text" placeholder="Name" name="name" required />
        </div>
        <div class="form-group">
          <input type="email" placeholder="Email Address" name="email" />
          <small class="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
// MORE CODE
```

`Register.js`

* Replace `div` with `Fragment`

```
import React from 'react';

const Register = () => {
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
```

## State
* With forms each input needs to have it's own state
* And you also need a `onChange` handler to deal with end user's updating input in the form
* Since we are using a `functional component` we will need to use the `useState` hook to update the state
    - functional components in old React days didn't have state and you had to use a class based component for state but now with hooks we can have state

### Import `useState` hook
```
import React, { useState } from 'react';
```

### formData
* This will be an object with all our form values that will store in state

```
const [formData, setFormData]
```

* The first `formData` is the object that will hold our form state
* The second is the function `setFormData` and we'll pull both from `useState()`

### comparing the above useState with class based components use of state
* This would be similar to formData in CBCs

```
state = {
    formData: {
        name,
        email,
        password,
        passwordConfirm
    }
}
```

* And this would be similar to `setFormData`

```
this.setState({
    // and you pass the new values in
})
```

### Let's put our default values in for the initial state
* I rename password2 to passwordConfirm in the form and state (for better readability)

### Destructure saves time
* It's better than typing `formData.name` and `formData.email`...

```
// MORE CODE

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { name, email, password, passwordConfirm } = formData;
// MORE CODE
```

## Now we associate the form field with the name of the `state`
```
// MORE CODE

return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
         <input type="text" placeholder="Name" name="name" value={name} required />
// MORE CODE
```

* But we now can't type in `name` input field because we need to add an onChange handler
* And you'll get this **WARNING** telling us we need an `onChange` handler

```
Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

* This needs to be a "controlled component"

## Add onChange handler
* We use spread operator to take copy all of the formData as it currently is and then we want to change the `name` to the value of the input
* Make sure to add the Chrome extension [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

### We'll add an onChange handler just to the name input
`onChange={e => onChange(e)}`

`Register.js`

```
// MORE CODE

      <form className="form" action="create-profile.html">
        <div className="form-group">
         <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
// MORE CODE
```

* And our `onChange` handler function

```
// MORE CODE

  const onChange = e => setFormData({
    ...formData,
    name: e.target.value
  });

  return (
// MORE CODE
```

## Test
* You can now type in the name field
* If you use `React Developer Tool` and choose Components and search for Register you'll see `hooks` and when you type in `name` form field you'll see that name's value is populated

## Add to the rest of the form fields a value
```
// MORE CODE

<form className="form" action="create-profile.html">
        <div className="form-group">
         <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
// MORE CODE
```

* And if you add this to your onChange method

```
// MORE CODE

const onChange = e => setFormData({
    ...formData,
    name: e.target.value,
    email: e.target.value,
    password: e.target.value,
    passwordConfirm: e.target.value
  });
// MORE CODE
```

## Test - Houston we have a problem
* When you make a change to one input field they all change
* We need a way to only trigger the input field we are filling out
* To do that make this change to your `onChange` method
* **NOTE** Make sure to make `email`, `password` and `confirmPassword` are all required using the HTML client side validation using `required` attribute
    - We already have server side validation
    - It is a good idea to also have client side validation

```
// MORE CODE

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

// MORE CODE
```

## Test again
* Now as you fill out the form the hook state populates the field corresponding to the state key
* Verify with React Dev Tools

## Add the form submit
* Remove the action attribute and value

```
// MORE CODE

<form className="form" onSubmit={e => onSubmit(e)}>
// MORE CODE
```

### Add our onSubmit method
`Register.js`

```
// MORE CODE

  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  }

  return (
// MORE CODE
```

* Make sure to use `e.preventDefault()` to prevent the default behavior when you click a `submit` button
* Make sure passwords match (we'll just use a console.log() now but later we'll use an alert)
* Because of HTML validation you will need to:
    - Add a name
    - Add a valid email
    - Have passwords with min length of 6
* Then enter a `password` and a non-matching `passwordConfirm` and click the `Register` button
    - The client console will say `Passwords do not match`
* Enter matching passwords and you will see the `formData` which is:

```
{
    email: "you@you.com"
    name: "one"
    password: "123456"
    passwordConfirm: "123456"
}
```

## Next
* Register our user through a Redux action
    - But we haven't implemented Redux yet
    - We will try this first without Redux
        + To see if we can make a request to the backend


