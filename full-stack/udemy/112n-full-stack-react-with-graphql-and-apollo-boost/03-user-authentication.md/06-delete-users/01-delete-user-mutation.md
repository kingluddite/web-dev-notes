# deleteUserGenealogy and Mutation
* Add a delete button

`UserGenealogies.js`

```
// MORE CODE

</Link>
              <p style={{ marginBottom: '0' }}>{genealogy.likes}</p>
              <p className="delete-button">X</p>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default UserGenealogies;
```

### Add a Mutation
* Deleting data is a mutation
* Import Mutation
* Surround the delete button with `<Mutation>` Component
* Pass a mutation prop and give it a value of `DELETE_USER_GENEALOGY`

## Add schema for deleting genealogy
`schema.js`

```
// MORE CODE

type Mutation {
    addGenealogy(firstName: String!, lastName: String!, description: String, username: String): Genealogy
    deleteUserGenealogy(_id: ID):Genealogy

// MORE CODE
```

## Update our resolvers
`resolvers.js`

```
// MORE CODE

deleteUserGenealogy: async ( root, { _id }, { Genealogy }) => {
      const genealogy = await Genealogy.findOneAndRemove({ _id });
      return genealogy;
    },

    signupUser: async (root, { username, email, password }, { User }) => {

// MORE CODE
```

## Update queries
`index.js`

```
// MORE CODE

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

// MORE CODE
```

## Final UserGenealogy
`UserGenealogy.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
// queries
import { Query, Mutation } from 'react-apollo';

import { GET_USER_GENEALOGIES, DELETE_USER_GENEALOGY } from '../../queries';

const handleDelete = deleteUserGenealogy => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this genealogy?'
  );

  if (confirmDelete) {
    deleteUserGenealogy().then(({ data }) => {
      console.log(data);
    });
  }
};

const UserGenealogies = ({ username }) => (
  <Query query={GET_USER_GENEALOGIES} variables={{ username }}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      console.log(data);

      return (
        <ul>
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
              >
                {deleteUserGenealogy => {
                  return (
                    <p
                      className="delete-button"
                      onClick={() => handleDelete(deleteUserGenealogy)}
                    >
                      X
                    </p>
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

export default UserGenealogies;
```

## Test in browser
* Click on `X`
* You will get confirmation warning window about deleting
* Click OK
* Nothing happens
* But refresh and the genealogy you clicked on to remove is gone
