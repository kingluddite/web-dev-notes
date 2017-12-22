# Manual Data Binding
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

`app.js`

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);

let count = 0;
const addOne = () => {
  count++;
  console.log('clicked');
};

const minusOne = () => {
  console.log('-1');
};

const reset = () => {
  console.log('reset');
};
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne}>+1</button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);
console.log(templateTwo);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```

* We add `count++` but it doesn't update our display

```js
// MORE CODE
let count = 0;
const addOne = () => {
  count++;
  console.log('clicked ' + count);
};
// MORE CODE
```

* Now the console increases the `count` value but not the display
* How can we make the application **re-render**?

## Important Rule for JSX
* JSX does not have built in **data-binding**
* Why?
    - This is express runs before anything is rendered to the screen

```
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne}>+1</button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);
```

* And then at the bottom of our `app.js` we render with:

`ReactDOM.render(templateTwo, appRoot);`

## Fix this
* We will first add a simple function to rerender the parts we need and later down the road will come up with a more elegant solution

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);

let count = 0;
const addOne = () => {
  count++;
  renderCounterApp();
};

const minusOne = () => {
  console.log('-1');
};

const reset = () => {
  console.log('reset');
};
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne}>+1</button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);
console.log(templateTwo);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);

const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

  ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();
```

## Poor man's React!
* We throw all the stuff we want to rerender inside a function and call that on the event
* Now the count updates the display with every click

## Challenge
* Make other buttons work

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);

let count = 0;
const addOne = () => {
  count++;
  renderCounterApp();
};

const minusOne = () => {
  count--;
  renderCounterApp();
};

const reset = () => {
  count = 0;
  renderCounterApp();
};
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne}>+1</button>
    <button onClick={minusOne}>-1</button>
    <button onClick={reset}>Reset</button>
  </div>
);
console.log(templateTwo);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);

const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

  ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();
```

## Horribly inefficient
* Every click we are rerendering the entire page
* That is inefficient!
* Yes it is
* This would never be scalable
* True. It would not be
* React is very efficient

### Check out chrome dev console `Elements` tab
* Used to have comments but they have been removed
* When you change the DOM via the element itself or JavaScript, that element will flash letting you know that element was changed
* React uses virtual dom algos that are super efficient in JavaScript to determine the minimal changes that need to be made in order to correctly render the new app
* Using ReactDOMRender we are getting all the capabilities of React in a virtual DOM algo to efficiently render and rerender our app
* It runs behind the scenes
* So much faster then rerendering and repainting all those pixels to the browser
* What comes back from React is just an object and we use algos to compare two objects
