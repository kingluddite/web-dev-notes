# Query Strings and URL Parameters
* React Router is passing some things into our Component that we don't know about
* React Router's Route finds a match and points to a Component but also passes some props down to that Component
* We will dump it to the console to see what we have access to

## EditExpensePage
* We want to log out props
* We can't use console.log() when we use an implicit return like below:

`EditExpensePage.js`

```
import React from 'react';

const EditExpensePage = () => (
  <div>This is from the edit expense component yo!</div>
);

export default EditExpensePage;
```

* Instead we need to switch it to a manual return so we can use a `console.log()`

```
import React from 'react';

const EditExpensePage = props => {
  console.log(props);

  return <div>This is from the edit expense component yo!</div>;
};

export default EditExpensePage;
```

* Visit the EditExpensePage and you will see it logged out
* Even better use the React Dev Tool tab in Chrome and you will see props has:
  - history
    + Very useful and contains mostly methods that enable us to manipulate the `history`
      * Enable us to redirect the user programmatically via JavaScript
      * Currently users can only change pages if they explicitly click on link
      * With history we can change this and say when we enter an expense and submit it, we don't want to keep the user on the page we want to send them to a thank you page... so we want to redirect the user
  - `match`
    + We'll use `params` later
    + Now we are using just the `match` part, it is an exact match? isExact, there is a path and url we also have access to
  - `locations`
    + Contains info about the current URL
      * We see pathname is populated but we'll also use `hash` and `search` later on

![all props](https://i.imgur.com/g6EyaZm.png)

## Let's create a query string

`http://localhost:8080/edit?query=rent&sort=data`

* Enter above URL and press enter
* View location search and you'll see:

![location search](https://i.imgur.com/MnIKzIQ.png)

* We can use query string like above to filter the data that is shown to the screen

## Hash
* If you have an id on the page and want to scroll down to it you would use `hash` which is the `#` symbol
* Use to scroll down pages to container with an `id` of **contact**
    - `http://localhost:8080/edit#contact-us`
    - You will see location `prop` with property of **hash** holding `#contact-us`

![hash contact us](https://i.imgur.com/9p36bDS.png)

## How can we set up dynamic URLS
*  What if we want to edit a specific record?
*  `http://localhost:8080/edit` is not a good URL
    -  `http://localhost:8080/edit/33` (could point to a specific record to edit by `id`)
    -  `http://localhost:8080/edit/44` (a different record)

### But how do we make that dynamic?
* React Router gives us the power to do this

`AppRouter.js`

```
// MORE CODE
<Route path="/edit/:id" component={EditExpensePage} />
// MORE CODE
```

## history > match > params
* Browse to http://localhost:8080/edit/199 and you'll see we get the edit page content

![params](https://i.imgur.com/VxEURhR.png)

* And above shows us we have access to the `id` through `params` of `match`
* And we can access that `params` like this:

`{props.match.params.id}`

`EditExpensePage.js`

```
import React from 'react';

const EditExpensePage = props => {
  console.log(props);
  return (
    <div>
      Editing the expense with <strong>id</strong> of {props.match.params.id}
    </div>
  );
};

export default EditExpensePage;
```

* That will show `Editing the expense with id of 199` on the screen when you visit `http://localhost:8080/edit/199`
* Change the `id` and the page will update with the `id` change

## 404
* `http://localhost:8080/edit` gives us a 404 page
* **We want that!** as we'll never navigate to just that URL
    - We will always have an `id` of the record we want to edit

## Remove Edit link
* So we can remove the edit link as we'll never go to it directly

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
    <NavLink to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

export default Header;
```
