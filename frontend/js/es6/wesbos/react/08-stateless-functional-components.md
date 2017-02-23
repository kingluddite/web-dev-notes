# Stateless Functional Components
Sometimes we have Components that are complex and have lots going on but sometimes our Components are simple and only do one thing and that is render out HTML to the DOM

Turn this

`Header.js`

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
        <span className="ofThe">
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
* We change `{this.props.tagline}` to `{props.tagline}` because since we are not using a class we are no longer using `this`

You could also change it to:

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

## eslint StorePicker warning
You should use all Components you have defined. We will use it soon. 
