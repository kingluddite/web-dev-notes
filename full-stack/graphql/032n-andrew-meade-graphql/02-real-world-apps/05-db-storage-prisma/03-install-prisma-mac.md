# Install Prisma Mac
## Set up DB
* We will use Postgres
* Postgres is SQL DB and pairs great with GraphQL
* SQL DBs in general pair well with GraphQL because with GraphQL you have to be explicit with the exact fields and type definitions for those fields
* (later we will install Prisma with MongoDB) - Any DB will work because at the end of the day Prisma abstracts that DB away

### Get Postgres
* We will use the free Heroku plan

1. Log in to Heroku
2. Create a new application
3. Name: `pip2-prisma-dev-server`
4. Keep region same
5. Don't touch pipeline
6. Click `Create app`
7. Click Overview (we are going to install addons)
8. Click `Configure Add-ons` link
9. Search for Heroku Postgres
10. Click on Heroku Postgres link
11. Select Hobby Dev - Free
11. Click `Provision`
12. Click `Heroku Postgres` in Addons list
13. Now we need to enter our credentials that will allow us to connect to this DB
14. Click `Settings` tab
15. Click `View Credentials`
16. This is the info we need to connect to our newly created Postgres DB from the outside world
17. Now we're done setting up our DB, we won't be using anything else with Heroku, we just need these credentials

## Our DB is created
* We are ready to connect to it

## pgAdmin
* This is the GUI interface for Postgres
* It will help us manage our DB
* Google 'pgadmin'
* Download pgAdmin 4(macOS) - dmg file
* Run through install accept defaults
* You should be able to find it in your applications folder
* Search for pgAdmin version for in your finder and open it
* It will open in a new browser tab

### Add a new server
1. Click `Add New Server`
2. Match up name with name you gave your Heruku app
    * Not required but makes logical sense
    * Name: `pip-prisma-dev-server`
3. Switch to the connection tab
4. Copy host from heroku and pasted to `Host name/address`:
5. Copy Database to Maintenance databse
6. Copy User to Username
7. Copy Password to Password
8. Check Save Password (this will save you from having to enter the password every time you connect to this DB on pgAdmin)
9. `Save` connection

![DB pgAdmin Settings](https://i.imgur.com/7qx11Ez.png)

* Adapt the settings to your specific credentials

![DB credentials](https://i.imgur.com/uh6xUrr.png)

### Open DB in pgAdmin
1. In sidebar expand your named db `pip-prisma-server`
2. Things get tricky - you will see every db on this shared cluster
3. You can't access any but your DB
4. Copy your DB name use finder on page to search quicky and find it (there are usually over 2000 DBs so this is a good time saving tip)
5. When you find it you will see it does not have a red X which means we can connect to it

![DB in pgAdmin](https://i.imgur.com/QzX36du.png)

## That's it
* We have our Postgres DB set up on Heroku
* We have a GUI interface setup to help use it

## Install [Docker](https://www.docker.com/)
* Docker is a dependency of Prisma and if you want to use Prisma on your machine you need to install Docker
* There is a lot ot Docker. We are using a small feature set of Docker

### What is Docker?
* It is part of the containerization and virtual machine movement
* So we are building up our applications
    - I have my application code and I have my dependencies
    - I need to run on linux and need Git and Node.js installed
    - I have two options
        + Choose to allow people who want to run the application to install all of those things and cross our fingers and hope it works on their environment
        + Or we can bundle it all up into a container, a container in essence is a little virtual machine that can be executed anywhere Docker is supported (good news because Docker is almost supported everywhere - whether it is Mac, Windows or Linux, you can run Docker containers regardless of what tools or dependencies they need
            * You don't have to slow down and install a whole bunch of stuff on your machine for every applications, instead you just run the container, it is very easy to stop containers, to delete them, to free up all of that space without trying to remember all of the dependencies you had to install
            * Docker is a better way to manage apps

### There are two sides to Docker
1. There is the person creating the application and creating the container
2. There is also the person who is using the container to run the application (that is the side we are on). So we don't need to learn about the ins and outs of Docker because we are just a user of Docker. We are trying to run a container provided by somebody else

#### Install Docker (approx 1.8 Gigs)
* [install Docker](https://www.docker.com/get-started)
* You have to sign up for a free Docker account to download Docker
    - Verify account with your email
* Search for [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) (CE - Community Edition)
* Click `Get Docker`
* Download and Install (accept defaults)
* Drag Docker into Applications

![docker drag to apps](https://i.imgur.com/DdxjHzO.png)

* Open Docker
* When you do you won't see anything, but it did start up


## Drop Database
* Right click on sidebar under servers and click `DROP`
* Click on whale icon and it will give you the status of Docker
* It will start as orange saying "Docker is starting"
* After a minute it will turn green, "Docker is running"

## Summary
* You have a Postgres DB
* You have a GUI for Postgres called pgAdmin
* You have installed and started a Docker container
* Everything is now installed to use Prisma

## Next
* Install and run our first Prisma Application


