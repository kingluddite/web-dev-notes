# Implement AddGenealogy Mutation on Client
## Where are we getting our user info from?

* `withSession` component and we pass down the query

```
// MORE CODE
const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      // console.log(data);

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);
// MORE CODE
```

* We use `withSession` on our Root Component

`index.js`

```
const RootWithSession = withSession(Root);
```

`index.js`

* We destructure `session`

```
const Root = ({ refetch, session }) => (
```

## We pass props to a route
* We can do this by changing a component to render

```
<Route
  path="/genealogy/add"
  render={() => <AddGenealogy session={session} />}
/>
```

* Now when we visit that route we have data about the user

## Add LifeCycle method
* When our component mounts lets log the props

`http://localhost:3000/genealogy/add`

* Use react dev tools
* Search for `AddGenealogy` component
* Look under `session` in console and you'll see user object
* Show user name in console
* **note** If you are not logged in you will get an error so make sure you are logged in

```
componentDidMount = () => {
    console.log(this.props.session.getCurrentUser.username);
  };
```

## Add username to our state
```
componentDidMount = () => {
  // console.log(this.props.session.getCurrentUser.username);
  this.setState({
    username: this.props.session.getCurrentUser.username,
  });
};
```

## Test in React Dev Tools
* Now view component in react dev tools
* You will see current `username` is populating the `state`

## Build Mutation
* We will send our form data to the backend

1. Import `Mutation` from `react-apollo`
2. Wrap `return` inside `Mutation` tags
3. Add **render props** function
4. Put the `return` inside that function
5. And add another `return` and put the entire Mutation block inside that new `return`s parentheses

## Create the new Mutation inside our `queries` folder

`queries/index.js`

```
// Genealogies Mutations

export const ADD_GENEALOGY = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $description: String
    $username: String
  ) {
    addGenealogy(
      firstName: $firstName
      lastName: $lastName
      description: $description
      username: $username
    ) {
      firstName
      lastName
      dateOfBirth
      description
      createdDate
      likes
    }
  }
`;
```

## Full AddGenealogy page
```
import React, { Component } from 'react';

// components
import Error from '../Error';

// graphql
import { Mutation } from 'react-apollo';

// mutations
import { ADD_GENEALOGY } from '../../queries';

class AddGenealogy extends Component {
  state = {
    firstName: '',
    lastName: '',
    description: '',
    username: '',
  };

  componentDidMount = () => {
    if (this.props.session) {
      // console.log(this.props.session.getCurrentUser.username);
      this.setState({
        username: this.props.session.getCurrentUser.username,
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addGenealogy) => {
    event.preventDefault();
    addGenealogy().then(({ data }) => {
      console.log(data);
    });
  };

  validateForm = () => {
    const { firstName, lastName, description } = this.state;
    const isInvalid = !firstName || !lastName || !description;
    return isInvalid;
  };

  render() {
    const { firstName, lastName, description, username } = this.state;

    return (
      <Mutation
        mutation={ADD_GENEALOGY}
        variables={{ firstName, lastName, description, username }}
      >
        {(addGenealogy, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          console.log(data);

          return (
            <div className="App">
              <h2 className="App">Add Genealogy</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addGenealogy)}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={firstName}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={lastName}
                />
                <textarea
                  name="description"
                  placeholder="Add Description"
                  onChange={this.handleChange}
                  value={description}
                />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AddGenealogy;
```

## Test - Check for two things to happen
* Run it
* And see if two things happen:

1. When you fill form out it will populate the database
2. Also see if when you visit home page the item you added in on the home page

### Record not inserted
`ApolloError.js:37 Uncaught (in promise) Error: Network error: Response not successful: Received status code 400`

### Solution
* Make fields consistent
* For now let's just ask for `firstName`, `lastName` and `description`

#### Make the following updates
##### Server
`schema.js` (**addGenealogy** Mutation)

```
// MORE CODE

type Mutation {
    addGenealogy(firstName: String!, lastName: String!, description: String, username: String): Genealogy

    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }

// MORE CODE
```

`resolvers.js` (**addGenealogy** Mutation)

```
// MORE CODE

Mutation: {
    addGenealogy: async (
      root,
      { firstName, lastName, description, username },
      { Genealogy }
    ) => {
      const newGenealogy = await new Genealogy({
        firstName,
        lastName,
        description,
        username,
      }).save();
      return newGenealogy;
    },

// MORE CODE
```

`queries/index.js`

```
// MORE CODE

/* Genealogy Mutations */

export const ADD_GENEALOGY = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $description: String
    $username: String
  ) {
    addGenealogy(
      firstName: $firstName
      lastName: $lastName
      description: $description
      username: $username
    ) {
      firstName
      lastName
      description
    }
  }
`;

// MORE CODE
```

## Test again
* You should see the data inside the console
* Check mLab and the data should now be insert (the username is there too!)

## Next - Clear form and redirect to home page after adding a record
