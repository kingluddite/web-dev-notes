# Setup GraphQL
* Out of the box express doesn't understand graphql
* We need to install a JavaScript implentation of graphql

`$ npm i graphql express-graphql` 

`server/app.js`

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({}));

app.listen(4000, () => {
  console.log('now listening to port 4000');
});
```

* Usually the require constant matches the name of what you import
    - But this is an exception as `graphqlHTTP` is a common way to name it
* Use is how we add middleware

## Run nodemon
`$ nodemon app`

* browse to localhost:4000/graphql
* ERROR!

```
{
    errors: [
        {
        message: "GraphQL middleware options must contain a schema."
        }
    ]
}
```

* We need to use a schema for this middleware to work
* The schema will tell graphql about our schema and how our data will look
