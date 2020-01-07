## Run our app (if not already running)

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

# Saving Loading Options Data
* Use `localStorage` and LCMs save our items and refresh them when the user comes back
* This enables us to persist options between page loads

## Let's see how localStorage works
* Just a key/value store

`> localStorage.setItem('key', 'value')`

* Try it out to **Set** localStorage

`> localStorage.setItem('name', 'John Wayne')`

* Try it out to **Get** localStorage

`> localStorage.getItem('name')`

* That will return `"John Wayne"`

## Refresh page and rerun the get and you'll still get the name
* It will persist between pages so it will make a good way to pretend we have a database

## Remove items with localStorage
`> localStorage.removeItem('name')`

* Now `getItem('name')` doesn't work because there is nothing in localStorage

**IMPORTANT** `localStorage` only works with string data
* If you try to save a **number**, `localStorage` would implicitly convert it into a string

`localStorage.setItem('age', 100);`

`localStorage.getItem('age')` // gets "100"

* `"100"` is a string, it was converted

## Hmmm... So then how can we work with objects and arrays (this is the stuff we want to store - we don't want to store strings and numbers - I want to store the entire options array so I can grab it later on)?

## JSON to the rescue!!!!
* JavaScript Object Notation (that's what JSON stands for)
* We will use JSON data
* JSON is a string representation of a JavaScript object or array

## JSON.stringify()
* Will take a regular JavaScript object and turn it into the string representation of that object

## JSON.parse()
* Will take the string representation and return a true JavaScript object

`> JSON.stringify({ age: 25 })`

----> outputs ---> `"{"age":25}"`

* We'll save this string to a variable

### store our data
`> const json = JSON.stringify({ age: 25 });`

* Parse it back into an object

`> JSON.parse(json)`

Returns ----> `{age: 25}`

* This gives us a real object back
  - We could store that object in a variable
  - We can access properties of that object `JSON.parse(json).age` will give us `26`
* By using `localStore` and the JSON methods will be able to save our array and fetch it back

### Back to our code and test this:
* Click `Remove all` button in UI 10 times and you will see `saving data` in console was fired 10 times
* For efficiency we don't need to keep saving this every time because we are saving data that already exists inside the Database
  - `componentDidUpdate()` will continue to fire even if those items in `state` didn't change
  - Changing the `state` from an empty array to a new empty array is considered a change in `state`
  - We will use an `if` conditional to see if the options array length changed
    + If `prevState.options.length !== this.state.options.length` are not equal than fire the log

```
// MORE CODE

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      console.log('saving data');
    }
  }
// MORE CODE
```

* Now the log will only fire if there was really a change in state

## Now let's use localStorage
* We want to grab our options array and store it inside localStorage and we will do this every time state options change

```
// MORE CODE

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
// MORE CODE
```

* Add some items in the UI of your app
* Now use the client console and type `> localStorage.getItem('options')`
* You will see the items you added in localStorage

![localStorage items](https://i.imgur.com/kZEY50V.png)

## Now we need to read that data in and use this.setState() to set the state based off of whatever data is setting inside of localStorage
* We need to read the localStorage `options`

```
// MORE CODE

  componentDidMount() {
     const json = localStorage.getItem('options');
  }
// MORE CODE
```

* Now we need to get a real JavaScript object back and we'll use:
  - `JSON.parse(json)` and store that inside a variable

```
// MORE CODE

  componentDidMount() {
    const json = localStorage.getItem('options');
    const options = JSON.parse(json);

    this.setState({
      options,
    });
  }
// MORE CODE
```

## This IS WRONG!!!!!
* Remember we need to pass our updater function to `setState()`
* And we want to implicitly return an object

```
// MORE CODE

  componentDidMount() {
    const json = localStorage.getItem('options');
    const options = JSON.parse(json);

    this.setState(() => ({
      options,
    }));
  }
// MORE CODE
```

* Now add options and refresh page and you will see the option items remain!
* We have a "poor man's Database using localStorage"

## How do we handle edge cases?
* What if there is no valid data inside of options?

### localStorage.clear()
* This will clear every single value inside localStorage
  - All key/value pairs get wiped!
* Now try to see if you get any options back

```
> localStorage.getItem('options'); // null
```

* What happens if we pass `null` into JSON.parse(null)?
  - That will return `null`
  - So we need to check if `null` is returned and if it is do nothing

```
// MORE CODE

  componentDidMount() {
    const json = localStorage.getItem('options');
    const options = JSON.parse(json);

    if (options) {
      this.setState(() => ({
        options,
      }));
    }
  }
// MORE CODE
```

## Now if we pass bad JSON like this:
```
> JSON.parse('[12}')
```

That will error with :
```
Uncaught SyntaxError: Unexpected token } in JSON at position 3
    at JSON.parse (<anonymous>)
    at <anonymous>:1:6
```

* This is an error we need to look out for and if there is bad JSON passed we'll use `TRY/CATCH` to look out for it

## Try/Catch
* We are going to try some code and catch any errors
```
// MORE CODE

  componentDidMount() {
    try {

    } catch (e) {

    }

    const json = localStorage.getItem('options');
    const options = JSON.parse(json);

    if (options) {
      this.setState(() => ({
        options,
      }));
    }
  }
// MORE CODE
```

## Now add the code we want to try
```
// MORE CODE

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({
          options,
        }));
      }
    } catch (e) {}
  }
 
// MORE CODE
```

* It will run all the code in the `catch`

## What do we want it to do if there are any errors?
* Do nothing at all
* If there is invalid JSON do nothing
  - That is what the `catch` is for

```
// MORE CODE

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({
          options,
        }));
      }
    } catch (e) {
      // do nothing at all!
    }
  }
// MORE CODE
```

* If the JSON data is invalid we're not going to do anything, we'll just fall back to the empty array which is the default value
* This means we'll only use `this.setState()` if it is valid JSON and if it actually exists if its not just `null`

## Now all our edge cases are dealt with
* Test in UI
* Add 3 items in and the app should work as expected

## Add 2 small tweaks to our app
* Inside `AddOption` component
  - We are currently just setting the error and clearing the error
    + If there is no error that comes back we'll clear it
    + If there is an error we are going to set it

```
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
// MORE CODE
```

## But we also want to clear the input
* But only clear the input if there wasn't an error
  - If the user did submit the form we don't want to just wipe the data, we'll just give them another chance to submit it

```
// MORE CODE

  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    this.setState(() => ({
      error,
    }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }
// MORE CODE
```

* That change makes sure that when we do submit data the input gets wiped

## Add a message when there is no data
* Inside `Options`

```
// MORE CODE

const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    <p>Options Text</p>
    {props.options.length === 0 && (
      <p>Currently no options. Please add one to get started</p>
    )}
    {props.options.map(option => (
      <Option
        key={option}
        optionText={option}
        handleDeleteOption={props.handleDeleteOption}
      />
    ))}
  </div>
);
// MORE CODE
```

* Now if there are no options the user will be prompted to add options

## Test it out in UI






















```
componentDidUpdate(prevProps, prevState) {
  if (prevState.options.length !== this.state.options.length) {
    console.log('saving data');
  }
}
```

* Add an option and you'll see `saving data` in console

## View it!
* `Chrome Dev Tool > Application > Storage > Local Storage > http://127.0.0.1:8080`

* You will see something like this:

![localStorage and options](https://i.imgur.com/9hwKMw4.png)

* Manually get it back
* `> localStorage.getItem('options')`

## Make our UX store our data
```
componentDidMount() {
  const json = localStorage.getItem('options');
  const options = JSON.parse(json);

  this.setState(() => ({ options }));
}
```

* And now our options persist between pages
* Don't believe me? Make changes and refresh your browser

## Edge cases
* What if there is no valid values in localStorage?
    - Clear localStorage with:

`> localStorage.clear()`

* This will return null

`> localStorage.getItem('options')` // null

`> JSON.parse(null)` // null

* We don't want to return `null`

```
componentDidMount() {
  const json = localStorage.getItem('options');
  const options = JSON.parse(json);

  if (options) {
    this.setState(() => ({ options }));
  }
}
```

## What if the data inside `options` isn't valid JSON?
`> JSON.parse('[123}')`

* Will generate this error:

![JSON parse error](https://i.imgur.com/rtCZJMH.png)

* We need to try and catch this error so it doesn't crash our program

```
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
```

## fix options:
```
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
```

* Now removed bulky paragraph
* Show a message if options empty
* Remove extraneous `<Option />`
