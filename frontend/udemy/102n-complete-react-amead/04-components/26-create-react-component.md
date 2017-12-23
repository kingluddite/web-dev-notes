# Creating React Component
* Cut all code from app.js and paste into `src/playground/jsx-indecision.js`
* Switch to view babel on `app.js`

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Our first component!
### Header
* React components require one method to be defined `render()` 

`app.js`

```
class Header extends React.Component {
  render() {
    return <p>Header Component</p>;
  }
}

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
```

* View browser
* You will see

```
Title
Header Component
```

## Multiple instances
```
const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Header />
    <Header />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
```

* This will add multiple instances

```
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Indecision</h1>
        <h2>Put your life in the hands of a computer</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button>What should I do?</button>
      </div>
    );
  }
}

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Action />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
```

* That will render the Header and the Action components

## Challenge
* Options
* AddOption

```
// more code
class Options extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      </div>
    );
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <div>
        <input type="text" value="type something here" />
      </div>
    );
  }
}

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Action />
    <Options />
    <AddOption />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
```

## Review of React Components
* Must have capital letter
* Extend just like ES6 classes
* They have to define a `render()` method
