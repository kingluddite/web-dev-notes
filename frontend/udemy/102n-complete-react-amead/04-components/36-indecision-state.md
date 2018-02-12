# Indecision State
* Convert options to state
    - Why?
    - Because they will change over time

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['Option Uno', 'Option Dos', 'Option Tres'],
    };
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options options={this.state.options} />
        <AddOption />
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
  handlePick() {
    console.log('handlePick');
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    );
  }
}

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveall = this.handleRemoveAll.bind(this);
  }

  handleRemoveAll() {
    console.log(this.props.options);
    // console.log('remove all test');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
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
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    if (option) {
      console.log(option);
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

* Now we are using the options state

## Actions
* We will use `<Actions />` if their are options
    - If so render `<Actions />`
    - If not, don't render it

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['Option Uno', 'Option Dos', 'Option Tres'],
    };
  }
  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} />
        <Options options={this.state.options} />
        <AddOption />
      </div>
    );
  }
}
```

* Add an option to the state options array an you will see an option added instantly

```
class Action extends React.Component {
  handlePick() {
    console.log('handlePick');
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePick} disabled={!this.props.hasOptions}>
          What should I do?
        </button>
      </div>
    );
  }
}
```

* Remove all items from the option and the `What should I do` button will be deactivated

## How to manipulate the `options` array
* Before we just had one component
* But now we have children that need to be able to manipulate the state in the parent
* AddOption and Options need to manipulate the state

## How can we run code in the parent component when the events are triggered in the children components?
* This is problematic because `props` are a one-way street ---- they just go down
* props can pays from a parent to a child but not from a child to a parent

## Solution - Pass functions in as props
1. Define a method

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
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
// MORE CODE
```

* We pass that event handler as a prop to `<Options>`

```
// MORE CODE
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
        <AddOption />
      </div>
    );
  }
}
// MORE CODE
```

* Remove the method inside Options as we aren't using it anymore
* Remove the constructor as we don't need to bind the method

```
// MORE CODE
class Options extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.handleRemoveall = this.handleRemoveAll.bind(this);
  // }
  //
  // handleRemoveAll() {
  //   console.log(this.props.options);
  //   // console.log('remove all test');
  // }
  //
  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options here</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}
// MORE CODE
```

* We will also remove `this.handleRemoveAll` method as we just deleted it

```
render() {
   return (
     <div>
       <button onClick={this.handleRemoveAll}>Remove All</button>
```

* To this:

```
render() {
   return (
     <div>
       <button>Remove All</button>
```

### Here is the magic to talk upstream!!
* We now will use `props` to access our `handleDeleteOptions` function in the parent

```
render() {
   return (
     <div>
       <button onClick={this.props.handleDeleteOptions}>Remove All</button>
```

* We also need to bind our method to `this` in the contstructor

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);

    this.state = {
      options: ['Option Uno', 'Option Dos', 'Option Tres', 'yo'],
    };
  }
// MORE CODE
```

* Click `Remove All` button and you will see that it removes all options and instantly `What should I do?` button becomes disabled

## Summary
* We took a method and passed it down to a child Component
* This enables us to reverse the data flow
* Then we use `props` in that child to access the method we defined and binded `this` in the parent's constructor
* When parent component passes down new props to a child component that child component will rerender

## Challenge
* handlePick - pass down to Actions and setup onClick
  - bind in Parent constructor
* randomly pick an option and log it
  - Use logic in `jsx-indecision.js`
* Remove handlePick() from child component (Action)
* Wire up new method in Action
* When you click 'What should I do?' it should log a random option if there are any

### Solution
```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);

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
        <AddOption />
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
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    if (option) {
      console.log(option);
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


