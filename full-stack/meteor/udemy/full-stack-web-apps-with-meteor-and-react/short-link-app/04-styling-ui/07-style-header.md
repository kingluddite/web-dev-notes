# Style Header Component

## Exercise
![header](https://i.imgur.com/yd58MOm.png)

<details>
  <summary>Solution</summary>
`_header.scss` (place inside `components`)

```
.header {
  background-color: $header-bg;
  color: $header-color;
}

.header__content {
  display: flex;
  justify-content: space-between;
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}

.header__title {
  margin: 0;
}
```

`_variables`

```
// Colors
$brand-primary: #5b4681; // better than just 'purple' what if we change the color?
$grey: #dddddd;
$white: #ffffff;

// Spacing
$space: 1.4rem;
$site-max-width: 50rem;

// Font sizes
$base-font-size: 1.6rem;

// Header
$header-bg: $brand-primary;
$header-color: $white;
$header-link-color: $white;

// Form inputs
$input-border: $grey;
$input-spacing: 1rem;

// Boxed view
$boxed-view-overlay-bg: $grey;
$boxed-view-bg: $white;

// Links
$link-color: #000000;

// Button
$button-bg: $brand-primary;
$button-color: $white;
$button-pill-color: $brand-primary;
$button-default-bg: #f9f9f9;
$button-default-color: #777777;
$button-default-border-color: $grey;
```

`Header.js`

```
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const Header = (props) => {

    return (
      <header className="header">
        <div className="header__content">
          <h1 className="header__title">{props.title}</h1>
          <button className="button button--link-text" onClick={() => Accounts.logout() }>Logout</button>
        </div>
      </header>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
```

`_button.scss`

```
// more code
.button--link-text {
  background: none;
  padding: 0;
  margin: 0;
  text-decoration: underline;
  text-transform: none;
}
```

`_main.scss`

```
@import './variables';
@import './base';
@import './components/boxed-view';
@import './components/button';
@import './components/header';
```
</details>
