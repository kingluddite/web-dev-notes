# Picking an Option
* We'll remove the `p` showing the length of the options array - not needed as we'll show the items on the UI in a list

```
      <p>Number of Options: {app.options.length}</p>
```

## Get a random number
### What should I do button?
* We'll add this button that when clicked will call an event handler that will generate a random number, find the option that was randomly select and print it to the UI

```
// MORE CODE

const onMakeDecision = () => {
  console.log('make decision');
};

const rerenderPageEls = () => {
  // MORE CODE

      <button onClick={onMakeDecision}>What should I do?</button>
      <ol>{app.options.map(option => <li key={option}>{option}</li>)}</ol>
// MORE CODE
```

* Test and click on `What should I do button` and look for log message in Chrome console

### Now log out a random number
```
// MORE CODE

const onMakeDecision = () => {
  const randomNum = Math.random();
  console.log(randomNum);
};
const rerenderPageEls = () => {
  const template = (
    // MORE CODE

      <button onClick={onMakeDecision}>What should I do?</button>
// MORE CODE
```

* Click the `What should I do?` button several times and you will see something like the following in your client console

```
0.21282054189529798
0.8311212084058768
0.5028137425090589
0.8818442475687485
0.22278968637763508
```

* We see that Math.random() just returns a number between 0 and 1
* We need to teach our randomNum function to output a random number in a range that would be the length of our options `app.options.length`

```
// MORE CODE

const onMakeDecision = () => {
  const randomNum = Math.random() app.options.length;
  console.log(randomNum);
};
// MORE CODE
```

* Test button and you will see `0` every time you click it as there are no items
* Add 3 items using the input and click again and you will see 0, 1 or 2 with a long number of digits following

## Round down
```
// MORE CODE

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  console.log(randomNum);
};
// MORE CODE
```

* Add 3 items and you will see 1, 2 or 3

## Use random number and pull option from app.options
```
// MORE CODE

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  console.log(option);
};
// MORE CODE
```

## Alert it
* We will use modals a bit later to improve on the UX

## Conditionally disable this `what should I do?` button
* If there are no options we could hide the button using:

```
// MORE CODE

  {app.options.length > 0 && (
    <button onClick={onMakeDecision}>What should I do?</button>
  )}

// MORE CODE
```

### Disable the button with the `disabled` HTML button attribute
```
// MORE CODE

      <button disabled="disabled" onClick={onMakeDecision}>
        What should I do?
      </button>
// MORE CODE
```

* Now the button is not clickable and greyed out

## Set disabled to a truthy or falsey value using JSX
`disabled={true}` (disabled and not clickable) 

or 

`disabled={false}` (clickable)

* We want to disable it if there are no options (app.options.length === 0)

```
// MORE CODE

      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do?
      </button>
// MORE CODE
```

* Now the button is disabled if there are no options and enabled when there is at least 1 option

## Final `app.js`
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

const removeAllItems = () => {
  if (app.options.length > 0) {
    app.options = [];
    rerenderPageEls();
  }
};

// const onMakeDecision = () => {
//   const optionsLen = app.options.length;
//   const randomNum = Math.floor(Math.random() * optionsLen);
//   console.log(randomNum);
// };

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
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
      <button onClick={removeAllItems}>Remove All</button>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>
        What should I do?
      </button>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
      <ol>{app.options.map(option => <li key={option}>{option}</li>)}</ol>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

const appRoot = document.getElementById('root');

rerenderPageEls();

```
