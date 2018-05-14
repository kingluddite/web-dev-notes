# Book List Component
`src/components/BookList.js`

* Create the above file and inside a new `components` directory

`BookList.js`

```
import React, { Component } from 'react';

class BookList extends Component {
  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book</li>
        </ul>
      </div>
    );
  }
}

export default BookList;
```

`App.js`

```
import React, { Component } from 'react';

// components
import BookList from './components/BookList';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
      </div>
    );
  }
}

export default App;
```

## Next - setup Apollo
