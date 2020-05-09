# Controlled Component and Binding Context
## Convert our `input` into a `controlled field`
A **controlled field** is a `form` element where the value of the `input` is set by the `state` of our Component (_not the other way around_)

## Declarative vs Imperative
* We will say declaratively what the value of our input will be (_not imperatively_)
    - To create a **controlled Component** we need to set our `state` whenever the input is changed
    - **note** The `state` we are referring to here is our Component `state`
        + Just the Component level of `state`, not the **Redux** level of `state` (_they are two completely separate things_)

### How do we set our `state` up?
We need to initialize it inside our `contructor()` method

`SearchBar`

```
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <form className="input-group">
        <input />
        <span className="input-group-btn">
          <button
            type="submit"
            className="btn btn-secondary"
            >
              Search
          </button>
        </span>
      </form>
    );
  }
}

export default SearchBar;

```

* We want to initialize our state with `this.state = { term: ''};`
* We set our state `term` to an empty string

## Update the `state` over time
Using a **change handler** on the `input` element

### Update our input
```
<input
  placeholder="Get a five-day forecase in your favorite cities"
  className="form-control"
  onChange={this.onInputChange}
  value={this.state.term}
/>
```

### Add our event handler for our input change event
```
onInputChange(event) {
  event.preventDefault();
  console.log(event.target.value);
}
```

### Full `SearchBar` Code
```
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
  }

  onInputChange(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  render() {
    return (
      <form className="input-group">
        <input
          placeholder="Get a five-day forecase in your favorite cities"
          className="form-control"
          onChange={this.onInputChange}
          value={this.state.term}
        />
        <span className="input-group-btn">
          <button
            type="submit"
            className="btn btn-secondary"
            >
              Search
          </button>
        </span>
      </form>
    );
  }
}

export default SearchBar;
```

### View in browser
Refresh and type in `input` and see how each time you type in `input` it is updated in console with the value of what you typed

![search bar](https://i.imgur.com/gUBzVLd.png)

* Our twitter bootstrap is connecting our `SearchBar` nicely with the `Search` button
* When we type now in the `input`, the value of the `input` will stay blank (_very strange how this could happen_) but it is because our state `term` is an empty string and we are setting our value of our input to be `this.state.term`. We never update our `state` so the value of the `input` stays empty

### So if we do this:
```
onInputChange(event) {
    console.log(event.target.value);
    this.setState({ term: event.target.value });
}
```

It should work, right?

#### View in browser and we get and Error!
Refresh and type and you now see your `input` text typed in the field appearing but now we get an **error** `cannot read property 'setState' of undefined`

* Last time we used an event handler we wrapped it inside of a **fat arrow function**

Something like:

```
onChange={() => this.onInputChange()}
```

## Mystery Context and `this`
This time we are saying whenever `onChange` event occurs run `this.onInputChange`

The problem is when we pass off an event handler like this and then call it, the value of `this` is not going to be our `SearchBar` Component. Instead it will be some **mystery context**

**rule** If you are not familiar with the concept of `this` in JavaScript, no worries just remember this rule: 

### REMEMBER THIS RULE
Whenever we hand a **callback function** like this off and then our **callback function** references `this`, `this` will have the incorrect context (_it will have some **mystery context**_)

The error `Cannot read property 'setState' of undefined` is because `this.setState` won't work because `this` is not defined on the `SearchBar` Component

### Fixing `this` and mystery context without using an arrow function
We will use a different approach this time

#### Bind the context of `onInputChange` using:

`SearchBar`

```
constructor(props) {
  super(props);

  this.state = { term: ''};

  this.onInputChange = this.onInputChange.bind(this);
}
```

### View in browser
You'll see that we can type in the Search `input` and we no longer get the error

### It works! But why is it working?
Let's analyze the line of code we added

![line of code](https://i.imgur.com/w3egzhG.png)

`this` has a function called `onInputChange()` and we want to **bind** that function to `this` (_which is our `SearchBar` Component_) and then replace `this.onInputChange` with this new bound instance of `inputChange`

* Take the existing function, bind it to `this` and then replace the existing function with the newly bound existing function (_so we are kind of like 'overriding' our local method_)

It is kind of hard to wrap around what is happening here but just remember (and this will work 99% of the time) if your **callback** has a reference to `this`, you will need to bind the **context** (_the error messages should help you out when this issue comes up as they are pretty clear and straight forward_)

### Binding Context!
`this.onInputChange = this.onInputChange.bind(this);`


