# Component Props
* How can we customize Component instances?
    - By passing data in when we initialize our components
    - That data is known as **props**
    - Setting up props is very similar to setting up HTML attributes
        + `<img src="path.jpg" height="150" width="150" />`

## Key/value pairs
* We can make up the `key`
* React gives us property to our props via `this.props`

## Dump props to screen
* Just to show you that data is getting to the component

```
class IndecsionApp extends React.Component {
  render() {
    return (
      <div>
        <Header title="My first prop yo!" />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Indecision</h1>
        <h2>Put your life in the hands of a computer</h2>
      </div>
    );
  }
}
// more code
```

* Will output to console `Object` and open it to see key/value of `title: "My first prop yo!"`
* We also get a warning `Failed form propType: You provided a **value** prop to a form field without an **onChange** handler...`

## Display the prop value
```
// more code
class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>Put your life in the hands of a computer</h2>
      </div>
    );
  }
}
// more code
```

* Will output a h1 of `My first prop yo!`

## Reference a variable defined elsewhere
```
class IndecsionApp extends React.Component {
  render() {
    const title = 'Indecision';
    return (
      <div>
        <Header title={title} />
        <Action />
        <Options />
        <AddOption />
      </div>
    );
  }
}
```

## Add a subtitle
```
class IndecsionApp extends React.Component {
  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
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
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}
```

* We can now use `<Header />` anywhere in our app, once or we can reuse it

## Options
* How can we pass options to our components

### Challenge
1. Setup options prop for the options component
        * We will static array we created
2. Render the length of the array

```
class IndecsionApp extends React.Component {
  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';
    const options = ['Option Uno', 'Option Dos', 'Option Tres'];

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
        <p>Options array lenght: {this.props.options.length}</p>
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

* Now we have an array of options
* We want to create a new instance of Options for each item in the array

```
class IndecsionApp extends React.Component {
  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';
    const options = ['Option Uno', 'Option Dos', 'Option Tres'];

// more code
class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options here</p>
        {this.props.options.map(option => {
          return <p key={option}>{option}</p>;
        })}
        <Option />
      </div>
    );
  }
}
```

## Implicit return
* Makes it shorter and easier to read

```
// more code
class Options extends React.Component {
  render() {
    return (
      <div>
        <p>Options here</p>
        {this.props.options.map(option => <p key={option}>{option}</p>)}
        <Option />
      </div>
    );
  }
}
// more code
```

## One step further
* Instead of rendering one `p` tag for each option we are going to render one `<Option />` instance

```
class IndecsionApp extends React.Component {
  render() {
    const title = 'Indecision';
    const subtitle = 'My computer is my BFF';
    const options = ['Option Uno', 'Option Dos', 'Option Tres'];

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
        {this.props.options.map(option => (
          <Option key={option} optionText={option} />
        ))}
        <Option />
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.optionText}</p>
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

## One way communication
* We now have a way to set up one way communication and that is with `props`

