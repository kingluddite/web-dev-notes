# Stateless Functional Componentsaaa
This is an alternative to class-based Components

## Experiment with Stateless Functional Component
`client/main.js`

## About Stateless functional components
* These 3 words are very important (_Stateless functional component_)
* This is a Component
    - Which means it can be used like any other React Component we define
* It is just a function and is not an ES6 class
* It does not support React Component `state`
    - We could not make `Login` a Stateless functional component because it has an `error` **state** which lets it keep track of that error message over time rendering it and removing it from the browser
    - `Header` would be a great candidate for Stateless functional component
* Capitalize Stateless functional components
    - It is still required for Stateless functional component

## Do I need a render() method?
Not exactly

```
// Stateless functional component
import React from 'react';
const MyComponent = () => {
    return (
      <div>
        <h1>Stateless functional component</h1>
      </div>
    )
};
```

* You don't need to use a `render()` method because when you define a Stateless functional component that code acts like the `render()` method so you do not have to explicitly write it out
* Whatever is inside the `return()` that gets rendered to the screen
* Now our Component is set up and we're ready to use it

## Render `MyComponent` to our app
We'll temporarily swap out the routes for `MyComponent`

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// Stateless functional component
import React from 'react';
const MyComponent = () => {
    return (
      <div>
        <h1>Stateless functional component</h1>
      </div>
    )
};

Meteor.startup(() => {
  ReactDOM.render(<MyComponent />, document.getElementById('app'));
});
```

* View in browser and you'll see `Stateless functional component`

## Do we have access to `props`?
* Yes, in a Stateless functional component we have access to `props`
* But instead of `this.props` that you would use in a **class-based** Component, you just use `props`
    - You don't have access to `this` inside a Stateless functional component

```
/ Stateless functional component
import React from 'react';
const MyComponent = (props) => {
    return (
      <div>
        <h1>Stateless functional component {props.name}</h1>
      </div>
    )
};

Meteor.startup(() => {
  ReactDOM.render(<MyComponent name="John"/>, document.getElementById('app'));
});
```

## Presentation Components
This is what Stateless functional component are perfect for

* It is a `dumb` Component
* It doesn't care where `props` came from
* It doesn't care where in the Application it is rendered
* It is just about presentation and basic user interaction
* `Link` is also a presentational Component
    - It is just used to render three other Components
        + `Header`
        + `LinksList`
        + `AddLink`
    - It is not managing `state`
    - It is not managing anything from the Database
* `Header` is also a presentational Component
    - It knows all it has to do is call logout. It doesn't do anything when it succeeds or fails, it is `dumb`
    - It is only concerned with rendering information, it is not concerned with how the information got there
* `LinksList` is not a presentational Component
    - This is known as a `Container Component`
        + They are complex
        + They manage `state` over time
        + They query the Database
            * It maintains a list of links
            * It subscribes to the links

## Why would I want to use Stateless functional components?
* They are a lot faster than ES6 class-components
    - Because there is no complexity, it is just a function that gets called
    - Doesn't have `state`
    - Doesn't support Lifecycle Methods
    - It is easier to read, updated and maintain
    - It is a good idea to use them when you can

## Convert class-based Component to Stateless functional component
`Link`

Change this:

```
import React, { Component } from 'react';
import Header from './Header';
import LinksList from './LinksList';
import AddLink from './AddLink';

class Link extends Component {
 render() {
   return (
     <div>
       <Header title="Your Links" />
       <LinksList />
       <AddLink />
     </div>
   );
 }
};

export default Link;
```

To this:

```
import React from 'react';
import Header from './Header';
import LinksList from './LinksList';
import AddLink from './AddLink';

export default () => {
      return (
        <div>
          <Header title="Your Links" />
          <LinksList />
          <AddLink />
        </div>
      );
}
```

## Exercise
Convert `Header` and `NotFound` to Stateless functional components

* We can use PropTypes on Stateless functional components
* We use a variable `const Header` with the `Header` Component (_and we did not use one when we created `Link` as a Stateless functional component_)
* The reason is we need to provide `PropTypes` with a variable name

<details>
  <summary>Solution</summary>
`Header.js`

```
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const Header = (props) => {
    const onLogout = () => {
      Accounts.logout();
    }
    return (
      <div>
        <h1>{props.title}</h1>
        <button onClick={onLogout()}>Logout</button>
      </div>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
```

### Alternative Way
Easier way to call function

```
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const Header = (props) => {
    
    return (
      <div>
        <h1>{props.title}</h1>
        <button onClick={() => {
          Accounts.logout();
        }}>Logout</button>
      </div>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
```

We can use ES6 syntax to simplify even further

```
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const Header = (props) => {

    return (
      <div>
        <h1>{props.title}</h1>
        <button onClick={() => Accounts.logout() }>Logout</button>
      </div>
    );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
```

## Note - You would not want to do this:

`<button onClick={Accounts.logout}>Logout</button>`

That would call `Accounts.logout()` with an event argument and that could cause unexpected behavior

* Test and it should work as before
* Change the `prop` for Header to a Number and see 

![if the PropTypes warning is triggered](https://i.imgur.com/YH7HQ68.png)

`NotFound`

```
import React from 'react';

export default () => {
    return <p>Not Found</p>
};
```
</details>
