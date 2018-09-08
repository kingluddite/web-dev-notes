# Adds imageUrl field on Genealogy model and imageUrl input in AddGenealogy
* We want to offer the ability to upload images
* Let's also add a category to our genealogy
    - Family Histories
    - Church Histories
    - Ethnic Histories
    - Historic preservation
    - Miscellany

`models/Genealogy.js`

```
// MORE CODE

imageUrl: {
  type: String,
  required: true,
},
category: {
  type: String,
  required: true,
},
description: {
  type: String,
},

// MORE CODE
```

## Add new fields to our schema

`schema.js`

```
exports.typeDefs = `

  type Genealogy {
    _id: ID
    firstName: String!
    lastName: String!
    imageUrl: String!
    category: String!
    description: String
    createdDate: String
    likes: Int
    username: String
  }

// MORE CODE
```

* We also need to make some modifications to our mutations
    - Add fields to our `addGenealogy` mutation

`schema.js`

```
// MORE CODE
type Mutation {
  addGenealogy(firstName: String!, lastName: String!, imageUrl: String!, category: String!, description: String, username: String): Genealogy

// MORE CODE
```

## Update our resolvers file

`resolvers.js`

```
// MORE CODE

Mutation: {
    addGenealogy: async (
      root,
      { firstName, lastName, imageUrl, category, description, username },
      { Genealogy }
    ) => {
      // constructor
      const newGenealogy = await new Genealogy({
        firstName,
        lastName,
        imageUrl,
        category,
        description,
        username,
      }).save();
      return newGenealogy;
    },

// MORE CODE
```

## Update our queries

`queries/index.js`

```
// MORE CODE

/* Genealogy Mutations */

export const ADD_GENEALOGY = gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $imageUrl: String!
    $category: String!
    $description: String
    $username: String
  ) {
    addGenealogy(
      firstName: $firstName
      lastName: $lastName
      imageUrl: $imageUrl
      category: $category
      description: $description
      username: $username
    ) {
      firstName
      lastName
      imageUrl
      category
      description
    }
  }
`;

// MORE CODE
```

`fragments.js`

```
// MORE CODE

export const genealogyFragments = {
  genealogy: gql`
    fragment CompleteGenealogy on Genealogy {
      _id
      firstName
      lastName
      imageUrl
      category
      description
      createdDate
      likes
      username
    }
  `,

// MORE CODE
```

## Add inputs and dropdown to our UI

`AddGenealogy.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

// components
import Error from '../Error';

// graphql
import { Mutation } from 'react-apollo';

// mutations
import {
  ADD_GENEALOGY,
  GET_ALL_GENEALOGIES,
  GET_USER_GENEALOGIES,
} from '../../queries';

const initialState = {
  firstName: '',
  lastName: '',
  imageUrl: '',
  category: 'Family',
  description: '',
  username: '',
};

class AddGenealogy extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
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
      // console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { firstName, lastName, imageUrl, category, description } = this.state;
    const isInvalid =
      !firstName || !lastName || !imageUrl || !category || !description;
    return isInvalid;
  };

  updateCache = (cache, { data: { addGenealogy } }) => {
    // console.log(cache, data);
    const { getAllGenealogies } = cache.readQuery({
      query: GET_ALL_GENEALOGIES,
    });
    // console.log('from cache', getAllGenealogies);
    // console.log('from data', addGenealogy);

    cache.writeQuery({
      query: GET_ALL_GENEALOGIES,
      data: {
        getAllGenealogies: [addGenealogy, ...getAllGenealogies],
      },
    });
  };

  render() {
    const {
      firstName,
      lastName,
      imageUrl,
      category,
      description,
      username,
    } = this.state;

    return (
      <Mutation
        mutation={ADD_GENEALOGY}
        variables={{
          firstName,
          lastName,
          imageUrl,
          category,
          description,
          username,
        }}
        refetchQueries={() => [
          {
            query: GET_USER_GENEALOGIES,
            variables: { username },
          },
        ]}
        update={this.updateCache}
      >
        {(addGenealogy, { data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

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
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Genealogy Image"
                  onChange={this.handleChange}
                  value={imageUrl}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Family">Family</option>
                  <option value="Church">Church</option>
                  <option value="Ethnic">Ethnic</option>
                  <option value="Historic">Historic</option>
                  <option value="Miscellany">Miscellany</option>
                </select>
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

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddGenealogy)
);

```

## Test it out
* Log in
* Create a genealogy
* All fields will be inserted into mongodb (check on mlab)

```
{
    "_id": {
        "$oid": "5b916d2d3b439fd7bdedb636"
    },
    "likes": 0,
    "firstName": "asdf",
    "lastName": "asdf",
    "imageUrl": "asdf",
    "category": "Ethnic",
    "description": "asdfasdf",
    "username": "bob",
    "createdDate": {
        "$date": "2018-09-06T18:08:45.293Z"
    },
    "__v": 0
}
```

