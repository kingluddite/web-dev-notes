# Named Queries
* Last time apollo dev tools had a queries tab
* When clicked we saw `Watched queries` and the number 1
* This is not super useful
* That is where Named Queries comes into play

## Our current GraphQL query
`App.js`

```
// MORE CODE

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;

// MORE CODE
```

* We need to name that query
* Why?
    - Because it will be how we refer to that query
    - But currently it has no identifier
    - But if we do this:

```
// MORE CODE

const POSTS_QUERY = gql`
      query {
        posts {
          id
          title
          body
        }
      }
`;

// MORE CODE
```

* This lets GraphQL know that this is in fact a query
* This will be a **required** technique when we get into mutations because you will always have to have `mutations` first
* So we need to provide a name, it can be anything (but name it appropriately)
    - Names are typically in camelCase

```
// MORE CODE

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

// MORE CODE
```

* **tip** In a perfect world Apollo Dev tools would refresh but you may need to close and reopen to see the change
* After closing and reopening you will now see the named query in the Queries tab of Apollo Dev Tools
    - It loses it's place in tab order :( 

## Best Practice Tip
* Always name your GraphQL queries and mutations
* Naming queries and mutations will also provide you better error messages

## Network tab
* In the console
* What can go wrong in GraphQL and how you can troubleshoot and figure out what to do
* You will write many queries and mutations and many times they won't work for some reason or another and you will need to know where to go to figure out what went wrong
