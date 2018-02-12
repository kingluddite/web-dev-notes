# ES6 import/export
* Now we'll break our app into multiple files
* Instead of one big file

## Two kinds of imports
* The kind you wrote yourself
* 3rd party imports (React and ReactDOM)

## No need to install modules to work with ES6 import and export
* It comes bundled with webpack when we install webpack

## Add another file
`src/utils.js`

`console.log('utils.js is running);`

* After adding the file and code we see that webpack does nothing
* It doesn't know about this file
* How can we tell it?

## Two problems why webpack doesn't see it
1. It is not the entry point (`app.js` is the entry point)
2. It is not imported into `app.js`

`src/app.js`

```js
import './utils.js';

console.log('app.js is running');
```

* Now we see the log in the dev toolbar console tab
* **note** We provide a relative path to where our other custom JavaScript file is
* Notice the order the files run in
    - 1. utils.js (It was imported first)
    - 2. app.js
* You'll see that the webpack watching terminal tab now shows `utils.js`

![utils in output](https://i.imgur.com/SeRkwgJ.png)

## Improve our import
* Currently we just import `utils.js`
* We can do better
* We can get values out of this file
    - Like maybe we just want to grab one function in `utils.js` instead of pulling in the entire file

`utils.js`

```js
console.log('utils.js is running');

const square = x => x * x;
```

`app.js`

```js
import './utils.js';

console.log('app.js is running');
console.log(square(4));
```

## We get an error!
* Why is `square` not defined?
* But we see `utils.js` and `app.js` are both running? How can this be?

## Super important detail about all your files inside webpack
* Each one maintains its own local scope
* Variable defined in any file are not automatically available to other files
    - If it did, that would me webpack was polluting the global namespace
    - And as we added files our chance of a naming conflict or code conflict would increase dramatically
    - This is just as bad as using 100 script tags using the global namespace

## Avoid that using `export`
* Here's out to get variables out of `utils.js` 
* That is why export and import work hand in hand

### default export vs named exports
* You can only have one `default` export per file
* You can have as many `named` exports as you like

## named exports
`export { };`

* **note** This is not an object
* We need to put inside the `{}` references to what we want to export
* If you treat it like an object you will get an error

`utils.js`

```js
console.log('utils.js is running');

const square = x => x * x;

export { square };
```

* We still get our same error stating `square` is not defined
* We need to alter our import statement in `app.js` to get this to work

`app.js`

```js
// import './utils.js';
import { square } from './utils';

console.log('app.js is running');
console.log(square(4));
```

* Note this `{}` again is NOT and object (it is just the import syntax)
* And now you will see in the output:

```
utils.js is running
app.js is running
16
```

* It is working!

## Add another function and export/import it
`utils.js`

```js
console.log('utils.js is running');

const square = x => x * x;

const add = (a, b) => a + b;

export { square, add };
```

`app.js`

```js
// import './utils.js';
import { square, add } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
```

* You don't have to import every function in an exported file
* **note** The order of `{square, add}` doesn't matter

## Alternative export
* Instead of naming all stuff we're exporting at the bottom
* We can instead export them inline like this:

`utils.js`

```js
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;
```

* Works the exact same as before

## Challenge
* Create `person.js`
* named export `isAdule(18)` - true if adult, otherwise false
* named export `canDrink(18)` - true if >= 21, otherwise false
* comment out code currently in `src/app.js` and import isAdult and canDrink
    - use both and print result to the console

### Solution
```js
export const isAdult = age => {
  if (age >= 18) {
    return true;
  }

  return false;
};

export const canDrink = age => {
  if (age >= 21) {
    return true;
  }

  return false;
};
```

* Refactor that to:

```js
export const isAdult = age => age >= 18;

export const canDrink = age => age >= 21;
```

* Alternative export syntax:

```js
const isAdult = age => age >= 18;

const canDrink = age => age >= 21;

export { isAdult, canDrink };
```

* And import it into `app.js`

```js
// import './utils.js';
// import { square, add } from './utils';
//
// console.log('app.js is running');
// console.log(square(4));
// console.log(add(25, 75));

import { isAdult, canDrink } from './person';

console.log(isAdult(15));
console.log(canDrink(21));
```

