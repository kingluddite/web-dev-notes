# Installing MongoDB on Mac OS
## Homebrew install
* You could more easily install this using Homebrew
    - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition

## Manual Install
* Grab mongodb and install MongoDB Community Server
* **note** Installing on the cloud requires no installation
* [manual install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/)
* [download latest version](https://www.mongodb.com/try/download/community?tck=docs_server)
* Download and extract
    - What is inside is what we need to manage our mongodb server
    - The `bin` directory contains a bunch of executables to perform various tasks
        + The main one is `mongod` which we can use to start up the MongoDB server

## Move this directory
* We want to take this directory and move it to a more permanent location on our machine
* Rename the downloaded, extracted folder from the long crazy name to `mongodb`
* **Recommendation** Move the `mongodb` folder to your users folder (`/~`) aka your home directory

## Create a place for our data to be stored
* By default Mongo expects you to create a `data` directory at the root of your hardrive and inside `data` it expects a `db` directory
    - This is not ideal for many users as you will run into a ton of permissions errors
    - **Recommendation** It is much better to create a directory inside of your home directory (aka - your user's directory) to store the data

### Create new data directory
1. Navigate to your home directory
2. Create a folder called `mongodb-data`

#### Note
* We have two folder for mongodb in our home directory

1. mongodb - (contains the executables necessary to start things up and manage our Database)
2. mongodb-data - Is currently empty but will soon contain all our mongodb databases

## Run mongo
1. `$ cd ~`
2. `$ pwd`
3. That will spit out a path like `/Users/MYUSERNAME`
4. We will use that we will use in the command to start up mongodb

### Now let's run mongodb
* List out the path to the executable

`/Users/MYUSERNAME/mongodb/bin/mongod --dbpath=/Users/MYUSERNAME/mongodb-data`

* Run this command
* We'll get a ton of output
    - It initializes the Database and gets the Database up and running
* After it spits out all that data it will sit and wait
* Now it is waiting for connections to the Database where the connector can read and writer from the Database
    - Adding documents
    - Querying documents
    - Updating documents
    - Deleting documents
    - aka CRUD
* Look inside the `mongo-db` directory and it will now have a ton of information inside of it
    - **note** This is just to intialize things (there are no actual documents as we haven't created any yet)

## Congrats
* We have the mongodb server installed on our machine
* We know the command to get it up and running

### Import output
* Look at the running server in the terminal and in one line you'll see an important message `waiting for connections on port 27017`
    - This just lets you know that mongodb is up and running and 27017 is the default port that mongo uses
* Now that our mongodb is up and running we can connect to it from Node.js to start reading and writing data
