# Picking an Option
## Get a random number
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

const onMakeDecsion = () => {
  // generate a random number inclusive (0 or 1)
  // so we can pull item out of array buy it's index
  const randomNum = Math.random();
  console.log(randomNum);
};

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button onClick={onMakeDecsion}>What should I do?</button>
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

renderApp();
```

* Click a button and see a random number
* Make it a little better

`const randomNum = Math.floor(Math.random() * app.options.length);`

### Event better randomizer with options
```js
const onMakeDecsion = () => {
  // generate a random number inclusive (0 or 1)
  // so we can pull item out of array buy it's index
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  console.log(option);
};
```

## Disable `which one should I should` button if options array empty

```
<button disabled={app.options.length === 0} onClick={onMakeDecsion}>
  What should I do?
</button>
```

* Now button will not be clickable if the options array is empty
* We use a true/false to make this possible on a html5 attribute `disabled`
