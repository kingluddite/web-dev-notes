# Tooling
* Node Current
* VS code shell command

## Frontend
* gatsby

## Backend
* sanity

## Make sure you Oauth into the correct Sanity account
* Are you using Google or Github?

## If you have session error
* I had one after I bought a new computer not sure if this was the cause but my token was not working
* I updated sanity `$ sanity update`
* I ran sanity `$ cd sanity && npm start`
* I logged into my online sanity account, deleted the old API token (click on the project you are working on, click API link, delete API and create and copy new API and paste into your `.env` file, then `$ cd gatsby && npm start` and that got it working on `http://localhost:8000/`

### Troubleshooting sanity "session" issue
* I had a session error and had to `$ sanity logout` and `$ sanity login`
* Then typed the above command and all was good

* **tip** Keep front end and backend separate
    - They have their own dependencies
    - They deploy to different places
    - They have their own settings
    - So keep them in their own separate folder
    - Keep them in their own separate editor tabs

## gatsby and sanity will be in a folder
* cd into gatsby in one tab and `$ npm i`
* cd into sanity in another tab and `$ npm i`

## Install global cli's
* `$ npm i gatsby-cli @sanity/cli -g`

### Errors are ok here (just means you have them already installed)
* Had issues upgrading gatsby-cli so did this `$ npm i gatsby@latest -g`
* Takes a very long time (5 minutes or more to upgrade - my mac machine is 7 years old)

## After installing check versions
* `$ gatsby -v` (will show you gatsby and gatsby-cli versions)
* `$ sanity -v` (will show you sanity cli version)

## Eslint
* Add to VS Code (shut down vs code and restart for it to work)

## Pages in Gatsby
* Everything must go through Gatsby
    - Then gatsby knows how to make them efficient
    - If you put them in `static` Gatsby doesn't optimize it

### Folder structure
* assets
    - fonts
        + frenchfries.woff
    - images
* components
* pages
* templates
* utils

### pages
* Currently you have to `import React from 'react'` for all gatsby pages
* This will soon not be necessary (https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
* Automatic runtime is a feature added in v7.9.0. With this runtime enabled, the functions that JSX compiles to will be imported automatically
* **note** importing react is a React thing (but won't be necessary soon)

#### naming convention for pages
* Put `Page` at end
    - HomePage
    - AboutPage

## Expand abbreviation for Emmet
* `tab` is problematic
* **tip** Set up binding to expand on the e key

`pages/index.js`

```
import React from 'react';

export default function HomePage() {
  return (
    <div>
      <p>home page here!</p>
    </div>
  );
}
```

* This function has to be exported from this file
* All Gatsby files are just ECMAScript modules (just means you can export things from them)
    - Gatsby expect the default export from a page will be what is rendered when someone visits that page
    - So we just add `export default` before our function and that will be rendered out

### Run your gatsby app
* `$ npm start` (faster than typing `$ gatsby develop`)


### 404.js
* Page not found
* **IMPORTANT** You can't start functions with numbers
* You won't see this page if you look for it in development, but there is a link you can click on (in the helpful debugger page) to see it

```
import React from 'react';

export default function NotFound() {
  return <p>Page not found</p>;
}
```

## Why we do not capitalize Gatsby pages?
* Because they are not reusable components
* These are single use pages
* Generally the Capital letter on a component indicates that it is a reusable class
* In JSX, lower-case tag names are considered to be HTML tags
    However, lower-case tag names with a dot (property accessor) aren't

```
<component /> compiles to React.createElement('component') (html tag)
<Component /> compiles to React.createElement(Component)
<obj.component /> compiles to React.createElement(obj.component)
```

### Our pages
`404.js`

```
import React from 'react';

export default function NotFound() {
  return <p>Page not found</p>;
}

```

`beers.js`

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

`index.js`

```
import React from 'react';

export default function HomePage() {
  return (
    <div>
      <p>home page here!</p>
    </div>
  );
}

```

`order.js`

```
import React from 'react';

export default function OrderPage() {
  return (
    <div>
      <p>The order page</p>
    </div>
  );
}

```

`pizzas.js`

```
import React from 'react';

export default function PizzasPage() {
  return (
    <div>
      <p>The pizzas page</p>
    </div>
  );
}

```

`slicemasters.js`

```
import React from 'react';

export default function SlicemastersPage() {
  return (
    <div>
      <p>The slicemasters page</p>
    </div>
  );
}
```

## Navigate to the pages
* http://localhost:8000/order
* http://localhost:8000/xxx (404 page)
* http://localhost:8000/pizzas
* http://localhost:8000/beers
* http://localhost:8000/slicemasters


