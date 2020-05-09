# Indecision State: Part 1
* We will use `counter-example.js` as a model for the conversion of `app.js`

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
* Remove all options temporarily from the state and you will see the button is disabled

## How do we manipulate this array
* This is a more interesting problem
* In previous examples this wasn't an issue because we had a single component, the single component just registered that click handler or form submit event and then in its callback method it just called this.state

### But in this new problem we have children components
* And these children need to be able to manipulate the state of the parent
  - Example: `<AddOption />`
    + Needs to be able to get the text from the user and then it needs to be able to manipulate the `this.state.options` inside the parent Indecision component
      * It has to add something onto that array that needs to be rendered
    + **ALSO** `<Options />` itself also needs to be able to manipulate the parent component options state (IndecisionApp)
      * To remove an individual option or remove all of them

#### What do we need to do to make this happen?
* In order to accomplish manipulating a parent state component from a child components is we'll need to run some code in the parent component based off of events that actually trigger down below

#### But aren't props a one way street?
* Yes they are, they only go from the parent to the child
  - This means IndecisionApp can pass props to:
    + Header
    + Action
    + Options
    + AddOption
  - But those child Components can't pass props up to their parent component `IndecisionApp`

##### Solution to one-way data flow ----> Pass functions in as props 
```
// MORE CODE

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['Item One', 'Item Two', 'Item Three', 'Item Four'],
    };
  }
  // handleDeleteOptions
// MORE CODE
```

* `handleDeleteOptions()` is a method that will have all the logic for wiping the array using this.setState()
  - We'll pass that in wherever it's needed and that child component it can call the function that gets passed down as a prop to actually take that action
    + Long Story Short - It will be able to delete all of those options from the array

### Steps to get this done
1. Define a method and this method will call `this.setState()`
  * We won't need to pass in any arguments to `handleDeleteOptions()`
  * We won't need to use `prevState` inside our `this.setState()`

```
// MORE CODE

  handleDeleteOptions() {
    this.setState(() => ({
      options: [],
    }));
  }
// MORE CODE
```

* That's the easy part

## The Tricky Part
* The button that will be clicked doesn't live inside of the IndecisionApp render() method
  - Instead we'll pass it down inside of `<Options />` where the button does live

`app.js`

```
// MORE CODE

  render() {
    const title = 'Indecision App';
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption />
      </div>
    );
  }
// MORE CODE
```

* By passing the function as a prop we will have access to this method via this prop name inside of the `<Options />` component
  - **note** Previously we defined our own method for `handleRemoveAll()` method inside of `<Options />` component but we will delete this entirely as we no longer need it
  - **WE WILL ALSO DELETE THE CONSTRUCTOR METHOD**
    + If there is no state and there is no method there is no reason to bind it
    + This will leave just the `render()` method in place inside `<Options />` component
    + **note** Don't forget to also remove the `handleRemoveAll` reference inside the button and replace it with `this.props.handleDeleteOptions` reference of the method that got passed down from the parent component **IndecisionApp** to the child component `<Options />` 

## This is what Options component looks like now
```
// MORE CODE

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  handleRemoveAll() {
    console.log(this.props.options);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

* And we'll change it to:

```
// MORE CODE

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

### How this will work now
* The handleDeleteOptions method in the parent will be called when the Remove All button is clicked in the child Options component
  - The parent method will wipe the state property of `options`

#### Don't forget to bind!
* We just created a new method inside our IndecisionApp and now we need to remember to bind it otherwise the `this` will be undefined

```
// MORE CODE

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.state = {
      options: ['Item One', 'Item Two', 'Item Three', 'Item Four'],
    };
  }

  handleDeleteOptions() {
    this.setState(() => ({
      options: [],
    }));
  }
// MORE CODE
```

* Click on `Remove All` button in the UI and watch all the options get removed and since there are no more options the `What should I do` button is disabled
* **note** If you refresh the page, the options come back as our change was not persistent (ala... stored in a Database)

## Important - We just learned how to reverse the data flow
* Instead of props only traveling downstream now they can reverse order if you pass a function into a child component as a prop

## Notes on Component state
* Component state can cause an individual component to re-render
* But now we are seeing when the state changes render gets called but is **causes child components to re-render also**
  - What is happening here?
    + Options is getting re-rendered with a brand new set of props
      * `handleDeleteOptions` prop didn't change but the `options` prop passed down to Options did and so React re-rendered the Options child component
      * **IMPORTANT** A component like options can NOT change its own props, new prop values can get passed down from the parent and those will trigger a re-render in the child component
        - **remember** When we first explored props:

##
```
// MORE CODE

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
// MORE CODE
```

* We tried to manually set `this.props.options` equal to an empty array and we get a really long error about how props are read only and they are
  - But it is perfectly valid for a parent component to pass down new prop values and when they do the child component will re-render
  - That is why wiping the array causes all the options to go away in the UI

## Challenge
* Add new method on IndecisionApp parent into the child Action component 
  - Action needs to be able to let IndecisionApp know when someone clicked that `What should I do?` button and that means the parent method needs to randomly pick one of the options and alert it to the screen

### Challenge Instructions
* handlePick - pass down to Action and setup onClick handler - bind in parent
* use past randomly pick an option and alert it
* Remove the `Action` handlePick method as we no longer need it
* Test
  - When you wire up the correct method on onClick to the new prop you should be able to click the `What should I do?` button and it should alert the randomly chosen option
  - The current implementation will always alert `handlePick` as it is hardcoded

## Challenge Solution
* Add new `handlePick()` method inside IndecisionApp
  - Notice how we updated and pointed to `this.state` from the playground example

```
// MORE CODE

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
// MORE CODE
```

* Make sure to bind it so we have access to `this` inside method

```
// MORE CODE

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
// MORE CODE
```

* Pass the `handleClick` method as an event handler to the `<Action />` component

```
// MORE CODE

  render() {
    const title = 'Indecision App';
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
// MORE CODE
```

## Take it for a test drive in the UI
* Click the `What should I do?` button and see the alert pop up with a randomly chosen Option from our IndecisionApp state

## Note - We could have passed the data up
* We will explore this later
* But for now we just wanted to call the function and trigger that action

## Recap
* We learned how to get a child to communicate with it's parent component
* Props are usually a one-way street
  - We worked around this limitation by passing functions down to children, the children then call those functions and that allows us to reverse the data flow
