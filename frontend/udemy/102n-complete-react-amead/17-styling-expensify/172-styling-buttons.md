# Styling Buttons
## Challenge
* Make login button look like this:

![login button](https://i.imgur.com/AHYt3uH.png)

### Steps
1. Create new file
2. Setup selector styles
3. Setup className on login button

`LoginPage.js`

```
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = props => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensified</h1>
      <p>It&apos;s time to get your expenses in order</p>
      <button className="button" onClick={props.startLogin}>
        Login with Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
```

`_settings.scss`

```
// Colors
$white: #FFFFFF;
$dark-grey: #333333;
$blue: #1C88BF;

// Font Size
$font-size-large: 1.8rem;

// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;

// Media Query Breakpoints
$desktop-breakpoint: 45rem;
```

`styles/components/_button.scss`

```css
.button {
  background-color: $blue;
  color: $white;
  padding: $s-size;
  border: none;
  font-weight: 300;
  font-size: $font-size-large;
}
```

## Login and and style dashboard
* Final styles will look like:
![final style for app](https://i.imgur.com/2bmHAeG.png)

## Restructure Dashboard
* Remove `Create Expense` link
* We don't need to use NavLink
    - We'll move h1 inside Link and change import of NavLink named export to Link

`Header.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = props => (
  <header>
    <Link to="/dashboard">
      <h1>Expensified</h1>
    </Link>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
```

* Remove this prop from Link `activeClassName="is-active"` as it is only used inside NavLink

## Style Header.js
* Make sure to import this file in `style.scss`

`styles/components/_Header.scss`

```css
.header {
  background: $dark-blue; 

  &__title {
    color: $white;
    text-decoration: none;

    h1 {
      margin: 0;
    }
  }
}
```

`Header.js`

```
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = props => (
  <header className="header">
    <Link className="header__title" to="/dashboard" activeClassName="is-active">
      <h1>Expensified</h1>
    </Link>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
```

## Create content container
* Create new file
* Make sure to import it!

`components/_content-container.scss`

```css
.content-container {
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 $n-size;
}
```

`Header.js`

```
export const Header = props => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link
          className="header__title"
          to="/dashboard"
          activeClassName="is-active"
        >
          <h1>Expensified</h1>
        </Link>
        <button onClick={props.startLogout}>Logout</button>
      </div>
    </div>
  </header>
);
```

`_Header.scss`

```css
.header {
  background: $dark-blue; 

  &__content {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: $s-size 0;
  }

  &__title {
    color: $white;
    text-decoration: none;

    h1 {
      margin: 0;
    }
  }
}
```
