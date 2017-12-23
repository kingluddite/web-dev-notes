# Default Exports
* Named exports we can have as many as we want
* With default exports... we can just have one
    - Doesn't make sense to have two default values... you just have one default value

`utils.js`

```js
console.log('utils.js is running');

const square = x => x * x;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

export { square, add, subtract as default };
```

`app.js`

```js
import './utils.js';
import { square, add, subtract } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
console.log(subtract(100, 75));
```

* But this will give us an error
* To import default exports you use this syntax instead

`app.js`

```js
import './utils.js';
import subtract, { square, add } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
console.log(subtract(100, 75));
```

## What makes the default kind of special?
* Since you know it is the default you don't have to call it by name
* We could call it anything we want as long as the name we call we reference the same name when we call the default... like this:

`app.js`

```js
import './utils.js';
import anythingwewanttocallit, { square, add } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
console.log(anythingwewanttocallit(100, 75));
```

* Works the same
* Naming is not important with default exports
* But is very important with named exports
* **tip** A good idea to name the default someting pertaining to what it does (makes your code more readable)

## Tips for choosing named or default exports
* If the file has one main thing, set that up as the default
    - We'll do this for a single react component
    - Set up the smaller items to export as named exports

## Alternative ways to set up default exports
* Big difference between `export default` and `export`
    - `export default` can NOT come before a variable declaration

`utils.js`

```js
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

export default const subtract = (a, b) => a - b;

// export { square, add, subtract as default };
```

* Above will give us an error because you can only default export a single expression:

`utils.js`

```js
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

export default subtract;

// export { square, add, subtract as default };
```

* Now it works

## Refact with:

`utils.js`

```js
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

export default (a, b) => a - b;

// export { square, add, subtract as default };
```

## Challenge
* Set up default export with person.js
* Use it in `app.js`
* Set up `isSenior(age)` ---> if they are 65 or older they are a senior
* setup the default export and function
* Grab the default and call it

### Solution
`utils.js`

```js
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

export default (a, b) => a - b;

// export { square, add, subtract as default };
```

`app.js`

```js
import isSenior, { isAdult, canDrink } from './person';

console.log(isAdult(25));
console.log(canDrink(19));
console.log(isSenior(64));
```

* Test it out and it should work with named and default exports

## Next - Import 3rd parties from NPM
