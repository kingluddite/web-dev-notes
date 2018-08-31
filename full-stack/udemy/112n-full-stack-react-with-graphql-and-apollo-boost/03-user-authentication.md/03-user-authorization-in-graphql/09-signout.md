# Signout
## Add Signout

`Auth/Signout`

```
import React from 'react';

const Signout = () => {
  return <button>Signout</button>;
};

export default Signout;
```

* Update `index.js`

```
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Signout from './Auth/Signout';

// MORE CODE

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
     // MORE CODE
      <li>
        <Signout />
      </li>
    </ul>
    <h4>
      Welcome, <strong>{session.getCurrentUser.username}</strong>
    </h4>
  </Fragment>
);
```

* Should work the same
* Just more organized now

## Make react forget about our current use using `ApolloConsumer` from react-apollo
* We will use ApolloConsumer's `client`

`Signout.js`

```
import React from 'react';
import { ApolloConsumer } from 'react-apollo';

const Signout = () => (
  <ApolloConsumer>
    {client => {
      console.log(client);

      return <button>Signout</button>;
    }}
  </ApolloConsumer>
);

export default Signout;
```

* Comment out log from `withSession.js`

```
// MORE CODE

if (loading) return null;
      // console.log(data);

      // MORE CODE
```

## Test in browser
* refresh page
* You will see DefaultClient in console
* Lots of stuff inside DefaultClient
    - We want to use `resetStore`
    - This will help apollo forget about the current user
    - Anytime we click on this button we want resetStore to be called

`Signout.js`

```
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignout = (client, history) => {
  // clear token
  localStorage.setItem('token', '');
  client.resetStore();
  // redirect using withRouter
  history.push('/');

};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      // console.log(client);

      return <button onClick={() => handleSignout(client, history)}>Signout</button>;
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
```

* We clear our token
* We import withRouter so we can use resetStore
* We use client.resetStore() to remove user
* We destructure `history` and pass it into event handler so we can redirect to home page when we click to signout

## Test in browser
* View token in Application tab of browser console
* Click signout button and watch token is set to an empty string and we are redirected to home page
