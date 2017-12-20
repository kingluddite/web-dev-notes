# Add localStorage to counter example
* We won't need JSON because we are working with numbers
* But our numbers are converted to strings

```
> const num = '12';
< undefined
> num + 1
< "121"
```

* You might expect 12 + 1 = 13 but when they are strings they are concatentated to form "123"

## parseInt()
* Takes a string and converts it to a number

```
> parseInt(num)
< 12
parseInt(num) + 1
< 13
```

* Excellent!
* We can convert strings to numbers

## What if you parseInt a string?
```
> parseInt('abc', 10)
< NaN
> "a" * 33
< NaN
```

## Check to make sure NaN
```
> isNaN('a' * 33)
< true
> isNaN(1 + 1)
< false
```

## No Props
* Since we are reading from localStorage no need to pass a prop anymore so we can:
* Set the default state for IndecisionApp to an empty array
* and remove the defaultProps
* Do the same for the counter app

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.state = {
      options: [],
    };
  }

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

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option),
    }));
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
    this.setState(prevState => ({
      options: prevState.options.concat(option),
    }));
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

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecison',
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
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      <p>
        {props.optionText}{' '}
        <button
          onClick={() => {
            props.handleDeleteOption(props.optionText);
          }}
        >
          remove
        </button>
      </p>
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

    this.setState(() => ({ error }));

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

## Challenge
* Do what we did for our app for the counter app
    - Add LifeCycle methods
    - Remove defaultProps
    - Set default value of state to 0
    - Use localStorage to save count to localStorage

### Solution
`$ babel src/playground/counter-example.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Calls to DB can be expensive so you want to check if there is a change before you make the call

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    localStorage.setItem('count', count);
  }
}
```

* We check that there is a difference in our `count` value

```
> localStorage.getItem('count')
> "2"
```

* Our count is a string
* Now we set up `componentDidMount()` and get the string from localStorage

```js
componentDidMount() {
  const stringCount = localStorage.getItem('count');
  const count = parseInt(stringCount, 10);

  if (!isNaN(count)) {
    this.setState(() => ({ count }));
  }
}
```


