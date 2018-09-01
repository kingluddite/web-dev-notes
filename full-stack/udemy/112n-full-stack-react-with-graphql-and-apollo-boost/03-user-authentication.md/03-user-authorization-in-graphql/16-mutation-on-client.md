# Implement AddGenealogy Mutation on Client
## Where are we getting our user info from?
* withSession component
    - 1. we pass down the query

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

* We use withSession on our Root Component

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
<Route path="/genealogy/add" render={() => <AddGenealogy session={session} />
```

* Now we we visit that route we have data about the user

## Add LifeCycle method
* When our component mounts lets log the props

`http://localhost:3000/genealogy/add`

* Use react dev tools
* Search for AddGenealogy component
* Look under session in console and you'll see user object
* Show user name in console

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

* Now view component in react dev tools
* You will see current username is populating the state

## Build Mutation
* We will send our form data to the backend

1. import Mutation from react-apollo
2. wrap return inside Mutation tags
3. Add render props function and put the return inside that function

`queries/index.js`

```
// Genealogies Mutations

export const ADD_RECIPE = gql`
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
import React from 'react';

import { Mutation } from 'react-apollo';
import { ADD_RECIPE } from '../../queries';
import Error from '../Error';

class AddGenealogy extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    description: '',
    username: '',
  };

  componentDidMount = () => {
    // console.log(this.props.session.getCurrentUser.username);
    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
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
        mutation={ADD_RECIPE}
        variables={{ firstName, lastName, description, username }}
      >
        {(addGenealogy, { data, loading, error }) => {
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

## Test
* Run it and see if when you fill form out it will populate the database (see if when you visit home page the item you added in on the home page)
