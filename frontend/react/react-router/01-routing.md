# Single-Page Apps
SPAs

Web apps that display on a single web page
html,css and js are loaded only once by the browser
and content changes dynamically as the user interacts with the app

the app never reloads unless the user manually refreshes it
similar UX to mobile and desktop applications

## SPA routing
responsible for loading and unloading content while matching the URL with a set of components being rendered

should also keep track of browser history
so users can navigate app using browsers back and forward buttons
if user shares or bookmarks an app, the URL should always direct the user to the correct location

SPAs with routing should mimic regular user experience with multi-page web pages

or they have usability problems
broken urls

JavaScript frameworks like angular and ember come with built in routing features

but React is not a framework
it is only a library concerned with rendering your UI
so they React community built the React Router - the official react library

how does react router fit into reacts declarative and modular style of building user interfaces and why it is the most reliable routing solution for react

install node.js and npm on your computer

[start files](https://github.com/ReactTraining/react-router)

$ npm install
$ npm start
by default starts on http://localhost:8080

$ npm install --save react-router

## React Router
provides 2 components to get you started
1. Router
    * the main component, keeps your UI and URL in sync
2. Route
3.  * maps routes to your applications components

`src/index.js`

```js
// Libs
import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router' // add this line
```

add our route

```js
// Libs
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

// CSS
import './css/style.css';

// Components
import App from './components/App';

// Render
render(
  <Router history={hashHistory}>
      <Route path="/" component={Home} />
  </Router>,
  document.getElementById('root')
);
```

when you run
$ npm start

output: green page with error `Home is not defined`

Add this component

`src/index.js`

```js
// Components
import App from './components/App';
import Home from './components/Home'; // add this line
```

And now you will see the home page

[hash history](https://i.imgur.com/f8CLFMU.png)

not the cleanest url but necessary for back and forward browser buttons to work

there is a clean URL with browser history (instead of hash history)

## Declarning Multiple Routes

