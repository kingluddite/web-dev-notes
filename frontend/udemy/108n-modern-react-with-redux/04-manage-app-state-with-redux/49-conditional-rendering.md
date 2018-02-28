# Conditional Rendering
* We just made a `Container` out of the `BookDetail` Component
* So we can now make use of `this.props.book` inside of the `Container` because we mapped our Application `state` to the `props` of `BookDetail`

### Troubleshoot time
* Just spent 2 hours banging my head against the board
* First thing is if we don't need a class component we should use a stateless functional component
  - It's smaller and loads faster
  - So make sure we are using one for BookDetail
  - I have eslint setup to generate errors if we don't do this correctly and if you don't fix this your app will break

`BookDetail`

```
import React from 'react';
import { connect } from 'react-redux';

const BookDetail = props => {
  if (!props.book) {
    return <div>Select a book to get started.</div>;
  }

  return (
    <div>
      <h3>Details For:</h3>
      <div>{props.book.title}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    book: state.activeBook,
  };
}

export default connect(mapStateToProps)(BookDetail);
```

## Dreaded error
* Viewing in browser and clicking on book gives me this error:

>Uncaught TypeError: _this2.props.selectBook is not a function

### Solution to error
* It has to do with how I access the exported code here:

`src/actions/index.js`

```js
export default function selectBook(book) {
  // selectBook is an ActionCreator, it needs to return
  // an action,
  // an object with a type property
  return {
    type: 'BOOK_SELECTED',
    payload: book,
  };
}
```

* I imported it incorrectly inside BookList

`BookList`

```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
// MORE CODE
```

* `{ selectBook }` is a named export when I did a default export
* If you use export default, you can name it whatever you want on your import statement when you import it into another file
* If you don't use **export default**, you have to import it in enclosed in brackets, and use the specific name it has from within the file you are importing
* So in each case, your import statement needs to be setup differently

#### fix
```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import selectBook from '../actions/index'; // Fixed!
```

* Notice the brackets are gone on `selectBook`
* Click books now and they all should work

### View in browser
* Refresh and you'll see an error `Cannot read property of 'title' of null`

### Why that error?
* Whenever our Application first boots up, we have no existing Application state (it hasn't been defined yet) * Our Application state is assembled entirely by all of our reducers
* So under the hood Redux sends a couple of booting up **actions** through all the **reducers**
* We've only created one `action` but Redux has created a couple of others for us by default
* Our `ActiveBook` **reducer** is getting called when our App first starts up, some action comes through we don't know what type it is but it is definitely not **BOOK_SELECTED** and when that happens we hit the `return state` line inside

`src/reducers/ReducerActiveBook.js`

```js
export default function(state = null, action) {
  switch(action.type)  {
    case 'BOOK_SELECTED':
      return action.payload
  }

  return state;
}
```

* And by default the state in that case is `null`
* And this means when our Application first boots up our ActiveBook state will always first be `null` (we haven't clicked on anything yet so we don't have anything selected) and so when our Component first tries to render it will try to say `this.props.book.title` where `this.props.book` is `null` and the error comes when we try to read property **title** of `null`
* So this happens all the time in Redux apps. If we don't have a reasonable default for our Application state it may cause some of our Components to generate errors because they may be expecting some property to already be defined in themselves but we for some reason or another, haven't defined that property yet

## A fix for these potential errors - Add initial checks in `render()` method

`BookDetail.js`

```
class BookDetail extends Component {
  render() {
    if (!this.props.book) {
      return <div>Select a book to get started.</div>
    }
    
    return (
      <div>
        <h3>Details for:</h3>
        <div>
          {this.props.book.title}
        </div>
      </div>
    );
  }
}
```

### Test in browser
* Now you will first see the text `Select a book to get started`
* Click on any book in the list and you'll see the details for that book

```
if (!this.props.book) {
      return <div>Select a book to get started.</div>
}
```

* When we first book the app up `this.props.book` is `null`
    - We return simple static text with info for user to click on book
    - We return early from the render function
    - Just a warm up message for the user letting them know we have no information yet but if you click on something we can get this party started
    - Once they click on a book, that action will in turn update our `App state` which will cause our `Container` to re-render because we hooked up this `Container` to Redux
    - When it re-renders we will now have `this.props.book`
    - Which will mean the check condition will be false
    - So we'll get down to our main **return** statement in our `render()` function
    - And this will allow us to successfully render our book's **title**
* The key here is we are manipulating our App `state` over time through the use of `Action Creators`

### Spicing up our App - Add another property - Page number
* This will show how easy it is to add tiny changes over time

`src/reducers/ReducerBooks.js`

* Let's add pages as a property of our book object

`src/reducers/reducerBooks.js`

```js
export default function() {
  return [
    { title: 'JavaScript: the Good Parts', pages: 100},
    { title: 'JavaScript Ninja', pages: 200 },
    { title: 'Eloquent JavaScript', pages: 300 },
    { title: 'The Hobbit', pages: 400 },
  ]
}
```

`src/containers/BookDetail.js`

```
class BookDetail extends Component {
  // MORE CODE

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    );
  }
}
```

## Test in browser
* Refresh and click on a book and you'll now see page numbers too!

## Next - Review Reducers and Actions
