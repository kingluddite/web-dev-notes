# Prisma Configuration and Deployment
* The server is up and running
* We have our Database up and running to

## Last thing to do:
* Deploy our datamodel.graphql file to that server

## To do that - small changes to our app
* What happens when we run `prisma.yml`?

### How do we deploy?
`$ cd prisma && prisma deploy`

* Prisma looks at this file to determine what to do

`prisma.yml`

```
endpoint: http://localhost:4466
datamodel: datamodel.prisma
secret: donottellanyonethatthisismysecret
```

* Above is where it grabs the data model(datamodel.graphql) to send to the server
* It also grabs the server location itself (http://localhost:4466)
    - We've hardcoded the server location into the file
    - Every single time we run `$ prisma deploy` prisma will deploy to our local instance - to our docker container running on our machine
* Currently, there is no way to pick between our local docker container and the production docker container and THAT IS A PROBLEM

`$ prisma deploy` - tells us the service is up to day

## How can we fix this?
* We need a dynamic value for `endpoint`
    - We can then choose to deploy to production or development depending on our needs

### To do this we will create 2 configuration files
* We'll have 2 files
    - A development config file
    - A production config file
* Each file will have its own endpoint value
* When we run `$ prisma deploy` we'll load one of those 2 files in

### Create a new directory
* `graphql-prisma/config/dev.env`
* `graphql-prisma/config/prod.env`

#### Contents of our config env files
* Will be short (a couple lines)
* Will be in the form of `key=value`
* **important** DO NOT HAVE ANY STRAY SPACES OR EXTRA CHARACTERS! (this will affect the functionality of our program when we try to deploy)

`prisma/prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
secret: donottellanyonethatthisismysecret
```

`/config/dev.env` (root of your app)

```
PRISMA_ENDPOINT=http://localhost:4466
```

### Deploy and specify the environment
* Using the -e flag

`$ prisma deploy -e PATH_TO_THE_ENV`

#### Dev deploy
`$ prisma deploy -e ../config/dev.env`

1. It will first load in all the environment variables in `dev.env`
2. Then in prisma.yml it will inject those variables
3. Then it will deploy

## How do we deploy to production?
* We are no sure what URL value to put inside `prod.env`
* The answer is we will not put any value inside prod.env, instead we will let Prisma inject the URL for us

### Two steps to getting this done
1. Log into Prisma using the Prisma CLI
    * Not just anyone can deploy to our server
    * We have to first authenticate who we are

`$ prisma login` (from prisma folder)

* A new page will open, click the 'Grant Permission' button in the opened page (than close page)
* Then inside the Terminal you will see that you are logged into Prisma
* If a page doesn't open, just click the link in the Terminal

## Am I logged into prisma?
* Just log in again and it will say that you are "Successfully signed in"
* Now that we are logged in we now have access to that server we created

## Prod deploy time!
* We will tell prisma to use `prod.env` even though the file is completely empty

`$ prisma deploy -e ../config/prod.env`

* When we do this Prisma will try to inject all these variables from prod.env to prisma.yml
* Since there are no variables inside prod.env Prisma will think we have no URL at all when the file actually runs
* When this happens it will ask us to pick from a list of the servers we have and we will pick the one that we created
    - Pick that item and hit enter
    - Choose a name for your server (don't use the default 'prisma' name)
        + kingluddite-blogging-app
    - Choose a name for your stage (use prod)
    - After doing this Prisma tells us our endpoint and that it wrote this endpoint to `prisma.yml`
    - Then it will try to deploy to the server that Prisma Cloud created
        + This process takes time the first time around
        + When completed you will see similar output for when we deployed locally

## Fix the URL
* We don't want the URL hardcoded into `prisma.yml`
* Cut it and paste it into your `prod.env` file

`/config/prod.env`

```
PRISMA_ENDPOINT=https://kingluddite-blog-3736e1f779.herokuapp.com/kingluddite-blogging-app/prod
```

`/prisma/prisma.yml`

```
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.prisma
secret: donottellanyonethatthisismysecret
```

* Now when we deploy to production, it won't have to do what we first did to deploy
* Now we can easily deploy to production with:

`$ prisma deploy -e ../config/prod.env`

* And to deploy to development

`$ prisma deploy -e ../config/dev.env`

## Check out what we did on Prisma Cloud
* Under Servers nothing has changed
* But if we head to Services we now have a Service!

![new service on Prisma Cloud](https://i.imgur.com/d8661U2.png)

* We see our Service name, stage name, server name, status of Service and how many request we had (0 so far)

## Next - Practice with Service
* Read and Write to Service


