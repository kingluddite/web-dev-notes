# Test in GraphQL
* Visit this URL `http://localhost:4000/graphql`

## Error!
```
{
    errors: [
        {
        message: "Must provide query string."
        }
    ]
}
```

* It is telling us that it doesn't know what our query is
* The graphql is just a HTTP request to connect
* But we need to tell it our query

## Turn on graphiql
`app.js`

```
// MORE CODE
app.use(
  '/graphql',
  graphqlHTTP({
    // schema: schema (can be shortened)
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening to port 4000');
});
```

* Now refresh this URL, `http://localhost:4000/graphql`
* and you'll see:

![graphiql](https://i.imgur.com/14gapYB.png)

### Examining GraphiQL
* Clear all welcome comments

#### Documentation Explorer
* Will tell you about GraphQL server you are making queries to
* Click RootQueryType link
    - You will see `book(id: String): Book`
    - We can query for a book
    - And that book must have an `id`
    - Click on Book object to see which properties we can access off it

![RootQueryType](https://i.imgur.com/r4vBxC0.png)

![book](https://i.imgur.com/qzCsJuM.png)

![Book type properties](https://i.imgur.com/8VS98h0.png)

* **rule** Must use double quotes in GraphQL
    - Can not be single quotes!

## Write our first graphql query
```
{
  book(id: "2") {
    name
    genre
    id
  }
}
```

* Press the triangular "play" button to execute the query result

![first query](https://i.imgur.com/tJdSk1f.png)

* Here is the data object we get back

```
{
  "data": {
    "book": {
      "name": "The Final Empire",
      "genre": "Fantasy",
      "id": "2"
    }
  }
}
```

* We change the id and we get the different book
* We enter an id that doesn't exist and we get `null`
* We will get red squiggly lines on fields that don't exist like this:

![no such field](https://i.imgur.com/Q2Ni12h.png)


