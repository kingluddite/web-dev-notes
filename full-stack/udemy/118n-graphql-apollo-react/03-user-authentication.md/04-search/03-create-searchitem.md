# Create SearchItem
* This will be a dedicated component for each item we iterate over

`SearchItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ _id, firstName, lastName, likes }) => {
  return (
    <li>
      <Link to={`/genealogy/${_id}`}>
        <h4>
          {firstName} {lastName}
        </h4>
      </Link>
      <p>Likes: {likes}</p>
    </li>
  );
};

export default SearchItem;
```

`Search`

```
import React, { Component } from 'react';

import { ApolloConsumer } from 'react-apollo';

import { SEARCH_GENEALOGIES } from '../../queries';

// components
import SearchItem from './SearchItem';

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
                  <SearchItem key={genealogy._id} {...genealogy} />
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
