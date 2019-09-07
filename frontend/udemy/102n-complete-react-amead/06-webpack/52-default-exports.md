# Default Exports - Only One!
* Named exports we can have as many as we want
* With default exports... **we can just have one**
    - Doesn't make sense to have two default values... you just have one default value

## Add our first default export
`utils.js`

```
console.log('utils.js is running');

const square = x => x * x;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

export { square, add, subtract as default };
```

* Remember - only 1 default so this would generate an error:

```
console.log('util.js is running');

const square = x => x * x;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
export { square, add as default, subtract as default };
```

* Would generate `duplicate default export` error

`app.js`
* Now we need to point to our resource and use the named exports and one default export

```
import './utils.js';
import { square, add, subtract } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
console.log(subtract(100, 75));
```

## Houston we have a problem!
* But this will give us an error
* To import default exports you use this syntax instead
    - The reason for the error is we are trying to import a named export that we never exported
    - No requirements you can have one or the other or just one (named or default export)
    - Place the default export at the front of the line and separate with a comma from the named exports

`app.js`

```
import './utils.js';
import subtract, { square, add } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
console.log(subtract(100, 75));
```

## You don't have to call the default export by name 
* What makes the default kind of special?
* Since you know it is the default you don't have to call it by name
* We could call it anything we want as long as the name we call we reference the same name when we call the default... like this:

`app.js`

```
import './utils.js';
import anythingWeWantToCallIt, { square, add } from './utils';

console.log('app.js is running');
console.log(square(4));
console.log(add(25, 75));
console.log(anythingWeWantToCallIt(100, 75));
```

* Works the same
* Naming is not important with default exports
* But is very important with named exports
* **tip** A good idea to name the default something pertaining to what it does (makes your code more readable)

## Tips for choosing named or default exports
* If the file has one main thing, set that up as the default export
    - We'll do this for a single react component
    - Set up the smaller items to export as named exports

## Alternative ways to set up default exports
* Big difference between `export default` and `export`
    - `export default` can NOT come before a variable declaration
    - This would be wrong

```
export default const subtract = (a, b) => a - b;
```

* That will generate in this not very friendly user error - `You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders`

## export default needs a single expression to follow
* We can't follow default export with a statement it needs a single expression

`utils.js`

```
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

export default subtract;

// export { square, add, subtract as default };
```

* Now it works!

## And even shorter, more concise syntax (refactor)

`utils.js`

```
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

export default (a, b) => a - b;

// export { square, add, subtract as default };
```

* If using shortened version don't add `=` like this as you will get an error

```
export default = (a, b) => a - b;
```

## Challenge
* Set up default export with `person.js`
* Use it in `app.js`
* Set up `isSenior(age)` ---> if they are 65 or older they are a senior
* setup the default export and function
* Grab the default and call it

### Solution
`utils.js`

```
console.log('utils.js is running');

export const square = x => x * x;

export const add = (a, b) => a + b;

export default (a, b) => a - b;

// export { square, add, subtract as default };
```

`app.js`

```
import isSenior, { isAdult, canDrink } from './person';

console.log(isAdult(25));
console.log(canDrink(19));
console.log(isSenior(64));
```

* Test it out and it should work with named and default exports

## Recap
* Any file can have as many named exports as you wish
* But only 1 default export per file
    - Calling a default export comes before the curly braces of a named export

## Next - Import 3rd parties from NPM
