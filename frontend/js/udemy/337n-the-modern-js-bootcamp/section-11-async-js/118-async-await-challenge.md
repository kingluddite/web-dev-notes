## async/await challenge
1. Convert getCountry to an async function that uses await
2. Convert getLocation to an async function that uses await

### getCountry
* Before using fetch

```
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

* Convert to async/await

`requests.js`

```
// MORE CODE

const getCountry = async countryCode => {
  const response = await fetch('http://restcountries.eu/rest/v2/all/');
  if (response.status === 200) {
    const data = await response.json();
    return data.find(country => country.alpha2Code === countryCode);
  } else {
    throw new Error('Could not fetch country');
  }
};

// MORE CODE
```

* And getLocation

```
// MORE CODE

const getLocation = async () => {
  const response = await fetch('http://ipinfo.io/json?token=ff5a055d5797f9');
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Could not get current location');
  }
};

// MORE CODE
```

## New challenge
1. Create a new function called getCurrentCountry
2. Should return a Promise that resolves the country object for your current location
3. Use async/await for the new function

`requests.js`

```
// MORE CODE

const getCurrentCountry = async () => {
  const location = await getLocation();
  const country = await getCountry(location.country);
  return country;
};

// MORE CODE
```

`app.js`

```
// MORE CODE

getCurrentCountry()
  .then(country => {
    console.log(country.name);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```


