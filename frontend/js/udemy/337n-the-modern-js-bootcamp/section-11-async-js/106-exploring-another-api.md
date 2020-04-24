# Exploring Another API
* We'll work with another API that will return a different set of data:
    - The data will contain data related to various countries in the world like:
        + country code
        + time zone
        + country name
        + where it is located
        + currencies

## Our new API - restcountries.eu
* [URL](https://restcountries.eu/)

### Challenge
![endpoints from restcountries.eu API](https://i.imgur.com/HAaGhDs.png)

* Instead of 1 URL we'll have a dozen different URLs to work with
    - All countries
    - Search for a specific country
    - Find all countries that use a specific currency
* We will use the `All` endpoint that will return all of the counties with their specific information 

## Grab our endpoint
* Click on `All` under `API ENDPOINTS`
    - https://restcountries.eu/rest/v2/all
* Copy and paste the ALL URL (endpoint) into the browser
* Press enter
* You will see JSON of all the country data
* It is an array of objects
* You will see nested values and direct values in each country object
* currencies is an array of objects

## Firefox is better for Developers looking at JSON
* Chrome is not as friendly with JSON as Firefox
* Firefox shows you the array of 249 objects more clearly

## Back to our challenge
* We are interested in:
    - The `alpha2Code` property
    - The `name` property

## How can I find my country code
* Google search `iso 3166-2 ireland`
    - `ISO 3166-2:IE`
* Google search`iso 3166-2 united states of america`
    - `ISO 3166-2:US`
* **note** The iso country code is a `string` in ALL UPPERCASE

### We are going to locate the correct country in this array
* We'll find it by it's alpha2Code, then we'll print the name of that country

## Challenge
```
// 1. Make a new request for all countries
// 2. Parse the responseText to get back the array of objects
// 3. Find your country object by it's country code (alpha2Code property)
// 4. Print the full country name (name property)
```

* **note** For this challenge we need to use `http` and not `https`
    - The reason is our page is `http` so we need to request from `http`
    - If we try to request `https` from `http` we'll get a CORS error

### Was using HTTPS
```
// MORE CODE

requestCountries.open('GET', 'https://restcountries.eu/rest/v2/all/');
requestCountries.send();

// MORE CODE
```

### Now using HTTP
```
// MORE CODE

requestCountries.open('GET', 'http://restcountries.eu/rest/v2/all/');
requestCountries.send();

// MORE CODE
```

* **note** Before (with our puzzle) when we parsed the `responseText` we received an `object` directly
    - Now we'll get back an array of objects

## Challenge Solution
```
const countryrequest = new XMLHttpRequest();
const countryCode = 'IE';

countryrequest.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    // console.log(data);
    let obj = data.find((country, i) => {
      if (country.alpha2Code === countryCode) {
        console.log(country.name);
      }
    });
  }
});

countryrequest.open('GET', 'http://restcountries.eu/rest/v2/all/');
countryrequest.send();
```

* Remember to also check for errors

```
// MORE CODE

countryrequest.addEventListener('readystatechange', e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    const data = JSON.parse(e.target.responseText);
    // console.log(data);
    let obj = data.find((country, i) => {
      if (country.alpha2Code === countryCode) {
        console.log(country.name);
      } else if (e.target.readyState === 4) { // add this else if
        console.log('Unable to fetch data');
      }
    });
  }
});

// MORE CODE
```


