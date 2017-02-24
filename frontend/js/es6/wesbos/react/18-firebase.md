# Persisting our `State` with Firebase
Firebase is product from Google that uses HTML5 websockets which means you can sync all of your data from your application up to Firebase and vice-versa when someone changes it in firebase, it changes it on your react app

## What Firebase does for us
* Gives us a backend database
* Makes the database realtime
    - Regardless of who has the data open, and who is editing it whether on 10 phones or 1000 phones and computers, that data will always be synced on everyone's computer

## What is Firebase?
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

Ignore the warning

We will add players to firebase but not lineup (that will be localstorage)

To add players to firebase we need to use rebase package

we will create `/src/base.js`

and we'll create a base which is a connection to our Firebase database (put your own code in)

```
import Rebase from 're-base';

const base = Rebase.createClass({
  apiKey: "AIzaSyB_KnM0lbHGaHAAIzaSyB_KnM0lbHGaHA",
    authDomain: "soccer-stars-ba8f",
    databaseURL: "https://soccer-stars"
});

export default base;
```

**note** your numbers will be different

`App.js`

```
// MORE CODE
this.state = {
    players: {},
    lineup: {}
  };

}
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/players`, {
      context: this,
      state: 'players'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
// MORE CODE
```
