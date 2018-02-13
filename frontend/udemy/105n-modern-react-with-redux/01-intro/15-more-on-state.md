# More on `state`

**important**

* Updating state is very different than initializing state
* It is very important to know the difference

Most important thing to take away is how to manipulate `state`

## Inside our `constructor()`
`this.state = { term: '' };`

This is the only time we deal with state like this and we only do it inside our `constructor()` method

## this.setState()
Everywhere else we use `this.setState()`

Change this:

```
render() {
    return <input onChange={event => console.log(event.target.value)}} />;
  }
```

To this:

```
render() {
    return <input onChange={event => this.setState({ term: event.target.value})} />;
  }
```

## The following is BAD. Never do it
`this.state.term = event.target.value`

You **always** manipulate the state with `this.setState()`

## Why never set state with `this.state.term = event.target.value`

React does lots of work in the background with `state` and if we changed it like above, React wouldn't know and things would break down quickly. But if we use `this.setState()` React can deal with that and update the state and then rerender our Component

### View in browser
Use the React tab and search for `SearchBar`. You will see `State` and **term**, type stuff in the input and watch how `State` updates

![update state](https://i.imgur.com/bTrV2hY.png)

### We can test our state as we render with:
```
render() {
    return (
      <div>
        <input onChange={event => this.setState({ term: event.target.value})} />
        Value of the input: {this.state.term}  
      </div>
    )
  }
```

## View in browser
Type in the input and watch our Value update on the screen

**note** When we use `{this.state.term}` here we are not setting `state` which would be bad we are showing `state` which is fine

## What does this tell us?
Whenever we update the `input` element (whenever we change the value of it), this function runs `event => this.setState({ term: event.target.value})` because it is our event handler

We set the state **term** with the new value in our `input`

Whenever we update our state (when we call `this.setState()`), it causes our Component to automatically re-render and pushes all the updated information from the SearchBar's Component's `render()` method into the DOM, because our render() method makes reference to `this.state.term`, every time that the Component re-renders we get the updated `this.state.term` in the DOM

That is a great way to think of how `state` works. State may confuse you in the future but if you think of this simple example it will help you understand it

## Final SearchBar Component
```
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <div>
        <input onChange={event => this.setState({ term: event.target.value})} />
      </div>
    )
  }
}

export default SearchBar;
```





