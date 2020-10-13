# gatsby-browser.js
* This file taps into the browser API
    - (similar to how `gatsby-node.js` taps into the node API)
* We have been importing our css globally through this file

`gatsby-browser.js`

```
import "./src/css/main.css"
```

* Later we will use this to set up the React Context API

## Other option for global CSS
* Import the file into `Layout.js`
    - Since it is used on every page this will be a global import of CSS
