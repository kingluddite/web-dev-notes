# Intro to MongoDB
* We don't just want to send data to the server and then do nothing with it
* We want to send data to the server and store it in a Database
* We also want to retrieve it from the Database and send it back to the client

## MongoDB is popular choice with NodeJS and Angular 2 apps

## Set up MongoDB locally
* Test and work with it

## Install MongoDB
* Download and extract it
* Launch `MongoDB` server this will allow Database operations
    - You need to keep this server running
    - If you get an error about MongoDB, maybe `MongoDB` stopped running and you need to restart it because NodeJS can't connect to it
* You need to launch the client
    - To Interact with the Database
    - We can directly issue CRUD commands
    - We can use the MongoDB shell that comes with MongoDB
    - Most of the time our client will be our Node Application connecting to the server

## Setup `MongoDB`
* [Mongo Website](htts://www.mongodb.com)
* Download and install MongoDB (Community Server)
    - The program from Mac
    - Extract
    - Inside all the files you need will be inside the `MongoDB` `bin` folder

### Start server using
![start `MongoDB` server](https://i.imgur.com/Xk9dXt9.png)

`$ mongod`

### Start client with this executable
![start client](https://i.imgur.com/UdZQYmR.png)

`$ mongo`

* You can move `MongoDB` folder to where you want on your mac
* To Install on Mac OS you need to [follow this steps](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) (from documentation)

### Most important steps
#### Create the data directory
`$ mkdir -p /data/db`

* This is the directory holding the actual data
* Before running `mongod` for the first time, ensure that the user account running `mongod` has read and write permissions for the directory

### Possible Error message
**"Unable to create/open lock file: /data/db/mongod.lock errno:13 Permission denied"**

* The directory you created doesn't seem to have the correct permissions and ownership
* It needs to be writable by the user who runs the MongoDB process

`$ sudo chmod 0755 /data/db`

## Start MongoDb server
1. Go to where you installed MongoDB
2. `$ cd bin/`
3. Start `MongoDB` server with `$ ./mongod`
4. This starts the server
        - Keep it running as long as you are working on your project

### Putting `MongoDB` on path
* If you do this you can start `$ mongod` from any project folder you are working on
* I like installing `MongoDB` using `homebrew` because it sets this path up for me automatically

## To start shell client
* You can do it directly from within `MongoDB` folder using `$ ./mongo`
* Or if in path you can run it inside any project

`$ mongo`

### Use Database
`$ use NAMEOFYOURDATABASE`

#### We will create a Database named `node-angular`
* Make sure `mongod` is running first (one Terminal tab)
* Then start up `mongo` (another Terminal tab)
   - Then inside `mongo` type:
    - `$ use node-angular`

![switched to node-angular](https://i.imgur.com/JV81efC.png)

##### Other useful Mongo commands
`$ show collections`

* Show all documents in a collection

`$ db.messages.find()`

## Mongoose
* We could work with just MongoDB and NodeJS
* MongoDB ships its own client we can use in NodeJS
    - Client is what connects to the `MongoDB` server

![client connects to `MongoDB` server](https://i.imgur.com/p1tuS2h.png)

* We could download the Mongo web client from the MongoDB web page
* But then we would have to write all the access and query logic on our own
* We also couldn't use pre-built schemas on which we could verify our data properly
* So we won't use the default client
* We will use `mongoose`

## What is mongoose?
![diagram of mongoose](https://i.imgur.com/6PwEHMq.png)

* mongoose is more than just a mongo client
* It is a package which enables us to define:
    - Schemas
        + Stuff like:
            * User must have a first name that is a string
            * User must have a last name which is a string
        + Then we use this schema to create objects based on our model
        + And then directly on this object we just create we can execute CRUD methods 
    - Models

### Pros of mongoose
* We don't have to write our mongo queries from scratch
* We get this extra validation
* This is why people love using mongoose

## Using Mongoose with NodeJS
### Install mongoose as a package
`$ npm i mongoose -S`

## Connect our app to mongoose
`/app.js`

```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');

var app = express();
mongoose.connect(PUTYOURPATHHERE);
// more code
```

### What is our Path?
![path](https://i.imgur.com/ThwkfgH.png)

* Our port is 27017

``mongoose.connect('localhost:27017/node-angular`);``

* With that we are connecting to our `MongoDB` server, through our NodeJS application using this mongoose package

```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');

var app = express();
mongoose.connect('localhost:27017/node-angular');
```

## Troubleshoot mongod errors
* `$ lsof -Pi | grep LISTEN`
* Kill the node process with extreme prejudice

`$ kill -9 $PID`
