# Prisma 101
* We have our Postgres DB set up
* pgAdmin is running with a connection to our Postgres DB
* We installed and started up Docker

## Prisma Website
* [prisma website](https://www.prisma.io/)

### Learn
* How this tool works
* Features it offers
* Great Docs!
    - Guides telling you how to do specific things (like Deploy Prisma to Digital Ocean)
    - Reference Docs
        + Show you how various methods and utilities work
* Great Community Page
    - Great Slack Channel

## Install prisma
* It is an npm module
* Stop server and install
* We will install this tool globally
* A fairly long install

`$ npm i -g prisma`

## Test if prisma was installed correctly
`$ prisma -v`

* Something like:

`Prisma CLI version: prisma/1.34.0 (darwin-x64) node-v11.10.0`

* If you get a version - Great!
* If not, fix it and troubleshoot

## New Project
* We will use the `prisma` command to install a new project
* We will create a new folder
* We will keep the `graphql-basics` folder as a reference for new stuff we create
* This will be a new project
* `cd` out of `graphql-basic`
* `$ ../`

* Create new folder

`$ take graphql-prisma`

## Set up a primsa project
* Inside our `graphql-prisma` folder

`$ prisma init prisma`

* This will go through the process of setting up the project
* Prisma will ask us questions about our project

### Question from prisma
* Do you have an existing DB?
* Do we want to use an existing DB or create a new one? We don't want to create a new one due to how prisma creates a new DB
* **We want to use an existing external production ready DB that we already created**
* Cycle through arrows and choose `use existing database` and press `return`
* Choose the type of DB: PostgresSQL and press `enter`
* Does your database contain existing data? No + enter
* Now prisma wants our connection information
    - This is the same info we provided to pgAdmin
    - Enter db host: some AWS URL (enter yours)
    - Port: 5432 (default value + enter)
    - DB user: rygxsxbgcekbam (enter yours)
    - DB pwd:
    - DB name: dai47unkm7qct2 (enter user)
    - Use SSL? External connections for Heroku require SSL so you have to use it
* You may see question "Select the programming language for the generated Prisma client"
    - You want to pick `Don't generate` - We are going to build out our own Prisma client so we can understand what is happening
    - No need to generate the boilerplate Prisma as we'll generate it all on our own

## What did we just accomplish?
* A `prisma` folder was created
* Inside that `prisma` folder 3 files were created:

1. datamodel.prisma
2. docker-compose.yml
3. prisma.yml

* We also see the steps to get things setup
* How to start Prisma server
    - Be inside `prisma` folder `$ cd prisma`
    - Start Prisma server `$ docker-compose up -d`
    - Deploy your prisma service `$ primsa deploy`

### Let's check out the files that were created
* datamodel.graphql (my file is called datamodel.prisma)

#### datamodel.prisma (aka datamodel.graphql)
`datamodel.prisma`

```
type User {
  id: ID! @id
  name: String!
}
```

* `datamodel.prisma` is nothing more than a set of type definitions for GraphQL (similar to what we have in schema.graphql)
    - We will eventually have similar graphql in this file
    - The cool thing about this file is that Prisma uses this when it determines your DB structure
        + So for us prisma is going to create a new table for all of our custom object types
            * It will create a new table for all of our Users
            * And it will add columns to each user, `id` and `name`
            * So the GraphQL definitions end up changing the structure of what our DB looks like

#### primsa.yml
* `yml` is similar to JSON
    - It is just a collection of key/value pairs
    - At the end of the day YML is a great language when it comes to configuration
    - YAML - `YAML Ain't Markup Language`
    - `.yml` vs `.yaml` - YAML FAQ recommends that you use `.yaml` in preference to `.yml`, but for historic reasons many Windows programmers are still scared of using extensions with more than three characters and so opt to use `.yml` instead

`prisma.yml`

```
endpoint: http://localhost:4466
datamodel: datamodel.prisma
```

* The endpoint we will use to access our instance
* And we have a link to the datamodel we want to use for the database

#### docker-compose.yml
`docker-compose.yml`

```
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.34
    restart: always
    ports:
    - "4466:4466"
    environment:
      PRISMA_CONFIG: |
        port: 4466
        # uncomment the next line and provide the env var PRISMA_MANAGEMENT_API_SECRET=my-secret to activate cluster security
        # managementApiSecret: my-secret
        databases:
          default:
            connector: postgres
            host: ec2-54-163-230-199.compute-1.amazonaws.com
            database: dai47unkm7qct2
            user: rygxsxbgcekbam
            password: 26ba370a37d77aa7d9238bdb3f00f3b1b5821ef8a47138f527408d0d28bd3984
            ssl: true
            rawAccess: true
            port: '5432'
            migrations: true
```

* Largest of the 3 files
* It is the file that will start up the Docker container
* All of the connection info for our DB is inside this file
* **VERY IMPORTANT**: I removed `schema: public` from the config file because if you keep it you will not generate the default$default schema

##### dive into the code
`version` - think of it for the version of our file (like HTML)

```
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.34
    restart: always
    ports:
    - "4466:4466"
    environment:
 
```

* Think of prisma as a property on the services object
* Inside of prisma is where all the interesting stuff lives
* The `image: prismagraphql/prisma:1.12` is the docker container that someone else created that we will use
    - It specifies the container name and the version
* `restart` - makes sure the process restarts when we apply new changes
* The ports we'll use
* PRISMA_CONFIG
    - The config that specifies how prisma will work
    - Has our database with all the connection info we provided

#### Let's make some changes to docker-compose.yml
* Remove the schema property
    - It is not necessary and we can leave that off
    - I left it on
* Make sure `ssl:true` is set as it is required by Heroku

## Let's deploy our app
`$ cd prisma`

* Start up docker

`$ docker-compose up -d`

1. It will grab all of code necessary to run prisma
2. Then it will start up the prisma application in our virtual machine
3. This process is not deploying our code in any way

* Deploy what's in our prisma folder

`$ prisma deploy`

* This will deploy your latest changes
* When you make changes to your schema you will need to re-deploy for prisma to reflect those changes in our DB
* **Troubleshooting** This command has been know to fail if you run it after to quickly after the `docker-compose` command - as a tip, wait 20 seconds before running `$ prisma deploy` after running `$ docker-compose up -d`

## What did the deploy command just do?
1. It started by deploying that default service
2. Then it went through the process of creating everything necessary based off of our schema

```
Creating stage default for service default ✔
Deploying service `default` to stage `default` to server `local` 7.8s

Changes:

  User (Type)
  + Created type `User`
  + Created field `id` of type `ID!`
  + Created field `name` of type `String!`

Applying changes 32.9s

Your Prisma endpoint is live:

  HTTP:  http://localhost:4466
  WS:    ws://localhost:4466

You can view & edit your data here:

  Prisma Admin: http://localhost:4466/_admin
```

## View it in the browser
* `localhost:4466`
* When you visit that URL you will get another instance of GraphQL Playground, but the GraphQL Playground is connected to the GraphQL API provided by Prisma itself
    - This means if we were to write a Mutation it would actually write data to our Postgres DB
    - If I were to use a Query it would be reading data from that DB
    - The cool part is Prisma does all the heavy lifting for us
    - All we need to is define the various types and fields we want, Prisma goes through the process automatically creating the Mutations, the Queries and the Subscriptions necessary to get everything working with the DB we've chosen

## Open up Docs in GraphQL Playground
* You will see there are Queries, Mutations and Subscriptions created that we did not create
    - Users
    - User
    - CRUD of USER
    - Subscriptions allowing us to watch User for changes
    - Everything is related to User because that was the only type we defined
    - As we add more types, Prisma will automatically create more Queries, Mutations and Subscriptions

## Recap
* We installed Prisma
* We created our first Prisma project (using `$ prisma init`)
    - This automatically created 3 files
        + datamodel, prisma.yml and docker-compose.yml
        + We could have generated these 3 files on my own
        + We just use the little wizard because it makes it easier on us to get up and running with Prisma
        + All the real work happened when we used `$ docker-compose up -d` to start up the Prisma service and `$ prisma deploy` to deploy our data model to that service
            * The end result is we can see our GraphQL Playground in our browser
* We deployed our first Prisma project

## Next
* We will use GraphQL Playground to interact with our DB
* After that video we will use GraphQL Playground inside Node.js so we can read and write to the DB from our project itself
