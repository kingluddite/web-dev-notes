# Add Routing with react-router-dom
* As it stands now we have an app with one page
* What if we want to have an about page or a contact page
* We need to set up routing so that when specific routes are "hit" the React will rearrange the virtual DOM to only show the component specified on that route

## Add a new package into `client` folder

`$ npm i react-router-dom`

* Return to root folder

`$ cd ../`

* Run dev script again

`$ npm run dev`

`client/index.js`

```
// MORE CODE

import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// MORE CODE

import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
});

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
);  

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);
```

# Auth
* Create `client/components/Auth`
* Create two files inside the **Auth** folder (`Auth/Signin.js` and `Auth/Signup.js`)

`Signin.js`

```
import React, { Component } from 'react';

class Signin extends Component {
  render() {
    return <div>Signin</div>;
  }
}

export default Signin;
```

`Signup.js`

```
import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return <div>Signup</div>;
  }
}

export default Signup;
```

## Test routes
* `http://localhost:3000/` -- home page
* `http://localhost:3000/signin` -- shows signin route
* `http://localhost:3000/signup` -- shows signup route
* `http://localhost:3000/badroute` -- doesn't match a route, Redirect kicks in and reroutes to home page

## Additional Resources
* **Note** Reach Router - getting a lot of press and might replace react router so here is a look:
* [reach router intro video](https://www.youtube.com/watch?time_continue=13&v=3tgz1E4MsAk)



