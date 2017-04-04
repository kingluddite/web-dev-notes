# Containers
Connecting Redux to React

## Where we are
We created our first Reducer
We wired our Reducer to our Application inside of a `combineReducers()` function which we did not talk about but the **key** was the piece of `state` (books was the name of the piece of state) and the **value** was the Reducer itself

`src/reducers/index.js`

```
import { combineReducers } from 'redux';
import BooksReducer from './ReducerBooks';

const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;
```

* When we pass this object `{ books: BooksReducer}` to combineReducers we are telling Redux how to create our Application `state`

## Make sure our code
Is actually generating usable `state` for our Application

We will do this by creating a `BookList` Component within React

`BookList`

```
import React, { Component } from 'react';

class BookList extends Component {
  render() {
    return (

    );
  }
}

export default BookList;
```

We can also consolidate some code and use this:

```
import React, { Component } from 'react';

export default class BookList extends Component {
  render() {
    return (

    );
  }
}
```

We will render an unordered list

```
import React, { Component } from 'react';

export default class BookList extends Component {
  renderList() {

  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}
```

**note**

* Whenever we render a JavaScript variable we always use curly braces `{}`
* class-based components always have access to `this.props`

### renderList()
We will pull the list building out to a separate function called `renderList()`

```
renderList() {
    return this.props.books.map((book) => {
      return (
        <li className="list-group-item">{book.title}</li>
      )
    })
  }
```

#### Don't forget to add the `key`
Because it is a list

* We just need to use a unique value so we can use `book.title`

```
renderList() {
    return this.props.books.map((book) => {
      return (
        <li key={book.title} className="list-group-item">{book.title}</li>
      )
    })
  }
```

#### Plug in our Application `state` into this
We need to connect two separate Libraries (Redux and React)

**note** There is absolutely no intrinsic connection between React and Redux

#### React-Redux
This is a separate library that connects React and Redux

`$ npm install --save react-redux`

We need to define one of our Components as a `Container` instead of a Component

We've been using the term Component as a view but now we are going to promote a Component to a `Container`

### What is a `Container`?
A React Component that has a direct connection to the `state` managed by Redux

![working diagram](https://i.imgur.com/oesulZb.png)

Our data and views together make up our working, usable app

The left hand side is Redux
The right hand side is React

In the middle we are using our new Library called **React-Redux** and this is what forms the bridge between these two separate Libraries

The only time we can take a React Component and inject data/state into it is through a Component that we call `Container`

`Containers` aka **"Smart Components"** (as opposed to a dumb Component)

Currently, we have a **"Dumb Component"** because it does not have any direct connection to Redux

`Containers` will look very similar to `React Components` but they are distinctly different

## Put `Containers` inside the `containers` directory
Create a new directory `src/containers`

* Cut `BookList.js` and paste it inside the `containers` directory

## Creating our first `Container`
We'll use `BookList.js`

### Valid Question
Which Components do we promote as Containers and which do we keep as normal React Containers?

