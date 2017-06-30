# Build a module
* Node makes `require` available inside its JavaScript core
* You pass `require()` a string
* The string is the location/name of the module you wish to import
* `./` means "it is in the same location as the current file"
    - The same folder level
    - The current directory

`greet.js`

```js
console.log('Yo');
```

`app.js`

```js
require('./greet.js');
```

`$ node app.js` ---> Yo

## Wrap our log inside a function expression
`greet.js`

```js
const greet = function() {
  console.log('yo');
};

greet();
```

`$ node app.js` --> Yo

## Can I call `greet()` from app.js?
`app.js`

```js
require('./greet.js');
greet();
```

No. You will get an error: `greet` is not defined

* Why?
* It is by design
* The code in a module should not accidentilly affect other code
* It should be self contained
* It is protected
* I can't get access to the code in `greet.js` unless I want it to
* This is a good thing
    - Variables in different files won't collide
    - Variables in different files won't overwrite each other

## How can I specifically make greet() available in other files?
* Node.js provides a way to do this

### module.exports
* This is a special variable
* A special object
* A special place to put things that I want to make available to anything else that uses this module
* And only the things I attach to this will be made available
* I choose what becomes available outside my module for use

### How to use module.exports
`greet.js`

```js
const greet = function() {
  console.log('yo');
};

module.exports = greet;
```

`app.js`

```js
const greet = require('./greet.js');
greet();
```

* Here we set a variable equal to the results of the function
* The `require` function will return `module.exports`
    - The variable can be called whatever you want
* Since functions are first class in JavaScript we can set them equal to a variable
    - And then I `invoke` that function using the variable name

`$ node app.js` --> Yo

* We exposed what was inside a module
* And then used what was inside a module

## .js extension not needed
`app.js`

```js
const greet = require('./greet');
greet();
```

* Node.js is smart enough to assume if I am asking for a module, chances are it is a JavaScript file

## Where did these come from?
* require()
* module
* module.exports

They are all defined inside JavaScript core

## How did it become available to my JavaScript files? And how it it that the module protects my variables/code?

### Test with VisualStudio
* Run it with a breakpoint

![module breakpoint](https://i.imgur.com/IhUJa7T.png)

* Modules available to me

![visual studio](https://i.imgur.com/xzHaBsT.png)

* We have access to
    - module
    - require
    - exports
    - __dirname
    - __filename
    - `this` was always available to me but that is the V8 JavaScript Engine, the JavaScript ecmascript standard says that there should be a `this` keyword available which can mean different things depending on which function and which code you're running
        + But all of the others above are not part of the JavaScript ecmascript standard and they are not part of JavaScript and they are available to me even though I haven't typed them into my code
        + What do they do and where do they come from?
        + Understanding how modules work will help you write betters ones and help you to see all the patterns that you can use in organizing your code in a clean and reusable way
