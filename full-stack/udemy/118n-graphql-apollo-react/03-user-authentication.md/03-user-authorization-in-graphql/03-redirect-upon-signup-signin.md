# Redirect Upon Signup/Signin
* We are now getting information about our **current user** on the `client`

## Where do we want to redirect to and when?
* Whenever we `signin` && when we get our `token` && when it is `successful`
    - We want to redirect back to the **home** page

## Let's start in `Signin.js` first
* After we clear our `state` in `handleSubmit` that is where we will `redirect` back to the home page
* To do this we will use `withRouter` from **react-router-dom**

## withRouter
* react-router-dom gives us this HOC to help us redirect

`Signin.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// MORE CODE
```

* Similar to `withSession` **withRouter** is a HOC
* So we need to wrap the Component we are working in with `withRouter`

`Signin.js`

```
// MORE CODE

export default withRouter(Signin);
```

* Now we can redirect with this:

`Signin.js`

```
// MORE CODE

handleSubmit = (event, signinUser) => {
  event.preventDefault();
  // call our signupUser function
  // it is a promise so we can use `then()`
  // within `then()` we get our return `data`
  signinUser().then(({ data: { signinUser } }) => {
    console.log(signinUser);
    localStorage.setItem('token', signinUser.token);
    this.clearState();
    this.props.history.push('/'); add this
  });
};

// MORE CODE
```

* Wrapper our HOC `withRouter` around Signin passes the `history` object and we can use that object's `push` method to redirect to the home page
* If you did not use `withRouter` this would not redirect to home page `/`

## We do the same thing for Signup.js
`Signup.js`

```
// MORE CODE

class Signup extends Component {

    // MORE CODE

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    // call our signupUser function
    // it is a promise so we can use `then()`
    // within `then()` we get our return `data`
    signupUser().then(({ data: { signupUser } }) => {
      console.log(signupUser);
      localStorage.setItem('token', signupUser.token);
      this.clearState();
      this.props.history.push('/');
    });
  };

  // MORE CODE

  render() {
   // MORE CODE
   }
}

export default withRouter(Signup);
```

## Test in browser
* `Signin` and `Signup` correctly redirect

## Houston we have a problem - lost currentUser
* We login and we are correctly redirected
* But when we are redirected we lose our `currentUser`
* We refresh the page and we get our `currentUser` **but only when we refresh**

![seeing token](https://i.imgur.com/CT1nAAJ.png)

### **note** google chrome console
* You can find the token inside the `Application` tab > `Storage` > `Local Storage` > `http://localhost:3000`
* After selecting that you may need to move window a bit to see the Key and Value of the token

### Next - `refetch` that query
