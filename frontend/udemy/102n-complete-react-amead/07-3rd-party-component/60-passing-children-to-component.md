# Passing Children to component
* What if we had a header and footer and wanted stuff inbetween to be dynamic and specific to each individual page?
    - How would we set that up?

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = () => {
  return (
    <div>
      <p>header</p>
      <p>footer</p>
    </div>
  );
};
ReactDOM.render(<Layout />, document.getElementById('app'));
```

* That will show header and footer on the UX

## Here is one approach to getting JSX into a layout
```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => {
  return (
    <div>
      <p>header</p>
      {props.content}
      <p>footer</p>
    </div>
  );
};

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(<Layout content={template} />, document.getElementById('app'));
```

## Here is another approach using `props.children`
```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => {
  return (
    <div>
      <p>header</p>
      {props.children}
      <p>footer</p>
    </div>
  );
};

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(
  <Layout>
    <p>This is inline content</p>
  </Layout>,
  document.getElementById('app')
);
```

* This gives us more context in our code

## Parenthesees
* space it out (jsprettier does a nice job, otherwise use parentheses like):

```
ReactDOM.render((
  <Layout>
    <p>This is inline content</p>
  </Layout>
  ),
  document.getElementById('app')
);
```

* When it is nested like this it makes it clear that it makes it clear tha `p` is a child of `Layout`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => {
  return (
    <div>
      <p>header</p>
      {props.children}
      <p>footer</p>
    </div>
  );
};

ReactDOM.render(
  <Layout>
    <div>
      <h1>Page Title</h1>
      <p>This is my page</p>
    </div>
  </Layout>,
  document.getElementById('app')
);
```

## Important to understand this technique
* Because it is used a lot in 3rd party components
* We will install lots of components we did not write
* They will have their own APIs and they will expect certain things to be passed in
    - A lot will be us passing in JSX

## Takeaway
* We can pass JSX into a component and that component can choose to use it as it wants
