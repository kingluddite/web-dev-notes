# MongoDB Setup
We have two options

## Database as a service
DBaaS

## Use MongoDB and host ourself

### mLab
[website](https://mlab.com/home)

* Signup
* Verify Email
* Free plan for developers
    - Only get one Database

1. Create new deployment from scratch
2. Select AWS
3. Choose AWS US East
4. Single-node
5. Sandbox
6. MongoDB version 3.2.x(MMAPv1)
7. Database Name - `retail-apocalypse`
8. Create
9. Will take 10 seconds to set up
10. When ready, click it

## What is our connection string?

### variables.env
* Rename `variables.env.sample` to be `variables.env`
* Replace `DATABASE=mongodb://user:pass@host.com:port/database`
* With what **mLab** gives us

## Create a user for your Database
* We need to add a username and password
    - Click `Users` to add a new Database user
    - Enter a username and password and plug that into DATABASE string
        + Your username should not be an email address
    - something like 

    `DATABASE=mongodb://deh2admin:R7J2JVpzj^jcZ1Zz%s#i@ds147551.mlab.com:47551/retail-apocalypse`

    - This will allow us to connect to our remote mongodb

### How do we know if our MongoDB connection works?
* Use a MongoDB GUI

#### MongoDB Compass
* [MongoDB Compass website](https://www.mongodb.com/download-center?filter=enterprise#compass)
    1. Choose latest beta and OS
    2. Download and Install
    3. Open MongoDB Compass

## Cool Copy Paste Trick
* Copy Database line from `variables.env` and Mongo Compass will tell us they know we just copied something and we say yes to the popup and it will autopopulate the Connect to Host page
* Create a favorite to easily select next time you use Compass
* Test the connection and it should work
    - The copy and paste is buggy so make sure your username and password are correct, you'll know if you screwedup if you can't connect

#### MongoDB Atlas
* Other free Mongo DB plan
* [website](https://www.mongodb.com/scale/mongodb-hosting-free)

### Get MongoDB on your computer
* We could also use MongoDB locally on our computer
* If we wanted to this is how we would run mongoDB locally

`$ brew update`

`$ brew upgrade mongodb` (Want >= 3.4)

* [autoupdate brew](https://github.com/DomT4/homebrew-autoupdate/commits/master)

## How do we start up mongodb?
`$ sudo mongod`

* Nice to have it running it its own terminal tab
* Connect locally
    - MongoDB Compass
    - localhost (_hostname_)
    - (_Leave at defaults from new connection_)
    - Connect and you'll see all your databases you have locally

