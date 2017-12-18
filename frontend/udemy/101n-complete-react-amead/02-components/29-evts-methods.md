# Events & Methods
**note** There was an error because I used a value inside the input field of the AddOption class (remove that for now and we'll figure out what is causing the error and how to fix it later... stay tuned!)

```
// MORE CODE
render() {
   return (
     <div>
       <input type="text" name="optionName" value="type something here" />
// MORE CODE
```

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Create a self containing class
* `<button onClick={this.handlePick}>What should I do?</button>`
* We reference the function, we don't call it
    - That means we don't use `()`

```
// MORE CODE
class Action extends React.Component {
  handlePick() {
    console.log('handlePick');
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    );
  }
}
// MORE CODE
```

* Click button and see in console `handlePick` every time you click

## Challenge
* Add `Remove All` button to the Options class and add an event handler that logs "removed" when it is clicked

```
// MORE CODE
class Options extends React.Component {
  handleRemoveAll() {
    console.log('remove all test');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options here</p>
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}
// MORE CODE
```

* CLick button and you'll see `remove all test`

## Challenge 2
* Setup the form with text input and submit form
* wire up onSubmit
* handleAddOption --> fetch the value typed --> if value, then log some message

```
// MORE CODE
class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value;
    if (option) {
      console.log(option);
    }

    evt.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

### Improve with `trim`
* If people add spaces before or after you can trim all the space off using `trim`

`const option = e.target.elements.option.value.trim();`

## Next - problems `this` will cause us and how to fix them
