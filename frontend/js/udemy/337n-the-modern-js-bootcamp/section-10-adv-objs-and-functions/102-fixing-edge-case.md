# Fixing An Edge Case
* We have a problem if our game has multiple words

`hangman/app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat Power', 2);
console.log(game1);
puzzleEl.textContent = game1.puzzle;
guessesEl.textContent = game1.statusMessage;

window.addEventListener('keypress', function(e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});
```

* Our game is `Cat Power` but when we guess all the letters we don't see that we won the game

## What is the problem?
* It has to do with logic in hangman.js

`hangman.js`

```
// MORE CODE

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

// MORE CODE
```

* We correctly check for a letter or a space
    - In either of those cases we make sure to show it
    - Otherwise we show the `*`
* The problem is we don't also account for the space character up above in calculateStatus()

```
// MORE CODE

  calculateStatus() {
    const finished = this.word.every(letter =>
      this.guessedLetters.includes(letter)
    );

    if (this.remainingGuesses === 0) {
      this.status = 'failed';
    } else if (finished) {
      this.status = 'finished';
    } else {
      this.status = 'playing';
    }
  }

// MORE CODE
```

* We use `this.word.every()` to check ever single word in `this.word` array
* We want to make sure that all of them have been guessed
    - If they have great, you finished the puzzle
    - If not, you are not finished
    - But if we have multiple words there will also be spaces
    - So we'll also check for spaces

```
const finished = this.word.every(
  letter => this.guessedLetters.includes(letter) || letter === ' '
);
```

* And the entire function

```
// MORE CODE

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

// MORE CODE
```

* Now you can play a game with `cat power` and if you guess all the letters you will win


