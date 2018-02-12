# Link between pages
* We only manually change pages
* And when we do we get the full page refresh
* The whole point of client side routing is to avoid page refreshes

## Add link traditional way
`app.js`

```
// MORE CODE
const NotFoundPage = () => (
  <div>
    404! <a href="/">Home</a>
  </div>
);
// MORE CODE
```

## Houston we have a problem - page refreshes
* The link will take you to home page but we still get a page refresh
* The browser is still communicating with the server in order to get the HTML page back
    - But it doesn't need to
    - We have all that available in our client side JavaScript

### Solution to problem
* Add an event listener for our links then we'll override the browser default behavior, and pretend the link was never clicked
    - And we'll use JavaScript code to change the page

## Link and NavLink to the rescue!
### Link
* Import the named export

`app.js`

`import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';`

* Update our code to use `Link`

```
const NotFoundPage = () => (
  <div>
    404! <Link to="/">Home</Link>
  </div>
);
```

* Now we don't get the full page refresh
* Instead JavaScript just swaps components out on the fly

## Create Header on every single page
```
// MORE CODE
const Header = () => (
  <header>
    <h1>Expensify</h1>
  </header>
);

const NotFoundPage = () => (
// MORE CODE
```

* And this is how you make `<Header />` appear on all pages

```
// MORE CODE
const Header = () => (
  <header>
    <h1>Expensify</h1>
  </header>
);

const NotFoundPage = () => (
  <div>
    404! <Link to="/">Home</Link>
  </div>
);

const routes = (
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
ReactDOM.render(routes, document.getElementById('app'));
```

## Challenge
* Create 4 links inside header
    - home
    - create expense
    - edit
    - help

### Solution
```
// MORE CODE
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/create">Create Expense</Link>
      </li>
      <li>
        <Link to="/edit">Edit Expense</Link>
      </li>
      <li>
        <Link to="/help">Help</Link>
      </li>
    </nav>
  </header>
);
// MORE CODE
```

* It works but there is a better Component to use for navigation and that is **NavLink**

## NavLink
* Import the NavLink named export

`app.js`

`import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';`

```
// MORE CODE
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/">Dashboard</NavLink>
    <NavLink to="/create">Create Expense</NavLink>
    <NavLink to="/edit">Edit Expense</NavLink>
    <NavLink to="/help">Help</NavLink>
  </header>
);
// MORE CODE
```

* It works the same as `Link` but we can do better

### activeClassName
* Will add a class only to the page we are on

```
// MORE CODE
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active">
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
// MORE CODE
```

* Now style that class

`_base.scss`

```css
// MORE CODE
button:disabled {
  cursor: default;
}
/add the class below
.is-active {
  font-weight: bold;
}
```

## Houston we have a problem
* Dashboard is always bolded
* That is because all links have same match of `/` in their URLs

### Solution: exact
* Rumors this will be removed in future
* And that exact should default to true in NavLink
* But for now do this:

`app.js`

```
// MORE CODE
<NavLink to="/" activeClassName="is-active" exact={true}>
// MORE CODE
```

* Now only active page is in bold
* On 404 page nothing is bold
