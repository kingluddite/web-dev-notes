# CSS Modules
* starts at 1:06:50
* CSS modules are supported by default in all Gatsby projects
* Covered extensively in Gatsby documentation and just may be the preferred way to style documents in Gatsby

## Do I have to learn something new to use CSS modules?
* No. Essentially just CSS with a slight tweak that enables us to create complex web apps without complex styles

## Let's start by focusing on the Header component
`src/components/header.scss`

```
a {
   color: #999999;
 }
```

`header.js`

```
import React from 'react'
import { Link } from 'gatsby'

// styles
import './header.scss'

const Header = () => {

// MORE CODE
```

* This change will affect all links on the site
* Just because you import a stylesheet into a particular component doesn't mean that style is scoped to just that component
* We could add a class like `.link` and then add that class to a link to just style that link but our styles are still globally accessible

```
import React from 'react'
import { Link } from 'gatsby'

// styles
// import './header.module.scss'
import headerStyles from './header.module.scss'

const Header = () => {
  return (
    <header>
      <h1>Gatsby Bootcamp</h1>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">Home</Link>

// MORE CODE
```

## The solution to the scoping issue was BEM naming conventions
* So we can't use generic class names else we will run into a conflict
* And another solution is to come up with a ton of complex class names which isn't ideal either
* The solution to this problem is `CSS Modules`

## Introducing CSS Modules
* CSS Modules make all the class selectors in the module stylesheet locally scoped
    - We manually import and use them

### How to convert sass to CSS modules
* Change the name from:

`header.scss` to `header.module.scss`

* If you don't want to use sass you could name it `header.module.css`
* Our app will immediately crash because we are trying to import `header.scss` which no longer exists
    - Change the import to:

`header.js`

```
import React from 'react'
import { Link } from 'gatsby'

// styles
import './header.module.scss'

const Header = () => {

// MORE CODE
```

`header.module.scss`

```
.link {
   color: #999999;
 }
```

* Now our styles are no longer gray
* Why is this happening?
    - Our class selectors are no longer globally applied
    - They are now locally scoped

## How to get CSS Modules working
* We need to import as a component (name it whatever you want) and then apply to element you want to affect
* When we are working with a CSS Module we actually get a default export
    - This is an object which contains properties for every class we define in our module
        + In this case, we just have 1 named `link`

`header.js`

```
import React from 'react'
import { Link } from 'gatsby'

// styles
// import './header.module.scss'
import headerStyles from './header.module.scss'

const Header = () => {
  return (
    <header>
      <h1>Gatsby Bootcamp</h1>
      <nav>
        <ul>
          <li>
            <Link className={headerStyles.link} to="/">
              Home
            </Link>

// MORE CODE
```

* The great thing about CSS Modules is I am being explicit
* I'm importing the styles and applying them directly to the element so this eliminates the chance of creating a global style and messing things up with a collision from another component
    - And we want this as we want our components to be self-contained and easy to work with

### Let's examine the out generated from our CSS Module
![CSS Module output](https://i.imgur.com/HdtaTG3.png)

`components/layout.module.scss`

```
.container {
  margin: 0 auto;
  max-width: 750px;
  padding: 1rem;
}
```

`layout.js`

```
import React from 'react'

// custom components
import Header from './Header'
import Footer from './Footer'

// styles
import layoutStyles from './layout.module.scss'
import '../styles/index.scss'

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.container}>

// MORE CODE
```

* Now your site will be centered

## Add a sticky footer
* Mark up to set up the common structure for a sticky footer

`layout.js`

```
// MORE CODE

    <div className={layoutStyles.container}>
      <div>
      <Header />
      {children}
      </div>
      <Footer />
    </div>

// MORE CODE
```

* Now we'll set up flexbox

```
.container {
  margin: 0 auto;
  max-width: 750px;
  padding: 1rem;


  display: flex; /* we enable flexbox */
  flex-direction: column; /* we want it to be vertical vs horizontal so we use column instead of default value of row */
  min-height: 100vh; /* vh is viewport height and here we are setting the container height to the screen height */
}
```

* min-height is set to 100vh is the minimun height but it can always get bigger on longer pages which is what we want

## flex-grow
* We will also add this:

```
// MORE CODE

.content {
  flex-grow: 1;
}
```

* This will enable our content Header and children to grow as needed as our footer always is at the bottom

`layout.js`

```
// MORE CODE
const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      {/* <div className={layoutStyles.content}> */}
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
```

* View in the browser and notice how the footer is always at the bottom
    - Even if you make the window smaller, you can scroll down and see the footer is still at the bottom
* Comment out the `.content` class temporarily to see the effect

## header styles
* 3 css properties shortcut TOP LEFT/RIGHT BOTTOM

`header.module.scss`

```
.header {
  padding: 1rem 0 3rem;
}

.title {
  color: #000000;
  font-size: 3rem;
  text-decoration: none;
}

.link {
   color: #999999;
 }

```

`header.js`

```
// MORE CODE

import headerStyles from './header.module.scss'

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          Gatsby Bootcamp
        </Link>
      </h1>

// MORE CODE
```

* That will style your header and make it link to the home page which is usually a logo that always goes to home page
* We remove the link and make it large and pronounced

## Flexbox for nav
* Style links left to right... `display: flex`
* Remove bullet points
* Clear default margin values

`header.module.scss`

```
// MORE CODE
.nav-list {
  display: flex;
  list-style-type: none;
  margin: 0;
}

.link {
   color: #999999;
 }
```

* **note** We use a class of `.nav-list` but in our jsx we use camelCase `className={headerStyles.navList}` because if you do not prettier will format it to look like this:

`<ul className={headerStyles.nav - list}>`
 
`header.js`

```
// MORE CODE

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          Gatsby Bootcamp
        </Link>
      </h1>
      <nav>
        <ul className={headerStyles.navList}>

// MORE CODE
```

* CSS Modules is smart enough to spell the output like this:

`<ul class="header-module--nav-list--87D9u">`

* So it converts your `navList` to `nav-list`

### Style nav items
`header.js`

```
// MORE CODE

      <nav>
        <ul className={headerStyles.navList}>
          <li>
            <Link className={headerStyles.navItem} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={headerStyles.navItem} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={headerStyles.navItem} to="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className={headerStyles.navItem} to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

// MORE CODE
```

* And the CSS

`header.module.scss`

```
// MORE CODE
.nav-item {
   color: #999999;
   font-size: 0.9rem;
   margin-right: 1.3rem;
   text-decoration: none;
 }
```

## Psuedo classes or anything else we want to use
* On hover change color

`header.module.scss`

```
// MORE CODE

 .nav-item:hover {
   color: #666666;
 }
```

## Set a style for the active link in a navbar
```
/* active link in navbar */
 .active-nav-item {
   color: #333333;
 }
```

`header.js`

```
// MORE CODE

        <ul className={headerStyles.navList}>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={headerStyles.navItem}
              activeClassName={headerStyles.activeNavItem}
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>

// MORE CODE
```


