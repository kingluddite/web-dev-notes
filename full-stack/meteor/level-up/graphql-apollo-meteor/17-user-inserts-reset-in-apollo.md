# User Inserts & client.resetStore in Apollo
## Remember
* In our resolvers file we now have access to the userId as well as access to the entire User object simply by heading into the `context` that is passed into all your resolvers as well as mutations

`resolvers.js`

```
// MORE CODE
export default {
  Query: {
    resolutions(obj, args, { userId }) {
      console.log(userId);
      return Resolutions.find({
        userId,
      }).fetch();
    },
  },
// MORE CODE
```

* We output the userId
* We ask for all Resolutions that are associated with this userId
* All of this is available inside `context`

## Move logout to look like this (just easier to work with)
`App.js`

```
// MORE CODE
const App = ({ loading, resolutions }) => {
  if (loading) return null;
  return (
    <div>
      <button onClick={() => Meteor.logout()}>Logout</button>
      <LoginForm />
      <RegisterForm />
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

## When we insert a user also add the userId too onto that document
```
// MORE CODE
  Mutation: {
    createResolution(obj, { name }, { userId }) {
      const resolutionId = Resolutions.insert({
        name,
        userId,
      });
      return Resolutions.findOne(resolutionId);
    },
  },
};
```

* Enter a new resolution: `jump rope more` and press enter
* We see that resolution and only that resolution
* But if you log out (click logout)
* Refresh page
* You see all the resolutions
* Login with same email and password as before
* refresh page
* You will only see that one resolution

## Houston we have a problem
* Why do we have to refresh the browser
* We want the data to refetch

### Fix resetStore
* We need to tell apollo that something has changed and you Apollo need to fetch all the data
    - Not just fetching one query
    - You need to fetch the entire store
* resetStore is given to us from Apollo

`LoginForm.js`

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withApollo } from 'react-apollo';
// MORE CODE
```

### Decorators
* You can use Decorators
* But we did not set up decorators inside this project
* but if you did you could do this:

```
import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withApollo } from 'react-apollo';

@withApollo
```

* And have access to everything
* But since we are not using Decorators we need to do it this way:

```
// MORE CODE
class LoginForm extends Component {
  login = e => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      console.log(error);
    });
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="email" ref={input => (this.email = input)} />
        <input type="password" ref={input => (this.password = input)} />
        <button type="submit">Login User</button>
      </form>
    );
  }
}
export default withApollo(LoginForm); // look at this line
```

* That last line gives us access to certain props
* Save and view in browser and search for `Login` in React dev tools
* You will see this:

![ApolloClient](https://i.imgur.com/DA7WiPT.png)

* We only care about `resetStore`

## Better placement
* Let's put it in our app so we have access to resetStore higher up in our app

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
import { withApollo } from 'react-apollo';
import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const App = ({ loading, resolutions }) => {
  if (loading) return null;
  return (
    <div>
      <button onClick={() => Meteor.logout()}>Logout</button>
      <LoginForm />
      <RegisterForm />
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};

const resolutionsQuery = gql`
  query Resolutions {
    hi
    resolutions {
      _id
      name
    }
  }
`;

export default graphql(resolutionsQuery, {
  props: ({ data }) => ({
    ...data,
  }),
})(withApollo(App));
```

* Now we have access to our ApolloClient inside App.js and we can pass it down to all of our child components
* This is important because we want the ApolloClient refetch to happen globally
* Check `App` component inside React Dev tools and make sure you see `client: ApolloClient`

![ApolloClient on App](https://i.imgur.com/hJeHa9q.png)

* Open that up and you'll see `resetStore` method on it

```
// MORE CODE
const App = ({ loading, resolutions, client }) => {
  if (loading) return null;
  return (
    <div>
      <button onClick={() => Meteor.logout()}>Logout</button>
      <LoginForm client={client} />
      <RegisterForm client={client} />
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  );
};
// MORE CODE
```

* Now we will be reseting the client store anytime someone logs in or out

`RegisterForm.js`

```
// MORE CODE
export default class RegisterForm extends Component {
  registerUser = e => {
    e.preventDefault();
    Accounts.createUser(
      {
        email: this.email.value,
        password: this.password.value,
      },
      error => {
        if (!error) {
          this.props.client.resetStore();
        }
        console.log(error);
      }
    );
  };
  // MORE CODE
```

`LoginForm.js`

```
// MORE CODE
class LoginForm extends Component {
  login = e => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, error => {
      console.log(error);
      if (!error) {
        this.props.client.resetStore();
      }
    });
  };
// MORE CODE
```

* Also add reset to logout

```
// MORE CODE
<button
  onClick={() => {
    Meteor.logout();
    client.resetStore();
  }}
>
  Logout
</button>
<LoginForm client={client} />
<RegisterForm client={client} />
// MORE CODE
```

* Now our store will be entirely reset on logout, registration or login

## Take it for a test drive
* Logout - Click logout button
    - see how our resolutions are reset and we didn't have to refresh the browser
* Login using our previous account test and it will show you your one resolution (unless you added more)
* Logout
* All come back
* Register and add one resolution and you will see it appear
* All without refreshing!

