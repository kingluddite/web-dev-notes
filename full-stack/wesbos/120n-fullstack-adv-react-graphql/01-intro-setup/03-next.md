# Next.js
* Is a React Framework for building websites and we frameworks
    - Makes life easier
    - If you don't use a framework you need:
        1. Something to do all of the tooling
            * Webpack compiling
            * Code splitting
            * NextJS does that for you under the hood
            * You just type `next` and it does it behind the scenes for you
            * We can open up and adjust the webpack config
            * We create our own babel config
                - Takes their `next/babel`
                - Adds `styled-components` on top of that
        2. Also needs to do server side rendering
            * This is important if you care about instant loading and SEO or preloading certain pages
            * So if you view source on page you will see that page content is in the source code
            * You have access to `getInitialProps` which will enable you to fetch data on the server
                - This is tough with asynchronous data on the server because its never clear when the data fetching is done and when you can send the response to the client and resolve the page
                - So Facebook introduced this new LifeCycle in react called `getInitialProps` which allows us to wait us the data to resolve before the page is actually shipped out to the browser
        3. Does routing for you
            * This is great because there is no routing, you just make pages
* [nextjs.org](https://nextjs.org/)

## frontend
`$ cd frontend`

* Open `package.json`
* View the scripts

`package.json`

```
// MORE CODE

"scripts": {
  "dev": "next -p 7777",
  "build": "next build",
  "start": "next start",
  "test": "NODE_ENV=test jest --watch",
  "heroku-postbuild": "next build"
},
```

`"dev": "next -p 7777",`

* `$ npm run dev` will run nextjs on port 7777
    - Will run our next app

## View in browser
`http://localhost:7777/`

* We get a 404

## We need to create pages
* All top level pages go inside `pages`

## Create our home page
`pages/index.js`

```
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return <div>Home</div>;
  }
}

export default Home;
```

## View in browser again
`http://localhost:7777/`

* Now you should see your Home component

## SFC (Stateless Functional Component)
* If you don't need state you can use a SFC

```
const Home = props => (
  <div>
      <p>Home</p>
  </div>
)

export default Home;
```

* You don't need to import `React` as nextjs will import it automatically

## Create sell.js
`pages/sell.js`

```
import React, { Component } from 'react';

class Sell extends Component {
  render() {
    return <div>Sell</div>;
  }
}

export default Sell;
```

## View in browser
`http://localhost:7777/sell`

* Now you see the Sell component
* No routing necessary

## Linking between pages
* We could use a simple `<a>` but we want to use HTML5 pushstate so we can route from one page to another without having to refresh the page
* This will be very important when we have data in our cache
    - Stuff like:
        + Are we logged in
        + Are if our cart is open or closed
    - All of this data needs to stay in the cache but if we were to refresh the page we would lose all that and have to go back to the server to get it
* So instead of `<a>` we use `<Link>`
* Next imports Link in its own library like this:

### Add a simple Link

`pages/index.js`

```
import React, { Component } from 'react';
import Link from 'next/link';

class Home extends Component {
  render() {
    return (
      <div>
        <p>Welcome!</p>
        <Link href="/sell">
          <a>Sell!</a>
        </Link>
      </div>
    );
  }
}

export default Home;
```

`pages/sell.js`

```
import React, { Component } from 'react';
import Link from 'next/link';

class Sell extends Component {
  render() {
    return (
      <div>
        <p>Sell</p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    );
  }
}

export default Sell;
```

* View in browser
* Both pages link to each other using HTML5 push state which prevents page refresh
