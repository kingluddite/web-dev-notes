# Add UserInfo Component to Profile Page
## Create new stateless functional component (SFC)
### Troubleshooting techniques for this section
* Follow the below tips and you will save lots of time when you get errors
* When working with session you will need to refresh your browser at times to get the data you need
* You may at first see a browser error but before you do any troubleshooting, just refresh the browser and it should work
* Sometimes you may need to delete your browser token in the Application pane, and log in again
* Sometimes you may need to log out and log in
* You may need to browser to the home page, log in and then browse to the profile page to get the error to go away
* If you have old data in your mLab remote database it might be a good idea to delete all documents in the users collection and genealogies collection and create one user and add several genealogies so you know you have fresh data in the most current data structure

`Profile/UserInfo.js`

```
import React from 'react';

const UserInfo = () => {
  return <div>User Info</div>;
};

export default UserInfo;
```

`Profile.js`

```
import React from 'react';
import UserInfo from './UserInfo';

const Profile = () => {
  return (
    <div>
      <UserInfo />
    </div>
  );
};

export default Profile;
```

## Get logged in user data to our Profile component
* Best way to do this (as we've done before) is to send that data down to our Profile component in the profile route

`index.js`

* Before
 
```
// MORE CODE
<Route path="/profile" component={Profile} /> 
// MORE CODE
```

* After

```
// MORE CODE
<Route path="/profile" render={() => <Profile session={session} />} />
// MORE CODE
```

## Pass down `session` to UserInfo component

`Profile.js`

```
import React from 'react';
import UserInfo from './UserInfo';

const Profile = ({ session }) => {
  return (
    <div className="App">
      <UserInfo session={session} />
    </div>
  );
};

export default Profile;
```

## Use `session` inside UserInfo component

`UserInfo.js`

```
import React from 'react';

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>
      Username: {session.getCurrentUser.username}
    </p>
  </div>
);

export default UserInfo;
```

* **note** You will only be able to get this page if you are logged in but we will get an error if we don't first check that there is a logged in user

```
import React from 'react';

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>
      Username: {session.getCurrentUser.username}
    </p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {session.getCurrentUser.joinDate}</p>
  </div>
);

export default UserInfo;
```

## Add User Favorites and see a problem
* This will be a list of all the user favorites

```
const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {session.getCurrentUser.joinDate}</p>
    <ul>
      <h3>
        {session.getCurrentUser.username}
        's Favorites
      </h3>
      {session.getCurrentUser.favorites}
    </ul>
  </div>
);

export default UserInfo;
```

## Test it out in the browser
* We don't see any user `favorites`
* We need to add it

`queries/index.js`

```
// MORE CODE

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites
    }
  }
`;

// MORE CODE
```

## Test it out in the browser again
* We get an error (if you check the Network tab and examine the graphql POST error)

## Error
```
Network Error Error: Response not successful: Received status code 400
    at throwServerError (index.js:28)
    at index.js:53
```

* This lets us know there is a problem with our backend trying to load those favorites

## Examine `resolvers.js`

```
// MORE CODE

getCurrentUser: async (root, args, { currentUser, User }) => {
    if (!currentUser) {
      return null;
    }
    const user = await User.findOne({
      username: currentUser.username,
    }).populate({
      path: 'favorites',
      model: 'Genealogy',
    });
    return user;
  },

// MORE CODE
```

* **note** We are calling mongoose's `populate()` method that refers to the path of `favorites` and that will be on our User model

`User.js`

```
// MORE CODE

favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Genealogy',
  },
});

// MORE CODE
```

* Each `user` will have an array of favorites as `_ids`
* But `populate()` makes them not `_id`s anymore but instead will build out the array as an array of objects giving all the information about the genealogy

`queries/index.js`

```
// MORE CODE

/* User Queries */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        firstName
        lastName
      }
    }
  }
`;

// MORE CODE
```

## Update our UserInfo
`UserInfo.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class UserInfo extends Component {
  render() {
    const {
      username,
      email,
      joinDate,
      favorites,
    } = this.props.session.getCurrentUser;
    return (
      <div>
        <h3>UserInfo</h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Join Date: {joinDate}</p>
        <ul>
          <h3>
            {username.toUpperCase()}
            's Favorites
          </h3>
          {favorites.map(favorite => (
            <li key={favorite._id}>
              <Link to={`/genealogy/${favorite._id}`}>
                <p>{favorite.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserInfo;
```

## No matter what happens we get a server error
* We have yet to add a favorite
* To do this we will manually modify our mLab mongo database
* Login in and open the `genealogy` collection, edit it and copy one genealogy id and increase the likes from `0` to `1`

### example mlab `genealogies` collection document

```
{
    "_id": {
        "$oid": "5b8db404b7b5d43c9f3fb4a7"
    },
    "likes": 1,
    "firstName": "don",
    "lastName": "draper",
    "username": "bob",
    "createdDate": {
        "$date": "2018-09-03T22:21:56.754Z"
    },
    "__v": 0
}
```

* Then open the `users` collection and edit one user
    - Inside the favorites array for that user paste the id you copied

### example mlab `users` collection document

```
{
    "_id": {
        "$oid": "5b8edc235018181047631665"
    },
    "favorites": [
        "5b8db404b7b5d43c9f3fb4a7"
    ],
    "username": "bob",
    "email": "bob@bob.com",
    "password": "$2b$10$kvIfeCUUqTVW/oMk7Mi.vO4X9WcnMRzOG8X8BHlc5luRNdFxvV73e",
    "joinDate": {
        "$date": "2018-09-04T19:25:23.362Z"
    },
    "__v": 0
}
```

## Test in browser
* Log in with the user you just updated
* Click on the profile page
* You should see the user has one favorite (don draper in my example)

![one favorite](https://i.imgur.com/WLgyiG1.png)

* It is a link that will take you to that user
* Later, we will "code" a way to `like` genealogies

## Show message if user has no favorite genealogies
* Just some simple logic

`UserInfo.js`

```
// MORE CODE
<ul>
      <h3>
        {session.getCurrentUser.username}
        's Favorites
      </h3>
      {session.getCurrentUser.favorites.map(favorite => (
        <li key={favorite._id}>
          <Link to={`/genealogy/${favorite._id}`}>
            <p>
              {favorite.firstName} {favorite.lastName}
            </p>
          </Link>
        </li>
      ))}
      {/* no favorites? let user know */}
      {!session.getCurrentUser.favorites.length && (
        <p>
          <strong>You currently have no favorites. Go add some!</strong>
        </p>
      )}
    </ul>
// MORE CODE
```

* Now manually remove the like and favorite from mlab, then refresh the browser page of `/profile` and you'll see something like this:

![You have no favorites currently. Go add some!s](https://i.imgur.com/xqO8K8q.png)

* `You have no favorites currently. Go add some!`

# Make our date pretty
* Moment JS or `date fns` are other ways
* [Article on both](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43)
* But let's format our dates and time with vanilla JavaScript

`UserInfo.js`

```
// MORE CODE

https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-noconst 

formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>

// MORE CODE
```

* That will make the date look like: `Join Date: 9/4/2018 at 12:25:23 PM`

## Using Moment
* Pulling the date you will get a string in milliseconds
* You need to convert that to a date and format it using Moment.js

`UserInfo.js`

```
 // MORE CODE

import moment from 'moment';

 // MORE CODE

  render() {
    const {
      username,
      email,
      joinDate,
      favorites,
    } = this.props.session.getCurrentUser;

    return (
      <div>

      // MORE CODE

        <p>Join Date: {moment(joinDate, 'x').format('MMMM MM, YYYY')}</p>
        {/* <p>Join Date: {this.formatDate(joinDate)}</p> */}

        // MORE CODE

        </ul>
      </div>
    );
  }
}

export default UserInfo;
```

* [Reference](https://stackoverflow.com/questions/35184003/moment-js-convert-milliseconds-into-date-and-time)
* Moment JS output the date like this:

```
Join Date: September 09, 2018
```

## Next - Add User genealogies
