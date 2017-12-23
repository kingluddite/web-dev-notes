# More State
* Pass data up stream
* We will call the parent method from inside AddPlugin and pass data up to the parent
* We keep the method in place inside `AddOption` because we want it to handle the form inside this method
    - prevent form submission should be handled inside this component

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: ['Option Uno', 'Option Dos', 'Option Tres', 'yo'],
    };
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: [],
      };
    });
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(option);
  }

  handleAddOption(option) {
    console.log(option);
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        <p>Options here</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.optionText}</p>
      </div>
    );
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    if (option) {
      this.props.handleAddOption(option);
    }

    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

* We have two `handleAddOption` methods
    - one in Component
    - one passed down from parent
    - both named the same thing

## Test it out
* Add text inside text input and click `Add Option`

## Make it work
* We never want to edit the `state` directly

`prevState.options.push(options)` ----> BAD IDEA!

* Instead you should just compute the new one
* array.concat (will enable us to manipulate an array without affecting the original array)

```js
var arr1 = ['a', 'b', 'c'];
var arr2 = ['d', 'e', 'f'];

var arr3 = arr1.concat(arr2);
// arr3 is a new array [ "a", "b", "c", "d", "e", "f" ]
```

* [ MDN Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

```js
// MORE CODE
handleAddOption(option) {
  this.setState(prevState => {
    return {
      options: prevState.options.concat([option]),
    };
  });
}
// MORE CODE
```

* We can also use `options: prevState.options.concat(option),` without the `[]` for the array and it still works

## Start off with an empty array of options
```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: [], // update this line
    };
  }
// MORE CODE
```

* We start off with an empty array

```
handleAddOption(option) {
  // only run if there is an empty string
  if (!option) {
    return 'Enter valid value to add item';
  } else if (this.state.options.indexOf(option) > -1) {
    return 'This option already exists';
  } 

  // we have two returns above so we don't need to use an else
  // here
  this.setState(prevState => {
    return {
      options: prevState.options.concat(option),
    };
  });
}
```

* We return on condition and if neither of those conditions occur, we return `undefined` (if all goes well)
    - If a function doens't explicitly return somethign then it will return `undefined`

## Add state for an individual component
* Each component can have it's own state
* Since the error message is specific to this form we only need to monitor its state on it's on as no other components need to worry about this state
    - We'll set up a default error value
    - We set it to `undefined` so there is no error by default
* We will turn this component

```
class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    if (option) {
      this.props.handleAddOption(option);
    }

    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
```

* To this: 

```
// MORE CODE
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return {
        error: error,
      };
    });
    
    // clear input
    e.target.elements.option.value = '';
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
// MORE CODE
```

* We show an error above the form it there is an error

## Refactor
```js
this.setState(() => {
  return {
    error: error,
  };
});
```

* To this (using object shorthand)

```
this.setState(() => {
  return {
    error,
  };
});
```

* Refactor more

```js
this.setState(() => {
  return { error };
});
```

## Test it out
* Add option with no options and you'll see error above form (string can't be empty)

```js
if (!option) {
  return 'Enter valid value to add item';
} 
```

* Add option and hit enter or click button and the option is added and the 
* Check for dupes using this code

```
// check for duplicates
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
```

* Enter `test` twice and you'll see `'This option already exists'` error message

## Summary
* We can add `state` to any component
* We can use props to communicate in both directions
