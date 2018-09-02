# Create and Connect to local mongodb
* There may be times when you need mongodb on your computer and not remotely like on mongodb
  - You may need this if you are on a plane and there is no internet
  - You can not access it because of internet security at work or at a public library
* If you want to do this is has more steps involved than setting up a remote mongodb

## Did you install mongodb?
* The easiest way is to use homebrew

`$ brew install mongodb`

## Create the folder that will hold all your local mongoDBs
* You will get a permission error if you don't use `sudo`

`$ sudo mkdir -p /data/db`

* Enter your Mac OS password to create the folders
* `-p` is what enables you to create a directory structure recursively

## mongod (mongo daemon)
* You won't be able to run this without giving proper write permission
* The problem is that the directory you created, `/data/db` is owned by and only writable by the `root` user, but you are running mongod as yourself
* There are several ways to resolve this, but ultimately, you must give the directory in question the right permissions
* **caution** If this is for `production`, I would advise you to check the docs and think this over carefully -- you probably want to take special care.
* However, if this is just for `testing` and you just need this to work and get on with it, you could try this, which will make the directory writable by everyone:

`$ sudo chmod -R go+w /data/db`

* or this, which will make the directory owned by you:

`$ sudo chown -R $USER /data/db`

## Start mongod
* Open the terminal to your app root folder

`$ mongod`

* If all goes well your mongod should run and keep running
* If it runs and stops with an error you may need to stop node

## Stop node
# Mongod troubleshoot
* Find what is running
`$ lsof -Pi | grep LISTEN`

* Kill the node process with extreme prejudice

`$ kill -9 $PID`

* Replace $PID with the number given for your instance of node running

## Update your variables.env

`variables.env`

```
MONGO_URI=mongodb://admin:a12345@ds219672.mlab.com:19672/peh2-they-came-before-me

MONGO_DEV_URI=mongodb://localhost:27017/they_came_before_me
```

* Now we have a mongoDB URI for local development
* You don't need a password or username for local mongodb
* **note** But if you use mLab and a free remote mongodb DB that does require a username and password

## Create separate file for db info
* Make sure you are in the root folder of your app

`$ mkdir db`

* Then create a `db.js` file

`db.js`

```
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGO_DEV_URI,
  {
    useNewUrlParser: true,
  },
  function(err) {
    if (err) {
      console.log('Failed connecting to MongoDB!');
    } else {
      console.log('You have connected to Mongo!');
    }
  }
);
```

* We include `mongoose`
* We include dotenv so we have access to our local environment variables
* We write logic to connect to our local mongodb or error to the log

## Open a new terminal tab
* We should now have `mongod` running successfully in one terminal tab
* Open another terminal tab and run:

`$ npm run dev`

## Success!
* You should see `You have connected to Mongo!` and that means we have successfully connected to a local copy of mongodb



