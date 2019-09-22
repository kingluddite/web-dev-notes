# Link between pages
* Currently, we only manually change pages by putting in the URL
* And when we do we get the **full page refresh**
  - That full page refresh means we are communicating with the **server**
  - The whole point of client side routing is to avoid page refreshes and do everything from the client side router - not the server router
  - We will use Links to get this done

## 404 page
### Add link traditional way
* We'll add a link on the 404 page to take us to the home page
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

### But it doesn't need to!
* We have all that available in our client side JavaScript

### Solution to problem
1. Add an event listener for our links
2. Then we'll override the browser default behavior, and pretend the link was never clicked
3. And we'll use JavaScript code to change the page

**Good News** We don't have to build any of that as it's built-in to `React router`

## `Link` and `NavLink` to the rescue!
* [Link docs](https://reacttraining.com/react-router/web/api/Link)
* [NavLink docs](https://reacttraining.com/react-router/web/api/NavLink)

### Link
* Import the `Link` named export

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

* We add a to prop pointing it to where the Link needs to go
  - It is `to` (similar to the `<a>` **href** attribute)
  - The big difference here is now we are using client side routing as opposed to server side routing
* And we add the Link text inside like this `<Link>LINK TEXT HERE</LINK>`

## Try it out in the browser
* Now we don't get the full page refresh
* Instead JavaScript just swaps components out on the fly

### `<Link>` vs `<a>`
* On all internal links on your app use `<Link>`
* On external links use `<a>`

## Create Header on every single page
* We will add a component that we want to render on every single page (not just one page)

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
* We use semantic HTML tags `<header>`

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
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
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
* Import the `NavLink` named export

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
    <nav>
      <li>
        <NavLink to="/" acti>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/create">Create Expense</NavLink>
      </li>
      <li>
        <NavLink to="/edit">Edit Expense</NavLink>
      </li>
      <li>
        <NavLink to="/help">Help</NavLink>
      </li>
    </nav>
  </header>
);
// MORE CODE
```

* Now style that class

`_base.scss`

```
// MORE CODE
button:disabled {
  cursor: default;
}
/add the class below
.is-active {
  font-weight: bold;
}
```

## Houston we have a problem!
* Dashboard is always bold
* That is because all links have same match of `/` in their URLs

### Solution: exact
* Rumors `exact` will be removed in future
* And that `exact` should default to true in `NavLink`
* But for now do this:

`app.js`

```
// MORE CODE
<NavLink to="/" activeClassName="is-active" exact={true}>
// MORE CODE
```

* Now only active page is in bold
* On 404 page nothing is bold

## Next - Organize our routes better
