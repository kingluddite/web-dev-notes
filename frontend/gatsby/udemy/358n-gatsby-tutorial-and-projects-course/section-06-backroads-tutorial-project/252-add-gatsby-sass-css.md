# Add Gatsby Sass CSS
## Install it
* Stop server

`$ npm install node-sass gatsby-plugin-sass`

`gatsby-config.js`

```
// MORE CODE

plugins: [`gatsby-plugin-sass`],
// MORE CODE
```

## Create a folder in src called `sass`
`src/sass/layout.scss`

* Put all variables in `_variables.scss`

`_variables.scss`

```
$primaryColor: #f15025
```

`layout.scss`

```
!import './variables';

body {
    background: $primaryColor;
}
```

`Layout.js`

```
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../sass/layout.scss'

// MORE CODE
```

## Problem
* If we write Sass we have same problem about collisions and scope creep

## Use CSS modules and Sass
* Sass let's you nest your rules

`layout.module.scss`

```
import React from 'react'
import styles from './footer.module.scss'

const Footer = () => {
    return (
    <div className={styles.footer}>
     <h1>I am a footer</h1>
     <div className={styles.links}>I am a footer link</div>
    </div>
    )
}

export default Footer
```

