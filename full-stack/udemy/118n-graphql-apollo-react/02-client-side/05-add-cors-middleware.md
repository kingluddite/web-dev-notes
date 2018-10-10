# Add cors middleware to prevent Cross-Origin Errors
* Hold off on this as not getting Cors error

* We need to add `cors` package to our server
* `cors` is an Express package that will allow us to make cross domain requests (from our react application to our backend)

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // add this

// MORE CODE
```

**note** We only want requests coming from our react application
    - This will be `http://localhost:3000` because this is the domain we will be making requests from
    - We also need to add `credentials: true` for the apollo client to work correctly

`server.js`

```
// MORE CODE

// initialize your application
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// MORE CODE
```

## Test in browser
* You will see the error is gone and we now get the output from our query

![getAllColognes](https://i.imgur.com/Jx0QxbO.png)

* Refresh again and you will see `Loading...` for a split second

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add cors middleware`

## Push to github
`$ git push origin add-react`

## Additional Resources
* [What is cors](https://www.codecademy.com/articles/what-is-cors)
