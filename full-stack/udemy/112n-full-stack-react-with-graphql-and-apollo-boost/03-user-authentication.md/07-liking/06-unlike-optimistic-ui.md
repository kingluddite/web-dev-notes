# Unlike Optimistic UI
* We will wrap a Mutation around a mutation

`LikeGenealogy`

```
// MORE CODE

// queries
import { LIKE_GENEALOGY, GET_GENEALOGY, UNLIKE_GENEALOGY } from '../../queries';

// components
import withSession from '../withSession';

export class LikeGenealogy extends Component {

    // MORE CODE

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <Mutation mutation={UNLIKE_GENEALOGY} variables={{ _id, username }}>
        <Mutation
          mutation={LIKE_GENEALOGY}
          variables={{ _id, username }}
          update={this.updateLike}
        >
        // MORE CODE
        </Mutation>
      </Mutation>
    );
  }
}

export default withSession(LikeGenealogy);
```

## Unliking
* We'll do the opposite we did for liking a genealogy

`schema.js`

```
// MORE CODE

type Mutation {
   addGenealogy(firstName: String!, lastName: String!, description: String, username: String): Genealogy
   deleteUserGenealogy(_id: ID): Genealogy
   likeGenealogy(_id: ID!, username: String!): Genealogy
   unlikeGenealogy(_id: ID!, username: String!): Genealogy

// MORE CODE
```

## resolvers
```
// MORE CODE

unlikeGenealogy: async (root, { _id, username }, { Genealogy, User }) => {
      const genealogy = await Genealogy.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return genealogy;
    },

    // MORE CODE
```

* We just do the opposite for likeGenealogy
* subtract 1 (instead of adding 1)
* `$pull` instead of `$addToSet`

## Go to queries folder
* Copy LIKE_RECIPE and paste it below itself
* Make sure function name matches (unlikeGenealogy) the one defined in our schema

```
// MORE CODE

export const UNLIKE_GENEALOGY = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeGenealogy(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

// MORE CODE
```

## Add render props
* Update args for handleLike and handleClick and make sure you are passing them in the correct order (how we pass them into our arrow function is how we use them when we pass them in as arguments to our event handler)

```
 // MORE CODE

<Mutation query={UNLIKE_GENEALOGY} variables={{ _id, username }}>
        {unlikeGenealogy => (
          <Mutation
            mutation={LIKE_GENEALOGY}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeGenealogy =>
              username && (
                <button
                  onClick={() =>
                    this.handleClick(likeGenealogy, unlikeGenealogy)
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

handleLike = (likeGenealogy, unlikeGenealogy) => {
  if (this.state.liked) {
    // pass control of likeGenealogy to handleLike
    likeGenealogy().then(async ({ data }) => {
      console.log(data);
      await this.props.refetch();
    });
  } else {
    // unlike recipe mutation
    unlikeGenealogy().then(async ({ data }) => {
      console.log(data);
      await this.props.refetch();
    });
  }
};

updateLike = (cache, { data: { likeGenealogy } }) => {
  const { _id } = this.props;
  const { getGenealogy } = cache.readQuery({
    query: GET_GENEALOGY,
    variables: { _id },
  });

// MORE CODE
```

## Optimistic UI for unlike

`LikeGenealogy.js`

```
// MORE CODE

updateUnlike = (cache, { data: { unlikeGenealogy } }) => {
    const { _id } = this.props;
    const { getGenealogy } = cache.readQuery({
      query: GET_GENEALOGY,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_GENEALOGY,
      variables: { _id },
      data: {
        getGenealogy: {
          ...getGenealogy,
          likes: unlikeGenealogy.likes - 1,
        },
      },
    });
  };

// MORE CODE
```

## Test
* You click one and you like (1)
* You click again and it is (0)

## Summary
* Congrats! Our app is pretty much done
* We can sign in
* We can add genealogies
* We can like a genealogy or unlike
* We have a profile
* Our likes are added to the user's favorites
* We can delete genealogies
* We can signout
* We can log in
* We can search for recipes we added
