# Indexing and performing search query on input change event
## Add an index
`models/Genealogy.js`

```
// MORE CODE

GenealogySchema.index({
  '$**': 'text',
});

module.exports = mongoose.model('Genealogy', GenealogySchema);
```

* We do this in our models
* We specify which field we will be indexing
* We want to search on every field in the genealogy `$**` and set it to text
* Then we find all based on `text` provided inside the input
* Then we'll add a meta field and we'll use that to sort the search results
    - This will help us find the most appropriate term we are searching for

`resolvers.js`

```
// MORE CODE

searchGenealogies: async (root, { searchTerm }, { Genealogy }) => {
    if (searchTerm) {
      // search
      const searchResults = await Genealogy.find(
        {
          $text: { $search: searchTerm },
        },
        {
          score: { $meta: 'textScore' },
        }
      ).sort({
        score: { $meta: 'textScore' },
      });
      return searchResults;
    } else {
      const genealogies = await Genealogy.find().sort({
        likes: 'desc',
        createdDate: 'desc',
      });
      return genealogies;
    }
  },

// MORE CODE
```

## Use ApolloConsumer instead of Query
* We now need to **perform our query on demand**
* We will need to swap our `Query` component out with the `ApolloConsumer` component
* `ApolloConsumer` allows us to also perform a query but we are using it instead of `Query` because `ApolloConsumer` allows us to perform the query in response to a given **action**
    - We will pass in `client` instead of `data`
* Convert to a class based component
    - We will need to use `state`

`Search.js`

```
import React, { Component } from 'react';
// react router
import { Link } from 'react-router-dom';

// apollo
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_GENEALOGIES } from '../../queries';

export class Search extends Component {
  handleChange = data => {
    console.log(data);
  };

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search for Genealogies"
                name="search"
                id="search"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_GENEALOGIES,
                    variables: { searchTerm: event.target.value },
                  });
                  this.handleChange(data);
                }}
              />
              <ul>
                {data.searchGenealogies.map(genealogy => (
                  <li key={genealogy._id}>
                    <Link to={`/genealogy/${genealogy._id}`}>
                      <h4>{genealogy.title}</h4>
                    </Link>
                    <p>{genealogy.likes}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;

```

## Test
* We have an `error`
* We need to swap `data.searchGenealogies` with an empty array `[]`

`Search.js`

* Before

```
// MORE CODE
<ul>
  {data.searchGenealogies.map(genealogy => (
// MORE CODE
```

* After

```
// MORE CODE
<ul>
  {[].map(genealogy => (
// MORE CODE
```

## Add our event handler for all input changes
`Search.js`

```
// MORE CODE
class Search extends Component {
  handleChange = data => {
    console.log(data);
  };

  // MORE CODE
```

# Test in browser
* Use the home page to see your list of genealogies
* Then jump to the search page
* Type in some letters from the name of one of your genealogies
* You should see a result set appear from `searchGenealogies`

## Create a state object
* Destructure to pull from the `state` object
* Set our search results to an empty array 

`Search.js`

* We are going to store all our search results in an array inside our `state`

```
// MORE CODE

class Search extends Component {
  state = {
    searchResults: [],
  };

  // MORE CODE
  render() {
      const { searchResults } = this.state;

// MORE CODE

{searchResults.map(genealogy => (

// MORE CODE
```

* We'll destructure `data` and pull `searchGenealogies off of it`
* We replace empty array with `searchResults` (searchResults.map)
* We will dynamically change that value in our `state` whenever new search results come in

## Final Search code
`Search.js`

```
import React, { Component } from 'react';

import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import { SEARCH_GENEALOGIES } from '../../queries';

class Search extends Component {
  state = {
    searchResults: [],
  };

  handleChange = ({ searchGenealogies }) => {
    this.setState({
      searchResults: searchGenealogies,
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for Genealogies"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_GENEALOGIES,
                    variables: { searchTerm: event.target.value },
                  });
                  this.handleChange(data);
                }}
              />
              <ul>
                {searchResults.map(genealogy => (
                  <li key={genealogy._id}>
                    <Link to={`/genealogy/${genealogy._id}`}>
                      <h4>
                        {genealogy.firstName} {genealogy.lastName}
                      </h4>
                    </Link>
                    <p>Likes: {genealogy.likes}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}
export default Search;
```

## Test it out
* You can search and it will appear below input if there is a match
* Clear input and all search results disappear

## Resources
### Why did we use `event.persist()` in earlier code?
* We use `event.persist` because of events in React
* [This article](https://www.duncanleung.com/blog/2017-08-14-fixing-react-warnings-synthetic-events-in-setstate/) explains it in greater detail
* If you don't you'll see an error like this:

```
Uncaught TypeError: Cannot read property 'value' of null

Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property 'target' on a released/nullified synthetic event. This is set to null. If you must keep the original synthetic event around, use event.persist().
```

* **note** It turns out React has it's own event system for event handling, using `SyntheticEvent`
    - React's `SyntheticEvent` wraps around the browser's native event to provide cross-browser compatibility support
    - Instead of passing in the native event to React event handlers, an instance of this `SyntheticEvent` is passed in
    - The console warning above occurs because React re-uses the `SyntheticEvent` object for performance reasons, by pooling the synthetic events all together
    - Thus, all the properties on `event.target` are **nullified** after an event callback is invoked
    - Essentially, `SyntheticEvent` **cannot be used asynchronously**, because the event will no longer exist after the event callback has been invoked
    - This is a problem, knowing that React's `setState()` behavior is **asynchronous**

## Solution to problem
* Using `event.target` to construct a new `state` is a common pattern, and React has provided a solution with `event.persist()`
* Calling `event.persist()` on the event removes the synthetic event from the pool and allows references to the event to be retained asynchronously
