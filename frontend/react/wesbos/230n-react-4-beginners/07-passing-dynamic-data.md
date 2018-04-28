# Passing Dynamic data with props
* How do you get data from one Component into another Component?
    - Through `props`

## What are `props`?

`<img src="cloud.jpg" alt="A Cloudy Day">`

### They are similar to HTML attributes
* HTML elements have **attributes**
* Attributes are extra properties on that particular element
* In React, `props` work the same way
* In React if you want to pass information to a tag, you pass it via a `prop`

### Good metaphor
* Think of `state` like the home for data
* This of `props` as the **vehicle** to get the data from Component to Component

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

* See how we pass it into the Component?

```
<div className="menu">
  <Header tagline="Soccer Stars" />
</div>
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

## Static vs Dynamic values
* Now we have our HTML and we have included our `tagline` prop but it ONLY HAS A STATIC VALUE
* We will eventually make this A DYNAMIC VALUE

## View in browser
* You'll see `Soccer Stars` is styled and the `tagline` says `Static Text Here`

### View React tab in Dev Tools
* You'll see Header has a tagline and on the right panel we see `Props` and `tagline: Soccer Stars`
    - Which is the value we gave `tagline` in `App.js`
* **notes**
    - You can name your `props` whatever you want
    - You can add as many `props` as you want

### React Dev Tools Tip
* All the attributes you give the Component are all listed under `Props` in **React** tab of Dev tools

`<Header tagline="Soccer Stars" color="blue" hitpoints="100" />`

![props in react tab dev tools](https://i.imgur.com/yWcnN9r.png)

## Update App.js
* Remove all props except `tagline` from the Header component

### Accessing Prop Values from inside Component
```
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h2>Teams</h2>
        <h3 className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    );
  }
}

export default Header;
```

#### How do you put variables into JSX?
`{this.props.tagline}`

#### The use of `this`
* What is `this.props`?
* `this` will refer to the Component
* And `props` is an Object
    - We can use `Props` to gain access to all the `props` available to it

## View in browser
* You will now see our `h3` is populated by data we supplied to the `<Header>` component inside `App.js`
* If you change the text for `tagline` in `App.js`, and save, the text will update with your change

![props value showing](https://i.imgur.com/h0MPja0.png)

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

## Open React tab in Chrome dev console
* `this` when viewed in console will show you the `Header`
* **note** `this` is inside the `render()` method
    - This is an important thing to notice and understand because when we start creating custom methods inside this component, we will have to manually bind `this` to the component so we can use `this` inside our custom methods

![props is an Object](https://i.imgur.com/tMGRkbK.png)

* We only have tagline as the solo prop but if we had other inside our `Header` component they would show up like in the screenshot above

#### Think about this
* The whole react component is really just an object
  - `this.props.tagline`

#### And think about this
* If you create 2 `<Header />` components
* Pass them different props like:

```
// MORE CODE
  class App extends React.Component {
    render() {
      return (
        <div className="team-of-the-day">
          <div className="menu">
            <Header tagline="Soccer Stars" />
            <Header tagline="Tennis Stars" />
          </div>
          <Lineup />
          <Roster />
        </div>
      );
    }
  }

export default App;
```

![2 instances of Header component](https://i.imgur.com/TxdEgSW.png)

* So each Component is an instance of that component
* The same component can get different prop values passed to it

`Header.js`

* Final `Header` code
* Check out the value of `this` in the Chrome console
```
import React from 'react';

class Header extends React.Component {
  render() {
    console.log(this);
    return (
      <header className="top">
        <h2>Teams</h2>
        <h3 className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    );
  }
}

export default Header;
```
