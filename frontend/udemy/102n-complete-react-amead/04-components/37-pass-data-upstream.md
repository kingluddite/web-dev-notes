# Reverse the data flow and pass data upstream
* Reverse data flow
* Pass data upstream

## Create a new method in IndecisionApp that takes an argument
* It will take the option test of the new option tag
* It will come from the `<AddOption />` component
    - This is where our form lives
    - We want to do 2 things:
        1. Call our parent component method
        2. We want to pass data up

## Create new handleAddOption() method
* It will take an argument `handleAddOption(option)`

### Let's test
* We'll wire it up with a simple log to make sure the click event triggers the event handler

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this); // add this
    // MORE CODE

  }

 // MORE CODE

  handleAddOption(option) {
    console.log('handleAddOption fired');
  }

  render() {

// MORE CODE
```

* We add the method with the argument
* Add a simple log statement
* Bind the `this` inside the `constructor`

### Pass down the method to the child AddOption component
`app.js`

```
// MORE CODE

        />
        <AddOption handleAddOption={handleAddOption} />
      </div>
    );
  }
}
// MORE CODE
```

### Now we'll call the method inside AddOption and pass up the data
* Change from:

```
// MORE CODE

class AddOption extends React.Component {
  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      alert(`The selected Option is ${optionSelected}`);
    }
    e.target.elements.option.value = '';
  }
// MORE CODE
```

* To this:

```
// MORE CODE

class AddOption extends React.Component {
  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      this.handleAddOption(optionSelected);
    }
    e.target.elements.option.value = '';
  }
// MORE CODE
```

## Question: Why keep AddOption method
* Before we deleted the methods and added them to the parent
* But in this case it makes sense to keep the methods inside the AddOption component

### Ooops we are using `this` inside AddOption
* Yes we are and this means we need to add a constructor function to add our `this` bind` code

```
// MORE CODE

{
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      this.handleAddOption(optionSelected);
    }
    e.target.elements.option.value = '';
  }

  render() {

// MORE CODE
```

* Now we have 2 handleAddOptions methods
    - One in child component
        + This is the one built into the component that is in charge of doing something when the form is submitted
    - One in parent component
        + And this is the method passed down from the parent and this is what will actually get things manipulated in terms of the parent component state

## But we aren't manipulate state yet
* We just have a test log so let's test if it is working

```
// MORE CODE

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      this.props.handleAddOption(optionSelected);
    }
    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

* I had to rename `handleFormSubmit` method to `handleAddOption` to get rid of binding error
* Now when add a form in input and submit it will log out the item you added

## But I didn't need to do that
* All I needed was to rename my constructor binding to point to the method used which was `handleFormSubmit`

```
// MORE CODE

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      this.props.handleAddOption(optionSelected);
    }
    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

## Test
* Enter item in input and submit form and you will see the log `handleAddOption` fired
* Congrats! We just sent data from a child component to the parent `IndecisionApp` component

## Now let's manipulate our parent state with this event
* We'll need to replace our parent method log with a call to `this.setState()`
* Do we care about prevState?
    - Yes we do!
    - We want to make sure we keep all existing options around

#
```
// MORE CODE

  handleAddOption(option) {
    this.setState((prevState) => {
      return {
        options
      }
    })
  }
// MORE CODE
```

## Important Question - How do we compute the new array?
* We could try this approach:

```
// MORE CODE

  handleAddOption(option) {
    prevState.options.push(option);
    this.setState(prevState => ({
        options
      }));
  }
// MORE CODE
```

* But that would mean we would be directly manipulating the this.state object which WE DO NOT EVER WANT TO DO!
* We never want to manipulate the state or prevState directly
* We just want to compute a new one

## array.concat() method
* This will allow us to merge the values from this array `prevState.options` with something new without affecting this array `prevState.options`

## Let's explore Array.concat()
* [docs for Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

```
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

* We have 2 arrays
* We join them together without manipulating the orignal array
* So we will grab our original state array `prevState.options` and we will set the value of our options state to that concatenated with the new array and that will be set the the value of our `this.options.state`

```
class IndecisionApp extends React.Component 

// MORE CODE

  handleAddOption(option) {
    this.setState(prevState => ({
        options: prevState.options.concat([option])
      }));
  }
// MORE CODE
```

* **note** We add our option by placing it inside an array
    - Now we can concatenate our array in options with our one option that is also in an array and joining them together into one new array and then setting that new array to the value of our existing `options` state `array`

## Houston we have an error
* `this.setState()` is not a function
* You forgot to bind! `this` will not work inside our `handleAddOption` method unless we bind it inside the constructor like this:

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this); // add this
    this.state = {
      options: ['Item One', 'Item Two', 'Item Three', 'Item Four'],
    };
  }
// MORE CODE
```

## Take it for a test drive
* Add an option in our form and it will add it to the array in our UI in real time!

## A slight improvement
* We could also just add an item to our array and it will treat it like concatenating 2 arrays

```
// MORE CODE

  handleAddOption(option) {
    this.setState(prevState => ({
      options: prevState.options.concat(option),
    }));
  }
// MORE CODE
```

* I like the array being explicit

## Set our app options array to empty
* This will remove all dummy date when our app starts

```
// MORE CODE

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: [],
    };
  }
// MORE CODE
```

* View the app in the UI and you will see the list is empty at the start

## Add some client side validation
* Make sure no empty strings get passed in as our options
* We'll add a string that fires if an empty string was sent as an argument to our `handleAddOption` parent method and if so it will send the string down to the child component

```
// MORE CODE

  handleAddOption(option) {
    if (!option) {
      return 'Enter a valid value to add item'
    }

    this.setState(prevState => ({
      options: prevState.options.concat([option]),
    }));
  }
// MORE CODE
```

* If option is not empty it will be truthy but if it contains an empty string it will be falsey so we check if it is falsey and return a string to let the user know they filled out the form incorrectly and need to make a change with valid data and resubmit

## Check if the option already exists
* We can use the arrays `indexOf()` method to check our entire array to see if the item already exists as an option in our state array
    - indexOf will return the 0 based index of the item if it exists and -1 if it doesn't exist at all

```
// MORE CODE

  handleAddOption(option) {
    if (!option) {
      return 'Enter a valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Item already exists. Please enter another Item';
    }
// MORE CODE
```

So if a match is found the returned value will be greater than 1

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
```

* We don't need to add an else as the setState() will fire if the first two conditions are true
* If things went well we won't explicitly return anything so our function will return `undefined`
    - We only explicitly return stuff if things went wrong

## Do stuff inside our handleAddOption method
* We no longer need to check if there was an option because we added client side validation to make sure an option is passed

```
// MORE CODE

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      this.props.handleAddOption(optionSelected);
    }
    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

* And we'll remove the option condition

```
// MORE CODE

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    this.props.handleAddOption(optionSelected); // move this line
    if (optionSelected) {
    }
    e.target.elements.option.value = '';
  }
// MORE CODE
```

* Now if there is no option provide (empty string) our parent method will return a string error message and we can capture this error or the duplicate string error message in a variable

```
// MORE CODE

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    if (optionSelected) {
    }
    e.target.elements.option.value = '';
  }
// MORE CODE
```

* How will we introduce the error here? Using Component state!

## Now we'll have state in our parent component and a child component too `AddOption`

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: [],
    };
  }

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
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

// MORE CODE


class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      error: undefined,
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    this.setState(() => ({
      error,
    }));
    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));

// MORE CODE
```

* If the state is not set we'll set it to `undefined` at the start of the component mounting
* If there is an error we update the state of our AddOption component and render that error to the page if there is one

## Test and see the error is working
* On dupe options and empty string options



