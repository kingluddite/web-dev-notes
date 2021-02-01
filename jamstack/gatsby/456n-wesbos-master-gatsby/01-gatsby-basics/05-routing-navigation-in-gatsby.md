# Routing and navigation in Gatsby
## We'll create a Navbar which will be a reusable component
* Capitalize it `Navbar.js`

### Two ways to create a function
* You choose which way you like

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

## Use `Link` from gatsby instead of HTML `a`
* This uses `HTML5` push state which changes the URL and gives us history of where we searched (aka back history in our browser)

### Other type of link
* Programatically change a page
    - examples
        + Someone submits a form
        + Someone clicks a button

### React jargon
* The different between `declarative` and `imperative`
    - Using the `Link` is declarative (we declare how it works)

#### Example of an imperative
* When a person clicks on a button, take them to another link two seconds after their click

### Tips
* HTML button elements must have a `type` for accessibility

`Navbar.js`

```
// MORE CODE

function goToPizzaPage() {
  setTimeout(() => {
    console.log('clicked button to go to pizzas page');
  }, 2000);
}

export default function Navbar() {
  return (
    <nav>
      <ul>

        // MORE CODE

        <li>
          <button type="button" onClick={goToPizzaPage}>
            Pizzas
          </button>
        </li>
      </ul>
    </nav>
  );
}
```

## How can we then navigate to another page
* We can use the gatsby `navigate` method

`Navbar.js`

```
// MORE CODE

function goToPizzaPage() {
  setTimeout(() => {
    console.log('clicked button to go to pizzas page');
    navigate('/slicemasters');
  }, 2000);
}
// MORE CODE
```

* Now after 2 seconds you go to the slicemasters page

## Important part of navigate
* If you want the programmatic link to be added to the browser history so they can use the history to get back to (for accessibility) use this:
* Click google `<-` to see the history

```
// MORE CODE

function goToPizzaPage() {
  setTimeout(() => {
    console.log('clicked button to go to pizzas page');
    navigate('/slicemasters', { replace: true });
  }, 2000);
}

// MORE CODE
```
