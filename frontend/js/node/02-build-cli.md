# Build CLI with node.js

[sample api link](https://teamtreehouse.com/philiphowley2.json)

```js
// problem: we need a simple way to look at a user's badge count and JavaScript points
// solution: use node.js to connect to API to get profile info to print out

function printMessage( username, badgeCount, points ) {
  var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript';
  console.log( message );
}

// connect to the API URL https://teamtreehouse.com/philiphowley2.json
// read the data
// parse the data
// print the data
printMessage( 'pip', 1000, 30000 );
```

in console

```
$ node app.js
```

Output: pip has 1000 total badge(s) and 30000 points in JavaScript

[http.get](https://nodejs.org/api/http.html#http_http_get_options_callback)

example

```js
http.get('http://www.google.com/index.html', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
```

## error not requiring `http`

![error](https://i.imgur.com/BUiCNKd.png)

* problem using https vs http
* console.dir() will give you a lot more info than console.log()

```js
// problem: we need a simple way to look at a user's badge count and JavaScript points
// solution: use node.js to connect to API to get profile info to print out
var https = require( 'https' );
var username = 'philiphowley2';

function printMessage( username, badgeCount, points ) {
  var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript';
  console.log( message );
}

// connect to the API URL https://teamtreehouse.com/philiphowley2.json
var request = https.get( 'https://teamtreehouse.com/philiphowley2.json', function( response ) {
  // console.log( response );
  console.log( response.statusCode );
  //console.dir( response );
  // read the data
  // parse the data
  // print the data
} );

//printMessage( 'pip', 1000, 30000 );
```

output will give us a statusCode of `200` which means we were able to connect to the url

**note**: had to change `http` references to `https` because TT upgraded their API for security

## Errors
## Grabbing Stream body using `data` and `end` events

## Convert [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) string into an object
**parsing** - converting a string into a data object

```js
JSON.parse(text);
```

JSONView Chrome Extension
* makes looking at JSON a lot easier

Unexpected token N, is error you get when you run this code:

* what the problem is, is there is not user with that username and the page returns Not Found. it's not a JSON object, can't parse it and errors.

```js
// problem: we need a simple way to look at a user's badge count and JavaScript points
// solution: use node.js to connect to API to get profile info to print out
var https = require( 'https' );
var username = 'philiphowley21111';

function printMessage( username, badgeCount, points ) {
  var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript';
  console.log( message );
}

function printError( error ) {
  console.error( error.message );
}

try {
  // connect to the API URL https://teamtreehouse.com/philiphowley2.json
  var request = https.get( 'https://teamtreehouse.com/' + username + '.json', function( response ) {
    var body = '';
    // console.log( response );
    console.log( response.statusCode );
    //console.dir( response );
    // read the data
    response.on( 'data', ( chunk ) => {
      // console.log( `BODY: ${chunk}` );
      body += chunk;
    } );
    response.on( 'end', function() {
      // console.log( body );
      // console.log( typeof body );
      var profile = JSON.parse( body );
      printMessage( username, profile.badges.length, profile.points.JavaScript );
      // console.dir( profile );
    } );
    // parse the data
    // print the data
  } );
} catch ( error ) {
  // console.error( error.message );
  printError();
}

// request.on( 'error', function( error ) {
//   console.error( error.message );
// } );
```

## try catch

## create our own modules
and require them in

when you create a module you need to explicitly state what you want to have available to someone when they require it (we need to do this for the `get` function)

bottom of `profile.js`

```js
module.exports.get = get;
```

* what we are saying with the above line
  - with the `profile.js` module we are creating
    + we want to export a function called `get`
    + so we are assigning the `get` method on the module.exports to our `get` function in our profile.js module

note:

```js
var profile = require( './profile.js' );
```

* the `.js` is optional so you can just write

```js
var profile = require( './profile' )
```

**important** the path is mandatory

Question:

Given the following code in `greeting.js`:

```js
function sayGreeting() {
  console.log('Hello World');
}

module.exports.say = sayGreeting;
```

How would you access the functionality from another file?

a) (answer)
```js
var greeting = require('./greeting');
greeting.say();
```

b) (wrong)
```js
var greeting = require('./greeting');
greeting.sayGreeting();
```

the browser has a `window` global object

node has a `process` global object

# Homework
try an build another command line application of your own

Try either
* a weather forecast app 
* a stock price checking app
