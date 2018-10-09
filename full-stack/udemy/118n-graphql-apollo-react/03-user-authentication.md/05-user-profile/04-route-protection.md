# Add Route Protection using withAuth component
* We need a way to change our navbar to show one list of links when we are logged in and a different list of links when we are not logged in
  - In other words we need a show a public part of our app to everyone when not logged in but if they are logged in, we'll have a private part of our app

## We get an annoying error
* If we are not logged in and go to logged in routes we will get errors
    - `cannot read property of 'username' of null`
* We will make sure that when a user is not logged in they will not be able to access those components

## Stuff we'll need
* It will need to redirect (That means we need to use `withRouter` 'react-router-dom') and get the current user (`GET_CURRENT_USER`)
* We'll also need the `Query` component from `react-apollo`


### It will be a SFC
* I normally just create CBC but for this it will be a HOC and we'll keep it as a simple SFC
* We use a special syntax for this one
    - We will pass it a function
    - We need to pass the function an argument (conditionFunc) and then we'll use a similar syntax that we used for `withSession`

`components/withAuth.js`

```
import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries';

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (loading) return null;
      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);

export default withAuth;
```

## Use withAuth on protected pages
`Profile.js`

```
import React from 'react';

// components
import UserInfo from './UserInfo';
import UserColognes from './UserColognes';
import withAuth from '../withAuth';

// MORE CODE

export default withAuth(session => session && session.getCurrentUser)(Profile);
```

## Test
1. Log out
2. Browse to the `localhost:3000/profile` page
3. If all works as expected you will be redirected to the home page

## More testing
`withAuth.js`

```
// MORE CODE

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (loading) return null;
      console.log(data);

// MORE CODE
```

## Test in browser
* We need to make sure we are logging our `data` from `withSession`

`withSession.js`

```
// MORE CODE

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data);

// MORE CODE
```

### Restart the server
* You should be logged out an on the home page
* The console should say that `getCurrentUser` is **null**

## Explain the `conditionFunc` value and what we are doing with it
* Keep console open and make sure the **null** `currentUser` is still there
* Log in again
* Right click on the `null` `currentUser` and select `store as global variable`
* Then right click logged in `currentUser` and select `store as global variable`
* This will store them **both** as two tempary variables

![temp variables](https://i.imgur.com/GrHbLcj.png)

* Type this in terminal

```
var conditionFunc = session => session;
conditionFunc(temp1);
```

* **note** Hit `shift` + `return` to get to next line in console
* After hitting `return` it will execute and return `getCurrentUser: null`
* Run it again but this time pass in `temp2`

```
var conditionFunc = session => session;
conditionFunc(temp2);
```

* You will get the logged in user

```
var conditionFunc = session => session && session.getCurrentUser;
```

* Now that will only return the `getCurrentUser` on the session object if there is a `getCurrentUser` on the **session**
    - And we know that when user is not logged in `getCurrentUser` is set to null
    - So if we try

`conditionFunc(temp1)` ----- That will return null

`conditionFunc(temp2)` ----- That will return the current logged in user

## Now look at the `withAuth` component
`withAuth.js`

```
// MORE CODE

return conditionFunc(data) ? (
       <Component {...props} />
     ) : (
       <Redirect to="/" />
     );

// MORE CODE
```

## So our ternary operator is going to evaluate to `true` or `false`
1. If expression evaluates to `true`
    * It loads the component with all its corresponding `props`
2. If expression evaluates to `false`
    * It redirects to home page

## Also protect `AddCologne` with `withAuth`

`AddCologne.js`

```
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth'; // add this

// MORE CODE

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddCologne)
); // modify this line
```

## Additional Resources
### HOC
* Higher order components are confusing
* [This video helps explain them](https://youtu.be/BcVAq3YFiuc?t=622)
* [Lecture notes on HOC vs Render Props video](HOC: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
*  **note** The video addresses both the benefits and problems of using higher order components and how new design patterns like **render props** can be an improvement

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add search feature`

### Push the branch to origin
`$ git push origin search`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add search feature`

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
* Locally your master branch doesn't have the new feature `profile` added
* To prove this checkout of your `profile` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `search` are gone!
* View your app in the browser and it also shows now sign of your search feature!
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

* You now see that our `profile` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d profile`

* That will let you know the branch was deleted with something like:

`Deleted branch profile (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo



