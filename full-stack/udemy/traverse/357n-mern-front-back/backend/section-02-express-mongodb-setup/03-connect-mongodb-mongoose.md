# Connecting to MongoDB with Mongoose
* We are going to use the `config` package we installed earlier

`$ mkdir config/default.json`

* In mongo atlas
    - connect > connect to your application
    - Copy URI and paste into `default.json`

`default.json`

```
{
  "mongoURI": "mongodb+srv://philadmin:<password>@devconnector-a2gjt.mongodb.net/<dbname>?retryWrites=true&w=majority"
}
```

* **important** Make sure you give your Database a name so replace `<dbname>` with a name like:

```
{
  "mongoURI": "mongodb+srv://philadmin:<password>@devconnector-a2gjt.mongodb.net/devconnect?retryWrites=true&w=majority"
}
```

* We could put our connection logic directly inside our `server.js` but we want to keep that file clean
* We'll create `config/db.js`

`config/db.js`

```
const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

mongoose.connect(db);
```

* `mongoose.connect()` returns a Promise and we could use `then()` but we will use async/await
    - Makes code look cleaner
    - Makes code look synchronous even though it is asynchronous
    - We'll use a `try/catch` block to let us know if our connection doesn't work
    - You must use `async` and `await` together
    - Since `mongoose.connect()` returns a Promise you must put `await` before it

`config/db.js`

```
const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDb = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // we want to exit from the process with failure
    process.exit(1);
  }
};

module.exports = connectDb;
```

* Connect our Database to our server

`server.js`

```
const express = require('express');
const connectDb = require('./config/db');

const app = express();

// Connect Database
connectDb();

// MORE CODE
```

## My preferred way - Add dotenv
* This will protect our secret info from github
* My preferred solution than using `config/default.json`

`$ npm i dotenv` (we already installed and you should see it in `package.json`)

`config/config.env`

* Put in your db name (change `<dbname>` to `devconnect`)
* Put in your password
  - Just to clarify - you have 2 passwords you need to remember on mongodb
    + one password is to log in and administer mongo admin dashboard
    + The other password is to the exclusive Database (cluster) you are storing your apps info inside

```
MONGO_URI=mongodb+srv://philadmin:<password>@devconnector-a2gjt.mongodb.net/devconnect?retryWrites=true&w=majority
```

* Update `.gitignore`

`.gitignore`

* We don't want to see our environment variables on Github
* **note** The default location for environment variables is to create a `.env` in the root of your backend server folder

```
node_modules/
.DS_Store
config/config.env
.env
```

`server.js`

* And point to our environment variables
* **note** We need dotenv to come first in our required dependencies

```
const dotenv = require('dotenv').config({ path: './config/config.env' });
const express = require('express');

// MORE CODE
```

## Add npm colors
`$ npm i colors`

`server.js`

```
const express = require('express');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const dotenv = require('dotenv').config({ path: './config/config.env' });

// MORE CODE
```

### And use colors to show yellow for server message

`server.js`

```
// MORE CODE

  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
```

### And update our Database to show colors
`config/db.js`

* We get rid of all Mongoose warnings with the object we pass as a second argument

```
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    // show developer we are connected to MongoDB
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error(err.message);
    // we want to exit from the process with failure
    process.exit(1);
  }
};

module.exports = connectDb;
```

## Woops - Connection error to MongoDB Atlas
* We fixed this before but remember to be able to access the Database you need to whitelist your app
  - Click `Network Access` and click `+ Add IP Address`
  - **note** After adding give it a couple minutes to kick in and retry running your app with `$ npm run dev`

![Add IP address](https://i.imgur.com/sFqekaH.png)

```
Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/
```

## Add NODE_ENV to config/config.env
`config.env`

```
// MORE CODE

NODE_ENV=Development

// MORE CODE
```

## Run app
`$ npm run dev`

* You should run server and connect to Database

![server and mongodb connected](https://i.imgur.com/CXWwngv.png)


