# Convert Hangman app to webpack boilerplat

## Let's get our boilerplate ready
* We don't need `node_modules` so delete that
* We'll add a README.md
    - It will have install instructions
    - `$ npm install` (install all dependencies)
    - We'll do this whenever we start a new project
* We'll gut `src` to just have an empty `index.js`

## Convert hangman
* Rename original folder `hangman-old`
* Create a new folder called `hangman`
* Make a copy of `babel-boilerplate`
* Rename it `hangman`
   - Drag `images` and `styles` inside `public`

`hangman/public/index.html`

```
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Hangman</title>
  <link rel="stylesheet" href="/styles/styles.css">
  <!-- <link rel="icon" href="/images/favicon.png"> -->
</head>

<body>
  <div>
    <div id="puzzle" class="puzzle"></div>
    <p id="guesses"></p>
    <button id="reset" class="button">Reset</button>
  </div>
<script src="/scripts/bundle.js"></script>
</body>

</html>
```

* Move:
    - hangman.js from hangman-old to `hangman/src/hangman.js`
    - requests.js from hangman-old to `hangman/src/requests.js`
    - copy all content of `app.js` from hangman-old to `hangman/src/index.js`
* Delete hangman-old folder

`hangman/src/hangman.js`

```
class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('');
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = 'playing';
  }

  calculateStatus() {
    const finished = this.word.every(
      letter => this.guessedLetters.includes(letter) || letter === ' '
    );

    if (this.remainingGuesses === 0) {
      this.status = 'failed';
    } else if (finished) {
      this.status = 'finished';
    } else {
      this.status = 'playing';
    }
  }
  get statusMessage() {
    if (this.status === 'playing') {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === 'failed') {
      return `Nice try! The word was "${this.word.join('')}".`;
    } else {
      return 'Great work! You guessed the word.';
    }
  }
  get puzzle() {
    let puzzle = '';

    this.word.forEach(letter => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter;
      } else {
        puzzle += '*';
      }
    });

    return puzzle;
  }
  makeGuess(guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);

    if (this.status !== 'playing') {
      return;
    }

    if (isUnique) {
      this.guessedLetters.push(guess);
    }

    if (isUnique && isBadGuess) {
      this.remainingGuesses--;
    }

    this.calculateStatus();
  }
}

export { Hangman as default };
```

`requests.js`

```
const getPuzzle = async wordCount => {
  const response = await fetch(
    `//puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to get puzzle');
  }
};

export { getPuzzle as default };
```

`index.js`

```
import Hangman from './hangman';
import getPuzzle from './requests';

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let gameOne;

// event handlers
window.addEventListener('keypress', function(e) {
  // grab the letter
  const guess = String.fromCharCode(e.charCode);
  // guess with that letter
  gameOne.makeGuess(guess);
  render();
});

const render = () => {
  console.log('yo');
  puzzleEl.innerHTML = '';
  guessesEl.textContent = gameOne.statusMessage;

  gameOne.puzzle.split('').forEach(letter => {
    const letterEl = document.createElement('span');
    letterEl.textContent = letter;
    puzzleEl.appendChild(letterEl);
  });
};

const startGame = async () => {
  const puzzle = await getPuzzle('2');
  gameOne = new Hangman(puzzle, 5);
  render();
};

document.querySelector('#reset').addEventListener('click', startGame);

startGame();

```

## Styling our app
`styles/styles.css`

```
* {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
}

 html {
     font-size: 62.5%;
}

 body {
     background: #2B292E;
     color: #fafafa;
     font-family: Helvetica, Arial, sans-serif;
     font-size: 1.6rem;
     display: flex;
     align-items: center;
     justify-content: center;
     min-height: 100vh;
}

 span {
     border-bottom: 1px solid #534f59;
     display: inline-block;
     font-size: 2rem;
     height: 2.4rem;
     line-height: 2.4rem;
     margin: 0 .1rem;
     text-align: center;
     text-transform: uppercase;
     width: 2.4rem;
}

 p {
     font-weight: 300;
     margin-bottom: .8rem;
}

 .puzzle {
     display: flex;
     margin-bottom: 4.8rem;
}

 .button {
     background: #7044a0;
     border: none;
     border-bottom: 2px solid #603a88;
     cursor: pointer;
     color: white;
     font-size: 1.4rem;
     font-weight: 300;
     padding: .8rem;
     transition: background .3s ease, color .3s ease;
}

 .button:hover {
     background: #5F3A87;
}
```

## Run our app
* Navigate to the new hangman directory in the terminal
* Install all the dependencies

`$ npm install`

## Now test to make sure the dev server is running
`$ npm run dev-server`

## Houston we have a problem!
* We get a ReferenceError: regeneratorRuntime is not defined
* It is from requests.js
* It has to do with async/await

![reference error](https://i.imgur.com/WLYRUUD.png)

* We never referenced regeneroatorRuntime in our code
* It is something that gets processed after babel processes our async functions
    - By default it doesn't exist which is why the code is currently failing

## We have good news!
* With a simple tweak to our configuration we can add support for this and get things working as expected
* And this means we can have async/await functionality working in all browsers!

### babel-polyfill

## What is a polyfill?
* Try it out on `babeljs.io`
* Type on left:

```
class Test {}
```

* You will see babel work its magic and spit out on the right older browser friendly code on right:

```
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test() {
  _classCallCheck(this, Test);
};
```

## .forEach
* On left

```
[].forEach(() => {
})
```

* On right

```
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test() {
  _classCallCheck(this, Test);
};

[].forEach(function () {});
```

* Babel converts arrow function to regular function
* Still uses `.forEach` because that is old code

### But we have newer array methods
* Like `includes`
* This method doesn't run in all browsers

```
class Test {}

[].includes(() => {
})
```

* Converted on right

```
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = function Test() {
  _classCallCheck(this, Test);
};

[].includes(function () {});
```

* includes() doesn't try to use any new syntax but the problem is older browsers don't all support it
* The `polyfill` fixes that

### How does a polyfill fix that?
* A polyfill runs "BEFORE" your code runs and adds support for things like "includes" in older browsers
* The polyfill runs some code to check if the array prototype has the includes method on it, if it does, it leaves it alone (knowing it runs in the current browser) if it doesn't, it will define an implementation for us

### Long story short
* We need to include the polyfill so we get access to the function babel needs `regeneratorRuntime`

### Install it
`$ npm install babel-polyfill`

* **note** The key to using the polyfill is to load it BEFORE our application loads

### Let's modify our webpack.config.js
* We'll modify the `entry` property and change the value from a string to an array of strings (so we can load multiple files)

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
  },

// MORE CODE
```

* Now our polyfill will load BEFORE our application loads, and it will make that function available to us and now we'll be able to use `async/await`

## Take app for a test drive
`$ npm run dev-server`

* The app should work as it had before

## Build the app for production
* We used netlify as an easy browser based website to deploy a website
* And we used surge as a great command line tool to deploy apps

### First step: Generate the production build
`$ npm run build`

* **remember** We have to run the above script to generate the production build
* This spits out actual files to the public `scripts` folder

## Create a new netlify app
1. Make your hangman app a git app
2. Add it to github (https://github.com/github/hub)
3. Log into Netlify
4. Create a site and point to your hangman app
5. Deploy app (accept all defaults)
6. Drag your `public` folder (you just generated this running `$ npm run build`) to the box on Netlify Deploy page

```
Need to update your site without making changes to the repository? Drag and drop your site folder here
```

![deploy drag drop public](https://i.imgur.com/ADzMnz8.png)

## Production app
[production hangman app](https://new-hangman-app.netlify.com/)

* I added the favicon folder to images and updated `index.html` and updated the code
  - Remember to use cache busting to see the new favicon

## Update our boilerplate with babel-polyfill
*Let's add babel-polyfill to our boilerplate
* In hangman `package.json` grab the babel-polyfill

![babel-polyfill](https://i.imgur.com/zVLHHAr.png)

* And paste it into our boilerplate `package.json`
* Now we won't have to fix this regeneratorRuntime issue every we want to use async/await

### We also have to update our webpack config
* From

`webpack.config.js`

```
// MORE CODE

const path = require('path');

module.exports = {
  entry: './src/index.js',

// MORE CODE
```

* To this:

```
// MORE CODE

const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

// MORE CODE
```


 
