# Indecision State: Part 1
* We will use counter-example.js as a model for the conversion of app.js

## Goal
* Take data inside like `options` and turn it into state
* We will eventually start with an empty array but for now we'll start with dummy data

`app.js`

```
// MORE CODE

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['Item One', 'Item Two', 'Item Four'],
    };
  }
  render() {
// MORE CODE
```

* We then can delete our hardcoded options variable and value and set the Options component prop value to `{this.state.options}`

## Save and render to screen
* Make sure to point babel to app.js

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## View in browser
* Should look just like it did before
* But add an item to the options state:

```
// MORE CODE

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['Item One', 'Item Two', 'Item Three', 'Item Four'],
    };
  }
// MORE CODE
```

* And now the UI updates instantly with the new item

## Action component
* We will use the `options` state array inside of the <Action /> component
* Action renders the `What should I do button?` and that button should only be enabled if there are actually buttons in the array

```
// MORE CODE

  render() {
    const title = 'Indecision App';
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action options={this.state.options} />
// MORE CODE
```

* And only show if there are items in the array

```
// MORE CODE

class Action extends React.Component {
  handlePick() {
    alert('handlePick clicked');
  }

  render() {
    return (
      <div>
 {this.props.options.length > 0 &&  <button onClick={this.handlePick}>What should I do?</button>}

      </div>
    );
  }
}
// MORE CODE
```

* View UI and you'll see button
* Temporarily remove all options from array and the button disappears

## A better way
* Send a boolean value as a prop to Action
* Check if there is a length > 0 in this.state.options
* In Action, don't hide the button completely but just disable it
* Use the `!` Not operate to reverse the value of `hasOptions` 

```
// MORE CODE

  render() {
    const title = 'Indecision App';
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} />
// MORE CODE
```

* And in Action

```
// MORE CODE

class Action extends React.Component {
  handlePick() {
    alert('handlePick clicked');
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
// MORE CODE
```

## View in UI
* The button is enabled
* Remove all options temporarilly from the state
