# Create Custom Modules

## Create `src` folder
This allows you to keep your modules in their own folder (use folder we used in `01-modules-webpack-2.md`)

## Create `src/config.js`
This is a good file to put all your API keys and REST endpoints

**tip** Good to put these in one single file to make referencing them easier

`$ touch src/config.js`

`src/config.js`

```js
const apiKey = 'abc123';
```

##How do we get access to `apiKey`
When we are in another module (aka when we are in another file?)

**note** Variables are not local with module. Variables are always scoped. If they are scoped to nothing then they are scope to that module. This is a benefit to modules is they are self-contained and they don't bleed into anything else.

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import apiKey from './src/config';
console.log(apiKey);
const ages = [1,1,4,100,200,5];

console.log(uniq(ages));
```

**note** We don't need to use `.js` suffix as it knows it is a JavaScript file

View `index.html` in the browser and you will see that all we have is an empty object.

![empty Object](https://i.imgur.com/BArE37B.png)

The reason for this (common for those new to ES6 modules) is that we did not export the `config.js` Module

`src/config.js`

In order for `apiKey` to be available outside of `config.js` we need to export it

## Two types of exporting in ES6
1. The default export - Will allow you to export it as the default, which means that when you import it, you can import it as any name that you like
    * Generally made for the main thing that the module does
2. Named Exports - When you export it, you export it as that variable name and then when someone imports it on the other end, they must know the name of the thing that they are importing
    * Used for methods and variables that you need to pluck off the module

### The default export example

`src/config.js`

```js
const apiKey = 'abc123';

export default apiKey;
```

View `index.html` again, refresh the browser and you will see `abc123`

**important** Because we exported it as a default, we can name it anything we want on the file we are importing it into

So this will work

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import philRocks from './src/config';
console.log(philRocks);
```

The reason is when you use the default export gets renamed as to whatever you named it when you import it as

## Named exports

**note** Every module you have can only have 1 default export however you can have multiple named exports

`src/config.js`

```js
// Named Export
export apiKey = 'abc123';
```

Save and webpack will throw an error because we are exporting as a `named export` and we need to use the `apiKey` as the name

We update `app.js` to:

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import apiKey from './src/config';
console.log(apiKey);
```

And now we get another error: `export 'default' (imported as 'apiKey') was not found`

We need to change the syntax in `app.js` from:

`import apiKey from './src/config';`

* The above syntax is only used when something is exported as a default

To:

`import { apiKey } from './src/config';`

* It looks like we are restructuring but we're not. It is just the syntax to import named exports
* View in browser now and we will see `abc123`

### How would I get access to another variable inside `config.js`?

`src/config.js`

```js
export const apiKey = 'abc123';
// add this line
export const url = 'http://kingluddite.com';
```

`app.js`

```js
export const apiKey = 'abc123';
// add this line
export const url = 'http://kingluddite.com';
```

View in browser and you will see `abc123` and `http://kingluddite.com`. So both variables are now available anywhere inside of `app.js`

So using named export and picking and choosing only the things you want and this helps inforce using small modules that do just one thing. If you can make self-contained modules, it increases the chances of you using them on multiple projects

## Exporting functions
`src/config.js`

```js
export const apiKey = 'abc123';
export const url = 'http://kingluddite.com';

// add this function
export function sayHi(name) {
  console.log(`Hello there ${name}`);
}
```

`app.js`

```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
import { apiKey, url, sayHi } from './src/config'; // modify this line
console.log(apiKey, url);
sayHi('King'); // add this line
```

Refresh the browser and you will see `Hello there King`

[MDN export syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

## Export multiple at one time
`src/config.js`

```js
export const apiKey = 'abc123';
export const url = 'http://kingluddite.com';

export function sayHi(name) {
  console.log(`Hello there ${name}`);
}

// add these lines
const age = 100;
const dog = 'Peaches';

export { age, dog }
```

And when you import them just add them like this:

`import { apiKey, url, sayHi, age, dog } from './src/config';`

## Renaming named export
This is important as it prevents conflicts

`app.js`

```js
import { apiKey as philRocks, url, sayHi, age, dog } from './src/config';
```

### Rename when you export

`src/config.js`

```js
export { age as old, dog }
```

And update `app.js`

`import { apiKey as philRocks, url, sayHi, old, dog } from './src/config';`

By renaming `age` as `old`

### Formatting a long string of imports like this

```js
import { 
  apiKey as philRocks, 
  url, 
  sayHi, 
  old, 
  dog 
} from './src/config';
```

