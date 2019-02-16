# Create `seachCologne` query on Backend

## Create new branch
`$ git checkout -b search`

* Add [3 distinct colognes](http://colognebuys.com/cologne/guide-to-colognes/)
* We are going to create a search so we need something to search

## We will use the Apollo's Query component to accomplish this
* Last time we were using Mutation also from the react-apollo package

## Create a new feature branch
`$ git checkout -b search`

* We will have a simple search box
* It will take a string and we'll name that variable `searchTerm`
* We start server side (aka backend)
* We'll add our GraphQL schema

`schema.js`

```
// MORE CODE

type Query {
  getAllColognes: [Cologne]
  getCologne(_id: ObjectID!): Cologne
  searchColognes(searchTerm: String): [Cologne]

  getCurrentUser: User
}

// MORE CODE
```

* **notes**
  - Our `searchTerm` is optional
  - It will return an array of colognes `[Cologne]`

## Do we have a searchTerm or not?

`resolvers.js`

* If we do, do the search
* If we don't show all the colognes

```
// MORE CODE

searchColognes: async (root, { searchTerm }, { Cologne }) => {
  // do we have a searchTerm?
  if (searchTerm) {
    // do the search
  } else {
    // just return all the colognes
  }
},

getCurrentUser: async (root, args, { currentUser, 

    // MORE CODE
```

### Let's work on the else logic
* If we don't have a `searchTerm`, use async await to pull all colognes out of our colognes mongodb collection
* We will sort first by `likes` and second by `createdDate`

```
// MORE CODE

searchColognes: async (root, { searchTerm }, { Cologne }) => {
  if (searchTerm) {
    // search
  } else {
    const colognes = await Cologne.find().sort({
      likes: 'desc',
      createdDate: 'desc',
    });
    return colognes;
  }
},

// user

getCurrentUser: async (root, args, { currentUser, User }) => {

// MORE CODE
```

## Client side
* Now we can test our query in GraphQL GUI

`http://localhost:4444/graphql`

* Expand `Schemas` and you should now see `searchColognes`
* Click on it for documentation

```
query($searchTerm: String) {
  searchColognes(searchTerm: $searchTerm) {
    _id
    scentName
    scentBrand
    likes
  }
}
```

* We don't provide a `searchTerm` but it is not required so we don't get an error
* And based on our logic if we don't provide a `searchTerm`, it will return all colognes
* And that's what our query is returning

## Move to the client side
### Add our export to point to our query
* We'll paste our GraphQL GUI code into this:

`queries/index.js`

```
// MORE CODE

export const SEARCH_COLOGNES = gql`
  query($searchTerm: String) {
  searchColognes(searchTerm: $searchTerm) {
    _id
    scentName
    scentBrand
    likes
  }
}
`;

// Cologne Mutations

export const ADD_COLOGNE = gql`

// MORE CODE
```

### Use this query in our Search component
* We need to import our Query from `react-apollo`
* We need to import our custom query `SEARCH_COLOGNES`

`Search.js`

```
import React, { Component } from 'react';

// GraphQL
import { Query } from 'react-apollo';
import { SEARCH_COLOGNES } from '../../queries';

class Search extends Component {
  render() {
    return (
      <Query query={SEARCH_COLOGNES} variables={{ searchTerm}}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          console.log(data);

          return (
            <div className="App">
              <input type="search" placeholder="Search" />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Search;
```

* We get an error that `searchTerm` is not defined so we need to give it a default value of an empty string `''`

`Search.js`

```
// MORE CODE

class Search extends Component {
  render() {
    return (
      <Query query={SEARCH_COLOGNES} variables={{ searchTerm: '' }}>

// MORE CODE
```

## Test it out
* View the search page 

`http://localhost:3000/search`
* Refresh if you see an error
* You should see `searchColognes` returning all our colognes inside the console

![console shows all colognes](https://i.imgur.com/wOAchdN.png)

## Update our UI
* Output and show colognes we are getting back
* We'll just map through them and output them in an unordered list
* We'll make each of them links to take us to the `ColognePage`

`Search.js`

```
// MORE CODE

const Search = () => {
  return (
    <Query query={SEARCH_COLOGNES} variables={{ searchTerm: '' }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

        return (
          <div className="App">
            <input type="search" name="search" id="search" />
            <ul>
              {data.searchColognes.map(Cologne => (
                <li key={Cologne._id}>
                  <h4>
                    {Cologne.firstName} {Cologne.lastName}
                  </h4>
                  <p>{Cologne.likes}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
    // MORE CODE
```

## Test in browser
* You will see the names and the likes under the names on the search page

## Test
* The names are now links
* Click on a name and you'll be taken to the single `ColognePage`

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Create search query background`

## Push to github
`$ git push origin search`

## Next - Indexing and Searching on input change
