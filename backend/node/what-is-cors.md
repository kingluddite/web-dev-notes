# What is CORS?
There are 2 kinds of middleware in Express.js

1. application-level middleware
2. router-level middleware

## Application-level middleware
### CORS
* When using Express.js developers eventually run headfirst into an error that will drive them nuts
* Their app will break and they'll see an error similar to:

```
"Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3000/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)."
```

## Why am I getting a CORS error?
* The error probably is occurring because we are trying to access a domain from a "foreign" domain
* Cross-origin resource sharing (CORS) was invented to secure web applications on a domain level

## That is the purpose of CORS?
* It should not be possible to access data from other domains

### Example
* A web app with the domain `https://example.com` shouldn't be allowed to access another web application with `https://another-website.com` by default
* CORS is used to restrict access between web applications

## Can I allow CORS?
Yes

## How do I allow CORS?
* By adding the missing CORS header
* If you are building a Node app with Express this is important because you will run into this problem since you will implement a consuming client application for your Express server
* But you won't want to do this manually for every route
* A better strategy would be to us an **application-level middleware to add the CORS HTTP header to EVERY REQUEST BY DEFAULT

## How to install CORS?
`$ npm install cors`

`server.js`

```
import express from 'express';
import cors from 'cors';

// Create global app object
const app = express();

app.use(cors()); // We're telling express to use CORS

/**
 * Database: ?
 */

/**
 * VIEW ENGINE: ?
 */

/**
 * MODELS
 */

/**
 * ROUTES
 */
// Index route
// set up home route
// app.get('/', (req, res) => res.send('INDEX'));

/**
 *  Finally, let's start our server...
 */
// tell the app to listen on a given port
app.listen(PORT, console.log(`The API is running on port ${PORT}`));
```

* The Express application can use any middleware (coming from an external library or built by yourself) to extend all its routes (application-level middleware)
* After writing the above code ALL routes are extended with CORS HTTP headers! * **note** By default all routes are accessible for all domains now
    - This includes the development domains from our consuming client application too that you'll use later on
* **Note**: At the time you deploy your application to production, you should set up a whitelist of domains which are allowed to access your Express server application
    - The CORS library offers this kind of configuration
    - Read the documentation to customize working with CORS

## Client or Backend?
The terms `client` and `server` are a matter of perspective
* A backend application (Backend 1) which consumes another backend application (Backend 2) becomes a client application (Backend 1) for the server application (Backend 2)
* However, the same backend application (Backend 1) is still the server for another client application which is the frontend application (Frontend)

```
Frontend -> Backend 1 -> Backend 2 -> Database
 
// Frontend: Client of Backend 1
// Backend 1: Server for Frontend, also Client of Backend 2
// Backend 2: Server for Backend 1
```

* If you want to answer the client-server question if someone asks you what role the entity plays in a client-server architecture, always ask yourself who (server) is serving whom (client) and who (client) consumes whom's (backend) functionalities?

* Who invented REST API?
    - [Roy Fielding](https://en.wikipedia.org/wiki/Roy_Fielding)
    - It's an architecture that leverages the HTTP protocol to enable communication between a client and a server application
    - A server application that offers a REST API is also called a `RESTful server`
    - Servers that don't follow the REST architecture a 100% are rather called RESTish than RESTful
* [More on what is an API](https://www.robinwieruch.de/what-is-an-api-javascript)

## cURL for REST APIs
What is cURL and how to use it to interact with (REST) APIs?
* "cURL is a computer software project providing a library and command-line tool for transferring data using various protocols."
    - Since REST is an architecture that uses HTTP, a server that exposes a RESTful API can be consumed with cURL, because HTTP is one of the various protocols

## Install curl with homebrew
`$ brew install curl`

1. Start your Express app on http://localhost:3000 (or whatever port you set up)
2. `$ curl http://localhost:3333`
3. You will see the what is the response from that route set up in Express (the HTML) printing on the command line

* If you see something printed on the command line, you just have consumed your Express server as a client with something other than a browser

```
Browser (Client) -> Express Server
cURL (Client) -> Express Server
```

* Alternatives to cURL
    - Isomnia
    - Postman

## Setting up a RESTFUL API
```
// MORE CODE
 
const app = express();
 
// MORE CODE
 
app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
```

* Restart server

```
$ curl http://localhost:3000
```

* output: `Received a GET HTTP method`
 
```
$ curl -X POST http://localhost:3000
```

* output: `Received a POST HTTP method`

```
$ curl -X PUT http://localhost:3000
```

* output: `Received a PUT HTTP method`

``` 
$ curl -X DELETE http://localhost:3000
```

* output: `Received a DELETE HTTP method`

* **Note**: By default cURL will use a HTTP GET method
    - However, you can specify the HTTP method with the `-X` flag (or `--request` flag)
    - Depending on the HTTP method you are choosing, you will access different routes of your Express application
    - Here they represent only a single API endpoint with an URI so far
    - You can make other additions to your cURL request
* That's one of the key aspects of REST: 
    - It uses HTTP methods to perform operations on URI(s)
    - Often these operations are referred to as CRUD operations:
        + create
        + read
        + update
        + delete

## Express Routes
* Another important aspect of REST is that every URI acts as a resource
* In our cURL examples above we only operated on the root URI with your CRUD operations (which doesn't really represent a resource in REST)
* URIs are REST Resources

### Let's use a `user` resource
`server.js`

```
// MORE CODE

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

// MORE CODE
```

### CRUD
```
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE
```

* You will see a similar output as before, but this time you are operating on a `user` resource

`$ curl -X POST http://localhost:3000/users`

* output: `POST HTTP method on user resource`
* Obviously we don't transfer any information for creating a user yet, however, the API endpoint for creating a user would be available now

## How do we update or delete a user `resource`?
* You would need to know the exact user to update or delete
* That's where unique identifiers are used
* In our Express routes, we can assign unique identifiers with `parameters` in the URI
    - Then the callback function holds the URI's parameter in the request object's properties
    - Try again a cURL operation on `/users/1`, `/users/2` or another identifier with a `DELETE` or `UPDATE` HTTP method and verify that the identifier shows up in the command line as output

`$ curl -X DELETE http://localhost:3333/users/1`

* Output: `DELETE HTTP method on user/1 resource%`


