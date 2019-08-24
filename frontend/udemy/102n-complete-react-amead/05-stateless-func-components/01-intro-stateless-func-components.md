# Intro to Stateless functional components
* It is stateless (no state)
* Unlike class-based components it is just a function
* It is a react component

## We we use a combination of the two (in our app)
* Some will stay class based components (CBC)
* Some will be converted to stateless functional components (SFC)

### IndecisionApp
* It manages some state so we need this to remain a Class based component

#### Header
* Just a function we can convert this to a SFC
* Action, Options and Option also can be converted as they are simple presentational components

## Presentational components
* Not concerned with managing state
* Simple/stupid components
* A majority of our app will be stateless
* State should be condensed into a few places

```
const User = () => {
  return (
    <div>
      <p>Name: </p>
      <p>Age: </p>
    </div>
  );
};
ReactDOM.render(<User />, document.getElementById('app'));
```

* **note** In CBC inside of `render()` this is very similar to the function in SFCs
  - Inside of `render()` it gets called behind the scenes and whatever comes back is shown to the screen
    + And the exact same thing is true for SFC
    + So for SFC we just have to render JSX

## SFC Syntax
* Spell with a capital letter
* That will render `Name` and `Age` to screen
* Stateless functional components don't allow for `state`
    - But they do allow `props`
    - Don't have access to `this`
    - `props` get passed into this function as a first argument

### Pass in a prop
```
// MORE CODE
const User = () => {
  return (
    <div>
      <p>Name:</p>
    </div>
  )
}

ReactDOM.render(<User name="John Doe" />, document.getElementById('root'));
```

* But how do we use that prop in our SFC?

```
// MORE CODE
const User = (prop) => {
  return (
    <div>
      <p>Name: {prop.name}</p>
    </div>
  )
}

ReactDOM.render(<User name="John Doe" />, document.getElementById('root'));
```

* Will output `John Doe` to UI

## Add more props
```
const User = props => {
  return (
    <div>
      <p>Name: {props.firstName}</p>
      <p>Age: {props.age}</p>
    </div>
  );
};
ReactDOM.render(
  <User firstName="Waye" age="35" />,
  document.getElementById('app')
);
```

## Advantages to use Stateless functional components
* They are faster than class based components
    - Don't have to extend React.Component
    - No code to have to worry about managing the state
    - Lots of overhead we don't have to use
    - Easier to write
    - Easier to test

## Convert Action to FSC
* Old way:

```
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
```

## SFC
```
const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};
```

## Challenge
* Change `Options`, `Option` and `Header` to SFCs

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: [],
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

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

// class Header extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <h2>{this.props.subtitle}</h2>
//       </div>
//     );
//   }
// }
//
const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};

// class Action extends React.Component {
//   render() {
//     return (
//       <div>
//         <button
//           onClick={this.props.handlePick}
//           disabled={!this.props.hasOptions}
//         >
//           What should I do?
//         </button>
//       </div>
//     );
//   }
// }

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      <p>Options here</p>
      {props.options.map(option => <Option key={option} optionText={option} />)}
      <Option />
    </div>
  );
};

// class Options extends React.Component {
//   render() {
//     return (
//       <div>
//         <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//         <p>Options here</p>
//         {this.props.options.map(option => (
//           <Option key={option} optionText={option} />
//         ))}
//         <Option />
//       </div>
//     );
//   }
// }

const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
    </div>
  );
};

// class Option extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>{this.props.optionText}</p>
//       </div>
//     );
//   }
// }

class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined,
    };
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return { error };
    });

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

// const User = props => {
//   return (
//     <div>
//       <p>Name: {props.firstName}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

* No comments

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: [],
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

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Action = props => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={!props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      <p>Options here</p>
      {props.options.map(option => <Option key={option} optionText={option} />)}
      <Option />
    </div>
  );
};

const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined,
    };
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return { error };
    });

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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```


