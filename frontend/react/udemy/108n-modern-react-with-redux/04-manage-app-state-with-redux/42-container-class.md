# Implementation of Container Class

Rename `app.js` to `App.js`

`App.js`

```
import React, { Component } from 'react';

import BookList from '../containers/BookList';

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
      </div>
    );
  }
}
```

* We import `BookList`
* We instantiate `BookList` and render it to the page

## Make the connection
* Now we need to make sure `BookList` has a connection from Redux to get `state` into the `BookList` Component

### End goal
* Our Application `state` has a `books` property (list of books)
* And we want to get that list of books to show up inside of our `BookList` Component (Container)

## Let's forge that connection
* We will import and use the Library `React-Redux`

```js
import React, { Component } from 'react';
import { connect } from 'react-redux'; // add this line
```

## Let's make use of `connect()`
* We will not **export** this class anymore as the `default` so change the code from this:

`export default class BookList extends Component {`

* To this:

`class BookList extends Component {`

## Now the fun begins
* Add this function to the bottom of `BookList.js`

```js
function mapStateToProps(state) {
  
}
```

* The purpose of this function is to take the Application `state` as an argument
* **note** Our `state` contains:
    - The array of books
    - And the active book

```js
function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
}
```

* We usually will return an object from `mapStateToProps()`

```js
function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    
  }
}
```

* Whatever is contained within this object is going to be set equal to `this.props` of our Component (BookList)

## Example 
* `BookList.js`

```
// MORE CODE

  render() {
    console.log(this.props.asdf); // -> '123'
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    asdf: '123'
  };
}
```

![our diagram of our state](https://i.imgur.com/huXLtd3.png)

```js
function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    books: state.books
  };
}
```

* Above is our connection between Redux and our Component, (our Container)

## Now we need to make use of our `connect` function
* The connect function says, take this Component, take this `mapStateToProps()` and return a `Container` and that Container is what we want to export from this file as well (that's why we deleted the export default above)
* Whenever we make a Container file we don't want to export the plain "dumb Component", we want to export the "Smart Component" Container

`export default connect(mapStateToProps)(BookList);`

## Review
1. We imported our connect function from React Redux Library
    * React-Redux is the glue between React and Redux
    * They are completely different Libraries
    * They are not developed in tandem
    * It is only through React-Redux that we get any kind of merging between the two of them
    * React-Redux makes `connect()` function available
2. `connect(function)(Component)`
  * Takes a function and a Component and produces a `Container`
  * The `Container` is a Component that is aware of the `state` that is contained by Redux
3. The `mapStateToProps()` function is important and key here
    * The first argument is the `state` and this function return an **object**
    * Whatever object is returned will be available to our Component as `this.props`

* To repeat one more time The following function is the glue between React and Redux

```js
function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    books: state.books
  };
}
```

* We need access to `this.props.books` within our Component
* So we return so we return an object with a key of `books` and a value of `state.books`
* Because our `BooksReducer` is returning the property (our array of objects (which is an array of book titles)

## Two more important notes
### First important note
* Whenever our Application `state` changes
* We are loading a list of books from some remote server
* Or our user clicks on something and that changes the list of books
* Or for whatever reason that our `state` changes
* This Container (BookList) will instantly re-render with a new list of books

### Second Import note
* Whenever the Application `state` changes the object in the `state` function, will be assigned as `props` to the Component (in our case it will end up as `this.props.books`)

## View in browser
* Save and refresh the browser and you will see this

![view in browser](https://i.imgur.com/AnpCLFb.png)

### Finished Code
`BookList.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => {
      return (
        <li key={book.title} className="list-group-item">
          {book.title}
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul className="list-group-col-sm-4">{this.renderList()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // whatever is returned will show up as props
  // inside BookList
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps)(BookList);
```

`App.js`

```
import React, { Component } from 'react';

import BookList from '../containers/BookList';

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
      </div>
    );
  }
}
```
