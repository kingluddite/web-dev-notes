## Add schema for LikeCologne
`schema.js`

```
// MORE CODE

type Mutation {
  // MORE CODE

  deleteUserCologne(_id: ObjectID): Cologne

  likeCologne(_id: ObjectID!, username: String!): Cologne

// MORE CODE
```

* When we like a cologne we will need to have the `_id` of that cologne as well as the username that liked it (both are required)

## Declare the `likeCologne` inside the mutation object of our resolvers file

`resolvers.js`

```
// MORE CODE
Mutation: {
  addCologne: async (root, { title, category, username }, { Cologne }) => {
    const newCologne = await new Cologne({
      title,
      category,
      username,
    }).save();
    return newCologne;
  },

  // below is what we are adding!

  likeCologne: async (root, { _id, username }, { Cologne, User }) => {
    const cologne = await Cologne.findOneAndUpdate(
      { _id },
      { $inc: { likes: 1 } }
    );
    const user = await User.findOneAndUpdate(
      { username },
      { $addToSet: { favorites: _id } }
    );
    return cologne;
  },

// MORE CODE
```

* We will use both models `Cologne` and `User`
* But we are only returning our `Cologne` 
* Use mongoose's `findOneAndUpdate()`
    - First argument will use `_id`
    - Second argument will be how we will update it
        + Increment likes by 1
* We also have to update the `User` model
    - Find a `user` in the db by their `username`
    - Then we'll update their `favorites` array by adding the `_id` of the `Cologne` that they just liked
    - `$addToSet` is how we can add item to an array
* We return the cologne we are liking

### Time to test our GraphQL using GUI
`http://localhost:4444/graphql`

* Click SCHEMA button to expand
* You should see `likeCologne` method
* It needs an cologne `_id` and a `username`
* Let's grab both values
  - I'll use my test username `bob`
  - I'll use an _id by clicking in web app to get to a single page of a cologne and grab the cologne's `_id` from the URL

#### GraphQL GUI

```
mutation($_id: ObjectID!, $username: String!) {
  likeCologne(_id: $_id, username: $username) {
    _id
    likes
  }
}
```

#### GraphQL GUI Query Variables
* Find the values for your own app and swap them in here

```
{
  "_id": "5bbfb033b2ea3e798cd5bace",
  "username": "bob"
}
```

* Press the Execute button
* You will get a similar value showing what `data` will hold

```
{
  "data": {
    "likeCologne": {
      "_id": "5bbfb033b2ea3e798cd5bace",
      "likes": 0
    }
  }
}
```

## Create client side GraphQL query shell
`queries/index.js`

```
// MORE CODE

export const DELETE_USER_COLOGNE = gql`
  mutation($_id: ObjectID) {
    deleteUserCologne(_id: $_id) {
      _id
    }
  }
`;

export const LIKE_COLOGNE = gql`

`;

// User Queries

// MORE CODE
```

* Paste in your working GraphQL

```
// MORE CODE

export const LIKE_COLOGNE = gql`
  mutation($_id: ObjectID!, $username: String!) {
    likeCologne(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

// User Queries

// MORE CODE
```

## Add Mutation to our Like button
`LikeCologne.js`

```
// MORE CODE
// graphql
import { Mutation } from 'react-apollo';
import { LIKE_COLOGNE } from '../../queries';

// MORE CODE

class LikeCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
  };

  state = {
    username: '',
  };

  componentDidMount = () => {
    const { session } = this.props;
    console.log(session);

    if (session.getCurrentUser) {
      const { username } = session.getCurrentUser;
      console.log(username);
      this.setState({
        username,
      });
    }
  };

  render() {
    const { username } = this.state;

    return (
      <Fragment>
        <Mutation mutation={LIKE_COLOGNE} variables={{ username, _id }}>
          <button type="button">Like</button>
        </Mutation>
      </Fragment>
    );
  }
}

export default withSession(LikeCologne);
```

* But we need to get the cologne `_id`
  - This is easy because our **parent** of the `LikeCologne` is `ColognePage` and that has access to the `_id` so we can just "pass it down" to the `LikeCologne` component

`ColognePage.js`

```
// MORE CODE

// custom components
import LikeCologne from './LikeCologne';

class ColognePage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  render() {
    const { match } = this.props;
    const { _id } = match.params;

    return (
      <Query query={GET_COLOGNE} variables={{ _id }}>

      // MORE CODE

          return (
            <div className="App">
              // MORE CODE
              
              <LikeCologne _id={_id} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ColognePage);
```

## Now we have access to `_id` in LikeCologne
`LikeCologne.js`

```
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// graphql
import { Mutation } from 'react-apollo';
import { LIKE_COLOGNE } from '../../queries';

// custom components
import withSession from '../withSession';

class LikeCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
  };

  state = {
    username: '',
  };

  componentDidMount = () => {
    const { session } = this.props;
    console.log(session);

    if (session.getCurrentUser) {
      const { username } = session.getCurrentUser;
      console.log(username);
      this.setState({
        username,
      });
    }
  };

  handleLike = likeCologne => {
    // pass control of likeCologne to handleLike
    likeCologne().then(({ data }) => {
      console.log(data);
    });
  };

  render() {
    const { username } = this.state;
    const { _id } = this.props;

    return (
      <Fragment>
        <Mutation mutation={LIKE_COLOGNE} variables={{ username, _id }}>
          {likeCologne =>
            username && (
              <button
                onClick={() => this.handleLike(likeCologne)}
                type="button"
              >
                Like
              </button>
            )
          }
        </Mutation>
      </Fragment>
    );
  }
}

export default withSession(LikeCologne);
```

* Now you can log in, browse to single cologne page, click like and you will see the `likeCologne` function is called in the console and if you refresh the page, the Like count in the UI increases by 1
* Keep clicking and it will keep increasing by 1 each time and you can see by refreshing the page
* This is obviously not what we want as we want to like or unlike a cologne, as it stands now we could "game the system" and like a cologne as much as we want and if we can all users can and this would not be a good thing

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add cologne like mutation`

## Push to github
`$ git push origin like`

## Next - Toggle like client side
