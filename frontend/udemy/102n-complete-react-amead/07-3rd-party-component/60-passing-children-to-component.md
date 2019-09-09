# Passing Children to component

## built in `children` prop
* This is a fantastic **tool**
* Makes is simple to pass in custom JSX to a given component

## All our components
* Currently all our components know exactly what they need to render
  - It is explicitly defined directly inside the component's `render()` method

### What does `AddOption` need to render?
* div
* form
* input
* button
* (and sometimes a paragraph tag)

`AddOpton.js`

```
// MORE CODE

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }

// MORE CODE
```

`IndecisionApp.js`

* div
* Header
* Action
* Options
* AddOption

```
// MORE CODE

  render() {
    const subtitle = 'Let your computer tell you what to do';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }

// MORE CODE
```

## But what if we had a layout component?
* We wanted a **header** and a **footer** and we wanted some stuff in the middle and we wanted stuff in the middle to be dynamic specific to each individual page?
  - How would we set that up?

### Let's try to do that
* We will modify app.js

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = () => (
  <div>
    <p>header</p>
    <p>footer</p>
  </div>
);
ReactDOM.render(<Layout />, document.getElementById('root'));
```

* That will render header and footer to UI - no surprises here

## But what if I have a specific page
* And I want to pass the JSX into that
* Let's add some custom JSX

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = () => (
  <div>
    <p>header</p>
    <p>footer</p>
  </div>
);

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(<Layout />, document.getElementById('root'));
```

* Now we have this JSX data and we want to render it dynamically inside of our Layout component and specifically in between the header and footer content of Layout... how can we do that?
  - When we want to pass data into a component we just pass it in as a `prop`

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => (
  <div>
    <p>header</p>
    {props.content}
    <p>footer</p>
  </div>
);

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(<Layout content={template} />, document.getElementById('root'));
```

* That will work and you'll see the content in between header and footer
* This is great and now Layout can be used for other pages
  - I just define the JSX specific to that particular page and I pass it in to the component where I want to use it as a prop and it will always be in the same location on every page with the header and footer render on every single page
  - This is a valid approach
  - But there is a more elegant way to pass JSX into your components

## Self closing vs Opening and closing tag
* Self closing

`<Header />`

* Open and closing tag

`<Header></Header>`

* Let's try this in `app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => (
  <div>
    <p>header</p>
    {props.content}
    <p>footer</p>
  </div>
);

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(<Layout></Layout>, document.getElementById('root'));
```

* Now doing it this way we can define JSX inside those open and closing tags

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => (
  <div>
    <p>header</p>
    {props.content}
    <p>footer</p>
  </div>
);

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(
  <Layout>
    <p>This is inline</p>
  </Layout>,
  document.getElementById('root')
);
```

## `children` prop
* Now we are currently not using that nested JSX inside our opening and closing tag
* To use it we can use the `children` prop
  - This is why we call this a built-in prop versus a prop we set up ourselves
    + props (SFC)
    + this.props (CBC)

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => (
  <div>
    <p>header</p>
    {props.children}
    <p>footer</p>
  </div>
);

const template = (
  <div>
    <h1>Page Title</h1>
    <p>This is my page</p>
  </div>
);
ReactDOM.render(
  <Layout>
    <p>This is inline</p>
  </Layout>,
  document.getElementById('root')
);
```

* Now will will see `This is inline` in between header and footer in browser
* So now we can pass JSX inside open and closing tags versus passing it in as a prop

## What is the benefit of using the `children` prop?
* It allows us to give a little more context when we look at the code
  - When inside the tags we see the JSX is inside it as opposed to passing it in as a prop
  - We can add as much complexity as we want inside the tags

`app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

const Layout = props => (
  <div>
    <p>header</p>
    {props.children}
    <p>footer</p>
  </div>
);

ReactDOM.render(
  <Layout>
    <div>
      <h1>Page Title</h1>
      <p>This is my page</p>
    </div>
  </Layout>,
  document.getElementById('root')
);
```

* Now it is showing up what we saw before to the browser UI

## This technique is used all the time with Third party components
* We will be installing and using component we did not write
* These components will have their own API
  - They will expect certain things to be passed in
  - A lot of that will involve us passing in JSX
  - We'll see this with ReactModal
  - We won't define the background or the box just the stuff inside the modal box
  - We'll put those things inside the component that we get from ReactModal

## Next - Install and use modal component

* Revert `app.js` to this:

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```
