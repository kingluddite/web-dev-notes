# Events and Attributes
* Reminder - to run app do 2 things:

1. Run babel and point it to the src and output files

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

1. Run live-server
`$ live-server public`

## Let's look at event handlers inside our react app
* Recreate `templateTwo` template by deleting the old one

### Let's make a counter app
* We'll create an app with 2 buttons to add and subtract numbers from the count
* As count changes we want to see the change reflected in the UI (browser)
* We'll delete `templateTwo` and rewrite it from scratch to be our new counter app

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

## View in browser
* Nothing special: Count is 0

### Add a button
```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button>+1</button>
  </div>
);
// MORE CODE
```

## Add an `id` attribute to our button
```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button id="my-id">+1</button>
  </div>
);
// MORE CODE
```

* And examine the `id` attribute in the Chrome Elements inspector tab

![button has id attribute](https://i.imgur.com/RbB2FaW.png)

## Attributes in JSX
* Try to add a class attribute

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button id="my-id" class="my-class">+1</button>
  </div>
);
// MORE CODE
```

* If you try to view it in browser you will not see a `class` attribute added
    - **note** We are using eslint so it will autorename `class` to the correct `className`
    - If you disable `.eslintrc` (Rename it to `OFF.eslintrc`) and you won't see class attribute added

## Use `className` instead of `class`
* Using `class` will give you an error because `class` is a reserved word in JavaScript
* **Note** Some HTML attributes work the same way in React, others have been renamed

## What does `templateTwo` equal?
* It is just an object
* Our JSX gets converted into React.createElement() calls and what comes back from that is just an Object
* Let's see this object

```
// MORE CODE

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button id="my-id" className="my-class">
      +1
    </button>
  </div>
);
console.log(templateTwo);
// MORE CODE
```

* And the output is:

![templateTwo output in console](https://i.imgur.com/UDi3vBN.png)

* The type is important - We have our root `"div"`
  - Inside of this `div` we have our h1 and button as children
  - And they live in the `props` Object
    + And you will see props has children array
      + with index 0 the h1
        * This has a type of "h1"
        * And it's props Object has a children array
          - Inside this you will see info rendered in the "h1"
      + and index 1 the button
        * You will see the type as "button"
        * And the props Object has a children's array
          - with children ("+1"), className and id
            + `className` is used because if we used `class` here it is a reserved word that can not be used in JavaScript

## Show a complete list of React DOM elements
* [documentation](https://reactjs.org/docs/dom-elements.html)
  - Scroll down to see DOM attributes
  - They are all camelCased inside JSX
* Here is a complete [list of all supported HTML attributes](https://reactjs.org/docs/dom-elements.html)

## How can we set attributes equal to a JavaScript expression?
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

## Set up a click event on a CUSTOM ATTRIBUTE on our button
* Attributes set to a JavaScript expression is useful!
    - Our custom attribute DOES NOT exist inside of HTML

### Add our event
* We'll add an `onClick` event and tie it to a variable that has been assigned an arrow function that will log out a simple "event fired!"

```
// MORE CODE

const count = 0;
const addOne = () => {
  console.log('event fired!');
};

const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={addOne} className="my-class">
      +1
    </button>
  </div>
);
// MORE CODE
```

* I don't add `()` after the function call so I'm just referencing function
  - If I added the `addOne()` it would fire the event as soon as the component rendered which is behavior I don't want to happen
* I reference the function but assigned it inside `{}` with `onClick={addOne}`
* Now we see 'event fired!' shows up in Chrome Console one time for every time we click the button (aka "one time for every time an click event is fired")
* This is a great tool as we are trying to create meaningful applications that respond to user interaction
 
## Inline function
* Just as we could do this:

```
const templateTwo = (
  <div>
    <h1>Count: {0}</h1>
    <button onClick={addOne} className="my-class">
      +1
    </button>
  </div>
);
```

* We can add an inline function inside our `{}`

```
const templateTwo = (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={() => console.log("inline event fired!")} className="my-class">
      +1
    </button>
  </div>
);
```

* That will work the exact same as that is the new callback click handler on this button
* **note** That is NOT what we want
  - In most cases we want to reference a function defined elsewhere
  - It looks weird and crowded if all your functions are defined inline

## Challenge
* Create a `-1` button
    - Make button that has `-1` text
    - Create minusOne function
      + Register minusOne function as onClick handler
      + Log 'minus 1' every single time that button is clicked
* Create a `reset` button
    - Make button that has `Reset` text
    - Create reset function
      + Register reset function as onClick handler
      + Log 'reset' every single time that button is clicked

### Solution
```
const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
  options: ['One', 'Two'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    {app.options.length > 0 ? <p>Here are your options</p> : <p>No options</p>}
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
  </div>
);

const count = 0;
const addOne = () => {
  console.log('add one');
};
const minusOne = () => {
  console.log('minus one');
};
const reset = () => {
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

## Next
* Explore how to rerender the application with a new count every single time the buttons get clicked
