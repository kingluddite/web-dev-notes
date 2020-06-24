# Controller methods
* Make our code even cleaner
    - Our routes could have a ton of logic inside them
    - It is cleaner to extract this code and put it inside a `controller`

## Adding controller methods
* We will now create controller methods for each function that we're going to need when we hit specific routes
* This will be a neat/clean solution
    - An ugly/dirty solution would be to pull all logic inside router file

## Create a `controllers` folder
* We'll create a file for each "resource"
    - So we'll create `bootcamps.js`
    - We need to `export` each method so we can bring it in to the `routes` files

## Renaming files (TODO - Might remove this as is it necessary?)
* `controllers/bootcamps.js` --> `controllers/controllers-bootcamps.js`
* `routes/bootcamps.js` --> `routes/routes-bootcamps.js`

### Update this path too
`server.js`

```
// MORE CODE

// Route files
const bootcamps = require('./routes/routes-bootcamps');
// MORE CODE
```

`routes-bootcamps.js`

```
const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/controller-bootcamps');

const router = express.Router();

// /api/v1/bootcamps
router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

// /api/v1/bootcamps/123
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
```

## We import multiple exports from one file like this:
* We use ES6 destructuring to pull those methods off the file

```
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/controller-bootcamps')
```

## Efficient allocation of resources
* see how we can group routes together?

```
// we point to `/` route and bind it to both a GET calling our getBootcamps controller method and the POST createBootcamp controller method
router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

// we point to `/:id` dynamic route and bind it to both a GET calling our getBootcamp (single bootcamp) controller method and the PUT updateBootcamp controller method and a DELETE deleteBootcamp controller method
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
```

## Make our VS Code look cool on the server (gives pink bg)
In root create `.vscode/settings.json`

```.
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#FF2C70",
    "titleBar.inactiveBackground": "#FF2C70CC"
  }
}
```
## NEXT - Intro to Middleware
