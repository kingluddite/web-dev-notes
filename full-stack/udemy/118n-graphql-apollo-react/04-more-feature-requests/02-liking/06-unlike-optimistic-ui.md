# Unlike Optimistic UI
* We will wrap a Mutation around a Mutation
  - Think of [inception](https://giphy.com/gifs/inception-PxsDr1ISo6pPO)

`LikeCologne.js`

```
// MORE CODE

// queries
import { LIKE_COLOGNE, GET_COLOGNE, UNLIKE_COLOGNE } from '../../queries';

// MORE CODE

export class LikeCologne extends Component {

  // MORE CODE

  render() {
    // MORE CODE

    return (
      <Mutation mutation={UNLIKE_COLOGNE} variables={{ _id, username }}>
        <Mutation
          mutation={LIKE_COLOGNE}
          variables={{ _id, username }}
          update={this.updateLike}
        >
        // MORE CODE
        </Mutation>
      </Mutation>
    );
  }
}

export default withSession(LikeCologne);
```

## Unliking
* We'll do the opposite we did for liking a Cologne

`schema.js`

```
// MORE CODE

type Mutation {
   addCologne(firstName: String!, lastName: String!, description: String, username: String): Cologne
   deleteUserCologne(_id: ID): Cologne
   likeCologne(_id: ID!, username: String!): Cologne
   unlikeCologne(_id: ID!, username: String!): Cologne

// MORE CODE
```

## resolvers.js

```
// MORE CODE

unlikeCologne: async (root, { _id, username }, { Cologne, User }) => {
  const cologne = await Cologne.findOneAndUpdate(
    { _id },
    { $inc: { likes: -1 } }
  );
  const user = await User.findOneAndUpdate(
    { username },
    { $pull: { favorites: _id } }
  );
  return cologne;
},

// MORE CODE
```

* We just do the opposite for `likeCologne`
* subtract 1 (instead of adding 1)
* `$pull` instead of `$addToSet`

## Go to queries folder
* Copy `LIKE_COLOGNE` and paste it below itself
* Make sure function name matches (unlikeCologne) the one defined in our schema

```
// MORE CODE

export const UNLIKE_COLOGNE = gql`
  mutation($_id: ObjectID!, $username: String!) {
    unlikeCologne(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

// MORE CODE
```

## Add render props
* Update **args** for `handleLike` and `handleClick` and make sure you are passing them in the correct order (_how we pass them into our arrow function is how we use them when we pass them in as arguments to our event handler_)

```
 // MORE CODE

<Mutation query={UNLIKE_COLOGNE} variables={{ _id, username }}>
        {unlikeCologne => (
          <Mutation
            mutation={LIKE_COLOGNE}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeCologne =>
              username && (
                <button
                  onClick={() =>
                    this.handleClick(likeCologne, unlikeCologne)
                  }
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>

 // MORE CODE
```

## handle like and unlike

```
// MORE CODE

// graphq queries
import { LIKE_COLOGNE, GET_COLOGNE, UNLIKE_COLOGNE } from '../../queries';

// MORE CODE

export class LikeCologne extends Component {
  
  // MORE CODE

  handleClick = (likeCologne, unlikeCologne) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeCologne, unlikeCologne)
    );
  };

  handleLike = (likeCologne, unlikeCologne) => {
    if (this.state.liked) {
      // pass control of likeCologne to handleLike
      likeCologne().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      // unlike Cologne mutation
      // console.log('unlike');
      unlikeCologne().then(async ({ data }) => {
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeCologne } }) => {
    const { _id } = this.props;
    const { getCologne } = cache.readQuery({
      query: GET_COLOGNE,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_COLOGNE,
      variables: { _id },
      data: {
        getCologne: { ...getCologne, likes: likeCologne.likes + 1 },
      },
    });
  };

  updateUnlike = (cache, { data: { unlikeCologne } }) => {
    const { _id } = this.props;
    const { getCologne } = cache.readQuery({
      query: GET_COLOGNE,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_COLOGNE,
      variables: { _id },
      data: {
        getCologne: { ...getCologne, likes: unlikeCologne.likes - 1 },
      },
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;
    // console.log(this.props);

    return (
      <Mutation
        mutation={UNLIKE_COLOGNE}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeCologne => (
          <Mutation
            mutation={LIKE_COLOGNE}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeCologne =>
              username && (
                <button onClick={() => this.handleClick(likeCologne, unlikeCologne)}>
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeCologne);

```

* **important** I spent two hours wondering why my update wasn't working and it was because I spelled `updateUnlike` as `updateUnLike`
* Don't make the same mistake :)

## Test
* First remove all your colognes from mLab's MongoDB
* Add our sample data from users and colognes (using our import/export code for mLab)
* You click one and you like (1)
* You click again and it is (0)

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Make like unlike functional`

## Push to github
`$ git push origin like`
