# MongoDB, Atlas & Compass Setup
* MongoDB noSQL
    - noSQL Database's are fast and scalable
    - The structure
        + We use Collections
        + In those collections we have `Documents`
        + Each record is formatted like JSON data
            * Curly braces
            * Key/value pairs
            * You can have different data types in the JSON structure

## Mongo Atlas
* Is a cloud Database
* It is a version of MongoDB that runs in the cloud as opposed to running on your local machine
    - You could install it locally
        + But then you run into all the different OS' developers could be using
        + The cloud Database is easier to manage
            * We can use it in deployment in development and production
            * Create a production and developer remote Database
* We'll use Compass to connect to our remote Database (or local Database)
    - It is an GUI for working with our remote Database
        + Similar to pgAdmin, phpMyAdmin for MySQL

## Register for Atlas
* Try for free
* Register
* Login
* Create a cluster
* Choose a Provider (AWS)
* Free Plan
* Cluster Name - Call it Kingluddite
* Create Cluster

## Add a new user
* New username and password
* Choose default options "Read and write to any database"
* Free tier has one permanent user and all other users are temp only for up to a week.

## Network Access
* Click Network Access under security
* We can limit which server, computers or IP addresses can access this Database (or can connect to it)
    - Not limit what can connect to our app
    - But who can connect to the actual Database and use it in their application
    - Click Add IP address
    - Click Add Current IP Address
        + Keep your IP address save from prying eyes
        + Once added click confirm

## Click on Collections tab
* If you had any data in Database you can see it here

## 3 ways to connect
* Click Clusters > Connect
    - Connect with mongo shell
    - Connect your application
    - Connect using MongoDB Compass

## Install Compass
* [mongodb.com](https://www.mongodb.com/)
* Click on Software > Compass > Try it now > Download and standard install
* Open it up
* Click New Connection 

## It is finicky
* It may pick up and you can paste in but maybe not
* past compass string in and paste password
* Save remote password in env for safekeeping

## Next - Install Mongoose
* That will be our abstraction layer to create a Database
* We'll create models
