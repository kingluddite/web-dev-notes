# Add Update button, make UserGenealogies stateful component

## Switch back to local dev (make the necessary changes)
* Add an update button to modify existing genealogies

`UserGenealogies.js`

```
import React, { Fragment } from 'react';
// MORE CODE

{(deleteUserGenealogy, attrs = {}) => (
                 <Fragment>
                   <button className="button-primary">Update</button>
                   <p
                     className="delete-button"
                     onClick={() => handleDelete(deleteUserGenealogy)}
                   >
                     {attrs.loading ? 'deleting...' : 'X'}
                   </p>
                 </Fragment>
               )}
             </Mutation>
// MORE CODE
```

## We need state
* Convert `UserGenealogies` from SFC to CBC
* Before:

`UserGenealogies.js`

```
const UserGenealogies = ({ username }) => (
  <Query query={GET_USER_GENEALOGIES} variables={{ username }}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      // console.log(data);

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
                        genealogy => genealogy._id !== deleteUserGenealogy._id
                      ),
                    },
                  });
                }}
              >
                {(deleteUserGenealogy, attrs = {}) => (
                  <Fragment>
                    <button className="button-primary">Update</button>
                    <p
                      className="delete-button"
                      onClick={() => handleDelete(deleteUserGenealogy)}
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
```

* The SFC was being passed ({username}) but after the conversion to CBC you pull that destructured varariable off of `props` with `const ({username}) = this.props;`
* After (now a Class based component with state)
    - Important notes
        + When moving the variable handleDelete inside the class you remove `const`
        + When calling that event handler you use `this`

Before

```
className="delete-button"
onClick={() => handleDelete(deleteUserGenealogy)}
```

After

```
className="delete-button"
onClick={() => this.handleDelete(deleteUserGenealogy)}
```

## Full final file after conversion
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

class UserGenealogies extends Component {
  state = {};

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

  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_GENEALOGIES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

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
                        <button className="button-primary">Update</button>
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

## Test
* Login and got to `/profile` and click `X` and if you still see the confirm dialog box, you made a successful conversion
