# Populate EditGenealogy fields in modal
* We will replace onClick event handler to show modal with one to load Genealogy
* Notice how we have access to `genealogy`

`UserGenealogies.js`

```
// MORE CODE

loadGenealogy = genealogy => {
    console.log(genealogy);
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

// MORE CODE

{data.getUserGenealogies.map(genealogy => (

// MORE CODE

{(deleteUserGenealogy, attrs = {}) => (
                      <Fragment>
                        <button
                          className="button-primary"
                          onClick={() => this.loadGenealogy(genealogy)}

// MORE CODE
```

* We pass in `genealogy` to `loadGenealogy()`
* When update button clicked we log to see what genealogy holds and it holds only firstName and lastName
* We also show the modal
* We need to get more values and we can get that by updating the GET_USER_GENEALOGIES in our UserGenealogies component

`UserGenealogies`

```
// MORE CODE

<Query query={GET_USER_GENEALOGIES} variables={{ username }}>

// MORE CODE
```

## Add needed fields
* Before

```
// MORE CODE

export const GET_USER_GENEALOGIES = gql`
  query($username: String!) {
    getUserGenealogies(username: $username) {
      _id
      firstName
      lastName
      likes
    }
  }
`;

// MORE CODE
```

* After

```
// MORE CODE

export const GET_USER_GENEALOGIES = gql`
  query($username: String!) {
    getUserGenealogies(username: $username) {
      _id
      firstName
      lastName
      likes
      imageUrl
      category
      description
    }
  }
`;

// MORE CODE
```

## Test
* Click update button again and now we have all the fields we need

## Update our loadGenealogy function
* We will set the state to everything in our `genealogy` object (all the fields we need) and then we will also set modal to true

`UserGenealogies.js`

```
// MORE CODE

loadGenealogy = genealogy => {
   // console.log(genealogy);
   this.setState(...genealogy, { modal: true });
 };

// MORE CODE
```

* Add `_id` to state

`UserGenealogies.js`

```
// MORE CODE

class UserGenealogies extends Component {
  state = {
    _id: '', // add this
    firstName: '',
    lastName: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false,
  };

// MORE CODE
```

* We will need an `_id` for the mutation we will be executing in the future 

## Pass all our state values down to our modal
`UserGenealogies`

```
// MORE CODE

<ul>
              {modal && (
                <EditRecipeModal
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                  genealogy={this.state}
                />
              )}
              <h3>Your Genealogies</h3>

// MORE CODE
```

## Final
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

`EditGenealogyModal.js`

```
import React from 'react';

const EditRecipeModal = ({ genealogy, handleChange, closeModal }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-inner">
        <div className="modal-content">
          <form className="modal-content-inner">
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
              value={genealogy.firstName}
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
  );
};

export default EditRecipeModal;

```

## Test
* Click update and the fields populate with the current data
