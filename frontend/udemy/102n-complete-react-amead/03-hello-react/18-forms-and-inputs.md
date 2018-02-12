# Forms and Inputs
* Move code we don't need

`playground/counter-example.js`

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

* All JSX must have an opening and closing tag
* Or `<input>` must be `<input />`

## Add a simple form with input and button

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
    <form>
      <input type="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* We now have an input field

## Form submit
* Type `test` in form
* Hit submit
* Look at url and you'll see `http://127.0.0.1:8080/?option=test`
* The form refreshes the page
* We want the form not to refresh
* To stay on the current page
* And the client to handle the form submit

## SyntheticEvent
* [documentation](https://reactjs.org/docs/events.html)
* Gives us complete rundown on all events available to us

### Dive into form events
* [form events documenation](https://reactjs.org/docs/events.html#form-events)

#### 3 form events
1. onChange
2. onInput
3. onSubmit (we'll use this)

##### onSubmit
* We'll reference `{onSubmit}` and not call `{onSubmit()}`
* We'll right a function and if you don't explicitly return something from a function it will return `undefined`
* `e` is the event
* `e.preventDefault()` keeps the form from refreshing the page and enables us to let the client deal with the event

## Simple for submit test
```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const onFormSubmit = e => {
  e.preventDefault();

  console.log('form submitted');
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
    <form onSubmit={onFormSubmit}>
      <input type="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* Submit the form
* See the dev log `form submitted`
* No page refresh
* No data added to URL
* We handle all events with client side JavaScript
* `e.target` will point to the element that the event started on .... the form
    - On our form we have access to `elements`
        + Contains list of all form elements
        + And they are indexed by `name`
            * Our name is `option`
            * We use `value` to get that value
            * This is same for vanilla JavaScript
        + Check if form is empty
        + Empty string is a `falsey` value
        + 'yo' ---> true
        + '' ---- false
        + When someone clicks we want to push onto our array

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
  }
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
    <form onSubmit={onFormSubmit}>
      <input type="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
```

* Fill out the form
* Submit
* In console type: `> app.options`
* You will see that you added the form item to the array

## Challenge
* Create render function that renders the new JSX
* Call it right away to make sure initial app renders
* Then call it after options array is added to it

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
  }

  renderApp();
};

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
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

  const appRoot = document.getElementById('app');

  ReactDOM.render(template, appRoot);
};

renderApp();
```

### Challenge #2
* Create "Remove All" button above list
* on click ---> wipe the array and rerender

#### Solution
```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: ['One', 'Two'],
};

const onFormSubmit = e => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
  }

  renderApp();
};

const onBtnClick = e => {
  if (app.options.length > 0) {
    app.options = [];
  }

  renderApp();
};

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onBtnClick}>Remove All</button>
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

  const appRoot = document.getElementById('app');

  ReactDOM.render(template, appRoot);
};

renderApp();
```

## Next - Arrays in JSX





