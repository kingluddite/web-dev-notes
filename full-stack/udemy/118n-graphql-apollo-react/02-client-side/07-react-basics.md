# React Basics

`App.js`
```
class App extends Component {
 state = {
    toggleModal: true
 }

 toggle = () => {
    this.setState({
        toggleModal: !this.state.toggleModal
    })
 }
 
 render() {

    // MORE CODE
```

## events
* `button onClick={this.toggleModal}>Show / Hide</button>`

### Be careful with parentheses!
* We don't use `toggleModal()` (_leave off parentheses_)
* **tip** If you want to use parentheses or call multiple items in inline function, pass an arrow function to the event

## Lifecycle Methods
* Place right after intializing `state`

```
// MORE CODE

class App extends Component {
 state = {
    toggleModal: true
 }

 // before mounts
 // will not trigger a re-render
 componentWillMount() {
    console.log('will mount')
 }

 // after mounts
 // will trigger a re-render
 componentDidMount() {
    console.log('did mount');
 }
 // many other LifeCycle Methods

// MORE CODE
```

# refs
* `refs` to a DOM element

```
 // MORE CODE

 submit = () => {
    console.log(this.text)
 }

// MORE CODE
<input type="text" ref={(input) => this.text = input } />
<button onClick={this.submit}>Show value</button>
```

* Above `ref` looks strange but this is what is going on (_but just doing it all in one line_)
* You can assign `refs` to anything (_they can reference any DOM element_)

```
const name = function(input) {
    this.input = input;
}
```

`App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  submit = () => {
    console.log(this.text.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" ref={input => (this.text = input)} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

export default App;
```

## inputs: controlled vs uncontrolled
* Just filling out a form and submitting, use `refs`
* But if you will do something live to the text as they are typing into form (like making the text all lower case, or validating form entries, then you would use `state` instead)
* refs
    - Example of uncontrolled inputs
    - We are just accessing the value of that input whenever we need it
    - We are not controlling it, we are letting the user control it

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    input: 'yo',
  };

  submit = () => {
    console.log(this.text.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" value={this.state.input} />
        <input type="text" ref={input => (this.text = input)} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

export default App;
```

* We prefix the form out with a value but we can't manipulate it
* We also get an error for providing a `value` without `onChange`
* Now we need to take `control` of the `this.state.input`
    - We can use `onChange` to respond to user typing in the input field

```
// MORE CODE

class App extends Component {
  state = {
    input: 'yo',
  };

  updateInput = event => {
    console.log(event);
  };

  submit = () => {
    console.log(this.text.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input
          type="text"
          onChange={this.updateInput}
          value={this.state.input}
        />
        <input type="text" ref={input => (this.text = input)} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

export default App;
```

* Click in first input field and you will see lots of events
* Change log to `event.target.value` and you will get `yo` plus first letter you type in input field
* In order to get full control of input you need to set the state to what user types in and that is what is in the input value

```
updateInput = event => {
  // console.log(event.target.value);
  this.setState({
    input: event.target.value,
  });
};
```

* Improve by initializing state to an empty string

```
state = {
  input: '',
};
```

* It seems silly to control forms like this but it gives us full control over what this input is doing
    - We could say 'no spaces'

```
updateInput = event => {
  // console.log(event.target.value);
  this.setState({
    input: event.target.value.trim(),
  });
};
```

* Show text updating in UI

```
<p>{this.state.input}</p>
<input
  type="text"
  onChange={this.updateInput}
  value={this.state.input}
/>
```

## VS code tips
* duplicate a line: `opt` + `shift` up/down arrow

## ES6 tips
* Destructuring

`const { text } = this.props`

* conditional trick
`true && true`

```
{this.state.toggleModal && <p>Model is showing up</p>}
```

## Some Rules to keep in mind
* When writing `jsx` all tags must close
* `class` is reserved so in `jsx` you must use `className`
* `props` are passed down to components
    - Access `props` with `this.props` (in class)
    - Pass data from a parent to a child
* CBC vs SFC (I prefer CBC)
    - Switching from a SFC to a CBC is a pain 
    - Performance hit is negligible for medium to small apps
* `state` is per component
    - global state (redux, context...)
    - When defining functions in `state`
* Never set `state` directly (_only when first initializing_)
    - Use `this.setState({})` to set state directly
