# Database seeder for Bootcamps
* Quick way to populate Database with data

## Create a seeder file
* `$ touch seeder.js`
* `fs` is filesystem comes built-in to Node.js
    - We don't have to install it
    - We need this to work with files on our machine
* We'll use `mongoose` and `colors`
* We'll need `.env` because we need access to the Mongo URI
* We point to where our `.env` is using another built-in Node.js `path`
* We point to our **Model**
* We connect directly to **MongoDB**

`seeder.js`

```
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
```

## And add a method to delete all Database
`seeder.js`

```
// MORE CODE
// Delete all data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
```

## Use Node `argv` to determine if importing or deleting data
```
// MORE CODE

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
```

### Here is the complete file
`seeder.js`

```
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into Database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
```

## Test it out
* You should have an empty Database
    - If not delete all documents in your Bootcamp collection

`$ node seeder -d`

* This will delete all data

### Import data
`$ node seeder -i`

* This will import all data from JSON file you pointed to

### Important notes
* Our slugify and geolation is working
    - We add our name as a slug
    - We add points
    - Addresses are not stored (as we did not need duplicate data)

 
