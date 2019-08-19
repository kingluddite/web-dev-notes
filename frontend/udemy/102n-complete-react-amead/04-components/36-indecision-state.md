# Indecision State
![indecisionapp](https://i.imgur.com/Jl6bEQl.png)

# 5 steps in setting up state
1. Setup default state object
2. Component rendered with default state values*
3. Change state based on event
4. Component re-rendered using new state values*
5. Start again at 3

## 1. Setup default state object
* This happens inside of the constructor function

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0,
    };
  }
// MORE CODE
```

* state is now set up with default value

## Step 2 - when Component is rendered it uses state value

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0,
    };
  }

 // MORE CODE

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

ReactDOM.render(<Counter />, document.getElementById('root'));
```

* View the UI and you will see `Count: 0` in browser
* Now we will see the value of the properties we set to a default value when we first render a component

## Step 3: Change the state based off of some event
* We can not directly update the state object 

```
// MORE CODE

  handleAddOne() {
    this.state.count = this.state.count + 1;
    console.log(this.state);
  }
// MORE CODE
```

* Click +1 button and state goes up in the console
  - We see the object is in fact changing but if you look at the UI you will see that the component is not re-rendering itself
* When updating our state we do not manually changing the state
  - Instead we use the setState() method to update our state and this will also re-render our component

```
// MORE CODE

  handleAddOne() {
    this.setState({
      count: this.state.count + 1,
    });
  }
// MORE CODE
```

## prevCount
* We can pass the `setState()` function the first argument which would be the previous state object

```
// MORE CODE

  handleAddOne() {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  }
// MORE CODE
```

* Now we have set up our very first default component state and we've changed state and updated our UI
* That is all 5 steps necessary

Stop at 6:30 in vid
