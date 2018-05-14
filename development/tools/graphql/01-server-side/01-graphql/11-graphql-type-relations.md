# Type Relations
* Every book has an author
* Every author has a collection of books

## We need to tell graphql about this relationship
* Let's make our data related

`schema.js`


```
var books = [
  { name: 'Great Expectations', genre: 'Classic', id: '1', authorId: '1' },
  { name: 'David Copperfield', genre: 'Classic', id: '2', authorId: '1' },
  { name: 'The Son Also Rises', genre: 'Classic', id: '3', authorId: '2' },
  { name: 'The Power of Now', genre: 'New Age', id: '4', authorId: '3' },
];

var authors = [
  { name: 'Charles Dickens', age: 200, id: '1' },
  { name: 'Earnest Hemingway', age: 120, id: '2' },
  { name: 'Eckart Tolle', age: 70, id: '3' },
];
```

* **note** the `resolve()` function is responsible for looking at the actual data and returning what is needed, then graphql takes that data and sends back to the user the exact properties they wanted (like.. the **name** of the book and the **genre**)

* Imagine we need this data in a query

![query book with authors](https://i.imgur.com/i5z5aW7.png)

```
// MORE CODE
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, arts) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

// MORE CODE
```

* This query
* refresh graphiql

```
{
  book(id: 3) {
    name
    genre
    author {
      name
    }
  }
}
```

Will output us this:

```
{
  "data": {
    "book": {
      "name": "The Son Also Rises",
      "genre": "Classic",
      "author": {
        "name": "Earnest Hemingway"
      }
    }
  }
}
```

* We are now getting the author data!

* and here is what `parent` console log outputs to terminal
* the parent is equal to the initial book we requested

```
{ name: 'The Son Also Rises',
  genre: 'Classic',
  id: '3',
  authorId: '2' }
```

* That is how we deal with nested and related data in graphql


