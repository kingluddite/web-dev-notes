# Creating Your Own GraphQL API
* GraphQL is just a specification for how stuff should work
* It is not an implementation
* It is up to individual developer to take document that describes GraphQL and then implement it for that environment

## We need to find an implementation of GraphQL that works with `Node.js`
* **note** This is the same for JavaScript
    - We have the JavaScript spec script with how JavaScript should work (ECMA script specification)
    - Then we have various implementations
        + Chrome and Node use the `V8 engine`
        + Mozilla uses `Spidermonkey`
        + Microsoft uses `Jakara`

## View GraphQL spec
* [docs](https://graphql.github.io/graphql-spec/)
* [latest spec](https://graphql.github.io/graphql-spec/June2018/)
* No JavaScript or `Node.js` code only GraphQL spec, up to developers for those other languages (Python, Java, Node) to make their own implementations
    - What does this mean?
        + It just means we might have multiple GraphQL implementations to choose from in a given environment
        + The tool we are using to get GraphQL up and running with `Node.js` is called GraphQL Yoga

## GraphQL Yoga
* [graphql-yoga docs](https://github.com/prisma/graphql-yoga)

### Why use this particular repo?
1. It provides the most advanced feature set to everything GraphQL has to offer
2. Comes with a very easy setup process

### Install graphql-yoga
`$ npm i graphql-yoga`

## Delete the following files in `src`
* index.js
* myModule.js
* math.js

## Get a bare bones graphql-yoga up an running
* We will grab the `GraphQLServer` tool off of the GraphQL Yoga library
    - This tool allows us to create a brand new server
    - Watch the spelling/capitalization, it is case sensitive!
    - GraphQLServer is a Named export
* That's all we need to import to get GraphQL Yoga up and running

## How do we start our GraphQL Yoga server?
* There are TWO things we MUST define before we can start our server

1. Type definitions
2. Resolvers (for our API)

* Both are VERY IMPORTANT!
* Let's talk about each

### Type definitions (aka Type schemas)
* We define all the operations that can be performed on the API
* Also define what our custom data Types look like
* Open up GraphQL SCHEMA tab
    - Analyze it
    - You can see all the operations we can perform
        + In our sample GraphQL Schema we see only Queries (7 of them)
        + All of the Type definitions are defined in the Schema
    - The Schema also defines what our data looks like
    - When we click on the Query `me:User!` 
        + When we queried for `me` what we got back was a `User`
        + We can see in Schema the type User and all it's fields and the various types of that field (this is also defined in our application Schema)

### Resolvers
* Our application resolvers are nothing more than a set of functions
* We are going to define functions that run for each of the operations that can be performed on our API
* Our demo GraphQL API
*   `hello`, `course`, `courseInstructor`, `me`
    - functions were created for each of them
    - Those functions know what do to when that query runs (they know how to get and return the correct data)
    - These functions will eventually be where we query data from a real db, write data or do whatever is necessary depending on what operation was performed

### Create our first GraphQL API
* We define our schema in regular GraphQL code
* We will define a single query - we will query for `hello`, nothing else
    - To do this we start by defining the query type

