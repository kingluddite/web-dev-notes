# Add UserInfo Component to Profile Page
## Create new stateless functional component (SFC)

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

## Pass down `session` to Profile component

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

## Pass down `session` to UserInfo component

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

* You will only be able to get this page if you are logged in but we will get an error if we don't first check that there is a logged in user

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

* Each user will have an array of favorites as `_ids`
* But populate makes them not `_id`s anymore but instead will build out the array as an array of objects giving all the information about the genealogy

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

## No matter what happens we get a server error
* We have yet to add a favorite
* To do this we will manually modify our mLab mongo database
* Login in and open the genealogy collection, edit it and copy one genealogy id and increase the likes from `0` to `1`

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
* We will program a way later to `like` genealogies

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
          <strong>You have no favorites currently. Go add some!</strong>
        </p>
      )}
    </ul>
// MORE CODE
```

* Now manually remove the like and favorite from mlab and you'll see something like this:

![You have no favorites currently. Go add some!s](https://i.imgur.com/xqO8K8q.png)

* `You have no favorites currently. Go add some!`

# Make our date pretty
* Moment JS or date fns are other ways
* [Article on both](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43)
* But let's format our dates and time with vanilla JavaScript

`UserInfo.js`

```
// MORE CODE

https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-noconst formatDate = date => {
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

## Next - Add User recipes
