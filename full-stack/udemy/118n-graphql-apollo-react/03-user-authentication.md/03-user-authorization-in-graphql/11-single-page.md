# Create Genealogy Page
* Get Genealogy page from path

## List of Genealogies
* Make them links that take to single page about that Genealogy
* To do this we'll use the `_id` property of the genealogy

`componets/Genealogy/GenealogyPage`

```
import React from 'react';

const GenealogyPage = () => {
  return (
    <div>Genealogy Page</div>
  );
};

export default GenealogyPage;
```

## Index page
`index.js`

```
import GenealogyPage from './components/Genealogy/GenealogyPage';

 // MORE CODE

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/genealogy/add" component={AddGenealogy} />
        <Route path="/genealogy/:_id" component={GenealogyPage} />
        // MORE CODE
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
);
```

## Visit Route
`http://localhost:3000/genealogy/1234`

* You will see Genealogy Page

## How do we get string at end of path?
### withRouter
* We will need to use `withRouter` again from `react-router-dom`
* We will destructure `match` from our `props`

`GenealogyPage`

```
import React from 'react';
import { withRouter } from 'react-router-dom';

const GenealogyPage = () => {
  return <div>Genealogy Page</div>;
};

export default withRouter(GenealogyPage);
```

* View in browser
* `http://localhost:3000/genealogy/1234`
* Use React Dev Tools and search for `withRouter`
* Open it and you'll see `match.params._id = "1234"`

`GenealogyPage.js`

```
import React from 'react';
import { withRouter } from 'react-router-dom';

const GenealogyPage = ({ match }) => {
  // console.log(match.params._id);
  const { _id } = match.params;
  return <div>Genealogy Page</div>;
};

export default withRouter(GenealogyPage);
```

`GenealogyItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const GenealogyItem = ({ _id, firstName, lastName }) => {
  return (
    <li>
      <h4>
        <Link to={`/genealogy/${_id}`}>
          {firstName} {lastName}
        </Link>
      </h4>
    </li>
  );
};

export default GenealogyItem;
```

* Now when on home page you can click on link headings of each `Genealogy` and it will take you to single page


