# Optimistic UI
## Remove console.log()
**note** Easy way to find all console.log() lines is to navigate to the `client/src` folder in the terminal and use `grep()` to search for them like this:

`$ grep -r -i "console.log(" .`

* After grep() I found all the console.log() statements: 
  - App.js
  - Signin.js
  - Signup.js
  - ColognePage.js

* When we add a new `cologne` we see that it was added to our database but not to our `getAllColognes` (for some reason we are not getting fresh data)

![no fresh data](https://i.imgur.com/mxaYzvp.png)

* But if you refresh the page you then get fresh `data` when the component reloads

## Why is this happening?
* It takes a certain amount of time to execute the `mutation`
* Then after the `mutation` we are going back to the home page
* Then when we get to the home page we are executing the `getAllColognes` query
* It is not able to do everything we want in the time we are giving it
* The problem is the data is not updated automatically so we need to manually update our query using `this.updateCache`

`Addcologne.js`

* First we add the update attribute to our mutation
* And we set it to: `update={this.updateCache}`

```
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

* Now we add that eventHandler `updateCache`

```
// MORE CODE

updateCache = (cache, data) => {
  console.log(cache, data);
};

render() {
  const { scentName, scentPrice, description, username } = this.state;

  return (
    <div className="App">
      <h2 className="App">Add Cologne</h2>
      <Mutation
        mutation={ADD_COLOGNE}
        variables={{ scentName, scentPrice, description, username }}
        update={this.updateCache}
      >

// MORE CODE
```

## Test by adding one more cologne using the AddCologne form
* You will see `InMemoryCache`
* Has an object called `data` with all the **NEWLY** created fields within the cologne

### What is the purpose of this?
* When we want to update a query manually:
    - We have access to all the `data` from the queries we performed so we will use this to manually add the current cologne to it (the one we just added)

### cache.readQuery()
* Reads a GraphQL query from the `ROOT_QUERY` **id**
* After opening `InMemoryCache` there is a `data` object that has a `data` object inside it that has a `$ROOT_MUTATION.addCologne()` inside of it
* We can pull it out and see that using:

```
// MORE CODE

updateCache = (cache, { data: { addCologne } }) => {
  console.log(cache, addCologne);
};

// MORE CODE
```

* Use the AddCologne form to add a form and you will see we are outputting the cologne added and all it's properties

![cologne added](https://i.imgur.com/s82kuhq.png)

### Grab all colognes and cologne added
* We want to output both of them and we can do this by using `readQuery()`
* We will log them out just to show we have their data

```

// MORE CODE

updateCache = (cache, { data: { addCologne } }) => {
  // console.log(cache, data);
  const { getAllColognes } = cache.readQuery({
    query: GET_ALL_COLOGNES,
  });
  console.log('from cache', getAllColognes);
  console.log('from data', addCologne);
};
// MORE CODE
```

* Our linter will let us know that GET_ALL_COLOGNES is not defined
* We need to import it

`AddCologne.js`

```

// MORE CODE

import { ADD_RECIPE, GET_ALL_COLOGNES } from '../../queries'; // we add it here

// MORE CODE
```

## Add one more cologne
* `from cache` - not fresh data missing last document entered
* `from data` - has current document entered into db

### Task: Combine the two... But how?
* We need a way of grabbing our fresh `from data` and add it to our stale `from cache`

## Read then write query
* We performed `cache.readQuery` and now we'll do `cache.writeQuery`

**note** This is usually the "flow of things" in **Optimistic UI**

```
// MORE CODE

updateCache = (cache, { data: { addCologne } }) => {
  // console.log(cache, data);
  const { getAllColognes } = cache.readQuery({
    query: GET_ALL_COLOGNES,
  });
  // console.log('from cache', getAllColognes);
  // console.log('from data', addCologne);

  cache.writeQuery({
    query: GET_ALL_COLOGNES,
    data: {
      getAllColognes: [addCologne, ...getAllColognes],
    },
  });
};

// MORE CODE
```

### Clean up our colognes collection again (Delete all colognes using mLab)
* We added a lot of junk data so let's just clean it up
* Sign out and do a fresh log in
* Add a cologne

#### Observer what happened
* Our cologne was added and we were successful redirect to the home page
* But we did get a warning about a `Missing field _id`

![missing field _id](https://i.imgur.com/mrLmzfW.png)

##### Let's fix that now
* I want to show you how to troubleshoot this error as it is not easy to find
* Use the Chrome network tab and you will need to click on several GraphQL names and look at Preview
  - You are trying to see a data that expands to show you `addCologne`
  - That is the method we fired when we submitted our form on AddCologne
  - If you look inside by expanding it you will not see `_id`

![no _id](https://i.imgur.com/AHOgLbz.png)

* So this is why you are getting that warning
* It is easy to fix just open `queries/index.js` and change this:

`queries/index.js`

```
// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
`;
```

* To this:

```
// Cologne Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      _id
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
`;
```

* Look at both fragments of code and you'll see I added `_id` as a field we want back after added the cologne
* Add another cologne
* You no longer get the warning!

## Test Again - Our data is now refreshed when we get to the home page
* Add a log to show `getAllColognes`

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Five Star Colognes</h1>
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

// MORE CODE
```

1. Add a new cologne
2. After adding you will be `redirected` to the home page
3. Look at console
4. Open `getAllColognes` and it is loading all fresh data
5. Congratulate yourself - Optimistic UI is working!

## Additional Resources
* [More about Optimistic UI](https://blog.bitsrc.io/building-an-optimistic-user-interface-in-react-b943656e75e3)
* [Apollo explains Optimistic UI](https://www.apollographql.com/docs/react/features/optimistic-ui.html)

