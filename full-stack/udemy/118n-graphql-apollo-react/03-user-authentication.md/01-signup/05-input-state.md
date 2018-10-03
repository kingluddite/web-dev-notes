# Manage Input state on the Signup form
1. Add state
2. Set all form fields inside state to empty values

`Signup.js`

```
// MORE CODE

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

// MORE CODE
```

## Add event to all form fields
* This will fire anytime the field changes `onChange`

```
<input type="text" name="username" placeholder="Username" onChange={} />
```

* We will pass in a function that will update our `state`

```
<input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
```

* We will create an event handler called `handleChange`
* We need this to be an arrow function and not method syntax (_or our `onChange` event won't be bound correctly_)

```
handleChange = event => {
  const { name, value } = event.target;
  console.log(name, ':', value);
};
```

`Signup.js`

```
// MORE CODE

render() {
  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <div>
          <button className="button-primary">Signup</button>
        </div>
      </form>
    </div>
  );
}

// MORE CODE
```

## Test in browser
* `http://localhost:3000/signup`
* Open browser console
* Type in form fields and watch our name and values are output inside the browser console

![output in browser console](https://i.imgur.com/Pt6LKZM.png)

## Replace log with setting `state`
* Now we will remove the `log` and set the `state` to be the **value**

### **Rule** Never set state directly 
* You never set `state` directly but instead use `setState({})`

`Signup.js`

```
// MORE CODE
handleChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value,
  });
};
// MORE CODE
```

* This is a great way to save lines of code
* We use [name] to dynamically set a property
    - Either `username`, `email`, `password`, `confirmPassword`
    - And we also set the value to be whatever was entered into the form fields

## Test
* Use React Dev tools
* Search for the `Signup` component
* Type in the form fields and watch the `State` update in real time

![react dev tools](https://i.imgur.com/T1wYiPk.png)

## Destructure and set values of form fields
* Our form fields will never show what is inside them unless you explicitly set their values to what is stored in `state`
* Destructuring will save you typing and make your code more readable 
* Set the values of the form field to be our state

`Signup.js`

```
// MORE CODE

render() {
  const { username, email, password, passwordConfirmation } = this.state;
  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={this.handleChange}
          value={username}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={this.handleChange}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={this.handleChange}
          value={password}
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={this.handleChange}
          value={passwordConfirmation}
        />
        <div>
          <button className="button-primary">Signup</button>
        </div>
      </form>
    </div>
  );
}

// MORE CODE
```

## Test
* Fill out form and watch the values typed in fields appear in fields

## Next - Add Mutation
* When form is submitted we want to write a `Mutation` that will alter our db
