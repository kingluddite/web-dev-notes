# Module Systems
## JavaScript Modules
* JavaScript file that makes some values available to other files and/or consumes values from other files

`message.js`

```
export default 'Yo!';
```

`index.js`

```
import message from './message';

console.log(message);
```

# JavaScript Module Systems
## There are several different module systems
### AMD
`define(['dep'], (dep) => {});`

### common js
* require()
* module.exports

### ES Modules
* import a from 'a';
* export default 123;

## Warning about Transpilers
* Many of them default to transpiling code from ES Modules to common js
    - View babeljs and you will see that `require()` and `module.exports` is used after transpiling your code
* Try this code in babeljs.io

```
import React from 'react'

export default App
```

* And look how it is transpiled (you see it is common js)

```
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = App;
exports.default = _default;
```

## Run our code in a Bundler
* After we have all our module files we need to run our code
* We run our code using a `bundler` (a popular solution)
* `Webpack` is a popular solution `( - Aug 18, 2021 - )`
* After running our code we will have a single file containing both modules linked together in some way
