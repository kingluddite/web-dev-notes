# Optimistic UI
* When we add a new `genealogy` we see that it was added to our database but not to our `getAllGenealogies` (for some reason we are not getting fresh data)

![no fresh data](https://i.imgur.com/mxaYzvp.png)

* But if you refresh the page you then get fresh data when the component reloads

## Why is this happing?
* It takes a certain amount of time to execute the `mutation`
* Then after the `mutation` we are going back to the home page
* Then when we get to the home page we are executing the `getAllGenealogies` query
* It is not able to everything we want in the time we are giving it
* The problem is the data is not updated automatically so we need to manually update our query using `this.updateCache`

`AddGenealogy.js`

```
// MORE CODE

updateCache = (cache, data) => {
  console.log(cache, data);
}

render() {
    const { firstName, lastName, description, username } = this.state;

    return (
      <Mutation
        mutation={ADD_GENEALOGY}
        variables={{ firstName, lastName, description, username }}
        update={this.updateCache}
      >

    // MORE CODE
```

## Test by adding one more Genealogy using the AddGenealogy page form
* You will see `InMemoryCache`
* Has an object called `data` with all the newly created fields within the genealogy

### What is the purpose of this?
* When we want to update a query manually we 
* We have access to all the data from the queries we performed so we will use this to manually add the current genealogy to it

### cache.readQuery()
* Reads a graphql query from the ROOT_QUERY id

```
// MORE CODE

import { ADD_RECIPE, GET_ALL_GENEALOGIES } from '../../queries';

// MORE CODE

updateCache = (cache, { data: { addGenealogy } }) => {
  // console.log(cache, data);
  const { getAllGenealogies } = cache.readQuery({
    query: GET_ALL_GENEALOGIES,
  });
  console.log('from cache', getAllGenealogies);
  console.log('from data', addGenealogy);
};
// MORE CODE
```

## Add one more genealogy
* `from cache` - not fresh data missing last document entered
* `from data` - has current document entered into db

## read then write query
* We performed c`ache.readQuery `and now we'll do `cache.writeQuery`

**note** This is usually the flow of things in **Optimistic UI**

```
// MORE CODE

updateCache = (cache, { data: { addGenealogy } }) => {
  // console.log(cache, data);
  const { getAllGenealogies } = cache.readQuery({
    query: GET_ALL_GENEALOGIES,
  });
  // console.log('from cache', getAllGenealogies);
  // console.log('from data', addGenealogy);

  cache.writeQuery({
    query: GET_ALL_GENEALOGIES,
    data: {
      getAllGenealogies: [addGenealogy, ...getAllGenealogies],
    },
  });
};

// MORE CODE
```

## Test
* Add a document
* It will redirect and now you will see it on the home page
* Open `getAllGenealogies` and it is loading all fresh data
* Optimistic UI is working!

