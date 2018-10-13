# Display Cologne Image on Home page and Build Card
* We could add a URL to our image file UI form but it won't show an image on the home page

## Jump into our queries
`queries/index.js`

* Make sure we are returning our `imageUrl` field and `description` fields

```
// MORE CODE

/* Cologne Queries */
export const GET_ALL_COLOGNES = gql`
  query {
    getAllColognes {
      ...CompleteCologne
    }
  }
`;

// MORE CODE
```

* We added a fragment here so look in the fragment and make sure the fields have been added

## Log it to test
`App.js`

* We will `comment in` our log to see the values we are getting in the client
* We are checking to make sure imageUrl and description have been added

```
// MORE CODE

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_COLOGNES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);

// MORE CODE
```

### View home page
* Refresh
* You will see something like this
* **note** we now have a `imageUrl` and `category` fields available

![imageUrl and category available](https://i.imgur.com/4tVOLkg.png)

* You should also see `description`

## CologneItem
* You'll see in `App.js` that we are passing down all `Cologne` fields to `CologneItem` component using `{...Cologne}`
* Then inside `CologneItem` we destructure `imageUrl` and `category`
* We'll set the `imageUrl` as the background for `<li>`

`CologneItem.js`

```
import React from 'react';
import { Link } from 'react-router-dom';

const CologneItem = ({ _id, firstName, lastName, imageUrl, category }) => {
  return (
    <li
      style={{
        background: `url(${imageUrl}) center center / cover no-repeat`,
      }}
      className="card"
    >
      <span className={category}>{category}</span>
      <div className="card-text">
        <Link to={`/Cologne/${_id}`}>
          <h4>
            Name: {firstName} {lastName}
          </h4>
        </Link>
      </div>
    </li>
  );
};

export default CologneItem;
```

* **note** We are using a `dynamic` class name

`App.js`

* Add a simple class name

```
// MORE CODE

return (
  <ul className="cards">

// MORE CODE
```

## Test it out
* Delete the last Cologne and create a new one with a valid `imageUrl` (live link working)

### Add CSS
* We need to add CSS for the `category` we selected
* You would need to add a class for each `category`
* But let's add one for historic

`App.css`

```
// MORE CODE

.Fresh {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  color: white;
  background: linear-gradient(to right, #b24592, #f15f79);
  border-radius: 50px 120px 120px;
}

// MORE CODE
```

* Test and the `card` will look nice and it changes when you hover over it
* We do that animation using CSS

## Make `title` better on home page
`App.js`

```
// MORE CODE

const App = () => (
  <div className="App">
    <h1 className="main-title">
      Find Colognes you <strong>Love</strong>
    </h1>

// MORE CODE
```

## Add a few colognes
* You'll see we also have a responsive page

## Make our single page `ColognePage` look better using CSS
* Are we getting the `imageUrl` field on `ColognePage`?

`ColognePage.js`

```
// MORE CODE

const ColognePage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_COLOGNE} variables={{ _id }}>

// MORE CODE
```

* We need to look at `queries/index.js` to see if we are pulling in the `imageUrl` field

`index.js`

* Looks like we need to check in `fragments.js`

```
// MORE CODE

export const GET_COLOGNE = gql`
  query($_id: ID!) {
    getCologne(_id: $_id) {
      ...CompleteCologne
    }
  }
  ${cologneFragments.cologne}
`;

// MORE CODE
```

`fragments.js`

```
// MORE CODE

export const CologneFragments = {
  Cologne: gql`
    fragment CompleteCologne on Cologne {
      _id
      firstName
      lastName
      imageUrl
      category

// MORE CODE
```

* Yes we are pulling that `imageUrl` field in

## Add emoji's on you mac
* [add emoji to your mac tips](https://www.imore.com/how-to-use-emoji-on-your-mac)
* Open Mac OS `System Preferences`
* Select Keyboard
* Check `Show keyboard and emoji viewer in Menu Bar`

![show emoji](https://i.imgur.com/XJeaLqc.png)

![emoji dropdown](https://i.imgur.com/Zg3dAgx.png)

![choose the heart](https://i.imgur.com/ndsJqnr.png)

## Final ColognePage

```
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

// components
import LikeCologne from '../Cologne/LikeCologne';

// queries
import { GET_COLOGNE } from '../../queries';

const ColognePage = ({ match }) => {
  const { _id } = match.params;
  // console.log(match.params._id);
  return (
    <Query query={GET_COLOGNE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        // console.log(data);

        return (
          <div className="App">
            <div
              style={{
                background: `url(${
                  data.getCologne.imageUrl
                }) center center / cover no-repeat`,
              }}
              className="Cologne-image"
            />

            <div className="Cologne">
              <div className="Cologne-header">
                <h2 className="Cologne-name">
                  <strong>
                    {data.getCologne.firstName} {data.getCologne.lastName}
                  </strong>
                </h2>
                <h5>
                  <strong>{data.getCologne.category}</strong>
                </h5>
                <p>
                  Created by <strong>{data.getCologne.username}</strong>
                </p>
                <p>
                  {data.getCologne.likes}{' '}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </p>
              </div>
              <blockquote className="analogy-description">
                {data.getCologne.description}
              </blockquote>
              <LikeCologne _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(ColognePage);
```

* We add `role="img" aria-label="heart"` so React doesn't throw errors at us

## Test in browser
* You now have a styled `ColognePage`

## Style the Like button and align it to the right of the page

`LikeCologne.js`

```
// MORE CODE

<button
  onClick={() =>
    this.handleClick(likeCologne, unlikeCologne)
  }
  className="like-button"
>
  {liked ? 'Unlike' : 'Like'}
</button>

// MORE CODE
```

![like button styled](https://i.imgur.com/MQqwS0b.png)

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add image feature`

### Push the branch to origin
`$ git push origin image`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add image feature`

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
* Locally your master branch doesn't have the new feature `image` added
* To prove this checkout of your `image` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `imagee` are gone!
* View your app in the browser and it also shows now sign of your `image` feature!
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

* You now see that our `image` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d image`

* That will let you know the branch was deleted with something like:

`Deleted branch image (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
