# Update UserGenealogy Mutation on client

## Important check!!!!!
* You are now developing so make sure you changed all production info to development
* Change the port number to ***4444*** in `variables.env`

```
// MORE CODE

PORT=4444

// MORE CODE
```

* Change the heroku's uri back to:

```
// MORE CODE

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',

// MORE CODE
```

## Update schema

`schema.js`

* **note** Remember to say what type is returned `Genealogy` in the case of `updateUserGenealogy`

```
// MORE CODE

type Mutation {
    addGenealogy(firstName: String!, lastName: String!, imageUrl: String!, category: String!, description: String, username: String): Genealogy
    deleteUserGenealogy(_id: ID): Genealogy
    updateUserGenealogy(_id: ID!, firstName: String!, lastName: String!, imageUrl: String!, category: String!, description: String): Genealogy

// MORE CODE
```

## Update resolvers

`resolvers.js`

* **note** when we use `$set`, we are not setting `_id`

```
// MORE CODE

updateUserGenealogy: async (
      root,
      { _id, firstName, lastName, imageUrl, category, description },
      { Genealogy }
    ) => {
      const updatedGenealogy = await Genealogy.findOneAndUpdate(
        { _id },
        { $set: { firstName, lastName, imageUrl, category, description } },
        { new: true }
      );
      return updatedGenealogy;
    },

    likeGenealogy: async (root, { _id, username }, { Genealogy, User }) => {

// MORE CODE
```

## Create variable in `genealogy` queries
`queries/index.js`

```
// MORE CODE

export const UPDATE_USER_GENEALOGY = gql`
  mutation(
    $_id: ID!
    $firstName: String!
    $lastName: String!
    $imageUrl: String!
    $category: String!
    $description: String
  ) {
    updateUserGenealogy(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      _id
      firstName
      lastName
      likes
      category
      imageUrl
      description
    }
  }
`;

// MORE CODE
```

* Copy from `schema.js` and paste into `updateUserGenealogy` to speed up workflow

## Import Mutation component and surround `EditGenealogyModal` with it
* Here is the final UserGenealogies.js

`UserGenealogies.js`

```
import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
// queries
import { Query, Mutation } from 'react-apollo';

// custom queries
import {
  GET_USER_GENEALOGIES,
  DELETE_USER_GENEALOGY,
  GET_ALL_GENEALOGIES,
  GET_CURRENT_USER,
} from '../../queries';

// components
import EditGenealogyModal from '../Genealogy/EditGenealogyModal';

class UserGenealogies extends Component {
  state = {
    _id: '',
    firstName: '',
    lastName: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false,
  };

  handleDelete = deleteUserGenealogy => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this genealogy?'
    );

    if (confirmDelete) {
      deleteUserGenealogy().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  handleSubmit = (event, updateUserGenealogy) => {
    event.preventDefault();
    updateUserGenealogy().then(({ data }) => {
      console.log(data);
      this.closeModal();
    });
  };

  loadGenealogy = genealogy => {
    // console.log(genealogy);
    this.setState({ ...genealogy, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({ [name]: value });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_GENEALOGIES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              {modal && (
                <EditGenealogyModal
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                  genealogy={this.state}
                  handleSubmit={this.handleSubmit}
                />
              )}
              <h3>Your Genealogies</h3>
              {!data.getUserGenealogies.length && (
                <p>
                  <strong>You have not added any genealogies yet</strong>
                </p>
              )}
              {data.getUserGenealogies.map(genealogy => (
                <li key={genealogy._id}>
                  <Link to={`/genealogy/${genealogy._id}`}>
                    <p>
                      {genealogy.firstName} {genealogy.lastName}
                    </p>
                  </Link>
                  <p style={{ marginBottom: '0' }}>{genealogy.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_GENEALOGY}
                    variables={{ _id: genealogy._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_GENEALOGIES },
                      { query: GET_CURRENT_USER },
                    ]}
                    update={(cache, { data: { deleteUserGenealogy } }) => {
                      // console.log(cache, data);
                      const { getUserGenealogies } = cache.readQuery({
                        query: GET_USER_GENEALOGIES,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_GENEALOGIES,
                        variables: { username },
                        data: {
                          getUserGenealogies: getUserGenealogies.filter(
                            genealogy =>
                              genealogy._id !== deleteUserGenealogy._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserGenealogy, attrs = {}) => (
                      <Fragment>
                        <button
                          className="button-primary"
                          onClick={() => this.loadGenealogy(genealogy)}
                        >
                          Update
                        </button>
                        <p
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserGenealogy)}
                        >
                          {attrs.loading ? 'deleting...' : 'X'}
                        </p>
                      </Fragment>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default UserGenealogies;

```

* Here is the final `EditGenealogyModal`

`EditGenealogyModal.js`

```
import React from 'react';
import { Mutation } from 'react-apollo';

import { UPDATE_USER_GENEALOGY } from '../../queries';

const EditGenealogyModal = ({ handleSubmit, genealogy, handleChange, closeModal }) => (
  <Mutation mutation={UPDATE_USER_GENEALOGY} variables={{ _id: genealogy._id, firstName: genealogy.firstName, lastName: genealogy.lastName, imageUrl: genealogy.imageUrl, category: genealogy.category, description: genealogy.description }}>
    {updateUserGenealogy => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form className="modal-content-inner" onSubmit={(event) => handleSubmit(event, updateUserGenealogy)}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={genealogy.firstName}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={genealogy.lastName}
              />
              <label htmlFor="imageUrl">Genealogy Image URL</label>
              <input
                type="text"
                name="imageUrl"
                onChange={handleChange}
                value={genealogy.imageUrl}
              />
              <label htmlFor="category">Category of Genealogy</label>
              <select
                name="category"
                onChange={handleChange}
                value={genealogy.category}
              >
                <option value="Family">Family</option>
                <option value="Church">Church</option>
                <option value="Ethnic">Ethnic</option>
                <option value="Historic">Historic</option>
                <option value="Miscellany">Miscellany</option>
              </select>
              <label htmlFor="description">Add Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={genealogy.description}
              />
              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">
                  Update
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);

export default EditGenealogyModal;

```

## Test
* Click `update` button
* Make a change to one of the form fields
* The `modal` will close and the `genealogy` document is updated
* Check the home page and it is updated to
* Search for the new name and you will find it
* Go to the single page of the document and it is updated too
