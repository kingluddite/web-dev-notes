# Creating a Gated Sign In Component
* Create a wrapper component that lets us know if someone is signed in or not

`PleaseSignIn.js`

* This will be a HOC

```
import { Query } from 'react-apollo';

// GraphQL
// import { CURRENT_USER_QUERY } from './User';

// custom components
// import { Signin } from './Signin';

const PleaseSignIn = props => <p>Please sign in</p>;

export default PleaseSignIn;
```

* Import our HOC and wrap our `CreateItem` component with it

`pages/sells.js`

```
import React, { Component } from 'react';

// custom components
import PleaseSignIn from '../components/PleaseSignIn';
import CreateItem from '../components/CreateItem';

class Sell extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <CreateItem />
        </PleaseSignIn>
      </div>
    );
  }
}

export default Sell;
```

## Test in browser
* Sign out
* Manually go to `/sell` page
* It will say `Please sign in`

### What is the purpose of PleaseSignIn.js?
* Now we'll return whatever is wrapped in it if we use `props.children`

`PleaseSignIn.js`

```
const PleaseSignIn = props => <div>{props.children}</div>;

export default PleaseSignIn;
```

* That will show whatever is inside the HOC
* We need to do a quick check before we do anything

## Add our Query component
`PleaseSignIn.js`

```
import { Query } from 'react-apollo';

const PleaseSignIn = props => (
  <Query></Query>
);

export default PleaseSignIn;
```

* Add our query prop and point to our GraphQL query in User

```
import { Query } from 'react-apollo';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}></Query>
);

export default PleaseSignIn;
```

* Inside query we will have a function (this is the render prop)

```
import { Query } from 'react-apollo';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
  {() => {
    // code here
  }} 
  </Query>
);

export default PleaseSignIn;
```

* Get the `payload` from the `Query` component
    - This is the data that will be returned from our GraphQL

```
import { Query } from 'react-apollo';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
  {(payload) => {
    // code here
  }} 
  </Query>
);

export default PleaseSignIn;
```

* Destructure off of payload `data`, `loading` and `error`

```
import { Query } from 'react-apollo';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
  {({data, loading, error}) => {
    // code here
  }} 
  </Query>
);

export default PleaseSignIn;
```

* So now we need to provide a sign in form (Our Signin component) whenever the user is not logged in
* To do this we just need to check our data returned from the `CURRENT_USER_QUERY` and see if it exists, if it doesn't we can add our `Signin Component`

`PleaseSignIn.js`

```
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

// GraphQL
import { CURRENT_USER_QUERY } from './User';

// custom components
import Signin from './Signin';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error {error.message}</p>;
      if (!data.currentUser) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

PleaseSignIn.defaultProps = {
  children: {},
};

PleaseSignIn.propTypes = {
  children: PropTypes.object,
};

export default PleaseSignIn;
```


* Now If you are on `/sell` and not logged in you will see `SignIn` form and `Please Sign In before Continuing`
* But if you log in, you will see the `CreateItem` form and the logged in `navbar`

### Children
* So we wrap PleaseSignIn around this:

`pages/sell.js`

```
// MORE CODE

<div>
  <PleaseSignIn>
    <CreateItem />
  </PleaseSignIn>
</div>

// MORE CODE
```

* This means we either show what's in `PleaseSignIn` (_which is the `SignIn` form_) or we show the children inside `PleaseSignIn` (_which in this case is the `CreateItem` form_)

### Future Feature
* We will extend this feature to also handle permissions
* But for now we can use this simple wrapper function around all components that need the `user` to be logged in before they can see/access them
