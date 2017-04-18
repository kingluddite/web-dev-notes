# Logging In
We will log out the Component but also wire it up to the Meteor API

## Meteor.loginWithPassword()
* This will take an **email** and **password** of an existing account
* It does everything for us behind the scenes
    - That means:
        + The method will go off to the server
        + It will try and find a user with that email
        + It will make sure those hashed passwords match correctly
            * If they do
                - It will generate an auth token sending it back

## Code Similarity
* We will copy the `constructor()` function form `Signup` because we do want to handle errors so we can print login errors (_no user with that email, or the password doesn't match the account on file_)
    - So we can copy and paste the `constructor()` function from `Signup` to Login
* The `render()` will look similar in Login as `Signup` so copy and paste it
* Copy and paste the `onSubmit()` handler from `Signup` to `Login`

## [loginWithPassword](http://docs.meteor.com/api/accounts.html#Meteor-loginWithPassword)

### How do we access loginWithPassword()?

`import { Meteor } from 'meteor/meteor'`

#### Don't forget to import it!

`Login`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor'; // add this line
```

`loginWithPassword()` takes three arguments (**user** (_obj_), **password** (_string_) and a **callback** (_function_))

## Not just emails play this game
* We don't have to use an email to log in
* We could also use a username
* For our app we will be using an email

`Login`

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);


    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      console.log('Login callback', err);  
    });
  }

  render() {
    return(
      <div>
        <h1>Short Link</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button type="submit">Login</button>
        </form>

        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
};

export default Login;
```

### Log In
And check console to make sure you are logged in `> require('meteor/meteor').Meteor.user()`

### Log Out
And logout with `> require('meteor/accounts-base').Accounts.logout()`

### Do we have a user?
Run user command `> require('meteor/meteor').Meteor.user()`

And we get **nul** meaning we are logged out

### Log in again
Now log in again and we get `Login callback undefined` (_undefined is from our error and that is good we want error to be undefined_)

Check your `id` again with: `require('meteor/meteor').Meteor.userId()` and you should see the `id` is the exact same

### Logout again

`> require('meteor/accounts-base').Accounts.logout()`

### Exploring What Happens with DDP tab
Using the `Meteor dev tool`

* Clear it so we start from a clean slate

### Log In
When we log in you'll see [what we saw before](https://i.imgur.com/NxZuw0Q.png)

* If you log in you will see a **hashed token**
  + This is our **authentication token** which gets passed back and forth
  + This securely identifies us without having to provide the password with every single request




