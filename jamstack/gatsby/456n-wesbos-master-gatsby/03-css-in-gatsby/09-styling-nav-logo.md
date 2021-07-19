# Styling Nav and Logo

## Styled-components
* TODO The default `//` causes and error - how can I make all comments `/* */`?

## fix vs code prettier settings 
settings.json

* Wes note:

```
// MORE CODE

// Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
// MORE CODE
```

* this is no longer accepted

```
// MORE CODE

"prettier.disableLanguages": ["javascript", "javascriptreact"]
// MORE CODE
```

* Change to this:

```
// MORE CODE

 },
  // Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript, javascriptreact]": {
    "editor.defaultFormatter": null
  }
}
// MORE CODE
```

## Stylelint

* **cool** styled-components automatically vendor prefixes your code, so you don't need to do it manually
* Cool feature of styled components with stylelint
  - better debugging
    + https://styled-components.com/docs/tooling#better-debugging
    + This option enhances the attached CSS class name on each component with richer output to help identify your components in the DOM without React DevTools. In your page source you'll see: `<button class="Button-asdf123 asdf123" />` instead of just `<button class="asdf123" />`
    + It also allows you to see the component's displayName in React DevTools. For example, consider writing a styled component that renders a button element, called MyButton. It will normally show up in DevTools as styled.button, but with the displayName option enabled, it has the name you gave it: MyButton.
    + By default, the displayName of a component will be prefixed with the filename in order to make the component name as unique as possible.

This makes it easier to find your components and to figure out where they live in your app.
* stylelint with custom components
* No autofix! lame
* https://styled-components.com/docs/tooling#setup
* stylelint-recommended - https://github.com/stylelint/stylelint-config-recommended/blob/master/package.json
* https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
* https://github.com/cahamilton/stylelint-config-property-sort-order-smacss (can't use because plugin violates stylelint v3+ that requires plugins to expose a ruleName)
* https://stylelint.io/user-guide/usage/cli/
https://github.com/stylelint/awesome-stylelint

## Creating custom styled components
* Good naming convention is `The Component Name` + `Styles` (NavStyles)

`s/c/Nav.js`

```
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavStyles = styled.nav`
  background: red;
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>

      // MORE CODE

        <li>
          <Link to="/orders">Order</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
```

## Best practices for styled components
* Make your main components a style
  - And then just use selectors to grab the elements inside of those
  - Only break in into multiple styled components if that component will be used multiple times
* Try not to nest too deep (3 levels deep) gets tough overwriting css
* Try to stick to 2 levels deep

## base and rem
* We use a base of 10px in our html element

`s/s/GlobalStyles.js`

```
// MORE CODE

  html {
    background-image: url(${bg});
    background-size: 450px;
    background-attachment: fixed;
    font-size: 10px; // here is our base
  }

// MORE CODE
```

* And we use that base here:

`s/c/Nav.js`

```
// MORE CODE

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem; /* 2rem would be 2*base (2*10) = 20px */
    text-align: center;
    list-style: none;
  }
`;

// MORE CODE
```
## transform
* To overwrite you can use variables to store and not overwrite entire property

```
// MORE CODE

  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
  }
  li:nth-child(1) {
    --rotate: 1deg;
  }

// MORE CODE
```

## Note
* You can't reference a variable when your setting it to a variable
    - You can overwrite a variable but it can't reference itself

```
&:hover {
    --rotate: calc(var(--rotate) + 0.5deg);
}
```

## Nav now
`Navbar.js`

```
// MORE CODE

import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }

  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &li:nth-child(1) {
      --rotate: 1deg;
    }
    &li:nth-child(2) {
      --rotate: 1deg;
    }
    &li:nth-child(4) {
      --rotate: 1deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas/">Pizza Menu</Link>
        </li>
        <li className="logo-item">
          <Link to="/">Logo</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}

// MORE CODE
```

## clamp
* `font-size: clamp(1px, 0.65vw, 8px);`
    * This means a min of `1px` size, a max `8px` size
        - And in the middle is `0.65vw` (as you resize your browser, the logo scales along with the browser size!)
* Everything else is using `em`, ems are based on the font size of the element
    - since it is all done in ems it is all based on the font-size value (scales up really well)
    - **note** could of also used css calc but this is a good use case for em

## Style our logo
`Navbar.js`

```
// MORE CODE

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
// MORE CODE
```

## Style our Layout
* If they are not rendering anything to the page, they just styling so they are side effect
* We duplicate in case browser doesn't support `clamp`

## current page
```
// MORE CODE

  &[aria-current='page'] {
      color: var(--red);
    }
// MORE CODE
```

* html

`<a href="/" aria-current="page" class="">Hot Now</a>`
