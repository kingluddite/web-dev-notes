# What is Prisma?
* We will use Prisma to connect our backend Node.js to the real DB we will be using
* Prisma works with a wide variety of DBs

1. What does Prisma do?
2. Where does Prisma fit in our application architecture

## Visualization
* Clients on left
* Server on Right
* REST API in middle connecting the two

### REST API
![REST API architecture](https://i.imgur.com/cKTPMRF.png)

### GraphQL
![GraphQL API architecture](https://i.imgur.com/TnAzEre.png)

* Graphql === Graph Query Language
    - Can work with any language. Any database.
    - Any client (web, mobile, server)
* But there is a bit more complexity to what happens on the backend
* In reality the server is just going to make up our backend programming language (and that can be any language)
    - Could be Java but our server is written in Node.js
* As a separate node we have our DB
    - This could be any DB we like
        + MySQL
        + Postgres
        + MongoDB

## How do we connect our backend Node.js with the DB of choice?
![DB diagram](https://i.imgur.com/FYh9GmD.png)

* We need a tool to facilitate that communication
* If someone sends a mutation off to the server, the server instead of modifying one of the arrays (as it currently does) needs to actually write to the DB
* When someone sends a query asking for data, the server needs to actually read from the DB as opposed to from one of our static arrays

### How can we get that done?
* We have a few options with Prisma

#### Options
1. Use a Native driver
    * All popular DBs like MySQL, MongoDB or Postgres have Native drivers for Node.js
        - These are essentially npm libraries that make it easy for us to connect our backend in Node.js to those DBs
    * Native drivers are very bare bones implementations, we can perform all the queries necessary to read and write data but we can not get any nice-to-have features
        - Nice-to-have features like:
            + Migrations
            + Data Validations
            + Don't get a way to map our models setting up relationships between our data
    * If we chose a Native driver we would end up doing way more work than is really necessary
2. ORM (Object Relational Mapping)
    * Examples (Sequelize or Mongoose)
        - Sequelize is a great Node.js ORM for connecting Node.js to a SQL database like MySQL or Postgres
        - Mongoose is a great Node.js ORM for connecting Node.js to a No SQL database like MongoDB
    * This is the next step up from a Native driver
    * ORMs give us some access to nice-to-have features
        - We can actually model our data
            + Example: Users and posts
                *  A user has many posts
        - We can set up validations to make sure the password field has at least 6 characters
        - We can migrate our data over time adding and removing fields as our data structures change
        - All of these are possible with ORMs and this is typically what we end up using
3. Prisma (GraphQL ORM)
    * We still get all of the nice-to-have features
        - We can model our data setting up things like users and posts
        - We can describe the relationship between our data
        - We can set up migrations for the data
        - We can use validations
        - We can do anything the other ORMs let us do
        - But is also comes with nice-to-have features which makes it a nice stand out choice
    * Database agnostic!
        * If you are using the Mongoose library you have to use a Mongo DB
        * If you are using the Sequelize library you have to use a SQL DB
        * And if you decide you want to switch from MongoDB to Postgres you have to rewrite most of your application since the libraries are different
        * With Prisma we don't have to do that since is supports every major DB out there
        * The only code you need to change to switch to a different DB is about 6 lines and that is just how to connect to the DB

## How does all of this work?
* Because Prisma wraps our DB up and exposes it as a GraphQL API
    - It exposes a GraphQL API that can be used to read and write from the actual DB regardless of what DB we are using
    - That means our Node.js backend can read and write from the DB using GraphQL

![Prisma Server and DB](https://i.imgur.com/NENi1PE.png)

* Prisma sits inbetween our server and our DB
* Anytime we have communication between different layers, it's GraphQL
    - If the client wants to communicate with Node.js, -it's GraphQL
    - If Node.js wants to communicate with the DB, it's GraphQL
    - So if Node.js wants to read data from the DB it sends off a GraphQL query
    - If Node.js wants to write data to our DB, it sends off a Mutation
    - And if Node.js wants to watch the DB for changes, it sets up a subscription
    - Because we are using GraphQL between the client and the server and the server and the database the server actually becomes a whole lot less important, there's not a lot to do there (a good thing) this enables us to reduce the amount of code and the complexity of that code
    - The server really just serves as a thin layer between the client and the DB
    - It's almost like the client has direct access to the DB but the server is still important for things like authentication and data authorization
    - We still want to make sure that someone can only read data that they should actually be able to read
    - And someone should only be able to write data they should be able to write after of course that data has been sanitized and validated
    - So Node.js still servers a valuable purpose (but just less of a purpose)

## Real world example
* I have a client and I want to get all of the posts
* I generate my operation and I send it off to Node.js
* What does Node.js?
    - Node.js does not write another operation to send to the Prisma GraphQL API, it just takes the same one and passes it through
        + Prisma gets the data and Node.js passes that data back to the client
        + So Node.js doesn't do a whole lot
    - But if we were working with a Mutation, we need to first make sure that the user is authenticated and that the data was valid but after I would still pass that operation from the client to Prisma to perform that Mutation and when the data came back I would just sent it back to the client

## Recap
* Prisma is an ORM
* It works with all DBs
* And it makes it really easy for us to expose access to the DB to a client in a secure and efficient way 
