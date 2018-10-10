# deleteUsercologne and Mutation

* Users add colognes
* We need a way for users to delete any colognes they added

## Create a new feature request branch

`$ git checkout -b delete-user-colognes`

## Add a delete button

`UserColognes.js`

```
// MORE CODE

              </Link>
              <p style={{ marginBottom: '0' }}>{cologne.likes}</p>
              <button className="delete-button">X</button>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default UserColognes;
```

## Think about what we need to do
* We have a delete button that does nothing
* We follow the pattern we've followed so far

1. We build our GraphQL schema inside `schema.js`
2. We build our resolver inside `resolvers.js`
3. We test out our GraphQL query/mutation inside the GraphQL GUI located at:

`http://localhost:4444`

4. If it works we copy it
5. We create our GraphQL client side query and paste in our successful copied code inside the export shell with a constant variable name
6. We import our react-apollo Mutation or Query and surround the code we will be using it inside and pass it any variables that are needed, if any
7. We use a render prop
8. We pull in our data object that holds the resultset from our GraphQL query

## Add schema for deleting user cologne
* We need to pass it a unique cologne `_id` so that we can delete the exact cologne we specify
* We make sure to use the new ObjectID type
* We return the cologne we delete

`schema.js`

```
// MORE CODE

type Mutation {
  addCologne(
    scentName: String!
    scentBrand: String!
    scentPrice: Int
    description: String
    username: String
  ): Cologne

  deleteUserCologne(_id: ObjectID): Cologne

// MORE CODE
```

## Update our resolvers
* We want to delete a specific cologne using its `_id` and we'll write a mutation that will search the entire colognes collection and delete the cologne with the matching `_id`
* We use async await like we have been
* We pass the `_id` as the second argument
* We point to the Cologne model
`resolvers.js`

```
// MORE CODE

deleteUserCologne: async (root, { _id }, { Cologne }) => {
  const cologne = await Cologne.findOneAndRemove({ _id });
  return cologne;
},

signinUser: async (root, { username, email, password }, { User }) => {

// MORE CODE
```

## Test in our GraphQL GUI
`http://localhost:4444/graphql`

* Grab a user `_id` of a cologne from the URL of a single page
* I went to the home page and clicked one of the colognes
* That took me to the single page and that is where I grabbed the cologne `_id`

![cologne _id in the URL](https://i.imgur.com/ZPr3Rhc.png)

* First see if you see your new `deleteUserCologne` by clicking the GraphQL GUI green `SCHEMA` button

```
mutation($_id: ObjectID) {
  deleteUserCologne(_id: $_id) {
    _id
  }
}
```

* Add the `_id` as a variable
* You copied this `_id` in a previous step

```
{
  "_id": "5bbbba7d39e9157bb3d91bb0"
}
```

* Click `play` to execute the code
* **tip** Keep the Network tab open in the Chrome console to see if you spot any GraphQL errors
* If all goes well you will get a result like this back in the GraphQL GUI

```
{
  "data": {
    "deleteUserCologne": {
      "_id": "5bbbba7d39e9157bb3d91bb0"
    }
  }
}
```

* If all goes well you can go to the home page and see the cologne has been removed
* You may need to refresh the home page to see the cologne is gone
* See if you can remove another cologne on your own
* If you don't have another cologne, just add one and then remove it
* We almost have dealt with `CRUD`
  - Create, Read, Update, Delete
  - We did all but Update and we'll take care of update soon

## We created a success way to delete a user cologne using GraphQL
* Time to copy it

## Time for our client side GraphQL `DELETE_USER_COLOGNE`
`index.js`

```
// MORE CODE

// Cologne Mutations

export const ADD_COLOGNE = gql`
  // MORE CODE

export const DELETE_USER_COLOGNE = gql`
  mutation($_id: ObjectID) {
  deleteUserCologne(_id: $_id) {
    _id
  }
}
`

// MORE CODE
```

## Pull it all together
* Let's build this in steps
* We have a Query already in `UserColognes.js` but we can add as many other GraphQL queries or mutations as we want
* We'll import our `DELETE_USER_COLOGNE` and wrap our delete button in our `Mutation` component, we'll destructure the `_id` we need for the deleteUserCologne and remember that when we use Mutation GraphQL we have access to the GraphQL function in the first argument
* We'll need to add an event to the delete button and then when it is clicked we'll need to ask the user if they are sure (we'll use a simple JavaScript confirmation box for this)
* If the user confirms the delete we'll call another function that will call our delete GraphQL code

`UserColognes.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// GraphQL
import { Query, Mutation } from 'react-apollo';
import { GET_USER_COLOGNES, DELETE_USER_COLOGNE } from '../../queries';

class UserColognes extends Component {
  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              <h3>Your Colognes</h3>
              {!data.getUserColognes.length && (
                <p>
                  <strong>You have not added any colognes yet</strong>
                </p>
              )}
              {data.getUserColognes.map(cologne => (
                <li key={cologne._id}>
                  <Link to={`/cologne/${cologne._id}`}>
                    <p>{cologne.scentName}</p>
                  </Link>
                  <p>Likes: {cologne.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_COLOGNE}
                    variables={{ _id: cologne._id }}
                  >
                    {deleteUserCologne => {
                      return <button className="delete-button">X</button>;
                    }}
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

export default UserColognes;
```

## Add our event handler
* The user clicks the delete so we need to add an event for this:
  - We'll also pass the `deleteUserCologne` function

```
// MORE CODE

class UserColognes extends Component {
  handleDelete = deleteUserCologne => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this cologne?'
    );

    if (confirmDelete) {
      deleteUserCologne().then(({ data }) => {
        console.log(data);
      });
    }
  };

  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>

        // MORE CODE

          return (

           // MORE CODE

              {data.getUserColognes.map(cologne => (
                <li key={cologne._id}>
                  <Link to={`/cologne/${cologne._id}`}>
                    <p>{cologne.scentName}</p>
                  </Link>
                  <p>Likes: {cologne.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_COLOGNE}
                    variables={{ _id: cologne._id }}
                  >
                    {deleteUserCologne => {
                      return (
                        <button
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserCologne)}
                        >
                          X
                        </button>
                      );
                    }}
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

export default UserColognes;
```

## Test in browser
* Click on `X`
* You will get confirmation warning window about deleting
* Click OK
* Nothing happens
* But refresh and the cologne you clicked on to remove is gone
* We need to fix this so that when we delete, the delete happens instantly without a page refresh

## Update Mongoose code
* We get an error:

```
DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
```

* Here is the code we were using:

`resolvers.js`

```
// MORE CODE

deleteUserCologne: async (root, { _id }, { Cologne }) => {
  const cologne = await Cologne.findOneAndRemove({ _id });
  return cologne;
},

// MORE CODE
```

* We will now use `findOneAndDelete()` instead of `findOneAndRemove()`

```
// MORE CODE

deleteUserCologne: async (root, { _id }, { Cologne }) => {
  const cologne = await Cologne.findOneAndDelete({ _id });
  return cologne;
},

// MORE CODE
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add delete user mutation`

## Push to github
`$ git push origin delete-user-colognes`

## Next - Delete with Optimistic UI

## Additional Resources
* [What is CRUD](https://www.codecademy.com/articles/what-is-crud)
* [REST vs CRUD](https://www.bmc.com/blogs/rest-vs-crud-whats-the-difference/)
