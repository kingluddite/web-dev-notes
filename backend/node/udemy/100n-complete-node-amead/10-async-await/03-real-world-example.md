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
