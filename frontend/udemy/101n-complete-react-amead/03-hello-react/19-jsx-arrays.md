# JSX Arrays
* jsx supports arrays by default
* jsx supports strings
* jsx supports numbers
* jsx DOES NOT SUPPORT objects
* jsx ignores booleans, null or undefined

```
// MORE CODE
const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onBtnClick}>Remove All</button>
      {[99, 98, 97]}
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
// MORE CODE
```

* JSX sees the array and renders them side-by-side

` {[99, 98, 97, 'this is string', null, undefined, true]}`

* You will see that arrays, strings show
* But null, undefined and true do not
* We can render JSX inside of JSX

```
<button onClick={onBtnClick}>Remove All</button>
{[99, 98, 97, 'this is string', null, undefined, true]}
```

* `{<p>1</p>}`
* We will have an array of other JSX we want to render to the screen

`{[<p>a</p>, <p>b</p>, <p>c</p>]}`

* Will look like this:

![jsx inside array inside jsx](https://i.imgur.com/GUeXwbc.png)

## JSX error
* Using the JSX we used above will cause an error
* `Warning: Each child in an array or iterator should have a unique "key" 
    - JSX has now way of knowing what it is supposed to render and not render
    - Tha is why a unique key is needed

`{[<p key="1">a</p>, <p key="2">b</p>, <p key="3">c</p>]}`

* That gets rid of the unique key error
* The end HTML doesn't change but now JSX has a way of optimizing its performance and keep track of where things are in the array

## Challenge
* `const numbers = [13, 200, 956];`
* Use `map()` to loop through array and output each number inside a `p` tag

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

const numbers = [13, 200, 956];

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onBtnClick}>Remove All</button>
      {[99, 98, 97, 'this is string', null, undefined, true]}
      {numbers.map(number => {
        return <p key={number}>Number: {number}</p>;
      })}
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

### Render output

```
Number: 13

Number: 200

Number: 956
```

## Challenge
**note** comment in JSX

`{/*     */}`

1. Map over `app.options` getting an array of `li`s
2. Set key prop and text for each
3. Make the options array empty
4. Enter 4 list items into the arrary using the form

```
const app = {
  title: 'Indecision App',
  subtitle: 'Making React do cool stuff',
  options: [],
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
        {app.options.map(option => {
          return <li key={option}>{option}</li>;
        })}
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

## Refactor
```
const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onBtnClick}>Remove All</button>
      <ol>{app.options.map(option => <li key={option}>{option}</li>)}</ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  const appRoot = document.getElementById('app');

  ReactDOM.render(template, appRoot);
};
```




