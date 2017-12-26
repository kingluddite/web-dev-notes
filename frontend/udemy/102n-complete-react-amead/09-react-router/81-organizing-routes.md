# Organizing routes
* Make a folder to hold our routes
* It is a component but it is special
    - We build it once and then never tuch it again (one-and-done)

`src/routers/AppRouter.js`

```
import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

const ExpenseDashboardPage = () => (
  <div>This is from the dashboard component yo!</div>
);

const AddExpensePage = () => (
  <div>This is from the add expense component yo!</div>
);

const EditExpensePage = () => <div>This is the edit expense page</div>;

const HelpPage = () => <div>This is the help page</div>;

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <NavLink to="/edit" activeClassName="is-active">
      Edit Expense
    </NavLink>
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

const NotFoundPage = () => (
  <div>
    404! <Link to="/">Home</Link>
  </div>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
```

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<AppRouter />, document.getElementById('app'));
```

* We have a short `app.js` file and this is good

## Challenge
* Create 6 new files for the 6 components
* setup imports, component, default export
* import into AppRouter so they can be used

### Solution
* Create the following files inside `/src/components`
    - AddExpensePage.js
    - EditExpensePage.js
    - ExpenseDashboardPage.js
    - Header.js
    - HelpPage.js
    - NotFoundPage.js

`Header.js`

```
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <NavLink to="/edit" activeClassName="is-active">
      Edit Expense
    </NavLink>
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

export default Header;
```

* Notice that we had to import React (all components need that at the top as they all have jsx that needs to be converted to JavaScript)
* We also use the NavLink named export

`NotFoundPage.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404! <Link to="/">Home</Link>
  </div>
);

export default NotFoundPage;
```

* We also need to import the `Link` named export
* All the other pages will look like this:

`HelpPage.js`

```
import React from 'react';

const HelpPage = () => <div>This is the help page</div>;

export default HelpPage;
```

`AppRouter.js`

```
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
```

* We import all the components
* We remove imports no longer needed

## Now our files are better organized!
