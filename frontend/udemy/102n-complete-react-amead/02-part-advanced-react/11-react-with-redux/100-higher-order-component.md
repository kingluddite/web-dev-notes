# The Higher Order Component
## We will install react-redux
* It is a library that allows us to connect our Redux stores to our React components
* It makes heavy use of a pattern known as "Higher Order Components"

## Exploring "Higher Order Components"
* New file
    - `$ touch src/playground/hoc.js`

`hoc.js`

```
console.log('hoc is running in webpack');
```

* Point webpack to this new test file

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/playground/hoc.js',
  output: {

// MORE CODE
```

* Run webpack dev server

`$ npm run dev-server`

* Make sure you see `hoc is running in webpack` in client console

## What is the definition of a Higher Order Component (HOC)?
* A component (this will be the HOC) that renders another component

### Let's create a basic component
* It will be a simple SFC (stateless functional component)
* It will include:
    - Import react and react-dom
    - define a component (call it `Info`)
* Pass props into the component
* Add basic HTML with some output and show props.info to the UI
* Render the component to the UI, pass in the Info component
    - Pass it an info prop with a value you set
    - Attach the component to the root element of your app

`hoc.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info} </p>
  </div>
);

ReactDOM.render(
  <Info info="This is important" />,
  document.getElementById('root')
);
```

* Here's what you should see:

![simple react component](https://i.imgur.com/cXDLyWg.png)

## How do we introduce the HOC pattern?
* We may have dozens of regular components and one HOC component
    - We use one HOC component to render all the others
    - Reusing code saves time!

### The goal of HOC is to reuse code
* Example:
    - We have a message to alert our readers that the following information is "Top Secret"

#### Advantages of HOC
* Reuse code
* Perform "Render hijacking"
* Add prop manipulation
* Abstract state

#### Steps in creating a HOC
1. Create a regular function (not a React component)
    * **note** This is not named like a component with an uppercase letter but instead it is spelled with camelCase as it is just a regular function

```
const withAdminWarning = () => {

}
```

2. What is returned from the above function will ultimately be the HOC so set it to a variable

```
const withAdminWarning = () => {
  // warning here
};

const AdminInfo = withAdminWarning();
```

* **note** We spell `AdminInfo` with capital letters because it will be holding a component

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info} </p>
  </div>
);

ReactDOM.render(
  <Info info="This is important" />,
  document.getElementById('root')
);

const withAdminWarning = () => {
  // warning here
};

const AdminInfo = withAdminWarning(Info);
```

3. Pass our Component into our HOC

```
const withAdminWarning = (Info) => {
  //
};

const AdminInfo = withAdminWarning(Info);
```

* **note** Since we could ultimately pass many functions into our HOC (the main purpose is to save us from typing and resuse code) it is a common naming convention to name the HOC function argument `WrappedComponent`

```
const withAdminWarning = (WrappedComponent) => {
  console.log(Info);
};

const AdminInfo = withAdminWarning(Info);
```

* Remember since `WrappedComponent` is a component we do want to name it with a starting uppercase letter

4. Inside the function we want to return a new component and this will be the HOC

```
const withAdminWarning = WrappedComponent => {
  return // component we return here will be the HOC
};

const AdminInfo = withAdminWarning(Info);
```

* We will return a SFC and we'll implicitly return some JSX

```
const withAdminWarning = WrappedComponent => props => {
  //
};

const AdminInfo = withAdminWarning(Info);
```

* We set up props (we'll use it in a moment)
* We want to return whatever we want our component to render
    - Inside the div we have some goals
        + Add the warning in
        + Also make sure we render the WrappedComponent (because the goal is to display the message ABOVE the component wrapper)

```
const withAdminWarning = WrappedComponent => props => (
  <div>
    <p>Whatever comes after this will be "Top Secret"</p>
  </div>
);

const AdminInfo = withAdminWarning(Info);
```

5. Now we have our message in place and now we need to render our regular component (so we just create an instance of it)

```
const withAdminWarning = WrappedComponent => props => (
  <div>
    <p>Whatever comes after this will be "Top Secret"</p>
    <WrappedComponent />
  </div>
);

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <Info info="This is important" />,
  document.getElementById('root')
);
```

* Above is our very first HOC

## How do we use this?
* Instead of rendering `Info` we render `AdminInfo`

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info} </p>
  </div>
);

const withAdminWarning = WrappedComponent => props => (
  <div>
    <p>Whatever comes after this will be "Top Secret"</p>
    <WrappedComponent />
  </div>
);

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AdminInfo info="This is important" />,
  document.getElementById('root')
);
```

* That is our very first HOC
* It will allow us to reuse code adding adminMessage to as many other components as we like without needed this code in each of those components:

![code once, use often](https://i.imgur.com/iEbv5ck.png)

* Congrats we just used the Higher Order Component pattern

## Houston we have a problem
* Our props are not getting passed in

### We can fix this issue using the `spread operator`
* **note** When we are instantiating a component inside of JSX we can nest curly braces to create an JavaScript expression 
* And we can spread out any given object we like
    - We will spread out props `...props`
        + This has the effect of taking every `key/value` pair on that object and passing them down as `props`
* So whatever props are passed to AdminInfo we pass in props and can access all of them using `...props` inside `WrappedComponent`

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info} </p>
  </div>
);

const withAdminWarning = WrappedComponent => props => (
  <div>
    <p>Whatever comes after this will be "Top Secret"</p>
    <WrappedComponent {...props} />
  </div>
);

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AdminInfo info="This is important" />,
  document.getElementById('root')
);
```

* Now when you view it you'll see the `props` successfully passed down
* This is a very useful technique that will come in handy in complex apps

## Show or hide this secret message
* We will pass down a boolean prop and initially set it to false

```
// MORE CODE
const withAdminWarning = WrappedComponent => props => (
  <div>
    {props.isAdmin && <p>Whatever comes after this will be "Top Secret"</p>}
    <WrappedComponent {...props} />
  </div>
);

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AdminInfo isAdmin={false} info="This is important" />,
  document.getElementById('root')
);
```

* That will hide the `prop` message
* Change the boolean value to true and you will see it again

```
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info} </p>
  </div>
);

const withAdminWarning = WrappedComponent => props => (
  <div>
    {props.isAdmin && <p>Whatever comes after this will be "Top Secret"</p>}
    <WrappedComponent {...props} />
  </div>
);

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AdminInfo isAdmin info="This is important" />,
  document.getElementById('root')
);
```

* By adding props onto the HOC, we create an HOC that is even more reusable and versatile
* **note** We will see this HOC pattern extensively with the React Redux library
    - They'll give us a function similar to `withAdminWarning`
    - We'll pass our components inside of them
    - And the end result will be a new component that we'll be using
    - And this new component that we'll be using will have access to the Redux store

## Challenge
* Call a function (you will create) called requireAuthentication
* Pass into that function the component you want to wrap
* We'll pass in our Info component
* Name the variable holding that `AuthInfo`
* We want to show AuthInfo when the user is authenticated or show a message when they are not
* Commonent out our previous render code and instead render out AuthInfo add a prop named `isAuthenticated` with a value of `true`
    - It will be true when you should see the component
    - And hidden when it is false but then you should see a message like 'Please log in to view the info'

### Challenge Solution
```
// MORE CODE

// requireAuthentication
const requireAuthentication = WrappedComponent => props => (
  <div>
    {props.isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <p>Please log in to view the info</p>
    )}
  </div>
);
const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(
//   <AdminInfo isAdmin info="This is important" />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="This is important" />,
  document.getElementById('root')
);

```

* Remember the function we assign to `requireAuthentication` is not the HOC it is just a regular function that returns the HOC

## Further Study
* [react hoc in depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)

## Next - Connect React component to Redux
* We'll use the same HOC pattern we just learned
* But we'll use a HOC component provided by a library
