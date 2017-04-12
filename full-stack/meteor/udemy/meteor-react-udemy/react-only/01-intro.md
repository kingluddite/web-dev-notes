# Learning Meteor And React
Two separate libraries that work well together but are very different

## Section I
The **React** Library

## Section II
The Meteor Library

## Create Meteor project
CLI for Meteor

* Gives us
    - Place to put our code
    - Place to keep track of project dependencies
        + Add third party libraries like **React**
            * **React** is not included by default
                - We have to manually add to our Meteor project
    - Development web server
        + Start a local server where we can start up our web browser and then immediately see on the dev web server

## Focusing on **React** (the library)

### Create Meteor app

`$ meteor create images`

* It will install meteor with default packages
* And automatically create project
* `$ cd images`
* Run meteor with `$ meteor`
* `localhost:3000` default Meteor project

**note** Delete server, client default folders

Now our project is empty (accept for files/folders we still need)

## How to install **React** library
**React** 3rd party dependency

![how packages are installed](https://i.imgur.com/TNe3Rcc.png)

Thousands of free packages/libraries exist

We can reach out to the **npm** Registry (_100,000's of libraries exist that we can install instantly_)

We install **React** as a dependency to our meteor project

## how to install a dependency

`$ npm i -S React`

Look after install how **React** depends on several libraries

We add `node_modules` after install (_all packages we install get installed in `node_modules`_)

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
    "React": "^15.4.2"
  }
}
```

* Lists all `npm` modules that we installed and `-S` added to dependencies 
* This file defines configuration about our project
* The name of our project...

**note** `meteor-node-stubs` - default meteor packages

`.gitignore` - lists `node_modules` - installed with `npm`

`.meteor`

We didn't delete `.meteor` (_holds meteor specific info - we shouldn't have to touch files in that directory_)

![diff between Meteor and **React**](https://i.imgur.com/uW40w1C.png)

We use them together

Meteor - keeps track of data in our app

* Keep track of tweets or emails, contacts

**React** - Takes data and produces HTML from it

* Also handles user events like:
  - clicks
  - type in input field
  - hover over button or image 
  - Any event with mouse or keyboard 
  - All this events and more **React** will handle

## Start coding
Create `client` folder

`$ mkdir client`

* Anything in client will be loaded immediately by Meteor
* Any code that we want to be executed inside of our web browser we place inside this `client` folder

`client/main.html`

```html
<head>
  <title>Image Bucket</title>
</head>

<body>
  <div class="container">
    React App  
  </div>
</body>
```

Anytime someone visits `localhost:3000` this file will automatically be loaded

## View in browser - you'll see `React App`

Any changes, the webpage, the webpage will automatically reload for us

## Where do we put js?
Inside `client` folder because it will be run immediately inside our browser

`main.js`

`console.log('hello')`

And you'll see `hello` in the console

Now let's code our `App`

We install packages with `npm` but we can only use them when we `import` them

`import React from 'React'`

* Whatever code is inside `node_modules/React` will be imported and assigned to the `React` variable

## Create a Component
What is a Component?

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

* This looks like **HTML** but it is **JSX**
* Meteor will take this and change it into **HTML** code

## Render Compoment
We need to do two things

1) - What are we going to render?
2) - Where are we going to render it?

### install React-dom

`$ npm i react-dom -S`

* Can't just use `App`, we need to use an instance of the component `<App />`
* We are using an instance of when we wrap app with the tags `<App />` as opposed to using the class
* We will use the native **querySelector()** `document.querySelector('.container')`

## Final code

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'React';
import ReactDOM from 'React-dom';

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

We need to add our container css class here:

```html
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
We have an error: `Target container is not a DOM element`

### Why?
When we load `localhost:3000` the code inside of it instantly is executed, so the time our code is running the `div` with a **class** of `container` does not yet exist on our page

So we have to wait to run our line of `ReactDom.render()` until the entire page has finished loading

### Meteor.startup()
Meteor gives us this to help us wait for the page to finish loading

* This is a function that we can pass a function to
* Don't run this code until Meteor loaded the DOM is fully rendered.

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

## Now really, Final code

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'React';
import ReactDOM from 'React-dom';

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

* That `Meteor.startup()` is code that will run everytime someone visits our webpage


