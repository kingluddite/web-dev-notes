# What is Webpack?
![high level webpack overview](https://i.imgur.com/ZXW9Qkr.png)

## Define Webpack
* Module bundler doesn't really do a good job as a definition

## Pros of Webpack
* Allows us to organize our JavaScript
    - At end of day when we run our app through Webpack we'll get a single file back
        + That file, called the "bundle", will contain everything our app needs to run
            * It will include:
                - Our dependencies
                - Our application code
        + This means we can use just one script tag instead of dozens of script tags! Huge plus!!!!
            * Not only is it a pain to adds lots of script tags it is highly inefficient and it will slow down our website because it will make for lots of HTTP calls to the server instead of just one

## Didn't Gulp and Grunt tools do this already
* Yes they did and still do
* But how Webpack does it is unique
    - Webpack is not (like Gulp and Grunt) blindly minifying all our JavaScript and concatenating everything into one file
    - Instead Webpack breaks all our files into their own little islands
        + These islands can then communicate using ES6 import/export syntax
            * This means we can break up our file into multiple files that can communicate with each other

## psuedocode of how this will work
```
// Grab the add function from add.js file in the utils folder

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
// MORE CODE
```

* We'll be able to grab a variable from another file that lives somewhere else and use that variable in our current file

```
// Grab the add function from add.js file in the utils folder
// add(2, 4)

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
// MORE CODE
```

* Above show how I could call add(2,4) and pass in some numbers and get the result back

### Benefits of this approach
* Our app will be more scalable
* Each thing will live in its own place
* This helps us move away from everything in our app living in the same place

### The transformation
* We'll break our one file app into multiple files
    - app.js will turn into a very simple file
    - It will grab all the components from whatever file they reside in
    - And it will gather them together and get them rendered to the screen

## Dependencies
* Using yarn or npm we'll be able to install 3rd party dependencies and then
use them in our apps
    - These will live in the `node_modules/` 

```
// Grab the add function from add.js file in the utils folder
// Grab React from the react npm module // pseudocode to grab a dependency
// add(2, 4)

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
// MORE CODE
```

* We'll be able to manage our dependencies in package.json
    - This is a huge pro
    - We can update them, install them with ease

## Diagram
* In the not-so-distant past client side JavaScript wasn't really essential for applications
    - The grunt work of your was handled by server
        + It was in charge of:
            * rendering
            * handling form submissions
* Client side JavaScript was really there for nice to have features
    - Some nice user interaction
    - Some cool effects
    - Stuff that if you used would be great but if they didn't work, your app would still function (aka "[Progressive Enhancement](https://alistapart.com/article/progressiveenhancementwithjavascript/)" )
* These days we have way more client JavaScript and it is essential that it runs - disable JavaScript in these sites and see if they still runs

## A Brave New World of Client side JavaScript
* Now that we are in a fat client world (sending tons of JavaScript to the client)
    - We have tons of 3rd party JavaScript
    - We have our custom coded JavaScript
    - This is why tools like Webpack are popular and essential these days
    - In the past we just had to load a few files not a big issue but now we have dozens and dozens of files, file Management is very important

## Order is important
![Before webpack](https://i.imgur.com/xqR6bpK.png)

* The order of when we call these scripts is very important
* If they are called out of order our app break

### We are relying on the global namespace
* We are polluting the global namespace, we add stuff to the global namespace that we really don't need to add
    - This causes problems
        + We could accidentally wipe or override global variables (collisions)

## A better way to structure our app
![new way to structure](https://i.imgur.com/ngddNVR.png)

* public/
    - We still use this public folder because we are serving up assets
* src/
    - This is where we'll put our client side JavaScript
* node_modules/
    - This will contain our 3rd party dependencies

![apps in folders](https://i.imgur.com/MEL7ke1.png)

## Webpack is a module bundler
![module bundler](https://i.imgur.com/0sN7vHJ.png)

* We'll set up our modules (aka our various JavaScript files) to depend on one another
* We'll define dependencies inside of files instead of globally so we avoid pollution the global namespace
* Then once we have our dependencies set up, we'll start up webpack, it will start with app.js (this will be considered the main file) and this will put together everything we need to run the app
    - After running webpack we'll wind up with a single file in the `public/` folder `bundle.js` and this is the one file we'll be loading in via a script tag
        + Webpack will allow us to break up our app into multiple files
        + It will also allow us to compress the code inside of `bundle.js`
        + And webpack will even run babel for us! (MAJOR PRO!!!!)
            * So we won't have to run a separate babel command
            * Instead we can tell webpack to run babel every single time

### Better scalability
* Now as our app grows we can easily add layers onto it as it scales well in this new structure
* Since our code won't just reside in one file we can more easily debug our app (MAJOR PRO!!!)
