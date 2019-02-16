# Add Update button, make UserColognes stateful component
## Create a new feature branch
`$ git checkout -b update`

## Add an update button to modify existing `Colognes`

`UserColognes.js`

* We also pull in Fragment to avoid adding extraneous HTML

```
import React, { Component, Fragment } from 'react';
// MORE CODE

  {(deleteUserCologne, attrs = {}) => {
    return (
      <Fragment>
        <button className="button-primary">Update</button>
        <button
          className="delete-button"
          onClick={() => this.handleDelete(deleteUserCologne)}
        >
          {attrs.loading ? 'deleting...' : 'X'}
        </button>
      </Fragment>
    );
  }}
</Mutation>

// MORE CODE
```

* The button needs a type of "button" to avoid warking
  - [docs](https://github.com/erikras/redux-form/issues/2679)

## We need `state`
* We aleady are using a CBC but if you were using a SFC, I have included the instructions below on how to convert
* Convert `UserColognes` from SFC to CBC
* Before:

`UserColognes.js`

```
const UserColognes = ({ username }) => (
  <Query query={GET_USER_COLOGNES} variables={{ username }}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
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
              <Link to={`/Cologne/${cologne._id}`}>
                <p>
                  {cologne.scentName}
                </p>
              </Link>
              <p style={{ marginBottom: '0' }}>{cologne.likes}</p>
              <Mutation
                mutation={DELETE_USER_COLOGNE}
                variables={{ _id: Cologne._id }}
                refetchQueries={() => [
                  { query: GET_ALL_COLOGNES },
                  { query: GET_CURRENT_USER },
                ]}
                update={(cache, { data: { deleteUserCologne } }) => {
                  // console.log(cache, data);
                  const { getUserColognes } = cache.readQuery({
                    query: GET_USER_COLOGNES,
                    variables: { username },
                  });

                  cache.writeQuery({
                    query: GET_USER_COLOGNES,
                    variables: { username },
                    data: {
                      getUserColognes: getUserColognes.filter(
                        cologne => cologne._id !== deleteUserCologne._id
                      ),
                    },
                  });
                }}
              >
                {(deleteUserCologne, attrs = {}) => (
                  <Fragment>
                    <button className="button-primary">Update</button>
                    <p
                      className="delete-button"
                      onClick={() => handleDelete(deleteUserCologne)}
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

* The SFC was being passed `({username})` but after the conversion to CBC you pull that destructured varariable off of `props` with `const ({username}) = this.props;`
* After (now a Class based component with `state`)
    - Important notes
        + When moving the variable `handleDelete` inside the class you remove `const`
        + When calling that event handler you use `this`

* Before

```
className="delete-button"
onClick={() => handleDelete(deleteUserCologne)}
```

* After

```
className="delete-button"
onClick={() => this.handleDelete(deleteUserCologne)}
```

## Full final file after conversion
`UserColognes.js`

```
import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

// queries
import { Query, Mutation } from 'react-apollo';

// custom queries
import {
  GET_USER_COLOGNES,
  DELETE_USER_COLOGNE,
  GET_ALL_COLOGNES,
  GET_CURRENT_USER,
} from '../../queries';

class UserColognes extends Component {
  state = {};

  handleDelete = deleteUserCologne => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this cologne?'
    );

    if (confirmDelete) {
      deleteUserCologne().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  render() {
    const { username } = this.props;
    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          return (
            <ul>
              <h3>Your Colognes</h3>
              {!data.getUserColognes.length && (
                <p>
                  <strong>You have not added any Colognes yet</strong>
                </p>
              )}
              {data.getUserColognes.map(cologne => (
                <li key={cologne._id}>
                  <Link to={`/cologne/${cologne._id}`}>
                    <p>
                      {cologne.scentName}
                    </p>
                  </Link>
                  <p style={{ marginBottom: '0' }}>{cologne.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_COLOGNE}
                    variables={{ _id: Cologne._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_COLOGNES },
                      { query: GET_CURRENT_USER },
                    ]}
                    update={(cache, { data: { deleteUserCologne } }) => {
                      // console.log(cache, data);
                      const { getUserColognes } = cache.readQuery({
                        query: GET_USER_COLOGNES,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_COLOGNES,
                        variables: { username },
                        data: {
                          getUserColognes: getUserColognes.filter(
                            cologne =>
                              cologne._id !== deleteUserCologne._id
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserCologne, attrs = {}) => (
                      <Fragment>
                        <button className="button-primary">Update</button>
                        <p
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserCologne)}
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

export default UserColognes;
```

## Test
* Login and got to `/profile` and click `X` and if you still see the confirm dialog box, you made a successful conversion

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add update button`

## Push to github
`$ git push origin update`

## Next - Add a edit modal for our cologne

## Additional Resources
* [React Fragment](https://reactjs.org/docs/fragments.html)
