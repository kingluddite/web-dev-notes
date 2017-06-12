# Loading Sample Data
`package.json`

```
"scripts": {
    "prod": "node ./start.js",
    "watch": "nodemon ./start.js --ignore public/",
    "start": "concurrently \"npm run watch\" \"npm run assets\" --names \"💻,📦\" --prefix name",
    "assets": "webpack -w --display-max-modules 0",
    "sample": "node ./data/load-sample-data.js",
    "blowitallaway": "node ./data/load-sample-data.js --delete",
    "now": "now -e DB_USER=@db_user -e DB_PASS=@db_pass -e NODE_ENV=\"production\" -e PORT=80"
  },
```

* sample - loads sample data
* blowitallaway - removes data

`data/load-sample-files.data.js`

* Not part of our application
    - So we need to require all the environmental variables

`require('dotenv').config({ path: __dirname + '/../variables.env' });`

* And we require a connection to the database

```
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
```

## What does `load-sample-data.js` do?
1. Loads everything up
2. Connect to Database
3. Bring in our models
4. Read files from `stores.json`, `reviews.json`, `users.json`
    * View them to see what they look like
5. `insertMany()` is used to insert all those records at one time

### Comment out reviews as we haven't built that yet
`load-sample-data.js`

```
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config({ path: __dirname + '/../variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Store = require('../models/Store');
// const Review = require('../models/Review');
const User = require('../models/User');


const stores = JSON.parse(fs.readFileSync(__dirname + '/stores.json', 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Store.remove();
  // await Review.remove();
  await User.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Store.insertMany(stores);
    // await Review.insertMany(reviews);
    await User.insertMany(users);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
```

## How do we run script to load data?
1. Stop server
2. `$ npm run sample`
3. View new records in Mongo Compass
4. Start server `$ npm start`

## Remove all data
`$ npm run blowitallaway`
