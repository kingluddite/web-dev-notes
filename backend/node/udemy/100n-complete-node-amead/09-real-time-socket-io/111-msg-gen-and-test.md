# Message Generator & Tests
* Clean up server.js
* Setup test suite to verify utility functions are working

## Goal
* Great a function that helps us generate this object:

```js
{
    from: 'Admin',
    text: 'Some text',
    createdAt: new Date().getTime()
}
```

* We want to avoid having to creating that object every single time
* We want to pass in args to function (name and text) and it will generate the object (saves us time)

## Create new file message.js
`/server/utils/message.js`

```js
const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime(),
  };
};

module.export = { generateMessage };
```

* Before we hook it up to server.js let's set up testing

1. Install mocha 
2. Install the `expect insertion` library

`$ yarn add mocha expect -D`

3. Setup `package.json` scripts

```json
// MORE CODE
"scripts": {
  "start": "node server/server.js",
  "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
  "test-watch": "nodemon --exec 'npm test'"
},
// MORE CODE
```

* We need to install nodemone insideo our `package.json` so we'll be using a local copy
    - If our team clones they will also get nodemon added
    - Before this change our nodemon relies on a global install of nodemon and if someone doesn't have nodemon installed they'll get an error
    - We add it locally and team members get up and running with our app faster because we built in the stuff needed inside our package.json and this is a best practice (clone and go! - means people don't need to install anything globally)

`$ yarn add nodemon -D`

4. Start writing tests

`$ npm test`

* We get errors that it could not find any test files matching pattern `server/**/*.test.js`
* We can fix this error by creating a test file:
 
`server/test/server.test.js`

* Once that file is created you can run `$ npm test` again and you'll get `0 passing`
