# Ouput `getCologne` data to `ColognePage`

`ColognePage.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_COLOGNE } from '../../queries';

class ColognePage extends Component {
  render() {
    const { match } = this.props;
    const { _id } = match.params;

    return (
      <Query query={GET_COLOGNE} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          // console.log(data);

          const {
            scentName,
            scentPrice,
            createdDate,
            likes,
            description,
            username,
          } = data.getCologne;

          return (
            <div className="App">
              <h2>Scent Name: {scentName}</h2>
              <p>{createdDate}</p>
              <p>Scent Price: {scentPrice}</p>
              <p>Description: {description}</p>
              <p>Likes: {likes}</p>
              <p>Created By: {username}</p>
              <button>Like</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
```

## View page in the browser
* All fields populated
* We wrote a query that pulled all fields using our `getCologne` query
* **note** `username` field is not populated... why?
  - We'll address this soon
* Our `createdDate` is a strange number... Why
  - You will find working with dates in JavaScript is problematic
  - There are packages like `momentjs` that make this a lot easier
  - We'll address this soon

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Output cologne data on UI`

## Push to github
`$ git push origin auth`

## Next - Add a cologne (with a user)
* Associate the name of the user that created the `cologne` by adding it to the form that creates new colognes
