# Intro to State
* One of the most confusing topics in `React`
* **defined** `state` is a plain JavaScript object that is used to record and react to user events
* Each class-based Component that we define has its own `state`
* Any time the Component `state` is changed, the Component immediately re-renders
    - Changes in a Component's `state` also forces all its children to re-render as well
* Before we ever use `state` inside of a Component, we must first initialize the `state` object

## How to initialize `state`?
* We set the property `state` to a plain JavaScript object inside of a class's **constructor()** method

`SearchBar.js`

```
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return <input onChange={event => console.log(event.target.value)} />;
  }
}

export default SearchBar;
```

* **note** Functional Component's do not have `state`
* Only class-based Component's have `state` 

## constructor()
* All JavaScript class's have a special function called `constructor()`
* The `constructor()` function is the first and only function called automatically whenever a new **instance** of the class is created
* The `constructor()` function is reserved for doing some setup inside of our class
    - like:
        + initializing variables
        + initializing state

## super()
* **note** SearchBar Component extends **Component**
* Component class itself has it's own **constructor()** function
* When we define a method that is already defined on the parent class, we call that parent method on the parent class by calling `super()`
    - This is OOP
    * If you aren't familiar with OOP then this will sound crazy confusing
    * We'll come back and talk more about `super()` later
    - If we didn't call `super()` here we would get an error so it is good to know when we need to call `super()` we will always be alerted to add it

## state
* Whenever we use state, we initialize it by creating a new object and assigning it to `this.state`
* The object we pass will also contain properties that we want to record on the state
    - We are storing the property `term` on state and this is short for `search term`
    - Whenever the user updates the search input, this is the property we want to update/record that change on
    - Anytime the user updates the search input we want the value of `term` in our `state` to be the value inside `term` inside our `state`
