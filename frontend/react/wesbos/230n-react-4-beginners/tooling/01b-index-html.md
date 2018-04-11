# Only touch the DOM once
## Your base HTML page

* `index.html` is located inside `/public/`
* You can put `images`, fonts and other `css` that you'd like to have **public**

```html
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Soccer Store</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Place favicon.ico in the root directory -->

    </head>
    <body>

      <input type="checkbox" id="fold">
      <label for="fold">Fold</label>

      <div id="root">
        <!-- Main React app goes here -->
      </div>
      <!-- /#main -->
    </body>
</html>
```

* See how simple and basic our `index.html` file is?
* We will mount our app onto **div**'s `id` of **root**

## Simple Component
* Normally we'll put them in their own file but here is a simple exampl to get started

`index.js`

```
import React from 'react';
import { render } from 'react-dom';

render(<p>Yo</p>, document.querySelector('#main'));
```

* `$ yarn start`
  - If you get `command not found` it means you need to install Yarn
    + The simplist way is to use Homebrew with `$ brew install yarn`
    + If you didn't install [Homebrew](https://www.youtube.com/watch?v=N-SDrN4G4lE), you need to install that too
      * [link to site](https://brew.sh/)
      * `$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
    + If you can't install yarn or homebrew, just use `npm` with `$ npm start`
      * This means you need to have `Node.js` installed
* After running `$ yarn start` successfully this will Render `Yo` in browser

## Render our first Component

`index.js`

```
import React from 'react';
import { render } from 'react-dom';

class StorePicker extends React.Component {
  render() {
    return <p>Hello</p>
  }
}

render(<StorePicker />, document.querySelector('#main'));
```

* **Naming Convention** -- Capitalize your components
  - Because they will be resusable
  - Makes them easy to spot in your code
* Will now render `Hello` to browser
* **React tool** shows: 
    - React Components in **purple**
    - And regular DOM elements in **grey**

## Best Practice - Naming convention for Components
* Name components same as file

## Bonus! - Error handling build into create react app

### Create separate component and export it
`components/StorePicker.js`

```
import React from 'react';

class StorePicker extends React.Component {
  render() {
    return <p>Hello</p>
  }
}

export default StorePicker;
```

* We export it as a **default export**

## We will import Our component into the main file of our app

`index.js`

```
import React from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';

render(<StorePicker />, document.querySelector('#main'));
```

## JSX
* Mixes HTML and JavaScript
  - We were always told this was bad but in React it is good
  - Takes some time to get used to but eventually you will love JSX

### JSX RULES
* Need to use `className` instead of `class`
* To prevent JavaScript from returning nothing you need to add parentheses
* `return` is not a function
    - NEVER DO THIS: `return()`
    - Why? Because `return` is a **keyword**
* All children need to have one parent container
  - Even comments are part of this rule
  - The error is not always easy to debug

## NEW AND IMPROVED - New with React 16.2
* `<React.Fragment>`
  - Now you don't need to add empty `div` tags

`StorePicker.js`

```
import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
      <p>Fish!</p>
      <form  className="store-selector">
        <h2>Buy a Pizza</h2>
      </form>
    </React.Fragment>
    )
  }
}

export default StorePicker;
```

* This cuts down on lots of unnecessary `divs` 

## Reading Material
* [A simple intro to Javascript imports and exports](https://medium.com/@thejasonfile/a-simple-intro-to-javascript-imports-and-exports-389dd53c3fac)
* [React Fragments](https://reactjs.org/docs/fragments.html)
