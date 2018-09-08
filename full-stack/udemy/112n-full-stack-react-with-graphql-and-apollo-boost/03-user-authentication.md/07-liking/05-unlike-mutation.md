# Unlike Mutation
* Optimistic UI

## Add update to Mutation

```
return (
      <Mutation
        mutation={LIKE_GENEALOGY}
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
    - When we Like a genealogy it will be provided to our parent component
    - So the query for that will be the getGenealogy query

## Confirm is this is correct
* Open up `GenealogyPage.js` and see where we are using `GET_GENEALOGY`

```
// MORE CODE

const { _id } = match.params;
 // console.log(match.params._id);
 return (
   <Query query={GET_GENEALOGY} variables={{ _id }}>

// MORE CODE
```

## Import GET_GENEALOGY
`LikeGenealogy.js`

```
// queries
import { LIKE_GENEALOGY, GET_GENEALOGY } from '../../queries'
```

`LikeGenealogy.js`

```
// MORE CODE

updateLike = (cache, { data: { likeGenealogy } }) => {
    const { _id } = this.props;
    const { getGenealogy } = cache.readQuery({
      query: GET_GENEALOGY,
      variables: { _id },
    });

    cache.writeQuery({
      query: GET_GENEALOGY,
      variables: { _id },
      data: {
        getGenealogy: { ...getGenealogy, likes: likeGenealogy.likes + 1 },
      },
    });

// MORE CODE
```

## Test it out
* We click Like button and it is supposed to only add one Like
* But it is not working and it keeps adding 1 instead of just staying at 1

## Problem - you keep clicking and it keeps going up
* We need to delete one like and remove a like
* So it will either be liked or not liked
* We'll take care of that next
