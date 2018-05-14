# Query Variables
* How do we take the values entered into the form and dynamically pass them to our graphql mutation query?

`queries.js`

* Let's accept query variables into the mutation

```
// MORE CODE
export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
// MORE CODE
```

## Pass query variables into the mutation
`AddBook.js`

```
// MORE CODE
submitForm(e) {
  e.preventDefault();
  this.props.addBookMutation({
    variables: {
      name: this.state.name,
      genre: this.state.genre,
      authorId: this.state.authorId,
    },
  });
}
// MORE CODE
```

* Add a book again
* Again nothing on the front end
* But check mlab and you'll see your book has been added

![book added](https://i.imgur.com/lbVZJi3.png)

* It only appears when we refresh the browser

## Next - Re-fetching queries

