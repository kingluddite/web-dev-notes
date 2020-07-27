# Query Keyword and Name
## Just query can be used
```
query {
  site {
    info: siteMetadata {
      author
    }
  }
}
```

## And you can use the named query
```
query MyQuery {
  site {
    info: siteMetadata {
      author
    }
  }
}
```

* **note** The name of the named query can be anything you want
* **IMPORTANT** These query name MUST BE UNIQUE
    - Even if that query would be in a different component that is using either page or a static query
    - The sandbox uses the generic `MyQuery` that you'll have to rename if you copy and paste into your code
    - **note** We will start naming our queries when we start using variables
        `query FirstQuery (pass variables here) {}`

