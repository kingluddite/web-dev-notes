# ES6 Properties
## Add new babel plugin
* Will add support for the class properties syntax
  - This will enable us to add properties directly onto our classes (instead of just methods)

### Benefits of this new plugin
* No need for constructor function on classes
* No need for binding `this` inside classes
  - If I wanted to add an object onto my `state` object I would have to create a constructor function
      + This is tedious and makes more work for us than we need
      + This will also help us avoid manually binding all our event handlers
      + And we will be able to remove the constructor function

## Let's look at babel plugins
* We used the docs [presets page](https://babeljs.io/docs/en/presets) to explore the initial presets
  - env
  - react

## Now we'll examine the experimental presets
* [plugin documentation](https://babeljs.io/docs/plugins/)
* [TC39](https://github.com/tc39) - org that moves JavaScript forward

## Stages
* **Important Update** Stages have been deprecated in Babel 7.0

* Stage 0 - just an idea
* Stage 1
* Stage 2 ---> we will be using this
* Stage 3
* Stage 4 - finished

### Transform Class Properties [docs](https://babeljs.io/docs/plugins/transform-class-properties/)

```
class Bork {
   //Property initializer syntax
   instanceProperty = "bork";
   boundFunction = () => {
     return this.instanceProperty;
   }
```

* We define an instance property that is equal to a String right inside the curly braces as opposed to a method
* They also define a function that is not an ES6 method
  - Arrow functions don't have their own `this` binding, so we won't need to manually adjust the binding
    + The `this` inside a bound function will always refer to the class instance
* Using these 2 features will greatly simplify our CBCs
* The above will greatly simplify our JavaScript classes

## Install plugin
`$ yarn add @babel/plugin-proposal-class-properties -D`

`$ npm install --save-dev @babel/plugin-proposal-class-properties`

* **IMPORTANT UPDATE** - `-D` is needed here as the docs provide this and also with Babel 7.0 we are using the @babel prefix

### Now we need to configure this inside .babelrc
* Or inside `package.json` if that was what you were using
* Notice we leave the `babel-plugin` prefix off of the plugin name inside the configuration

### Add plugin to `.babelrc`
`.babelrc`

```
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

* Here is `package.json` with the plugin inside it

```
// MORE CODE

  "scripts": {
    "serve": "live-server public/",
    "build": "webpack",
    "dev-server": "webpack-dev-server"
  },
  "babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties"
    ]
  },

// MORE CODE
```

## Now our .babelrc or package.json is setup to use this brand new feature
* Just save
* You must stop and restart `wepback-dev-server`

## Run the dev server again
`$ yarn run dev-server`

`$ npm run dev-server`

## Take it for a test drive in the browser
* Should work as it did before
* Make sure app works as it did before

## New syntax vs Old Syntax
* Let's experiment with the new syntax
* And compare and contrast how they work

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

class OldSyntax {
  constructor() {
    this.name = 'John Wayne';
  }
}
const oldSyntax = new OldSyntax();
console.log(oldSyntax);
```

* That last part shows us we have to create a constructor function just for one property we want to add

## New syntax
* Add to bottom of `app.js`

```
// ------- new code

class NewSyntax {
  name = 'Bobby Fisher';
}
const newSyntax = new NewSyntax();
```

* We don't have to add a constructor and we get the same output as before
* And we just add key/value pairs and we're off to the races

### No variable type used!
* We do not define with `var`, `const` or `let`

![old and new](https://i.imgur.com/MOJgJF5.png)

## Update our AddOption class
* We'll change state from our constructor to our new class syntax
```
// OLD WAY!!!!
import React from 'react';

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined,
    };
  }
```

* Change to:

```
// NEW WAY!!!!!
import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  constructor(props) {
    super(props);

    this.handleAddOption = this.handleAddOption.bind(this);
  }
```

# Test
* Should work the same as before
* But with new syntax
* We will remove constructor in a moment once we deal with binding

## Automatically open browser when starting webpack-dev-server
* For those using Node.js (and npm): put the command in the npm start script:

### MAC

```
"scripts": {
    "start": "webpack-dev-server & open http://localhost:8080/"
  }
```

### WINDOWS

```
"scripts": {
    "start": "start http://localhost:8000/ & webpack-dev-server"
}
```

### Test
* `$ npm run dev-server` and the browser will open with your app running

## Now lets address binding
* We will now show how to create functions that won't have their binding messed up
* This is another advantage of using the `class-properties-syntax`

### The old way
* This will work

```
// The old way
class OldSyntax {
  constructor() {
    this.name = 'John Wayne';
  }
  getGreeting() {
    return `Hello. My name is ${this.name}`;
  }
}

const oldSyntax = new OldSyntax();
console.log(oldSyntax.getGreeting());
```

* That will run the method and output to the client console `Hello. My name is John Wayne`

## Houston we have a problem!
* But we know that it is easy to break that binding especially for event handlers
  - If I pull that off into its own variable we can see an example of this

```
// The old way
class OldSyntax {
  constructor() {
    this.name = 'John Wayne';
  }
  getGreeting() {
    return `Hello. My name is ${this.name}`;
  }
}

const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());
```

* Now instead of calling `oldSyntax.getGreeting()` we are storing it in a variable which we'll call sometime in the future
* And we'll log it to the console

## Houston we have a problem!
* We get an error when we run this

`app.js?1112:14 Uncaught TypeError: Cannot read property 'name' of undefined`

* This error occurs because we broke the `this` binding
* And the way we fixed that was through an annoying process which will be displayed below (we bind this in the constructor)

```
// The old way
class OldSyntax {
  constructor() {
    this.getGreeting = this.getGreeting.bind(this);
    this.name = 'John Wayne';
  }
  getGreeting() {
    return `Hello. My name is ${this.name}`;
  }
}

const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());
```

* And now it works again as the binding has been repaired

### A more elegant solution using class properties
* In the new syntax we can tap into class properties by assigning an arrow function to the class method
  - **Remember** Arrow functions don't have their own `this` binding, instead they use whatever `this` binding is in the parent scope
    + And for classes, that is the class instance (so in this case the `getGreeting()` method will always be bound to the class instance)

## Let's update AddOption in our app
* We'll take handleAddOption() and break that out into a class property
  - Instead of manually binding it inside the constructor
  - So we can remove the constructor!

### Before
`AddOption.js`

```
import React from 'react';

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
  }
  state = {
    error: undefined,
  };
  handleAddOption(e) {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    this.setState(() => ({
      error,
    }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

// MORE CODE
```

## After
```
import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };
  handleAddOption = e => {
    e.preventDefault();
    const optionSelected = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(optionSelected);
    this.setState(() => ({
      error,
    }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  };

// MORE CODE
```

* These are the techniques we will use
  - We will use class properties to set up default state values
  - We will also use class properties to set up our event handlers
  - **BUT!!!!** We will still use regular ES6 methods for all those built-in React methods like render() or with LCMs something like componentDidMount()

## Challenge
* Convert `IndecisionApp` to use class syntax

### Steps
1. Pull the state out of constructor
2. Convert all 4 event handlers to class properties (arrow functions)
3. Delete the constructor completely
4. Put things in order
  * Start with class properties
    - All event handlers should be moved up top
  * End with methods (componentDidMount, componentDidUpdate, render should be at bottom of the class definition)
  * Put state at the very top

## Houston we have a minor problem
* eslint rule react/sort-comp causes issue if you place class properties above LCMs, **TODO** find a better way to customize this rule to put them in the order you want (for now I am putting LCMs ahead of class properties)

## Houston we have a minor problem
* Class properties are not part of the ES6 specification so you will get lots of eslint error saying the method you converted to a class property is not defined
* Class properties are not fully baked into React so eslint isn't concerned with it yet
* To temporarily get rid of these annoying errors drop this at the top of the files with these errors

```
/* eslint no-undef: 0 */ // --> OFF
```

* It will remove this error from the entire file
  - Not the best solution but one that I'm ok using temporarily

## no setState in component did mount
* I added this to the eslintrc file to remove errors when using this.setState in componentDidMount

`.eslintrc`

```
// MORE CODE

  "rules": {
    "no-debugger": 0,
    "no-alert": 0,
    "no-await-in-loop": 0,
    "no-return-assign": ["error", "except-parens"],
    "react/no-did-mount-set-state": 0,

// MORE CODE
```

* [resource for above answer](https://github.com/yannickcr/eslint-plugin-react/issues/1711)
* [More reading here](https://stackoverflow.com/questions/35850118/setting-state-on-componentdidmount)

## Take for a test spin in browser
* After making changes should work the same as before (but with no eslint errors in your code!)

## Clean up code
* Remove test code in `app.js`

```
import React from 'react';
import ReactDOM from 'react-dom';

import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp />, document.getElementById('root'));
```

## Recap
* We installed babel plugin `transform-class-properties`
  - Allows us to add a cutting edge feature to react
  - Now we can customize how we use classes in our syntax
  - We can set up state outside of the constructor function
  - We can remove the constructor function
  - We can convert our methods to class properties and assign them to arrow functions and use `this` to refer to the class instance
    + This is great for our event handlers which usually have a problem with `this` binding and arrow function don't have this issue
