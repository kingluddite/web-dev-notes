# Routing and navigation in Gatsby
## Pages vs Components
* We use a page once
* Components are reusable pieces inside a page

## We'll create a Navbar which will be a reusable component
* Capitalize it `Navbar.js`

### Two ways to create a function
* You choose which way you like
  - This is the same rules for creating a react component in regular React

`components/Navbar.js`

```
import React from 'react';

const Nav = () => (
  <div>
    <p>Nav</p>
  </div>
);

export default Nav;
```

* Or this way (Wes preference is this one)

```
import React from 'react';

export default function Nav() {
  <div>
    <p>Nav</p>
  </div>;
}
```

## But we need to render JSX so we return it and our function component becomes this:

```
import React from 'react';

export default function Nav() {
  return <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/bears">Beers</a></li>
    </ul>
  </nav>
}

```

* But when you save `prettier will add the surrounding parenthesees and add nice formatting`

```
import React from 'react';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/beers">Beers</a>
        </li>
      </ul>
    </nav>
  );
}
```

## We will import our Nav component into our sliemasters page
`pages/slicemasters.js`

```
import React from 'react';
import Nav from '../components/Nav';

export default function SlicemastersPage() {
  return (
    <div>
      <Nav />
      <p>Slicemasters Page</p>
    </div>
  );
}
```

* And our home page

```
import React from 'react';
import Nav from '../components/Nav';

export default function HomePage() {
  return (
    <div>
      <Nav />
      <p>Home page is using hot reloading</p>
    </div>
  );
}

```

* And our beers page

```
import React from 'react';
import Nav from '../components/Nav';

export default function BeersPage() {
  return (
    <div>
      <Nav />
      <p>Beers Page</p>
    </div>
  );
}
```

## Problem
* The pages link to each other
* But there is a page refresh
* This is slow
* And this is just a simple site
* It would be much slower on a more complex

## Use `Link` from gatsby instead of HTML `a`(anchor tags)
* The `Link` tag will just render out an `<a></a>` but it will be super chargedk
* It will be loaded with the JavaScript to to push state 
* This uses `HTML5` push state which changes the URL and gives us history of 
where we searched (aka back history in our browser)

`components/Nav.js`

* When you see the `{Link}` below that is referred to as a "Named Import"
  - Gatsby will just export `Link` from the Gatsby package

```
import React from 'react';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
      </ul>
    </nav>
  );
}
```

### Other type of link
* 98% of time you'll use Link but 2% you'll use the following way to Programatically change a page
    - examples
        + Someone submits a form
        + Someone clicks a button

### React jargon
* You will hear this used a lot in React land
* The difference between `declarative` and `imperative`
    - Using the `Link` is declarative (we declare how it works)
    - Using the Programming link is imperative
      + You write the code to say what happens 

#### Example of an imperative
* When a person clicks on a button, take them to another link two seconds after their click

```
import React from 'react';
import { Link } from 'gatsby';

function goToSlicemasters() {
    console.log('Go to slicemasters');
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <button type="button" onClick={goToSlicemasters}>
            Click me to see slicemasters in 2 seconds
          </button>
        </li>
      </ul>
    </nav>
  );
}

```

* And wait for 2 seconds

```
import React from 'react';
import { Link } from 'gatsby';

function goToSlicemasters() {
  // 1. Wait for 2 seconds
  setTimeout(() => {
    console.log('Go to slicemasters');
  }, 2000);
  // 2. change the page
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <button type="button" onClick={goToSlicemasters}>
            Click me to see slicemasters in 2 seconds
          </button>
        </li>
      </ul>
    </nav>
  );
}

```

* Redirect to another page
  - We can use the `navigate` method from `gatsby`

```
import React from 'react';
import { Link, navigate } from 'gatsby';

function goToSlicemasters() {
  // 1. Wait for 2 seconds
  setTimeout(() => {
    console.log('Go to slicemasters');
    navigate('/slicemasters');
  }, 2000);
  // 2. change the page
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <button type="button" onClick={goToSlicemasters}>
            Click me to see slicemasters in 2 seconds
          </button>
        </li>
      </ul>
    </nav>
  );
}
```

### Tips
* HTML button elements must have a `type` for accessibility

## Important part of navigate
* If you want the programmatic link to be added to the browser history so they can use the history to get back to (for accessibility) use this:
* Click (and hold) google `<-` to see the history

## Caution using buttons
* You mostly won't use this on Gatsby (websites) vs Web apps
  - You would use it on webapps
  - You shouldn't be using buttons as links
    + It's annoying
    * You can't right click and open a new tab
    * You can't bookmark it

## Here's what we want our Nav to look like
```
import React from 'react';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" />
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order</Link>
        </li>
      </ul>
    </nav>
  );
}
```

## Next - Creating General Layouts in Gatsby

