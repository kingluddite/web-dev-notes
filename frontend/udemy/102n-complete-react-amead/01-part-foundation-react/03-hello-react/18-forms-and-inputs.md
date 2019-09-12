# Forms and Inputs
* We'll set up a form
* We'll learn how to setup the form structure
* And how we can do something when the user submits the form
  - We'll have a text field and we'll learn how to:
      + Grab that value when the user types something in
      + And do something with that value
      + We'll customize the `options` array, we'll add the user option right inside the array and we'll focus on getting all of that rendered to the screen

## Move our counter code into it's own file
* Move code we don't need

`playground/counter-example.js`

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

* And here is our app (we add the last line to render our app)

`src/app.js`

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

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

## Set up our form
* Very similar to just using HTML with forms

### Create our form
* Wrap in the form tags
* Add a text input type attribute with a value of text with a unique identifier `name` attribute
    - All JSX must have an opening and closing tag
    - **note** input is an opening and closing tag
        + Or `<input>` must be `<input />`

## Add a simple form with input and button

```
// MORE CODE

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    {app.options.length > 0 ? <p>Here are your options</p> : <p>No options</p>}
    <ol>
      <li>Item one</li>
      <li>Item two</li>
    </ol>
    <form>
      <input type="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);
// MORE CODE
```

## View in browser
* You'll see an input form field with a button

## Form submit
* We currently do not have a custom event handler inside of our app for the form submission
  - And we won't be adding an onClick onto the button
  - Instead we will watch for the whole form to submit

### Let's try to submit the form as is
* Type `test` in form input field
* Press the 'Add Options' button (or press enter while focused on the input field)

### This will trigger a full page refresh
* Look at url and you'll see it dumps that data in the URL as the query string 

`http://127.0.0.1:8080/?option=test`

* We typed `name` into the input and so the input field was `name` and so the query string will be `?option=test`

## We want the form not to refresh
* Page refreshes is a technique useful for older server side rendered applications
* In our case we want to handle that form submit on the client
    - We want to stay on the current page
    - We want to run some JavaScript code that pushes an item onto the array and rerenders the application
* To do that we will set up an event handler for the form submission

## SyntheticEvent
* [There is a page in the React documentation](https://reactjs.org/docs/events.html) where you can view all the event handlers available to you
  * This pages gives us complete rundown on all events available to us

## Most useful on page is Supported Events
* [Link to Supported Events docs](https://reactjs.org/docs/events.html)
* We are interested in now with Form Events

## Form Events
* [Form Events docs](https://reactjs.org/docs/events.html#form-events)

### Dive into form events
* [form events documenation](https://reactjs.org/docs/events.html#form-events)
* We will be using `onSubmit`

#### onSubmit
* Will allow us to run a function when the user submits the form

## Mouse Events
* You will see `onClick` which we've already used

```
// MORE CODE

onst onFormSubmit = e => {
  e.preventDefault();
  console.log(e);
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
    <form onSubmit={onFormSubmit}>
// MORE CODE
```

* `e` is the event object that we pass as an argument to our function
* We don't want the form to submit (full page refresh behavior that we want to stop) (default form behavior) so we disable that with `e.preventDefault()`

## Reference that function - Do not try to call it
### Reference a function
`<form onSubmit={onFormSubmit}>`

### Call a function
`<form onSubmit={onFormSubmit()}>`

* If you call a function it will call it immediately on page load and try to get the return value which will be `undefined`
* So it would be equivalent to `<form onSubmit={undefined}>` (which we obviously don't want)

### Here's our code to test our form onSubmit
```
// MORE CODE

const onFormSubmit = e => {
  e.preventDefault();
  console.log(e);
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
    <form onSubmit={onFormSubmit}>
      <input type="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);
// MORE CODE
```

* Type `test` in input form field and click Add Options and the form will submit
* Look at the console and you will see a SyntheticEvent Object fire every time you submit the form
* Notice there is not a full page refresh
* Notice there is no data added to the URL querystring
* This is exactly what we want!
  - We are creating SPAs (Single Page Applications) and we want to handle all of those events inside of our client side JavaScript

## Do something meaningful with our form submit
* We want to get the value the user typed into the form input
* `e.target` will point to the element that the event started on
  - In our case the target would be the `form`
    + And on our form we have access to our form `elements`
      * And `elements` contains a list of all of the form elements and they are indexed by `name`
        - And to get the value of `name` we use value
          + `e.target.elements.options.value`
        - **note** This is the same for regular JavaScript

##
```
// MORE CODE

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;
  console.log(typeof option); // string
};
// MORE CODE
```

* `option` will be an empty string no matter what
* We log out what type we get after submitting an empty form
* Empty strings are `falsey` so we can use

```
if (option) {
  // will do this if option exists (anything except an empty string)
}
```

## Push onto our options array
* If a user adds an option to our text, that option will be added to our array

```
// MORE CODE

const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
  options: ['One', 'Two'],
};
const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
  }
  console.log(app.options);
};
// MORE CODE
```

* Add an option to the form field and submit
* Look at console and you will see new item added to options array of user object

![user options array](https://i.imgur.com/gZdmwwS.png)

## Clear out the input text field after form is submitted
* It is good practice to clear a form after it is submitted

```
// MORE CODE

const onFormSubmit = e => {
  e.preventDefault();
  const optionEl = e.target.elements.option;
  const option = optionEl.value;

  if (option) {
    app.options.push(option);
    optionEl.value = '';
  }
};
// MORE CODE
```

## We saw before we added the item to the array
* But we need to set up a re-rendering so we can see our UI list grow dynamically

## Tell react to re-render itself
* We'll set our default app options to empty
* We won't work on updating this list just yet:

```
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

* We won't update that just yet as working with arrays in JSX is a topic on its own and we'll deal with that later

## Just show the length of our arrays
* We'll add a `p` tag and output the length of our options array

```
// MORE CODE

const onFormSubmit = e => {
  e.preventDefault();
  const optionEl = e.target.elements.option;
  const option = optionEl.value;

  if (option) {
    app.options.push(option);
    optionEl.value = '';
  }
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    {app.options.length > 0 ? <p>Here are your options</p> : <p>No options</p>}
    <p>Number of Options: {app.options.length}</p>
// MORE CODE
```

* Now you will see 0 beside "Number of Options"
* Add 2 new items using the form and watch the number 0 increment to 1 and then 2

## Houston we have a problem
* Our UI is not updating when we add items via the form
* The problem is our app is not re-rendering

## Challenge
* Rerender the form so that when items are added to the form, the number of options increments
  - Create render function taht renders the new JSX
  - Immediately invoke it
  - Call it after options array added to

### Challenge Solution
```
const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
  options: [],
};
const onFormSubmit = e => {
  e.preventDefault();
  const optionEl = e.target.elements.option;
  const option = optionEl.value;

  if (option) {
    app.options.push(option);
    optionEl.value = '';
    rerenderPageEls();
  }
};

const rerenderPageEls = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      {app.options.length > 0 ? (
        <p>Here are your options</p>
      ) : (
        <p>No options</p>
      )}
      <p>Number of Options: {app.options.length}</p>
      <ol>
        <li>Item one</li>
        <li>Item two</li>
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('root');

rerenderPageEls();
```

* You can add 2 items in the form and see the length changes from 0 to 1 to 2
* Here is the console where you can see the app.options has 2 new items

![2 new items](https://i.imgur.com/pXDmctB.png)

## Challenge #2
* Create `Remove All` button above list
* The onClick handler will completely remove the app.options array (set it equal to an empty array an rerender the application)

```
// MORE CODE

const removeAllItems = () => {
  if (app.options.length > 0) {
    app.options = [];
    rerenderPageEls();
  }
};

const rerenderPageEls = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      {app.options.length > 0 ? (
        <p>Here are your options</p>
      ) : (
        <p>No options</p>
      )}
      <p>Number of Options: {app.options.length}</p>
      <button onClick={removeAllItems}>Remove All</button>
// MORE CODE
```

## Next
* Learn how to work with array
  - This will show us how to render a dynamic number of list items with the individual option text inside (instead of static text which is there now)
