# Always Visible Components
* Add other routes

`App.js`

```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={Landing} />
          <Route path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/header" component={Header} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
```

## Test
* Landing words as it should
* But `/surveys` shows Landing and Dashboard... not good
* `React Router` takes that path URL and tries to match every single path and that is why on `/surveys` we see Landing `/` and also `/surveys`
* `React Router` "greedily" matches the path, does path have a `/` in it?, then show that Component, does it have a `/surveys` in it? then show that Component

## How can we fix this path issue?
* Easy
* Like this:

`<Route exact={true} path="/"...`

`App.js`

```
// more code
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Landing} />
          <Route path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/header" component={Header} />
        </div>
      </BrowserRouter>
    </div>
  );
};
// more code
```

## Trick with JSX
* This

`<Route exact={true} path="/" component={Landing} />`

* And this are the exact same

`<Route exact path="/" component={Landing} />`

* JSX will assume you meant to say `exact={true}`
* Not sometimes you might have an app that wants to "greedily match" so that means you may usually use `exact` but there are some cases where you won't use it

## SurveyNew
* Do we need to use `exact` on Surveys? because do we want Dashboard and SurveyNew to be on the same page?
* No
* So we DO use exact and we don't greedily match here

`App.js`

```
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/header" component={Header} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

## Header on every page
* Route is a Component so we can treat it just like we do for all Components

`App.js`

```
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

* You should see

![Header on every page](https://i.imgur.com/Fri222H.png)

* Now our Header Component is on all our routes

## Next
* Put Header into it's own Component
