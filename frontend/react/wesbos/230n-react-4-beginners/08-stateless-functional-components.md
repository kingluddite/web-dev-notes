# Stateless Functional Components
* Sometimes we have Components that are complex and have lots going on
* But sometimes our Components are simple and only do one thing
    - To just render out HTML to the DOM

## Time to Convert!
* Convert a standard Component in a Stateless Functional Component (SFC)

`Header.js`

```
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h2>Teams</h2>
        <h3 className="tagline">
          <span>EPL</span>
        </h3>
      </header>
    );
  }
}

export default Header;
```

* To this:

```
import React from 'react';

const Header = props => {
  return (
    <header className="top">
      <h2>Teams</h2>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  );
};

export default Header;

```

* Every SFC gets one argument and that is `props`
* We use ES6
* We pass the **arrow function** the `props`

## `this.props.tagline` vs `props.tagline`
* We change `{this.props.tagline}` to `{props.tagline}` 
* Because since we are not using a **class**
    - We are no longer using `this`

## no `render()` (for SFC)
* We remove the `render()` method
  - This means we no longer have access to `this`
  - Because it is no longer bound to the Component because we are now using a stateless functional Component (**SFC**)

### Improvement
* **Implicit return** - If we only have one line we can remove the return
* De-structuring

`Header.js`

```
import React from 'react';

const Header = ({ tagline }) => {
  return (
    <header className="top">
      <h2>Teams</h2>
      <h3 className="tagline">
        <span>{tagline}</span>
      </h3>
    </header>
  );
};

export default Header;
```

* Look how cool ( {tagline }) destructuring is!
* Read a [great article](https://medium.com/@npverni/how-to-declare-react-components-in-2017-2a90d9f7984c) that summarizes all of the above

## Miscellaneous
* You could also code a Stateless Functional Component (**SFC**) like this: 

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

## Not Good - Better to use ES6 and stay modern
(_but that would be old school and you would not be using the awesome powers of ES6_)


