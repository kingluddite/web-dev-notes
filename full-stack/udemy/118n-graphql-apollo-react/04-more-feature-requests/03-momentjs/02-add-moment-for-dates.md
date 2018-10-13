# Using Moment

## Add feature branch
`$ git checkout -b moment`

* Pulling the date you will get a string in milliseconds
* You need to convert that to a date and format it using Moment.js

`UserInfo.js`

```
 // MORE CODE

import moment from 'moment';

 // MORE CODE

  render() {
    const {
      username,
      email,
      joinDate,
      favorites,
    } = this.props.session.getCurrentUser;

    return (
      <div>

      // MORE CODE

        <p>Join Date: {moment(joinDate, 'x').format('MMMM MM, YYYY')}</p>
        {/* <p>Join Date: {this.formatDate(joinDate)}</p> */}

        // MORE CODE

        </ul>
      </div>
    );
  }
}

export default UserInfo;
```

* Moment JS output the date like this:

```
Join Date: September 09, 2018
```

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add moment feature`

### Push the branch to origin
`$ git push origin moment`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add moment feature`

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
* Locally your master branch doesn't have the new feature `moment` added
* To prove this checkout of your `moment` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `momente` are gone!
* View your app in the browser and it also shows now sign of your `moment` feature!
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

* You now see that our `moment` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d moment`

* That will let you know the branch was deleted with something like:

`Deleted branch moment (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
