# Run some JavaScript in Node
## Install Node at the nodejs.org site
## After installing check the version
`$ node v`

## Start typing node
`$ node`

* That will open a CLI that comes bundled with node

`> 100 + 100` ---> 200

* We type JavaScript into Node.js
* Node passes it through the embedded V8 JavaScript Engine (and whatever extensions we added to the engine)
* And we get a response back from that code being executed

### set a variable
`> var a = 1`

* And get it's value back with `> a` ---> `1`

### Now we'll get node to process a file

### close node
`Ctrl` + `c` twice

### Creating a JavaScript file

#### side discussion on different versions of Node.js
io.js - node was invented by a company called Joyent but it was open source
The people at the company that worked on node were uphappy with how often node was being updated

node depends on V8 and V8 is updated by Google
as new version of V8 come out you need to update Node version in order to use the latest version of the V8 engine
Because of this there was a split
Those that wanted Node.js to be updated faster split their own version and called it `io.js`
they kept working on it and the people at Joyent and the splitters decided on how Node should be structured and updated from a clerical standpoint
* [io.js and Node.js have united](https://thenewstack.io/io-js-and-node-js-have-united-and-thats-a-good-thing/) and they called that latest version of Node for both to be 4.0

![split and then merge](https://i.imgur.com/dtVSSQV.png)

Visual Studio was built primarily to code in Node.js and JavaScript

* cmd + shift + p - command palette 
* 'install code command in path'
* restart terminal
* `$ code .` - opens in current folder

`app.js`

```js
var a = 1;
var b = 2;
var c = a + b;

console.log(c);
```

* In terminal
    - This is how you will always run your node Applications
    - You will point node to `1` JavaScript file
    - Later we will show how you can use multiple JavaScript files behind that JavaScript file
    - But you always give node a **entry point** a single JavaScript file that it will run/execute

`$ node app.js`

* the `command` is node
* the `argument` is the name of the file
* Hit enter
* Node will read that file and process it
* The result will be `3`
* That is how we will run node files

## Visual Studio tips
* Click the bug icon
* First time you click it there will be nothing there so hit `play` button to start and it will create a settings file for launching a program in node.js
* Go back to file and you will see `launch.json`

## Breakpoint
A spot in our code where we tell the debugging tool to pause the execution of our code
* So we can figure out what is going on
* debug console
* variables
* step over and through buttons
    - if it was a function you could step into it
