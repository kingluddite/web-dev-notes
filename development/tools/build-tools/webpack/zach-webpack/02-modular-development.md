# Modular Development
CommonJS, ES6 Imports & AMD

* Importing required code directly in our JS
* CommonJS - Node requires
    - Node could do this because it runs on the server side so out of the box it could read file systems or work with the file structure itself or it could run a server
    - We couldn't do this with JavaScript because of browser restrictions
    - We saw this with Gulp as to how it uses `require` to include files that we downloaded from `npm`

Webpack knows how to read CommonJS but we don't have to do this as Webpack will understand them. But on working with the frontend with ES6, JavaScript has the ability to Import and Export Modules in the browser (but not all browsers support this yet), but Webpack can help do this for us

**note** Webpack 2 can read imported / exported modules. So we can start writing our frontend code in this modular way with just native JavaScript

* AMD - Early browser implementation. But mostly we will see ES6 import/export modules

## Examples
## `index.js` New standard file name
Used to be called `app.js` is now called `index.js`

### CommonJS way to import files
```js
var model = require('./model'),
   router = require('./router'),
   view = require('./view'),
   editor = require('./editor');
```

### ES6 imports way

#### Importing
First we import all of them into the file that uses them

```js
import model from './model';
import router from './router';
import view from './view';
import editor from './editor';
```

#### Exporting
Then inside each of those files we need to export each one (at the end of the file) with:

`export default model` and `export default router` and `export default view` and `export default editor`


### AMD importing way
This is older and outdated but you may see it in some code

```js
require(
    ["model", "router", "view", "editor"],
    function(model, router, view, editor ) {
    
    // rest of code here
});
```

