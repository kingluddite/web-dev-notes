# Using Boilerplate
* We don't want to modify the `boilerplate-graphql` directly because we want to keep that around as an easy starting point
* Duplicate as `okta-apps`

`$ cp -R graphql-boilerplate okta-apps`

## Work with our config
* We can no longer use `default/default` as it is already taken

`config/dev.env`

```
PRISMA_ENDPOINT=http://localhost:4466/okta/dev
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cYiQH
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

`config/test.env`

```
PRISMA_ENDPOINT=http://localhost:4466/okta/test
PRISMA_SECRET=9onYgi2qGslmPymd9myB0aaaH9EarBXW
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2Wz8
```

## Deploy both of those to test and dev environments
### dev
`$ cd prisma && prisma deploy -e ../config/dev.env`

* Now when we run the above it will go through the real deployment process
* It will set up the new `service` and new stage
* You will see all this in the **success output**

#### Output from dev deployment
```
Deploying service `okta` to stage `dev` to server `local`
```

* You will see the User type was created

## Now we'll deploy to test
`$ prisma deploy -e ../config/test.env`

### Output in Terminal
```
Creating stage test for service okta ✔
Deploying service `okta` to stage `test` to server `local` 10.1s

Changes:

  User (Type)
  + Created type `User`
  + Created field `id` of type `ID!`
  + Created field `name` of type `String!`
  + Created field `email` of type `String!`
  + Created field `password` of type `String!`
  + Created field `createdAt` of type `DateTime!`

  Applying changes 59.8s

  Your Prisma endpoint is live:

    HTTP:  http://localhost:4466/okta/test
    WS:    ws://localhost:4466/okta/test

  You can view & edit your data here:

    Prisma Admin: http://localhost:4466/okta/test/_admin
```

## Now we're ready to move on
`$ cd ..` - move out of **prisma** folder

`$ clear`

## Get our app up and running both test and dev environments
### Install all our dependencies
`$ npm i`

* When that completes we need to get a correct generated file

### Get a new version of `src/generated/prisma.graphl`
* **note** We have a `package.json` script to get this done

`package.json`

```
// MORE CODE

    "get-schema": "graphql get-schema -p prisma --dotenv config/dev.env"
  },
  "jest": {

// MORE CODE
```

* **remember** The `get-schema` script will grab the URL from the `.graphqlconfig` file

`.graphqlconfig`

```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "prisma": "prisma/prisma.yml",
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}
```

* We need to switch this over to the correct one from our `dev` environment which is `okta/dev`

`config/dev.env`

```
// MORE CODE

PRISMA_ENDPOINT=http://localhost:4466/okta/dev

// MORE CODE
```

* So we update our **.graphqlconfig** `endpoint` to:

`.graphqlconfig`

```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "prisma": "prisma/prisma.yml",
        "endpoints": {
          "default": "http://localhost:4466/okta/dev"
        }
      }
    }
  }
}
```

* Now we can run the `get-schema` script in `package.json` (make sure you are in the root of your project)

`$ npm run get-schema`

* This will fetch the brand new schema making sure that we can actually use that
* If you get

```
⚠ Cannot use GraphQLSchema "[object Object]" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.
```

* Run `$ npm i grapqhl-cli@2`
    - For more info read my troubleshooting file in the root of these notes

## If all works as expected you will see this (in the terminal):
`project prisma - Schema file was updated: src/generated/prisma.graphql`

![schema updated](https://i.imgur.com/g52QIy0.png)

* Now we should have lots of updates and changes since the last time we ran that command we also had the comment and post types in place

## Run our app in the test environment
`$ npm run test`

* When jest runs nothing will run because no files have changed

### Force Jest to re-run things with `a`
`$ a`

* And we do this to make sure everything is set up as we expect

## README

# GraphQL Boilerplate
* Use this to start all your GraphQL projects using Node.js

## Requirements
* Node.js
* Prisma Cloud
* GraphQL
* Graphql-Yoga
* Apollo
* ApolloBoost
* Jest testing Library
* Heroku
* Heroku CLI

### Optional (Recommended)
* Postgres Database
* pgAdmin

## Installation Instructions
* Clone repo

`$ git clone git@github.com:kingluddite/graphql-boilerplate.git
acme`

* Install dependencies

`$ npm i`

* Create a config folder in the root of your project
* Create 3 files inside the `config` folder
  - dev.env
  - prod.env
  - test.env

* Here is what the contents of each file should have
* Replace the secrets and add new URLs

`dev.env`

```
PRISMA_ENDPOINT=http://localhost:4466/acme/dev
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cabc
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2abc
```


`test.env`

```
PRISMA_ENDPOINT=http://localhost:4466/acme/test
PRISMA_SECRET=FBx6inXejHiMX7W6KLvXQwxWqP7cabc
JWT_SECRET=sb79UOmzQc9ajhX7pR9S4l5jnBnX2abc
```

`prod.env`

```
PRISMA_ENDPOINT=https://acme/prod
PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuat2zC
JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wjUU
```

### Deploy to your dev environment
* When you deploy make sure you are inside the `prisma` directory

`$ prisma deploy -e ../config/dev.env`

### Deply to your test environment
* When you deploy make sure you are inside the `prisma` directory

`$ prisma deploy -e ../config/test.env`

###  Generate your schema
  - You first need to update the endpoint in `.graphqlconfig` with the
  environment you are working in
  - As an example if I my dev URL is `http://localhost:4466/acme/dev` my `.graphqlconfig` would look like:

`.graphqlconfig`

```
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "prisma": "prisma/prisma.yml",
        "endpoints": {
          "default": "http://localhost:4466/acme/dev"
        }
      }
    }
  }
}
```

* Then run the **get-schema** script inside `package.json` with (Make sure to run this in the root of your project):

`$ npm run get-schema`

* That will generate all your prisma GraphQL

## Testing
* To run Jest testing
* Add any tests you need for your project

`$ npm run test` (press `a` to run all tests)

* You should start with 1 Test Suite passing and 5 tests passing (all tests are for users as authentication is built into this boilerplate)
* Shut down testing environment with: `ctrl` + `c`

## Start up the development environment
`$ npm run dev`

### View GraphQL Playground
* `http://localhost:4000`
  - You should now see updated Schema (Queries and Mutations)
  - Fire off a query mutation in GraphQL Playground

```
query {
  users(orderBy: createdAt_DESC) {
    id
    email
    updatedAt
  }
}
```

* You should see an empty array of users returned (we have no users yet)

## Now get them up and running in production
* Let's assume you will be using Prisma Cloud to create a new server
* Set up an account
* Add a server and service to get your PRISMA_ENDPOINT
* You will need to update your `docker-compose.yml` file with your postgres Database info

`config/prod.env`

```
PRISMA_ENDPOINT=https://kingluddite.com/acme/prod
PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuatabc
JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wabc
```

* Now we'll deploy our prisma acme backend (make sure to run inside `prisma` folder)

`$ prisma deploy -e ../config/prod.env`

* After running this you should see the brand new service and stage set up

## Deploy Node.js app
* We will use the Heroku CLI

1. Create a new app
2. Set up the environment variables
3. Push our code up to Heroku

* Make sure to be in the root of your application

`$ heroku create`

* This will create a repo on Heroku that you can see with `$ git remote -v`
* Set up your prod.env variables up on Heroku

`config/prod.env`

```
PRISMA_ENDPOINT=https://kingluddite.com/acme/prod
PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuatabc
JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wabc
```

```
$ heroku config:set PRISMA_ENDPOINT=https://kingluddite.com/acme/prod PRISMA_SECRET=z9tD9OI9G6eaI0fNriqLtXO1rKuatabc JWT_SECRET=pj5uEjRvxrV62oQHxN0jPb23PpL1wab
```

* **note** Make sure to include spaces between the environment variables you are setting on Heroku using the Heroku CLI
* You may need to login to Heroku first (Read the Heroku CLI docs if you are stuck)

#### Confirm you set the environment variables
`$ heroku config`

### Run git to add and commit
`$ git commit -am 'Setup acme project'`

## Push up to heroku

`$ git push heroku master`

* This will push your code up to heroku and also go through the deploy/build process
* After it runs click on the URL to see your heroku app
    - It will take you to a GraphQL Playground for the acme app you just created
    - Pop open your Schema
        + You now can fire off the same queries and mutations that you would be able to fire off in dev or test
        + Add as you want to build any app
