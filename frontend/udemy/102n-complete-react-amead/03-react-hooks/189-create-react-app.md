# Create React App
* We will use a tool call Create React App
* It enables us to create a React application
* It provides us with a command we run in the terminal to create a new react app
* [GitHub repo](https://github.com/facebook/create-react-app)

## How to install
* We could install it as a global npm module

`$ npm i -g create-react-app`

### Here is a better way to install create react app
* Better to install it using `npx` (for newer versions of node)
* If you've previously installed `create-react-app` globally via 

`$ npm install -g create-react-app`

* We recommend you uninstall the package using:

`$ npm uninstall -g create-react-app`

* to ensure that `npx` always uses the latest version

`$ npm create-react-app 336e-react-new-features`

`$ cd 336e-react-new-features`

### Start new app
`$ npm start` (or `$ npm run start`)

* It will start up our app in development mode designed for us to start up our app on our local machine
* Basic react app will open in `http://localhost:3000`

### Life is a little different when not manually creating react
* Create react app
    - Doesn't have a babel config file
    - There is no webpack config file either
    - Create React App uses both of those tools behind the scenes
    - But using Create React App abstracts all of that away so we can just focus on building in React

### Let's look at our files Create React App starts us off with
* `README.md`
    - You would delete this and replace it with your own documentation
* `package.json`
    - We have react and react-dom installed as dependencies
    - react-scripts is also a dependency but it is not something you install on your own
        + It is an npm module designed specifically for create react app's app
            * This module gives us access to all the things we can do including the development server we just started up
* `scripts` section in `package.json`
    - Gives us 4 commands to do important things
        + `$ npm start`
        + `$ npm build`
        + `$ npm test`
        + `$ npm eject` (take over control of webpack and babel)
            * Once you eject you can never put create react app back in the box
* `eslintConfig`
    - Manipulate eslint setting
* `browserslist`
    - Will compire our app for a specific list of browsers making sure that it runs as expected
* `package-lock.json`
    - Contains the entire set of dependencies that are being installed from our dependencies
* `.gitignore`
    - Has lots of stuff to make our app work well in multiple OS's and environments
    - You can add to it but it is recommended to leave everything in here in place

## public and src directories
### public
* public/favicon.ico - shows up in the browser tab
* public/index.html - sets up our app, change the title if you want
    - All content will be rendered using React and stuffed inside the `<div id="root"></div>`
* public/manifest.json - used to create a progressive web application, this comes with some features that make it feel like a native application
    - You could set up notifications
    - There is support for offline mode (and more)
    - A lot more info about Progressive web apps 

### src
* src/App.js - Is component that is rendering everything we are seeing in the browser
* We load in App.css into App.js
* We also have a test file `App.test.js`

#### src/index.js
* This is the starting point for your app (think of it as the entry point in webpack)
* We render the `<App />` component and that is how we see it on the screen

#### the serviceWorker
* We import it and unregister it
* The serviceWorker is another feature of a progressive web app
* It runs behind the scenes and enable offline capabilities and also manage notifications for a device

## Strip it down to a bare bones app
* Remove `index.css` import and `App` import from `index.js`

`index.js`

```
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<div>My new content</div>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* Delete `App.css`, `App.js` and `App.test.js`, `index.css` and `logo.svg`

## Next - start discussion on `hooks`
