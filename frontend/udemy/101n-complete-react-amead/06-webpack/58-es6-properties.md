# ES6 Properties
* Add new babel plugin
* Will add support for the class properties syntax
* This will enable us to add properties directly onto our classes (instead of just methods)
* If I wanted to add an object onto my state object I would have to create a constructor function
    - This is tedious and makes more work for us than we need
    - This will also help us avoid manually binding all our event handlers
    - And we will be able to remove the constructor function
* [plugin documentation](https://babeljs.io/docs/plugins/)
* [TC39](https://github.com/tc39) - org that moves JavaScript forward

## Stages
* Stage 0 - just an idea
* Stage 1
* Stage 2 ---> we will be using this
* Stage 3
* Stage 4 - finished

### Transform Class Properties [docs](https://babeljs.io/docs/plugins/transform-class-properties/)

```
class Bork {
   //Property initializer syntax
   instanceProperty = "bork";
   boundFunction = () => {
     return this.instanceProperty;
   }
```

* The above will greatly simplify our JavaScript classes

## Install plugin
`$ yarn add babel-plugin-transform-class-properties`

### Add plugin to .babelrc
`.babelrc`

```
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "transform-class-properties"
  ]
}
```

## Run the dev server again
`$ yarn run dev-server`

* Should work as it did before

## Experiment with new syntax
```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

class OldSyntax {
  constructor() {
    this.name = 'John Wayne';
  }
}
const oldSyntax = new OldSyntax();
console.log(oldSyntax);
```

* That last part shows us we have to create a constructor function just for one property we want to add

## New syntax
* Att to bottom of `app.js`

```js
// ------- new code

class NewSyntax {
  name = 'Bobby Fisher';
}
const newSyntax = new NewSyntax();
```

* We don't have to add a constructor and we get the same output as before

![old and new](https://i.imgur.com/MOJgJF5.png)

## Update our AddOption class
```
import React from 'react';

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined,
    };
  }
```

* Change to:

```
import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);
  }
```

# Test
* Should work the same as before
* But with new syntax

## Figure out how to create functions that won't have their binding breaking our code

```js
class OldSyntax {
  constructor() {
    this.name = 'John Wayne';
  }
  getGreeting() {
    return `Hi. MY name is ${this.name}`;
  }
}
const oldSyntax = new OldSyntax();
console.log(oldSyntax.getGreeting());
```

* Above works with no problems

## But we can break that with:
```js
class OldSyntax {
  constructor() {
    this.name = 'John Wayne';
  }
  getGreeting() {
    return `Hi. MY name is ${this.name}`;
  }
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());
```

## Fix that with:
```js
class OldSyntax {
  constructor() {
    this.name = 'John Wayne';

    this.getGreeting = this.getGreeting.bind(this);
  }
  getGreeting() {
    return `Hi. MY name is ${this.name}`;
  }
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());
```

## Fix this - No more binding!
* We'll do this by using an arrow function
* **remember** Arrow functions don't have their own this binding
    - Instead they use whatever this bind is in the parent's scope
    - And for classes that is the class instance
    - This means the `getGreeting()` will always be bound to the class instance

```
class NewSyntax {
  name = 'Bobby Fisher';
  getGreeting = () => {
    return `Hi. MY name is ${this.name}`;
  };
}
const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting;
console.log(newGetGreeting());
```

* That gets rid of the binding error

### Convert AddOption
```
import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
```

* And now we'll convert that to:

```
import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };

  handleAddOption = e => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  };
```

* And it still works
* But we have less lines of code
* We remove the constructor
* We remove the binding

## Note
* We will still use regular ES6 methods for all the built-in react methods
    - stuff like:
        + render()
        + componentDidMount()
        + componentDidUpdate()

## Challenge
* Pull state out of constructor
* Convert all 4 event handlers to class properties (arrow functions)
* delete the constructor completely
* start with class properties and end with method
    - our event handlers go on top
    - lifecycle methods go on bottom

### Solution
```
import React from 'react';

import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option),
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(option);
  };

  handleAddOption = option => {
    // only run if there is an empty string
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option),
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // do nothing
      // fallback to empty array which is the default value
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      // convert our json object into a string
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('IndecisionApp Component did unmount');
  }

  render() {
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}
```

* Clean up code
* Remove old and new syntax experiments
