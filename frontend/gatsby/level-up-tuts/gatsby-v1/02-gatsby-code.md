# The Code of Gatsby
* Don't touch
    - .cache
    - node_modules
* public
    - static site will be generated into
* src
    - all code we create lives here
* .gitignore
    - node_modules
    - .cache/
    - public/
    - .DS_Store
* gatsby-config.js
    - what plugins we are using
    - what our site title will be
* package.json
    - gatsby includes React
    - gatsby link in very similar to React Router
        + we'll use gatsby link just like we'll use React Router link
    * comes with prettier
        - you can also install
            + eslint and other good stuff

## NPM or Yarn
* It looks like npm (version 5.3) is winning the battle so I'm back to using it
    - so ignore the yarn lock file

* layouts/ folder
    - Main layout of site
* pages/ folder
    - got to random url on site and you'll see 404

## Styled Components vs Sass
* inline CSS is possible but styled components or preprocessors is better
* Helmet sets the meta data
    - description
    - keywords
* We will use styled components

* index.js (the one in `layouts` not `pages` directory)
    - most important file
* index.css
    - comment out to see the change
* `{childred}` will be the output pages

## create page-3
* Inside pages
* Make it look like this:

```
import React from 'react'
import Link from 'gatsby-link'

const ThirdPage = () => (
  <div>
    <h1>Hi from the third page</h1>
    <p>Welcome to page 3</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default ThirdPage; 
```

* Visit `http://localhost:8000/page-3` and you'll see it
