# Deploying a Prisma Server to Heroku
* We have three different pieces we need to manage

1. Prisma Server
2. Yoga Server
3. React App

* **Normally** you have one (1) server side app and you push it live and you're done
* Or you may have (2) deploys
  - A REST backend API
  - And you have a React app on the frontend
* But in our Case we have three (3)!

1. Prisma Server
    * This also needs a MySQL db
    * And this is where we deploy our schema to
2. Yoga Server
    * This has our Mutation and Query Resolvers
3. React App
    * This is a Node server that runs `next.js and that's to make sure we can do all our server side rendering

## Time to concentrate
* This can be [SooperDooperLooper](https://www.youtube.com/watch?v=krakK7sVDsA) confusing. So pay attention :)

## Sign up for Heroku
First thing first make sure you [sign up for a free Heroku account](https://signup.heroku.com/login)

* When you created your dev server you already created your dev server

## First, let's get our Prisma Server up and running
* We'll use Heroku
    - It will support both frontend and backend
    - Prisma has tight integration with Heroku

### Sign in to Prisma
* Prisma gives you development servers and you can't use them in production
* You have to host your own
    - But you can use the Prisma dashboard to manage the data and interface with your Prisma
    - You have the ability to `Add a Server`
    - You also have the ability to create a Hosted Server and put in your own MySQL info into it

### Click on Add a Server
**note** As we do this keep in mind that we are using `prisma.io` to communicate with `heroku`, so when all this is done, you can also log into Heroku and see that it has set up a production server

* Create a server

![create a server](https://i.imgur.com/NOHrS9n.png)

* Server Name: `acme-production`
* Server description: `Production site for Acme Ecommerce App`
* Click `Create A Server` button

### Set up a db
* You can connect to an existing db
* You can create a new db
* Click on `Create a New Database`

![create new db](https://i.imgur.com/TZ1GenJ.png)

* Choose Heroku (Supports PostgreSQL)

![choose Heroku](https://i.imgur.com/FWQuBZr.png)

#### Sign in with your Heroku account

![sign into Heroku](https://i.imgur.com/cyt34Vt.png)

* Click on `Connect to a new Herokue account`
* Log in
* Click `Allow` to allow permissions

### Create a new database
* `Database type:` Only PostgresSQL now (but will have others in future)
* `Database region:` US (Virginia)
* `Plan:` Free

![db plan](https://i.imgur.com/cyt34Vt.png)

* Click `Create Database` (takes a few moments)
* DB created!

## Now set up Server
* Click `Set Up A Server`
* We'll also use Heroku for this
* Click `Heroku`

![set up server](https://i.imgur.com/wdRTBtZ.png)

![free plan](https://i.imgur.com/uhWNzV7.png)

* **note** If you were not going through this dialog
    - You would need to set up a MySQL db (or get one from AWS)
    - Also set up a server that is going to sit on top of your DB
* Click 'Create Server' Server (takes a few moments)
* Click `View the Server`
* Now you can view your Prisma server in the Prisma Console
* If you get a green "healthy" dot you can view it

![servers set up](https://i.imgur.com/dLyOKjD.png)

### Now view Services link in Prisma
* You will see we have our Server but we do not have the Services
* If you click on Services you won't see it
  - We currently only have a dev services
  - Now we need to deploy our application to this service

### Normal Deploy
* We normally deploy like this:

`$ npm run deploy` - and that will deploy to our development site

### New way to deploy feature (make sure you are in the `backend` folder)

`$ npm run deploy -- -n`

* `--` tells **npm** to append the following things to the command that you are about to run (_and we are appending the `-n` to the end_)
* You will get these choices after running:

![choices for server](https://i.imgur.com/by37VAV.png)

* **Select the production** `db` we just created (my db is `pip-5a52b7/peh2-production`)
* **Choose a name for your service** - I'll call this `acme-service-production`
* **Choose a name for your stage** - `prod`
* Hit `enter` and it will push everything up
* Visit `prisma.io` and you will see your prod app listed under services (congrats you just added the service)

## But there is no data!
* But you do see our schema has been pushed up to Prisma
  - CartItem
  - Item
  - Order
  - OrderItem
  - User

## prisma.yml
```
#endpoint: ${env:PRISMA_ENDPOINT}
endpoint: https://XXXTHISISYOURNEWPRODENDPOINTXXX
datamodel: datamodel.prisma
secret: ${env:PRISMA_SECRET}
hooks:
  post-deploy:
      - graphql get-schema -p prisma
```


* We will comment out our old endpoint
  - And now add our new production endpoint
      + **note** This was added automatically by prisma!!
* But now we need to use a secret **so comment in your secret in**
* And then re-deploy

`$ npm run deploy`

* Don't use the `-n` as we are not creating something new
* Now we just deployed our backend to heroku
    - This is one way (and fairly easy)
        + This will be the most straightforward way to deploy the backend
    - Alternatives
      + You can host your own
      + You can use Docker images
+ We now get "Your Prisma GraphQL database endpoint is live"
  * And it is located and was just created on Heroku
  * Open the URL and you will see there is no Schema available yet
    - If you click Schema it just spins endlessly

## Next - We need to add our Yoga Server

## Resources
* Let's view all commands

`$ prisma deploy --help`

```
Flags:
           -d, --dry-run    Perform a dry-run of the deployment
 -e, --env-file ENV-FILE    Path to .env file to inject env vars
             -f, --force    Accept data loss caused by schema changes
              -j, --json    Json Output
               -n, --new    Force interactive mode to select the cluster
               --no-seed    Disable seed on initial service deploy
```
