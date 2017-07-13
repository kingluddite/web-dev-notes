# What is Node.js?

## What is JavaScript?
* JavaScript runs in the browser
    - Web browser stuff
        + open modal window
        + lightbox
        + toggle menu
        + add content without browser refresh (_ajax_)
        + aka `Front-end` tasks
* JavaScript also works on the server
    - aka `Back-end`
    - does stuff like
        + Create new files and folders on hard drive
        + interact directly with a Database
        + Trigger server to send email
        + Traditionally you would need a `Server-side` languge like
            * Ruby
            * Python
            * PHP
            * any language that can run on a computer and not just a web browser
            * JavaScript can't do any of these things

## Node.js
A JavaScript runtime that allows us to do anything with JavaScript

* Took the JavaScript guts out of Google Chrome and created a playground for JavaScript to play in and it is located in the computer itself and not in the web browser
* This playground gives JavaScript the ability to do whatever it wants to the file system
* You can create files
* You can talk directly with Databases
* You can send emails
* You can create and serve up your own API

### Node has two main uses
1. Install `Node.js` on a server
    * When users of your web app request data
    * Node takes that request, it then in turn communicates with the Database or API
    * Node retrieves the data
    * Node sends back to the user
    * Node is what is powering or serving up your public facing app
2. Install `Node.js` on your own personal computer
    * We are not using node to serve up anything
    * We are just using node as a development tool
    * It will be our very own robot assistant
    * We'll use node to automate all our web development tasks and this will save us a ton of time

## How to install
* [node site link](https://nodejs.org/en/)
* Download most stable version
* Install [homebrew](https://brew.sh/)
* Install node using homebrew `$ brew install node`
* Upgrade node `$ brew upgrade node`
* What version of node do you have? `$ node -v`

## Demos
### Demo #1 - Hello World
* Create a `fun-with-node` folder
* Inside name a file `test.js`
* Type `console.log('hello from node');` inside `test.js`
* In Terminal navigate to `fun-with-node` and `$ node test.js`
* The terminal will show you `hello from node`

### Demo #2 - Simple Computation
`test.js`

```
console.log(2 + 2);
```

`$ node test.js` ---> 4

#### What is cool about seeing `4`?
* Whatever we write in our `test.js` file isn't just being repeated or echoed out to the command line but instead **Node** is interpreting and evaluating our code
* Translation - We can do whatever we want in this file!

### Demo #3 - Node creates HTML file for us
* Out of box node comes with several modules that do stuff for us
    - `fs` - stands for `File System`

`test.js`

```
var showMeTheFiles = require('fs');
showMeTheFiles.writeFile(__dirname + '/index.html', '<h1>I am HTML and I come in peace</h1>');
```

`$ node test.js`

#### Demo #4 - Grab an image from the Internet and add to your project
`app.js`

```
var showMeTheFiles = require('fs');
// important to look at URL and use http or https and require it
var https = require('https');

var stormTrooperUrl = 'https://iso.500px.com/wp-content/uploads/2014/04/20482.jpg';
var stormTrooperFile = showMeTheFiles.createWriteStream(__dirname + '/storm-trooper.jpg');
var request = https.get(stormTrooperUrl, function(response) {
  response.pipe(stormTrooperFile);
});
```
