# Optimistic UI
* When we add a new `cologne` we see that it was added to our database but not to our `getAllColognes` (for some reason we are not getting fresh data)

![no fresh data](https://i.imgur.com/mxaYzvp.png)

* But if you refresh the page you then get fresh data when the component reloads

## Why is this happening?
* It takes a certain amount of time to execute the `mutation`
* Then after the `mutation` we are going back to the home page
* Then when we get to the home page we are executing the `getAllColognes` query
* It is not able to do everything we want in the time we are giving it
* The problem is the data is not updated automatically so we need to manually update our query using `this.updateCache`

`Addcologne.js`

```
// MORE CODE

updateCache = (cache, data) => {
  console.log(cache, data);
}

render() {
    const { firstName, lastName, description, username } = this.state;

    return (
      <Mutation
        mutation={ADD_cologne}
        variables={{ firstName, lastName, description, username }}
        update={this.updateCache}
      >

    // MORE CODE
```

## Test by adding one more cologne using the Addcologne page form
* You will see `InMemoryCache`
* Has an object called `data` with all the **NEWLY** created fields within the cologne

### What is the purpose of this?
* When we want to update a query manually we 
* We have access to all the data from the queries we performed so we will use this to manually add the current cologne to it

### cache.readQuery()
* Reads a graphql query from the `ROOT_QUERY` **id**

```
// MORE CODE

import { ADD_RECIPE, GET_ALL_Colognes } from '../../queries';

// MORE CODE

updateCache = (cache, { data: { addcologne } }) => {
  // console.log(cache, data);
  const { getAllColognes } = cache.readQuery({
    query: GET_ALL_Colognes,
  });
  console.log('from cache', getAllColognes);
  console.log('from data', addcologne);
};
// MORE CODE
```

## Add one more cologne
* `from cache` - not fresh data missing last document entered
* `from data` - has current document entered into db

## read then write query
* We performed `cache.readQuery` and now we'll do `cache.writeQuery`

**note** This is usually the flow of things in **Optimistic UI**

```
// MORE CODE

updateCache = (cache, { data: { addcologne } }) => {
  // console.log(cache, data);
  const { getAllColognes } = cache.readQuery({
    query: GET_ALL_Colognes,
  });
  // console.log('from cache', getAllColognes);
  // console.log('from data', addcologne);

  cache.writeQuery({
    query: GET_ALL_Colognes,
    data: {
      getAllColognes: [addcologne, ...getAllColognes],
    },
  });
};

// MORE CODE
```

## Test - Our data is now refreshed when we get to the home page
* Add a document
* It will redirect and now you will see it on the home page
* Open `getAllColognes` and it is loading all fresh data
* Optimistic UI is working!

