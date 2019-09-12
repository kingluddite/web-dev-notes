# Add localStorage to counter example
* As we count up and down we will store that count
* If the user were to close down the tab and come back we're going to pick up right where they left off
  - We will use LCMs and localStorage to keep track of that count over time

## Do we need to use any of the JSON methods?
* No

### Why not?
* We won't need JSON because we are working a single number

### One thing you need to know
* **remember** `localStorage` is a string based key/value store
* This is important to know as we work with the counter example because we have a number not a string
  - So we don't need to use `JSON.stringify()` and `JSON.parse()`
  - We are going to have a few problems

## What happens if we save a number in localStorage and try to fetch it back
* We will get back a string

`> const num = '12'`

* We need the number `12` not the string `"12"`
  - Because if we try to do math operations on a string it will not work

```
const num = '12';
num + 1; // "111"
```

* We expect 13 but we get '111' instead and this is a problem

### `parseInt()` to the rescue!
* syntax
  - `parseInt(string, base)`
* So if we want to convert a string to a number we will use parseInt
  - We use the base 10
  - Default (if second argument not provided is base `10`)

```
parseInt(num) // 12
```

* Now we can add 1 and get 13 like this:

```
parseInt(num) + 1; // 13
```

## What happens if you try to use parseInt() on a string?
* You will get NaN (Not A Number)

```
const name = 'Joe';
parseInt(name); // NaN
```

* The same thing happens if you try to multiple a string by a number

```
> 'a' * 123; // NaN
```

* JavaScript has no idea what to do

## Check the type too with isNAN()
* After using `parseInt()` you will also need to remember to check the type to make sure that it is actually a number and its not NaN
* To do that use `isNaN`
  - This enables you to check if something is NaN or not
  - So if you try to multiple a string and a number using isNan() you will get true

```
> isNaN('a' * 12); // true
```

* And if you want to make sure it is indeed a number

```
> isNaN(122 * 12); // false
```

## User passing in props?
* Doesn't make sense now that we are using localStorage because we are just going to read the saved data
* So we'll remove `props.options` from IndecisionApp

`app.js`

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: props.options,
    };
  }
// MORE CODE
```

* And we'll replace `props.options` with an empty array

```
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      options: [],
    };
  }
// MORE CODE
```

* And we'll also delete the default props

```
IndecisionApp.defaultProps = {
  options: [],
};
```

* We'll do the same thing for the counter example

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
// MORE CODE
```

* And we'll set the default count state to `0`

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

* And we'll also remove counter's `defaultProps`

```
// MORE CODE

Counter.defaultProps = {
  count: 0,
};
// MORE CODE
```

* We do this because any prop that got passed in (since we are using localStorage) would just be overridden

## Challenge
* Switch babel to counter
* Set up `componentDidMount()` and `componentDidUpdate()`
* And you'll want to use `localStorage()` to get everything working

## Challenge Solution
## Run our counter app

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

### Now let's make our counter work with localStorage
* Checking for a change in state is important not with localStorage as it is cheap to use but when we use Databases it will become expensive because we'll be polling a server with every change
* We check if the previous state (prevState) is different than current state (this.state.count) and if it is then we update localStorage

```
// MORE CODE

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);
    }
  }
// MORE CODE
```

* When we setItem to localStorage our number will be saved as a string (we'll need to deal with this later)

## Test it out
* Increase count to 5
* Then in client console try `> localStorage.getItem('count')`
  - And you will see the string "5" is returned

### Question: Is parseInt() necessary?
`const count = JSON.parse(json)`

and

`const count = parseInt(json, 10)`

* Both seem to work
* Is there any benefit or downside to using one over the other?

```
// MORE CODE

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleMinusOne = this.handleMinusOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 'abc',
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('count');
      const count = JSON.parse(json);

      if (count) {
        this.setState(() => ({
          count,
        }));
      }
    } catch (e) {
      // do nothing
    }
  }
// MORE CODE
```

* Refresh page and count is "abc" string
* Click +1 and get 1 appended to the count like "abc1111111"
* Click -1 and you'll get NaN (Not a number)
* Both break our app - Not good!

#### Answer: Yes parseInt() is necessary
*  If it's not a number then you'll run into issues so we need to ensure it's an integer specifically
*  The first option only works in this scenario because we are only dealing with code generated numbers, i.e. they will always be numeric, not an input?

```
// MORE CODE

  componentDidMount() {
      const stringCount = localStorage.getItem('count');
      const count = parseInt(stringCount, 10);

      // check count is a number
      if (!isNaN(count)) {
        this.setState(() => ({ count }));
      }
  }
// MORE CODE
```

* Now even if our default value is "abc" our app still works
  - Because we only change the state if count is a number
* Do we need try/catch?
  - No
      + `Try/catch` is only used for catching exceptions and parsing something that's not an integer won't throw an exception so it effectively does nothing

## Run our app (if not already running)

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Next - Tooling and Webpack
