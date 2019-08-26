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
* We are just setting options to an empty array but it takes us 5 lines:

```js
this.setState(() => {
  return {
    options: [],
  };
});
```

## Arrow functions give us shorthand syntax
* When arrow function returns some value
* We can just put the value on the right instead of putting the curly braces
  - It is an implicit return

`const num = () => 12 + 12; // 24`

* Same with an array

`const nums = () => [1, 2, 3]`

* But what about an `object`?
    - Because it uses the curly braces `{}`

`const nums = () => {}`

### Are those curly braces an object or are they the body of the arrow function?
* Well, with arrow functions it will treat the curly braces as the function body
  - The trick with objects if we want to implicitly return an object we have to wrap it in `()`

### Return undefined
* This will return an arrow function that returns nothing so we would get `undefined`

`const nums = () => {}`

### Return an empty object
* But if we use this we will get an empty object back

`const nums = () => ({})`

## Using this info we can simplify all our calls to `this.setState()`
* Before

```
handleDeleteOptions() {
  this.setState(() => {
    return {
      options: []
    };
  });
}
```

* After

```
handleDeleteOptions() {
  this.setState(() => ({ options: [] }));
}
```

* Test to see if it still works
* We went from 7 lines to 3 lines

### Eslint and Prettier save us again
* With Eslint and prettier we don't even have to worry about this as it will auto change it to the shorter format and auto-indent for us as well
* But I add these notes so you know what is happening behind the scenes and understand JavaScript and ES6 that much better

## Challenge
* Change other 2 `setState` to new less verbose format
  - You won't have to do this if you are using Eslint and prettier but it is added below in case you are not using them

```
// MORE CODE

  handleAddOption(option) {
    if (!option) {
      return 'Enter a valid value to add option';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists. Please enter another Item';
    }

    this.setState(prevState => ({
      options: prevState.options.concat([option]),
    }));
  }
// MORE CODE

handleFormSubmit(e) {
  e.preventDefault();
  const optionSelected = e.target.elements.option.value.trim();
  const error = this.props.handleAddOption(optionSelected);
  this.setState(() => ({
    error,
  }));
  e.target.elements.option.value = '';
}

// MORE CODE
```

## Test
* Make sure error comes and goes away as expected

## Remove Items
* Remove all (Already completed this task)
* Remove individual items
* We will have to push data down to Options and then down to Option

### We just want to add a delete button beside each option
* Seems simple enough but this is more complex than anything we've done before
  - We will create a new method who's purpose is to take in an option as an argument (the option you want to delete) and use `this.setState()` to delete that option
  - Let's wire up a simple function to test that it is called when triggered by the event handler added to the button
  - We also need to bind this method to give it the ability to use `this` inside it

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    // MORE CODE

);

    this.state = {
      options: props.options,
    };
  }

  // MORE CODE

  handleDeleteOption(option) {
    console.log('hdo', option);
  }
// MORE CODE
```

## Uh OH! This is some pretty complex prop chaining
* We want to pass this method into Option but we don't have direct access to Option but we do have direct access to Options
* Later we'll learn how to add Redux that will make this easier (but adding it will require a much more complex setup)

### The Long Road Round
* Let's pass down the function as a prop first to `Options` and then to `Option`

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);

    // MORE CODE

    this.state = {
      options: props.options,
    };
  }

  // MORE CODE

  handleDeleteOption(option) {
    console.log('hdo', option);
  }

  // MORE CODE

  render() {
    // MORE CODE

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

handleDeleteOption(option) {
    console.log('hdo', option);
  }

  render() {

        // MORE CODE

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

const Option = props => (
  <div>
    <p key={props.option}>
      <strong>Option</strong>: {props.option}
    </p>
  </div>
);
const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    <p>Options Text</p>
    {props.options.map(option => (
      <Option
        key={option}
        option={option}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);

// MORE CODE
```

## Use the method in the props in Option
* Add a button
* Add an event handler calling `handleDeleteOption`

```
// MORE CODE

const Option = props => {
  return (
  <div>
    {props.optionText}
    <button onClick={props.handleDeleteOption}>Remove</button>
  </div>
  )
};
// MORE CODE
```

## Test UI
* Add an option and try to remove it

### Houston we have a problem!
* We don't see what we expect to see and instead when we click we get the `hdo` log but then we also see we are getting the `event` object

![The event object is not what we want to see](https://i.imgur.com/4b1pyQP.png)

* **note** Event handlers get called with the Event object

```
// MORE CODE

  handleDeleteOption(option) {
    console.log('hdo', option);
  }
// MORE CODE
```

* We don't want an event, instead, we want the option text

## How can we do that?
* There are a few ways to accomplish this task
  - The first way would be to change how our `Option` SFC works

#
```
// MORE CODE

const Option = props => {
  return (
  <div>
    {props.optionText}
    <button onClick={props.handleDeleteOption}>Remove</button>
  </div>
  )
};
// MORE CODE
```

* Instead of passing in `props.handleDeleteOption` we will instead define an inline arrow function and pass in our `optionText`

```
// MORE CODE

const Option = props => {
  return (
  <div>
    {props.optionText}
    <button onClick={(e) => {
      props.handleDeleteOption(props.optionText)
    }}>Remove</button>
  </div>
  )
};
// MORE CODE
```

* **note** I swapped out `option` for `optionText` to make the code more readable - make sure to change the attribute in Options (parent component that passes prop into child component Option)

### Take it for a test drive in the UI
* Click button and now you'll see `hdo` + whatever the option text was
* **note** The arrow function gets called with the `e` (event) argument when the button gets clicked

### Not firing console.log inside parent handleDeleteOption
* We need to pass it an argument (the option)
* To pass arguments to methods on an event handler we need to use an inline arrow function like this:

## Replace our console.log() with meaningful app functionality
* We'll use the implicit return syntax we just learned to keep our calls to state lean and mean
* We'll need so we'll use `prevState`

```
// MORE CODE

  handleDeleteOption(option) {
    this.setState(prevState => {
      options: prevState.options
    })
  }
// MORE CODE
```

* But that doesn't really help us because we're not changing anything at all, we are just setting the state's options array to the old value

## Let's use the `filter` array method
* [filter array docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
  - Like `map()` and `forEach()` it takes a callback method and it gets called one time for every item but `filter()` lets you filter various items from an array and returns a brand new array with just the filtered items

### Example
```
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

* We check the length for each word
  - If `>` 6, the callback function returns **true**
  - If it is `<=` 6, the callback function returns **false**
  - When the filter returns true it is included in the new array
  - When the filter returns false it is not included in the array
* We'll use this same technique in our code

## Caution
* Don't forget when using shortcut method to surround your function body curly braces with parentheses or the function won't get called!

### The wrong way
```
// MORE CODE

handleDeleteOption(option) {
    this.setState(prevState => {
      options: prevState.options.filter(option => {
        return false
      })
    })
  }
// MORE CODE
```

### The right way (surround function curly braces with parentheses)
```
// MORE CODE

  handleDeleteOption(option) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return false
      })
    }))
  }
// MORE CODE
```

### But using `return false` means all options are remove with you click on remove button
* We don't want that
* If we statically returned `true` then no items would be removed and we don't want that either
  - We need to add some logic
  - We need to check the option and see if it matches the argument that was passed in
     + We have an issue with clarity both the argument is named `option` and the filter variable is named `option` let's clear this up

##
```
// MORE CODE

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return false
      })
    }))
  }
// MORE CODE
```

* Now we have 2 distinct variables
* If we check for `optionToRemove === option` and that equals true then we keep it - so this would mean the only item we want to delete is the only item we keep and we want the opposite of that, but we don't want that we want to know if `optionToRemove !== option` and if then we remove the option we want to delete from the options state array

```
// MORE CODE

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return optionToRemove !== option
      })
    }))
  }
// MORE CODE
```

## Test
* Add a bunch of items and make sure when you click remove button that item is removed from UI

## Make is less verbose
```
// MORE CODE

  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option =>
        optionToRemove !== option
      )
    }))
  }
// MORE CODE
```

## Test again to make sure it still works

## Recap - Pass method down multiple layers aka child components
* When method is clicked we don't call the method directly or we will be passing the `event` argument up
* But we want to pass in an argument (optionText)
* Using an inline arrow function allows up to pass in the correct data to the parent method

## Rename `.eslintrc` to `OLD.eslintrc`
* Sometimes `.eslintrc` will add too many errors and it gets annoying
* At any time you can disable it by renaming `.eslintrc` to `OLD.eslintrc`
  - Just remember when you enable and disable it (by renaming) you'll need to shut down VS code and open it up again for the changes to take affect










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
