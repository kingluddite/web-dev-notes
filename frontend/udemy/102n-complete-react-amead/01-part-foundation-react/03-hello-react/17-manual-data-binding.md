# Manual Data Binding
## Start our app
1. Point babel to our source and output files
2. Run live-server

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Our buttons currently only log output
* But it was pointless to put action in function to add, subtract and reset our count as it would have no effect
* Now we'll explain why that is the case
* And how we can get count to update in the UI (browser) in a React app

```
let count = 0;
const addOne = () => {
  count += 1;
  console.log('add one');
};
const minusOne = () => {
  count -= 1;
  console.log('minus one');
};
const reset = () => {
  count = 0;
  console.log('reset');
};

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne} className="my-class">
      +1
    </button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);

const appRoot = document.getElementById('root');
ReactDOM.render(templateTwo, appRoot);
```

* Had to change `const` to `let` for count so we could reassign value to variable
* Click buttons and you will see the count IS NOT UPDATED

## Update our code
* We'll add a shortcut way of incrementing and decrementing count
* We'll output count to log

```
let count = 0;
const addOne = () => {
  count++;
  console.log('add one', count);
};
const minusOne = () => {
  count--;
  console.log('minus one', count);
};
const reset = () => {
  count = 0;
  console.log('reset', count);
};

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne} className="my-class">
      +1
    </button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);

const appRoot = document.getElementById('root');
ReactDOM.render(templateTwo, appRoot);
```

* We see that count is changing when we click on the buttons
* But our application UI is not updating

## JSX does not have built in data binding
* This is why our UI is not updating with count
* Why?
  - Our expression runs before anything is rendered to the string
    + We do all our computations first and then we add `templateTwo` to `root` using ReactDOM.render()
    + What do our variable equal before anything is rendered to the screen?
    + We know that we are using static functions and count is equal to 0
    + There is no way one of our button handlers fired because the buttons haven't even been rendered to the page
  - When we create JSX all the data that gets used inside of it happens at the time the code runs
    + That means the count will always be zero because that was the count when this first ran

### Solution to update our UI
* We will just rerun this code:

```
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne} className="my-class">
      +1
    </button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);
```

* And this code:

`ReactDOM.render(templateTwo, appRoot);`

* And we'll rerun both chunks of code every time the data changes (later we will use React components to do this)

## Simple Function - Poor Man's React
* It is much easier to understand how react works by just creating a simple function that just runs both chunks of code again
  - We run the function when the app first loads
  - And we'll run it whenever we manipulate things (like our count)

```
let count = 0;
const addOne = () => {
  count++;
  console.log('add one', count);
};
const minusOne = () => {
  count--;
  console.log('minus one', count);
};
const reset = () => {
  count = 0;
  console.log('reset', count);
};

const appRoot = document.getElementById('root');

const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne} className="my-class">
        +1
      </button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
  ReactDOM.render(templateTwo, appRoot);
};
```

## View in browser - nothing happens
* Why? - We need to call it when the app first runs

## Call our app initially
```
let count = 0;
const addOne = () => {
  count++;
  console.log('add one', count);
};
const minusOne = () => {
  count--;
  console.log('minus one', count);
};
const reset = () => {
  count = 0;
  console.log('reset', count);
};

const appRoot = document.getElementById('root');

const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne} className="my-class">
        +1
      </button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
  ReactDOM.render(templateTwo, appRoot);
};
renderCounterApp();
```

* Now we see our app in the UI

## But our app still does not update count
* We just have to call `renderCounterApp()` from inside our methods

```
let count = 0;
const addOne = () => {
  count++;
  renderCounterApp();
};
const minusOne = () => {
  if (count > 0) {
    count--;
  }
  renderCounterApp();
};
const reset = () => {
  count = 0;
  renderCounterApp();
};

const appRoot = document.getElementById('root');
const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne} className="my-class">
        +1
      </button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
  ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();
```

## This is horribly inefficient
* Every click we are rerendering the entire page
  - That is obviously very inefficient!
  - This would never be scalable
  - But React unlike our Poor Man's React function is very efficient

### Check out chrome dev console `Elements` tab
* React used to use html comments to update portions of UI but they have been removed in recent React
* When you change the DOM via the element itself or JavaScript, that element will flash letting you know that element was changed
* React uses Virtual DOM algos that are super efficient in JavaScript to determine the minimal changes that need to be made in order to correctly render the new app
* Using ReactDOM.render() we are getting all the capabilities of React in a virtual DOM algo to efficiently render and rerender our app
  - It runs behind the scenes
  - So much faster then rerendering and repainting all those pixels to the browser
  - What comes back from React is just an object and we use algos to compare two objects
