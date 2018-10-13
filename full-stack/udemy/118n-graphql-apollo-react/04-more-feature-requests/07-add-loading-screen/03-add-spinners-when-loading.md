# Add spinners when loading

## Feature branch
`$ git checkout -b spinner`

* This is a 3rd party package we can use to quickly add this functionality

## Download it
* [react spinners site](http://www.davidhu.io/react-spinners/)

## Install in our client folder
`ctrl` + `c` to quit server

`$ cd client`

`$ npm i react-spinners`

## Create a new Component
`components/Spinner.js`

```
import React from 'react';
import { HashLoader } from 'react-spinners';

const Spinner = () => (
  <div className="spinner">
    <HashLoader color={'#1eaedb'} size={30} margin={'3px'} />
  </div>
)

export default Spinner;
```

`$ cd ../`

`$ npm run dev`

`App.js`

```
import React, { Component } from 'react';
import pose from 'react-pose';
import Spinner from './Spinner';

 // MORE CODE

class App extends Component {
  // MORE CODE

  render() {
    return (
      // MORE CODE
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <div>Error</div>;

// MORE CODE
```

## Replace all loading text with spinner
1. Stop the server
2. `$ cd client/src`
3. `$ grep -r -i "loading" .`
4. Command click each link that has `if (loading) return <div>Loading...</div>;` and replace with `<Spinner />`
5. Make sure to import `Spinner` at the top of all components that use it

* Signup.js
* UserSongs.js
* AddSong.js
* SongPage.js

## Run app
`$ cd ../../` (make sure you are in app root)

`$ npm run dev`

## Test
* You should see Spinner animations when pages with `Spinner` are loading data

## Add style to Search input
`Search.js`

```
// MORE CODE

<div className="App">
   <input
     type="search"
     name="search"
     id="search"
     className="search"

// MORE CODE
```

## Redeploy for production
* Change port back to `80`

`variables.env` 

``` 
PORT=80
```

## Point client to remote URI on live heroku site

`client/src/index.js`

```
// MORE CODE

// uri: 'http://localhost:4444/graphql'
// uri (prod): https://protected-ravine-56983.herokuapp.com/
const client = new ApolloClient({
  uri: 'https://protected-ravine-56983.herokuapp.com/graphql',
  fetchOptions: {
    credentials: 'include',
  },

// MORE CODE
```

## If there is a network error, set the token to an empty string

`index.js`

```
// MORE CODE

  onError: ({ networkError }) => {
    if (networkError) {
      // console.log('Network Error', networkError);
      localStorage.setItem('token', '');
    }
  },
});


// MORE CODE
```

## RULE - Our development server will crash because it can't run on any port less than 1000
* So Port 80 will never work on our dev server

## Add and commit to github and heroku
`$ git push heroku master`

`$ git push origin master`

## Possible cors issues
`server.js`

```
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors('*'));
```

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add spinner feature`

### Push the branch to origin
`$ git push origin spinner`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add spinner feature`

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
* Locally your master branch doesn't have the new feature `spinner` added
* To prove this checkout of your `spinner` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `spinnere` are gone!
* View your app in the browser and it also shows now sign of your `spinner` feature!
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

* You now see that our `spinner` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d spinner`

* That will let you know the branch was deleted with something like:

`Deleted branch spinner (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
