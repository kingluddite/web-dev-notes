# How Node Modules Work
* Module.exports
* require

`greet.js`

```js
const greet = function() {
  console.log('Hello');
};

module.exports = greet;
```

* module.exports makes `greet` available outside out module

`app.js`

```js
const greet = require('./greet');
greet();
```

* We use require to pull in the module.export from greet.js and store it in the `greet` variable
* We invoke greet()

## Let's use Visual Studio to debug this
* require is a JavaScript function
    - it exists in the JavaScript side of node core
    - you can step into it and see the JavaScript that is running
* Set a breakpoint on line of `app.js`
* And **step into** it
* And we are inside the JavaScript side of node core
* The file is module.js
* and we are inside the require function

![inside require function](https://i.imgur.com/ysAEIB8.png)

* The require function takes a `path` argument which is the string I passed to it `"./greet"`
* step over
* step into the `mod.require(path)` function
* That takes us to the prototype attached to this function constructor `Module`
    - So every Module you create gets an object created to represent it and that has access to a require method using **prototypal inheritance**

`Module.prototype.require = function(path) {`

* It is the require function but it is actually just a wrapper for a load function

`return Module._load(path, this, /* isMain */ false);`

* Step over twice to get to the above line and step into it
* And here is where we start to see what is happening
* Step over 3 times

`var cachedModule = Module._cache[filename];`

* It is setting up some variables I can use like:
    - filename
        + If you hover over you will see the **full path** to greet.js on your computer
* Step over 3 times
* Here is the spot where my object is created to represent the module that I'm creating with my JavaScript file
* It is created using the `new` keyword and the function constructor

`var module = new Module(filename, parent);`

* Step over that
* Now we have the module object
    - It has a few different properties
    - And it has the `exports` object that is just an empty object sitting on it

![module object](https://i.imgur.com/jxIYUnj.png)

* That is `module.exports`
* Step over 2 times

`tryModuleLoad(module, filename);`

* Step into `tryModuleLoad()`
* Step over once

`module.load(filename);`

* This is where it will load the contents of my JavaScript file
* Then we know when we require JavaScript files we don't need to add `.js` and this is the line of code that does that magic

`var extension = path.extname(filename) || '.js';`

* If I don't provide an extension it will assume it is a `.js` extension
* So if you ever have to require a file that is not a `.js` file you will need to add the extension
* Then we see something [brackets] we used before

`if (!Module._extensions[extension]) extension = '.js';`

* If you hover over extension you will see it is holding a string `".js"`
* You can add `Module._extensions` under the area called `watch`
    - Just enter Module._extenstions as the expression you are adding and then it will appear like this:

![watch Module._extension](https://i.imgur.com/VfwxFXG.png)

* You will see it is an object and:
    - .js
        + name is .js and the value is a function
    - .json
        + name is .json and the value is a function
    - .node
        + name is .node and the value is a function
    - are property names
    - These are the types of files that node.js will support loading
        + So when it knows you want .js it will call that respective function

* Step over until you get to this line:

`Module._extensions[extension](this, filename);`

* And step into that
* Step over and you'll see this line

`module._compile(internalModule.stripBOM(content), filename);`

* Now we are getting to the nitty gritty
* This line is where it will compile our code (it will run it through the V8 engine)
    - It has the filename, it has the contents of my file
    - Hover over `content` and you will see the contens of our greet.js in the pop up window

* Step over 3 times

` module._compile(internalModule.stripBOM(content), filename);`

* Step into

`Module.prototype._compile = function(content, filename) {`

* Now we are in the _compile function which is also on the prototype so it is available to all modules
* Step over

```
// create wrapper function
var wrapper = Module.wrap(content);
```

* Here it takes my JavaScript content and wraps it
* Stop and think what is happening here
    - Node takes my JavaScript that I wrote and passes it to the V8 engine
    - What is stopping Node from stopping or adding to what I've written? Nothing
    - So Node doesn't just give the V8 the code we wrote, it wraps it in other code that makes all this work
* Step into the wrap function
* You will see that the `script` variable is my code
* It sandwiches my code between two other array items

`return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];`

And here is the array

```js
NativeModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ];
```

* So this creates one string and then given to V8
* The code I wrote is wrapped in what looks like an IIFE
* That means everything I write in Node is actually run in V8 not just by itself but wrapped inside this particular function expression
* What does that mean?
* Step over several times until you get to this line:

```
result = compiledWrapper.call(this.exports, this.exports, require, this,
                                  filename, dirname);
```

* This is the line that .call is used to invoke the function
* The first part says what the `this` variable should be and the rest is the array of arguments
    - It gives it require, filename and dirname
    - And then runs the function
    - And the function is my code wrapped in an almost IIFE
    - And then if you **step into** the compiledWrapper.call()
    - You will be taken to my code in greet.js
    - Now step over twice (your code)
    - Now it ran my code
    - Step over several times (it checks for errors)
    - No errors and you'll come to this line:

   `return module.exports`
   
   * So module.exports is what is returned after my code is written and processed
   * Step over until you get to app.js and the `greet()`
        - The require function finished running
            + It went out, got the file
            + Assumed it was a .js file
            + loaded the contents
            + wrapped it
            + ran it
            + and then returned whatever came sitting on module.exports (the exports property of the module object)
                * And that was a function
                * That I then run
                * And I see `Hello` in the Terminal

### Further analysis
* Node wraps my code in a wrapper like this:

![wrapper code](https://i.imgur.com/SG4Xj1H.png)

* It wraps my code inside a function expression
* Using those parentheses to create that function on the fly
* And this function expects 5 parameters

![5 parameters](https://i.imgur.com/X6W89oz.png)

* Then node invokes the function

![node invokes](https://i.imgur.com/mHtccNx.png)

* It makes the require function available to my code because it is passed in as a parameter when the code is executed
* And the same thing with module
    - module is available to my code when I'm writing in node because my code wasn't the only thing running
    - my code is wrapped in a function and that module is a parameter to that function and node passes it in

## Last thing to note
`return module.exports`

What actually is returned from require is `module.exports`
remember objects are passed by reference
So whatever I do to module.exports, inside my module because it is inside the function is going to impact the module.exports that was created outside the function
* So `require` gives me this module object and then I change the module object by changing what's on .exports and that means when require gives back module.exports (when it returns itself as a function)

![module.exports](https://i.imgur.com/SiseEtG.png)

* Whatever I did inside my module to module.exports
* Whatever I did inside my code to this module object
* That's what will be returned by **require** because it is passed by reference and pointing to the same object in memory
* And all the code I write are written inside a function is protected and won't collide with other files because they are not available outside
* but because of passing by reference, the module object is passed by reference, I can use that as my window to outside my function
* and because I change my module and because it is pointing at a memory space that is available outside my function, I can change it and that change becomes available outside this secretly wrapped function

![return module.exports](https://i.imgur.com/iKc2bm0.png)

## Quick Summary
* `require` is a function, that you pass a `path` to
* **module.exports** is what the require function returns
* this works because **your code is actually wrapped in a function** that is given these things as function parameters






