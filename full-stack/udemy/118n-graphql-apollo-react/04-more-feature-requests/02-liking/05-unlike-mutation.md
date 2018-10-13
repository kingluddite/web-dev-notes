# Unlike Mutation
* Now we have to work on the unlike logic
* Our data isn't updating everywhere after we add it so we will also add Optimistic UI

## Add update to Mutation
* We'll tap into the `update` attribute of `Mutation` and create an event handler `updateLike` to run the readQuery and writeQuery for our cache to implement `Optimistic UI`

`LikeCologne.js`

```
return (
  <Mutation
    mutation={LIKE_COLOGNE}
    variables={{ _id, username }}
    update={this.updateLike}
  >
```

## updateLike handler

```
updateLike = (cache, data) => {
  const {} = cache.readQuery({ query: ??? });
};
```

* We need to figure out what query we need to update
    - When we **like** a `Cologne` it will be provided to our parent component
    - So the query for that will be the `getCologne` query

## Confirm is this is correct
* Open up `ColognePage.js` and see where we are using `GET_COLOGNE`

```
// MORE CODE

const { _id } = match.params;
 // console.log(match.params._id);
 return (
   <Query query={GET_COLOGNE} variables={{ _id }}>

// MORE CODE
```

## Import GET_COLOGNE
`LikeCologne.js`

```
// queries
import { LIKE_COLOGNE, GET_COLOGNE } from '../../queries'
```

`LikeCologne.js`

```
// MORE CODE

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

// MORE CODE
```

## Test it out
* We click `like` button and it is supposed to only add one `like`
* But it is not working and it keeps adding 1 instead of just staying at 1

## Problem - you keep clicking and it keeps going up
* We need to delete one like and remove a like
* So it will either be liked or not liked
* We'll take care of that next

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add unlike`

## Push to github
`$ git push origin like`


## Next - Unlike Optimistic UI
