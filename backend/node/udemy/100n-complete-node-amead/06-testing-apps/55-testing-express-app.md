# Testing Express Apps
## Install express
`$ yarn add express`

* We install express as a dependency because we need it for production server

## Server
`$ mkdir server`

`$ touch server/server.js`

`server.js`

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('yo world!');
});

app.listen(3000);
```

* `package.json` shows the difference between **dependencies** and **dev-dependencies**

## Run server
`$ node server/server.js`

`yo world!` prints to the 

## Testing the Express app
