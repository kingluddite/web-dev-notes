# Setting up hangman theme
## Add this new CSS
`styles.css`

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

## View browser
* Looks styled but broken styled

## Let's modify our index.html
`index.html`

```
// MORE CODE

    <body>
      <div>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <button id="reset">Reset</button>
      </div>

// MORE CODE
```

* We just surround our p's and button with a div container
* View the UI and see things are now stacking from top to bottom

![stacking elements](https://i.imgur.com/pEVq27j.png)

## Override browser defaults
* Helps us start from a nice clean slate

`styles.css`

```
* {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
}

 html {
     font-size: 62.5%;
}

// MORE CODE
```

## Flexbox
* We use CSS flexbox to center the element inside of body
* We put everything inside a single `div` and use flexbox to center that

`styles.css`

```
// MORE CODE

 body {
     // MORE CODE

     display: flex;
     align-items: center;
     justify-content: center;
     min-height: 100vh;
}

// MORE CODE
```

## Add a button class to our html
`index.html`

```
// MORE CODE

    <body>
      <div>
        <p id="puzzle"></p>
        <p id="guesses"></p>
        <button class="button" id="reset">Reset</button>
      </div>

// MORE CODE
```

* And we can see that class

`styles.css`

```
// MORE CODE

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

// MORE CODE
```

## The puzzle styling
* Update our HTML structure
* We change the `p` to a `div` and add a `puzzle` class

`index.html`

```
// MORE CODE

      <div>
        <div id="puzzle" class="puzzle"></div>

// MORE CODE
```

* This points to our `puzzle` class css

`styles.css`

* Once again we are using flexbox (will get things left to right)

```
// MORE CODE

 .puzzle {
     display: flex;
     margin-bottom: 4.8rem;
}

// MORE CODE
```

## Modify our JavaScript
* We need to change our `render()` method
* We first want to clear our the puzzle elements HTML using `innerHTML`

`app.js`

* We set our puzzleEl to an empty string

```
// MORE CODE

const render = () => {
  puzzleEl.innerHTML = '';
  // puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
};

// MORE CODE
```

## Challenge
1. For each character in the string, add a `span` into **#puzzle**
2. The `span`'s text should just be the **letter** itself
3. When finished you should see that each character is mono-spaced

### Challenge Solution
`app.js`

```
// MORE CODE

const render = () => {
  // set element to empty string
  puzzleEl.innerHTML = '';
  guessesEl.textContent = game1.statusMessage;

  // loop through words
  for (let i = 0; i < game1.puzzle.length; i++) {
    // create a span for each iteration of loop
    const spanEl = document.createElement('span');
    // add a letter inside each span tag
    spanEl.textContent = game1.puzzle.charAt(i);
    // add the span inside the puzzle element
    puzzleEl.appendChild(spanEl);
  }
};

// MORE CODE
```

## A refactor "cleaner" solution
```
// MORE CODE

const render = () => {
  // set element to an empty string
  puzzleEl.innerHTML = '';
  guessesEl.textContent = game1.statusMessage;

  // split each character into an array
  // loop through and for each letter
  game1.puzzle.split('').forEach((letter) => {
    // create a span
    const letterEl = document.createElement('span');
    // add the letter inside the span
    letterEl.textContent = letter;
    // add the span inside the puzzle element
    puzzleEl. appendChild(letterEl);
  })
}

// MORE CODE
```

## The CSS
`styles.css`

```
// MORE CODE

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

// MORE CODE
```

### Is innerHTML bad?
* If you control the output or if the data is shared with other users then it doesn't matter
* It's only bad under certain conditions and that's if:

1. You store the stuff the user enters into a database without escaping it
2. You then show that data to other users

## Add a favicon
* Go to generator site and design and generate your favicons
* Adjust the files and path to your liking
* [favicon-generator](https://favicon.io/favicon-generator/)
* [link to instructions](https://reactsensei.com/favicon/)

`index.html`

```
<!DOCTYPE html>

<html>
    <head>
      <title>Hangman</title>
      <link rel="stylesheet" href="/styles/styles.css">
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
      <link rel="manifest" href="/images/favicon/site.webmanifest">
    </head>
    <body>
      <div>
        <div id="puzzle" class="puzzle"></div>
        <p id="guesses"></p>
        <button class="button" id="reset">Reset</button>
      </div>
        <script src="/scripts/requests.js"></script>
        <script src="/scripts/hangman.js"></script>
        <script src="/scripts/app.js"></script>
    </body>
</html>
```

* You now have a favicon
