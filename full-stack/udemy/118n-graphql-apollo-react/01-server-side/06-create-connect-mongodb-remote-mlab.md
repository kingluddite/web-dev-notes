# Remote MongoDB
* We could use a `local mongo DB` but it is actually easier to set up a remote Mongo DB (as long as you have an internet connection)
* We will create our DB and hook it up to our backend

## Sign up for a free mLab account
* [link to mLab](https://mlab.com/)
* Sign up for a free sandbox account

## Create your remote MongoDB nosql database
1. Log in to
2. Create a MongoDB deployment by clicking on the `Create new` button
3. Select `Plan Type` of **SANDBOX** and click `CONTINUE` button
4. Where do you want your DB to be located, click the closest place to you (_I will select US East_) and click `CONTINUE` button
5. Name your DB - I'll name my `peh2-they-came-before-me` and click the `CONTINUE` button
6. Check to make sure everything is FREE and then click `SUBMIT ORDER` button
7. Click on your new database (takes a couple minutes to generate

## Create a user for this database
* It is required and the username and password of this special admin user will allow you and your app to access this database

1. Click `Users` tab
    * It is mandatory to create an Admin user for our DB
    * Enter a username, password and confirm password
    * Write down and save this information in a safe location
2. After creating user **scroll up on the page** (_ imo mLab needs to improve this UX_) and copy the 2nd URI
    * The first URI is what you would use if you wanted to connect to the mongo shell

## Import/Export Database collections
* We are going to need to quickly import and export data to and from our database
* The following instructions show you how to import/export and entire database or just a collection

### Create test file to import data into a collection
* Create `cologne.js` in the root of your project
* This is a temp file where we will import a colognes collection with premade data

`cologne.js`

```
{"_id":{"$oid":"5bc13cb95dd00fb91646792b"},"likes":0,"scentName":"Fierce","scentBrand":"Abercrombie \u0026 Fitch","scentPrice":0,"description":"A sweet, woody fragrance, with top notes of petitgrain, cardamom, lemon, orange, and fir. It also has at its aromatic heart notes of rich jasmine, rosemary, rose, and lily of the valley. And at its very base, it has notes of warm vetiver, musk, oakmoss, and Brazilian rosewood to help tie down the citrus and floral sensations. A fresh and spicy scent designed as a call to the younger, wilder side of a man, this cologne is for men that aren’t afraid to live on the edge.","username":"bob","createdDate":{"$date":"2018-10-13T00:30:49.805Z"},"__v":0}
{"_id":{"$oid":"5bc13cde5dd00fb91646792c"},"likes":0,"scentName":"Le Male","scentBrand":" Jean Paul Gaultier","scentPrice":0,"description":"Heralded for its sweet mint, lavender, and vanilla notes, Le Male is a great compliment to any man that is truly unforgettable. Powerful artemisia, cardamom, mint, and bergamot make up the top notes, followed by middle notes of lavender, orange blossom, cinnamon, and cumin. Base notes of sandalwood, vanilla, Tonka Bean, and Amber help round out a charismatic fragrance for the modern man. Both gentle and masculine at once, Le Male’s traditional aroma makes it both easy and pleasing.","username":"bob","createdDate":{"$date":"2018-10-13T00:31:26.224Z"},"__v":0}
```

## Import
`$ mongoimport -h ds121373.mlab.com:21373 -d fivestarcologne -c colognes -u admin -p a123456 --file colognes.js`

* You need to replace `admin` with your mlab database `username`
* You need to replace `a123456` with your mlab database `password`

* Refresh mLab and you will see your colognes collection populated

## Delete `colognes.js`
- We want to show you how to export the database collection

`$ rm -rf colognes.js`

`$ mongoexport -h ds121373.mlab.com:21373 -d fivestarcologne -c colognes -u admin -p a123456 -o colognes.js`

* Now import it again and you'll see it on mLab again

# Add users collection
* Create `users.js` in the root of your app
* This is just a temp file

`users.js`

```
{"_id":{"$oid":"5bc13bc38842b2b8e41e26cb"},"favorites":[],"username":"bob","email":"bob@bob.com","password":"$2b$10$fW2bdvQMvDMvLCfnnMBGGee0mjM6JR2qXJKgEYz6dLAW4rug5HGSq","joinDate":{"$date":"2018-10-13T00:26:43.914Z"},"__v":0}
{"_id":{"$oid":"5bc14031b82781babd2b404c"},"favorites":[],"username":"mike","email":"mike@mike.com","password":"$2b$10$JeO5O1RKV4JTuNtIyobr2Oa4ULK0zWOS4XC/qRV3e3xbV.L5elf0m","joinDate":{"$date":"2018-10-13T00:45:37.390Z"},"__v":0}
```

* Import it into mLab

`$ mongoimport -h ds121373.mlab.com:21373 -d fivestarcologne -c users -u admin -p a123456 --file users.js`

* You need to replace `admin` with your mlab database `username`
* You need to replace `a123456` with your mlab database `password`

## That's it
* You now can import and export your database whenever you want

`$ mongodump -h ds121373.mlab.com:21373 -d fivestarcologne -u admin -p a123456 -o temp`

## Binary
* You can import and export an entire db

### Import database
`$ mongorestore -h ds121373.mlab.com:21373 -d fivestarcologne -u <user> -p <password> <input db directory>`

### Export database
`$ mongodump -h ds121373.mlab.com:21373 -d fivestarcologne -u <user> -p <password> -o <output directory>`

### Securely tell your app about your database
* Security is important
* We have the URI information and we will save it into a file called `variables.env` and this is a file that we will hide using our `.gitignore` file
    - Open `.gitignore` and search for `*.env` this is what ignores all `.env` files from git (and github)

#### Never save API keys with Git
* Why? They can easily be accessed and maliciously used by coders with bad intentions
* In order to use this file we have already installed the `dotenv` npm package

`variables.env`

```
MONGO_URI=mongodb://<dbuser>:<dbpassword>@ds219672.mlab.com:19672/peh2-they-came-before-me
```

* Replace `<dbuser>` and `dbpassword` with your username and password

```
MONGO_URI=mongodb://admin:a12346@ds219672.mlab.com:19672/peh2-they-came-before-me
```

### Let our app know about our `.env` file
`server.js`

```
const express = require('express');
require('dotenv').config({ path: './variables.env'}); // add this

const app = express();

// MORE CODE
```

* We are not using `dotenv` anywhere else in `server.js` so we don't need to store it in a variable
* Just pointing to where that file is lets us access the secure information inside it by using `process.env` + `SOME_CONSTANT_VARIABLE_NAME_INSIDE_VARIABLES_ENV`

### Mongoose
* Connect our app's backend to `mLab`
* We'll do this using a package called `mongoose` (_which we've already installed_)
* We can now user our `MONGO_URI` variables we set in `variables.env` so we can use `Mongoose` to connect to our **remote Mongo DB on mLab**
* We access environment variables using `process.env`
* We'll `connect` or **throw an error**

`server.js`

```
const express = require('express');
const mongoose = require('mongoose'); // add this
require('dotenv').config({ path: './variables.env' });

const PORT = process.env.PORT || 4444;

// connect to db (add these lines)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const app = express();

// MORE CODE
```

## Run your app
`$ npm run dev`

* If all is well you will see DB connected in terminal

## Houston we have a problem!
* We get an error `missing script dev`

### Solution - Add nodemon and a npm script
* We already installed `nodemon`
    - `nodemon` will save you time as you won't have to keep restarting your server after you make changes, once `nodemon` is installed and running it will automatically restart your server each time you make a change to your code

* Add your `dev` script

`package.json`

* This code needs to be placed in your root app's `package.json`

`/package.json`

```
// MORE CODE

"scripts": {
    "precommit": "pretty-quick --staged",
    "backend": "nodemon backend/server.js",
    "frontend": "cd frontend && npm start",
    "dev": "concurrently --names \"backend,frontend\" \"npm run backend --silent\" \"npm run frontend --silent\""
},

// MORE CODE
```

## Run your app
`$ npm run dev`

* We get an error that `concurrently: command not found`
* This is because we installed it inside teh server folder and we need to uninstall it from there and install it into the root of our project

`$ cd server && npm uninstall concurrently`

* Go up one directory and install concurrently

`$ cd ../ && npm i concurrently`

## Run your app again
`$ npm run dev`

* If all is well you will see `DB connected` in terminal
* If you see this, this is great news because we are connecting to a remote MongoDB located on mLab
* Our environment variables are secure and we can use them to connect to our remote db

### Two Servers will be running
* So the `concurrently` package lets us run both the `client server` (webpack dev server built in with create react app) and the server server in the same terminal window
  - We haven't installed React yet so only one server is running
* But you should know that when you type `$ npm run dev` it is running this script `$npm run server` in the `server` directory which will start the express server by running `$ nodemon server/server.js` which has nodemon running always and will restart the server whenever you save changes to server files
* It will then run `$ cd client` to jump into the `client` folder and run `$ npm start` which will start the react developer server (webpack dev server)

## Another error
* `DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.`
* You may or not get this error

### Solution to getting rid of errors
* [Source of solution](https://github.com/Automattic/mongoose/issues/4135)

`server.js`

```
// MORE CODE

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

// MORE CODE
```

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add MongoDB`

## Push to github
`$ git push origin add-apollo`

### Additonal Resources: Difference between `require` and `import`
* JavaScript introduced a great way to compartmentalize JavaScript. In the pass you had to use [IFFE](https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript) statements but now you can use **import** and **export**
* But you will also see we are using **require** and this is often a point of confusion with people learning JavaScript
* Currently, on the server side, `import` does not work so we need to use the older way to import JavaScript and that is `require`
* `require` is from **NODE JS**
* [Read more](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export) about `import vs require`
