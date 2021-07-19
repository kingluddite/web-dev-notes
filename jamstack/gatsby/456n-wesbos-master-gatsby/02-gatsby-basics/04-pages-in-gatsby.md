# Pages in Gatsby
* public
    - you can delete and gatsby will regenerate
    - This is the deploy folder
    - This is where gatsby builds to
    - `$ gatsby clean`

## src vs static
* static (avoid like the plaque unless you absolutely must)
    - This is where you put files that you just want to be served up
        + stuff like favicons
        + Almost always you don't want to put things in static
            * You don't want to put stuff like an image/font/css
                - Why?
                    + We don't want to import things into Gatsby just by their static path
                    + "Everything must go through Gatsby!"
                        * All imported into Gatsby
                            - all images
                            - all css
                            - all javascript
                        * If you import through Gatsby, then Gatsby knows about them and can do cool optimizing stuff around performance and speed

## pages folder
* The only folder in our project that is truly "Gatsby" specific
    - We put all our pages inside the `pages` folder
    - The rest of the folder are made up
    - But this is a common layout for Gatsby websites

## Let's talk folders
* assets
     - fonts
     - images
* components
    - nav
    - header
    - order button
    - any special react components that we make
    - **note** the .gitkeep files are just there so git doesn't autodelete the directory because git deletes empty directories by default
* styles
    - all our styles
* templates
    - similar to pages but we use them for stuff like pagination
* utils
    - We'll stick common utility functions (example: formatMoney()) 

### More about pages
* Two types of pages
    - `pages` can be dynamically generated
    - Or `pages` can be done via "file system routing"
        + What does this mean?
            * If you go into pages directory and you make a page like `index.js` than this is the page that shows up when someone visits it
            * But we don't just drop HTML into this `index.js` page
                - Instead we need to export a function from this file and that will be rendered out to the page

#### import React from 'react'
* Any Gatsby page you need to include this (but soon you won't)
* **Question**: Do we need to import React into Gatsby?
    - https://blog.saeloun.com/2021/07/01/react-17-adds-jsx-runtime-and-jsx-dev-runtime-for-the-new-jsx-transform
    - `import React from 'react'`
    - In React 17 and starting with Babel version v7.9.0, `@babel/plugin-transform-react-jsx` plugin automatically imports “special functions” from the new React package when needed so that we don’t have to manually include them
    - https://reactjs.org/blog/2020/08/10/react-v17-rc.html
* **Question** Do you have problems with emmet tab and have you added the expand e keyboard shortcut like Wes has for VS code?

`src/pages/index.js`

```
import React from 'react';

function HomePage() {
  return (
    <div>
      <p>Home page!</p>
    </div>
  );
}

```

* But we need to export this function
* All of your Gatsby files (with the exception of a couple) are just ECMA script modules (meaning that you can export things from them)
* Gatsby is assuming that the main export (aka the default export)_from a page will be what is rendered when someone visits that page
    - So if you add `export default` before the function like below that is what will be rendered out

```
import React from 'react';

export default function HomePage() {
  return (
    <div>
      <p>Home page!</p>
    </div>
  );
}
```

## Start our gatsby build
* We need to do this in order to see our page in the browser
* **IMPORTANT** You need to be in the `gatsby` folder
    - Not in the sanity folder
    - Not in the main folder (parent folder holding both sanity and gatsby)

## package.json scripts
```
// MORE CODE

  "scripts": {
    "//": "⁉️ Hey! This might look confusing but allow me to explain. The command we want to run is called gatsby build. But because we want to use es modules with gatsby, we use a package called esm. One way to require it is to set the NODE_OPTIONS environmental variable to -r esm. Finally to make this work for windows users, we use the cross-env package. Hopefully once Node es modules are stable, we can bring this back to simple gatsby build",
    "build": "cross-env NODE_OPTIONS=\"-r esm\" gatsby build",
    "develop": "cross-env NODE_OPTIONS=\"-r esm\" gatsby develop",
    "start": "npm run develop",
    "serve": "cross-env NODE_OPTIONS=\"-r esm\" gatsby serve",
    "clean": "gatsby clean",
    "netlify": "netlify dev",
    "prebuild": "netlify-lambda install"
  },

// MORE CODE
```

* Gatsby says use `$ gatsby develop`
    - But Wes likes to run `$ npm start` so he made a script called `start` pointing to `gatsby develop`

## Run gatsby
`$ npm start`

## Troubleshooting
* When running `$ npm start` I get:

![dotenv error](https://i.imgur.com/KYg3jgw.png)

* This is because I ran `$ gatsby develop`
    - A: Please use the provided `npm` scripts to start the Gatsby server (such as `npm run develop` or `yarn develop`). Don't use the global `gatsby develop` command as **Gatsby doesn't support using ESM imports yet**. The provided npm scripts uses an esm npm package to add support for the newer import syntax

`package.json`

```
// MORE CODE

    "develop": "cross-env NODE_OPTIONS=\"-r esm\" gatsby develop",

// MORE CODE
```

* Wes pays for help :) - https://github.com/wesbos/master-gatsby/issues/28

## Running Gatsby in develop mode
`$ npm start`

* You will see that npm run develop and that in turn runs gatsby develop
* Then you'll see a localhost URL for us
    - `localhost:8000` (you'll see our index.js as a page)
    - `localhost:8000/___graphql` is how we'll source our data

## Troubleshoot caniuse warning (fixed)
* Browserlist: caniuse-lite is outdate
    - So I ran `$ npx browserslist@latest --update-db`
    - Whole lotta info about this - https://github.com/browserslist/browserslist#browsers-data-updating
    - Did the update but still see the warning
    - Lots of data on this issue - https://github.com/postcss/autoprefixer/issues/1184
        + I just ran `gatsby clean` and removed `package-lock.json` and `node_modules`, did the reinstall `npm i` and ran `npm start` and the warning was gone

## Now `localhost:8000` works
* Why? Just like index.html gets rendered `index.js` gets rendered when you go to the home page route `/`

### Hot reloading
* When you change the code inside `pages/index.js` you will see the rendered localhost:8000 gets updated instantaneously!

## 404 page
* If you go to a page that doesn't exist Gatsby by default will render out a 404 page
* http://localhost:8000/123

`pages/404.js`

```
import React from 'react';

export default function NotFound() {
  return (
    <div>
      <p>Page Not Found</p>
    </div>
  );
}
```

* **Note** You can't start functions with numbers so you can't name the function

```
function 404() {}
```

* **note** The name of the page doens't matter but it is useful when you get into the React Developer tools so give it a meaningful name

## Warning - You won't see your 404 page in development
* You will see it in production
* The development not found page gives you info about all the existing pages in your Gatsby app

## Scaffold Pages
`src/pages/beers.js`

```
import React from 'react';

export default function BeersPage() {
  return (
    <div>
      <p>Beers Page</p>
    </div>
  );
}

```

### Gatsby Pages naming convention (lowercase) 
* Why are we not spelling our page components with capital letters like in React components?
* The reason is pages are not reusable components (they are single use pages)
* The capital R in react is that it is a reusable component so that is why pages are not capitalized in Gatsby

## Here are the pages (`pages/`)
* 404.js
* beers.js
* index.js
* orders.js
* pizzas.js
* slicemasters.js

### Test each page in the browser to make sure they work
* http://localhost:8000
* http://localhost:8000/beers
* http://localhost:8000/orders
* http://localhost:8000/pizzas
* http://localhost:8000/slicemasters
* http://localhost:8000/xxx

## Next - navigating page to page in Gatsby
