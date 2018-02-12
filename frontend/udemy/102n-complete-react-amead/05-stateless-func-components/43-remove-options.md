# Remove Options
## Fix verbose code (refactor)
```js
handleDeleteOptions() {
  this.setState(() => {
    return {
      options: [],
    };
  });
}
```

* We can make this shorter
* We are just setting options to an emtpy array but it takes us 5 lines:

```js
this.setState(() => {
  return {
    options: [],
  };
});
```

### Arrow functions give us shorthand syntax
* When arrow function returns some value
* We can just put the value on the right instead of putting the curly braces

`const num = () => 12 + 12; // 24`

* Same with an array

`const nums = () => [1, 2, 3]`

* But what about an `object`?
    - Because it uses the curly braces

`const nums = () => {}`

* Are those curly braces an object or what the body of the arrow function?
* The trick with objects if we want to implicitly return an object we have to wrap it in `()`

`const nums = () => {{}}`

* This will return an empty object
* But this would see nothing so it will return `undefined`

`const nums = () => {}`

* Here is our improvement

```js
handleDeleteOptions() {
  this.setState(() => ({ options: [] }));
}
```

* Test to see if it still works
* We went from 7 lines to 3 lines

## Challenge
* Change other 2 `setState` to new less verbose format

```js
this.setState(prevState => ({
  options: prevState.options.concat(option),
}));
```

`this.setState(() => ({ error }));`

* Test
* Make sure error comes and goes away as expected

## Remove Items
* Remove all (Already completed this task)
* Remove individual items
* We will have to push data down to Options and then down to Option

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    // Add this line below
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    this.state = {
      options: this.props.options,
    };
  }

  // MORE CODE

  handleDeleteOption(option) {
    console.log('hdo', option);
  }

  // MORE CODE

  render() {
    // add code inside Options
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

// MORE CODE

// pass props into Options
const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      <p>Options here</p>
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
      <Option />
    </div>
  );
};

// User props to access handleDeleteOption method
const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
      <button onClick={props.handleDeleteOption}>Remove Option</button>
    </div>
  );
};

// MORE CODE
```

* Click button but we don't get what we want
* We get `hdo` and the event 
  - We don't want the event
  - We want the `options` text instead
    + A few different ways to get this done

### Way 1
* Change how `option` works
* Instead of passing in option, we'll define an inline arrow function

```
const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
      <button
        onClick={() => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        Remove Option
      </button>
    </div>
  );
};
```

* Now add an item
* Click Remove Option
* You should see a log of that item you removes
* Now we are explicitly passing the data up to our handleDeleteOption method
* It works and gets the date to the right place but doesn't manipulate it in any meaningful way

## Stuff we'll do
* We'll go into this method:

```js
handleDeleteOption(option) {
  console.log('hdo', option);
}
```

* We'll rewrite this using `this.setState()`
* By implicitly return and object (just learned how to do this) and we'll do this using our arrow function
* We will update the `options` array in our state
* We'll need to use `prevState` to get the old value and then we'll use the **filter array method** to grab all our state and remove the `option` we passed into the `handleDeleteOption` method

## Array.prototype.filter()
* [link to mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### What does filter() do?
* Like `.map()` and `.forEach()` it takes a callback function
* It gets called one time for every item
* It enables you to filter various items from an array and it returns a brand new array with just the filtered items
  - So we will use `filter()` to give us an new array with all or original items minus what we deleted and that will be our new state for `options`

```js
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

* Each item of the array is evaluated individually
* If condition is `true` it is included in new array
* If `false` it is not included in new array

```js
handleDeleteOption(option) {
  this.setState(prevState => ({
    options: prevState.options.filter(option => {
      return false;
    }),
  }));
}
```

* That won't work because if we add 3 items
* And click `Remove Option` on any item, they are all removed because we return `false` for each item and that removes all items from `options`
* And we set our state to an empty array and that updates the UX to have all options gone
* If we statically returned `true` nothing would get deleted
  - We need conditional logic inside here to make this work properly
  - The problem is we have two variable named `option` so we need to rename on

```js
handleDeleteOption(optionToRemove) {
  this.setState(prevState => ({
    options: prevState.options.filter(option => {
      return optionToRemove !== option;
    }),
  }));
}
```

* And that does the trick
* Add 3 items
* Remove 1 and watch how that items if instantly removed from the UX

## Refactor with:
```js
handleDeleteOption(optionToRemove) {
  this.setState(prevState => ({
    options: prevState.options.filter(option => optionToRemove !== option),
  }));
}
```

## Summary
* We passed down props through multiple layers

### Notes
#### Why does onClick not execute immediately when assigning it an arrow function?

* Why does this code not get immediately executed:

```js
onClick={(e) => {
    props.handleDeleteOption(props.optionText)
 }}
```

* And this code does get immediately executed:

`onClick={props.handleDeleteOption(props.optionText)}`

* Also, Why are we passing in the event information (`e`) when it is not being used for anything?

### Answer
* In the first example, you're simply passing in a function to onClick to be executed at a later time (when the element is clicked)
* In the second example you're invoking a function immediately and passing the return value to onClickj
