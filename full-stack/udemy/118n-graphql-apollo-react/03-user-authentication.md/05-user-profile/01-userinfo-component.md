# Add UserInfo Component to Profile Page
## Create new branch

`$ git checkout -b profile`

* Now we will focus on the profile page
* When a user is logged in they can click on the page
* It will show all the user's added colognes

## Git stuff
`$ git checkout -b profile`

## Create new stateless CBC

`Profile/UserInfo.js`

```
import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    return <div>UserInfo</div>;
  }
}

export default UserInfo;
```

`Profile.js`

```
import React, { Component } from 'react';

// custom components
import UserInfo from './UserInfo';

class Profile extends Component {
  render() {
    return (
      <div>
        <UserInfo />
      </div>
    );
  }
}

export default Profile;
```

## Get logged in user data to our Profile component
* Best way to do this (as we've done before) is to send that data down to our `Profile` component in the profile route

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

## Pass down `session` to `UserInfo` component

`Profile.js`

```
import React, { Component } from 'react';

// custom components
import UserInfo from './UserInfo';

class Profile extends Component {
  render() {
    const { session } = this.props;
    return (
      <div>
        <UserInfo session={session} />
      </div>
    );
  }
}

export default Profile;
```

## Use `session` inside `UserInfo` component

`UserInfo.js`

```
import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    const { session } = this.props;

    return (
      <div>
        <h3>User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {session.getCurrentUser.joinDate}</p>
      </div>
    );
  }
}

export default UserInfo;
```

* **note** You will only be able to get to this page if you are logged in but we will get an error if we don't first check that there is a logged in user

## Add User Favorites and we'll see a problem
* This will be a list of all the user favorites

```
import React, { Component } from 'react';

class UserInfo extends Component {
  render() {
    const { session } = this.props;

    return (
      <div>
        <h3>User Info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {session.getCurrentUser.joinDate}</p>
        <ul>
          <li>
            <h3>
              {session.getCurrentUser.username}
              's Favorites
            </h3>
          </li>
        </ul>
        {session.getCurrentUser.favorites}
      </div>
    );
  }
}

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
      email
      joinDate
      favorites
    }
  }
`;

// MORE CODE
```

## Test it out in the browser again
* We get an error (if you check the `Network` tab and examine the graphql POST error)
* View the Preview and you will see this error

## Error
```
Field "favorites" of type "[Cologne]" must have a selection of subfields. Did you mean "favorites { ... }
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
      model: 'Cologne',
    });
    return user;
  },

// MORE CODE
```

* **note** We are calling mongoose's `populate()` method that refers to the path of `favorites` and that will be on our `User` model

`User.js`

```
// MORE CODE

favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Cologne',
  },
});

// MORE CODE
```

* Each `user` will have an array of favorites as `_id`
* But `populate()` makes them not `_id` anymore but instead will build out the array as an array of objects giving all the information about the cologne

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
        scentName
        scentBrand
      }
    }
  }
`;

// MORE CODE
```

## Update our `UserInfo`

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
              <Link to={`/cologne/${favorite._id}`}>
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
* Login in and open the `colognes` collection, edit it and copy one cologne `_id` and increase the **likes** from `0` to `1`

### example mlab `colognes` collection document

```
{
    "_id": {
        "$oid": "5bbb11989da263653ac62b2b"
    },
    "likes": 1,
    "scentName": "one",
    "scentBrand": "one",
    "scentPrice": 0,
    "description": "one",
    "username": "bob",
    "createdDate": {
        "$date": "2018-10-08T08:13:12.472Z"
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
        "$oid": "5bbb118d9da263653ac62b2a"
    },
    "favorites": [
        "5bbb11a19da263653ac62b2c"
    ],
    "username": "bob",
    "email": "bob@bob.com",
    "password": "$2b$10$19zL9OjATwmzxTp00u6k2OpLpR0ZqpyQf2Fl8HeJobWUdXVnJ7GlO",
    "joinDate": {
        "$date": "2018-10-08T08:13:01.349Z"
    },
    "__v": 0
}
```

## Test in browser
* Log in with the user you just updated
* Click on the `profile` page
* You should see the user has **one favorite**
* It is a link that will take you to that user
* Later, we will "code" a way to `like` colognes

## Show message if user has no favorite colognes
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
          <Link to={`/cologne/${favorite._id}`}>
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

* Now manually remove the like and favorite from `mlab`, then refresh the browser page of `/profile` and you'll see something like this:

![You have no favorites currently. Go add some!s](https://i.imgur.com/xqO8K8q.png)

* `You have no favorites currently. Go add some!`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add UserInfo component`

## Push to github
`$ git push origin profile`
