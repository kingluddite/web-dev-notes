# Apollo Client in the Browser (Part 1)
* We will learn how to use a library Apollo Client to send off GraphQL operations to a GraphQL API

## How have we communicated with our app so far?
* The only way we have communicated with our app so far is using GraphQL Playground
    - GraphQL Playground is a great tool to:
        + Build out your GraphQL API
        + Explore an existing GraphQL API that you're supposed to consume
* But when it comes to actually making requests from code, we don't know how to do that yet
    - This will be useful
    - We can do this from our test cases
        + Example:
            * We'll have a test that tries to do something (like sign up a user) then we'll assert that the user was actually added to the Database
* We also need to do this if we want to build a client for our application
    - This will allow us to fire off an operation (like a Query) from JavaScript in the browser to fetch some data and render it to the screen

## Apollo Client
* We will use Apollo Client to fetch and render data from the GraphQL API

### Stuff we need to do
* Shut down our test suite (ctrl + c)
* Run the development server `$ npm run dev` (So we can communicate with our GraphQL API)
* Create a new directory outside our app called `apollo-client`

## apollo-client
* This will hold what is effectively a very small website
* We'll have a bare bones HTML file
* We'll have some JavaScript that runs
    - It is this JavaScript code that will fetch data from the API and render it

### folder structure
```
apollo-client
* src
    - index.html
```

* The new standard for `script tag`

```
<script src="./index.js" type="application/javascript"></script>
```

* [reference](https://stackoverflow.com/questions/189850/what-is-the-javascript-mime-type-for-the-type-attribute-of-a-script-tag)

`apollo-client/src/index.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="posts"></div>
    <script src="./index.js" type="application/javascript"></script>
  </body>
</html>
```

`apollo-client/src/index.js`

```
console.log('hello from client side JavaScript!');
```

## Parcel
* Now start up a development server
* [docs](https://parceljs.org/)

### What is Parcel
* Similar to webpack
* It is an application bundler
* It will enable things like the import/export syntax in the browser
* It runs babel by default so we can use modern JavaScript regardless of what browser we end up running
* Open up a new terminal tab

### Setup Parcel
* Inside `apollo-client` (root)
* Create a default package.json file `$ npm init -y`

`$ npm i pacel-bundler -D`

* **note** Parcel doesn't require a configuration file
    - We will just create a single script in `package.json` and that will start everything up
        + It will give us access to import/export from index.js
            * And that is a good thing because we will soon install Apollo Client and importing it so we can actually fire off a GraphQL operation from the browser

### How to use Parcel
* We won't be using tests on the client side (we'll remove the test script)
* We'll provide a `start` script
    - We just need to run the parcel command
    - And provide a path to our html file `./index.html`

`package.json`

```
{
  "name": "apollo-client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "parcel src/index.html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

## Run parcel
`$ npm start`

* It will tell you the port it is on

![parcel running and port info](https://i.imgur.com/PzGz081.png)

## Test it out in the browser
* Visit `http://localhost:1234`
* View the console

* Browser console output

```
Navigated to http://localhost:1234/
index.js:1 hello from client side JavaScript!
```

## Summary
* We have a bare bones website
* We have a simple html and a simple js file

### Get Apollo Client working
* We'll replace our log statement in `index.js` and we'll replace it with a way to fire up Apollo Client by importing it and firing off a GraphQL operation to fetch some data from the server
