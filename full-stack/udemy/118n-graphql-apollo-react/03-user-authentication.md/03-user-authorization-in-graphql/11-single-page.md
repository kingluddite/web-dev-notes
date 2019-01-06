# Create Cologne Page
* Get Cologne page from path

## List of CGEolognes
* Make them links that take to single page about that Cologne
* To do this we'll use the `_id` property of the Cologne

`componets/Cologne/ColognePage.js`

```
import React, { Component } from 'react';

class ColognePage extends Component {
  render() {
    return <div>ColognePage</div>;
  }
}

export default ColognePage;

```

## Index page
* We need to add a route that looks for a dynamic variable `:_id`

`index.js`

```
import ColognePage from './components/Cologne/ColognePage';

 // MORE CODE

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search" component={Search} />
        <Route path="/cologne/add" component={AddCologne} />
        <Route path="/cologne/:_id" component={ColognePage} />
        // MORE CODE
      </Switch>
    </Fragment>
  </Router>
);

// MORE CODE
);
```

## Visit Route
`http://localhost:3000/cologne/1234`

* You will see Cologne Page

## How do we get a string at end of path?
### withRouter
* We will need to use `withRouter` again from `react-router-dom`
* We will destructure `match` from our `props`

`ColognePage`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ColognePage extends Component {
  render() {
    return <div>ColognePage</div>;
  }
}

export default withRouter(ColognePage);
```

## View in browser
* `http://localhost:3000/cologne/1234`
* Use React Dev Tools and search for `withRouter`
* Open it and you'll see `match.params._id = "1234"`

`ColognePage.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ColognePage extends Component {
  render() {
    const { match } = this.props;
    // console.log(match.params._id);
    const { _id } = match.params;
    return <div>ColognePage</div>;
  }
}

export default withRouter(ColognePage);
```

`CologneItem.js`

```
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CologneItem extends Component {
  render() {
    const { _id, scentName } = this.props;

    return (
      <li>
        <h4>
          <Link to={`/cologne/${_id}`}>{scentName}</Link>
        </h4>
      </li>
    );
  }
}

export default CologneItem;
```

* Now when on home page you can click on link headings of each `Cologne` and it will take you to single page

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add single page`

## Push to github
`$ git push origin auth` 

## Next - Query backend for Cologne


