# Prisma Setup
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## Install prisma
* Inside `backend`

`$ npm i babel-preset-env nodemon graphql graphql-cli graphql-yoga prisma prisma-binding dotenv bcryptjs jsonwebtoken`

* [url to prisma](https://www.prisma.io/)
* 100% open source library that will sit on top of a database and provides you a full featured GraphQL API that we can use to perform all of our CRUD operations, all of our relationships with all of our data
* Prisma does all of the heavy lifting for you to provide you with a full featured GraphQL API
    - We will layout Yogo on top of Prisma
    - That will allow us to add our custom logic to our application

## Prisma
* Provides a set of GraphQL CRUD APIs for MySQL or Postgres DB and now also mongodb
* The good news is we won't have to write any MySQL, Postgres or MongoDB queries, but instead we will always be interfacing with the GraphQL queries that Prisma surfaces for us

## Setup Prisma
* You could set up your own Prisma instance using Docker
* We will use the Demo server from Prisma (just to quickly get up and running)
    - **note** Just know you can run your own Prisma and MySQL DB and that is what you will need to do when you put your app into production

### Signup for a Prisma account
* I use Oauth to sign in with Github

### Get into the `backend` folder inside your terminal
* We want to **globally** install Prisma's CLI

`$ npm i -g prisma`

### Login to prisma
`$ prisma login`

1. After you do that it will open the browser
2. Click the `Grant Permission` button
3. Then close browser window
4. Go back to terminal
5. And presto! You are authenticated

### Initialize Prisma
`$ prisma init`

* Prisma will ask you a series of questions:
* Use your arrow keys to select items and press `return` key for each choice

### Set up a new Prisma server or deploy to an existing server?
* Use a new or existing db
* We'll use `Demo` server
* Use your arrow keys to select `Demo` and press `return` key

### Choose the region of your demo server
* Select item with least amount of latency and press return

### Choose a name for your service
* Enter `sickophant`

### Choose a name for your stage (can have different stages like dev/staging)
* We'll accept the default of `dev` and press `return`

### Select the programming language for the generated Prisma client
* Select `Don't generate` and press return

### Look at files that were generated
* datamodel.graphql (you may see datamodel.prisma)
* prisma.yml

## Let's open the backend
`$ code .`

### Analyze new files
`prisma.yml`

* We see the endpoint we will be hitting
* We will put this in an environmental variable

#### What are environmental variables
* They allow you to set variables based on the environment
    - You have development and production and staging
    - Each of those environments might contain sensative info and values that need to change depending on what environment you are in
        + You may have a different MongoDB URI for dev, staging and production
        + Maybe that endpoint for our GraphQL will change when we head to production
* We will create `variables.env` and in that file we will place sensative information that we NEVER push to github (or anywhere the public can see)
* We will have a `.gitignore` that will ignore all `.env` files
* We will name it `.env`

### Moving endpoint
* We need to place our endpoint into our `.env`

`prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
# secret: ${env: PRISMA_SECRET}
```

* We movie our prisma endpoint into our `.env` file
* We add a secret that will enable us to lockdown our database but we comment it out because we need it open for development
    - We will uncomment that when we go to production
    - We will add a random secret
* We will add a post deploy hook
    -  We will modify our data model, we will add fields, user email address, user password then we need to update that new updated information to our prisma which is hosted on the prisma server
    -  In order to do that you need to deploy it
    -  And after the deploy is done the prisma server will return to us what is called a `graphql schema` (and that is why we need a post deploy hook that will pull down that schema for us)
* **note** yml files use tabs and intents to relay information about the structure of content and do not use curly braces or parenthesees

`prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
# secret: ${env: PRISMA_SECRET}
hooks:
  post-deploy:
      - graphql get-schema -p prisma
```

### datamodel.prisma
```
type User {
  id: ID! @unique
  name: String!
}
```

* This is the default schema as to how everything looks
* We will build our GraphQL schema using this file

### Deploy Data Model to the Prisma server that is running on prisma.io
* Normally you will just use:

`$ primsa deploy`

* That will take everything in your `prisma.yml` file and deploy it

### Prisma help
* Use these instructions if you run into problems with Prisma
* To see a problem do this:
* Rename `.env` to `variables.env`
* We get this error in our `prima.yml`

```
A valid environment variable to satisfy the declaration 'env:PRISMA_ENDPOINT' could not be found.
```

* The reason is we named our `.env` file a nonstandard way with `variables.env`
* You could get rid of the error and use this info from the help screen:
* Here is how we search for help on Prisma

`$ prisma --help`

* But we can get more specific with our help since we are using `prisma deploy`

`$ prisma deploy --help`

* We see a solution here:

`-e, --env-file ENV-FILE    Path to .env file to inject env vars`

* To custom name your environmental variables without getting an error

`prisma deploy --env-file variables.env`

* Or we could type the shorter way

`prisma deploy -e variables.env`

* We point to the path to where our file is located
* But let's keep things simple and rename our `variables.env` to `.env` and type:

`$ prisma deploy`

* You will see now that if you refresh your browser on prisma
* Refresh browser and click `Skip` button
* You now will see a new service called sickophant

![sickophant prisma service](https://i.imgur.com/Jo03ZIN.png)

* Click on it and you will have access to the Data Browser
* This is amazing
    - It will show you all your users
    - All their cart items
    - All orders created
    - All the items
    - All the orderitems

## Limit on Prisma sandboxes
* Limit to 10 requests per 10 seconds
* If you do more than that it will queue them up
* This works in development but won't work in production
* So you can't use the Demo for production

## What does the Prisma post deploy hook do?

`prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
# secret: ${env: PRISMA_SECRET}
hooks:
  post-deploy:
      - graphql get-schema -p prisma
```

* It goes and gets the schema after we deploy it and we can look at that
* It is in the `src/generated/prisma.graphql`

### Add grapqhl syntax plugin for VS code
* Open `src/generated/prisma.graphql`
* This is the magic that is behind all of what Prisma is
    - Prisma creates this API
    - All of the API lives in `prisma.graphql`
    - Check out all the Mutations
        + It's all there
        + We don't have to create them
        + And we can use any of them
* `"""` three quotations is a comment in GraphQL
    - usersConnection() - We will use
        + Gives us how many users there are total
        + We have 1 data model with 2 fields and the file is over 2000 lines of code!

## Add a field to our GraphQL - we'll add an `email` field
`backend/datamodel.prisma`

```
type User {
  id: ID! @unique
  name: String!
  email: String!
}
```

* Let's go over the nomenclature for GraphQL
    - Above `email` is called a **field**
    - `User` is called typed
    - `String` is how we say which type
    - `!` means required

## Different types in GraphQL
* Int: A signed 32-bit integer
* Float: A signed double-precision floating-point value
* String: A UTF-8 character sequence
* Boolean: true or false
* ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache
    - The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human-readable
* [String!] - If you want an array of something put it inside `[array goes here]`
    - You could require it be a String and and an array of Strings with `[String!]!`
* `@` are called directives in GraphQL and you can put them on anything you want
    - We can use @name, or `@unique` or `@relation` or `@default` or `@rename`

### **note** Prisma gives us `datetime` type for us
* Which is automatically added to the User for tracking when it was created, when it was last updated

### deploy script
* If you renamed `.env` to `variables.env` this build script will work for you

`frontend/package.json`

```
// MORE CODE

"deploy": "prisma deploy --env-file variables.env"
},
"dependencies": {

// MORE CODE
```

* Run with:

`$ npm run deploy`

* But I named my the standard `.env` so I can use this instead:

```
// MORE CODE

"deploy": "prisma deploy"
  },
  "dependencies": {

// MORE CODE
```

* Run with (make sure you are in the `backend` folder:

`$ npm run deploy`

* You will get a success message saying: 

`User (Type) - Created field 'email' of type 'String!'`

* Open `src/generated/prisma.graphql` and more code has be generated because you added an `email` field to your GraphQL schema

### We added to our datamodel.prisma
* So we need to deploy again
* Using our `script` command in `client/package.json` we can run deploy with:

`$ npm run deploy`

* Install GraphQL Prisma package for VS Code

## GraphQL playground
* The terminal will output a link to your GraphQL playground
* Click on it (hold cmd key down) and it will open your GraphQL GUI

![sample GraphQL GUI](https://i.imgur.com/leYP63B.png)

`https://us1.prisma.sh/pip-5a52b7/sickophant/dev`

* Click `SCHEMA` to see all different queries

![mutations queries GraphQL](https://i.imgur.com/htgsYRE.png)

### Let's play around in the GraphQL GUI
* Grab all users in DB and tell me their `id` and `name`

```
query {
  users {
    id
    name
  }
}
```

* Output (our users is empty)

```
{
  "data": {
    "users": []
  }
}
```

## We want to create a user
* This will be a mutation
* We expand the SCHEMA and see the documentation for `createUser` and see that it takes an argument of `data: UserCreateInput!`
    - You expand that and see that you will need to pass a `name` and `email`
* We create a new tab in the GUI

```
mutation {
  createUser(data: {
    name:"bob"
    email:"bob@bob.com"
  })
}
```

* But we get a red error saying we need subfields
* This means we need to tell it what data we want back
* I want the name and email back

```
mutation {
  createUser(data: {
    name:"bob"
    email:"bob@bob.com"
  }) {
    name
    email
  }
}
```

* And the output

```
{
  "data": {
    "createUser": {
      "name": "bob",
      "email": "bob@bob.com"
    }
  }
}
```

* Create another user

```
mutation {
  createUser(data: {
    name:"mike"
    email:"mike@mike.com"
  }) {
    name
    email
  }
}
```

### Two ways to check if we now have a user
1. query it using our GUI
2. Use our Prisma dashboard

1. We already used this query and do this in the GraphQL GUI

```
query {
  users {
    id
    name
  }
}
```

* And now we have users

```
{
  "data": {
    "users": [
      {
        "id": "cjnaq67ywt0510b77renv9395",
        "name": "bob"
      },
      {
        "id": "cjnaqdwa7t17p0b77j769yhvz",
        "name": "mike"
      }
    ]
  }
}
```

2. Open the Data Browser in Prisma

* You will see we have 1 user in there
* This is great because we can easily edit the data in here (just double click to open Edit Modal, make changes and click Update Node to save your changes)

### Let's find specific information about our users
* Find only users where name equals `mike`
* So we will pass our `users` an argument

```
query {
  users(where:{
    name_contains: "mike"
  }) {
    id
    name
  }
}
```

* That will return `mike` only

### Find out a lot about our users
* We want to know pageInfo
    - hasNextPage and hasPreviousPage (used for pagination)
* How many total users we have
* Create a new tab

```
query {
  usersConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    aggregate {
      count
    }
  }
}
```

* Output

```
{
  "data": {
    "usersConnection": {
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false
      },
      "aggregate": {
        "count": 2
      }
    }
  }
}
```

* We see there are no next or previous pages
* We see we have 2 total users

### Limit to first 1
```
query {
  usersConnection(first: 1) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    aggregate {
      count
    }
  }
}
```

* Since we have 2 total users
* We limit to the first 1 so that means we now have a next page as each result will only be 1 user
* This will come into play with `pagination`

## GraphQL GUI
* Nice to have set up
* But anyone that has access to this URL can manipulate our site data which obviously for security reasons is a bad idea
* So we won't be interfacing with this directly and instead will work with our Yoga server

## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch
