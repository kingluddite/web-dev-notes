# Tooling & Editor Setup

## Chrome dev tool
### $r
* Debug Component in console with `$r`

#### Steps on how to use $r
1. Select Component in **React** tab of dev tools
2. Switch to console
3. Type `$r` in console and you'll see Component
4. Type `$r.props` and you'll see all the props on that Component

### $0
**Debug** Elements in **Elements** tab of dev tools with `$0`

1. Just select element you want to inspect
2. Switch to console tab 
3. Type `$0` and you can start debugging that element
4. Let's say you select a `<div class="menu">...</div>`
5. Then type `$0.classList` and you will see `["menu"]`

**note** `$1` is send last item you click, `$2`, is 3rd last item you clicked

## Eslint
* Prop types errors might cause problems
* Turn them off with:

`/* eslint react/prop-types: 0 */`

* Put at top of `Roster.js` and `AddPlayerForm`
* We'll use prop types later
* You should see `addPlayer: fn()` in Roster and AddPlayerForm props (React tab of Chrome dev)

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

##### Instructions for using Sublime and Emmet with JSX support
* You have to use the `ctrl` + `e` shortcut
* [Wes Box video on this](http://wesbos.com/emmet-react-jsx-sublime/)

#### Emmet and Atom
[Use emmet tab completion in Atom](https://gist.github.com/mxstbr/361ddb22057f0a01762240be209321f0)

Add this to `keymap.cson`

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

**note** - If it's not properly syntax highlighted, select `Babel ES6 JavaScript` or `JSX` as the syntax, this won't work otherwise
* Now tab completion should work!

##### Atom `language-babel`
* Make sure this is installed and active

### Emmet is awesome
### Writing JSX --> Emmet expand
* Writing JSX can be annoying as the usual Emmet `tab` doesn't work
* But we can re-wire by binding to a keyboard shortcut

#### keyboard shortcut
**tip** When writing template strings inside JSX with emmet use this syntax before you hit `ctrl` + `e`

`ctrl` + `e`

* Using Emmet is a must for any text editor
* It is smart enough to convert it to JSX
  - class ---> className
* **note** Emmet is built into **Visual Studio Code** but you need to add this setting (`cmd` + `,`):

```
"emmet.triggerExpansionOnTab": true
```

* That will make hitting tab convert your Emmet shortcut syntax to full JSX

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
