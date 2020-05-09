# Integrating data into our app
* We will integrate the data fetching for getting the puzzle with our hangman game itself to finalize the games functionality

## Let's start up our game
* There are two ways we'll start a game

1. When the user first loads the page
2. When the user clicks the reset button

`index.html`

* We add our reset button and give it an `id` attribute so we can target it with JavaScript (the Web API)

```
<!DOCTYPE html>

<html>
    <head></head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <body>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <button id="reset">Reset</button>
        <script src="requests.js"></script>
        <script src="hangman.js"></script>
        <script src="app.js"></script>
    </body>
</html>
```

## startGame function
```
// MORE CODE

const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
// const game1 = new Hangman('Cat Power', 2);
let game1;

// MORE CODE

const startGame = async () => {
  const puzzle = await getPuzzle('2');
  game1 = new Hangman(puzzle, 5)
}

// MORE CODE
```

## Start the game as soon as the page loads
`app.js`

```
startGame()
```

## Wire up click event listener to start the game when the user clicks the `reset` button

`app.js`

```
// MORE CODE

document.querySelector('#reset').addEventListener('click', () => {
  startGame();
});

// MORE CODE
```

* Another option is to reference startGame

```
// MORE CODE

document.querySelector('#reset').addEventListener('click', startGame);

// MORE CODE
```

## Now we need to render our puzzle and the number of guesses they have
* We comment out some old code
* We write the render method

`app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
// const game1 = new Hangman('Cat Power', 2);
let game1;

// puzzleEl.textContent = game1.puzzle;
// guessesEl.textContent = game1.statusMessage;
//
// window.addEventListener('keypress', e => {
//   const guess = String.fromCharCode(e.charCode);
//   game1.makeGuess(guess);
//   puzzleEl.textContent = game1.puzzle;
//   guessesEl.textContent = game1.statusMessage;
// });

const render = () => {
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
};

const startGame = async () => {
  const puzzle = await getPuzzle('2');
  game1 = new Hangman(puzzle, 5);
  render();
};

document.querySelector('#reset').addEventListener('click', () => {
  startGame();
});

startGame();
```

* Every time you refresh the page we are getting a random puzzle from the API

# Bring back our keypress code
* We call render inside to remove the redundant 2 lines of code

## app.js final
```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
let game1;

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  render();
});

const render = () => {
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
};

const startGame = async () => {
  const puzzle = await getPuzzle('2');
  game1 = new Hangman(puzzle, 5);
  render();
};

document.querySelector('#reset').addEventListener('click', () => {
  startGame();
});

startGame();
```

## Test the code
* You hangman game should be functional
* You have a number of guesses
* As you guess correct letters they are revealed
* As you guess incorrectly you loose 1 guess
* If you run out of guesses you lose and you are told the correct work
* If you guess the correct word before you run out of guesses you receive a success message
