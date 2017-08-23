# Header Design
* [Check out the navbar documentation](http://materializecss.com/navbar.html)
* JSX never pass in `class` but `className`

`Header.js`

```
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            Emaily
          </a>
          <ul className="right">
            <li>
              <a href="sass.html">Sass</a>
            </li>
            <li>
              <a href="badges.html">Components</a>
            </li>
            <li>
              <a href="collapsible.html">JavaScript</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
```

* The output is:

![we have a header](https://i.imgur.com/lFR5wkJ.png)

## Next
* The internal config for our Header

