# Start Project Redux
`$ git clone git@github.com:StephenGrider/ReduxSimpleStarter.git redux-practic`

## Install boilerplate
`$ npm install`

## Start
`$ npm start`

## Test in browser
`Really simple starter` on screen

## What is a reducer?
A `reducer` is a function that returns a piece of the application state

* Because our Application can have many different pieces of state we can have many different `reducers`

![book diagram](https://i.imgur.com/opG59Lo.png)

* Our Application state has two pieces
1. The list of books
2. The currently selected book

So we could have two different `reducers` for this
1. One reducer is responsible for the list of books
2. One reducer is responsible for producing the currently selected book

**note** Our Application state is a plain JavaScript object

![reducers diagram](https://i.imgur.com/qyRzDc7.png)

* The Application state is the big object encompassing all our state
* There are two keys
    - `books` (Books Reducer)
    - `activeBook` (ActiveBook Reducer)

**repeat** Reducers produce the **value** of our `state`

* The `keys` can be whatever we want
* All the Reducers care about is the value of the `state`

```
{
    books: [ { title: 'Great Expectations'}, { title: 'All Quiet on the Western Front'}],
    activeBook: { title: 'The Perpetual Now'}
}
```

## We will code our Books Reducer
We will write a function that produces the value of our state. At the end of the day it should just product an array of objects that just have the title of the book

Then the value of that Reducer should be assigned to the `key` books on our `state` 

`src/reducers/ReducerBooks`

**tip** In Redux Apps prepend the name of the file with the type of file it is

```
function() {
  return [
    { title: 'JavaScript: the Good Parts'},
    { title: 'JavaScript Ninja' },
    { title: 'Eloquent JavaScript'},
    { title: 'The Hobbit'},
  ]
}
```
    
## Make use of this Reducer anywhere else inside our project
We need to export this function

```
export default function() {
  return [
    { title: 'JavaScript: the Good Parts'},
    { title: 'JavaScript Ninja' },
    { title: 'Eloquent JavaScript'},
    { title: 'The Hobbit'},
  ]
}
```

Now any other file can automatically import this file and they will automatically receive the BooksReducer

## Steps in creating a Reducer
1. Create the Reducer
2. Wire it into our Application

## Wire our Reducer into our Application

`src/reducers/index.js`

```
// code
const rootReducer = combineReducers({
  
});
// code
```

* This rootReducer is the mapping of our `state`

```
const rootReducer = combineReducers({
  books: BooksReducer
});
```

This is what gives us the [same kind of mapping](https://i.imgur.com/NrHjP6x.png) of the `books` key and the value of the array of objects with book titles

## Import BooksReducer
```
import { combineReducers } from 'redux';
import BooksReducer from './ReducerBooks'; // add this line

const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;
```

* We did not talk about `combineReducers` and `rootReducer` but we will come back to these terms and discuss their functionality at a later time




