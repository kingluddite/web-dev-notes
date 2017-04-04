# Creating Action
We created an action and we bound it to the BookList Container

## We now will:
* Call the `Action Creator`
* We will add an actual `action` to it
    - An `action` with a **type**
    - And we will replace our current `console.log()` and we return an `action` that is usable by our different **reducers**

Whenever a user clicks on a line item for a particular book we can call our `Action Creator`

In the last section when we connected the `Action Creator` to the Component/Container we made it available as a prop (_specifically `this.props.selectBook`_)

We will add a click event handler on our `BookList` **LI** we can then call the `Action Creator` as `this.props.selectBook`

**note** We want to call the `Action Creator` with the actual book that was clicked on

## Adding click event handler to LI of BookList

```
class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook()}
          className="list-group-item">
          {book.title}
        </li>
      )
    })
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

## What are we going to pass `selectBook()`?
Since we have access to `book` we will pass it `book`

```
class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item">
          {book.title}
        </li>
      );
    });
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

### Test in browser
Refresh and open console. Click on a book in the list and you will (_if you clicked on `The Hobbit`_) "A book has been selected: The Hobbit"

We also get an error `Actions must be plain objects. Use custom middleware for async actions`

Don't worry about the error right now. We'll deal with that later. The good news is our event handler is effectively calling our `Action Creator` inside `src/actions/index.js`

```
export function selectBook(book) {
  console.log('A book has been selected:', book.title);
}
```

Congrats. We successfully connected our `Action Creator` to the `Container`

## Step 1 is completed. Nice!

![step 1 complete](https://i.imgur.com/u6wXVAP.png)

When a user clicks on a book, we are calling the `Action Creator`

## Step 2
Make sure our `Action Creator` returns a usable `action` that can flow through all the different `reducers`

### What is in an action?
An action always has the same type of signature
 
actions have:

* A JavaScript object with a **type** property
* The **type** property describes the type of action
* It also will have some additional information that further describes that event

```
{
    type: BOOK_SELECTED,
    book: { title: 'Book 2'}
}
```

`src/actions/index.js`

Change this:

```
export function selectBook(book) {
  console.log('A book has been selected:', book.title);
}
```

To this:

```
export function selectBook(book) {
  // selectBook is an ActionCreator
  // it needs to return an action,
  // an object with a 'type' property
  return {
    
  };
}
```

**note** To repeat, actions usually have two actions
1. `type`
2. `payload`
    * The `payload` further describes the condition of the `action` that is being triggered

**rule** Every `action` must have a **type** that further describes the `action`

Let's update our Action Creator

```
export function selectBook(book) {
  // selectBook is an ActionCreator
  // it needs to return an action,
  // an object with a 'type' property
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
```

**note** The type usually has a variable as a value and we will add that soon but for now we are keeping this simple

**note** the `payload` is optional

### `type` rules:
The type is:

* always in UPPERCASE
* usually a `"string"`
* always SEPARATED_BY_UNDERSCORES

**note** Because it is very important to keep all the `types` consistent we usually pull all the types out into a separate file (_We will do that soon becuase it is the proper way to do things_)

### Step 2 is now complete. Nice!
When the user clicks on the button it calls the `Action Creator` and the `Action Creator` contains an action with a **type** and a **payload** (_our example has `book` but a **payload** is just more information about our `action` that was just taken_)

So we now have the `wiring up` for sending the `action` to all of our `reducers` (we did that in `BookList`)

```
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook: selectBook }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
```

## Next Challenge
Update our `reducer` to make sure that this `action` is being used




