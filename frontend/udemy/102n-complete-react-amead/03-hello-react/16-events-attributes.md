# Events and Attributes
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* Let's look at event handlers inside our react app
* Recreate `templateTwo` template by deleting the old one

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
 const templateTwo = (
   <div>
     <h1>Count: {count}</h1>
   </div>
 );

 const appRoot = document.getElementById('app');

 ReactDOM.render(templateTwo, appRoot);
```

## Attributes in JSX
* Use `className` instead of `class`
* Using `class` will give you an error
* `class` is a reserved word in JavaScript

## React DOM elements
* [documentation](https://reactjs.org/docs/dom-elements.html)
* Scroll down to see DOM attributes
* They are all camelcased inside JSX

## Set attributes equalt to a JavaScript expression
```
let count = 0;
const someId = 'myIdHere';

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button id={someId} className="button">
      +1
    </button>
  </div>
);
```

* This is useful because in order to set up a click event we will specify a custom attribute on our button
    - One that DOES NOT exist inside of HTML

```
let count = 0;
const addOne = () => {
  console.log('clicked');
};

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne}>+1</button>
  </div>
);
console.log(templateTwo);
const appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);
```

## Register function inline
```
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button
      onClick={() => {
        console.log('clicked inline yo!');
      }}
    >
      +1
    </button>
  </div>
);
```

## Challenge
* Create a `-1` button
    - add event that calls function and logs `-1`
* Create a `reset` button
    - add event that calls functions and logs reset 

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


