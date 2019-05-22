# GraphQL Queries
* Run 1st GraphQL query
* We will make requests to a real world API

## As with a REST API
* We will have a client and a server
* In this course
    - The client will be a web app
    - The server will be a Node.js GraphQL server

## First things first - let's keep it simple
* We'll use an existing GraphQL server to test things out
* `https://graphql-demo.mead.io` 
    - Playground
    - Just a request/response tool for GraphQL
    - It shows us what happens when we submit a query to a GraphQL API
    - This is similar to [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/)
    - Good news - we ony have 1 end point with GraphQL - `https://graphql-demo.mead.io/`

## Three types of request
1. Query
    * Allows us to query data
2. Mutation
    * Enables us to change data
3. Subscription
    * Allows us to watch data for changes (great for real time apps)

## Query
* GraphQL API
* Query allows us to fetch data

```
query {

}
```

* This will show us an error
* We need to specify what fields we want inside `query` to be valid, then we'll have a valid GraphQL query that will allow us to fetch some data

```
query {
  hello
  courseInstructor
  course
}
```

* Output

```
{
  "data": {
    "hello": "Hello world!",
    "courseInstructor": "Andrew Mead",
    "course": "GraphQL"
  }
}
```

* If you query a field that is not in the API you will get an error alerting you to that fact (it gives us useful feedback)
* Your GraphQL API has self creating documentation
* This is possible because your GraphQL API exposes a GraphQL schema

## View Schema tab in GraphQL API
* Shows you all the queries we can make
* Tells you what you will get back, in this case we always will get a String response back
* The `!` means that you will always get a String response back
