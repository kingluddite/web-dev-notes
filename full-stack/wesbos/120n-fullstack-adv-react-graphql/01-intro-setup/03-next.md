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
            * We create our own `babel` config
                - Takes their `next/babel`
                - Adds `styled-components` on top of that
        2. Also needs to do **server side rendering** (SSR)
            * This is important if you care about instant loading and SEO or preloading certain pages
            * So if you view source on page you will see that page content is in the source code
            * You have access to `getInitialProps` which will enable you to fetch data on the server
                - This is tough with asynchronous data on the server because its never clear when the data fetching is done and when you can send the response to the client and resolve the page
                - So Facebook introduced this new LifeCycle in react called `getInitialProps` which allows us to wait us the data to resolve before the page is actually shipped out to the browser
        3. Does routing for you
            * This is great because there is no routing, you just make pages
* [nextjs.org](https://nextjs.org/)

## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## frontend
`$ cd frontend`

### Create package.json
`$ npm init -y`

* Open `package.json`
* View the scripts

`package.json`

* Add the following `scripts`

```
// MORE CODE

"scripts": {
  "dev": "next -p 1234",
  "build": "next build",
  "start": "next start",
  "test": "NODE_ENV=test jest --watch",
  "heroku-postbuild": "next build"
},
```

`"dev": "next -p 1234",`

* `$ npm run dev` will run nextjs on port `1234`
    - Will run our next app
    - We get this error:

`sh: next: command not found`

## We need to get `next` installed
* And all it's dependencies

`$ npm i next`

* More errors
  - We need to install `react` and `react-dom`

`$ npm i react react-dom`

* Another error
  * We need to create a `pages` directory under the project root

`$ mkdir pages`

* Run app with:

`$ npm run dev`

* Finally! It works

## View in browser
`http://localhost:1234/`

* We get a 404
* Be did not set this up
  - Next created a 404 page for u

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
`http://localhost:1234/`

* Now you should see your Home component

## SFC (Stateless Functional Component)
* If you don't need `state` you can use a SFC

```
const Home = props => (
  <div>
      <p>Home</p>
  </div>
)

export default Home;
```

* You don't need to import `React` as NextJS will import it automatically

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
`http://localhost:1234/sell`

* Now you see the Sell component
* No routing necessary

## Linking between pages
* HTML5 pushstate
    - We could use a simple `<a>` but we want to use HTML5 pushstate so we can route from one page to another without having to refresh the page
* This will be very important when we have data in our cache
    - Stuff like:
        + Are we logged in
        + Are if our cart is open or closed
    - All of this data needs to stay in the **cache** but if we were to refresh the page we would lose all that and have to go back to the server to get it
* So instead of `<a>` we use `<Link>`
* `NextJS` imports `Link` in its own library like this:

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

<<<<<<< HEAD
* View in browser
* Both pages link to each other using HTML5 push state which prevents page refresh

## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch
=======
## View in browser
* Both pages link to each other using HTML5 pushstate which prevents page refresh

## Additional Resources
* [Avoid starters](https://hackernoon.com/next-js-razzle-cra-why-you-should-use-them-for-a-next-project-a78d320de97f)
* [HTML5 pushstate](https://zinoui.com/blog/single-page-apps-html5-pushstate)
>>>>>>> 9331b8c75c39f981fdea6e6c03f6af635a52ec83
