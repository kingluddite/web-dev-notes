# Refactor Code
* We want routes in server.js
* We want models in their own folder
* We want our db connection in its own file

`server/db/mongoose.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
```

`server.js`

```js
const {mongoose} = require('./db/mongoose');
// MORE CODE
```

* We use ES6 destructuring to pull off the mongoose object and store it in the `mongoose` variable
* We point to where it is
* Since we exported it we have access to it


