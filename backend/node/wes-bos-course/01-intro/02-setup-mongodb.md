# MongoDB Setup
We have two options

## Database as a service
Dbas

## Use MongoDB and host ourself

### mLab
[website](https://mlab.com/home)

* Signup
* Verify Email
* Free plan for developers

1. Create new deployment from scratch
2. Select AWS
3. Choose AWS US East
4. Single-node
5. Sandbox
6. MongoDB version 3.2.x(MMAPv1)
7. Database Name - `oh-thats-good`
8. Create
9. Will take 10 seconds to set up
10. When ready, click it

## What is our connection string?
* Rename `variables.env.sample` to be `variables.env`
* Replace `DATABASE=mongodb://user:pass@host.com:port/database`
* With what **mLab** gives us
* We need to add a username and password
    - click `Users` to add a new Database user
    - enter a username and password and plug that into DATABASE string
    - something like `DATABASE=mongodb://deh2admin:R7J2JVpzj^jcZ1Zz%s#i@ds147551.mlab.com:47551/oh-thats-good`
    - This will allow us to connect to our remote mongodb

### How do we know if our MongoDB connection works?
* Use a MongoDB GUI
* MongoDB Compass - [website](https://www.mongodb.com/download-center?filter=enterprise#compass)
    - Choose latest beta and OS, download and install
    - Open MongoDB Compass
* Copy Database line from `variables.env` and Mongo Compass will tell us they know we just copied something and we say yes to the popup and it will autopopulate the Connect to Host page
* Test the connection and it should work
    - The copy and paste is buggy so make sure your username and password are correct, you'll know if you screwedup if you can't connect

### MongoDB Atlas
* Other free Mongo DB plan
* [website](https://www.mongodb.com/scale/mongodb-hosting-free)

### Get MongoDB on your computer
`$ brew update`

`$ brew upgrade mongodb` (Want >= 3.4)

* [autoupdate brew](https://github.com/DomT4/homebrew-autoupdate/commits/master)

## How do we start up mongodb?
`$ sudo mongod`

* Nice to have it running it its own terminal tab
* Connect locally
    - MongoDB Compass
    - localhost (hostname)
    - (leave at defauls from new connection)
    - connect and you'll see all your databases you have locally

