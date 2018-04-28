# Our first Component
## The TeamPicker
* You can type in the name of a team or it autofills with one
* And there will be a button that when you click it, it will take you to that individual team

## Getting started
* We'll start in `index.js` and eventually move to the `components` folder

## Loading React
* Do we use a script tag inside `index.html`?
    - No, we do not!
* Modern JavaScript has evolved to using ES6 modules

## ES6 Modules
* **note** Don't do this but this is how you would add react to your project
* We used create-react-app to build our react app and it already added `react`

### How to add modules

`$ npm add react`

* That will save it into our `package.json`

### Yarn vs Npm
[article explaining the difference between yarn and npm](https://www.keycdn.com/blog/npm-vs-yarn/)

#### What is npx
[article explaining npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

### package.json
* If you don't have a `package.json` yet, first create it with:
* We already have it created with **create-react-app** so we can skip this step

`$ npm init -y`

* The `-y `prevents you get several questions and just accepts the default values to quickly create your `package.json`

### Importing ES6 modules

* At the top of `index.js` add:

`import React from 'react';`

* That will import the React library
    - We previously downloaded **React** into `node_modules`
    - And now we store it inside the **React** variable

## View in Chrome inspector (browser)

## eslint Warnings in the inspector 'Console' tab
![eslint warning](https://i.imgur.com/Ij15mCV.png)

* These pop up to let you know stuff you should think about fixing in your JavaScript

**note** [Create React App](https://github.com/facebookincubator/create-react-app) - comes with minimal eslint rules

### Ejected!
* We can **eject** out of that
* And use our own `eslint` rules if we want

## View the `Elements` tab of the inspector
* A bundled script has been added
    - If you [view that in the browser](http://localhost:3000/static/js/bundle.js), all that code is **React**
* If you comment out our **React** import all the **React** code will be removed
  - Try it and you still will see a ton of code
  - That is just `webpack` code that is just for development and will be stripped out for production

## See for yourself - Test it out!
1. Add `console.log('yo');` into `index.js`
2. Check for it in Chrome dev tool
3. You will see where it gets added

## Add a Component 
`index.js`

```
import React from 'react';

class TeamPicker extends React.Component {
    render() {
      return (
        <form  className="team-selector">
          <h2>Pick a team</h2>
        </form>
      )
    }
  }

render(<TeamPicker/>, document.querySelector('#root'));
```

### Houston we have a problem - We get an error!
![render error](https://i.imgur.com/6Uaw8my.png)

* We get rid of the error and see `Pick a team` in browser
* **note** We could also write it like this (using `named export`):

```
import React from 'react';
import { render } from 'react-dom';

class TeamPicker extends React.Component {
    render() {
      return (
        <form  className="team-selector">
          <h2>Pick a team</h2>
        </form>
      )
    }
  }

render(<TeamPicker/>, document.querySelector('#root'));
```

## Comments in JSX
* Add `jsx` comment `{ /* comment */ }`

```
import React from 'react';
import { render } from 'react-dom';

class TeamPicker extends React.Component {
    render() {
      return (
        <form  className="team-selector">
          { /* comment */ }
          <h2>Pick a team</h2>
        </form>
      )
    }
  }

render(<TeamPicker/>, document.querySelector('#root'));
```

* **note** Comments have to be inside a parent element
    - You will get an **error** if they are not and it is an error that is misleading so be careful
* Remove the `console.log('yo');` from `index.js`
  - (_If you didn't already_)
* Also remove the comment in our **React** import

## Best Practices React
* `Components` are always **Capitalized**
    - Great because they can be used more than once
    - And seeing the capital letter reminds you the special purpose of this Component
* `render()` method is **required for all Components**
    - Every component needs at least one method and that is the `render()` method
* Place Components in separate file (`components/Header.js`)
    - The main benefit of this best practice is it makes our code much easier to maintain
* You do not to append the `.js` suffix
    - It is assumed it is JavaScript so you don't need to append `.js` suffix
    - It may also cause an **error** so don't add `.js` extensions
    - **note** But you will add suffixes for everything else (images/fonts/css)

## What HTML should I display?
* When a Component gets rendered to a page
* It will ask that component, "what HTML should I display?"

## Mounting point
* Where will our Component HTML code go?
* **answer**: To the `mounting point`

### What is the mounting point?
* In `public/index.html` this is our mounting point

```html
<div id="root">
  <!-- Main React app goes here -->
</div>
```

## ReactDOM
* React is NOT just for the `HTML` and the `DOM` it can also be used for:
    - Android apps
    - IOS apps
    - Canvas rendor
* But we want it to render out to `HTML`
    - So we need to install and import `ReactDOM`

#### Two ways to import
```js
import { render } from 'react-dom';
//and
import ReactDOM from 'react-dom';
ReactDOM.render();
```

## Named exports
* But we use the first import case because we don't need the entire `ReactDOM` package, we just need one `render()` method of `ReactDOM`

#### { method }
* Use this syntax when just importing one method from a Package
* This is ES6 syntax

## Create our own Component
`components/TeamPicker.js`

```
import React from 'react';

class TeamPicker extends React.Component {
    render() {
      return (
        <form  className="team-selector">
          { /* comment */ }
          <h2>Pick a team</h2>
        </form>
      )
    }
  }

export default TeamPicker;
```

* We need to import **React**
* You will have to do this on top of every single Component
    - **React** is not like **jQuery** where you load on page and it is available to all
* **note** With ES6 Modules, if you need something inside a `js` module you need to import it inside every single file that needs it

### `Path` is important here
#### Relative paths vs 3rd Party modules
* You need to point where the Component is relative to the file you are importing it into
* If our import is just a string `TeamPicker`, **webpack** thinks it is inside the `node_modules` directory
* `TeamPicker` is not inside `node_modules`
    - It is a custom module that we created so with custom Components **we need to supply a relative path**

## Update `index.js`

```
import React from 'react';
import { render } from 'react-dom';

import TeamPicker from './components/TeamPicker';

render(<TeamPicker/>, document.querySelector('#root'));
```

## render() out the Component

`render(What component would we like to render?, What element should it render out?)`

* We added this code to the bottom of `index.js`:

`render(<TeamPicker/>, document.querySelector('#room'));`

**note** `<TeamPicker/>` is `JSX`

## View in browser
* Same output as before but now we are using a component in a separate file
* We need to import that component

### React Dev Tools
* Shows the `<TeamPicker>` Component

![team picker form](https://i.imgur.com/TXo1Nwl.png)

## Next - Fix our form
* Form doesn't do anything when submitted... but we'll fix that next
* HTML forms refresh page by default
* Append question mark to URL in browser
