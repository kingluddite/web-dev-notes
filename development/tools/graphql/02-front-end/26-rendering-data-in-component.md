# Rendering data in a component
* Graphql attaches data to `data` property
* at first loading is true
* the next data object (with our books) loading is `false`

## show me the books

```
import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
class BookList extends Component {
  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return <li>{book.name}</li>;
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
```

![books are listed](https://i.imgur.com/xKFjxuq.png)

## missing key error
```
// MORE CODE
class BookList extends Component {
  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }
// MORE CODE
```

## Next - add books component
