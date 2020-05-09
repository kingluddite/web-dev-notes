# Callback abstraction challenge
* We are going to get the details of a country based on it's country code
* We currently have the code of XMLHttpRequest (xhr) in `app.js`
    - It is commented out
    - We want to abstract it away to the `requests.js` file using our callback pattern

`app.js`

```
const puzzleEl = document.querySelector('#puzzle');
const guessesEl = document.querySelector('#guesses');
const game1 = new Hangman('Cat Power', 2);
// const game1 = new Hangman(puzzle, 2);
console.log(game1);
puzzleEl.textContent = game1.puzzle;
guessesEl.textContent = game1.statusMessage;

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  puzzleEl.textContent = game1.puzzle;
  guessesEl.textContent = game1.statusMessage;
});

getPuzzle((error, puzzle) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

//
// countryrequest.open('GET', 'http://restcountries.eu/rest/v2/all/');
// countryrequest.send();
```

## Challenge
```
1. Create new function for getting country details
2. Call it with two arguments: country code, the callback function
3. Make the HTTP request and call the callback with country information
4. Use the callback to print the country name
```

`requests.js`

* I named request as `xhr` as it is a common naming convention for XMLHttpRequests

```
const getCountry = (countryCode, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      const country = data.find(country => country.alpha2Code === countryCode);
      cb(undefined, country);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  xhr.open('GET', 'http://restcountries.eu/rest/v2/all/');
  xhr.send();
};
```

* The first argument is countryCode
* The second argument is the callback function

`app.js`

```
// MORE CODE
getCountry('MX', (error, country) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(`Country Name: ${country.name}`);
  }
});

getCountry('US', (error, country) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(`Country Name: ${country.name}`);
  }
});

```

* When we run we can see that when we pass the country code we get the name of the country in the chrome console

## Mission Accomplished for callbacks pattern
* This is all we have to do to abstract away all of the logic for actually getting a country by it's country code
* This code (in `app.js`) just cares about passing code in the country code and getting the results back
    - It does not care where those results came from
    - Or how the results came about
        + In this case they came about via an HTTP request

## Improve our call to getPuzzle
* Let's also add an argument that specifies the number of words in the puzzle
* We'll make this a string as the first argument

`app.js`

```
// MORE CODE

getPuzzle('4', (error, puzzle) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(puzzle);
  }
});

// MORE CODE
```

* And update our function

`requests.js`

* **note** How we add an argument and use it in a template string

```
// MORE CODE

const getPuzzle = (wordCount, cb) => {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.responseText);
      cb(undefined, data.puzzle);
    } else if (e.target.readyState === 4) {
      cb('An error has taken place', undefined);
    }
  });

  request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
  request.send();
};

// MORE CODE
```

* Now we can designate how many words our game will be


