# Add Bootstrap for CSS
* `$ npm i bootstrap`
* We'll just grab a basic version (not Sass)

## After install
* Look inside `node_modules` and inside that the `dist`
    - You will see lots of various css files

`Navbar.js`

```
// MORE CODE

import React from 'react'
import {FaAlignRight} from 'react-icons/fa'
// import {GiViolin} from 'react-icons/gi'
import PageLinks from '../constants/links'
import styles from './Navbar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css' // ADD!

// MORE CODE
```

 
