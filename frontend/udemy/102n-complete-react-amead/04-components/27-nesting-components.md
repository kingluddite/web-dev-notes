# Nesting Components
* Create a parent component that holds our other components
* Create a sub component of Options

```
class IndecsionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
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

ReactDOM.render(<IndecsionApp />, document.getElementById('app'));
```

* Now we have a parent Component holding children components
* In other words, we just nested Components

## Challenge
* Nest a component inside `<Options />`
    - Add static text `Option component here`

```
class IndecsionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
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

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options here</p>
        <Option />
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>Option component here</p>
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

ReactDOM.render(<IndecsionApp />, document.getElementById('app'));
```
