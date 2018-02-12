# Higher Order Components
## Install React Redux
* Library that enables us to connect our Redux stores to our React components
* Makes use of a pattern known as "Higher Order Components"

`playground/higher-order-component.js`

* And update `webpack.config.js`

```
module.exports = {
  entry: './src/playground/higher-order-component.js',
```

# run `$ yarn run-dev-server`

## What is a Higher Order Component (HOC)
* HOC - is the shorthand you will see online
* All it is, in a regular React Component (HOC) that renders another component
* Best way to see how it works is to see it in action

### First - The normal way to create a react component
`higher-order-component.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
);

ReactDOM.render(
  <Info info="These are the details" />,
  document.getElementById('app')
);
```

* Nothing special here
* This is just a stateless functional component

## Stop! HOC time
* We want to create a HOC that will create 7 or 8 or more similar components to the one we just created
* We want a way to add private information to this SFC

### Goal of HOC
* Reuse Code

#### Advantages to using HOC
* Render hijacking
* Prop manipulation
* Abstract state

#### Steps to create HOC
1. Create a regular function

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
);

const withAdminWarning = () => {

}

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <Info info="These are the details" />,
  document.getElementById('app')
);
```

* Common pattern to use `WrappedComponent`
* It is a component so we start with capitalize first letter of each word

```
const withAdminWarning = (WrapperComponent) => {

}
```

* The component we return from the above function will be the HOC

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      <p>This is private info. Please don't share</p>
      <WrappedComponent />
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <Info info="These are the details" />,
  document.getElementById('app')
);
```

* That is our Higher Order Component

## How do we use a HOC?
* Instead of rendering `<Info />` we render `<AdminInfo />`

```
// MORE CODE
const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AdminInfo info="These are the details" />,
  document.getElementById('app')
);
```

## Take it for a test drive
* You see our original content
* But now we have the private message too
* Now we can reuse code adding that private message to as many components as we want

## Houston we have a problem
* Info is not getting the props 'These are the details'
* Easy to fix with the ES6 object spread operator

```
// MORE CODE
const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      <p>This is private info. Please don't share</p>
      <WrappedComponent {...props} />
    </div>
  );
};
// MORE CODE
```

* Add and save and you'll see `These are the details`

## Use conditional to show/hide private message
```
// MORE CODE
const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AdminInfo isAdmin={false} info="These are the details" />,
  document.getElementById('app')
);
```

* Now our private message is hidden
* But if you make this change, you'll see it:

```
// MORE CODE
ReactDOM.render(
  <AdminInfo isAdmin={true} info="These are the details" />,
  document.getElementById('app')
);
```

* The ReactRedux library uses the HOC pattern extensively

##Challenge
* Message "Please log in to view info"

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
);

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated && <p>Please log in to view</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="These are the details" />,
  document.getElementById('app')
);
```

* Changing `isAuthenticated` to `false` hides the login message and `true` shows the login message
