# Buildit Portfolio
* Clone the expensify app
* Modify the application router
* Use routes for a portfolio website

Header
HomePorfolioContact

home page `/`
Welcome
This is my site. Take a look around

contact page `/contact`
Contact Me
You can reach me at test@gmail.com

portfolio page `/portfolio`
Checkout the following things I've done
* 2 links
    - Item One
    - Item Two

* Item One link takes to `/portfolio/1`
* Item Two link takes to `/portfolio/2`

And that page shows
A Thing I've Done
This page is for the item with id of 1

The link becomes bold when you are on one of the main pages
### Solution
`AppRouter.js`

```
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import HomePage from '../components/HomePage';
import PortfolioPage from '../components/PortfolioPage';
import PortfolioSinglePage from '../components/PortfolioSinglePage';
import ContactPage from '../components/ContactPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/portfolio" component={PortfolioPage} exact={true} />
        <Route path="/portfolio/:id" component={PortfolioSinglePage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
```

`PortfolioPage.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => (
  <div>
    <h1>Portfolio Page</h1>
    <p>Check out the following things I've done</p>
    <ul>
      <li>
        <Link to="/portfolio/1">Item 1</Link>
      </li>
      <li>
        <Link to="/portfolio/2">Item 2</Link>
      </li>
    </ul>
  </div>
);

export default PortfolioPage;
```

`ContactPage.js`

```
import React from 'react';

const ContactPage = () => (
  <div>
    <h1>Contact</h1>
    <p>
      You can reach me at <a href="mailto:test@gmail.com">test@gmail.com</a>
    </p>
  </div>
);

export default ContactPage;
```

`Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Portfolio</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Home
    </NavLink>
    <NavLink to="/portfolio" activeClassName="is-active">
      Portfolio
    </NavLink>
    <NavLink to="/contact" activeClassName="is-active">
      Contact
    </NavLink>
  </header>
);

export default Header;
```

`PortfolioSinglePage.js`

```
import React from 'react';

const PortfolioSinglePage = props => {
  const id = props.match.params.id;
  return (
    <div>
      <h1>Portfolio Single Page</h1>
      <p>A thing I've done</p>
      <p>This page is for the item with id of {id}</p>
    </div>
  );
};

export default PortfolioSinglePage;
```



