# Default prop values
## Run our app (if not already running)

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Default prop values can be added to Stateless Functional Components (SFC) or Class-based components (CBC)

## Let's look at Header component
* Set up a **default prop** for `title` so it didn't need to be provided
* Set up a `subtitle` to not have a subtitle and if it isn't provided to remove the h2 altogether

## defaultProps
* `defaultProps` is just an object
* We can add this property to our component using [OurComponent].defaultProps
* Can be added to CBC or SFC

### add defaultProps to Header
* Before

```
// MORE CODE

const Header = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
}
// MORE CODE
```

* Now let's add `defaultProps`

```
// MORE CODE

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>
);

Header.defaultProps = {
  title: 'This is my default title!',
};
// MORE CODE
```

* And remove title prop from getting passed into Header

```
// MORE CODE

        <Header title={title} subtitle={subtitle} />
// MORE CODE
```

* To this:

```
// MORE CODE

        <Header subtitle={subtitle} />
// MORE CODE
```

## Now test in UI browser
* You will see a title rendered `This is my default title!`
* Undo change and since a prop was passed in that prop value is now used

### We'll set our title to Indecision by default
* And users can override this if they want to
* But since we are on a page where we want the title to be Indecision we can remove the prop passed to head and the title variable

```
// MORE CODE

  render() {
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header subtitle={subtitle} />
// MORE CODE
```

## Only show a subtitle if a subtitle prop was passed
```
// MORE CODE

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
);
// MORE CODE
```

* Now it will only show a subtitle if a subtitle prop was provided to the Header component
* This makes our component more flexible

## Let's add default props to CBCs
* By default our IndecisionApp has no options when it is first mounted
* But let's give the user the ability to pass in starting app options if they want

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: props.options,
    };
  }

  // MORE CODE

  render() {
   // MORE CODE
  }
}

IndecisionApp.defaultProps = {
  options: [],
};

// MORE CODE

ReactDOM.render(
  <IndecisionApp options={['one', 'two']} />,
  document.getElementById('root')
);
```

* Now you can override the default empty array for the options state

## Leave off options so set this back to the way it was:
```
ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

## Challenge
* Do this for Counter CBC

### Instructions
* Allow counter to take a prop count
  - If that prop exists we'll use it's value as the default state value
  - If it doesn't exist we'll set up a default value of 0

`$ babel src/playground/counter-example.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Solution
```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: props.count,
    };
  }
  handleAddOne() {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  }

  handleMinusOne() {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  }

  handleReset() {
    this.setState(prevState => ({
      count: 0,
    }));
  }
  render() {
    return (
      <div>
        <h1>Count: {this.state.count} </h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

Counter.defaultProps = {
  count: 0,
};

ReactDOM.render(<Counter count={5} />, document.getElementById('root'));
```

## Put code back to app.js
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Next
* Debug React code
