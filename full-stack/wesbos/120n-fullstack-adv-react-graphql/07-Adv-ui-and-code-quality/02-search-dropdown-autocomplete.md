# Search Dropdown Autocomplete
## Adding Search feature to our site
* We will use a package called `downshift`
* [documentation/github](https://github.com/paypal/downshift)

## What is downshift
* Makes search simple, fast
* You can use your arrow keys to navigate the search hits
* Hit enter on the selected search item and route to it
* All of the functionality is part of downshift
* But none of the interface is part of downshift

### Problem
* All of our stuff so far has been build around page load
* But with Search we want it to fire the search results only after we type stuff in the search box

### Here are the styles we'll be using
`styles/Dropdown.js`

```
import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
```

* **note** We export all three as **named exports**

`Search.js`

```
import React, { Component } from 'react';
import Downshift from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';

// styles
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

class AutoComplete extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <input type="search" />
          <DropDown>
            <p>Items will go here</p>
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
```

### Import our Search into our Header
`Header.js`

```
// MORE CODE

// custom components
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search'; // don't forget to import it

// MORE CODE

        <div className="sub-bar">
          <Search />
        </div>
        <Cart />
      </StyledHeader>

// MORE CODE
```

* Ok, general layout is complete

## Let's dive into the Search server side code
`schema.graphql`

```
// MORE CODE

type Query {
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!

// MORE CODE
```

* **note** I had to update my code to match wb code

## Now we'll tap into `items()` in Search.js
* When in the `where` we can't say `title: ...` but we use `title_contains: ` instead

`Search.js`

```
// MORE CODE

// GraphQL
const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: {
      title_contains: $searchTerm,
      description_contains: $searchTerm
    })
  }
`

// MORE CODE
```

* But the above isn't great because it is only going to find the searchTerm in the title and description but if it is not in both, it will return an empty result set
* A better way would be to use OR and here is how you code this for prisma

### Using OR
`Search.js`

```
// MORE CODE

// GraphQL
const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] })
  }
`;

// MORE CODE
```

* Search the `prisma.graphql` for `ItemWhereInput`
    - And you will find:

`generated/prisma.graphql`

```
// MORE CODE

input ItemWhereInput {
  """Logical AND on all given filters."""
  AND: [ItemWhereInput!]

  """Logical OR on all given filters."""
  OR: [ItemWhereInput!]

// MORE CODE
```

* Above we see the Or takes an array of inputs
* Once again if you look through the 200+ lines of code in the query shows us the benefit of Prisma and the flexibility and power it gives us

## We only want to display to the user
* In the search result:
    - id
    - image
    - title

`Search.js`

* **note** Even though we are displaying the description we are not showing the description in the dropdown result set of our search

```
// MORE CODE

// GraphQL
const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      id
      image
      title
    }
  }
`;

// MORE CODE
```

### Handling the Search input field
* When somebody types in our search input we need to fire off an onChange event
    - And that needs to go to our DB and run this Query `SEARCH_ITEMS_QUERY`
    - But that brings up a problem - The only way we know how to expose a query to an input right now is if we were to take our Query component and wrap it around an `<input />`
        + But that would trigger the query on page load
        + And then every single time the page would load you would have this unnecessary Query that is firing off
        + And how do you refire that Query when somebody had changed something?
        + This is where we need direct access to our ApolloClient
            * Because on our ApolloClient we can manually fire off these Queries rather than using a render prop
            * And that is why we imported `ApolloConsumer`

## ApolloClient
* ApolloClient will expose the client to us so that we can manually run these Queries ourself
* Let's just get it up and running and log out the `client`

`Search.js`

```
// MORE CODE

class AutoComplete extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>{client => <input type="search" onChange={() => console.log(client)} />}</ApolloConsumer>
          <DropDown>
            <p>Items will go here</p>
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

// MORE CODE
```

## Take it for a test drive
* Type in the search input
* With each key we see in the CDTC the `ApolloClient`
* Inside the ApolloClient
    - We have access to:
        + The cache which gives us all of our data (that lives in our ApolloClient)
        + All the optimistic stuff we talked about earlier
        + But we are interested in the `query` function and the `mutate` function
        + Both will enable us to manually call mutations and queries rather than us having to use a render prop

`Search.js`

```
// MORE CODE

          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist();
                  this.onChange(e, client);
                }}
              />
            )}
          </ApolloConsumer>

// MORE CODE
```

* Above we now take the client and pass it to a separate function we will create now

### the onChange function
* We'll create a new `onChange` function
* We'll log out inside it
* Add another log to show that we passed the `client` to it

`Search.js`

```
// MORE CODE

class AutoComplete extends Component {
  onChange = (e, client) => {
    console.log('I am inside the onchange handler');
    console.log(client);
  };

  render() {

// MORE CODE
```

* Now open new browser
* Refresh it
* Open the CDTC
* Type in search input
* And you will see 2 log results appear with every key press in the search input
* We also see that we successfully passed the Apollo `client`

## Test out a query
* We have the Apollo client so let's tap into it
* We need to use async await
* We will pass our search query and the value typed in that we capture with `e.target.value` and set it equal to the searchTerm

`Search.js`

```
// MORE CODE

class AutoComplete extends Component {
  onChange = async (e, client) => {
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    console.log(res);
  };

// MORE CODE
```

### Try it out in the browser
* Type a key and examine the data.items to see what search results you got back

## What do we do with this list of items?
* We need to put them into `state` so we can in turn, loop through them and put them inside of our DropDown and display them to the users

## Set our state
* Bummer - Since we don't have the convenience of our Query or Mutation components we will have to handle `loading` on our own
    - This is how we had to handle `loading` before Apollo so it's kind of the old school technique

`Search.js`

```
// MORE CODE

class AutoComplete extends Component {
  state = {
    items: [],
    loading: false,
  };

// MORE CODE
```

### Now we need to turn loading on
* We will set loading to `true` when the user types in the input field
* Then when we get the response `res` we need to put those items into `state`

`Search.js`

```
// MORE CODE

class AutoComplete extends Component {
  state = {
    items: [],
    loading: false,
  };

  onChange = async (e, client) => {
    // Manually query apollo client
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({ items: res.data.items, loading: false });
  };

// MORE CODE
```

* Test in browser
* User RDT and search for AutoComplete (refresh browser if necessary)
* At first the state should show an empty array and loading is false
* Type a word from one of your products
* Watch the items in state populate and false turn to true and then back to false

## Don't DeDOS (Denial of Service) your own website
* With one word in your search `boat` you are making 4 requests to your server
* This is not good and this is why we will use `debounce`

### debounce (from lodash)
* It will take all the events that are fired within 350ms and only after that 350ms has passed will it fire one event
* This will make sure we are not hitting the server with every keyup
* Very easy to use - just wrap your onChange inside a `debounce()`

`Search.js`

```
// MORE CODE

  onChange = debounce(async (e, client) => {
    console.log('Searching');
    // Manually query apollo client
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({ items: res.data.items, loading: false });
  }, 350);

// MORE CODE
```

* We pass `350` and that is how many milliseconds we want to wait before it fires
* You'll see we significantly cut down on our hits to the server
* We'll log out `Searching` to see how often it fires if we type a lot

## Display our items from the search in our DropDown

`Search.js`

```
// MORE CODE

          <DropDown>
            {this.state.items.map(item => (
              <DropDownItem>
                <img width="50" src={item.image} alt={item.title} />
                {item.title}
              </DropDownItem>
            ))}
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;

// MORE CODE
```

* Type and watch the search bar populate
* Fix the key error

```
// MORE CODE

          <DropDown>
            {this.state.items.map(item => (
              <DropDownItem key={item.id}>

// MORE CODE
```

* Key error gone!

## Next - Using the Downshift library
* It will make our DropDown Search very accessible
