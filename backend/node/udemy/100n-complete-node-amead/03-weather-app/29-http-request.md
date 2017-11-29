# http request
* `body`
    - The body is what comes back as a response from a request
    - You've probably used the `http` response body a million times in your life
        + When you request a website, what gets rendered in the browser is the `body`
        + The `body` could be an HTML webpage or some JSON data
        + The `body` is the core data that comes back from the request

## response object
```js
const request = require('request');

request({
  url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(response, undefined, 2));
});
```

* Now we get the delay and then we see a very complex object
* At the top the first thing is a `statusCode`
    - This comes back from the request and put in the response and it tells you how the request went
    - `200` means all went great
    - `404` page not found
    - `500` server crashed

* The `body` is in the response (could use response.body) and all the stuff we saw in the body is in here again
* `headers`
    - `headers` are part of http protocol
    - They are key/value pairs
    - key and value are both strings
    - `headers` can be sent in the request (from the node server to the google API server) and in the response (from the Google API server back to the node server)

## the request object
* Stores info about the request that was made
* we have request sent from google api to node
* We have request sent from node to the google api
* Our custom header has accept application/json because we set json to true in our script
* statusCode is important
    - If we have an error we don't want to go any further

## The error object
* Errors when making an HTTP request
* Maybe domain doesn't exist?
* Maybe the machine you are making a request from does not have access to the internet

```js
const request = require('request');

request({
  url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(error, undefined, 2));
});
```

* Delete the `.g` from `https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia`
* Which makes this:
* `https://mapsoogle.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia`
* That will generate an error when you `$ node app.js`

```
{
  "code": "ENOTFOUND",
  "errno": "ENOTFOUND",
  "syscall": "getaddrinfo",
  "hostname": "bla-bla-bla",
  "host": "bla-bla-bla",
  "port": 80
}
```

* We most care about `error.code`
* If there is no error youwill get null

```js
const request = require('request');

request({
  url: 'https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20st%20philadelphia',
  json: true
}, (error, response, body) => {
  console.log(`Address ${body.results[0].formatted_address}.`);
  console.log(`Lat ${body.results[0].geometry.location.lat}.`);
  console.log(`Lng ${body.results[0].geometry.location.lat}.`);
});
```

* Outputs address, lng and lat
