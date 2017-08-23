# Refactoring App
## Our Current `Action Creator`

`/client/src/actions/index.js`

```js
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
```

* I want to add this `Action Creator` to one of Components inside our app
* I also want to make sure the instant our app boots up we fetch the user and then do something with them

![fetch user on boot](https://i.imgur.com/VRIPgbm.png)

## Where should we add our `Action Creator` to?
* I suggest the `App` Component
* Because it really just contains our routing logic

### But maybe we should add the `Action Creator` to the Header Component?
* The Header is what cares if the user is logged in so should call the `Action Creator`?
    - You are right
    - But later it won't just be the header that cares if the user is logged in or not
    - Because there will be other locations `App` is better and more scalable

## App Component is a functional Component
* We only want to fetch our user the very first time our app is rendered to the screen
* This means we should refactor this functional Component to be a class based Component so that we can use LifeCycles

### Convert to class based Component
`App.js`

```
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  render() {
    return (
      <div className="container">
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
  }
}

export default App;
```

## Add our Lifecyle
* We want to call fetchUser as soon as App Component is rendered to the screen
* componentDidMount() vs componentWillMount()
    - Don't we want to load the user before our App Component is rendered?
    - Yes but in the future `componentWillMount()` might be called many times automatically
    - By convention `componentDidMount()` is now looked upon as being the preferred location to make any type of initial Ajax request
    - In addition, the different in type between `componentDidMount()` and `componentWillMount()` is essentially nil/0
        + So there isn't a big difference in the speed of the request

`App.js`

```
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="container">
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
  }
}
```

## Next
* Wire this App Component up to receive `Action Creators` from the Redux side of our app
* That is where we bring in the use of the `connect` helper from the React Redux Library
