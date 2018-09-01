# Add cors middleware to prevent Cross-Origin Errors
* We need to add `cors` package to our server
* `cors` is an Express package that will allow us to make cross domain requests (from our react application to our backend)

`server.js`

```
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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

![getAllGenealogies](https://i.imgur.com/Jx0QxbO.png)

* Refresh again and you will see `Loading...` for a split second
