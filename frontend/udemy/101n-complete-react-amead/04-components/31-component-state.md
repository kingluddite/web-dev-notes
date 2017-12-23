# What is Component State?
* Component state enables our components to manage some data

## We have an object
* Our object has key/value pairs
* When those values change, our object will automatically update with those changes
* Before in `jsx-indecison` we made changes to the array and the only way our array was updated with the new items was by manually calling `render()` each and every time
* With component state, we change the data and the component will handle updating itself

# Slides
* Default state value

## Steps
1. Setup default state object

![default state object](https://i.imgur.com/YKCaEdI.png)

```js
{
    count: 0
}
```

* Our Component renders itself the very first time using the default values
* `render()` gets called and count is set to `0`

2. Component is rendered with default state values `*`
    * Happens behind the scenes
    * We do nothing for this to happen
    * Happens automatically

* We click button and code runs

![click button and code runs](https://i.imgur.com/S0aT99m.png)

3. State changes based on some event

* Click on button and state changes from 0 to 1

4. Application re-renders itself `*` and this will change 0 to 1 in the UI

5. Rinse and repeat starting at step 3

**note** Our state is just an object

## Coding state
`src/playground/counter-example.js`

```
class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>Count: </h1>
        <button>+1</button>
        <button>-1</button>
        <button>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
```

* Just shows static stuff

## Coding methods
### Challenge
* Create 3 methods: handleAddOne, handleMinusOne, handleReset
* Use console.log to print method name
* Wire up onClick & bind in the constructor

### Challenge Solution
```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleAddOne() {
    console.log('handleAddOne');
  }

  handleMinusOne() {
    console.log('handleMinusOne');
  }

  handleReset() {
    console.log('handleReset');
  }

  render() {
    return (
      <div>
        <h1>Count: </h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
```

## Next - 5 steps to setup Component state
### Step 1 Setup a default state object
### Step 2 Render Component with default state value

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

  handleAddOne() {
    console.log('handleAddOne');
  }

  handleMinusOne() {
    console.log('handleMinusOne');
  }

  handleReset() {
    console.log('handleReset');
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
```

* That sets up the default count of 0 for our app
* Change the `0` in the state of the contructor to `1000` and you'll see our UI update automatically
* Change it back to `0`

### Change state based on event
#### Don't do this - It won't work!
```js
handleAddOne() {
    this.state.count = this.state.count + 1;
    console.log(this.state);
  }
```

* If you click button you'll see count increases by 1 but the UI doesn't update with the new value of `count`

#### The right way is `this.setState`
```js
handleAddOne() {
    this.setState(() => {
      return {
        count: 1,
      };
    });
  }
```

* That will update count from 0 to 1 but it stays at 1 with every new click
* The state is getting manipulated (good)
* The component is automatically refreshing (good)
* **note** We have access to the current value of state in `prevState` the first argument of `setState`
    - `prevState` is our state object BEFORE the new state changes have been applied

## Questions about state
* If you have a large state with lots of key/value pairs you don't always have to update all the state keys, only update what you want to change
* The keys won't get updated

```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      count: 0,
      name: 'John',
    };
  }

  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1,
      };
    });
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1,
      };
    });
  }

  handleReset() {
    this.setState(() => {
      return {
        count: 0,
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <p>{this.state.name}</p>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
```

* That increases, decreases and resets count state

## Alternative setState syntax
* This is the older approach to React state
* You pass an object directly in, instead of a function
* Passing in a function is the preferred way and more modern way
* Rumor is future versions of React will degregate the old way of passing a function into state

```js
handleReset() {
  // this.setState(() => {
  //   return {
  //     count: 0,
  //   };
  // });
  this.setState({
    count: 0,
  });
}
```

* That works
* But...

```js
handleReset() {
    // this.setState(() => {
    //   return {
    //     count: 0,
    //   };
    // });
    this.setState({
      count: 0,
    });
    this.setState({
      count: this.state.count + 1,
    });
  }
```

* Causes a problem
* You would think that the value will always be 1 (0 + 1)
* But it isn't
* Instead it just increments the value by 1 from the state's current value

## Why?
* **note** The calls to `this.setState()` are asynchronous
    - That means just because we called this.setState() to change the value of `state` doesn't mean the value of setState will change the value of state on the very next line
    - So using the old way runs into problems of accessing stale and outdated data
    - The solution is to ALWAYS use `this.setState()` and pass it a function NOT AN OBJECT

## Let's show how the new way works
```
handleReset() {
    this.setState(() => {
      return {
        count: 0,
      };
    });
    this.setState(prevState => {
      return {
        count: prevState.count + 1,
      };
    });
    // this.setState({
    //   count: 0,
    // });
    // this.setState({
    //   count: this.state.count + 1,
    // });
  }
```

* Now state is working as it should (reset always prints out `1`)

## Final code for this chapter
```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      count: 0,
      name: 'John',
    };
  }

  handleAddOne() {
    this.setState(prevState => {
      return {
        count: prevState.count + 1,
      };
    });
  }

  handleMinusOne() {
    this.setState(prevState => {
      return {
        count: prevState.count - 1,
      };
    });
  }

  handleReset() {
    this.setState(() => {
      return {
        count: 0,
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <p>{this.state.name}</p>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleMinusOne}>-1</button>
        <button onClick={this.handleReset}>reset</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));
```
