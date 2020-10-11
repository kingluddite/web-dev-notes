# Setting up Mongoose
## ODM - Object Document Mapper
* mongoose falls into a broader set of tools knows as ODM
* The goal of an ODM Is to map your objects in your code (objects in our Node.js app) over to documents inside of the MongoDB Database

## Express Structure
* [kentcdodds express structure](https://kentcdodds.com/blog/how-i-structure-express-apps)

`package.json`

* And `engines` with your node version for your app
* Install `express-async-errors`

```
{
  "main": "index.js",
  "engines": {
    "node": "12.18.2"
  },
  "dependencies": {
    "express": "^4.17.1",
    "express-async-errors": "^3.1.1",
    "loglevel": "^1.6.8"
  },
  "devDependencies": {
    "@babel/cli": "^7.10.4",
    "@babel/core": "^7.10.4",
    "@babel/preset-env": "^7.10.4",
    "@babel/register": "^7.10.4",
    "nodemon": "^2.0.4"
  },
  "scripts": {
    "start": "node .",
    "build": "babel --delete-dir-on-start --out-dir dist --copy-files --ignore \"**/__tests__/**,**/__mocks__/**\" --no-copy-ignored src"
  }
}
```

## What is `express-async-errors`?
* [explain how to use express-async-errors is and why you use it](https://zellwk.com/blog/async-await-express/)

### What is async-await?
* [article-explaining async/await](https://zellwk.com/blog/async-await/)

### Bottom Line
* If you use async/await you must use try/catch because if you get an error, it will throw and error to the caller function (which is Express) and the error will never be handled
    - This is bad
    - This will break your app
    - To see this in action use a post route that creates a resource, make sure the resource can't create duplicates then create a duplicate, they you'll see the error for duplicate key error appears but there is never a response and it just hangs forever
    - So you must use try/catch which takes to much time to type - there is a better way and that is `async-await-express`

## Here is a clean solution

`$ npm i async-await-express`

* Here's how you use it:

```
const asyncHandler = require('express-async-handler')

app.post('/signup', asyncHandler(async(req, res) => {
    await firstThing()
    await secondThing()
}))
```

* But easier to use `ash` instead of `asyncHandler` like this:

```
const ash = require('express-async-handler')

app.post('/signup', ash(async(req, res) => {
    await firstThing()
    await secondThing()
}))
```

## Add loglevel
* [docs](https://www.npmjs.com/package/loglevel)
* Minimal lightweight simple logging for JavaScript
* `loglevel` replaces `console.log()` and friends with level-based logging and filtering, with none of console's downsides
* This is a barebones reliable everyday logging library
* It does not do fancy things, it does not let you reconfigure appenders or add complex log filtering rules or boil tea (more's the pity), but it does have the all core functionality that you actually use

## devDependencies
* Compile with Babel
    - This allows us to use syntax that's not quite supported in our environment yet (mostly just ESModules) as well as handy plugins like `babel-plugin-macros`
* All the @babel packages:
    - `@babel/core` is the core babel dependency. Everything else needs it.
    - `@babel/cli` is for the build script to compile our source code to the output code that Node can run.
    - `@babel/preset-env` makes it really easy to include all the typical language plugins and transforms we'll need for the environment we're building for.
    - `@babel/register` is used during development.
    - If you're using TypeScript, then you may also want to add:
        + `@babel/preset-typescript`
* `nodemon` for watch mode (restarts the server when files are changed)

```
$ npm i @babel/core @babel/cli @babel/preset-env @babel/register @babel/preset-typescript -D
```

## scripts
`package.json`

* **note** I changed my start from: 

`"start": "NODE_ENV=production node server",` to below:

```
// MORE CODE

"scripts": {
    "start": "node .",
    "build": "babel --delete-dir-on-start --out-dir dist --copy-files --ignore \"**/__tests__/**,**/__mocks__/**\" --no-copy-ignored src"
  }
// MORE CODE
```

* The **start** script simply runs `node .` which will run the main file (which we have set to `server.js`)
* The **build** script takes all of the files in `src` directory (short for "source") and compiles them with babel to the `dist` directory (short for distribution). Here's an explanation for all the options:
    - `--delete-dir-on-start` ensures that we don't have old files hanging around between builds
    - `--out-dir dist` indicates where we want the compiled version of the files to be saved
    - `--copy-files` indicates that files that are not compiled should be copied instead (useful for `.json` files for example)
    - `--ignore \"**/__tests__/**,**/__mocks__/**\"` is necessary so we don't bother compiling any test-related files because we don't need those in production anyway
    - `--no-copy-ignored` since we're not compiling the ignored files, we want to indicate that we'd also like to not bother copying them either (so this disables `--copy-files` for the ignored files)
* If you're using TypeScript, make sure to add `--extensions ".ts,.tsx,.js"` to the build script

`.babelrc.js`

```
const pkg = require('./package.json')
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: pkg.engines.node,
        },
      },
    ],
  ],
}
```

* It's pretty simple
* We compile all the code down to the version of JavaScript syntax that supported by the `engines.node` value specified in our `package.json`
* If we were using TypeScript (recommended for teams), then we'd also include `@babel/preset-typescript` as well

## Creating a local connection to MongoDB
* add an environment variable

`config/config.env`

```
// MORE CODE

MONGODB_LOCAL_DB=mongodb://127.0.0.1:27017/sftpw-dev-api
MONGODB_U=

// MORE CODE
```

`config/db.js`

* **TODO** Code this modularly so that when dev is Local

```
// MORE CODE

const connectDb = async () => {
  try {
    // We get rid of all Mongoose warnings with the object we pass as a second argument
    // use the remote db or local db
    const conn = await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_LOCAL_DB, {
 

// MORE CODE
```

* To switch just comment out the `process.env.MONGODB_URI` in `config/config.env` and restart the server

## Also update the `seeder.js` with the same conditional
 
`seeder.js`

```
// MORE CODE

// Connect to Database
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_LOCAL_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// MORE CODE
```

* `useCreateIndex` - makes sure that when Mongoose works with mongodb our indexes are created allowing us to quickly access the data we need to access

## Did you know?
* There is a do not disturb mode for macs (good for when doing video recordings)
