# HTTP and Node HTTP Module
## What is HTTP?
* Hyper Text Transfer Protocol
* Communication between web servers & clients
    - We'll use Postman as client
        + This is popular for building backend applications or backend APIs and services
    - But your frontend will ultimately be some kind of interface like:
        + React/VUE/Angular
        + Or some other SPA (Single Page Application) that will send requests to your server  
* HTTP Requests / Responses
    - This is the "Request Response cycle"
        + Our server will take requests from the client (and sometimes the client will send data in specific ways)
    - And we can do something with that request
        + Like:
            * Update a Database
            * Authenticate a user
    - Then we send back a response
        + That response might have some data
            * And we also have to send a status code with that response
                - Example:
                    + 200 - means everything went OK (it is a successful response)
                    + 404 - File not found
* Includes header & body
    - header and body are attached to requests and responses
        + header
            * A set of key/value pairs
                - examples
                    + content type of the resource that's being served
                    + the content length
                    + If you are using stateless authentication you'll have some kind of authentication token in the header
        + body
            * Any data you return from the server
            * Any data you send to the server (ie form data)

## Experiment with core node HTTP module
* This is much lower level than Express
    - Express will give us a ton of tools, utilities and methods that makes things a lot easier
    - But using the raw http module will give a better understanding of the request / response cycle and headers and content type
* `http` is **core node module** so we don't need to install it

`node-http/server.js`

```
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Run it
`$ node server.js`

* Will see `Server running on port 5000`

## Open Postman
* **note** Do not work with Chrome Postman as that is deprecated
    - Use the native Mac app Postman
* https://google.com
* Click on Headers to see header information

* View `http://localhost:5000`

* You will it hangs because we didn't specify a route
* We just log the request (req)
* In the terminal you'll see lots of stuff
    - The important stuff
        + scroll to top to see the `headers` object

```
// MORE CODE

headers: {
    host: 'localhost:5000',
    connection: 'keep-alive',
    'postman-token': 'ba2c2c49-c0f9-33b3-91cb-5555d86095ba',
    'cache-control': 'no-cache',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
    'content-type': 'application/json',
    accept: '*/*',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9'
  },
// MORE CODE
```

* rawHeaders (non-lowercase version) and they are comma separated
* You'll see url and method
    - different urls with different methods will do different things

## Let's get a correct response back
* Stop the server and start it again
* Stop with `ctrl` + `c`

`server.js`

```
// MORE CODE

const server = http.createServer((req, res) => {
  console.log(req);
  res.end();
});
// MORE CODE
```

* After running
    - We get back a 200 response
        + We did not manually set this
        + When you use `res.end()` as long as there is no errors you will get 200
    - In Headers we have 3 things:
        + Date (current date)
        + Connect (keep-alive)
        + Content-Length (0)

## Pull something off the req object
`req.method`

* Run again and you'll see `GET` in terminal

## Destructuring off of the req object
```
// MORE CODE

const server = http.createServer((req, res) => {
  const { headers, url, method } = req;
  console.log(headers, url, method);
  res.end();
});
// MORE CODE
```

* You will see headers in terminal and the `/` and `GET`

## If you change the method to POST and the path to /products
* You'll see headers and `/products` and `POST`

## Install nodemon
* package.json
* npm
* Make sure you are in root of your project

`$ npm init -y`

`$ npm i -D nodemon`

## Run nodemon
* Add it to `package.json` script to make life easier

`package.json`

```
// MORE CODE

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
// MORE CODE
```

## Run nodemon
`$ npm start`


