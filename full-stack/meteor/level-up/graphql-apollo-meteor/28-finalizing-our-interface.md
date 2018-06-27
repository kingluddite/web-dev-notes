# Finalizing Our interface
1. Make sure user is logged in before we show them the form or any resolutions
2. Check if the user (but more importantly does the user ID exist)

* If the user exists show them the form
* If the user exists show them the resolutions
* Otherwise only show the login form

## Turn login form into its own component
* If user is logged in it will show them logout button otherwise it will show them the login button

`UserForm.js`

```
import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default class UserForm extends Component {
  state = {
    login: true,
  };

  render() {
    const { user, client } = this.props;
    const { login } = this.state;

    if (user._id) {
      return (
        <button
          onClick={() => {
            Meteor.logout();
            client.resetStore();
          }}
        >
          Logout
        </button>
      );
    }
    return (
      <div>
        {login ? (
          <LoginForm client={client} />
        ) : (
          <RegisterForm client={client} />
        )}
        <button onClick={() => this.setState({ login: !login })}>
          {login ? 'Register' : 'Login'}
        </button>
      </div>
    );
  }
}
```

`App.js`

```
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Accounts } from 'meteor/accounts-base';
import { withApollo } from 'react-apollo';
import GoalForm from './GoalForm';
import ResolutionForm from './ResolutionForm';
import Goal from './resolutions/Goal';
import UserForm from './UserForm';

const App = ({ loading, resolutions, client, user }) => {
  if (loading) return null;
  return (
    <div>
      <UserForm user={user} client={client} />
      {user._id && <ResolutionForm />}
      {user._id && (
        <ul>
          {resolutions.map(resolution => (
            <li key={resolution._id}>
              <span
                style={{
                  textDecoration: resolution.completed
                    ? 'line-through'
                    : 'none',
                }}
              >
                {resolution.name}
              </span>
              <ul>
                {resolution.goals.map(goal => (
                  <Goal goal={goal} key={goal._id} />
                ))}
              </ul>
              <GoalForm resolutionId={resolution._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`;

export default graphql(resolutionsQuery, {
  props: ({ data }) => ({
    ...data,
  }),
})(withApollo(App));
```

* Now you have a login in screen
* Click Register button and the button changes to Register User
* Click Login button  and it changes back to Login User

![logged in with resolutions and goals](https://i.imgur.com/a2oXztr.png)

![logged out](https://i.imgur.com/kzAxGF2.png)

![logged out read to login](https://i.imgur.com/naCfGqh.png)
