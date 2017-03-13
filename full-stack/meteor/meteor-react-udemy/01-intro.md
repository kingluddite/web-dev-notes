# Learning Meteor & React
2 separate libraries that work well together but are very different

## Section I
The React Library

## Section II
The Meteor Library

## Create Meteor project
CLI for metero

* gives us
    - place to put our code
    - place to keep track of project dependencies
        + add third party libraries like react
            * react is not included by default
                - we have to manually add to our meteor project
    - development web server
        + start a local server where we can start up our web browser and then immediately see on the dev web server

focusing on React (the library)

open terminal
`$ meteor create images`

* it will install meteor with default packages
* and automatically create project
* `$ cd images`
* Run meteor with `$ meteor`
* localhost:3000 default meteor project

delete server, client
Now our project is empty

## How to install React library
react 3rd party dependency
![how packages are installed](https://i.imgur.com/TNe3Rcc.png)

free packages, libraries exist
we can reach out to the npm Registry (100,000's of libraries exist that we can install instantly)

we install react as a dependency to our meteor project

## how to install a dependency

`$ npm i -S react`

look after install how react depends on several libraries

we add node_modules after install (all packages we install get installed in node_modules)

`package.json`

```json
{
  "name": "images",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "meteor-node-stubs": "~0.2.4",
    "react": "^15.4.2"
  }
}
```

lists all npm modules that we installed and -S added to dependencies 
this file defines configuration about our project
the name of our project...

meteor-node-stubs - default meteor packages

.gitignore

we didn't delete .meteor (holds meteor specific info - we shouldn't have to touch files in that directory)

![diff between Meteor and React](https://i.imgur.com/uW40w1C.png)

We use them together

Meteor - keeps track of data in our app
* keep track of tweets or emails, contacts

React - takes data and produces HTML from it
* also handles user events (clicks, type in input field, hover over button, picture, any event with mouse or keyboard react will handle)

## Start coding
create `client` folder

anything in client will be loaded immediately by meteor
any code that we want to be executed inside of our web browser we place inside this `client` folder

`client/main.html`

```
<head>
  <title>Image Bucket</title>
</head>

<body>
  <div>
    React App  
  </div>
</body>
```

Anytime someone visits localhost:3000 this file will automatically be loaded

## View in browser - you'll see `React App`

Any changes, the webpage, the webpage will automatically reload for us

## where do we put js?
Inside client folder because it will be run immediately inside our browser

`main.js`

`console.log('hello')`

And you'll see `hello` in the console

Now let's code our App

We install packages with `npm` but we can only use them when we `import` them

`import React from 'react'`

* whatever code is inside `node_modules/react` will be imported and assigned to the `React` variable

## Create a Component
What is a component?
A single function or object which produces some amount of HTML and allows us to render that to the screen

```
// Create a component
const App = () => {
  return (
    <div>
      React App #2
    </div>
  );
};
```

* This looks like HTML but it is JSX
* Meteor will take this and change it into HTML code

## Render Compoment
We need to do two things

1) - What are we going to render?
2) - Where are we going to render it?

### install react-dom

`$ npm i react-dom -S`

* can't just use `App`, we need to use an instance of the component `<App />`
* We are using an instance of when we wrap app with the tags `<App />` as opposed to using the class
* We will use a native querySelector `document.querySelector('.container')`

final code

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'react';
import ReactDOM from 'react-dom';

// Create a component
const App = () => {
  return (
    <div>
      React App #2
    </div>
  );
};

// Render the component to the screen
ReactDOM.render(<App />, document.querySelector('.container'));
```

`main.html`

```
<head>
  <title>Image Bucket</title>
</head>

<body>
  <div>
    React App #1 
  </div>
  <div class="container"></div>
  <!-- /.container -->
</body>
```

## View in browser
error
Target container is not a DOM element

Why? - When we load localhost:3000 the code inside of it instantly is executed, so the time our code is running the div with a class of `container` does not yet exist on our page

So we have to wait to run our line of `ReactDom.render()` until the entire page has finished loading

### Meteor.startup()
Meteor gives us this to help us wait for the page to finish loading
* this is a function that we can pass a function to
* don't run this code until Meteor loaded the dom is fully rendered.

```
Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
```

Now we get
```
React #1
React #2
```

Final code

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'react';
import ReactDOM from 'react-dom';

// Create a component
const App = () => {
  return (
    <div>
      React App #2
    </div>
  );
};

// Render the component to the screen
Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
```

* That Meteor.startup() is code that will run everytime someone visits our webpage


