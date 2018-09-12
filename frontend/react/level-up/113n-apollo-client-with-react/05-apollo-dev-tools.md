# Apollo Dev Tools
* [apollo-client-devtools](https://github.com/apollographql/apollo-client-devtools)
* Install and it will be availabel in your chrome browser
* Apollo Dev tools tab can be moved and keeps its place
    - React Dev tools do not

## Use Apollo Dev Tools
* Clear out comments
* Paste in:

```
{
  posts {
    id
  }
}
```

* Execute
* And you will seee output:

```
{
  "data": {
    "posts": [
      {
        "id": "cjlvb9xtmjng80940rrulhz73"
      }
    ]
  }
}
```

* Apollo dev tools identifies the API we are using
* This means we don't have to go back and forth to our API just to get access to our queries, we have them right in the browser
* We can also test:
    - Queries
        + Click on 1, then expand Query string, then Run in GraphQL
        + Currently no variables but we will talk about that soon
    - Mutations
        + Currently empty
        + A mutation is a way in GraphQL to modify the DB
    - Cache
        + This will be the entire cache of our app
        + One of the best things Apollo does for us is manages the cache for us
        + If we go to another page and then come back this page will load quickly because its already in the cache
            * We can work with the cache and use state the apollo state link to have all of our apps state stored in the same cache
        + You can click on the cache to explore it
