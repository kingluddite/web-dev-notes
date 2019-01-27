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

### Setup Prisma
* You could set up your own Prisma instance using Docker
* We will use the Demo server from Prisma (just to quickly get up and running)
    - **note** Just know you can run your own Prisma and MySQL DB and that is what you will need to do when you put your app into production

### Signup for a Prisma account
* I use Oauth to sign in with Github

### Get into the `backend` folder inside your terminal
**MAKE SURE YOU ARE IN THE `backend` FOLDER!!!!!**

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
* Use your arrow keys to select `Demo` and press `return` key

### Choose a Region 
* Choose the region of your demo server
* Select item with least amount of latency and press return

### Choose a name for your service
* Enter `acme-prisma-service`

### Choose a name for your stage (can have different stages like dev/staging)
* We'll accept the default of `dev` and press `return`

### Select the programming language for the generated Prisma client
* Select `Don't generate` and press return

### Look at files that were generated
* datamodel.prisma (you may see datamodel.graphql)
* prisma.yml

`prisma.yml`

```
endpoint: https://us1.prisma.sh/john-doe/acme-prisma-service/dev
datamodel: datamodel.prisma
```

* We see the **endpoint** we will be hitting
* Copy the endpoint URL and paste it into the browser and you will get a GraphQL playground
  - Click the `SCHEMA` button and you will see nothing ever loads
  - We need to fix this
  - First we will clean up our code by putting the hard coded endpoint into an **environmental variable** (This is a very important security step to keep our endpoint away from the public)

### Moving endpoint
* When we ran `$ prisma init` Prisma generated the `prisma.yml` file and was kind enough to insert the endpoint into `prisma.yml`
  - It will look something like this:
* We need replace that **hard coded** endpoint with a variable like: this:

`prisma.yml`

### PSST... we have a secret
* We add a secret that will enable us to lockdown our database but we comment it out because we need it open for development
    - We will uncomment that when we go to production
    - We will add a random secret (make it up by randomly pressing a bunch of keyboard keys) and add it to `.env`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
# secret: ${env: PRISMA_SECRET}
```

## Move secret stuff to `.env`
* We move our endpoint
* **note** we added `PRISMA_ENDPOINT` and `PRISMA_SECRET`

`.env`

```
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="https://us1.prisma.sh/john-doe/acme-prisma-service/dev"
PRISMA_SECRET="ikja;sdkfjsdie;aksdjfsdi"
APP_SECRET="jwtsecret123"
STRIPE_SECRET="sk_123youchanget his"
PORT=4444
MAIL_HOST="smtp.mailtrap.io"
MAIL_PORT=2525
MAIL_USER="024aaaa37dda50"
MAIL_PASS="9057db9bc8422d"
```

### Add deploy hook
* We will add a post deploy hook
    -  We will modify our data model
    -  We will add fields:
        + user email address
        + user password
    - Then we need to update that new updated information to our prisma which is hosted on the prisma server

`prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
# secret: ${env: PRISMA_SECRET}
hooks:
  post-deploy:
      - graphql get-schema -p prisma
```

#### How can we update our info to our prisma server?
* In order to do that you need to **deploy it**
    -  And after the deploy is done the prisma server will return to us what is called a `graphql schema` (_and that is why we need a post deploy hook that will pull down that schema for us_)
    -  What does the Prisma post deploy hook do?
      +  It uses our schema to generate a graphql file with methods we can use to expedite creating complex websites and creating an ORM to map to our database (without having to writing complex SQL)
* It is in the `src/generated/prisma.graphql`
* **note** `yml` files use tabs and intents to relay information about the structure of content and do not use curly braces or parenthesees

### datamodel.prisma
```
type User {
  id: ID! @unique
  name: String!
}
```

* This is the default schema as to how everything looks
* We will build our GraphQL schema using this file

### Deploy Data Model to the Prisma server
* That is running on `prisma.io`

`$ prisma deploy`

* That will take everything in your `prisma.yml` file and deploy it
* Your output will look similar to this:

![terminal output after deploy](https://i.imgur.com/HznTZ08.png)

* You will see:
  - Creating stage `dev` for service a`cme-prisma-service`
  - Deploying service `acme-prisma-service` to stage `dev` to server `prisma-us1`
  - You will see all the changes
    + This just outputs your User schema and fields
  - It will generate `src/generated/prisma.graphql`
    + Open it up and see all the code that was created
    + This is code that you will use and will save you tons of development time
  - You will also see you're HTTP endpoint
    + `https://us1.prisma.sh/phowley/acme-prisma-service/dev`
      * View this in the browser and it will take you to Playground
      * But this time click on the `SCHEMA` tab and now you will see all the code you will see in your generated `prisma.graphql`

## Let's see what it looks like in prisma.io
* Log in
* You will see now that if you refresh your browser on prisma
* Refresh browser and click `Skip` button
* You now will see a new service called `acme-prisma-service`

XXXXXXX
![acme prisma service](https://i.imgur.com/GxhEwKc.png)

* Click on it and you will have access to the Data Browser
    - It will show you all your users
    - As we add to this you will also see
      + All their cart items
      + All orders created
      + All the items
      + All the orderitems
    - You can click on `Metrics`
    - You can click on `Playground`
    - You see the `HTTP Endpoint` and `WS Endpoint`

## Add a field to our GraphQL
* We'll add an `email` field

`backend/datamodel.prisma`

```
type User {
  id: ID! @unique
  name: String!
  email: String!
}
```

* We just added to our `datamodel.prisma` so we will need to deploy again but before we do let's talk about GraphQL

## GraphQL jargon:
* `email` is called a **field**
* `User` is called typed
* `String` is how we say which type
* `!` means required

### Different `types` in GraphQL
* `Int`: A signed 32-bit integer
* `Float`: A signed double-precision floating-point value
* `String`: A UTF-8 character sequence
* `Boolean`: true or false
* `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache
    - The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human-readable
* [String!] - If you want an array of something put it inside `[array goes here]`
    - You could require it be a String and and an array of Strings with `[String!]!`
* `@` are called directives in GraphQL and you can put them on anything you want
    - We can use @name, or `@unique` or `@relation` or `@default` or `@rename`

### **note** Prisma gives us `datetime` type for us
* Which is automatically added to the `User` for tracking when it was created, when it was last updated

### Add a deploy script
* We add this to make our lives easier

`frontend/package.json`

```
// MORE CODE

"deploy": "prisma deploy"
},
"dependencies": {

// MORE CODE
```

* Now you can run that script with:

`$ npm run deploy`

* You will get a success message saying: 

`User (Type) - Created field 'email' of type 'String!'`

### The beauty of prisma.graphql
* Open `src/generated/prisma.graphql` and more code has be generated because you added an `email` field to your GraphQL schema
* This is the magic that is behind all of what Prisma is
    - Prisma creates this API
    - All of the API lives in `prisma.graphql`
    - Check out all the Mutations
        + It's all there
        + We don't have to create them
        + And we can use any of them
* `"""` three quotations is a comment in GraphQL
    - `usersConnection()` - We will use
        + Gives us how many users there are total
        + We have 1 data model with 2 fields and the file is over 2000 lines of code!

## GraphQL playground
* The terminal will output a link to your GraphQL playground
* **tip** Top open links from the terminal, click on link while holding down the `cmd` key

![links in terminal](https://i.imgur.com/XZBzAeB.png)

### This is what the Playground looks like
![sample GraphQL GUI](https://i.imgur.com/dmOR0wS.png)

* Click `SCHEMA` to see all different queries

![mutations queries GraphQL](https://i.imgur.com/htgsYRE.png)

### Let's play around in the GraphQL GUI
* Grab all users in DB and tell me their `id` and `name`
* Copy the below GraphQL code and past on the left side of the Playground GUI

```
query {
  users {
    id
    name
  }
}
```

* Click the **arrow play** button
  - This will output the following
    + We currently have no users so our users table is empty

```
{
  "data": {
    "users": []
  }
}
```

## Create a user
* This will be a `Mutation`
* We expand the SCHEMA and see the documentation for `createUser` and see that it takes an argument of `data: UserCreateInput!`
    - You expand that and see that you will need to pass a `name` and `email`
* We **create a new tab** in the GUI

```
mutation {
  createUser(data: {
    name:"bob"
    email:"bob@bob.com"
  })
}
```

* But we get a **red error** saying we need subfields
  - Why are we getting this error?
      + This means we need to tell it what data we want back
* I want the `name` and `email` returned back to me

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
1. Query it using our Playground GUI

![users returned in Playground](https://i.imgur.com/i5atEXC.png)

* We can reuse GraphQL queries in tabs GraphQL GUI

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

2. Use our Prisma dashboard
  * You may need to refresh (it tends to spin forever, just use `cmd` + `r`)
  * This is great because we can easily edit the data in here (_just double click to open Edit Modal, make changes and click Update Node to save your changes_)

![prisma.io dashboard user](https://i.imgur.com/Z9zEa0e.png)

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
* We want to know `pageInfo`
    - `hasNextPage` and `hasPreviousPage` (_used for pagination_)
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

## Problems with our GraphQL Playground
* Anyone that has access to this URL can manipulate our site data which obviously for security reasons **is a bad idea**
* So we won't be interfacing with this directly and instead will work with our Yoga server

## Resources
### What are environmental variables?
* They allow you to set variables based on the environment
    - You have development and production and staging
    - Each of those environments might contain sensative info and values that need to change depending on what environment you are in
        + You may have a different MongoDB URI for dev, staging and production
        + Maybe that endpoint for our GraphQL will change when we head to production
* We will create `.env` and in that file we will place sensative information that we NEVER push to github (or anywhere the public can see)
* We will have a `.gitignore` that will ignore all `.env` files
* We will name it `.env`

##  If you need to customize working with prisma (Optional):

`$ prisma --help`

* But we can get more specific with our help since we are using `prisma deploy`

`$ prisma deploy --help`

## Limit on Prisma sandboxes
* Limit to 10 requests per 10 seconds
* If you do more than that it will queue them up
* This works in development but won't work in production
* So you can't use the Demo for production

### Add grapqhl syntax plugin for VS code
* Install `GraphQL Prisma` package for VS Code
