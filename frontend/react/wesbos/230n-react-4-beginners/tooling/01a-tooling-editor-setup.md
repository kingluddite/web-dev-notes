# Tooling & Editor Setup

## Tooling Needed
### You need Node
`$ node -v` (_must be > 6_)

### React Dev Tools
* You need [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for Chrome

* Click `Add To Chrome` to add it to your Chrome browser
* Enables you to look at the components, state, props
* It will add another tab to the inspector called `React`
* Go to a site that has React to see the tools working
    - Instagram
    - Netflix
    - Facebook
* Look for a `React` tab in the Chrome dev tools
    - This will show you how React sees the code
    - Not as the rendered DOM
        + Very helpful

### Babel
* Syntax definitions for ES6 JavaScript with React JSX extensions

#### Set up in your choice of Text Editor
* Sublime Text
    - babel
* Atom
    - react
* Vim
    - vim-jsx

### Terminal
* In modern web development the Terminal is essential and part of everyday developer activities
* Here are some choices depending on your OS
    - Windows - [cmder](http://cmder.net/)
    - iTerm2 (OSX)
    - Built in terminal (OSX)
    - [Hyper Terminal](https://hyper.is/)
        + Mac, Windows, Linux

## Webpack
* Module Bundler
* Will take all of our JavaScript files and deal with imports and exports and pack in into this one nice-and-tidy JavaScript file
* Webpack is currently (2018) the most popular bundler with React

### create-react-app
* Tooling in modern web development is time consuming and frustrating to get set up
* Create react app was created by the People at Facebook to quickly get up and running on building React Apps

### Create your first app with create-react-app
* [link to site](https://github.com/facebook/create-react-app)
* Simplifies all the tooling you need to get up and running
* Uses Webpack behind the scenes
* You can eject from create react app and get all the details of what you were using for your webpack data

#### Quick Overview
```
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

* (_npx comes with npm 5.2+ and higher, see instructions for older npm versions_)
* Then visit http://localhost:3000/ to see your app

#### Build create react app for production
* When you’re ready to deploy to production, create a minified bundle:

`$ npm run build`

## How to install project dependencies
* Create react app does a ton for you but you should also be able to create react apps from scratch
* You'll need to manually add modules with
* Using `yarn` package manager

`$ yarn add react react-dom`

* Or Usng `npm` package manager

`$ npm install --save react react-dom`

* Yarn and npm do the same thing but I prefer yarn as it currently is slightly faster and involves less typing much of the time
* If you create a skeleton package.json file:

`$ yarn init -y`

* If you added a bunch of modules you can install them all with one line of code:

`$ yarn install`

## Run create-react-app app
* Test if it is working after the install

`$ yarn start`

* This will open `localhost:3000` (_unless you have something running on port 3000 already_)
    - Only one service can run on a port at one time
* Use IP address to test on your phone (if it is on same network)
    - This is great for quick mobile and iPad development
