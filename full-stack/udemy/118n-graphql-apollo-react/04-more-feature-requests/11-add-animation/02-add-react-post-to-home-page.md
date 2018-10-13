# Add react pose to home page

## Install react-pose
`$ cd client`

`$ npm i react-pose`

## We'll need state ----> convert to class
* We need to convert our home page form SFC to a CBC

`App.js`

* Make the necessary changes to make your `App.js` look like the code below

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';

import './App.scss';

// components
import CologneItem from './Cologne/CologneItem';

import { GET_ALL_Colognes } from '../queries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Colognes you <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_Colognes}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return (
              <ul className="cards">
                {data.getAllColognes.map(Cologne => (
                  <CologneItem key={Cologne._id} {...Cologne} />
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
```

## Import react-pose

`App.js`

```
import React, { Component } from 'react';
import posed from 'react-pose';

// MORE CODE
```

## Add our special HTML element that we want to put the animation on
* We'll animate our `ul` so we can animate all our cards
* We pick off the `ul` because that is where we want to target our animation
* We swap out the `ul` for our new `CologneList` pose component

`App.js`

```
// MORE CODE

const CologneList = posed.ul({} );

class App extends Component {

// MORE CODE

return (
  <CologneList className="cards">
    {data.getAllColognes.map(Cologne => (
      <CologneItem key={Cologne._id} {...Cologne} />
    ))}
  </CologneList>
);

// MORE CODE
```

## Add our state
`App.js`

```
// MORE CODE

const CologneList = posed.ul({}); // add this

class App extends Component {
  state = { // add the state
    on: false,
  };

  // add this so that it happens as soon as component is rendered
  componentDidMount = () => { 
    setTimeout(this.func, 200);
  };

  func = () => {
    this.setState({ on: !this.state.on });
  };

// MORE CODE
```

## sliding in
* Since our animation will involve sliding in let's call our animation function `slideIn`

`App.js`

```
// MORE CODE

componentDidMount = () => {
  setTimeout(this.slideIn, 200);
};

slideIn = () => {
  this.setState({ on: !this.state.on });
};

// MORE CODE
```

### Add our ternary

`App.js`

```
// MORE CODE

if (error) return <div>Error</div>;
// console.log(data);

const { on } = this.state;

return (
  <CologneList className="cards"
   pose={on ? '???' : '???'}>

// MORE CODE
```

* Those `???` will correspond how we name our different properties within our config object

### CAUTION - pose vs posed
* The library is called react-pose but our variable is `posed` but the attribute when we call `CologneList` component above is `pose` (This tripped me up and I spent 30 minutes trying to figure out what the heck I did wrong)

```
// MORE CODE

const CologneList = posed.ul({
  shown: {
    x: '0%',
  },
  hidden: {
    x: '-100%',
  },
});

// MORE CODE
```

* Now we use `end` and `start` here:

```
// MORE CODE

return (
  <CologneList className="cards" pose={on ? 'shown' : 'hidden'}>

// MORE CODE
```

## Start up your app again
* In root of app (make sure you are not inside your `client` folder!)

`$ npm run dev`

## Test
* View home page and you should see a nice slide in animation

## staggerChildren
* Traditionally, coordinating animation across multiple children has been an involved process (Especially with React)
    - With Pose, it’s as simple as animating just one
* Rather than animating all the children in at once, it’s possible to stagger them in individually
* The `staggerChildren` prop can be used to determine the delay between each one, starting from after the `delayChildren` duration
* [docs](https://popmotion.io/pose/learn/animating-children/)

```
// MORE CODE

const CologneList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x: '-100%',
  },
});

// MORE CODE
```

## Now we want to animate all the children
* The children are inside `CologneItem.js`

## What special element do you want to animate?
* The `li`
* So we need to jump into the `CologneItem` component

`CologneItem.js`

```
 // MORE CODE
import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const CologneItem = posed.li({

});
 // MORE CODE
```

## Rename LI to CologneLi
* Convert SFC to class
* I want to avoid a name collision

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const CologneLi = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 },
});

class CologneItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };

  render() {
    const { _id, firstName, lastName, imageUrl, category } = this.props;
    return (
      <CologneLi
        style={{
          background: `url(${imageUrl}) center center / cover no-repeat`,
        }}
        className="card"
      >
        <span className={category}>{category}</span>
        <div className="card-text">
          <Link to={`/Cologne/${_id}`}>
            <h4>{firstName} {lastName}</h4>
          </Link>
        </div>
      </SongLi>
    );
  }
}

export default CologneItem;
```

## Test
* Now we slide in and stagger the opacity of the children

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add animation feature`

### Push the branch to origin
`$ git push origin animation`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add animation feature`

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
* Locally your master branch doesn't have the new feature `animation` added
* To prove this checkout of your `animation` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `animation` are gone!
* View your app in the browser and it also shows now sign of your `animation` feature!
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

* You now see that our `animation` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d animation`

* That will let you know the branch was deleted with something like:

`Deleted branch animation (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
