# Add CSS module
* Gatsby uses CSS modules right out of the box
* Enables us to scope both our class our classes as well as animation just for that one particular component
* [Gatsby CSS modules docs](https://www.gatsbyjs.com/docs/css-modules/)

## How to names CSS modules
`Navbar.module.css`

* So we rename `Navbar.css` to `Navbar.module.css`

### We import it
`Navbar.js`

* And we log out to see our new `styles` object (we could name it whatever we want)

```
// MORE CODE

import React from 'react'
import {FaAlignRight} from 'react-icons/fa'
// import {GiViolin} from 'react-icons/gi'
import PageLinks from '../constants/links'
import styles from './Navbar.module.css' // ADD!

const Navbar = () => {
  console.log(styles)
// MORE CODE
```

* View the `styles` object in the browser console

```
logoFont: "Navbar-module--logo-font--3RQBR"
navCenter: "Navbar-module--nav-center--1YjT8"
navHeader: "Navbar-module--nav-header--SBsg2"
navLinks: "Navbar-module--nav-links--jQiYn"
navbar: "Navbar-module--navbar--2oZr3"
toggleBtn: "Navbar-module--toggle-btn--2imR5"
```

![style object in browser](https://i.imgur.com/xfNoqzb.png)

`Navbar.js`

```
import React from 'react'
import {FaAlignRight} from 'react-icons/fa'
// import {GiViolin} from 'react-icons/gi'
import PageLinks from '../constants/links'
import styles from './Navbar.module.css'

const Navbar = () => {
  console.log(styles)
  return (
    <nav className={styles.navbar}>
      <div className={styles.navCenter}>
        <div className={styles.navHeader}>
          <div>
            <h1 className={styles.logoFont}>storeytime</h1>
          </div>
          <button type="button" className={styles.toggleBtn}>
            <FaAlignRight></FaAlignRight>
          </button>
        </div>
        <PageLinks styleClass={styles.navLinks}></PageLinks>
      </div>
    </nav>
  )
}

export default Navbar
```

## Takeaway
* You do not need to make everything CSS modules
* You can and should use global CSS that is stuff that needs to be applied to everything so that you don't need a css module for
