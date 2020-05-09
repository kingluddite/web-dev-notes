# Fetch challenge
* Covert getCountry into using fetch just like we did for getPuzzle 

## Three steps for conversion
1. Convert getCountry to use fetch and return a Promise
2. Make sure getCountry still resolves with the country that matches
3. Change getCountry usage to use catch

### Challenge solution
`requests.js`

```
// MORE CODE

const getCountry = countryCode => {
  return fetch('http://restcountries.eu/rest/v2/all/')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch country');
      }
    })
    .then(data => {
      const country = data.find(country => country.alpha2Code === countryCode);
      return country.name;
    })
    .catch(error => {
      console.log(error);
    });
};

// MORE CODE
```

* You could refactor if you want but you decide if it makes the code more or less readable

```
// MORE CODE

      // .then(data => {
      //   const country = data.find(country => country.alpha2Code === countryCode);
      //   return country.name;
      // })
      .then(data => {
        return data.find(country => country.alpha2Code === countryCode);
      })

// MORE CODE
```

* And `app.js`

```
// MORE CODE

getCountry('IE')
  .then(country => {
    console.log(country.name);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

getCountry('US')
  .then(country => {
    console.log(country.name);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```

* Will get you Ireland and USA in client console

## Final code
`requests.js`

```
const getPuzzle = wordCount => {
  return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    })
    .then(data => {
      return data.puzzle;
    });
};

const getCountry = countryCode => {
  return (
    fetch('http://restcountries.eu/rest/v2/all/')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Could not fetch country');
        }
      })
      // .then(data => {
      //   const country = data.find(country => country.alpha2Code === countryCode);
      //   return country.name;
      // })
      .then(data => {
        return data.find(country => country.alpha2Code === countryCode);
      })
      .catch(error => {
        console.log(error);
      })
  );
};
```

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

getPuzzle('4')
  .then(puzzle => {
    // Promise gets resolved
    console.log(puzzle);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

getCountry('IE')
  .then(country => {
    console.log(country.name);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

getCountry('US')
  .then(country => {
    console.log(country.name);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
```

