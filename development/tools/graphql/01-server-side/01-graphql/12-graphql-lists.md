# GraphQL lists
* Add some books

```
// dummy data
var books = [
  { name: 'Great Expectations', genre: 'Classic', id: '1', authorId: '1' },
  { name: 'David Copperfield', genre: 'Classic', id: '2', authorId: '1' },
  { name: 'The Sun Also Rises', genre: 'Classic', id: '3', authorId: '2' },
  { name: 'For Whom the Bell Tolls', genre: 'Classic', id: '4', authorId: '2' },
  { name: 'The Old Man and the Sea', genre: 'Classic', id: '5', authorId: '2' },
  { name: 'War and Peace', genre: 'Classic', id: '6', authorId: '4' },
];

var authors = [
  { name: 'Charles Dickens', age: 200, id: '1' },
  { name: 'Earnest Hemingway', age: 120, id: '2' },
  { name: 'Eckart Tolle', age: 70, id: '3' },
  { name: 'Leo Tostoy', age: 150, id: '4' },
];
```

* Right now we have a one way relationship
* We can search books and find authors from those books
* We can't search like this:

```
{
  author(id: 2) {
    name
    books {
      name
      genre
    }
  }
}
```

* This is because we haven't set this up yet
* notice red underline under `author`
* This won't work:

```
// MORE CODE
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: BookType
    }
  }),
});
// MORE CODE
```

* We don't need one book, we need a `list` of books
* How do we do this?

## We need to use the GraphQLList

```
// MORE CODE
  GraphQLInt,
  GraphQLList, // add this
} = graphql;

// dummy data
// MORE CODE

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: { // add this prop with the object
      type: new GraphQLList(BookType),
      resolve(parent, arts) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

// MORE CODE
```

* Refresh client side graphiql
* Red underline is gone from `author`

```
{
  author(id: 2) {
    name
    books {
      name
      genre
    }
  }
}
```

* Will give us this output

```
{
  "data": {
    "author": {
      "name": "Earnest Hemingway",
      "books": [
        {
          "name": "The Sun Also Rises",
          "genre": "Classic"
        },
        {
          "name": "For Whom the Bell Tolls",
          "genre": "Classic"
        },
        {
          "name": "The Old Man and the Sea",
          "genre": "Classic"
        }
      ]
    }
  }
}
```

* Now we have a two way relationship
    - Each author can have a list of books
    - Each book has a particular author

## Why did we have to wrap the fields property inside a function?
```
// MORE CODE
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({ // look at the function here!
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
```

## Let's make both of these fields not be wrapped in functions
* To see what happens

```
// MORE CODE
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
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
  },
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, arts) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  },
});
// MORE CODE
```

* We get an error
* graphql can't fetch
* It says BookType isn't defined
* We can move BookType above but then Author type is not defined
* The way around this is to wrap around in a function and that way the code will run from top to bottom and the function won't execute until some later time and that is how the code will work and both Author and Book types will be defined
* Let's put them both to wrapped functions

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

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, arts) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});
// MORE CODE
```


