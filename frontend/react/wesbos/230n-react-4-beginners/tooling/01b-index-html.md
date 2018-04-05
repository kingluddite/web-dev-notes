* ES6 modules
`import React from 'react'`

* Capitalize your components
  - Because they will be resusable

## Only touch the DOM once
# Your base HTML page

`index.html` is located inside `/public/`. You can put images and other css that you'd like to have public

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

      <div id="main">
        <!-- Main React app goes here -->
      </div>
      <!-- /#main -->
    </body>
</html>
```

* We will mount our app onto main's id of 'main'

`index.js`

```
import React from 'react';
import { render } from 'react-dom';

class StorePicker extends React.Component {
  render() {
    return <p>Hello</p>
  }
}

render(<p>Yo</p>, document.querySelector('#main'));
```

* Will Render 'yo' in browser
* Add Component and render it

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

* Will now render `Hello` to browser
* React tool shows React Components in purple
  - And regular DOM elements in grey
* **tip** name components same as file

## Error handling build into create react app
* Export modules
* Default vs named exports

### Create separate component
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

* We export it as a default export
* We will import it

`index.js`

```
import React from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';

render(<StorePicker />, document.querySelector('#main'));
```

## JSX
* Mix HTML and JavaScript
* need to use `className` instead of `class`
* To prevent JavaScript from returning nothing you need to add parentheses
* return is not a function ---> `don't do this` **return()**
  - return is a keyword

## New with React 16.2
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

* This cuts down on lots of unnecessary divs 
