# Book Details
`queries.js`

```
export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
```

`components/BookDetails.js`

```
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="book-details">
        <p>Output book details here</p>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookDetails);
```

## Next - add links that will pass the id so we can show the details page
