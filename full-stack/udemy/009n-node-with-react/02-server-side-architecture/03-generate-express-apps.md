# Generating Express Apps
* You will see `package-lock.json` if you are using npm version 5 or greater
* We are using features that require npm version 5

## index.js
* By tradition (common naming convention) we usually name the root starter file `index.js`
* `$ touch index.js`

## CommonJS modules
* You will see `const express = require('express')`
* We will use CommonJS on the server side because at present the NodeJS only has support for CommonJS modules
    - `modules` is a system in NodeJS for requiring or sharing code between two files
    - `import express from 'express';`
        + This makes use of a different `module` system called ES2015 modules
        + At the current time NodeJS does not have support for ES2015 modules

## Takeaway
* On server we will use CommonJS modules
* On the frontend we will use ES2015 modules

## Single app
`/index.js`

```js
const express = require('express');
const app = express();

// our first route handler with Express
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(5000);
```

* We create a single app and store express() inside it
* Most, if not all, of the apps you create will just use a single app
* This app will be used to setup configuration
    - To listen to incoming requests that are being routed to the Express side from the NodeJS side
    - Then will route those request on to different handlers
    - All our routeHandlers that we will create will somehow be associated with the `app`

## Test in browser
* Run our Express app
    - `$ node index.js`
    - It will appear the Terminal just "hangs"
* Visit `localhost:5000`
* You will see:

![send object as response](https://i.imgur.com/2drbxqz.png)



