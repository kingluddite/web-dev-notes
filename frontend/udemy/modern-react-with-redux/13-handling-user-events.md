# Handling User Events
Web applications are constantly using events

* type something into input
* move mouse around
* page loads
* page unloads

## How can we detect if a user enters something into an input text box?
* We want to know a user typed something
* And we want to know what they typed

## Handling Events in React
### Two Steps
1. Declare an Event Handler
    * An Event Handler is a function that should be ran whenever that event occurs
2. We pass the event handler to the element that we want to monitor for events
    * We want to know whenever the `input` element inside our SearchBar Component has its text changed

#### How should we name our event handler?
* onInputChange()
* handleInputChange()

General it is `on/handle` then the name of the element you are watching for the event and then the name of the event itself

```
class SearchBar extends Component {
  handleInputChange() {
    
  }
  
  render() {
    return <input />;
  }
}
```

Now, after defining our event handler we need to pass it to the element we want to monitor

```
class SearchBar extends Component {
  handleInputChange() {
    
  }
  
  render() {
    return <input onChange={this.handleInputChange} />;
  }
}
```

**note** All HTML elements emit a `change` event whenever the user interacts with them by typing something in (This is not a React thing, this is a normal Vanilla HTML thing)

Whenever we are writing JSX and we're writing JavaScript variables (like `this.handleInputChange`) we wrap it with curly braces `{this.handleInputChange}`

`return <input onChange={this.handleInputChange} />;`

Write a new `input` element and pass it a `prop` **onChange** with a value of `this.handleInputChange`

## Event Object
Whenever we define an Event Handler we end up passing it an `event`

The event object describes the context or the information about the event that occured (so it has a lot of very specific techical properties inside of it)

In our particular case we can use the event object to get access to the value of the input (aka - what the text was that was changed)

```
handleInputChange(event) {

}
```

* Doesn't have to be called `event`
    - Can be called `e` or `eventObject` but often people use `event`

```
import React, { Component } from 'react';

class SearchBar extends Component {
  handleInputChange(event) {
    console.log(event.target.value);
  }

  render() {
    return <input onChange={this.handleInputChange} />;
  }
}

export default SearchBar;
```

### View in browser
Type in input and see that everything you type in the input is output in the console

#### Change the console.log() to this
```
handleInputChange(event) {
    console.log(event);
  }
```

Save and refresh browser. Type in input box and you will see all the stuff that is inside of the event object. It's a ton of stuff

## Refactor our code with ES6

Change this:

`return <input onChange={this.handleInputChange} />;`

To this:

```
import React, { Component } from 'react';

class SearchBar extends Component {
  // handleInputChange(event) {
  //   console.log(event.target.value);
  // }

  render() {
    return <input onChange={(event) => console.log(event.target.value)} />;
  }
}

export default SearchBar;
```

* More refactoring
    - If I have a single argument I can drop off the leading parenthesees in ES6

```
render() {
    return <input onChange={event => console.log(event.target.value)} />;
  }
```

Arrow functions help us clean up our code a lot 


