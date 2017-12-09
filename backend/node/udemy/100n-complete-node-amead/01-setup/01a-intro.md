# Intro
## What is Node?
* A JavaScript runtime that uses the V8 engine

## What is the V8 engine?
* An open source JavaScript engine written in C++ that takes JavaScript code and compiles it to machine code
    - It is used inside of JavaScript
    - It is used inside the Chrome browser

* Install Node with brew
* Version is important
* What is node?
    - V8 engine
    - machine code - make node fast
        + low level code, that machine can process fast because it can run code directly without having to interpret it
        + V8 takes our JavaScript, converts it to machine code and machine processes is lightning fast
        + V8 engine written in C++
            * To extend Node, you don't write Node, you write C++ that will build off of what V8 already has in place

## The node command
* You can run a brand new process just by running the `node` command in the terminal

`> ` - The carrot is waiting for JavaScript Node code not a new command prompt command

`> console.log('hello')` - Will print **hello** to the screen

* What happened behind the scenes?
    - Node takes the JavaScript code, it compiles it into machine code and executes it

## V8
* The V8 engine was running when we ran the above command
* It is also running in the Chrome browser

### The Chrome Browser Console
* Same as the console we used in our above code
* You can run the exact same above command in the console and we will get the same output

### Node in terminal
* Has access to the file system
* We have access to `global`
    - `$ node`
    - `> global`
* We don't have `document` inside of **node** but we have **process**

#### process
* Run it with `> process`
    - Will give us specific information about the node process that is being executed
    - There is also methods available here to shut down the current node process
    - `> proces.exit(0)`
        + That will take us back out of node into our normal Terminal
        + I can also leave node by typing `ctrl` + `c` (twice)

### Node in Chrome browser
#### window
* Has features in manipulating what's shown inside the window
* window
    - global object
    - It stores everything you have access to
    - Type `window` in Chrome console and you'll see everything you have access to in the browser

#### document
* `document` stores a reference to the DOM up above
* The `document` shows exactly what you have inside the browser's **viewport**
    - I can make changes to the `document` to update the page above
