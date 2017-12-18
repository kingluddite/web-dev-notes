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


