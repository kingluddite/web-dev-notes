# The resolve function
* Say someone makes this query

```
book(id: "2") {
    name
    genre
}
```

## Add some dummy data (simple array)
* Will be in mongoDB later

`schema.js`

```js
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];
// MORE CODE
```

### How best to search the array?
* Vanilla JavaScript
* Or use a nice utility called `lodash`

`$ npm i lodash`

### Require lodash'
* Lets us quickly find data inside this array
* Lots of other stuff
* It helps us save time

`schema.js`

```
const graphql = require('graphql');
const _ = require('lodash'); // add this line

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
// MORE CODE
```

* And grab our data from the array using lodash

```
// MORE CODE
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```


