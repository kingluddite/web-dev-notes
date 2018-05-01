# Persisting our `State` with Firebase
* Firebase is product from Google that uses HTML5 websockets which means you can sync all of your data from your application up to Firebase and vice-versa when someone changes it in Firebase, it changes it on your React app

## What Firebase does for us
* Gives us a backend database
* Makes the database real-time
    - Regardless of who has the data open, and who is editing it whether on 10 phones or 1000 phones and computers, that data will always be synced on everyone's computer

## What is [Firebase](https://firebase.google.com/)?
* Think of it at one really big object
* That fits nicely with React because `state` is one really big object
* We can sync our `state` with Firebase and when any of our `state` changes they all will automatically sync with Firebase

### You could have multiple browsers open
* Change one item and they all change in all browsers at the same time

## Create `/src/base.js`

## Create a base 
A connection to our Firebase database (put your own code in)

```
import Rebase from 're-base';
import firebase from 'firebase';


```

* `re-base`
  - Will allow us to mirror our firebase to our `state`
* We also need the `firebase` package that will pull in anything we need in addition to our `state`

## Firebase console
* Click Database tab of your Soccer Stars project
* Two types - for simplicity choose Realtime Database
* Click `start in test mode`
  - That will do this:

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

* Warns you that anyone can read write to your DB
* Click `Enable`

## Import re-base
`$ npm intall re-base firebase`

## Get API keys
* Project Overview > Click add firebase to your web app
* Copy it and make your `base.js` look like:

```
/* eslint import/no-unresolved: 0 */
import Rebase from 're-base';
import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCOt9-2BaDln7SCGMFsRpLM3CWiN6c7U5c',
  authDomain: 'my-soccer-lineup.firebaseapp.com',
  databaseURL: 'https://my-soccer-lineup.firebaseio.com',
};
const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
```

* We remove stuff we are not using that firebase also provides
* .database() returns our firebase database

## We need to...
* Mirror our Player state over to our firebase
* To do this we need to wait until our App is `mounted`

## [Lifecycle Methods](https://reactjs.org/docs/react-component.html)
* What are lifecycle methods?
  - Think of jQuery and `document.ready()`
    + When the DOM has been fully downloaded
  - Or JavaScript `window.onLoad()`
    + When all the images have been downloaded

## ComponentDidMount
* The is one React LifeCycle method
* Think of it as a **hook** into the very first instant the App is loaded onto the page

### Mounting
* constructor()
* componentWillMount()
* render()
* componentDidMount()

### Updating
* componentWillReceiveProps()
* shouldComponentUpdate()
* componentWillUpdate()
* render()
* componentDidUpdate()

### Unmounting
* componentWillUnmount()

### Error Handling
* componentDidCatch()

## Test out componentDidMount
`App.js`

```
// MORE CODE
class App extends React.Component {
  state = {
    players: {},
    lineup: {},
  };

  componentDidMount() {
    console.log('Mounted!');
  }
// MORE CODE
```

* View in browser and you'll see `Mounted!`

## Bring in firebase to our App
* Import it
* this.ref ---> references data in the database (not the ref we use in React)

### What do we sync with
* Not the entire database
* Just our specific team
* How do we get the name of the team?
  - When we generate the team at the beginning it creates it and stores it in the URL parameter

`http://localhost:8080/team/old-fashioned-plain-potatoes`

* How can we access that team name in the URL?

#### Check it out in React tab
* Find App
* View the Props
* These are from React Router
* View match and expand it
    - You will see params
      + Expand params
          * You will see `teamId` and that has a value of the team name

![teamId and team name](https://i.imgur.com/eIHeS7b.png)

```
/* eslint react/prop-types: 0 */
import React from 'react';
import Header from './Header';
import Lineup from './Lineup';
import Roster from './Roster';
import samplePlayers from './../sample-data/sample-player-data';
import Player from './Player';
import base from './../base';

class App extends React.Component {
  state = {
    players: {},
    lineup: {},
  };

  componentDidMount() {
    // this is if you destructure it
    // const { params } = this.props.match;
    // this.ref = base.syncState(`${params.teamId}`);
    this.ref = base.syncState(`${this.props.match.params.teamId}/players`, {
      context: this,
      state: 'players',
    });
  }
// MORE CODE
```

* Above will mirror our players state
* syncState also requires an object
  - context
  - state we will sync
* The destructure comment above can be used to shorten your code
* We do /players because we care about the players in maintaining persistence
  - Firebase makes going deeper into nested objects as easy as using a forward slash for each nested object `one/two/three`
  - /players will mirror our state
  - We also need to provide an object with context and our `state` we are going to sync

### Check this super cool feature out
* Change the data in firebase and watch your web app change in real time!

### Fix memory leaks
* If you go back to the home page and switch to another team
* You are still listening for changes on old team
* You sign up for another team and players
* Go back home, still listening to that team
* This will cause a **memory leak**
* You need to clean up when you **unmount**

#### Fix memory leaks
* **note** If you view a team and add players and then change the URL back to localhost:8080 you will not see unmounted
* But if you are on home page and view a team, the HIT THE BACK BUTTON, you will see `unmounted!`
* That triggered an unmount lifecycle because the App component is no longer showing

#### How do we remove our firebase from the component?
* By referring to the `this.ref` we stored the reference to the database

`App.js`

```
// MORE CODE
componentDidMount() {
  // this is if you destructure it
  // const { params } = this.props.match;
  // this.ref = base.syncState(`${params.teamId}`);
  this.ref = base.syncState(`${this.props.match.params.teamId}/players`, {
    context: this,
    state: 'players',
  });
}

componentWillUnmount() {
  base.removeBinding(this.ref);
}

addPlayer = player => {
// MORE CODE
```

* **note** might get a strange prettier unmounting error but after stopping the server, refreshing app it went away

## Persistent data
* Now load players and refresh browser and they return
* We now have persistent data because we are storing it inside the DB































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
No. 

And that is where the authentication rules on Firebase will come in handy to make our App safer

**note** Your numbers will be different

## [React Component Lifecycle](https://facebook.github.io/react/docs/react-component.html)
Gives us a bunch of entry points into a Component

When a Component is being mounted (_aka being rendered onto the page_) there is different entry points of where it (_the Component_) can hook into and do various things (_like an **AJAX** request or check for any number of items or in our case we will connect to `rebase`_)

### [componentWillMount()](https://facebook.github.io/react/docs/react-component.html#componentwillmount)
* Is invoked immediately before mounting occurs
* It is called before `render()`, therefore setting `state` in this method will not trigger a re-rendering
* Avoid introducing any side-effects or subscriptions in this method. This is the only lifecycle hook called on server rendering. Generally, we recommend using the `constructor()` instead.

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
    - So the path would be like: `/name of our Firebase db project/name of our team/players` (_example: ``base.syncState(`panicky-lazy-fungi/players``_)
        + But that is static and we need to create this name dynamically
            * How can we grab this name dynamically? 
                - Via `props`

### View React tab
Search for `App` and you'll see a bunch of `Props` listed. One is `params` (_We never did anything to populate params but React Router did this for us because it knew we may need the `teamId` value_)

![params - teamId](https://i.imgur.com/olrwnTb.png)

**note** We defined `teamId` in `index.js` in this line of code: 

`<Match pattern="/team/:teamId" component={App} />`

### Access the players
So to access that value we use `this.props.params.teamId` and we will be syncing the `players` of that team so our code becomes **base.syncState(`${this.props.params.teamId}/players`**

![Firebase players](https://i.imgur.com/OnEtozH.png)

### Pass in Object
Has `context` of **this** and the `state` which will be `players`

And when that is all done, our full code will be:

```js
componentWillMount() {
  this.ref = base.syncState(`${this.props.params.teamId}/players`, {
    context: this,
    state: 'players'
  });
}
```

**note** 

* We also have a `lineup` **state**
* But we only want to do this for `players` **state**

## Problem
What happens if we switch from one `team` to another `team`?

### `componentWillUnmount()`
* We need to stop syncing as soon as we go to another team and we do this with `componentWillUnmount()`
* If we don't we will build up a gazillion listeners behind the scenes and our app will grind to a halt or get super slow

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
* We will add better safe rules later. When we start we'll turn off all security and then come back and turn it on
* We will add players to Firebase but not lineup (that will be local storage)
* To add players to Firebase we need to use `rebase` package

## Get connection keys on Firebase
* Go to [Firebase](https://firebase.google.com/), log in and make sure you are inside your project.

### Click `Add Firebase to your web app`
* And it will give you the code you need to connect Firebase to your app
* We don't need all of this info, just the `apiKey`, `authDomain` and `databaseURL`

