# Default prop values
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Default prop values can be added to Stateless Functional Components (SFC) or Class-based components (CBC)

## defaultProps
* just an object

```
  render() {
    const subtitle = 'My computer is my BFF';

    return (
      <div>
        <Header />
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
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecison',
};

```

* We removed the **title** `prop` passed down to `<Header />` but because of the `defaultProp` we give **title** a default `prop`
* Also removed the variable `title` up top
* Conditionally show subtitle
    - No H2 if we don't pass in the subtitle
    - But if we do the text and surrounding h2 tags will appear
* Add back in the subltitle

```
return (
  <div>
    <Header subtitle={subtitle} />
```

## Add default options to the parent app containing component
```
class IndecisionApp extends React.Component {
  constructor(props) {
    // MORE CODE

    this.state = {
      options: this.props.options,
    };
  }

  // MORE CODE
  }
// MORE CODE
}

IndecisionApp.defaultProps = {
  options: [],
};

// MORE CODE
ReactDOM.render(
  <IndecisionApp options={['manny', 'mo', 'jack']} />,
  document.getElementById('app')
);
```

* We create the `defaultProps` and assign it to an empty array
* We set the state `options` to `this.props.options` to use that default value
* Then we pass it in at the bottom to the:

```
ReactDOM.render(
  <IndecisionApp options={['manny', 'mo', 'jack']} />,
  document.getElementById('app')
);
```

* Now the page has manny, mo and jack as the default options

## Summary
* Using defaultProps helps us create reusable components
* Remove default props for now

`ReactDOM.render(<IndecisionApp />, document.getElementById('app'));`

## Challenge
* Create a default prop `count` for `Counter`
* If prop count exists we'll use it for the default value for the Counter state
* If it doesn't exist set up a default prop value to `0`

### Solution
`$ babel src/playground/counter-example.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* That will switch the server to our test file `counter-example.js`

```
class Counter extends React.Component {
  constructor(props) {
    // MORE CODE

    this.state = {
      count: this.props.count,
      name: 'John',
    };
  }

  // MORE CODE

Counter.defaultProps = {
  count: 0,
};
ReactDOM.render(<Counter count="100" />, document.getElementById('app'));
```

* It has 100 as default value
* Remvove 100 in ReactDOM.render() and it goes to the `defaultProps` value of 0

## Switch back to app.js
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`
