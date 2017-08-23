# Webpack with CSS
![webpack diagram](https://i.imgur.com/zo5ZGGv.png)

* The Webpack module came as part of the `Create-react-app` app
* Webpack is a module loader
    - We feed it all our client side files and Webpack magically concatenates and arranges these files in such a way that it spits out one (or very few) output files
    - Webpack is not limited to JavaScript files that we have now
    - You can also load up `loaders` into Webpack that instruct Webpack how to handle other types of files as well
    - One particular file Webpack can handle out of the box is CSS
    - If we import a CSS file directly into a JavaScript file Webpack will look at the import statement, it will recognize we are attempting to import a CSS file, and it will include it into our project output as CSS rather than try to parse it as raw JavaScript
* Search client side `node_modules` for our `materialize-css` folder and inside you will see `/dist/css` and there is a minified and un-minified CSS files, we will use the minified css file
* Webpack runs every time our app changes

## Import into root `index.js`
* Because the CSS will be used on all pages in our site
    - We could also put it in `App.js` but either is fine
* When we import non-javascript files, we need to add the extension
    - `import materializeCSS from 'materialize-css/dist/css/materialize.min.css';`
* If you don't specify a web path, webpack assumes you are trying to install a npm module

## Test
* It works but we do have a warning about defined but unused variables

![working materialize](https://i.imgur.com/SMS662w.png)

* We can easily fix that warning by changing our import to just point to the file and not define a variable like this:

`index.js`

```js
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// more code
```


