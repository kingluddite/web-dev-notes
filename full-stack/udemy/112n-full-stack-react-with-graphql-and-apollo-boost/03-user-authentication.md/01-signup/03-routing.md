# Add Routing with react-router-dom
## Add a new package into `client` folder
`$ npm i react-router-dom`

* Return to root folder

`$ cd ../`

* Run dev script again

`$ npm run dev`

`client/index.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';

// MORE CODE

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



