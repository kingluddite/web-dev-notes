# JS modules (Part 1)
* One of the main thing Webpack offers us is the JavaScript Module System which gives us a better way to structure our apps
* We don't need to install anything new

## Before without Webpack
* We has to load in multiple js files in a specific order
* We don't have to do that anymore with Webpack

## After with Webpack
* We always have just one file "coming out"
    - This contains everything needed to run our app
    - And we only load in with a single script tag
        + (even though the underlying app might have multiple scripts)

## Demo of JS Module System
* Let's start with 2 blank files
    - `index.js`
    - `utilities.js`
* Let's visualize how and when these files are running
* We'll shut down `babel` in one terminal tab
* We'll run live-server in another terminal tab
    - We don't want to run both `babel` and `webpack` as they are both trying to change the same file
    - You may need to reinstall `live-server` if you removed it `$ npm i live-server`

`$ npm run serve` (runs live-server)

* Make sure to shut down babel and run webpack `$ npm run webpack` (in other terminal tab)

`$ npm run webpack`

* From the webpack output we see the entry point is only `./src/index.js`
* That is the entry point where webpack starts
    - `index.js` doesn't specify that it needs anything from any other files (so no other files run)
    - You will only see `index.js` in the client console

## How do we get to run both files?
* By using the JavaScript Module System
* It gives us 2 news things to accomplish this
    - The `import` statement (grab something from another file)
    - The `export` statement (used to export something from a file)

`src/index.js`

```
import './utilities';
console.log('index.js');
```

* We import from `./` means current directory
* `.js` extensions are options so we leave it off
* Re-run webpack and now you'll see both logs in the client console
* The output shows both files were used

![2 files used in source](https://i.imgur.com/pVv5hiK.png)

![both files in console](https://i.imgur.com/89VEuND.png)

## Can I just create a variable now in utilities.js and use it in index.js?
* No
* Let's show you it doesn't work

`utilities.js`

```
console.log('utilities.js');

const add = (a, b) => a + b;
```

`index.js`

```
import './utilities';
console.log('index.js');
console.log(add(1, 2));
```

* Run Webpack again

`$ npm run webpack`

## Houston we have a problem!
* We get an error
* `Uncaught ReferenceError: add is not defined`

## When working with JavaScript Modules each file has it's own separate scope
* So no longer are variables shared between files (This is a good thing!)
* We can still share variables between files with JavaScript Modules but we have to be **explicit** when we are exporting from one file and importing from another
    - Currently `utilities.js` has no exports so we can't access `add`

## Just add export
`utilities.js`

```
console.log('utilities.js');

export const add = (a, b) => a + b;
```

`index.js`

```
import { add } from './utilities';
console.log('index.js');
console.log(add(1, 2));
```

* Now run webpack

`$ npm run webpack`

* And you'll see you get both logs from both files in client console
* And we can use `add` to give us `3` in client console

## named exports
* The stuff inside the `{}` is where we place one or more named exports

## Multiple named exports
`utilities.js`

```
console.log('utilities.js');

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

`index.js`

```
import { add, subtract } from './utilities';
console.log('index.js');
console.log(add(1, 2));
console.log(subtract(10, 5));
```

`$ npm run webpack`

* And we see we get results for both `add` and `subtract` methods

## Challenge
1. Create new file called greeting.js
2. Export "greeting" function that takes a string argument
    a. Convert that string to uppercase
    b. Add "!" onto the end
3. Import greeting into index.js and "consume" it

`src/greeting.js`

```
console.log('greeting.js');

export const greeting = str => `${str.toUpperCase()}!`;
```

`index.js`

```
import { add, subtract } from './utilities';
import { greeting } from './greeting';

console.log('index.js');
console.log(add(1, 2));
console.log(subtract(10, 5));
console.log(greeting('Phil')); // PHIL!
```

* Run webpack

`$ npm run webpack`

* You should see `PHIL!` in the client console
