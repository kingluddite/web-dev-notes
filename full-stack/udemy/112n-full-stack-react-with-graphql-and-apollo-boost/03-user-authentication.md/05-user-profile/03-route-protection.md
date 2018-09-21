# Add Route Protection using withAuth component
* If we are not logged in and go to logged in routes we will get errors
    - `cannot read property of 'username' of null`
* We will make sure that when a user is not logged in they will not be able to access those components

## Stuff we'll need
* It will need to Redirect ('react-router-dom') and get the current user (GET_CURRENT_USER)
* We'll also need the `Query` component
* It will be a SFC
* We use a special syntax for this one
    - we will pass it a function
    - we need to pass the function an argument (conditionFunc) and then we'll use a similar syntax that we used for `withSession`

`components/withAuth.js`

```
import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries';

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (loading) return null;
      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default withAuth;
```

## Use withAuth on protected pages
`Profile.js`

```
import React from 'react';

// components
import UserInfo from './UserInfo';
import UserGenealogies from './UserGenealogies';
import withAuth from '../withAuth';

// MORE CODE

export default withAuth(session => session && session.getCurrentUser)(Profile);
```

## Test
* Log out and
* Browse to the `localhost:3000/profile` page
* If all works as expected you will be redirected to the home page

## More testing
`withAuth.js`

```
// MORE CODE

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (loading) return null;
      console.log(data);

// MORE CODE
```

* Restart the server
* Test in browser
* You should be logged out an in the home page and the console should say that `getCurrentUser` is **null**

## Explain the `conditionFunc` value and what we are doing with it
* Keep console open and make sure the **null** `currentUser` is still there
* Log in again
* Right click on the `null` `currentUser` and select `store as global variable`
* Then right click logged in `currentUser` and select `store as global variable`
* This will store them as two tempary variables

![temp variables](https://i.imgur.com/GrHbLcj.png)

* Type this in terminal

```
var conditionFunc = session => session;
conditionFunc(temp1);
```

* **note** Hit `shift` + `return` to get to next line in console
* After hitting `return` it will execute and return `getCurrentUser: null`
* Run it again but this time pass in `temp2`

```
var conditionFunc = session => session;
conditionFunc(temp2);
```

* You will get the logged in user

```
var conditionFunc = session => session && session.getCurrentUser;
```

* Now that will only return the `getCurrentUser` on the session object if there is a `getCurrentUser` on the **session**
    - And we know that when user is not logged in `getCurrentUser` is set to null
    - So if we try

`conditionFunc(temp1)` ----- That will return null

`conditionFunc(temp2)` ----- That will return the current logged in user

## Now look at the `withAuth` component
`withAuth.js`

```
// MORE CODE

return conditionFunc(data) ? (
       <Component {...props} />
     ) : (
       <Redirect to="/" />
     );

// MORE CODE
```

## So our ternary operator is going to evaluate to true or false
1. If expression evaluates to `true`
    * It loads the component with all its corresponding `props`
2. If expression evaluates to `false`
    * It redirects to home page

## Also protect AddGenealogy with withAuth

`AddGenealogy.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth'; // add this

// MORE CODE

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddGenealogy)
); // modify this line
```

## HOC
* Higher order components are confusing
* [This video helps explain them](https://youtu.be/BcVAq3YFiuc?t=622)
* [lecture notes on video](HOC: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
*  The video addresses both the benefits and problems of using higher order components and how new design patterns like **render props** can be an improvement

## jwt must be provided - JsonWebTokenError
* This pops up in the terminal, I am looking into figuring out how to remove it
* Found the answer:
  - I figured out how to get rid of the jwt is required error when logging out
  - I had to remove the entire token instead of just setting it to an empty string
  - I made my Signout a class based component (I only use class based components as I hate converting stateless functional components to class based components) and just removed the token completely from the localStorage upon Signing out

```
export class Signout extends Component {
 
handleSignout = (client, history) => {
    // clear token
    localStorage.removeItem('token'); // modified this line
    client.resetStore();
    // redirect using withRouter
    this.props.history.push('/');
  };
 
// more code
```






