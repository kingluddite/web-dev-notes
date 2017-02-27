# Passing Dynamic data with props
How do you get data from one Component into another Component?

Through `props`

## What are `props`?

`<img src="cloud.jpg" alt="A Cloudy Day">`

In HTML elements have attributes. Attributes are extra properties on that particular element. In React, `props` work the same way.

In React if you want to pass information to a tag, you pass it via a `prop`

### Add a `tagline` prop to our Header Component
`src/components/App.js`

```
import React from 'react';
import Header from './Header';
import Lineup from './Lineup';
import Roster from './Roster';

class App extends React.Component {
  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header tagline="Soccer Stars" />
        </div>
        <Lineup />
        <Roster />
      </div>
    )
  }
}

export default App;
```

## Update the Header Component
```
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>Soccer Stars</h1>
        <h3 className="tagline">Static Text Here</h3>
      </header>
    )
  }
}

export default Header;
```

Now we have our HTML and we have included our `tagline` prop but it has a static value that we will eventually make dynamic

## View in browser
You'll see `Soccer Stars` is styled and the `tagline` says `Static Text Here`

### View React tab in Dev Tools
You'll see Header has a tagline and on the right panel we see `Props` and `tagline: Soccer Stars` (_which is the value we gave `tagline` in `App.js`_)

**note** You can name your props whatever you want

All the attributes you give the Component, they are all all listed under `Props` in React tab of Dev tools

`<Header tagline="Soccer Stars" color="blue" hitpoints="100" />`

![props in react tab dev tools](https://i.imgur.com/yWcnN9r.png)

All the props we added are now listed under `Props`

### Accessing Prop Values from inside Component
```
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>Soccer Stars</h1>
        <h3 className="tagline">{this.props.tagline}</h3>
      </header>
    )
  }
}

export default Header;
```

#### How do you put variables into JSX?
`{this.props.tagline}`

#### What is `this.props`?

`this` will refer to the Component and `props` is an Object that we can use to gain access to all the `Props` available to it

## View in browser
You will now see our h3 is populated by data we suplied to the `<Header>` component inside `App.js`. If you change the text for `tagline` in `App.js`, and save, the text will update with your change

![props value showing](https://i.imgur.com/imso8Ty.png)

```
class Header extends React.Component {
  render() {
    console.log(this);
    return (
      <header className="top">
        <h1>Soccer Stars</h1>
        <h3 className="tagline">{this.props.tagline}</h3>
      </header>
    )
  }
}
```

* `this` when viewed in console will show you the `Header`. Expand and you'll see `props` and that it is an Object that has 3 items

![props is an Object](https://i.imgur.com/tMGRkbK.png)

## Debug Component in console
1. Select Component in React tab of dev tools
2. Switch to console
3. Type `$r` in console and you'll see Component
4. Type `$r.props` and you'll see all the props on that Component

**Debug** Elements in Elements tab of dev tools

1. Just select element you want to inspect
2. Switch to console tab 
3. Type `$0` and you can start debugging that element
4. Let's say you select a `<div class="menu">...</div>`
5. Then type `$0.classList` and you will see `["menu"]`

## Update App.js
To this:

`<Header tagline="Soccer Stars" />`

## What are prop types?
They allow you to validate that data has been passed and that data passed is the correct type

`Header.js`

## Add HTML to make our Heading look nicer
```
class Header extends React.Component {
  render() {
    console.log(this);
    return (
      <header className="top">
        <h1>
          Team
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
}
```

![What Heading should look like](https://i.imgur.com/ao7NMXD.png)

