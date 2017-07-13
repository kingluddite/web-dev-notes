# JavaScript Aside
## Node, ES6, and Template Literals
* New version of JavaScript is ES6 and is often referred to as ECMAScript 2015)
* Includes new features in JavaScript intended to make managing code easier
* And to add some things JavaScript was missing
* The latest version of Node includes the latest version of Chrome V8 embedded inside of it
    - The latest versions of V8 have more support for ES6
    - You can start right away using ES6 and Node
    - But you can't start right away using all ES6 in the browser because not all browsers support it
        + You may not also have the latest version of node on the server your code to
        + The client browser might not have the lastest version of V8 on it

## Nice to write ES6 everywhere
* It is confusing to write ES6 in node and not in the browser

## Babel
* This lets you write ES6 everywhere
* babeljs.io
    - Let's you write ES6 and then it transpiles it into older JavaScript (something that will run on all browsers)

## VS editor
`jsconfig.json`

* File that tells VS you are running ES6

```json
{
    "compilerOptions": {
        "target": "es6"
    }
}
```

* Now with this file I can write ES6 and VS won't complain about them

## Template Literals
A way to concatenate strings in JavaScript ES6

* Way easier to work with than a bunch of strings concatenated with `+`

### Back tic (aka grave accent)
```js
var name = 'John Doe';

// old way
var greet = 'Hello ' + name;
// new ES6 way using Template Strings
var greet2 = `Hello ${ name }`;

console.log(greet);
console.log(greet2);
```

* Run `$ node app.js`
    - output is:

```
Hello John Doe
Hello John Doe
```

* I can't use this in every browser
* If I want to use this in every browser I need to use **babel** to transpile it to older JavaScript all browsers understand
* But in the case of Node, I can use ES6 as is because it is the latest version of NodeJS using the latest version of V8 which supports ES6
