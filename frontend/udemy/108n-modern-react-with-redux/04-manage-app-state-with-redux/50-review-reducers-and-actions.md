# Review Reducers and Actions
## Most important thing to remember
* Redux is completely in charge of managing our Application `state` and that `state` is a single plain JavaScript object
* Our Application `state` is completely different than our Component `state`
* Out Components can still do stuff like:

```
class BookDetail extends Component {
  render() {
    // we can say stuff like:
    this.state.jalsasd;
    // and we can still do stuff like this:
    this.setState({jalsasd: 'asdfjsd;fjf'});

    return (
      <div>
        bla bla bla
      </div>
    );
  }
}
```

* Our Component `state` is completely different, completely separate from our Application `state`
* There is absolutely no tie whatsoever
* The people who created Redux could have called their `state` something completely different than `state` because they are not connected in any way, shape or form

### Our Reducers
* Our Application `state` is formed by our `reducers`

```js
export default function(state = null, action) {
  switch(action.type)  {
    case 'BOOK_SELECTED':
      return action.payload
  }

  return state;
}
```

* Our reducers all get tied together with the `combineReducers` method

`src/reducers/index.js`

```js
import { combineReducers } from 'redux';
import BooksReducer from './ReducerBooks';
import ActiveBook from './ReducerActiveBook';

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBook
});

export default rootReducer;
```

* For each `key` inside our `combineReducers({})` object, we assign one reducer and that `reducer` is responsible for creating this piece of state

![one piece of state](https://i.imgur.com/6epBk9y.png)

* So whatever ActiveBook reducer returns will be available as our `activeBook` piece of Application `state`

![assigning keys one reducer](https://i.imgur.com/74iYp4X.png)

### What are our reducers in charge of?
* Changing our Application `state` over time and they do that through the user of actions
* Whenever an action is dispatched it flows through all of the different `reducers` in our Application and each `reducer` has the option to return a different piece of `state` based on the type of action that was received

### Actions and Action Creators
`Action Creators` - Just simple functions that return `action`
`Action` - Just a plain JavaScript object

* `actions` must always have a type defined
* They can optionally have a **payload** or any other number of properties (in general we tend to refer to this as **payload**, we are not required to name it **payload** just the common naming convention)

![diagram](https://i.imgur.com/yXvSHcE.png)

1. We tied an `Action Creator` to our Book list items
2. When a user clicked on a book list item
3. It called an Action Creator
4. Which dispatched our action
5. That action was automatically sent to the list of all of our reducers
6. And for the reducers that cared about that particular action, they returned a piece of `state` which is assembled as the global Application state and that global Application `state` was then injected back into all the different `Containers` inside of our Application
7. The `Containers` then re-rendered and cause the view to update

## Summary
* Once you finally get a grasp on this cycle you will absolutely 100% understand Redux!
* It's hard at first but over time in will sink in
* A lot of online posts say Redux is very simple
* It is only simple once you understand what is going on






