# Troubleshoot GraphQL
* Imagine you are working on your query and it is not working

## Create an error
`App.js`

```
// MORE CODE

const POSTS_QUERY = gql`
  query allPosts {
    postz {
      id
      title
      body
    }
  }
`;

// MORE CODE

<Query query={POSTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error</div>;
            // console.lg(data);
            const { posts } = data;
            return posts.map(post => <h1>{post.title}</h1>);
          }}
        </Query>

// MORE CODE
```

* We misspelled `posts` as `postz`
* I commented out the `error` code
* We get this error:

![error](https://i.imgur.com/qHowaKb.png)

* This is not a helpful error because it doesn't tell us what we should be looking at
* The console does give us a good GraphQL reason for the error
* But let's say that the error we get is only that "cannot read property of undefined"... what should we do to troubleshoot?

## Best way to troubleshoot a GraphQL query or mutation?
1. Click network tab
2. Click refresh
3. You will see bold red 
    * Anytime we have a failed query or mutation it will come up red
    * Do this all the time for GraphQL related failures
    * Most time it will say `graphql` and not `master`
4. Click bold red `master`
5. Click `Preview` tab
6. Expand `errors` and you will see reason for the error

## Next - Using variables in our queries
* This will enable us to affect the return of a query
    - Say we need a singular post (so we'll pass in the `_id`)
