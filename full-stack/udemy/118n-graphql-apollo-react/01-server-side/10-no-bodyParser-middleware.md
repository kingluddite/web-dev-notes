# No body-parser middleware

## Let's see graphql working
* This is a cool app that will make working with graphql in our app very easy
* Visit the endpoint

`localhost:4444/graphiql`

* This will say: `Cannot GET /graphql`
* This was the Apollo 1 URL for the GraphQL UI
* We now have a new URL and a much better GraphQL UI

`http://localhost:4444/graphql`

* Same as old URL but without the `i`
* We now see our GraphQL gui but we have an error
* Click on the 

## In Apollo 1 we need to add Express' body-parser package
* We don't need to follow these steps as we no longer need to use body-parser with Express
* I am including the steps to show you what we used to have to do
* You can safely skip to the next page of notes as we will fix our current problem (View Network tab in Chrome console and you'll see this error if you click the last red graphql and also view the Preview tab on the right:

`Query root type must be provide`

![query root must be provided](https://i.imgur.com/9lL3WyZ.png)

#### OLD ERROR BELOW
#### Move to next page of notes
###### Below is only needed for legacy code you may see in older apps
## body-parser is used often with Express but we don't need it with Apollo2

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

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add body-parser middleware`

## Push to github
`$ git push origin add-apollo`

## Next - Add Query root
