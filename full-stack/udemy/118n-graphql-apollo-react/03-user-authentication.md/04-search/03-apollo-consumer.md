# Apollo Consumer

## Use ApolloConsumer instead of Query
* We now need to **perform our query on demand**
* We will need to swap out our `Query` component with the `ApolloConsumer` component
* `ApolloConsumer` allows us to also perform a query but we are using it instead of `Query` because `ApolloConsumer` allows us to perform the query in response to a given **action**
    - We will pass in `client` instead of `data`
* We will need to use `state`
  - No problem since our component is already a CBC
    + If it was a SBC we would have to convert it now

`Search.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// GraphQL
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_COLOGNES } from '../../queries';

class Search extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search for Colognes"
                name="search"
                id="search"
                onChange={async event => {
                  event.persist();
                  const { data } = await client.query({
                    query: SEARCH_COLOGNES,
                    variables: { searchTerm: event.target.value },
                  });
                  this.handleChange(data);
                }}
              />
              <ul>
                {data.searchColognes.map(cologne => {
                  return (
                    <li key={cologne._id}>
                      <Link to={`/cologne/${cologne._id}`}>
                        <h4>Scent Name: {cologne.scentName}</h4>
                        <p>Likes: {cologne.likes}</p>
                      </Link>
                    </li>
                  );
                })}
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
* We need to swap `data.searchColognes` with an empty array `[]`

`Search.js`

* Before

```
// MORE CODE
<ul>
  {data.searchColognes.map(cologne => (
// MORE CODE
```

* After

```
// MORE CODE
<ul>
  {[].map(cologne => (
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
* Use the home page to see your list of colognes
* Then jump to the search page
* Type in some letters from the name of one of your colognes
* You should see a result set appear from `searchColognes`

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

{searchResults.map(Cologne => (

// MORE CODE
```

* We'll destructure `data` and pull `searchColognes off of it`
* We replace empty array with `searchResults` (searchResults.map())
* We will dynamically change that value in our `state` whenever new search results come in

## Destructure our searchColognes from our `data`
* So we console logged our `data` object we are passing to our handleChange event handler
* So we can just destructure `searchColognes` and set it as the value of our state's `searchResults` array

`Search.js`

```
// MORE CODE

handleChange = ({ searchColognes }) => {
  this.setState({
    searchResults: searchColognes,
  });
};

render() {

// MORE CODE
```

## Test it out
* You can search and it will appear below input if there is a match
* Clear input and all colognes will appear

## Additional Resources
### Why did we use `event.persist()` in earlier code?
* We use `event.persist()` because of events in React
* [This article](https://www.duncanleung.com/blog/2017-08-14-fixing-react-warnings-synthetic-events-in-setstate/) explains it in greater detail
* If you use `event.persist()` don't you'll see an error like this:

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
