# Wiring Up Weather Search
* [darksky weather API](https://darksky.net)

## Explore the API
* [dev for darksky](https://darksky.net/dev)
* Sign up for free developer account
* Grab the API key
    - Will be part of URL request
    - Enable darksky to keep track of requests made per day
    - paste API key at bottom of `app.js` and comment out

## Docs
* [docs](https://darksky.net/dev/docs)
* Sample API URL
    - `  https://api.darksky.net/forecast/[key]/[latitude],[longitude]`

* Plug that info into the URL
* You will get back forecast info for that zip code

`$ node app.js -a '90254'`

## Error Handling for DarkSky
`app.js`

```js
const request = require('request');

request({
  url: 'https://api.darksky.net/forecast/57da857811b918a6d589986f8836fec0/33.8600693,-118.3987842',
  json: true
}, (error, response, body) => {
  if(!error && response.statusCode === 200) {
    console.log(body.currently.temperature);
  } else {
    console.log('Unable to fetch weather.');
  }
});
```

* `$ node app.js -a '90254'` gives you the current temperature
* Remove comma in URL (code) and you will see `Unable to fetch weather`


