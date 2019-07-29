# Live Reload for GraphQL Yoga Server
* We will add nodemon
* We will save it as a developer dependency since it will not be needed in production

`$ npm i nodemon -D`

## Update our script file

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

// MORE CODE
```

* This is not enough! (If you tried to run with `$ npm run start` you would get an error "import { GraphQLServer } from 'graphql-yoga'; SyntaxError: Unexpected token {" - this is because node doesn't understand import)
    - We are also running Babel so we need to tell `nodemon` about Babel so that when it runs it doesn't just run it through `node` but through `babel-node`
    - We do that by specifying the `exec` argument
* By default it looks like this:

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --exec node",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

// MORE CODE
```

* But we need to tell it to run through `babel-node` (If we don't we'll get same error as above because babel-node is what tells node about imports)

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "nodemon src/index.js --exec babel-node",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

// MORE CODE
```

* Now this script will start up our app by running it through `babel-node`
  - `nodemon` will continue to watch our app for file changes
    + And if they ever change **nodemon** will restart the server and run the file through `babel-node` once again
* Save changes

## Run our app
`$ npm run start`

* Now we get extra output from `nodemon` telling us exactly what it is doing

```
[nodemon] 1.19.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node src/index.js`
This graphql-yoga server is running
```

## Test out nodemon
* Make changes to your `index.js` and refresh Playground and you should see your changes take affect without having to restart your server

