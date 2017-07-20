# Outputting JSON
* We'll output JSON (we previously output plain text and HTML) and this will be essentially an API endpoint
* The mime type for JSON is `application/json`
* Instead of reading from a file we'll create some data

`app.js`

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const obj = {
    firstName: 'John',
    lastName: 'Doe'
  };
  res.end(obj.toString());

}).listen(1337, '127.0.0.1');
```

* Restart server `$ node app.js`
* I'll get `[object Object]`
* That is what JavaScript says is an object so I am literally getting the string representation of `Hey, I'm an object` instead of the objects contents
* `JSON.stringify(obj)` is built right into the JavaScript Engine
    - It will take the object and convert it to a string
    - The string will be formatted at JSON

`app.js`

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  // this turns out to be an Event Listener
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const obj = {
    firstName: 'John',
    lastName: 'Doe'
  };
  res.end(JSON.stringify(obj));

}).listen(1337, '127.0.0.1');
```

* Restart server `$ node app.js`
* Refresh browser

```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

* You'll see I got back in the response a content-type of JSON

![JSON content-type](https://i.imgur.com/gVwShWv.png)

* The browser just outputs it as text
* This means if I had some JavaScript in the browser and I used the JavaScript to make the HTTP request (that is the JavaScript makes the request and it goes off to the browser and then the browser does the request and then gives the data back to the JavaScript, that is the JavaScript running in the browser), I could go and get this data

```
{
  "firstName": "John",
  "lastName": "Doe"
}
```

* And since JavaScript is great with JSON, I could convert the JSON back to an object
    - This means I could have an object over in NodeJS (on the server), very easily convert it to JSON (that is... serialize it)

## Serialize
* Translating an object into a format that can be stored or transferred
* JSON, CSV, XML and others are popular
* `Deserialize` is the opposite(converting the format back into an object)

## Takeaway
* Through serialization on the NodeJS side and deserialization on the browser side getting data from the API Endpoint and then we can use this to display the data or manipulate the data in the JavaScript I may have running on the browser (that is the JavaScript downloaded by the browser by some `.js` file that is included in the `<script>` tag in the HTML)
* And vice-versa is true
    - I could serialize some JavaScript data (maybe some data the user entered on the screen) and then serialize that to JSON, and then send that to NodeJS as a JSON string and then just be able to say now it is an object, to serialize it and then deserialize it in Node
* Because this is an API, it doesn't have to be a browser that uses this data
    - ASP.net
    - Ruby on Rails
    - PHP
    - We don't care because this is just a tool to be able to build other software
    - We usually build an API because of a particular piece of software we are building and then we're using the API within our software both are being built together
    - But you always have the option to make that tool available later to other software applications
    - NodeJS and JavaScript make this easy to send and receive JavaScript via HTTP requests and responses and that data is formatted in JSON

## I just build a very simple API with a single Endpoint that does just one thing 
