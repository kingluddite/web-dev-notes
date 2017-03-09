# Persisting our `State` with Firebase
Firebase is product from Google that uses HTML5 websockets which means you can sync all of your data from your application up to Firebase and vice-versa when someone changes it in Firebase, it changes it on your react app

## What Firebase does for us
* Gives us a backend database
* Makes the database real-time
    - Regardless of who has the data open, and who is editing it whether on 10 phones or 1000 phones and computers, that data will always be synced on everyone's computer

## What is [Firebase](https://firebase.google.com/)?
Think of it at one really big object. That fits nicely with React because `State` is one really big object.

We can sync our `State` with Firebase and when any of our State changes they all will automatically sync with Firebase

### You could have multiple browsers open
Change one item and they all change in all browsers at the same time

## Sign up for Firebase Account
* Create a new Project 'Soccer Stars'
* Add this to Rules tab:

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## Ignore the warning
We will add better safe rules later. When we start we'll turn off all security and then come back and turn it on.

We will add players to Firebase but not lineup (that will be local storage)

To add players to Firebase we need to use `rebase` package

## Get connection keys on Firebase
Go to [Firebase](https://firebase.google.com/), log in and make sure you are inside your project.

### Click `Add Firebase to your web app`
And it will give you the code you need to connect Firebase to your app

* We don't need all of this info, just the `apiKey`, `authDomain` and `databaseURL`

## Create `/src/base.js`

## Create a base 
A connection to our Firebase database (put your own code in)

```
import Rebase from 're-base';

const base = Rebase.createClass({
  apiKey: "AIzaSyB_KnM0lbHGaHAAIzaSyB_KnM0lbHGaHA",
    authDomain: "soccer-stars-ba8f",
    databaseURL: "https://soccer-stars"
});

export default base;
```

* We make sure we `export` the base URL so we can access this database connection from anyone of our files

## Import base into `App.js`

`App.js`

```
import React from 'react';
import Header from './Header';
import Lineup from './Lineup';
import Roster from './Roster';
import samplePlayers from '../sample-players';
import Player from './Player';
import base from '../base'; // add this line
```

#### Is is safe to put our API key on the client?
No. And that is where the authentication rules on Firebase will come in handy to make our App safer

**note** your numbers will be different

## [React Component Lifecycle](https://facebook.github.io/react/docs/react-component.html)
Gives us a bunch of entry points into a Component

When a Component is being mounted (aka being rendered onto the page) there is different entry points of where it (the Component) can hook into and do various things (like an AJAX request or check for any number of items or in our case we will connect to `rebase`)

### [componentWillMount()](https://facebook.github.io/react/docs/react-component.html#componentwillmount)
Is invoked immediately before mounting occurs. It is called before `render()`, therefore setting state in this method will not trigger a re-rendering. Avoid introducing any side-effects or subscriptions in this method. This is the only lifecycle hook called on server rendering. Generally, we recommend using the `constructor()` instead.

`componentWillMount()` will help us sync our Component `state` with our Firebase `state`

```
componentWillMount() {
      this.ref = base.syncState(`${this.props.params.teamId}/players`, {
        context: this,
        state: 'players'
      });
    }
```

* `base.syncState(string that points to actual piece of your Firebase that you want to sync with, `

![screenshot of firebase database](https://i.imgur.com/eNYwv40.png)

* Top level is entire database - we don't want to sync our entire database, we just want to sync our one team
    - So the path would be like /name of our Firebase db project/name of our team/players (example: `base.syncState(`panicky-lazy-fungi/players`)
        + But that is static and we need to create this name dynamically
            * How can we grab this name dynamically? Via `props`

### View React tab
Search for `App` and you'll see a bunch of `Props` listed. One is `params` (_We never did anything to populate params but React Router did this for us because it knew we may need the `teamId` value_)

![params - teamId](https://i.imgur.com/olrwnTb.png)

**note** We defined `teamId` in `index.js` in this line of code: `<Match pattern="/team/:teamId" component={App} />`

### Access the players
So to access that value we use `this.props.params.teamId` and to we will be syncing the `players` of that team so our code becomes **base.syncState(`${this.props.params.teamId}/players`**

![Firebase players](https://i.imgur.com/OnEtozH.png)

### Pass in Object
has `context` of **this** and the `state` which will be `players`

And when that is all done, our full code will be:

```js
componentWillMount() {
  this.ref = base.syncState(`${this.props.params.teamId}/players`, {
    context: this,
    state: 'players'
  });
}
```

**note** We also have a `lineup` **state** but we only want to do this for `players` **state**

## Problem
What happens if we switch from one `team` to another `team`?

### `componentWillUnmount()`
We need to stop syncing as soon as we go to another team and we do this with `componentWillUnmount()`. If we don't we will build up a gazillion listeners behind the scenes and our app will grind to a halt or get super slow

```js
componentWillUnmount() {
  base.removeBinding(this.ref);
}
```

**note** We are using the `this.ref` we captured when we used `componentWillMount()` so that we could use that `this.ref` when we want to stop syncing and unmount

## Test it out
Fire up your app and create a new team. Check Firebase to see if the team was added

![teams added to Firebase database](https://i.imgur.com/scDNwNE.png)

### What a Refreshing feeling!
Now if you refresh your page, all your data is immediately synced up with Firebase. We can now make changes to it on the Firebase side or my app side and they will stay in sync

The great thing about this is now as a developer you only care about your `state` and everything else your HTML and Firebase will be listening to the state and update everything when `state` changes, 
### Other Components for Lifecycle
* componentDidMount()
* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate()
* componentDidUpdate()
* componentWillUnmount()
* setState()
* forceUpdate()

`App.js`

```
// MORE CODE
this.state = {
    players: {},
    lineup: {}
  };

}
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.teamId}/players`, {
      context: this,
      state: 'players'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
// MORE CODE
```
