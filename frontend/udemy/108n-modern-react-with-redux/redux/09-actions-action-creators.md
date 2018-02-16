# Actions and Action Creators
## One big problem
Our application is serving static data. It never changes!

## We will need to create an active book
This book will change as the user clicks on different buttons

That is a piece of our Application `state` that needs to change over time (And that is a dynamic piece of our Application state)

## Changing `state`
That is what actions and actionCreators are for

![wireframe](https://i.imgur.com/1B6uwKC.png)

This is a diagram of the Lifecycle of an action in a Redux Application

Everything in a Redux Application starts off with an event triggered by a user (either directly or indirectly)

### Some **direct** events like:
* Clicking on a button
* Selecting an item from a dropdown
* Hovering over a particular element

### Some **indirect** events like:
* An AJAX request fininishing loading up
* Or a page initially loading up

Any of these events can call an `Action Creator`

## What is an Action Creator?
A function that returns an object

The object has a type that describes the type of action that was just triggered

The action can also have some data that further describes the action

* We could have a book that contains the actual selected book

**note** We keep saying Action Creator returns an object but we call that object that is returned the `action`

### Referring to the wireframe
If a user clicks on button #2 it will call an `Action Creator`, the `Action Creator` is just a function that returns an object

#### Sample Action Creator
```
function( return {
    type: BOOK_SELECTED,
    book: { title: 'Book 2'}
});
```

So our Action Creator returns an object (aka `action`)

```
{
    type: BOOK_SELECTED,
    book: { title: 'Book 2'}
}
```

That object is then automatically sent to all the reducers inside of our Application

ActiveBook Reducer

* We usually set up a switch statement inside all of our reducers and the switch statement will go to a different line depending on the type of the action

```
switch(action.type) {
    case: BOOK_SELECTED:
      return action.book
    default:
    // I don't care about this action, do nothing
    return currentState
}
```

* A reducer doesn't have to react to every different action. It can say "I don't care about anything about the current action. It doesn't matter to me". If that happens it just returns its currentState and no `state` is changed for that particular reducer
* If the reducer does care, it can return something and that newly created value will be the new value of `state`

So in our case

This action will flow into the reducer

![returned action](https://i.imgur.com/8Uf5Xl2.png)

We'll do a switch on `action.type`

![action inside reducer switch](https://i.imgur.com/3i8wgAa.png)

Since the action.type equals `BOOK_SELECTED` the reducer will return `action.book` (aka [the book with title: 'Book 2'](https://i.imgur.com/5KMSwo9.png))

Our ActiveBook Reducer is wired up to the `activeBook` key on our state

![activeBook key on our `state`](https://i.imgur.com/AlO3xz3.png)

It will pop up as the new value of the `state` (Whatever is returned from our reducer ends up as the new value of our `state`)

It will be [Book 2](https://i.imgur.com/M5P67v9.png)

**note** Once all the reducers have processed the action and returned new `state`, new `state` has been assembled. Notify containers of the changes to `state`. On notification, containers will rerender with new `props`

All of the different `Containers` will run `mapStateToProps()` function, that `state` will get dissected and injected into all the different `Containers` and all those `Containers` will re-render with all their data

That is the complete flow and after it is done our Application sits around and waits for our user to trigger another event

And when they do, we go through the entire process again

* We call an Action Creator
* The Action Creator returns an action
* The action flows through the reducers
* The reducers assemble our new `state`
* The new `state` flows into all the `Containers`

Even if we have 20 reducers all of these actions will flow through all of the reducers

Reducers can choose to return a different piece of `state` depending on what the action is

That newly returned piece of `state` then gets piped into the Application `state`

```
{
activeBook: {title: 'JavaScript'},
books: [ {title: 'Dark Tower'}, {title: 'JavaScript'}]
}
```

That Application `state` then gets pumped back inside our React Application which causes all of our Components to re-render

