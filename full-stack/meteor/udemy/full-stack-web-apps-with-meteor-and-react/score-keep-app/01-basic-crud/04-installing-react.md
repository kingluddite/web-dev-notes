# Installing React and Exploring JSX

## Install React and ReactDOM
These are 3rd party Libraries

### React
Searching on `npmjs.com` is notoriously lame. It is better to google search `npm react` and you should see [this as the first result](https://www.npmjs.com/package/react)

`$ npm i -S react`

### ReactDOM
[Searching chrome will give you this](https://www.npmjs.com/package/react-dom) and it is version 15.5.3

**note** Both versions are the same because these two packages are closely intertwined. Make sure your versions are the same for both

### How do you know if an npm package is good?
* `Stats` - useful to see how many people are using package, will give you an idea if the package is the most up-to-date and maintained

## Why `npm` can't find command?
* If you just install Meteor and not `node` you will get this error
* **Meteor** installs `node` with it but we have to run the command a little differently which would be `$ meteor npm i -S react react-dom`
  - This runs the version of **npm** that comes bundled with **Meteor**
  - It does the exact same things as `npm` from **node** but you need to use this command to run it without installing **node** separately

### Which version of `npm` is Meteor running?
`$ meteor npm --version`

### Which version of `npm` are you running?
`$ npm --version`

Update your `npm` with `$ brew doctor` and then `$ brew upgrade`
  * I'm assuming you have homebrew installed
  * If you don't, it might be a good time to install it now :)

### If you wanted to install a specific version
* It is important to use stable versions as a tutorial you are watching from 6 months ago may work with specific versions but may break with more recent versions
* This is a lesson you probably won't learn until you waste countless weekend hours wondering why you can't complete an online tutorial that everyone else seemed to love

#### Specific Install Example
Here is how to install a specific version of a package

`$ meteor npm install react@15.3.2 react-dom@15.3.2`

### `node_modules`
* `node_modules` is a generated folder
* Never make changes to it because it should get wiped and regenerated on every computer this project gets executed on

### package.json and installing project dependencies
You can specify the packages and their versions and regenerate them with this simple command:

`$ npm install`

## index.html

`client/index.html`

```html
<head>
  <title>Score Keep</title>
</head>

<body>
  <div id="app"></div>
  <!-- /#app -->
</body>
```

### JSX
* Stands for JavaScript XML
* It is an extension of the JavaScript language

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
  const name = 'PEH2'
  const jsx = <p>hello {name}</p>;
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

You will dynamically output `hello PEH2`

`babeljs.io` will convert your JSX into JavaScript

```
  const name = 'PEH2'
  const jsx = <p id="greet">hello {name}</p>;
```

Is transpiled by babel to:

```
"use strict";

var name = 'PEH2';
var jsx = React.createElement(
  "p",
  { id: "greet" },
  "hello ",
  name
);
```
