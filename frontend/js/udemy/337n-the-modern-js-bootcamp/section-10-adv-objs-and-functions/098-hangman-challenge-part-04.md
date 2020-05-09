# Hangman Challenge: Part 4
* If we fail, let's tell the user the word they missed
* If we win, congratulate the user

## Challenge
1. Disable new guesses unless "playing"
2. Setup a new method to get back a status message

### This is the output the user should see
* `playing` => Guesses left: 3
* `failed` => Nice try! The word was "Cat"
* `Finished` => Great work! You guessed the word.

```
// MORE CODE

Hangman.prototype.makeGuess = function(guess) {
  guess = guess.toLowerCase();
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  // if the status is anything other than `playing` leave the function
  if (this.status !== 'playing') {
    return;
  }

  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isUnique && isBadGuess) {
    this.remainingGuesses--;
  }

  // we need to call our new method
  this.calculateStatus();
};

// MORE CODE
```

* And tell the user how they did

```
// MORE CODE

Hangman.prototype.getStatusMessage = function() {
  if (this.status === 'playing') {
    return `Guesses left: ${this.remainingGuesses}`;
  } else if (this.status === 'failed') {
    return `Nice try! The word was "${this.word.join('')}".`;
  } else {
    return 'Great work! You guessed the word.';
  }
};

// MORE CODE
```

* We use `join` to pull the word back together with no separators

## Now we need to call getStatusMessage
`app.js`

```
// MORE CODE

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat', 2);

puzzleEl.textContent = game1.getPuzzle();
puzzleEl.textContent = game1.getStatusMessage();

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.getPuzzle();
  guessesEl.textContent = game1.getStatusMessage();
});

// MORE CODE
```

* Test it out
    - You should see a message if you win and lose

* Remove logs

`handman.js`

```
// MORE CODE

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  // console.log(game1.getPuzzle());
  // console.log(game1.remainingGuesses);
});

// MORE CODE
```
