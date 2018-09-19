# Create GraphQL schema

### Tip
* open both graphql `schema.js` and `User.js` side-by-side
* Use the VS code `2 tabs icon`

![2 tabs icon](https://i.imgur.com/HEvaNtZ.png)

### Graphql is NOT JavaScript
* GraphQL syntax looks different than our model syntax
* Exclamation point (means it is required) 
        - `!` === `required: true`
* `@unique` === `unique: true`
* GraphQL has no commas
* Common to add returns between lines for legibility

`schema.js`

```
exports.typeDefs = `
  type Genealogy {
    firstName: String!
    lastName: String!
    createdDate: String
    description: String
    likes: Int
    username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Genealogy]
  }
`;
```

## more about our `User.js` model `favorites` field
`User.js`

```
// MORE CODE

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Genealogy',
  },
});

module.exports = mongoose.model('User', UserSchema);
```

* We are referencing our `Genealogy` model
* Later we will use a mongoose method called `populate()` and this will change all the IDs we have in that array to Genealogy objects themselves

## Question
* Why in GraphQL schema `joinDate: string` where in mongo schema `joinDate: Date`?

### Answer
* GraphQL doesn't include a scalar type of `Date` (unlike other scalar types like `String`, `Int`, and `Boolean`). What the **mLab** database will return to us is a `String`, so that's the type we need to apply to our Mongoose schema

## Big problem - TypeError: graphiqlExpress is not a function (as of 8/17/2018)

* This is because Apollo Server 2 has changed how it connects with graphql and it will break our code so to fix things we need to revert to an older version of Apollo
* If you update to Apollo Server 2 it will break
* Look at package.json to see your versions

`package.json`

```
// MORE CODE

"apollo-server-express": "^1.3.6",

// MORE CODE

"graphql-tools": "^3.0.2",

// MORE CODE
```

* Update version to the above in your code
* Then install update with `$ npm i`
* Run `$ npm run dev`
* Test in Terminal and you should see you are connected to your mongo DB

## Problem schema @unique not recognized
* I was using @unique but removed due to the error about it not being recognized in the schema

## Test in terminal
* Should work and be connected to Terminal

## Error - DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
* [Stackoverflow solution](https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat?noredirect=1&lq=1)

```
The issue is that mongoose still uses collection.ensureIndex and should be updated by them in the near future. To get rid of the message you can downgrade by using version 5.2.8 in your package.json (and delete any caches, last resort is to uninstall it the install it with npm install mongoose@5.2.8):

"mongoose": "^5.2.8"
```

`$ npm i mongoose@5.2.8`

`$ npm run dev` and the error will be gone
