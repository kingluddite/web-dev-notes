# JS modules (Part 2)
* There are a few more ways we can use `import` and `export` to better structure our files

## Two styles of exports available to us
1. Named Exports
2. Default Export

* We previously were using `named` exports

### Named exports

`index.js`

* Below we are importing named exports

```
import { add, subtract } from './utilities';
import { greeting } from './greeting';
```

* They are named exports because we export them on each line like this:

`greeting.js`

* This is how we create "named" exports
* You can have as many `named` exports as you want

```
console.log('greeting.js');

export const greeting = str => `${str.toUpperCase()}!`;
```

## Default Export
* We can choose to have 1 default export if we want to
* Named exports we can have as many as we want per file but we only can use 1 default export per file
* We don't always need to have one default export

`utilities.js`

```
console.log('utilities.js');

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

const square = x => x * x;
export default square;
```

## Now how do we import this default export?
* We call default exports without curly braces
* We call before the curly braces

`index.js`

```
import square, { add, subtract } from './utilities'; // update this line
import { greeting } from './greeting';

console.log('index.js');
console.log(add(1, 2));
console.log(subtract(10, 5));
console.log(greeting('Phil'));
console.log(square(4)); // 16
```

### We can name it whatever we want (we don't have to name it square)
* Remember we are not exporting it by it's name
* We are just allocating that this is the default so when importing it we can name it whatever we want
`index.js`

```
import yoyoma, { add, subtract } from './utilities';
import { greeting } from './greeting';

console.log('index.js');
console.log(add(1, 2));
console.log(subtract(10, 5));
console.log(greeting('Phil'));
console.log(yoyoma(4)); // 16
```

`$ npm run webpack`

* And it should log to client console `16`

## Here is a "guide" to when to use either named or default exports
* If you have one big thing the file is trying to export (like a class or function) use the default export for that
* If you have 5 or 6 functions or classes you need to export, then use the `named` export

## Here is a different way to set up your exports
* You can do it the way we just did it
* Or you can define all your exports in one place (typically the last line in your file)

`utilities.js`

```
console.log('utilities.js');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const square = x => x * x;

export { add, subtract, square as default };
```

* Re-run webpack `$ npm run webpack` and it works as it did before

## Challenge
* Use `greeting.js` file

1. Setup **greeting** as the default export
2. Update the import statement in `index.js` to consume it

`greeting.js`

```
console.log('greeting.js');

const greeting = str => `${str.toUpperCase()}!`;

export default greeting;
```

`index.js`

```
import square, { add, subtract } from './utilities';
import greeting from './greeting';

console.log('index.js');
console.log(add(1, 2));
console.log(subtract(10, 5));
console.log(greeting('Phil'));
console.log(square(4));
```

* `$ npm run webpack`

* Will work as it did before

## Alternative way

```
console.log('greeting.js');

const greeting = str => `${str.toUpperCase()}!`;

export { greeting as default };

```
