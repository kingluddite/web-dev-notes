# Stateless Functional Components
Sometimes we have Components that are complex and have lots going on but sometimes our Components are simple and only do one thing and that is to just render out HTML to the DOM

## Time to Convert!
Let's convert a standard Component in a Stateless Functional Component

`Header.js`

```
class Header extends React.Component {
  render() {
    console.log(this);
    return (
      <header className="top">
        <h1>
          Team
          <span className="of-the">
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

export default Header;
```

To this:

```
import React from 'react';

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Team
        <span className="of-the">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

export default Header;
```

* We use the ES6
* We pass the arrow function the `props`
* **important** We change `{this.props.tagline}` to `{props.tagline}` because since we are not using a **class** we are no longer using `this`
* **important** We remove the `render()` method
  - This means we no longer have access to `this` because it is no longer bound to the Component because we are now using a stateless functional Component

**note** You could also code a stateless functional component like this: 

(_but that would be old school and you would not be using the awesome powers of ES6_)

```
import React from 'react';

function Header() {
  return (
    <header>
    ...
    </header>
  )
}

export default Header;
```
