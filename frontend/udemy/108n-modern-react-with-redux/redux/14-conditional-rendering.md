# Conditional Rendering
We just made a `Container` out of the `BookDetail` Component

* So we can now make use of `this.props.book` inside of the `Container` because we mapped our Application `state` to the `props` of `BookDetail`

## We'll print out the `title` of our current book
```
class BookDetail extends Component {
  render() {
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

### View in browser
Refresh and you'll see an error `Cannot read property of 'title' of null`

### Why that error?
Whenever our Application first boots up, we have no existing Application state (it hasn't been defined yet). Our Application state is assembled entirely by all of our reducers

So under the hood Redux sends a couple of booting up actions through all the reducers

We've only created one action but Redux has created a couple of others for us by default (stuff like 'hey I'm warming up here let's make sure all is working well)

Our ActiveBook reducer is getting called when our Application first starts up, some action comes through we don't know what type it is but it is definately not **BOOK_SELECTED** and when that happens we hit the `return state` line inside

`src/reducers/ReducerActiveBook.js`

```
export default function(state = null, action) {
  switch(action.type)  {
    case 'BOOK_SELECTED':
      return action.payload
  }

  return state;
}
```

And by default the state in that case is `null`

And this means when our Application first boots up our ActiveBook state will always first be `null` (we haven't clicked on anything yet so we don't have anything selected) and so when our Component first tries to render it will try to say `this.props.book.title` where `this.props.book` is `null` and the error comes when we try to read property **title** of `null`

So this happens all the time in Redux apps. If we don't have a reasonable default for our Application state it may cause some of our Components to generate errors because they may be expecting some property to already be defined in themselves but we for some reason or another, haven't defined that property yet

## A fix for these potential errors - Add initial checks in `render()` method
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
Now you will first see the text `Select a book to get started`. Click on any book in the list and you'll see the details for that book

```
if (!this.props.book) {
      return <div>Select a book to get started.</div>
}
```

* When we first book the app up `this.props.book` is `null`
    - we return simple static text with info for user to click on book
    - we return early from the render function
    - just a warmup message for the user letting them know we have no information yet but if you click on something we can get this party started
    - once they click on a book, that action will in turn update our Application state which will cause our `Container` to re-render because we hooked up this `Container` to Redux
    - When it re-renders we will now have `this.props.book` which will mean the check condition will be false so we'll get down to our main return statement in our `render()` function and this will allow us to successfully render our book's **title**

The key here is we are manipulating our Application `state` over time through the use of `Action Creators`

### Spicing up our App
This will show how easy it is to add tiny changes over time

`src/reducers/ReducerBooks.js`

Let's add pages as a property of our book object

```
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
  render() {
    if (!this.props.book) {
      return <div>Select a book to get started.</div>
    }

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
Refresh and click on a book and you'll now see page numbers too!

## Next - Review Reducers and Actions
