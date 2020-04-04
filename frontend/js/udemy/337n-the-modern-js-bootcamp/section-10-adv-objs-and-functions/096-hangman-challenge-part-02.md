# Hangman Challenge: Part 2
* Add the ability for a player to make a guess
* Currently the guesses are hard coded into the game but we want our game to start off with no guesses
* We'll add a method that allows the user to make guess over time

`hangman.js`

```
const Hangman = function(word, numGuess) {
  // make word argument lowercase and split each character into an array of strings
  this.word = word.toLowerCase().split('');
  // store guessed letters (we simulate a guessed letter)
  this.guessedLetters = ['c'];
  this.numGuess = numGuess;
};

// return '*' for each letter and ' ' for each space
Hangman.prototype.getWordPuzzle = function() {
  // new array to store puzzle letters
  let puzzleArr = [];
  // loop through each letter in word array
  this.word.forEach(letter => {
    // check for spaces
    if (letter === ' ') {
      puzzleArr.push(' ');
      // check for guess letters
    } else if (this.guessedLetters.includes(letter)) {
      // push the guessed letter into puzzle
      puzzleArr.push(letter);
    } else {
      // not guessed yet so push an asterisk
      puzzleArr.push('*');
    }
  });
  // take array of string characters and join them as one string
  return puzzleArr.join('');
};

const gameOne = new Hangman('CAT', 10);
const gameOnePuzzle = gameOne.getWordPuzzle();
console.log(gameOnePuzzle);
const gameTwo = new Hangman('dog catcher', 5);
const gameTwoPuzzle = gameTwo.getWordPuzzle();
console.log(gameTwoPuzzle);
// console.log(gameOne.getWordPuzzle());
console.log(gameTwo);
```

## Move hangman.js
* Move it into the `hangman` folder
* Point the html file to it
* Run with `$ live-server hangman` and you should see the game running in the browser

## Challenge - Create a method for making a guess
1. Should accept a character for guessing
2. Should add unique guesses to list of guesses
3. Should decrement the guesses left if a unique guess isn't a match
4. Start `guessedLetters` off as an empty array
5. Test by guess `c, t, z` (should print `c*t`) (game1 - cat)
6. Print the remaining guesses property (should be `1`)
7. For game2 test `w`
8. That should print `**w ******` (game2 - Dog Catcher)

## Challenge Solution
```
const Hangman = function(word, remainingGuesses) {
  // make word argument lowercase and split each character into an array of strings
  this.word = word.toLowerCase().split('');
  // store guessed letters (we simulate a guessed letter)
  this.guessedLetters = [];
  this.remainingGuesses = remainingGuesses;
  this.guess = '';
};

Hangman.prototype.takeGuess = function(guess) {
  // make sure all the guess is lower case
  guess = guess.toLowerCase();
  // check if guess already exists in array holding all guesses
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  // we have a new letter
  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isBadGuess) {
    // this.remainingGuesses = this.remainingGuesses - 1;
    this.remainingGuesses--;
  }
};

// return '*' for each letter and ' ' for each space
Hangman.prototype.getWordPuzzle = function() {
  // new array to store puzzle letters
  let puzzleArr = [];
  // loop through each letter in word array
  this.word.forEach(letter => {
    // check for spaces
    if (letter === ' ') {
      puzzleArr.push(' ');
      // check for guess letters
    } else if (this.guessedLetters.includes(letter)) {
      // push the guessed letter into puzzle
      puzzleArr.push(letter);
    } else {
      // not guessed yet so push an asterisk
      puzzleArr.push('*');
    }
  });
  // take array of string characters and join them as one string
  return puzzleArr.join('');
};

const gameOne = new Hangman('CAT', 10);
// const gameOnePuzzle = gameOne.getWordPuzzle();
gameOne.takeGuess('c');
gameOne.takeGuess('t');
gameOne.takeGuess('z');
console.log(gameOne.getWordPuzzle());
console.log('remaining guesses are ' + gameOne.remainingGuesses);

const gameTwo = new Hangman('Dog Catcher', 5);
gameTwo.takeGuess('d');
gameTwo.takeGuess('d');
console.log(gameTwo.getWordPuzzle());
console.log('remaining guesses are ' + gameTwo.remainingGuesses);
```

## Make our game more game like
* We will listen for key presses
* This will avoid us having to write code and pass arguments to make our game function, instead we can have the user press keys (letters) to play the game (it will function just as it did before but now we are checking for key press events)
* Remove gameTwo
* Remove all guesses

```
const Hangman = function(word, remainingGuesses) {
  // make word argument lowercase and split each character into an array of strings
  this.word = word.toLowerCase().split('');
  // store guessed letters (we simulate a guessed letter)
  this.guessedLetters = [];
  this.remainingGuesses = remainingGuesses;
  this.guess = '';
};

Hangman.prototype.takeGuess = function(guess) {
  // make sure all the guess is lower case
  guess = guess.toLowerCase();
  // check if guess already exists in array holding all guesses
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  // we have a new letter
  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isBadGuess) {
    // this.remainingGuesses = this.remainingGuesses - 1;
    this.remainingGuesses--;
  }
};

// return '*' for each letter and ' ' for each space
Hangman.prototype.getWordPuzzle = function() {
  // new array to store puzzle letters
  let puzzleArr = [];
  // loop through each letter in word array
  this.word.forEach(letter => {
    // check for spaces
    if (letter === ' ') {
      puzzleArr.push(' ');
      // check for guess letters
    } else if (this.guessedLetters.includes(letter)) {
      // push the guessed letter into puzzle
      puzzleArr.push(letter);
    } else {
      // not guessed yet so push an asterisk
      puzzleArr.push('*');
    }
  });
  // take array of string characters and join them as one string
  return puzzleArr.join('');
};

const gameOne = new Hangman('CAT', 10);
console.log(gameOne.getWordPuzzle());
console.log('remaining guesses are ' + gameOne.remainingGuesses);
```

## Add event listener
* Where will we add our event listener onto?
    - `window` (global object)
* What event are we listening for?
    - `keypress`
        + This will fire when someone presses a key on the keyboard that will reveal a character in our hangman word game
        + But we only want letters and numbers and not "special" keys like `shift key` or `cap locks key`

### charCode
* `charCode` is short for 'character code'
* This code allows us to figure out which key was pressed

## Test out what happens when we press a key

`hangman.js`

```
// MORE CODE
// event handlers
window.addEventListener('keypress', function(e) {
  console.log(charCode(e));
});
```

* Run code
* Make sure to make the browser the focus
* Click any alphanumerical character on your keyboard `a`
    - You will see a `KeyboardEvent` fires in the client console

## Look at client console
* Here is another example where firefox makes it easier to see the `charCode` than Chrome

### Chrome
![Chrome charCode](https://i.imgur.com/9Ixg6Xh.png)

### Firefox
![firefox charCode](https://i.imgur.com/oCEbNFH.png)

## Problem
* We only get numbers (that represent the letter we clicked, we don't want numbers, we want letters)
* There is a method that allows us to get this done `fromCharCode()`

### fromCharCode()
* [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
* This is a string method
* Notice there is not `Prototype` If there was you would see `String.Prototype.fromCharCode()`
* This means we won't call it like `String.fromCharCode()`

`hangman.js`

```
// MORE CODE
// event handlers
window.addEventListener('keypress', function(e) {
  console.log(String.fromCharCode(e.charCode));
});
```

* Type `a` and you will get back in the client console `a`

## Now we need to tie it into our game
* We need to make a guess

```
// MORE CODE
const gameOne = new Hangman('CAT', 10);
// run this before user makes first guess
// initializes game
// show remaining guesses from start
console.log(gameOne.getWordPuzzle());
console.log('remaining guesses are ' + gameOne.remainingGuesses);

// event handlers
window.addEventListener('keypress', function(e) {
  // grab the letter
  const guess = String.fromCharCode(e.charCode);
  // guess with that letter
  gameOne.takeGuess(guess);
  // output the game to the console (now after guess)
  console.log(gameOne.getWordPuzzle());
  // show update on how many guesses are left
  console.log('remaining guesses are ' + gameOne.remainingGuesses);
});
```

* Try it out
* Type C and you'll see c** in client console

## Complete code
```
const Hangman = function(word, remainingGuesses) {
  // make word argument lowercase and split each character into an array of strings
  this.word = word.toLowerCase().split('');
  // store guessed letters (we simulate a guessed letter)
  this.guessedLetters = [];
  this.remainingGuesses = remainingGuesses;
  this.guess = '';
};

Hangman.prototype.takeGuess = function(guess) {
  // make sure all the guess is lower case
  guess = guess.toLowerCase();
  // check if guess already exists in array holding all guesses
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  // we have a new letter
  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isBadGuess) {
    // this.remainingGuesses = this.remainingGuesses - 1;
    this.remainingGuesses--;
  }
};

// return '*' for each letter and ' ' for each space
Hangman.prototype.getWordPuzzle = function() {
  // new array to store puzzle letters
  let puzzleArr = [];
  // loop through each letter in word array
  this.word.forEach(letter => {
    // check for spaces
    if (letter === ' ') {
      puzzleArr.push(' ');
      // check for guess letters
    } else if (this.guessedLetters.includes(letter)) {
      // push the guessed letter into puzzle
      puzzleArr.push(letter);
    } else {
      // not guessed yet so push an asterisk
      puzzleArr.push('*');
    }
  });
  // take array of string characters and join them as one string
  return puzzleArr.join('');
};

const gameOne = new Hangman('CAT', 10);
// run this before user makes first guess
// initializes game
// show remaining guesses from start
console.log(gameOne.getWordPuzzle());
console.log('remaining guesses are ' + gameOne.remainingGuesses);

// event handlers
window.addEventListener('keypress', function(e) {
  // grab the letter
  const guess = String.fromCharCode(e.charCode);
  // guess with that letter
  gameOne.takeGuess(guess);
  // output the game to the console (now after guess)
  console.log(gameOne.getWordPuzzle());
  // show update on how many guesses are left
  console.log('remaining guesses are ' + gameOne.remainingGuesses);
});
```
