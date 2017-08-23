# Link tags
## Make our logo link to the home page
* This seems straightforward
* But it is a bit more complex
* If you are logged in home is `/surveys`
* If you are not logged in home is `/`

## `<a>` vs `<Link>`
![link vs a diagram](https://i.imgur.com/SqWQfJo.png)

* Anchor tags are what we use for a traditonal webpage
* Where we link from one page to the next
* But we don't have a traditional webpage
* We have SPA that swaps Components when we need them
* Our page is being rendered by React Router
* But instead of having a link to click that will go to a different page we need a link to click that will tell React Router to update some of the Components visible on the screen

### Link tag
* `React Router DOM` gives us access to this
* We use it to navigate around to different route rendered by React Router

### `a` tag (`<a href="some/path">Anchor</a>`)
* This is the traditional HTML element used to navigate to a completely different HTML document
    - Some parts of our app we want to use an anchor tag because we want to link to a completely different domain or a completely different HTML document
    - Example we used
        + `<a href="/auth/google">Login With Google</a>`

`Header.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { connect } from 'react-redux';

class Header extends Component {
// more code
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
```

* We user `Link`
* We import it from the `react-router-dom` library which is for react in the browser
* We use a ternary operator
    - if this.props.auth exists it will be true and take me to `/surveys`
    - if this.props.auth is false it will take me to `/`
