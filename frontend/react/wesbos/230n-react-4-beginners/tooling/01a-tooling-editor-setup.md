# Tooling & Editor Setup

## Tooling Needed
### You need Node
`$ node -v` (_must be > 6_)

### React Dev Tools
You need [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for Chrome

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
Syntax definitions for ES6 JavaScript with React JSX extensions

#### Sublime Text
babel

#### Atom
react

#### Vim
vim-jsx

## Terminal
* Windows - [cmder](http://cmder.net/)
* iTerm2 (OSX)
* Built in terminal (OSX)
* [Hyper Terminal](https://hyper.is/)

## Module Bundler
Will take all of our JavaScript files and deal with imports and exports and pack in into this one nice-and-tidy JavaScript file

### Webpack
The most popular bundler with React

### create-react-app
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

* (npx comes with npm 5.2+ and higher, see instructions for older npm versions)
* Then open http://localhost:3000/ to see your app
* When you’re ready to deploy to production, create a minified bundle with `$ npm run build`

## How to install project dependencies

`$ yarn install`

## Test if it worked
`$ yarn start`

* Will open `localhost:3000` (unless you have something running on port 3000 already)
* Use IP address to test on your phone (if it is on same network)
