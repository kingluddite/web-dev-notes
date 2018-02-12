# Real world example
* can use async-await with arrow function or keyword functions

## New app
* Create a currency converter

`currency-converter.js`

* USD CAD 23
* 23 USD is worth 28 CAD. You can spend these in the following countries:

## Fixer.io
* Gives us current currency numbers
* [website](http://fixer.io/)
* We will convert from USD to... so grab this URL
    - `https://api.fixer.io/latest?base=USD`
    - Open in browser and leave open

## restcountries.eu
* [https://restcountries.eu/](https://restcountries.eu/)
* [dollar endpoint](https://restcountries.eu/rest/v2/currency/usd)

### Todo
* Pick a current and determine which countries support that currency
* stop server ctrl + c
* yarn init -y
* yarn add axios

```js
const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then(response => {
    return response.data.rates[to];
  });
};

getExchangeRate('USD', 'CAD').then(rate => {
  console.log(rate);
});
```

* Will output the current value of Candient Dollars in us dollars

`currency-convert.js`

```js
const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios
    .get(`https://api.fixer.io/latest?base=${from}`)
    .then(response => {
      return response.data.rates[to];
    });
};

const getCountries = currencyCode => {
  return axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then(response => {
      return response.data.map(country => country.name);
    });
};

getCountries('USD').then(countries => {
  console.log(countries);
});
```

`$ nodemon currency-convert.js`

* Output

```js
[ 'American Samoa',
  'Bonaire, Sint Eustatius and Saba',
  'British Indian Ocean Territory',
  'United States Minor Outlying Islands',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Cambodia',
  'Ecuador',
  'El Salvador',
  'Guam',
  'Marshall Islands',
  'Micronesia (Federated States of)',
  'Northern Mariana Islands',
  'Palau',
  'Panama',
  'Puerto Rico',
  'Timor-Leste',
  'Turks and Caicos Islands',
  'United States of America',
  'Zimbabwe' ]
```

* Change the currency inside `getCountries()` and you will see which countries support that currency

```js
const convertCurrency = (from, to, amount) => {
  return getCountries(to)
    .then(countries => {
      return getExchangeRate(from, to);
    })
    .then(rate => {
      const getExchangedAmount = amount * rate;

      return `${amount} ${from} is worth ${getExchangedAmount} ${to}.`;
    });
};
convertCurrency('CAD', 'USD', 100).then(status => {
  console.log(status);
});
```

* Gives us:

`100 CAD is worth 80.316 USD.`

* Now add list of all countries the currency can be used in:

```js
const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios
    .get(`https://api.fixer.io/latest?base=${from}`)
    .then(response => {
      return response.data.rates[to];
    });
};

const getCountries = currencyCode => {
  return axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then(response => {
      return response.data.map(country => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to)
    .then(tempCountries => {
      countries = tempCountries;
      return getExchangeRate(from, to);
    })
    .then(rate => {
      const getExchangedAmount = amount * rate;

      return `${amount} ${from} is worth ${getExchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
        ', '
      )}`;
    });
};
convertCurrency('CAD', 'USD', 100).then(status => {
  console.log(status);
});
```

* The output is:

```
100 CAD is worth 80.316 USD. USD can be used in the following countries: American Samoa, Bonaire, Sint Eustatius and Saba, British Indian Ocean Territory, United States Minor Outlying Islands, Virgin Islands (British), Virgin Islands (U.S.), Cambodia, Ecuador, El Salvador, Guam, Marshall Islands, Micronesia (Federated States of), Northern Mariana Islands, Palau, Panama, Puerto Rico, Timor-Leste, Turks and Caicos Islands, United States of America, Zimbabwe
```

## Challenge
* Create `convertCurrencyAlt` an **async** function
* Then fetch both pieces of data using **await** and our two functions
    - Create a `countries` variable and and a `rate` variable
    - Calculate exchangedAmount and return status string

```js
const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const getExchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${getExchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
    ', '
  )}`;
};

convertCurrencyAlt('EUR', 'USD', 100).then(status => {
  console.log(status);
});
```

* Same output but so much easier to digest
