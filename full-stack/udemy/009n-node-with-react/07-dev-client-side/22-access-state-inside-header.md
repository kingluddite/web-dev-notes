# Accessing state inside Header Component
* Our reducer will return:
    - null
    - false
    - User object
* Our Redux store is not aware of whether the user is logged in

## Work on the Header Component
* We'll make sure is also aware of whether or not the user is logged in
* We do this by hooking up the Header Component to our Redux store
* And we want to then pull out the `auth` piece of `state` that tells us if the user is or isn't logged in

### How we hook up a Component to the Redux store
1. We import the `connect` helper from `react-redux`
2. We define the mapStateToProps function
3. Then we pull off the pieces of state we care about inside this Component

`Header.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
```

## Refactor if you want
* Change this (using ES6 [destructuring](https://ariya.io/2013/02/es6-and-destructuring-assignment) and [object literal property value shorthand](https://ariya.io/2013/02/es6-and-object-literal-property-value-shorthand))

```js
function mapStateToProps(state) {
  return { auth: state.auth };
}
```

* To this:

```js
function mapStateToProps({ auth }) {
  return { auth };
}
```

## Test
* How can we tell if this works
* Our mapStateToProps() grabbed the state
* We pass the auth (that we plucked off state) to our Header Component (thanks to connect)
* So Inside our render method of our `Header` Component we should be able to see whether the user is logged in (user object), logged out (false) or if we are not user (null)

![working state](https://i.imgur.com/hPm4L6t.png)

* The app starts up and the auth state is `null`
* Then shortly after we make our API check go through our flow and then our auth has the user object
* Try logging out and see what happens
    - You should see `null` and then `false`

![logged out false](https://i.imgur.com/RGjFqKS.png)

* Remove console.log() statement

## Helper method - renderContent()
* Works our our logic for our Header content
* Instead of a complex if we can use a switch statement to make our code more readable

`Header.js`

```
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'Still deciding';
      case false:
        return 'Not logged in';
      default:
        return 'Logged in';
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            Emaily
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
```

## Test
* You should see when you are logged in and logged out
* If you look real close, you can briefly see `Still deciding` as it loads

### Throttling
* But use **throtteling** in Chrome dev tools to see it more pronounced
* This will make your internet appear slow
* It will drag our the duration of your request

![throttle](https://i.imgur.com/YLGTHPb.png)

* I used Slow 3G and it was hard to see flash
* But with lots of content changing, that flash could be very annoying to our users
* One of most common complaints of mobile web is when elements jump on the screen
* IMPORTANT! Change the throttle setting back

## Update our JSX
`Header.js`

```
// more code
renderContent() {
  switch (this.props.auth) {
    case null:
      return; // return nothing - show nothing at all
    case false:
      return (
        <li>
          <a href="/auth/google">Login With Google</a>
        </li>
      );
    default:
      return (
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      );
  }
}
// more code
```

# Test
* You now should see our links update as they should
    - But when click to login to Google we get the naster route error
    - `Cannot GET /auth/google/callback` 
