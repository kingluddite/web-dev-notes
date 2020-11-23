# Styling Nav and Logo
* Try not to nest too deep (3 levels deep) gets tough overwriting css
* Try to stick to 2 levels deep

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
    * This means a min of 1px size, a max 8px size
        - And in the middle is 0.65vw (as you resize your browser, the logo scales along with the browser size!)
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
* If they are not rendering anything to the page, they just styling so they are side effects
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
