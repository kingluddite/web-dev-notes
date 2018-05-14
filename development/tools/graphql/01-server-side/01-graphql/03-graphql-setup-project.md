* `$ mkdir graphql-app`
* `$ cd graphql-app`
* `$ mkdir server && cd server`
* `$ npm init -y` (creates package.json)
* `$ npm i express`
* `$ touch app.js`

`app.js`

```js
const express = require('express');

const app = express();

app.listen(4000, () => {
  console.log('now listening to port 4000');
});
```

Run Express server with `$ node app`

## Nodemon
* Install nodemon to automatically refresh on every code change
* Will save you development time
* I like to install nodemon per project and not globally
* `$ npm i nodemon`


## Run nodemon
`$ nodemon app`


