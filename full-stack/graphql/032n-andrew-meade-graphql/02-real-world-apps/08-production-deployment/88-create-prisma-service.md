# Create a Prisma Service
## We need to get 3 things accomplished to make our site live in Production
1. A place to host our Production Database
2. A place to host our Prisma docker container
3. A place to host our Node.js application

## We will build the above 3 needs using 2 Services
1. Heroku (free)
    * We will use Heroku to:
        - Host our Database
        - Host our docker container
        - Host our Node.js app
2. Prisma Cloud (free)
    * Will make it really easy to manage those Heroku/Prisma instances
    * We won't have to do anything fance to get the Database and container setup as Prisma Cloud will handle that for us

## We already used Heroku and set that up

## Now let's introduce Prisma Cloud
* [prisma.io webpage](https://www.prisma.io/)
* Log in with your Github

## 3 Main Pages on Prisma Cloud
1. Services
2. Servers
3. Settings (basic account Management)

* We will be focusing on Services and Servers
* We will create a single prisma instance
    - We will take that container
    - And we'll deploy it to Heroku
    - This will give us something similar to what we have locally `localhost:4466`
    - **note** We will only create a single server
        + But you can have as many services as you want
            * We created prisma
            * We also created the prisma-review-website
            * (We didn't create another docker container for each as they uses the same docker container - they were both using the exact same server)
                - This was possible because inside our Database we had our data organized into:
                    + default$default
                    + reviews$default
                - Inside of our Database under Schemas we had our data organized
                    + Under default$default we had all of our data for our "default" service at the "default" stage
                    + Under review$default we had all of our data for our "review" service at the "default" stage
    * So ------> We will have one server and multiple services

## Create a server
* By default you will have 2 default servers that you can not manage or access
* Create a brand new server
    - You need a unique name and description and "Create Server"
    - Create a new Database (only works with Heroku now)
        + Connect to an existing account that you have
        + Select PostgreSQL (only one supported now) and "Create Database"
* Click "Set Up A Server"
    - Choose Heroku
    - Click "Create"
* Once this server is created we are all done
    - We can discover how Prisma Cloud will help us
    - The server takes a bit longer but when done we will be able to see both the Database and the server over on the Heroku account and we'll even be able to connect to our production Database using pgAdmin
* Click "View the Server"
    - You will see your new server
    - Click on it and you will see the Server and the Database (both hosted on Heroku)
        + Server
            * We just completed #2 Host our Prisma docker container
        + Database
            * We just completed #1 Production Database

## We still need to do 2 things:
1. Deploy our code to that prisma container
2. Do stuff with our Node.js app

### Connect to our Prisma production Database via pgAdmin
1. Head to pgAdmin
2. Right click Servers list
3. Select Create > Server
4. Name it Heroku Production Database
    * Under Connection tab
        - Fill out connection details via heroku
    * In Prisma Cloud click the view on Heroku for Database
        - That takes us to that Heroku application
        - Click Heroku Postgres
        - Click Settings
        - Click View Credentials
            + Copy Host name/address and paste into pgAdmin
            + Copy Maintenance Database and paste into pgAdmin
            + Copy Username and paste into pgAdmin
            + Copy Password and paste into pgAdmin
            + Check Save Password checkbox
            + Click Advanced and enter Database name beside `DB restriction`
            + Click "Save"
    * Open Database in pgAdmin and you will not see our Database schema yet
        - We don't see default$default or default$prod yet because we haven't added any services yet and we haven't deployed prisma

## Recap
1. We signed up for Prisma Cloud (Just a service that makes it easy to host your prisma apps)
    * Easy in that:
        - It directly integrates with Heroku
        - It manages all the setup for us so we don't have to
        - It gives us all the tools we need to deploy new versions and manage our various services

### Is Prisma Cloud a requirement for hosting Prisma
* We also don't have to use Heroku or Prisma Cloud - it is just a user friendly stack

### What do I need to host Prisma apps?
* A hosting services that supports docker containers
    - AWS/Heroku/Digital Ocean
* Need a service that gives you a Postgres Database

## Next
* Focus on making changes to our project so we can get one of our services deployed and then we'll be able to interact with our Database (reading/writing from/to a production Database)

