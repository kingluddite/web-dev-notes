# Install dependencies and Express
`.gitignore`

```
node_modules/
```

## git
`$ git init`

* Now we have a git repository

## package.json
`$ npm init`

* Name it
* Description
* point to `server.js`
* MIT license

## Install all dependencies
`$ npm i express express-validator bcryptjs config jsonwebtoken mongoose gravatar request dotenv`

* `config` - package for global variables
* `gravatar` - package for profile avatars
* `request` - will allow us to make http requests to another API (we'll use this to make API requests and hide our API keys and list latest repos)
    - **UPDATE** 2020
        + As of 11th February 2020 `request` has been depreciated and is no longer maintained
        + We were going to use `axios` in the `client` so we can easily change the above fetching of a users GitHub repositories to use axios

### Before with `request`

```
const express = require('express');
const request = require('request');
const config = require('config');

// MORE CODE

// @route.    GET api/profile/github/:username
// @desc.     Get user repos from GitHub
// @access.   PUBLIC
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `http://api.github.com/users/${req.params.username}/repos?per_page=5=created:asc&client_id={$config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js'}
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No GitHub profile found' });
      }

      // The body will just be a regular String
      //   with escaped quotes and stuff like that
      //   So we use JSON.parse(body) before we send it
      res.json(JSON.parse(body));
    });
  } catch (err) {
   console.error(err.message);
   res.status(500).send('Server Error');
  }
})
// MORE CODE
```

* And your config file would be update to have the `client id` and `client secret`

`config/default.json`

```
{
    "mongoURI": "...",
    "jwtSecret": "...",
    "githubClientId": "...",
    "githubSecret": "..."
}
```

### After with axios
* Uninstall `request`

`$ npm uninstall request`

* Install axios

`$ npm i axios`

`routes/api/profile.js`

```
// third party dependencies
const express = require('express');
const { check, validationResult } = require('express-validator');
// const request = require('request'); // DELETE
// const config = require('config'); // DELETE
const axios = require('axios'); // ADD
// my dependencies
const auth = require('../../middleware/auth');

// MORE CODE

// @route.    GET api/profile/github/:username
// @desc.     Get user repos from GitHub
// @access.   PUBLIC
router.get('/github/:username', async (req, res) => {
  try {
   const uri = encodeURI(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`);
   const headers = {
     'user-agent': 'node.js',
     Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
   }

   const gitHubResponse = await axios.get(uri, { headers });
   return res.json(gitHubResponse.data);
  } catch (err) {
   console.error(err.message);
   res.status(404).json({ msg: 'No GitHub profile found'});
  }
});

module.exports = router;
```

## Install all dev dependencies
`$ npm -D nodemon concurrently`

* Will allow us to run both our backend express server and our frontend react dev server at the same time with one single command

## Main entry file `server.js`
`server.js`

```
const express = require('express');

const app = express();

// test API endpoint
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
```

* Run it

`$ node server`

### A better way with scripts
* We'll write some scripts inside `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "start": "node server",
    "dev": "nodemon server"
  },

// MORE CODE
```

`$ npm run dev`

* You can view in browser
* [localhost](http://localhost:5000/)
* You will see `API Running`

## Run in Postman
* GET
* http://localhost:5000/
* Body - you will see `API Running`
* Stop server `ctrl` + `c`

## Git stuff
* Add to staging `$ git add .`
* Commit `$ git commit -m 'Initial commit'`
