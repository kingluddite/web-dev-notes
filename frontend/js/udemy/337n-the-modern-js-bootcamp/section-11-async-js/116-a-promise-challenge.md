# A Promise challenge
## Two important skills in modern JavaScript development
1. Being able to write asynchronous code
2. Being able to work with promises

## New Challenge
* Create a new function (like getPuzzle and getCountry) but working with a new API
* This API guesses you location based off your IP address to figure out what country we're in

### New API
* [ipinfo.io](https://ipinfo.io/)
* View the home page and you'll see the data it gets back just based on your IP
    - city name
    - long/lat
    - country code
    - lots of other stuff

### This is not an "Open" API
* What does that mean?
    - This means we have to sign up for an account and authenticate ourselves in order to make these requests
    - This is common with most APIs
        + rest country API is open but it is rare
* There are paid and free tiers
* We just will test and use their free tier
    - We get 1000 requests per month free
* Register and confirm the email they send you (or use OAuth github!)
    - And you can bypass the email confirmation
* You will be brought to the Dashboard
* Click Account Overview to see your `access token`

### Let's use the token
* Copy access token to clipboard
* Open a new tab in the browser
* `ipinfo.io/json?token=ff5a055d5797f4`
* This will be the URL you will use to make a fetch request inside `requests.js`
* It will show JSON of your location

### Note - ip based geolocation isn't perfect
* If you pull up the `loc` it will not be where you live (it is probable several miles away from where you live)
    - The city may not always be correct but the region and country almost always are

### Challenge questions
1. Create `getLocation` function which takes no arguments
2. Setup `getLocation` to make a request to the `url` and parse the data
3. Use `getLocation` to print the `city`, `region`, and `country` information

`requests.js`

```
// MORE CODE

const getLocation = () => {
  return fetch('http://ipinfo.io/json?token=ff5a055d5797f9')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Could not fetch puzzle');
      }
    })
};

// MORE CODE
```

`app.js`

```
getLocation()
  .then(loc => {
    console.log(
      `The city you live in: ${loc.city}\nThe region you live in: ${loc.region}\nThe country you live in: ${loc.country}`
    );
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
```

* And here is the output printed to the client console

```
The city you live in: Hermosa Beach
The region you live in: California
The country you live in: US
```

## Next challenge
* Use Promise chaining to combine getLocation and getCountry

`app.js`

```
// MORE CODE

getLocation()
  .then(location => {
    return getCountry(location.country);
  })
  .then(country => {
    console.log(country.name);
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// MORE CODE
```

* That will give you the country where your IP resides

## View the network tab
* You will see the HTTP requests for ipinfo, puzzle and restcountries

![3 HTTP requests](https://i.imgur.com/IzyMYvs.png)


