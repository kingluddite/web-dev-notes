# Events & Methods
`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* We will work with our Action class and add an eventHandler to the button

```
// MORE CODE

class Action extends React.Component {
  render() {
    return (
      <div>
        <button onClick={}>What should I do?</button>
      </div>
    );
  }
}
// MORE CODE
```

## Create a self containing class
* We had global functions before
* In our self-containing class we'll create a brand new class method

```
// MORE CODE

class Action extends React.Component {
  handlePick() {
    alert('handlePick clicked');
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

* Make sure to only reference this function and do not call it
* Click button in UI and see alert window pop up
* **note** Don't forget `this` in `this.handlePick`

## Challenge
1. Add `Remove All` button
2. Setup `handleRemoveAll` method that alerts a message
3. Setup onClick handler to fire the method
4. Test to make sure it works

## Challenge Solution
```
// MORE CODE

class Options extends React.Component {
  handleRemoveAll() {
    alert('Remove all options');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

## Challenge Two
1. Setup the form with text input and submit button
2. Wire up onSubmit
3. handleAddOption
  * Fetch the value typed
    - If value, then alert

### Challenge Two Solution
```
// MORE CODE

class IndecisionApp extends React.Component {
  render() {
    const title = 'Indecision App';
    const subtitle = 'Let your computer tell you what to do';
    const options = ['Item One', 'Item Two', 'Item Four'];
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action />
        <Options options={options} />
        <AddOption />
      </div>
    );
  }
}
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  handlePick() {
    alert('handlePick clicked');
  }

  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p key={this.props.option}>
          <strong>Option</strong>: {this.props.option}
        </p>
      </div>
    );
  }
}
class Options extends React.Component {
  handleRemoveAll() {
    alert('Remove all options');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <p>Options Text</p>
        {this.props.options.map(option => (
          <Option key={option} option={option} />
        ))}
      </div>
    );
  }
}

class AddOption extends React.Component {
  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value;
    if (optionSelected) {
      alert(`The selected Option is ${optionSelected}`);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));

// MORE CODE
```

* View in UI and click Add Option button and you will see alert
* But if you add a bunch of spaces and click button you see a blank alert
  - We can fix that by using **trim()**

## trim() to the rescue
* Try this in the console

`>'    Space before and after   '.trim()` will give you this string without preceding or trailing spaces `Spaces before and after`

```
class AddOption extends React.Component {
  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      alert(`The selected Option is ${optionSelected}`);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

* Now if you add spaces before word or after or just spaces, `trim()` function will clear out all spaces

```
// MORE CODE

class AddOption extends React.Component {
  handleFormSubmit(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    if (optionSelected) {
      alert(`The selected Option is ${optionSelected}`);
    }
    e.target.elements.option.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}
// MORE CODE
```

* Now the form clears after you close the alert window

## Recap
* We still use attributes onSubmit and onClick and we reference a function we want to call
  - But instead of calling a global function on top of the file we call a class method (something that is contained inside of the class)
    + That means our class AddOption
      * Has everything it needs to run
      * It has the HTML that will eventually render
      * It has the eventHandler `this.handleAddOption`
      * And it has the handleAddOption being defined inside the AddOption class
      * We did the same thing for all methods in our 3 classes

## Next - problems `this` will cause us and how to fix them
* This will be covering the `this` binding and issues it causes
