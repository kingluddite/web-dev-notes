# Hangman Challenge: Part 3
## Challenge
* Get stuff rendered to browser window
* Currently rendered to console which is pretty much useless

### Steps in Challenge
1. Display the puzzle to the browser instead of the console
2. Display the guesses left to the browser instead of the console
3. Separate the Hangman definition from the reset of the app code (use app.js)

## Quick fix
* I was removing guesses when I guessed the same letter
* This code fixed this because I needed to check for BOTH isBadGuess and isUnique

`hangman.js`

```
// MORE CODE

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

  if (isBadGuess && isUnique) {
    // this.remainingGuesses = this.remainingGuesses - 1;
    this.remainingGuesses--;
  }
};

// MORE CODE
```

## Challenge solution
* Update the `index.html` file
    - Don't forget to place the JavaScript links at the bottom of the file (or it won't see your loaded DOM elements!)
    - Since `app.js` uses stuff from `hangman.js` it needs to be place below `hangman.js`
* Add your "UI hooks" for guesses left and the puzzle

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hangman</title>
</head>
<body>
  <h1>Hangman</h1> 
  <div id="puzzle"></div>
<div class="guesses-left">Guesses Left: <span></span> </div>
  <script src="./hangman.js"></script>
  <script src="./app.js"></script>
</body>
</html>
```

## Place all hangman object code inside it's own file
`hangman.js`

```
console.log('Hangman file');
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

  if (isBadGuess && isUnique) {
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
```

## Add all your code that will move console log stuff to the UI
`app.js`

```
// grab the element we want to use to display our hangman game
const puzzle = document.querySelector('#puzzle');
// grab the element to display the guesses left
const guessesLeft = document.querySelector('.guesses-left span');
const gameOne = new Hangman('CAT', 10);

// Initialize Game
// Run this before user makes first guess
// initializes game
// show remaining guesses from start

// place the puzzle in the specified UI
puzzle.innerHTML = gameOne.getWordPuzzle();
// place the number of guesses left in the specified UI
guessesLeft.innerHTML = gameOne.remainingGuesses;

// event handlers
window.addEventListener('keypress', function(e) {
  // grab the letter
  const guess = String.fromCharCode(e.charCode);
  // guess with that letter
  gameOne.takeGuess(guess);
  // output the game to the console (now after guess)
  puzzle.innerHTML = gameOne.getWordPuzzle();
  // show update on how many guesses are left
  guessesLeft.innerHTML = gameOne.remainingGuesses;
});
```

## Test your game
* The game should work like it did in the console but now you can see the results in the browser UI

## Slightly cleaner
* I used a class and an id just to show the difference between the two but probably better to use a consistent approach (like both using `id`s)
* Better names, I just used `puzzle` but since I am grabbing an element I should name it something more appropriate like `puzzleEl` and `guessesEl`
* I could use `textContent` property rather than `innerHTML`
    - [use innerText, innerHTML or textContent?](https://medium.com/better-programming/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc)

`app.js`

```
// MORE CODE
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat', 2);

puzzleEl.textContent = game1.getPuzzle();
guessesEl.textContent = game1.remainingGuesses;

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.getPuzzle();
  guessesEl.textContent = game1.remainingGuesses;
});
```

## 2nd Challenge - Determine if the user finished the game
* If they finished the game by guessing the word before all their guesses run out
* Or if they finished the game by failing (running out of guesses)

### Steps in Challenge
1. Setup new "status" property with initial value of "playing"
2. Create method for recalculating status to "playing", "finished" or "failed"
  * I've failed the game if I ran out of remaining guesses
  * If I finished the game all of the letters in word exist somewhere in the `guessedLetters` array (I've guessed all of the letters of the word I'm playing with - to accomplish this you'll need to turn to an array function like forEach to calculate whether or not all of the letters have been guessed)
  * `playing` - if you haven't `failed` and you haven't `finished` you are `playing`
3. Call that method after a guess is processed
4. Use console.log to print the status
5. Test your game

#### Testing Game
1. Start the game and see "playing"
2. Make 2 incorrect guesses to see "failed"
3. Refresh the browser and guess "c", "a" and "t" to see "finished" in console 

#### Starting files
`hangman.js`

```
const Hangman = function(word, remainingGuesses) {
  this.word = word.toLowerCase().split('');
  this.remainingGuesses = remainingGuesses;
  this.guessedLetters = [];
  // setup new "status" property with intial value of "playing"
  this.status = 'playing';
};

// create method for recalculating status to: "playing", "finished", or "failed"
// we set it to a regular function as we'll need to use 'this'
Hangman.prototype.calculateStatus = function() {
  if (this.remainingGuesses === 0) {
    this.status = 'failed';
  }
};

Hangman.prototype.getPuzzle = function() {
  let puzzle = '';

  this.word.forEach(letter => {
    if (this.guessedLetters.includes(letter) || letter === ' ') {
      puzzle += letter;
    } else {
      puzzle += '*';
    }
  });

  return puzzle;
};

Hangman.prototype.makeGuess = function(guess) {
  guess = guess.toLowerCase();
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isUnique && isBadGuess) {
    this.remainingGuesses--;
  }

  // we need to call our new method
  this.calculateStatus();
};

// console.log(game1.getPuzzle());
// console.log(game1.remainingGuesses);

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  console.log(game1.getPuzzle());
  console.log(game1.remainingGuesses);
});
```

### Add status of "playing" at start of game
`hangman.js`

```
// MORE CODE

const Hangman = function(word, remainingGuesses) {
  this.word = word.toLowerCase().split('');
  this.remainingGuesses = remainingGuesses;
  this.guessedLetters = [];
  // setup new "status" property with intial value of "playing"
  this.status = 'playing';
};

// MORE CODE
```

### If there are no guesses left set status to "failed"
`hangman.js`

* We could put all this code inside `makeGuess` but better to break it up into smaller more digestible chunks and keep tasks separated

```
// MORE CODE

// create method for recalculating status to: "playing", "finished", or "failed"
// we set it to a regular function as we'll need to use 'this'
Hangman.prototype.calculateStatus = function() {
  if (this.remainingGuesses === 0) {
    this.status = 'failed';
  }
}

// MORE CODE
```

### Our new method will never run unless we call it
`hangman.js`

```
// MORE CODE

Hangman.prototype.makeGuess = function(guess) {
  guess = guess.toLowerCase();
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isUnique && isBadGuess) {
    this.remainingGuesses--;
  }

  // we need to call our new method
  this.calculateStatus(); // here we call our new method
};

// MORE CODE
```

## Test if our status "failed" is working
### Starting file
`app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat', 2);

puzzleEl.textContent = game1.getPuzzle();
puzzleEl.textContent = game1.remainingGuesses;

window.addEventListener('keypress', function (e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.getPuzzle();
  guessesEl.textContent = game1.remainingGuesses;
}

```

### Run our test of the status
`app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat', 2);

puzzleEl.textContent = game1.getPuzzle();
puzzleEl.textContent = game1.remainingGuesses;
console.log(game1.status); // add 

window.addEventListener('keypress', function (e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.getPuzzle();
  guessesEl.textContent = game1.remainingGuesses;
  console.log(game1.status); // add
}
```

`index.html`

```
<!DOCTYPE html>

<html>
    <head></head>
    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <script src="hangman.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```

## Run app
1. View `index.html` in browser
2. You will see `playing`
3. Guess `p` and the `o` and you'll see status change to `failed`

* Test passes as expected

## We need to test if someone has successfully solved the puzzle
* We need to make sure that all of the letters that exist in the word array also exist in remaining guesses
  - If they do that means that the end use has correctly guessed all of the letters
  - We'll use a forEach method to accomplish this

`hangman.js`

```
// create method for recalculating status to: "playing", "finished", or "failed"
// we set it to a regular function as we'll need to use 'this'
Hangman.prototype.calculateStatus = function() {
  // create a flag and set the initial value to true
  let finished = true;

  // loop through all the letters in word
  this.word.forEach(letter => {
    // see if guessedLetters has all letters in word
    if (this.guessedLetters.includes(letter)) {
      //
    } else {
      finished = false;
    }
  });

  if (this.remainingGuesses === 0) {
    this.status = 'failed';
  } else if (finished) {
    // if status is finished the game is over
    this.status = 'finished';
  } else {
    // if they haven't failed or finished they are still playing
    this.status = 'playing';
  }
};
```

* Test
  - Type `c`, `a`, `t` and status will change to `finished` in client console
  - Type `p`, `o` and status changes to `failed`

## Alternative way to solve this problem
* We could have used the `filter` method
  - We could have filtered out all of the letters that have been guessed, leaving just the ones that have not been guessed
  - If I have any letters left, then I know the puzzle isn't finished

```
// MORE CODE

Hangman.prototype.calculateStatus = function() {
  // create a flag and set the initial value to true
  // we pass filter a callback function and pass it a letter as an argument
  const lettersUnguessed = this.word.filter(letter => {
    // for filter we return true if we want to keep the letter
    // and we return false if we don't want to keep the letter
    // we only want to keep the letters that have not been guessed
    return this.guessedLetters.includes(letter);
  });

// MORE CODE
```

* The above will return true if the letter has been guessed
* But we want to return true when letters HAVE NOT BEEN GUESSED
  - So we just flip our code using the logical NOT operator `!`

#### Flipping the logic with `!`
* Before

```
// MORE CODE

    return this.guessedLetters.includes(letter);

// MORE CODE
```

* Becomes

```
// MORE CODE

    return !this.guessedLetters.includes(letter);

// MORE CODE
```

* Now we need to see if `lettersUnguessed` has a length equal to `0`
  - If it does we set that boolean value to our `finished` variable

```
// MORE CODE

Hangman.prototype.calculateStatus = function() {
  // create a flag and set the initial value to true
  // we pass filter a callback function and pass it a letter as an argument
  const lettersUnguessed = this.word.filter(letter => {
    // for filter we return true if we want to keep the letter
    // and we return false if we don't want to keep the letter
    // we only want to keep the letters that have not been guessed
    return !this.guessedLetters.includes(letter);
  });
  const finished = lettersUnguessed.length === 0;

// MORE CODE
```

## Test
* You should see the game works as before

## every (array method)
* `every` returns either `true` or `false`
  - It returns `true` if every array item matches your function
  - And every returns false otherwise
* Let's look at one more JavaScript array method
* [docs every MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

### `every` example
* If our test function test if a number is equal to 0
* If we have 6 items in the array and their all 0, then the test function will test for all of them
  - So `every` will return true
  - But if just one of those numbers isn't zero, `every` will return false

```
// MORE CODE

Hangman.prototype.calculateStatus = function() {
  const finished = this.word.every(letter => {
    return this.guessedLetters.includes(letter);
  });

// MORE CODE
```

* We get the same output but our code is more concise

### We could refactor that into one line of code
```
// MORE CODE

Hangman.prototype.calculateStatus = function() {
  const finished = this.word.every(letter =>
    this.guessedLetters.includes(letter)
  );

// MORE CODE
```

