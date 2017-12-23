# Saving Loading Options Data
* Use local storage and lifecycle methods to persist options during page loads

## Local Storage
* Just a key/value store

`> localStorage.setItem('key', 'value')`

* Try it out to **Set** localStorage

`> localStorage.setItem('name', 'John Wayne')`

* Try it out to **Get** localStorage

`> localStorage.getItem('name')`

* That will return `"John Wayne"`
* Refresh page and rerun the get and you'll still get the name
* It will persist between pages so it will make a good way to pretend we have a database

## Remove items with localStorage
`> localStorage.removeItem('name')`

* Now getItem() doesn't work because there is nothiing in localStorage

**note** localStorage only works with string data
* if you try to save a number, localStorage would convert it into a string

`localStorage.setItem('age', 100);`

`localStorage.getItem('age')` // gets "100"

* `"100"` is a string, it was converted

## How can we work with objects?
* We will use JSON data
* JSON is a string representation of a JavaScript object or array

## JSON.stringify()
* Will take a regular JavaScript object and turn it into the string representation of that object

## JSON.parse()
* Will take the string representation and return a true JavaScript object

`> JSON.stringify({ age: 25 })`

----> outputs ---> `"{"age":25}"`

* We'll save this string to local storage

### store our data
`> const json = JSON.stringify({ age: 25 });`

* parse it back into an object

`> JSON.parse(json)`

Returns ----> `{age: 25}`

### Back to our code and test this:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.options.length !== this.state.options.length) {
    console.log('saving data');
  }
}
```

* Add an option and you'll see `saving data` in console

## View it!
* `Chrome Dev Tool > Application > Storage > Local Storage > http://127.0.0.1:8080`

* You will see something like this:

![localStorage and options](https://i.imgur.com/9hwKMw4.png)

* Manually get it back
* `> localStorage.getItem('options')`

## Make our UX store our data
```js
componentDidMount() {
  const json = localStorage.getItem('options');
  const options = JSON.parse(json);

  this.setState(() => ({ options }));
}
```

* And now our options persist between pages
* Don't believe me? Make changes and refresh your browser

## Edge cases
* What if there is no valid values in localStorage?
    - Clear localStorage with:

`> localStorage.clear()`

* This will return null

`> localStorage.getItem('options')` // null

`> JSON.parse(null)` // null

* We don't want to return `null`

```js
componentDidMount() {
  const json = localStorage.getItem('options');
  const options = JSON.parse(json);

  if (options) {
    this.setState(() => ({ options }));
  }
}
```

## What if the data inside `options` isn't valid JSON?
`> JSON.parse('[123}')`

* Will generate this error:

![JSON parse error](https://i.imgur.com/rtCZJMH.png)

* We need to try and catch this error so it doesn't crash our program

```js
componentDidMount() {
  try {
    const json = localStorage.getItem('options');
    const options = JSON.parse(json);

    if (options) {
      this.setState(() => ({ options }));
    }
  } catch (e) {
    // do nothing
    // fallback to empty array which is the default value
  }
}
```

## fix options:
```
const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
};
```

* Now removed bulky paragraph
* Show a message if options empty
* Remove extraneous `<Option />`
