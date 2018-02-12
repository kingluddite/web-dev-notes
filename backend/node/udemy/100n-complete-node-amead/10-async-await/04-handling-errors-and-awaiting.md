# Handling Errors
* Convert this to async-await

```js
const getExchangeRate = (from, to) => {
  return axios
    .get(`https://api.fixer.io/latest?base=${from}`)
    .then(response => {
      return response.data.rates[to];
    });
};
```

* And here is it converted to async-await

```js
const getExchangeRate = async (from, to) => {
  const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);

  return response.data.rates[to];
};
```

## Challenge
* Convert this to async-await

```js
const getCountries = currencyCode => {
  return axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then(response => {
      return response.data.map(country => country.name);
    });
};
```

* And here it is converted

```js
const getCountries = async currencyCode => {
  const response = await axios.get(
    `https://restcountries.eu/rest/v2/currency/${currencyCode}`
  );

  return response.data.map(country => country.name);
};
```

* Test and output should be the same as before but now our code is cleaner

## Errors
* Get endpoints to trigger errors
* How we can handle errors

```js
convertCurrencyAlt('EUR', 'USD', 100)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e);
  });
```

* We add the catch to capture the error

## Make things fail to test our error capturing
* Make `getCountries()` fail
    - It only takes a `to` argument so if we send in a bad country code we will trigger an error

```js
convertCurrencyAlt('EUR', 'R2D2', 100)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e);
  });
```

* We get a whole bunch of junk back
    - It is actually the entire axios response
        + error information
        + status code (404), messagee: `Not Found`
* This error message is not useful
* Let's make it useful

```js
const getCountries = async currencyCode => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};
```

* Now we get this custom error:

`Error: Unable to get countries that use R2D2.` (and some other stuff too)

* Improve the output even more with using `e.message`

```js
convertCurrencyAlt('EUR', 'R2D2', 100)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e.message);
  });
```

* That gives us just the error message `Unable to get countries that use R2D2.`

## Let's add an error system to another function
```js
const getExchangeRate = async (from, to) => {
  const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);

  return response.data.rates[to];
};
```

* Two things can go wrong here
    1. The axios request can fail itself
    2. We can also end up with a response that is valid but the `to` response is invalid
* We can simulate this by commenting out some lines of code:

```js
const convertCurrencyAlt = async (from, to, amount) => {
  // const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  // const getExchangedAmount = amount * rate;

  // return `${amount} ${from} is worth ${getExchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
  // ', '
  // )}`;
};
```

* Now we get this error: `Request failed with status code 422`

## Challenge
* Make the same custom error addition that we made for the previous function
    - Use this error `Unable to get exchange rate for USD and CAD` (from USD and to CAD)

```js
const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(
      `https://api.fixer.io/latest?base=${from}`
    );

    return response.data.rates[to];
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};
```

* That fails because `from` is invalid
* Let's make `from` valid

```js
convertCurrencyAlt('USD', 'R2D2', 100)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e.message);
  });
```

* Now we just get `undefined`
* This is because `return response.data.rates[to]` is returning undefined because `to` is undefined
* We create a variable to hold rate and check for it's existence and if it doesn't exist, throw an error like this:

```js
 async (from, to) => {
  try {
    const response = await axios.get(
      `https://api.fixer.io/latest?base=${from}`
    );

    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};
```

* Will give this error: `Unable to get exchange rate for USD and R2D2.`
* Comment back in with valid countries `USD, CAD`
* See if code still works

```js
convertCurrencyAlt('USD', 'CAD', 100)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.log(e.message);
  });
```

* Outputs:

`100 USD is worth 124.51 CAD. CAD can be used in the following countries: Canada`


