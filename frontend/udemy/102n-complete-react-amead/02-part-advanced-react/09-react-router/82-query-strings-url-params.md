# Query Strings and URL Parameters
## Route gives us access to extra `props`
* We will alter our `EditExpensePage` to log props
    - Just to see what they are
    - We could also use the React Dev tool to see all the props we have access to

`EditExpensePage.js`

```
import React from 'react';

const EditExpensePage = props => {
  console.log(props);
  return <div>This is the edit expense page</div>;
};

export default EditExpensePage;
```

![all props](https://i.imgur.com/g6EyaZm.png)

* `history` - mostly methods - enable us to alter our history
    - redirect the user programmatically via JavaScript
* `match` - talks about the route and how it's a match
    - has `params` which will hold the query string
* `location` - info about the current URL

`http://localhost:8080/edit?query=rent&sort=data`

* Enter above URL and press enter
* View location search and you'll see

![location search](https://i.imgur.com/MnIKzIQ.png)

* We can use query string like above to filter the data that is shown to the screen

## Hash
* Use to scroll down pages to container with an `id` of **contact**
    - `http://localhost:8080/edit#contact-us`
    - You will see location `prop` with property of **hash** holding `#contact-us`

![hash contact us](https://i.imgur.com/9p36bDS.png)

## How can we set up dynamic URLS
*  What if we want to edit a specific record?
*  http://localhost:8080/edit is not a good URL
    -  http://localhost:8080/edit/33 (could point to a specific record to edit by id)
    -  http://localhost:8080/edit/44 (a different record)
*  But how do we make that dynamic?

`AppRouter.js`

```
// MORE CODE
<Route path="/edit/:id" component={EditExpensePage} />
// MORE CODE
```

* Browse to http://localhost:8080/edit/199 and you'll see we get the edit page content

![params](https://i.imgur.com/VxEURhR.png)

* And above shows us we have access to the id through `params` of `match`
* And we can access that params like this:

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
* Change the id and the page will update with the id change

## 404
* `http://localhost:8080/edit` gives us a 404 page
* We want that as we'll never navigate to just that URL
    - We will always have an id of the record we want to edit
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
