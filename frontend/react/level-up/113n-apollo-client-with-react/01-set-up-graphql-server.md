# Set up our GraphQL Server
* Basic
* Open API using GraphCMS

## GraphCMS
* How we will have our GraphQL API set up
* This will be our entire GraphQL server

### Why GraphCMS?
* GraphCMS is like WordPress that gives you a GraphQL API
* There are other ways
    - We could use Apollo Server
    - We could also use [Prisma](https://www.prisma.io/)
    - But they have a complex setup
* Since we are learning about apollo client and graphql on the client and not about apollo on the server
* Since we are using GraphCMS we don't have to worry about
    - Setting up a DB
    - Or creating our schemas
    - Setting up a server
* Cons
    - When dealing with mutations we won't be able to have them authenticated which would be a huge problem in production

### How to use GraphCMS
1. Log in with Github
2. Create a new project
3. Name project `graphql-with-apollo-peh2`
4. Choose US West (Oregeon) ... or closest to you
5. Click Create button
6. Choose Developer plan button
7. Choose Continue button

* Congrats!
* You now have your new GraphQL API

## Define our schema
* A schema is where you shape your data (you say what exists)
* If you were using a normal Apollo Server or Prisma Server you would be writing your own schemas (giving various fields and different types)

### GraphCMS dashboard
* Schema starts empty
* Click Schema button in sidebar
    - Think of it like a post or page within wordpress
    - Click `Create Model` and name it `Post` and click `Create Model` button
    - Click vertical `FIELDS` button to expand it
    - Drag and drop single into box and name it `Title`
        + It will name the Api Id lowercase `title` automatically
        + Click `Create` button
    - Drag a markdown field into box and name it `Body` and click `Create` button
* Click `SYSTEM FIELDS` button and you will see:
    - Create At
    - Updated At
    - Status
    - ID

## Create some new content
* Click on `Content` button in sidebar
* Click `Posts`
* Click `Create Post`
    - Title: Intro Video
    - Body: `## This is a heading two in markdown`
* Change Draft to `Publish` and click `Create`
* We now have a post and a schema so we can now test out our API

## Test out our API
* Click API Explorer
* Clear all comments and type this:

```
{
    p
}
```

* After typing that in the GUI you will see you have acces to `post`, `posts` and `postsCollection`
* Hover over `posts` and click `command` key and you will get list of documentation
    - We get a lot of stuff baked into GraphCMS
        + Arguments
            * where, orderBy, skip, after, before, first, last
            * If you were writing your own server you would have to write all your own `where, orderBy, skip...`
        + Type - if you click Post
            * Now you will see all available fields within Post

```
{
    posts { // this is the query
        // results here (stuff you want to see from query)
    }
}
```

* Example

```
{
  posts {
    title
    body
    createdAt
  }
}
```

* Output is:

```
{
  "data": {
    "posts": [
      {
        "title": "Intro Video",
        "body": "## This is a heading two in markdown",
        "createdAt": "2018-09-09T20:28:57.853Z"
      }
    ]
  }
}
```

* So we test a query and we see what comes back
* We know it works or it will error if it doesn't
* We only get what we ask for
* API Explorer view is not exclusive to GraphCMS
    - Anytime you have a graphql system (apollo server, prisma) there will be something like graphiql that comes baked in
    - There is also Apollo Dev Tools which has an explorer that can be attached to any GraphQL API that you are using

## Congrats!
* You just wrote your first GraphQL query
* Benefits
    - This is super nice
    - We don't have to hit a URL and waiting for data to come back
    - We just tell it explicitly what we want
* If we had multiple posts it would return all of them in an array
### Resources
* [Download](https://github.com/prisma/graphql-playground) and tryout `GraphQL Playground`
* Made in Electron
    - [Desktop app](https://github.com/prisma/graphql-playground/releases)
* Other similar GUI apps to make working with graphql easier
* Benefit: You write graphql in GUI, test to make sure it works and pulls in the data you want, then past code into your app


