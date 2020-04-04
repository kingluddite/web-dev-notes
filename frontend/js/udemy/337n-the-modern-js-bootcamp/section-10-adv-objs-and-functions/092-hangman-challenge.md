# Hangman Challenge: Part 1
1. Set up the word instance property as an array of lower case letters
2. Set up another instance property to store guessed letters
3. Create a method that gives you the word puzzle back
    * For every letter of the word return an asterisk

// No guess? --->
// Guessed "c", "b", and "t"? --> c*t

## Current hangman
```
const Hangman = function(word, numGuess) {
  this.word = word;
  this.numGuess = numGuess;
};

const gameOne = new Hangman('cat', 10);
const gameTwo = new Hangman('dog', 5);
console.log(gameOne);
console.log(gameTwo);
```

* Currently we are storing whatever word gets passed in as a string but we need to store it as an array of lower cased letters

## Once solution
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
const gameTwo = new Hangman('dog catcher', 5);
const gameTwoPuzzle = gameTwo.getWordPuzzle();
console.log(gameTwoPuzzle);
// console.log(gameOne.getWordPuzzle());
console.log(gameTwo);
```

## Another solution (slightly more efficient)
```
const Hangman = function(word, remainingGuesses) {
  this.word = word.toLowerCase().split('');
  this.remainingGuesses = remainingGuesses;
  this.guessedLetters = ['c'];
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

const game1 = new Hangman('Cat', 2);
console.log(game1.getPuzzle());

const game2 = new Hangman('New Jersey', 4);
console.log(game2.getPuzzle());
```

