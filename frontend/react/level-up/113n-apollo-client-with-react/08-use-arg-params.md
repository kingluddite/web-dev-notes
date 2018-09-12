# Use Arguments & Parameters
* Each GraphQL GUI for prisma, Apollo does this different
* Notice we can write many separate queries and not just one

## Type this in GraphCMS
```
{
  posts {
    id
    title
    body
  }
  
  post {
    id
    title
    body
  }
}
```

* Run it
* That will generate an error like this:

```
{
  "errors": [
    {
      "message": "Field \"post\" argument \"where\" of type \"PostWhereUniqueInput!\" is required but not provided.",
      "locations": [
        {
          "line": 8,
          "column": 3
        }
      ]
    }
  ]
}
```

* This is letting us know we'll need an argument of `where`
* What is `PostWhereUniqueInput!`
    - Since we don't understand `inputs` this doesn't make sense yet
    - But it is expecting an argument of `where`

```
{
  posts {
    id
    title
    body
  }
  
  post(where) {
    id
    title
    body
  }
}
```

## How do we pass an argument into a GraphQL query?
* Just add parentheses after your initial query
    - In a custom system we would just pass in a `_id` param and supply an `_id` of a string and it would return me that object
* But GraphCMS doesn't give us an `_id` instead it gives us `where` and `where` allows us to have some properties inside of `where`
* **note** GraphQL is not JavaScript it is GraphQL

## How do we know what `where` accepts?
* Highlight over `where` in API Explorer and click]
* It then tells us `where` needs a `PostWhereUniqueInput!`
* Then click that link and you'll see that it needs an `id` with an `ID`

```
{
  posts {
    id
    title
    body
  }
  
  post(where: { id : "" }) {
    id
    title
    body
  }
}
```

## How do we get that `id`?
* First, comment out the second query

```
{
  posts {
    id
    title
    body
  }
  
  # post(where: { id : "" }) {
  #   id
  #   title
  #   body
  # }
}
```

* Run the query again and you'll see something like:

```
{
  "data": {
    "posts": [
      {
        "id": "cjlvb9xtmjng80940rrulhz73",
        "title": "Intro Video",
        "body": "## This is a heading two in markdown"
      }
    ]
  }
}
```

* If you get a permission problem just log in again (if you have window open for a long time the token expires and you need to login gain)
* Grab that `id` and `comment back in` your query and put in that `id` in the query
* **important rule** You must use double quotes when writing GraphQL!!!

```
{
  "data": {
    "posts": [
      {
        "id": "cjlvb9xtmjng80940rrulhz73",
        "title": "Intro Video",
        "body": "## This is a heading two in markdown"
      }
    ],
    "post": {
      "id": "cjlvb9xtmjng80940rrulhz73",
      "title": "Intro Video",
      "body": "## This is a heading two in markdown"
    }
  }
}
```

* Look at the data output above
    - The first query returns and array objects (but just one object inside that array)
    - The second query returns just one object
* This is how we'll use variables in our queries and mutations

## Different step
* When we need variables to be coming from dynamic sources
* This means we won't be able to hard code a string inside our query
* `where` comes from GraphCMS
* The type of `ID` is strange but it is just used for prioritizing but it really is just a string
    - You'll use `ID` a lot when manually setting up your schemas

## Summary
* We wrote a query that accepts and argument and returns a single post

## Next - React Router
* Eventually we'll build a blog that will hit this exact query and then we'll take the `data` to populate the single page of the blog
