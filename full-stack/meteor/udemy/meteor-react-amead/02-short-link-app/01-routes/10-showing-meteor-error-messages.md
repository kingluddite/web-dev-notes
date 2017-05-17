# Showing Meteor Error Messages
* We will show errors that already exist and are already wired up with Meteor
* These errors will occur for `Login` and `Signup` calls

## Login errors to console
1. Log out
2. Visit the `/signup` route
3. You will see we have `logged` our error

![showing error](https://i.imgur.com/CmOyuzj.png)

We see this error because of our `console.log()` in `Signup.js`

```
// more code
Accounts.createUser({email, password}, (err) => {
  console.log('Signup callback', err);
});
// more code
```

The `err` is a **callback**

* **note** error: 400 - This is an HTTP status code
* `details`, `error`, `errorType`, `message` and `reason`
    - `reason` is the most english friendly error we'll get in the **error** object and this is the one we'll be showing to the user
    - So, if the error does exist we want to:
      1. Get the error's **reason** property
      2. Add that as the error that gets shown to the screen
        * (_Which is stored under the error `state` (**this.state.error**)_)

```
Accounts.createUser({email, password}, (err) => {
   if (err) {
      this.setState({error: err.reason});
   } else {
      this.setState({error: ''});
   }
});
```

## Do we really need to clean up after ourselves?
* Why on the `else` are we taking time to clean up our `state`?
* If the sign up call was successful we will just get redirected to another page, right?
     + Yes, but it is **always a good idea to clean up those errors** and trying to make sure that the current state represents what happens inside of the Component

**note** We can remove the commented old `setState()` as we don't need it anymore

# Test
When you click the `Create Account` button on the `/signup` page you'll see

![we see err.reason](https://i.imgur.com/I9ZNnVy.png)

What we previously had showing up in the `console` is not showing up to the user

Now enter just a **password** and click the button and you'll see a new error message

![new error message](https://i.imgur.com/8w80juy.png)

## Exercise
We got `Signup` validating. Try to do the same thing with `Login`

<details>
  <summary>Solution</summary>
`Login`

```
onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      // console.log('Login callback', err);
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  }
```
</details>

### Test
When you try to login without entering any text you'll get a very unhelpful `Match Failed`

### User friendly custom messages
We can make that message more useful by changing our code to:

```
onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
```

And now when we get an error we see:

![better error message](https://i.imgur.com/pNT6PRo.png)

## Proper way to use ref
`this.refs.email.value.trim()` is not correct and can lead to problems

Here is the correct way when working with **refs** in React

```
<input type="email" ref={ (input) => { this.email = input; }} placeholder="Email" />
```

And to refer them in a custom handler

```
handleSubmit(e) {
    const email = this.email.value.trim();
    const password = this.password.value.trim();
}
```

Here is `Login` coded with refs the correct way:

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  handleSubmit(e) {
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    e.preventDefault();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="email" ref={ (input) => { this.email = input; }} placeholder="Email" />
          <input
            type="password"
            ref={ (input) => { this.password = input; }} placeholder="Password"/>
          <button type="submit">Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}

export default Login;
```

