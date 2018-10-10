# Add UserColognes component to Profile Page
* We will implement `getUserColognes` query
* We want one location where we keep all our **user Colognes** in the logged in user `profile` page

`Profile/UserColognes.js`

* Make it a CBC

```
import React, { Component } from 'react';

class UserColognes extends Component {
  render() {
    return <div>UserColognes</div>;
  }
}

export default UserColognes;
```

`Profile/Profile.js`

* We import `UserColognes` and place it so it renders in our `Profile` UI just below the `UserInfo` component

```
import React, { Component } from 'react';

// custom components
import UserInfo from './UserInfo';
import UserColognes from '../Cologne/UserColognes';

class Profile extends Component {
  render() {
    const { session } = this.props;
    return (
      <div>
        <UserInfo session={session} />
        <UserColognes />
      </div>
    );
  }
}

export default Profile;
```

## Test in browser
* You should see `UserColognes` at bottom of profile page

## We need the username
* How do we get the username to our `UserColognes`?
* We already have passed session down to Profile so we can easily use it again by passing it also down to the `UserColognes` component
* We could pass it down like we did before:

```
// MORE CODE

<div>
  <UserInfo session={session} />
  <UserColognes session={session} />
</div>

// MORE CODE
```

## But we will create a `username` prop and pass it just the `username`
`Profile`

`Profile.js`

```
// MORE CODE

<div>
  <UserInfo session={session} />
  <UserColognes username={session.getCurrentUser.username} />
</div>

// MORE CODE
```

### Think about the big picture - What do we need?
* We want to find all the colognes that are tied to the logged in user
* When a user is logged in they add a cologne and that cologne has as it's owner the logged in user's `username`
  - This is why it is essential that the `username` is unique
  - Whenever we create a user we have a mongoose schema that ensures all `username`'s will be unique and will ERROR if there is a duplicate `username`

## First - Create a schema
* We need to create a schema that will gather all the user colognes
* We'll call it `getUserColognes`

### Think what we need to put in `input` and get back `output`
#### input
* We need a unique username as the only argument
* We need to require the `username` is a string

#### output
* We need to return an array of colognes

`schema.js`

```
getUserColognes(username: String!): [Cologne]
```

* We can place it inside the other Queries

```
// MORE CODE

type Query {
  getAllColognes: [Cologne]
  getCologne(_id: ObjectID!): Cologne
  searchColognes(searchTerm: String): [Cologne]

  getCurrentUser: User
  getUserColognes(username: String!): [Cologne]
}

// MORE CODE
```

## Now we need to update our resolver
* The model we'll use is Cologne
* We will pass this query the username as an argument
* We'll sort all colognes by when they were added `aka cratedDate` in descending order

`resolvers.js`

```
// MORE CODE

  getUserColognes: async (root, { username }, { Cologne }) => {
    const userColognes = await Cologne.find({ username }).sort({
      createdDate: 'desc',
    });
    return userColognes;
  },
},

Mutation: {

// MORE CODE
```

### Now what?
* We have our schema created
* We have our resolver
* Now we need to **test** by using the GraphQL GUI

`http://localhost:4444/graphql`

```
query($username: String!) {
  getUserColognes(username: $username) {
    scentName
  }
}
```

* Don't forget we need to pass our variable a value using GraphQL GUI's Query Variables

```
{
  "username": "bob"
}
```

* Test it by clicking play and if that username exists in your colognes collection, you will get something back like:

```
{
  "data": {
    "getUserColognes": [
      {
        "scentName": "sdfd"
      }
    ]
  }
}
```

* So we need to pull this `data` object inside our UserInfo component
* Notice although there is only one cologne above, the `data` object has a method called `getUserColognes` that contains an array of `colognes`

### Add our new query `GET_USER_COLOGNES`

`queries/index.js`

```
// MORE CODE

export const GET_USER_COLOGNES = gql`


`;

// User Mutation

// MORE CODE
```

* And now we just paste in the GraphQL query we tested and know that it works

`queries/index.js`

```
// MORE CODE

export const GET_USER_COLOGNES = gql`
  query($username: String!) {
    getUserColognes(username: $username) {
      scentName
    }
  }
`;

// User Mutation

// MORE CODE
```

## Pull in our user colognes into UserColognes 
* Get information about the currently logged in `UserColognes`
* Need to perform a query so we again need to use the `Query` component from `react-apollo`

`UserColognes.js`

```
import React, { Component } from 'react';

// GraphQL
import { Query } from 'react-apollo';
import { GET_USER_COLOGNES } from '../../queries';

class UserColognes extends Component {
  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {(data, loading, error) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);

          return <div>UserColognes</div>;
        }}
      </Query>
    );
  }
}

export default UserColognes;
```

## Watch out!
* I did not restructure `data`, `loading` and `error`
* So if you run the above code you will get this TypeError: `Cannot read property 'map' of undefined`
* To show you what the problem is run this code

`UserColognes.js`

* Notice my JSX comments, remember to use them when adding comments in JSX or you will incur errors in your syntax

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_USER_COLOGNES } from '../../queries';

class UserColognes extends Component {
  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {(data, loading, error) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data.data);

          return (
            <ul>
              <h3>Your Colognes</h3>
              {/* {!data.getUserColognes.length && ( */}
              {/*   <p> */}
              {/*     <strong>You have not added any colognes yet</strong> */}
              {/*   </p> */}
              {/* )} */}
              {/* {data.getUserColognes.map(cologne => ( */}
              {/*   <li key={cologne._id}> */}
              {/*     <Link to={`/cologne/${cologne._id}`}> */}
              {/*       <p>{cologne.scentName}</p> */}
              {/*     </Link> */}
              {/*     <p>Likes: {cologne.likes}</p> */}
              {/*   </li> */}
              {/* ))} */}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default UserColognes;
```

#### We log out `data`
* Open the console and you will `data` which we logged out
* Expand it and you'll see another `data`
* Inside that nested `data` you will see `getUserColognes` and that is the method that is outputting and array of colognes and that is what we need to map against
* So long story short, when working with `react-apollo`s Query or Mutation compnents remember to destructure `data`, `loading`, `error`
  - Don't do this:

```
// MORE CODE

{(data, loading, error) => {

// MORE CODE
```

* And do this:

```
// MORE CODE

{({ data, loading, error }) => {

// MORE CODE
```

* It is a very small detail but one that will drive you bonkers if you omit the destructuring
* But you will always find a solution if you know how to `console.log(data)` to see what is getting returned from your Query or Mutation GraphQL
* So this is what your code should look like:

`UserColognes.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// GraphQL
import { Query } from 'react-apollo';
import { GET_USER_COLOGNES } from '../../queries';

class UserColognes extends Component {
  render() {
    const { username } = this.props;

    return (
      <Query query={GET_USER_COLOGNES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);

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

* The code works but why are we getting the `Warning: Each child in an array or iterator should have a unique "key" prop`
* The reason is we need to add the `_id` to our GraphQL client side query
* We also are missing our `likes`
* We need to update GET_USER_COLOGNES
* This is an eady fix, just add `_id` and `likes` like below:

`query/index.js`

```
// MORE CODE

export const GET_USER_COLOGNES = gql`
  query($username: String!) {
    getUserColognes(username: $username) {
      _id
      scentName
      likes
    }
  }
`;

// MORE CODE
```

### Take your app for a test drive in the browser
* When you log in and view the `Profile` Page
* The unique key error is gone and we have a `0` for favorites
* **note** You can comment out the `console.log` in UserColognes but just like to check it every now and then as it lets me know what is getting called and what fields are available from the GraphQL we created

## End Result
* Now when you visit the Profile page you will see the user profile info
* But you will also see a list of all the colognes that that particular user added and the number of likes they each have

## Here's what your UserColognes might look like
* If you used a SFC instead of CBC
* I like to include this just to reiterate that the structure of your code and how you use variables and functions changes when use use a CBC vs a SFC

```
import React from 'react';
import { Link } from 'react-router-dom';
// queries
import { Query } from 'react-apollo';

import { GET_USER_COLOGNES } from '../../queries';

const UserColognes = ({ username }) => (
  <Query query={GET_USER_COLOGNES} variables={{ username }}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      console.log(data);

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
                  {cologne.firstName} {cologne.lastName}
                </p>
              </Link>
              <p>{cologne.likes}</p>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default UserColognes;
```

## Take it for a test drive in the browser
* Now you can see all the user `colognes` when you view the `profile` page

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add UserColognes`

## Push to github
`$ git push origin profile`

## Next - Route Protection

## Additional Resources
* [jsx comments](https://wesbos.com/react-jsx-comments/)



