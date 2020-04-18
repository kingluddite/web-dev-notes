# Intro
## What is Node?
* A JavaScript runtime that uses the V8 engine
* Before `Node.js` there was no way to use JavaScript outside of the browser
* Now with Node.js developers can:
    - Use JavaScript to write server side code
    - Create web servers
    - CLIs (command line interfaces)
    - Application backs
    - And a ton more
* Node is a way to run JavaScript code on the server as opposed to being forced to running it on the client in the browser

## Installing Node
* You can use website and download Node for your OS
* For Mac you can also use homebrew to install Node

`$ brew install node`

## How is server side JavaScript possible?
* Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
    - Every major browser has its own JavaScript engine
    - Node uses the same V8 engine that powers the Chrome browser

### What is the purpose of a JavaScript engine like V8?
* To take in JavaScript code and compile it down into machine code that your machine can execute

## What is the V8 engine?
* An open source JavaScript engine written in `C++` that takes JavaScript code and compiles it to machine code
    - It is used inside of JavaScript
    - It is used inside the Chrome browser
* Any developer could write a C++ application, they could incorporate the V8 engine into their application and they could extend the functionality that JavaScript provides
    - That is exactly what Chrome and `Node.js` do
    - Both Chrome and Node are largely written in `C++`

## Visualization of how Chrome works with V8
* When Chrome needs to run JavaScript for a particular web page it doesn't run the JavaScript itself, instead it passes it to the V8 engine and it gets the results back

![Chrome uses V8 engine](https://i.imgur.com/yk3a9R1.png)

### The same exact process is true with Node.js
* Node does not know how to process JavaScript
* So Node passes the code to the V8 engine and gets the code back

![Node and V8 engine](https://i.imgur.com/E4KMxsH.png)

* **note** Chrome and Node are largely written in C++
* The V8 engine is written in C++

![Chrome, Node and V8](https://i.imgur.com/ISpL3WZ.png)

* It is not a coincidence Node, Chrome and V8 were all written in C++
    - Chrome and Node are both creating bindings when they are instantiating the V8 engine
        + This is what allows them to create their own JavaScript runtime with interesting and novel features
        + It's what allows Chrome to interact with the DOM when the DOM isn't part of JavaScript
        + And it allows Node.js to interact with your file system when the file system isn't part of JavaScript either
        + V8 has no idea how to interact with the file system, with JavaScript or what the DOM is - it is up to Node.js and Chrome to provide implementations for those when running V8

## What does this process look like?
* We have a table (not really a table but convenient to think of it as a table)
* We have a set of JavaScript methods and objects and we have a set of C++ functions

JavaScript (Chrome) | C++
------------ | -------------
localStorage.getItem | Some C++ function
document.querySelector | Some C++ function

* **note** both `localStorage.getItem` and `document.querySelector` are not part of the JavaScript language itself
* They are not part of JavaScript but they are actually implemented by the Chrome runtime
    - When Chrome runs a JavaScript file that uses either of these at the end of the day some C++ code gets executed behind the scenes which is responsible for taking care of the functionality
    - That is why Chrome has so much C++ code
    - Chrome also needs to tell V8 what to do when these methods are called (so Chrome is not just passing JavaScript code to the V8 engine)

## And the same things works for Node
JavaScript (Chrome) | C++
------------ | -------------
fs.readFile | Some C++ function
os.platform | Some C++ function

`fs` stands for **file system**
`fs.readFile` - I can read a file
`os` operating system
`os.platform` - know what os platform I am on (mac, linux or windows)

* The above is not part of the JavaScript language
* They are provided to V8 as part of the Node.js runtime
* JavaScript doesn't know how to read a file from disc, but C++ does
    - So when someone uses JavaScript code in Node.js to read a file from disc it just defers all of that to the C++ function that can read the file from disc and return the results back to where they need to be

![visual map of chrome, node and V8 working together](https://i.imgur.com/wvIJRIt.png)

## Node.js is not a programming language
* It is just a runtime
* We will write JavaScript, the runtime is something that provides custom functionality
    - So various tools and libraries specific to an environment
    - So in the case of Chrome, it provides V8 with various objects and functions that allow JavaScript developers in the Chrome browser to do things like:
        + Add button click events
        + Or manipulate the DOM
        + And a lot of other stuff too
    - Those features don't make sense for Node.js because there are not buttons and there is not DOM - so Node.js doesn't provide those things
    - Instead the Node.js runtime provides various tools that various Node developers need
        + Like:
            * Libraries for setting up web servers
            * Integrating with the file system (so you can read/write from disc)
            * At end of the day both Node.js and Chrome are just creating their own modified version of JavaScript
            * It will be the same core JavaScript language but with custom functions and objects injected

## Walk through code difference in JavaScript and Node.js
### Open chrome console in browser
```
> 2 + 3
< 5
> 'John'.toUpperCase()
< 'JOHN'
```

### Now we're write Node inside the Terminal
`$ node`

#### REPL
* This gives a place where we can run little individual node statements (aka REPL)
    - REPL - "Read Eval Print Loop"
* These will be Node JavaScript statements and not Bash commands
* We'll write the exact same code as above in the REPL:

```
> 2 + 3
< 5
> 'John'.toUpperCase()
< 'JOHN'
```

* This shows us all the core JavaScript features are still available using Node.js because those are provided by the V8 engine itself

## Let's look at the browser and explore the differences
### The `window` object
* The `window` object is a reference to our browser window

### Open the browser console
`> window`

* That will print the entire window object to the console
    - Expands it and you will see hundreds of properties and methods we have access to
    - You will see screen dimensions and click events and lots of other things that are specific to the window and the browser
    - What does this mean in Node? There is no window so they don't make sense

## Type `window` in the Node REPL
`> window`

* You will get a "ReferenceError: window is not defined"
* This shows you that `window` is something specifically provided by the Chrome runtime when JavaScript is running in the Chrome application (browser)
* `Node` doesn't have a window, doesn't need a window so window is not provided

## But node has access to `global`
`> global`

* This will output something like:

```
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(util.promisify.custom)]: [Function (anonymous)]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(util.promisify.custom)]: [Function (anonymous)]
  }
}
```

* We will be using these later

## Does browser have `global`?
`$ global`

* No it does not
* We get this error "ReferenceError: global is not defined"

## In the browser I also have `document`
`$ document`

* `document` allows me to work with the DOM in the browser
* The DOM is a ton of elements that make up my "page"
* I can use `document` to manipulate those elements however I wish to

## Is there a DOM in node?
* No

`> document`

* You will get "Uncaught ReferenceError: document is not defined"

## But Node gives us access to something similar to `document` called `process`
* `process` gives us access to many Node properties and methods to manipulate the `node` process that's running

`> process`

* You will see a ton of stuff we have access to
* You will see among other things `exit`
    - This lets you quit the Node REPL

`> exit` doesn't work but `process.exit()` will quit the Node REPL

* This command `process.exit()` brings you back to the standard Terminal window (Now I am no longer running little Node statements)

## `process` does not work in the Chrome browser console
`$ process`

* You will get this error "ReferenceError: process is not defined"

## Recap
* We highlighted some of the differences between JavaScript in the browser (Chrome or any browser) and Node.js which is JavaScript running on the server
* Node.js is JavaScript on the server
    - This is possible because Node.js uses the V8 JavaScript engine to run all of the JavaScript code you provide
    - Node.js is able to teach JavaScript new things by providing C++ bindings to V8, this allows JavaScript (in essence) to do anything C++ can do, C++ can access the file system, so now JavaScript can access the file system through Node.js



