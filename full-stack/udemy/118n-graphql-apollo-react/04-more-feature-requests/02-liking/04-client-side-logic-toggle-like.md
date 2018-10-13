# Develop Client-side Logic to Properly Toggle Like
* When we go to our profile the number of likes is currently not added to our favorites
* We will fix that now

## refetch our likes
* Add async / await

`LikeCologne.js`

```
// MORE CODE

class LikeCologne extends Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
  };

  // MORE CODE

  handleLike = likeCologne => {
    const { refetch } = this.props;
    // pass control of likeCologne to handleLike
    likeCologne().then(async ({ data }) => {
      console.log(data);
      await refetch();
    });
  };

  render() {


// MORE CODE
```

## Change onClick to handleClick
* We do this so we can create a new function that will handle: 
    - **liking** a `cologne`
    - **unliking** a `cologne`

* Before we were using `this.handleLike(likeCologne)`

` <button onClick={() => this.handleLike(likecologne)}`

* Now we are going to write a new function called `handleClick`

` <button onClick={() => this.handleClick(likeCologne)}`

## Add `state` of liked
* Initially set it to `false`

```
// MORE CODE

class LikeCologne extends Component {

  // MORE CODE

  state = {
    liked: false, // add this line
    username: '',
  };

  // MORE CODE
```

## Pass `setState` a function
* We will pass `setState` a function and give it an argument of `prevState`
* And we'll update the `liked` **state** based on the **previous** `state`
* And if we `like` it we want it to be the opposite that it previously was

`LikeCologne.js`

```
// MORE CODE

handleClick = likeCologne => {
  this.setState(
    prevState => ({
      liked: !prevState.liked,
    }),
    () => this.handleLike(likeCologne)
  )
}

render() {

// MORE CODE
```

* Once we update the `state` we can implement a **callback** function
* This **callback** function will be called everytime after we update the `state` in a `syncronous` fashion (_usually `setState()` operates asynchronously and this allows it to work syncronously_)

## Add some logic
* Use logic to determine whether to fire off the like `cologne` mutation based on the `state`

```
// MORE CODE

handleLike = likeCologne => {
  const { refetch } = this.props;
  const { liked } = this.state;

  if (liked) {
    likeCologne().then(async ({ data }) => {
      console.log(data);
      await refetch();
    });
  } else {
    // unlike cologne mutation
    console.log('unlike');
  }
  // pass control of likeCologne to handleLike
};

// MORE CODE
```

## Dynamically change text to `Liked` or `Like'`
* Change the text on the button dynamically

```
// MORE CODE

return (
  <Fragment>
    <Mutation mutation={LIKE_COLOGNE} variables={{ username, _id }}>
      {likeCologne =>
        username && (
          <button
            onClick={() => this.handleLike(likeCologne)}
            type="button"
          >
            {liked ? 'Unlike' : 'Like'}
          </button>
        )
      }
    </Mutation>
  </Fragment>
);

// MORE CODE
```

## Let's also log out the favorites

`LikeCologne.js`

```
// MORE CODE

componentDidMount = () => {
  const { session } = this.props;
  console.log(session);

  if (session.getCurrentUser) {
    const { username, favorites } = session.getCurrentUser;
    console.log(favorites);
    this.setState({
      username,
    });
  }
};

// MORE CODE
```

## Prevent a user from liking a variable twice
* Use `findIndex()` to go into an array
    - It returns a `1` or `-1`
    - So we need to compare it to a `-1`
* For every `cologne` within the `favorites` array and we'll find where every `favorite._id === _id` (_aka we are trying to determine if the cologne we are trying to like is `cologne` that we already have in our `favorites` array_)

```
// MORE CODE

componentDidMount = () => {
  const { session } = this.props;
  console.log(session);

  if (session.getCurrentUser) {
    const { username, favorites } = session.getCurrentUser;
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

* We then set the `liked` state value to `prevLiked`
    - This will evaluate to `true` or `false` according to whether that cologne with a given `_id` is one that we already liked 

## Test it out
* Click and you will see button changes to opposite (Like or Liked)

### Problems
* Our likes keep going up and up

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add client side toggle like`

## Push to github
`$ git push origin like`
