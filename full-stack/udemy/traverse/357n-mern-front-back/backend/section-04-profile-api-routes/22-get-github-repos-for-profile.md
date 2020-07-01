# Get GitHub repos for profile
1. Get the github username
2. Make a request to "our" backend
3. Then make a request to the GitHub API

## Bad Practice
1. You register your GitHub Application
2. You get an API key
3. You put the API key in the frontend (bad idea!)
    * Hackers could find that and use that

## Good Practice
1. Put all that stuff in the backend
2. And we'll only return repositories (we'll make the actual request from our GitHub from our Backend rather than from our React frontend)

## Register a new OAuth app
* This will give you a `new client id` and `client secret`

### How to register for a new GitHub OAuth app
1. Your Github profile
2. Settings > Developer settings > Oauth Apps > Click `New OAuth App`

![screenshot of GitHub OAuth App Registration](https://i.imgur.com/R7JNF3q.png)

![screenshot of client id and client secret](https://i.imgur.com/8L2Cgyu.png)

3. Save your `Client ID` and `Client Secret` into `config/config.env`

`config/config.env`

```
MONGO_URI=mongodb+srv://...
MONGO_DB_PASSWORD=...
JWT_SECRET=...
GITHUB_CLIENT_ID=6062931d632b0f4ef100
GITHUB_CLIENT_SECRET=7dd542d9d1e8d88af592127eac6bab26527ff200
```

### UPDATE 2020
* Changes to GitHub API authentication
    - Since the course was published, [GitHub has depreciated authentication via URL query parameters](https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api/#authenticating-using-query-parameters) You can get an access token by following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
    - For this app we don't need to add any permissions so don't select any in the scopes
    - **IMPORTANT** DO NOT SHARE ANY TOKENS THAT HAVE PERMISSIONS This would leave your account or repositories vulnerable, depending on permissions set
        + All authentication to the GitHub API should be done using HTTP basic authentication
    - If you don't do this you'll only be able to make 50 requests per hour

#### So now we need to add a personal access token
* You can create a personal access token and use it in place of a password when performing Git operations over HTTPS with Git on the command line or the API
* **NOTE** As a security precaution, GitHub automatically removes personal access tokens that haven't been used in a year

##### Instructions
* [source](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

1. Verify your email address (required)
2. Settings > Developer settings > Personal access tokens
3. Click `Generate new tokens`
4. Give token a descriptive name
5. Select scopes or permissions you'd like to grant this token (we don't need any scopes (aka permissions) as our requests will be public)
6. Click Generate token
7. Copy your token to the clipboard and replace your client id and client secret
    * Remove them from GitHub as your no longer using it

`config/config.env`

```
MONGO_URI=mongodb+srv...
MONGO_DB_PASSWORD=...
JWT_SECRET=...
GITHUB_ACCESS_TOKEN=79d9c90748e96ad1f8eca359398711ae6f5ae100
```

### Now we'll create a new route
* It will be GET
* IT will be Public (as everyone will have access to it)
* We were using `request` npm module

`routes/api/profile.js`

```
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

## Test it out in Postman
* If all goes as expected we should see in Postman an array of the last 5 of our GitHub repositories
* URL - GET - `http://localhost:5000/api/profile/github/kingluddite`
* Click Send
* You should see last 5 GitHub repos
* Save in Post route Profiles collection folder as `Get last 5 GitHub repos`

## If you send a invalid github profile name you get like:

`http://localhost:5000/api/profile/github/badbadbadbad`

```
{
    "msg": "No GitHub profile found"
}
```

### Tip
* If you get this error `Headers already sent` it means you forgot to return a `res.json()`

## Next - Posts
* CRUD
* Add Likes
* Add Comments
