# Nesting Components
* We can trash the jsx template
* We add a wrapper component `IndecisionApp` and put all our components inside it
* We point our `ReactDOM.render()` to an instance of `IndecisionApp` that we write like jsx with `<IndecisionApp />`

`app.js`

```
class IndecisionApp extends React.Component {
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
        <h2>Let your computer tell you what to do</h2>
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
        <p>Options React Component</p>
      </div>
    );
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <div>
        <p>AddOption React Component</p>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

## Houston we MAY have a problem!
* If you get this error "Super expression must either be null or a function, not undefined in React js" you most likely misspelled `Component` of `React.Component`

## What changed?
* Absolutely nothing
  - But now we have made our code more modular through nesting

## Next Challenge
* Nest Option inside of Options
  - Add static text `Option component here`
  - We don't want to render Option in `IndecisionApp` but inside `Options`
     + And render it below the `Options` static text
* Test and make sure `Options component here` appears below the `What should I do button?` and the `AddOption` component here 

## Next Challenge Solution
```
class IndecisionApp extends React.Component {
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
        <h2>Let your computer tell you what to do</h2>
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

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>Option component Text</p>
      </div>
    );
  }
}
class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options Text</p>
        <Option />
      </div>
    );
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <div>
        <p>AddOption React Component</p>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

## Self Closing tag vs open and closed
* We can use either and here is open and closed Component with text inside
* If no content is inside open and closed tag, when you save it will auto convert to self closing tag

```
// MORE CODE

class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options Text</p>
        <Option>Option Text</Option>
      </div>
    );
  }
}

// MORE CODE

```

## Recap
* Our components can render JSX
  - This means our components can render other components
    + This means we can nested structure we'll need for our applications

## Next - Discuss Component Props
* Have components communicate with one another
  - We'll learn how we can delegate on how IndecisionApp can pass information to child components
  - And how child elements can let IndecisionApp know that something needs to change based on user interaction  
