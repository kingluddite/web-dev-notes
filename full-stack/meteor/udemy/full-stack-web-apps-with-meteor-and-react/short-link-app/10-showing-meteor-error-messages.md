# Showing Meteor Error Messages
Showing errors that already exist and already wired up with Meteor

These errors will occur for `Login` and `Signup` calls

## Login errors to console
Log out and go to `/signup` route and you will see we have logged our error

![showing error](https://i.imgur.com/CmOyuzj.png)

We see this error because of our `console.log()` in `Signup.js`

```
// more code
Accounts.createUser({email, password}, (err) => {
  console.log('Signup callback', err);
});
// more code
```

The `err` is a callback

* **note** error: 400 - This is an HTTP status code
* `details`, `error`, `errorType`, `message` and `reason`
    - `reason` is the most english friendly error we'll get in the **error** object and this is the one we'll be showing to the user
    - So, if the error does exist we want to get the error's **reason** property and add that as the error that gets shown to the screen which is stored under the error `state` (**this.state.error**)

```
Accounts.createUser({email, password}, (err) => {
   if (err) {
      this.setState({error: err.reason});
   } else {
      this.setState({error: ''});
   }
});
```

## Why on the `else` are we taking time to clean up our `state`?
If the sign up call was successful because we will just get redirected to another page

**tip** It is always a good idea to clean up those errors and trying to make sure that the current state represents what happens inside of the Component. 

So if there is no error that we do want to clear that message

**note** We can remove the commented old `setState()` as we don't need it anymore

# Test
When you click the `Create Account` button on the `/signup` page you'll see

![we see err.reason](https://i.imgur.com/I9ZNnVy.png)

What we previously had showing up in the `console` is not showing up to the user

Now enter just a **password** and click the button and you'll see a new error message

![new error message](https://i.imgur.com/8w80juy.png)

## Exercise
We got `Signup` validating. Try to do the same thing with `Login`

### Solution
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
      // console.log('Login callback', err);
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
```

### And now when we get an error we see:

![better error message](https://i.imgur.com/pNT6PRo.png)


