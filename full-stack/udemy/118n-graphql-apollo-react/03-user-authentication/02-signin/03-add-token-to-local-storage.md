# Add token to Local Storage
* We need to use the `token` we get back to authenticate our user

## Sign in first and analyze the `data` object returned
![data object returned](https://i.imgur.com/uTsytHW.png)

`Signin.js`

```
// MORE CODE

handleSubmit = (event, signinUser) => {
  event.preventDefault();
  signinUser().then(data => {
    console.log(data);
    console.log(data.data.signinUser.token);
    // localStorage.setItem('token', data.signinUser.token);
    this.clearForm();
  });
};

// MORE CODE
```

* You will see `data` > `data` > `signinUser` > `token`
* And you will see the token
* We have to write `data.data.signinUser.token`
* That is way too long
* We can make it shorter using ES6 destructuring

## Destructure `data`
* This will make getting access to token a little easier to grab

`Signin.js`

```
// MORE CODE

handleSubmit = (event, signinUser) => {
  event.preventDefault();
  signinUser().then(({ data }) => {
    console.log(data);
    console.log(data.signinUser.token);
    // localStorage.setItem('token', data.signinUser.token);
    this.clearForm();
  });
};

// MORE CODE
```

Now look at `data` object returned

![data object returned](https://i.imgur.com/RumJ86v.png)

* We now see signinUser > token
* easier access to our token with `data.signinUser.token`

## Add token to localStorage

```
// MORE CODE

signinUser().then(({ data }) => {
  console.log(data);
  localStorage.setItem('token', data.signinUser.token);
  this.clearForm();
});

// MORE CODE
```

## Destructure even more
* Makes it even easier to access

```
// MORE CODE

handleSubmit = (event, signinUser) => {
  event.preventDefault();
  signinUser().then(({ data: { signinUser } }) => {
    console.log(signinUser);
    localStorage.setItem('token', signinUser.token);
    this.clearForm();
  });
};

// MORE CODE
```

* Now view the console log

```
{token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…k5N30.IB90rAyATAGfM8nbsh8px8WJ3DIRGMn1yFXcVdd8Bjg", __typename: "Token"}
```

* **note** Your token will obviously be different

## Update Signup component with same localStorage code
* We'll update the destructured variables

`SignupUser.js`

```
// MORE CODE

handleSubmit = (event, signupUser) => {
  event.preventDefault();
  // call our signupUser function
  // it is a promise so we can use `then()`
  // within `then()` we get our return `data`
  signupUser().then(({ data: { signupUser } }) => {
    console.log(signupUser);
    localStorage.setItem('token', signupUser.token);
    this.clearForm();
  });
};

// MORE CODE
```

## Test
* Create a new user and make sure you see token created in console

## Check Application tab of console
* You will see `key/value` of token has been added to `localStorage`

![localStorage Application tab](https://i.imgur.com/qae7lid.png)

## Get item (token) from `localStorage`
* And **we need to send it to the backend** to authenticate our user
* Here we are taking app information from our client and sending it to our server

`client/src/index.js`

```
// MORE CODE

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);

      // check for certain server error codes
      //if (networkError.statusCode === 401) {
      // localStorage.setItem('token', '');
      // or remove item
      //  localStorage.removeItem('token');
      //}
    }
  },
});

// MORE CODE
```

## We just added token to authorization header
* Now we need to send authorization header over to our backend

### Backend to set up JWT authentication middleware 
`server.js`

* Right after where we used **cors**

```
// MORE CODE

// initialize app
const app = express();

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  next();
});

// MORE CODE
```

* Make sure you call `next()` to go to next middleware
    - **Very important** - if you forget this your app will "hang" (stop working)
* For now let's just log token

## Test
* Log in with a valid user
* This time you will see our token output on the server (terminal)

#### Where do we get authorization from?
* We set that in our headers here:

`client/src/index.js`

```
// MORE CODE

request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },

  // MORE CODE
```

## Test
* If all goes well you should see token in Terminal because that means we sent it to the backend of our app

`http://localhost:3000/signin`

![server token](https://i.imgur.com/qa3OSjr.png)

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add token to local storage`

## Push to github
`$ git push origin signin`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add signin feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
    - Green is code added
    - Red is code removed
    - All other code has not been modified
* Review all your changes
* If all looks good hit the `back` button in the browser
* Create a PR
* And click `Merge pull request` button
* Click `Confirm merge` button
* Then click Delete branch (You will see the color purple and that `Pull request successfully merged and closed`)

![PR successful](https://i.imgur.com/ota3hx1.png)

* Click `Delete branch` button to delete the remote branch
    - You don't need it anymore
    - Get in the habit of `pruning` your branches so they don't grow uncontrollably

## Time to sync up
* Right now your master branch on your remote GitHub is different than your master branch locally
* Locally your master branch doesn't have the new feature `signin` added
* To prove this checkout of your `signin` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `signin` are gone!
* View your app in the browser and it also shows now sign of your `signin` feature!
* If you stop your server `ctrl` + `c`

## Check the status
`$ git status`

* You will see this:

```
On branch master
nothing to commit, working tree clean
```

## But this doesn't make sense?
* Your remote master branch and your local master branch are different

## Time to fetch
* You need to do a fetch

`$ git fetch`

## Compare local with remote
`$ git diff master origin/master`

* That will compare the local branch `master` with the github remote branch `origin/master`
* Now just press `spacebar` to navigate through all the changes
    - Red is removed
    - Green is added
    - No color is unchanged
* Press `q` to quit out of git `diff`

## Show local branches
`$ git branch`

* The asterisk is the currently selected branch
* Type `q` to exit out of list of branch pages

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* You now see that our `signin` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d signin`

* That will let you know the branch was deleted with something like:

`Deleted branch signin (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo

## Additional Resources
* [cookies vs sessions vs localStorage](https://scotch.io/@PratyushB/local-storage-vs-session-storage-vs-cookie)
