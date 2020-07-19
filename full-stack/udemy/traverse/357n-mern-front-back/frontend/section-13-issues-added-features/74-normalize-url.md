# normalize-url
* Gives us a proper url, regardless of what user entered

`$ npm i normalize-url`

`routes/api/profile.js`

```
// MORE CODE

const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
// MORE CODE
```
