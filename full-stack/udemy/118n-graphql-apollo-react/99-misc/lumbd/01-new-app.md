# New App
* create react app

`App.css'

```
// MORE CODE

.App-header {
  background-color: #222;
  height: 60px;
  padding: 20px;
  color: white;
}

// MORE CODE
```

`App.js`

```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
```

## map()
```
import React, { Component } from 'react';
import './App.css';

const presidents = [
  { id: 1, lastName: 'Washington' },
  { id: 2, lastName: 'Adams' },
  { id: 3, lastName: 'Jeffereson' },
];
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {presidents.map(president => {
          return president.lastName;
        })}
      </div>
    );
  }
}

export default App;
```

* Will output `WashingtonAdamsJefferson`

## Use JSX
* And `key` attribute

```
{presidents.map(president => {
  return (
    <ul key={president.id}>
      <li>{president.lastName}</li>
    </ul>
  );
})}
```

* Outputs a nice list

### implicit return
* Convert `{}` to parentheses `()` and you can remove the return (ES6 implicit return)

```
{presidents.map(president => (
  <ul key={president.id}>
    <li>{president.lastName}</li>
  </ul>
))}
```

* We convert `{}` to `()`
* We remove the `return (` and `)`
* We remove semi-colon

## Create a subcomponent `Movie.js`

`President.js`

```
import React, { Component } from 'react';

export class President extends Component {
  render() {
    const { lastName } = this.props.president;
    return <div>{lastName}</div>;
  }
}

export default President;

```

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">US Presidents</h1>
        </header>
        {presidents.map(president => (
          <President key={president.id} president={president} />
        ))}
      </div>
    );
  }
}
// MORE CODE
```

## static, defaultProps & propTypes
* Use this to help troubleshoot

### install PropTypes
`$ npm i prop-types`

### import prop-types
`import PropTypes from 'prop-types`

### Static definition to define our prop types
* **note** Look at the naming conventions used here
    - `PropTypes`, `prop-types` and `propTypes`

`President.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class President extends Component {
  static propTypes = {
    president: PropTypes.object,
  };

  render() {
    const { lastName } = this.props.president;
    return <div>{lastName}</div>;
  }
}

export default President;
```

* This is good but how do we validate an object with stuff in it?

### PropTypes.shape
* This allows us to pass in another object and we can define the props that are actually coming in

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class President extends Component {
  static propTypes = {
    president: PropTypes.shape({
      lastName: PropTypes.string,
    }),
  };

// MORE CODE
```

## We need our president lastName always to appear... (isRequired)
```
 // MORE CODE

export class President extends Component {
  static propTypes = {
    president: PropTypes.shape({
      lastName: PropTypes.string.isRequired,
    }),
  };

  // MORE CODE
```

* Now remove `lastName` of Washington from the `presidents` array of objects in `App.js` and you will see the prop type warning
* The code doesnt' break but it warns you that you are passing data that could break your app

```
const presidents = [
  { id: 1, lastName: 'Washington' },
  { id: 2, lastName: 'Adams', desc: '2nd President of U.S.' },
  { id: 3, lastName: 'Jeffereson' },
];
```

* We want some presidents to have a description

```
static propTypes = {
  president: PropTypes.shape({
    lastName: PropTypes.string.isRequired,
  }),
  desc: PropTypes.string.isRequired,
};
```

But we can't set this to required as it will throw warning error

* **note** we can't set `defaultProps` on a nested property

```
export class President extends Component {
  static propTypes = {
    president: PropTypes.shape({
      lastName: PropTypes.string.isRequired,
    }),
    desc: PropTypes.string,
  };

  static defaultProps = {
    desc: 'Description not available',
  };

  render() {
    const { lastName } = this.props.president;
    return (
      <div>
        <h3>{lastName}</h3>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}
```

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Presidents</h1>
        </header>
        {presidents.map(president => (
          <President key={president.id} president={president} desc={president.desc} />
        ))}
      </div>
    );
  }
}

// MORE CODE
```

![default props](https://i.imgur.com/mjFixTa.png)

* This let's you populate data that is missing

## Rules for prop types and props
* You should have a rule for every single prop type that is used in your components
* You must have either `isRequired` or a default prop
    - This will alert you anytime something is passed that shouldn't be
    - Saves you a ton of time debugging
    - This will make your components bulletproof
        + you will know what is going in and what is going out
        + Code reviewers, job interviews will be looking at your code to make sure you are using these
        + ESlint will complain to you to use them
    - You will be loved by your teammates

## React Dev Tools

## $r
* Select component in React Dev tools
* Switch to console and you type `> $r`
    - This shows you everythign about that component!
    - You can manipulate with this
    - `$r.input = 'greetings'` + return
    - type `> $r` again and will see the change has be added
    - This gives you live access to your component
