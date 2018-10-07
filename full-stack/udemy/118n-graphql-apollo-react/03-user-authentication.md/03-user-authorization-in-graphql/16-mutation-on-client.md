# Implement `AddCologne` Mutation on Client
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
* We can do this by changing a `component` route attribute to a `render` attribute

```
// MORE CODE

<Switch>
  <Route exact path="/" component={App} />
  <Route path="/search" component={Search} />
  <Route path="/profile" component={Profile} />
  <Route
    path="/cologne/add"
    render={() => <AddCologne session={session} />}
  />


// MORE CODE
```

* Now when we visit that route we have `data` about the **user**

## Add LifeCycle method
* When our component mounts let's log the `props`

`AddCologne.js`

```
// MORE CODE

class AddCologne extends Component {
  state = {
    scentName: '',
    scentPrice: 0,
    description: '',
    username: '',
  };

  componentDidMount = () => {
    console.log('AddCologne mounted!');
    console.log(this.props.session.getCurrentUser.username);
  };

// MORE CODE
```

## Test in browser
`http://localhost:3000/cologne/add`

## Use React Dev Tools
* Search for `AddCologne` component
* Look under `session` in console and you'll see user object
  - **Props** > `session` > `getCurrentUser` > user object
* We console log out the **username** found inside the `session`
* **note** If you are not logged in you will get an error so make sure you are logged in

```
componentDidMount = () => {
    console.log(this.props.session.getCurrentUser.username);
  };
```

* You may have to refresh the browser window to see `username`

## Add `username` to our `state`
```
// MORE CODE

componentDidMount = () => {
  // console.log(this.props.session.getCurrentUser.username);
  this.setState({
    username: this.props.session.getCurrentUser.username,
  });
};

// MORE CODE
```

## Test in React Dev Tools
* Now view component in react dev tools
* You will see current `username` is populating the `state`

![sample username in State](https://i.imgur.com/tHXZJm4.png)

## Build Mutation
* The best place to build this is in the GraphQL GUI

`http://localhost:4444/graphql`

```
mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
```

### Add our query variables
```
{
  "scentName": "junk",
  "scentPrice": 100,
  "description": "very smelly"
}
```

* Click the Play button and you should get back the data object:

```
{
  "data": {
    "addCologne": {
      "scentName": "junk",
      "scentPrice": 100,
      "description": "very smelly",
      "createdDate": "1538884428637",
      "likes": 0
    }
  }
}
```

* You can assume this gets added into your mLab but if you check there too you will see something like this in the `colognes` collections:

```
{
    "_id": {
        "$oid": "5bb9834c1db0b2190a60a54c"
    },
    "likes": 0,
    "scentName": "junk",
    "scentPrice": 100,
    "description": "very smelly",
    "createdDate": {
        "$date": "2018-10-07T03:53:48.637Z"
    },
    "__v": 0
}
```

### We will send our form data to the backend
## Create the new Mutation inside our `queries` folder

`queries/index.js`

* Remember to first create your export

```
// Colognes Mutations

export const ADD_COLOGNE = gql`
  
`;
```

* Paste in your GUI add cologne mutation

```
// Colognes Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
`;
```

1. Import `Mutation` from `react-apollo`
2. Wrap `return` inside `Mutation` tags
3. Add **render props** function
4. Put the `return` inside that function
5. And add another `return` and put the entire Mutation block inside that new `return`s parentheses

* If you ommitted `_id` and `username` you would get a warning in the console

## Full AddCologne page

```
import React, { Component } from 'react';

// components
import Error from '../Error';

// graphql
import { Mutation } from 'react-apollo';

// mutations
import { ADD_Cologne } from '../../queries';

class AddCologne extends Component {
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

  handleSubmit = (event, addCologne) => {
    event.preventDefault();
    addCologne().then(({ data }) => {
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
        mutation={ADD_Cologne}
        variables={{ firstName, lastName, description, username }}
      >
        {(addCologne, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          console.log(data);

          return (
            <div className="App">
              <h2 className="App">Add Cologne</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addCologne)}
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

export default AddCologne;
```

## Test - Check for two things to happen
* Run it
* And see if two things happen:

1. When you fill form out it will populate the database
2. Also see if when you visit home page the item you added is on the home page

### Record not inserted
`ApolloError.js:37 Uncaught (in promise) Error: Network error: Response not successful: Received status code 400`

### Solution
* Make fields consistent
* For now let's just ask for `firstName`, `lastName` and `description`

#### Make the following updates
##### Server
`schema.js` (**addCologne** Mutation)

```
// MORE CODE

type Mutation {
    addCologne(firstName: String!, lastName: String!, description: String, username: String): Cologne

    signupUser(username: String!, email: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }

// MORE CODE
```

`resolvers.js` (**addCologne** Mutation)

```
// MORE CODE

Mutation: {
    addCologne: async (
      root,
      { firstName, lastName, description, username },
      { Cologne }
    ) => {
      const newCologne = await new Cologne({
        firstName,
        lastName,
        description,
        username,
      }).save();
      return newCologne;
    },

// MORE CODE
```

`queries/index.js`

```
// MORE CODE

/* Cologne Mutations */

export const ADD_Cologne = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $description: String
    $username: String
  ) {
    addCologne(
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
