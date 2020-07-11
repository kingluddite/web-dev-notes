# Not Found Page & Theme Workaround
* **note** For this we'll work in development environment

`$ npm run dev`

## Add a not found component
* If we go to a wrong URL we just get a blank page
* Let's add a 404 page

## Normally adding a 404 page is easy
* But our app is structured in a way that we have a **gotcha**

`App.js`

```
// MORE CODE

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;

// MORE CODE
```

* The `Landing` page is outside of the `Switch`
    - We did this because we didn't want the Landing page to have a container around it (if we did have a container our image would not cover the full page)
* A couple of ways around this


## Let's create the NotFound component 
* `rafce`

`src/components/layout/NotFound.js`

```
import React from 'react';

const NotFound = () => {
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triange"></i> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </>
  );
};

export default NotFound;
```

* Add Component to `App.js`

`App.js`

```
// MORE CODE

import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';

// MORE CODE

<Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" render={null} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </Fragment>

// MORE CODE
```

* The other way (cleans up `App.js`) is:

`routing/Routes.js`

* Bring in all routes and change paths to imported components
* Import React
* Import Route and Switch Named Exports
* Import `Routes` into App.js

`App.js`

```
// MORE CODE

<>
 <Navbar />
  <Switch>
     <Route exact path="/" component={Landing} />
     <Route component={Routes} />
  </Switch>
</>

// MORE CODE
```
