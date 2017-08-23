# Stripe API keys
* Add Stripe
    - Publishable key
    - Secret key
* To you `/config/dev.js`

`dev.js`

```
module.exports = {
// more code
  googleRedirectURI: 'KEYHERE',
  stripePublishableKey: 'KEYHERE',
  stripeSecretKey: 'KEYHERE'
};
```

* You copy from the stripe.com API Dashboard section and an a paste into dev.js
* Spelling and commas are super important
* If you spell it wrong, dubugging can be long and painful
* Triple Check spelling and commas now

`prod.js`

```js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  randomCookieKey: process.env.RANDOM_COOKIE_KEY,
  googleRedirectURI: 'https://LIVEDOMAIN.herokuapp.com/',
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
};
```

* Add these two new environmental variables to Heroku
    - Settings > Config Vars
    - **Important** Make sure you click add!

## How do we handle environmental stuff on the frontend?
* **note** our `config` folder is strictly for the backend
* We will NEVER use this config folder for anything on the frontend
    - Why?
    - **Important!** In React, any file that gets required inside our frontend React world will have its contents publicly visible to the outside world

### Another important issue
* On the frontend we are making use of ES2016 modules
    - Any files that usee `import` and `export default`

```js
// sample code
import React, { Component } from 'react';
export default connect(mapStateToProps)(Header);
```

* The backend makes use of CommonJS modules

```js
// samples
const passport = require('passport');
```

* **important** - When we make use of ES2015 modules - you are not allowed to import you ARE NOT ALLOWED TO EXECUTE ANY TIME OF LOGIC BEFORE LISTING AN IMPORT STATEMENT
    - This means we can't put in a check like we did on the server

```js
// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod'); // eslint-disable-line global-require
} else {
  // we are in development - return the dev keys
  module.exports = require('./dev'); // eslint-disable-line global-require
}
```

* The create react app has a good solution for handling API keys
