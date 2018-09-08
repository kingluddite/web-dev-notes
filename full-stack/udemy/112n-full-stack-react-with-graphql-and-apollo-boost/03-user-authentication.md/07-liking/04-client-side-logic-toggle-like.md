# Develop Client-side Logic to Properly Toggle Like
* When we go to our profile the number of likes is not added to our favorites

## refetch our likes
* Add async / await

`LikeGenealogy.js`

```
// MORE CODE

handleLike = likeGenealogy => {
  // pass control of likeGenealogy to handleLike
  likeGenealogy().then(async ({ data }) => {
    console.log(data);
    await this.props.refetch();
  });
};

// MORE CODE
```

## Change onClick to handleClick
* We do this so we can create a new function that will handle liking a genealogy as well as unliking a genealogy

before

` <button onClick={() => this.handleLike(likeGenealogy)}`

after

` <button onClick={() => this.handleClick(likeGenealogy)}`

## Add state of liked
* Initially set it to `false`

```
// MORE CODE

export class LikeGenealogy extends Component {
  state = {
    liked: false
    username: '',
  };

  // MORE CODE
```

## pass setState a function
* We will pass `setState` a function and give it an argument of `prevState`
* And we'll update the `liked` state based on the previous state
* And if we `like` it we want it to be the opposite that it previously was

```
// MORE CODE

handleClick = likeGenealogy => {
    this.setState(
      prevState => ({
        liked: !prevState.liked,
      }),
      () => this.handleLike(likeGenealogy)
    );
  };

// MORE CODE
```

* Once we update the `state` we can implement a callback function
* This callback function will be called everytime after we update the state in a syncronous fashion (usually setState() operates asynchronously and this allows it to work syncronously)

## Use logic to determine whether to fire off the like genealogy mutation based on the state

```
// MORE CODE

handleLike = likeGenealogy => {
    if (this.state.liked) {
      // pass control of likeGenealogy to handleLike
      likeGenealogy().then(async ({ data }) => {
        console.log(data);
        await this.props.refetch();
      });
    } else {
      // unlike recipe mutation
      console.log('unlike');
    }
  };

// MORE CODE
```

## Dynamically change text to `Liked` or `Like'`
```
// MORE CODE

<Mutation mutation={LIKE_GENEALOGY} variables={{ _id, username }}>
        {likeGenealogy =>
          username && (
            <button onClick={() => this.handleClick(likeGenealogy)}>
              {this.state.liked ? 'Liked' : 'Like'}
            </button>
          )
        }
      </Mutation>

// MORE CODE
```

### Event shorter with desconstruction
```
// MORE CODE

<Mutation mutation={LIKE_GENEALOGY} variables={{ _id, username }}>
        {likeGenealogy =>
          username && (
            <button onClick={() => this.handleClick(likeGenealogy)}>
              {liked ? 'Liked' : 'Like'}
            </button>
          )
        }
      </Mutation>

// MORE CODE
```

## Let's also log out the favorites

```
// MORE CODE

if (this.props.session.getCurrentUser) {
    const { username, favorites } = this.props.session.getCurrentUser;
    console.log(favorites);

// MORE CODE
```

## Prevent a user from liking a variable twice
* Use `findIndex()` to go into an array
    - It returns a 1 or -1 so we need to compare it to a -1
* For every `genealogy` within the `favorites` array and we'll find where every `favorite._id === _id` (aka we are trying to determine if the genealogy we are trying to like is `genealogy` that we already have in our `favorites` array)

```
// MORE CODE

componentDidMount = () => {
    console.log(this.props.session);

    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      console.log(favorites);
      const { _id } = this.props;
      const prevLiked =
              favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({
        liked: prevLiked,
        username,
      });
    }
  };

// MORE CODE
```

* We then set the liked state value to prevLiked
    - This will evaluate to true or false according to whether that genalogy with a given `_id` one that we already liked 

## Test it out
* Click and you will see button changes to opposite (Like or Liked)
* Problem our likes keep going up and up
* Click on Profiles link and likes are automatically updated
