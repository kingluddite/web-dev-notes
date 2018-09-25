# Create React App
* Nice error detection built-in

## Stop server
`ctrl` + `c`

## Did you install create react app yet?
* [create-react-app repo](https://github.com/facebook/create-react-app)

`$ npm i -g create-react-app`


**note** You may get permissions error so just run it as `sudo`

`$ sudo npm i -g create-react-app`

* Enter your OS password to install app
* This is a global install and only needs to be done once on your computer
* Once `create-react-app` is installed you can easily create a working boilerplate of a react app

## Install react app
`$ create-react-app client`

`$ cd client`

`$ npm install`

### Faster way (saves a step)
* Will download and install client react packages
* **note** npx comes with `npm 5.2+` and higher
* One of the benefits of npx is that you don't have to install global apps like create-react-app and this will go out and grab your repo and install it for you (big time saver)

`$ npx create-react-app client`
`$ cd client`
`$ npm start`

* You will see your react app working with boilerplate css

## Eslint and Prettier
* If you try to make changes to a component inside `client` you will see that we are not formatting our code properly
* We need to use prettier and eslint inside our `client`
* [great documentation on installing eslint and prettier inside vs-code](https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08)
* Assumes your are using `Create React App`, `Yarn` and `Visual Studio Code`
* Please note that Create React App will not show any Prettier errors in the browser console or terminal output. The errors will only be shown in Visual Studio Code

### Install Prettier and the ESLint Plugin
`$ yarn add --dev --exact prettier`

`$ yarn add --dev eslint-plugin-prettier`

### Install the Prettier and ESLint VS Code Extensions
* [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Create ESLint Configuration file

`.eslintrc`

```
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### Create Prettier Configuration file

`.prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### Apply Prettier Formatting on Save (Optional)
* You most likely want to apply the Prettier formatting whenever you save your files

`"editor.formatOnSave": true`

### Prevent Prettier Violations from being Committed (Optional)
* Go up one directory (app root)

`$ cd ../`

#### Add script for `pretty-quick` and `husky`
* Then add the precommit script to your `package.json` file:
* Both packages were already installed

```
// MORE CODE

"scripts": {
    "precommit": "pretty-quick --staged",

// MORE CODE
```

## Add and Commit
* If all goes well you will see this kind of message in the terminal

![husky message](https://i.imgur.com/rF5ezhd.png)

* Husky won't let you commit if your code is not formatted properly by prettier

## React rules
* In jsx all tags must close
* class is reserved so in jsx you must use `className`
* `props` are passed down to components
    - Access `props` with `this.props` (in class)
    - Pass data from a parent to a child
* CBC vs SFC (I prefer CBC)
    - Switching them is a pain
    - Performance hit is negligible for medium to small apps
* state is per component
    - global state (redux, context...)
    - when defining functions in state

```
class App extends Component {
 state = {
    toggleModal: true
 }

 toggle = () => {
    this.setState({
        toggleModal: !this.state.toggleModal
    })
 }
 
 render() {

    // MORE CODE
```

* Never set state directly (only when first initializing)
    - Use `this.setState({})` to set state directly
* events
    - `button onClick={this.toggleModal}>Show / Hide</button>`
    - We don't use `toggleModal()` (leave off parentheses)
    - If you want to use parentheses or call multiple items in inline function, pass an arrow function to the event
* [The constructor is dead!](https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599)
* Lifecycle Methods
    - Place right after intializing state

```
// MORE CODE

class App extends Component {
 state = {
    toggleModal: true
 }

 // before mounts
 // will not trigger a re-render
 componentWillMount() {
    console.log('will mount')
 }

 // after mounts
 // will trigger a re-render
 componentDidMount() {
    console.log('did mount');
 }
 // many other LifeCycle Methods

// MORE CODE
```

* refs
    - `refs` to a DOM element
```
 // MORE CODE

 submit = () => {
    console.log(this.text)
 }

// MORE CODE
<input type="text" ref={(input) => this.text = input } />
<button onClick={this.submit}>Show value</button>
```

* Above `ref` looks strange but this is what is going on (but just doing it all in one line)
* You can assign refs to anything (they can reference any DOM element)

```
const name = function(input) {
    this.input = input;
}
```

`App.js`

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  submit = () => {
    console.log(this.text.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" ref={input => (this.text = input)} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

export default App;
```

* inputs: controlled vs uncontrolled
    - just filling out a form and submitting, use refs
    - But if you will do something live to the text as they are typing into form (like making the text all lower case, or validating form entries, then you would use state)
    - refs
        + example of uncontrolled inputs
        + we are just accessing the value of that input whenever we need it
        + We are not controlling it, we are letting the user control it

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    input: 'yo',
  };

  submit = () => {
    console.log(this.text.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" value={this.state.input} />
        <input type="text" ref={input => (this.text = input)} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

export default App;
```

* We prefix the form out with a value but we can't manipulate it
* We also get an error for providing a `value` without `onChange`
* Now we need to take `control` of the `this.state.input`
    - We can use `onChange` to respond to user typing in the input field

```
// MORE CODE

class App extends Component {
  state = {
    input: 'yo',
  };

  updateInput = event => {
    console.log(event);
  };

  submit = () => {
    console.log(this.text.value);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input
          type="text"
          onChange={this.updateInput}
          value={this.state.input}
        />
        <input type="text" ref={input => (this.text = input)} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    );
  }
}

export default App;
```

* Click in first input field and you will see lots of events
* Change log to `event.target.value` and you will get `yo` plus first letter you type in input field
* In order to get full control of input you need to set the state to what user types in and that is what is in the input value

```
updateInput = event => {
  // console.log(event.target.value);
  this.setState({
    input: event.target.value,
  });
};
```

* Improve by initializing state to an empty string

```
state = {
  input: '',
};
```

* It seems silly to control forms like this but it gives us full control over what this input is doing
    - We could say 'no spaces'

```
updateInput = event => {
  // console.log(event.target.value);
  this.setState({
    input: event.target.value.trim(),
  });
};
```

* Show text updating in UI

```
<p>{this.state.input}</p>
<input
  type="text"
  onChange={this.updateInput}
  value={this.state.input}
/>
```

## VS code tips
* duplicate a line: `opt` + `shift` up/down arrow

## ES6 tips
* Destructuring

`const { text } = this.props`

* conditional trick
`true && true`

```
{this.state.toggleModal && <p>Model is showing up</p>}
```


