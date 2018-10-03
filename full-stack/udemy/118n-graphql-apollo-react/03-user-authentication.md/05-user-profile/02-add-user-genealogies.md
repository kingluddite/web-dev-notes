# Add UserGenealogies component to Profile Page
* We will implement `getUserGenealogies` query
* We want one location where we keep all our **user Genealogies** in the logged in user profile page

`Profile/UserGenalogies.js`

* Make it a SFC

```
import React from 'react';

const UserGenalogies = () => {
  return <div>UserGenalogies</div>;
};

export default UserGenalogies;
```

`Profile/Profile.js`

```
import React from 'react';

// components
import UserInfo from './UserInfo';
import UserGenealogies from './UserGenealogies';

const Profile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session} />
      <UserGenealogies />
    </div>
  );
};

export default Profile;
```

## Test in browser
* You should see `UserGenealogies` at bottom of profile page

## Get information about the currently logged in user has created
* Need to perform a query so we need `Query` component from `react-apollo`

## Pass down username
`Profile`

```
// MORE CODE

const Profile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session} />
      <UserGenealogies username={session.getCurrentUser.username} />
    </div>
  );
};

// MORE CODE
```

## Grab username in UserGenealogies

`UserGenealogies`

```
// MORE CODE

const UserGenealogies = ({ username }) => (
  <Query query={GET_USER_GENEALOGIES} variables={username}>
    {/* test  */}
  </Query>
);

// MORE CODE
```

## Add a new schema
* This will return an array of genealogies and we'll pass a `username` to grab all those user's genealogy

`schema.js`

```
// MORE CODE

getCurrentUser: User
getUserGenealogies(username: String!): [Genealogy]
 }

// MORE CODE
```

## Now we write our resolver
`resolvers.js`

```
// MORE CODE

getUserGenealogies: async (root, { username }, { Genealogy }) => {
    const userGenealogies = await Genealogy.find({ username }).sort({
      createdDate: 'desc',
    });
    return userGenealogies;
  },

  Mutation: {

// MORE CODE
```

## Now create the query variable `GET_USER_GENEALOGIES`

`queries/index.js`

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

// User Mutations

// MORE CODE
```

## Final UserGenealogy

```
import React from 'react';
import { Link } from 'react-router-dom';
// queries
import { Query } from 'react-apollo';

import { GET_USER_GENEALOGIES } from '../../queries';

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
              <p>{genealogy.likes}</p>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default UserGenealogies;
```

## Take it for a test drive in the browser
* Now you can see all the user genealogies when you view the Profile page

## If you wanted to make it a class it would look like this:

`UserGenealogies.js`

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { GET_USER_Genealogies } from '../../queries';
import { Link } from 'react-router-dom';

export class UserGenealogies extends Component {
  render() {
    const { username } = this.props;
    return (
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
                  <strong>You have not added any Genealogies yet</strong>
                </p>
              )}
              {data.getUserGenealogies.map(genealogy => (
                <li key={genealogy._id}>
                  <Link to={`/genealogy/${genealogy._id}`}>
                    <p>{genealogy.title}</p>
                  </Link>
                  <p>genealogy.likes</p>
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





