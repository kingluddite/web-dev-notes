# Nodemon
* Automatically restart our app as we change the files

## Install Nodemon (Command Line Utility - CLU)
* This will be installed from the command line

`$ npm i nodemon -g`

* Will intall nodemon as a global utility on your machine
* It will not get added to your specific project
* You will never require nodemon
    - Instead you will run the `nodemon` command from the Terminal
    - This will install nodemon to where npm and node are installed on your machine (outside of the project you are working on)
    - This command can then be executed from anywhere on your machine

## Run nodemon
`$ nodemon app.js`

* nodemon is only used for development purposes

`app.js`

```js
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
// space between 3rd party and custom (good style guide practice)
const notes = require('./notes.js');
```

`notes.js`

```js
console.log('Starting notes.js');

module.exports.addNote = () => {
  console.log('addNote');
  return 'New note';
}
```

### Stop nodemon
`ctrl` + `c`

