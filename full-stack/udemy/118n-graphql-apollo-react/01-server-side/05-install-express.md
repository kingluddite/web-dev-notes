# Express Server setup
`$ cd backend && touch server.js`

* Create a file in the root of your app
* A common name for this file is `server.js`

`server.js`

```
const express = require("express"); // did double quotes change after saving?
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
```

* If prettier is working the double quotes should automatically change to single quotes

## Eslint error
* We get this parsing error: `The keyword 'const' is reserved`
* We need to update our `.eslintrc` file to include es6
* Update our `.eslintrc` inside our root app folder

`/.eslintrc`

```
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

* Close and reopen `server.js` and the eslint error should be gone

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Install Express`

## Push to github
`$ git push origin add-apollo`
