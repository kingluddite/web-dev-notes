# Using Third Party Libraries
* With the JavaScript Modules System

## UUIDv4 library
* Now we'll use npm to load this in and consume it using JavaScript Modules
* Let's show how to import uuid into our hangman app

## Read this docs
* [uuid docs](https://www.npmjs.com/package/uuid)
* v4 is not the version but how the number is generated (v4 is random)
* You will see `require` in the docs on using v4
    - `require` is for node
    - swap `require` for `import` (the npm module using import code needed)

## Install uuid
`$ npm install uuid`

## Import the uuid module
* Place the import at the top of the file where you want to use it

## Test it out
* Run the dev server

`$ npm run dev-server`

### View in browser
* [view in browser](http://localhost:8080/)

```
import { v4 as uuidv4 } from 'uuid'; // add this line
import Hangman from './hangman';
import getPuzzle from './requests';

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let gameOne;

console.log(uuidv4()); // add this line

// MORE CODE
```

* View the client console and you'll see a number like: 

`ad93125f-433f-49d9-b89f-db0280faf7fd`

* If you do congrats! It works
* **note** It is a best practice to place all 3rd party imports first before custom imports

## Challenge
* Install and import the third party npm module called `validator`
* Test that it works

### Docs
* [validator docs](https://www.npmjs.com/package/validator)

### Install
`$ npm i validator`

```
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import Hangman from './hangman';
import getPuzzle from './requests';

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let gameOne;

console.log(uuidv4());
console.log(validator.isEmail('john@doe.com')); // true
console.log(validator.isEmail('john')); // false

// MORE CODE
```

* I check a valid email and that outputs `true` to the client console
* I check an invalid email and that outputs false to the client console

## Removing Packages
`$ npm uninstall uuid validator`

### Remove code we used
`index.js`

```
import Hangman from './hangman';
import getPuzzle from './requests';

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let gameOne;

// event handlers

// MORE CODE
```
