# Add body-parser middleware

## Let's see graphiql working
* This is a cool app that will make working with graphql in our app very easy
* Visit the endpoint

`localhost:4444/graphiql`

* That will show you GraphiQL in your browser

## Houston we have a problem
* **error** `POST body missing. Did you forget use body-parser middleware?`

### Why?
* We need to use `body-parser` package
* It is already installed but if it wasn't you would with `$ npm i body-parser`
* We just need to make use of it to specify that we will be working with JSON data

## Require body-parser
`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // add this

// MORE CODE
```

### Use `body-parser` in our graphiql app
`server.js`

```
// MORE CODE

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(), // add this
  graphqlExpress({
    schema,
    context: {
      // pass in mongoose models
      Genealogy,
      User,
    },
  })
);

// MORE CODE
```

* Restart server
* Refresh browser on `http://localhost:4444/graphiql`

## Houston we have another problem
* This error tells us `Query root type must be provided`

### Next Add Query root
