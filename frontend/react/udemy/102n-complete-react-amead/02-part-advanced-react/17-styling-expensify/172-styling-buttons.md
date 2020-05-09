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
// MORE CODE

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

// MORE CODE
```

`src/styles/base/_theme.scss`

* Add our blue color to our theme

```
// Colors
$blue: #1C88BF;
$dark-grey: #333333;
$white: #FFFFFF;

// MORE CODE
```

`styles/components/_button.scss`

```
.button {
  background-color: $blue;
  border: none;
  color: $white;
  font-size: 1.8rem;
  font-weight: 300;
  padding: $s-size;
}
```

* We'll use `1.8rem` more than once for font size so we'll create a variable

`_theme.scss`

```
// Colors
$blue: #1C88BF;
$dark-grey: #333333;
$white: #ffffff;

// Font Size
$font-size-large: 1.8rem; /* add this */

// MORE CODE
```

`_button.scss`

```
.button {
  background-color: $blue;
  border: none;
  color: $white;
  font-size: $font-size-large; /* update this line */
  font-weight: 300;
  padding: $s-size;
}
```

## Import button styles
`base/_theme.scss`

```
@import './base/theme';
@import './base/base';
@import './components/box-layout';
@import './components/button'; /* add this */
```

## LoginPage is done!

## Login and and style dashboard
* Final styles will look like:
![final style for app](https://i.imgur.com/2bmHAeG.png)

## Restructure Dashboard
* Remove `Create Expense` link
* We don't need to use NavLink
    - We'll move `h1` inside `Link` and change import of `NavLink` named export to `Link`

`Header.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

// MORE CODE

export const Header = props => (
  <header className="header">
    <Link to="/dashboard">
      <h1>Expensified</h1>
    </Link>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

// MORE CODE
```

* Remove this prop from Link `activeClassName="is-active"` as it is only used inside `NavLink`

## Style Header.js
* Make sure to import this file in `style.scss`

`styles.scss`

```
// MORE CODE
@import './components/button';
@import './components/Header'; /* add this */
```

### Add new dark blue variable
`_theme.scss`

```
// MORE CODE

// Colors
$blue: #1C88BF;
$dark-blue: #364051; /* add this */

// MORE CODE
```

`styles/components/_Header.scss`

```
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
// MORE CODE

export const Header = props => (
  <header className="header">
    <Link className="header__title" to="/dashboard" activeClassName="is-active">
      <h1>Expensified</h1>
    </Link>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

// MORE CODE
```

## Create content container
* Create new file
* Make sure to import it!

`styles.scss`

```
@import './base/theme';
@import './base/base';
@import './components/content-container'; /* add this */
@import './components/box-layout';
@import './components/button';
@import './components/Header';
```

`components/_content-container.scss`

```
.content-container {
  margin: 0 auto;
  max-width: 80rem;
  padding: 0 $m-size;
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

```
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

![so far the header is styled](https://i.imgur.com/mvrlxdR.png)
