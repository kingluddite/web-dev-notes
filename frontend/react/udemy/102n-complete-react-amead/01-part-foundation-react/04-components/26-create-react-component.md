# Creating React Component
* Cut all code from `app.js` and paste into `src/playground/jsx-indecision.js`
* Switch to view babel on `app.js`

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

* The UI should be empty

## Our first component!
### Header
`app.js`

```
class Header {

}
```

### Extend Header to user React's Component class
```
class Header extends React.Component {}
```

* React Components **require** one method to be defined - render()
  - With ES6 class methods you are not required to define any methods

```
class Header extends React.Component {
  render() {
    return <p>Header React Component text</p>
  }
}
```

* We do not see any text

## Now we need to render our React Component to the screen
```
class Header extends React.Component {
  render() {
    return <p>Header React Component text</p>
  }
}
const jsx = (
  <div>
    <h1>Title</h1>
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

## We still can see our React component rendering to the screen
* In order to render our React component we create what looks like a custom HTML element
  - But instead of using `<div>` or `<h1>` we use our class name `<Header />`
    + **tip** All open jsx instances must be close

## Finally, render it to the UI
```
class Header extends React.Component {
  render() {
    return <p>Header React Component text</p>;
  }
}
const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

* Now you will see the jsx title and the Header Component on the UI

![UI rendered](https://i.imgur.com/NLA4ehC.png)

## React components are reusable
```
// MORE CODE
const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Header />
    <Header />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

* You will see:

![React components are reusable](https://i.imgur.com/hUtf6Dt.png)

## React enforces uppercase letter for components
* ES6 does not
* The uppercase letter is how React differentiates between an HTML element `like <h1>` and a React custom element `<Header />`
  - React does something special behind the scenes to make this work

### Show how React works behind the scenes
* Open `public/scripts/app.js`
  - Top of the code is not code we wrote
  - Scroll down to this:

```
// MORE CODE

 return Header;
}(React.Component);

var jsx = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    'Title'
  ),
  React.createElement(Header, null),
  React.createElement(Header, null),
  React.createElement(Header, null)
);

// MORE CODE
```

* You see the `div` is a string
* But Header is not a string but it references what we returned above `Header`
  - This is our Header class we just defined

### Look what happens if we spell a component with a lower case letter
```
// MORE CODE

const jsx = (
  <div>
    <h1>Title</h1>
    <header />
    <Header />
    <Header />
  </div>
);
// MORE CODE
```

* The output would look like (view page source of rendered UI)
* **case matters!** with React components
![case matters in React](https://i.imgur.com/jpmgCJF.png)

## Create an Action Component
```
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

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Action />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

* Now we have two Components rendered on the page
  - We are getting some eslint errors
    + Declare only one React component per file (we'll break these aparts later)
    + `ReactDOM` is not defined (we'll import this later)

## Challenge
* Create these React Components
  - Options - add static text - Options React Component
  - AddOption - add static text - Add Option Component 

## Challenge Solution
```
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

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Action />
    <Options />
    <AddOption />
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
```

![final solution](https://i.imgur.com/ccvzZNI.png)

## Review of React Components
* Must have capital letter
* Extend just like ES6 classes
* They have to define a `render()` method

## Next
* Nesting React Components
