# Global CSS
```
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './layout.css'

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
```

`layout.css`

```
h1 {
  color: blue;
  text-transform: uppercase;
}

body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.navbar-links {
  color: green;
}

.footer-links {
  color: orange
}
```

## Problems with global CSS
* Size - will get long and unwieldy
* specificity issues
    - unique
    - collisions
* We need a better way

`Navbar.js`

```
// MORE CODE

<div className="navbar-links">I am a navbar</div>
// MORE CODE
```

`Footer.js`

```
// MORE CODE

<div className="footer-links">I am a footer</div>
// MORE CODE
```
