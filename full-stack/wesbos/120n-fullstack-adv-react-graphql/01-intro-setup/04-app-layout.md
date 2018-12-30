# Custom _app.js Layout

## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## How do you share data between pages
* Like between `index.js` and `sell.js`
* What is the parent of both of these pages?
* Where do we put our `state`?

## NextJS wraps entire app inside `<App>`
* Custom App
    - Persisting layout between page changes
    - Keeping `state` when navigating pages
    - Custom error handling using `componentDidCatch`
    - Inject additional data into pages (example: processing GraphQL queries)

### Persisting state between pages
1. I can add something to my cart
2. Then I can open my cart
3. Then I can go to another page
4. The fact that my cart is still open and it knows what's in my cart that is `persisting state between pages`
5. We will do this with our **apollo store**

## Create `_app.js`

`_app.js`

```
import App, { Container } from 'next/app';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <p>Yo. I'm on every page</p>
        <Component />
      </Container>
    );
  }
}

export default MyApp;
```

* `<Component />` will represent pages like `index.js` and `sell.js`
* And Our `<p>` will be on every page

## Test in browser
* Now we know how to share content between pages
* Also open `React Dev Tools` to see:
   - The react app
   - And the components
   - And their respective Properties

### Factor out Page component
* We currently are using:

`<p>Yo. I'm on every page</p>`

* But we want to put that in it's own component (refactor it) and reuse it on every page

`components/Page.js`

```
import React, { Fragment, Component } from 'react';

export class Page extends Component {
  render() {

    return (
      <Fragment>
        <p>I am the Page component</p>
        {this.props.children}
      </Fragment>
    )
  }
}

export default Page;
```

* Import `Page` into `_app.js`

`_app.js`

```
import App, { Container } from 'next/app';

// custom components
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
         <Component />
        </Page>
      </Container>
    )
  }
}

export default MyApp;
```

* **note** We wrap `Page` around `Component`

### View in React Dev Tools
* You will see as we navigate between the `home` and `sell` pages we see there is always a `Page` component
    - This is great because if you want different page layouts you can use different Page components

## Page
* Now we add stuff we want to appear on every single page

## Add Header
`components/Header.js`

```
import React, { Fragment, Component } from 'react';
import Link from 'next/link';

export class Header extends Component {

  render() {

    return (
      <Fragment>
        <div class="bar">
          <Link href="/"><a>Buy Stuff</a></Link>                 
        </div>
        <div className="sub-bar">
          <p>Search</p>
        </div>
          <div>Cart</div>
      </Fragment>
    )
  }

}

export default Header;
```

`Page.js`

* We need to add the `Header` component to our `Page` component

```
import React, { Fragment, Component } from 'react';

// custom components
import Header form './Header';

export class Page extends Component {
  render() {

    return (
      <Fragment>
        <Header />
        {this.props.children}
      </Fragment>
    )
  }
}

export default Page;
```

## Add Navbar
`components/Nav`

`Nav.js`

```
import React, { Component } from 'react';
import Link from 'next/link';

export class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link>
              <a href="/sell">Sell</a>
            </Link>
          </li>
          <li>
            <Link>
              <a href="/">Home</a>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
```

`index.js`

```
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <p>Welcome!</p>
      </div>
    );
  }
}

export default Home;
```

`sell.js`

```
import React, { Component } from 'react';

class Sell extends Component {
  render() {
    return (
      <div>
        <p>Sell</p>
      </div>
    );
  }
}

export default Sell;
```

`Header.js`

```
import React, { Component } from 'react';
import Nav from './Nav';

export class Header extends Component {
  render() {
    return (
      <div>
        <div className="bar">
          <a href="">Sick Fits</a>
        </div>
        <Nav />
        <div className="sub-bar">
          <p>Search</p>
        </div>
        <div>Cart</div>
      </div>
    );
  }
}

export default Header;
```

## SEO and meta stuff
* I will make this a SFC just to show we have a choice and since our state will be handled we don't have to use CBC

`components/Meta.js`

```
import Head from 'next/head';

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title>Sick Fits!</title>
  </Head>
);

export default Meta;
```

* Notice we are not import `React` at top as NextJS imports it automatically
* nprogress is bar going across top that shows page is loading

`Header.js`

```
import React, { Component } from 'react';

// custom components
import Meta from './Meta';
import Nav from './Nav';

export class Header extends Component {
  render() {
    return (
      <div>
        <div className="bar">
          <a href="">Sick Fits</a>
        </div>
        <Meta />
        <Nav />
        <div className="sub-bar">
          <p>Search</p>
        </div>
        <div>Cart</div>
      </div>
    );
  }
}

export default Header;
```

## Test it out in browser
* View source code and you will see our Meta

`/sell`

```
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" class="next-head"/><meta charSet="utf-8" class="next-head"/><link rel="shortcut icon" href="/static/favicon.png" class="next-head"/><link rel="stylesheet" type="text/css" href="/static/nprogress.css" class="next-head"/><title class="next-head">Sick Fits!</title>
<!-- MORE CODE -->
```

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

## Additional Resources
* [What is this.props.children](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)

