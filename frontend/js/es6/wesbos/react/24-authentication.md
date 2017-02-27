# Authentication
## Currently anyone can build and access a Team. Not good for a real world app

We should have owners of a store and that owner should be the only one able to edit it

## How it will work
First person to log in to Team will be coach of team


## Lock down client side
## Lock down Firebase side
* Log in to Firebase
* Click `Authentication` tab
* Click in `Sign-in-method`

## Log into facebook for developers

- Add a new app
- Give it a name and category and click create
- facebook login - click get started
- Enter - `Valid OAuth redirect URIs` - in your Authentication on Firebase, 
- Expand Facebook and copy the OAuth redirect URI and paste it into the `Valid OAuth redirect URI`
- Click enter (_so you see a blue bubble_) and then click `Yes` for `Embedded Browser OAuth Login`
- Scroll to bottom and click `Save Changes`
- Go to Dashboard of Facebook and copy the `App ID`
- Go to Firebase Facebook Authentication page, click `Enable` and paste into App ID the Facebook App ID
- Show the Secret on the Facebook Dashboard, copy it and paste it into the Facebook `App secret` box of the Firebase Authentication
- Click the `Save` button in Firebase
    + Never put the `secret` in any client side code

## Do Same thing for Twitter
Twitter dev page
Sign up and create new app
Enter name, description and website
You get the Callback URL from Firebase
Under `Keys and Access Tokens` copy and paste the API key and API Secret to Firebase from Twitter and Click save on firebase

Github
Github login, Settings, OAuth Applications, Register a new application
Enter name, URL (copy callback URL from Firebase and paste into github) and click register application
Copy client ID, and client secret to Firebase and click Save

**important** We need to put our client id and secret inside Firebase because we are building a client side app and all our code could be available to the browser so we need to be extra careful with it

### Code Time
We will use the `Roster` component to write our code that will show our Facebook, Twitter and Github OAuth buttons

#### Above `renderRoster()` add this code
```
renderLogin() {
    return (
      <h2>Roster</h2>
      <p>Sign in to manage your team's roster</p>
      <button className="github" onClick={() => this.authenticate('github')}>Log In With Github</button>
      <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In With Facebook</button>
      <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In With Twitter</button>
    )
}
```

## bind `this` to `renderLogin()`

```
constructor() {
  super();
  this.renderRoster = this.renderRoster.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.renderLogin = this.renderLogin.bind(this); // add this line
}
```

##
current logged in user - `this.state.uid`
current team owner

We need to check if current logged in user and team owner are same person

```
render() {
    // check if they are not logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    
    return (
      <div>
        <h2>Roster</h2>
```

Our `renderLogin()` needs to be nested inside a `div` because React `render()` can only return one parent

```
renderLogin() {
    return (
      <div>
        <h2>Roster</h2>
        <p>Sign in to manage your team's roster</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In With Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In With Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In With Twitter</button>
      </div>
    )
  }
```

### error
Can not read `uid` property of null

We need to set inside our constructor a `uid` and a team owner

```
class Roster extends React.Component {
  constructor() {
    super();
    this.renderRoster = this.renderRoster.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }
```

### View in page and you'll see oAuth login buttons
But clicking any of the 3 buttons and you get _this2.authentication is not a function (we haven't created that function yet)

#### Check if user is owner of team
```
render() {
    const logout = <button>Log Out</button>;
    // check if they are not logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // check if they are the owner of the current team
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the coach of this team.</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Roster</h2>
        {logout}
        {Object.keys(this.props.players).map(this.renderRoster)}
        <AddPlayerForm addPlayer={this.props.addPlayer} />
        <button onClick={this.props.loadSamples}>Load Sample Players</button>
      </div>
    )
  }
```

* We add a `log out` button
* We check if `this.state.uid !== this.state.owner` (if currently logged in user is owner of team)

### Test buttons
```
authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
  }
```

View in browser and click buttons and we output in console which button was clicked

## Bind authenticate to Component
```
  constructor() {
    super();
    this.renderRoster = this.renderRoster.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this); // add this line
    this.state = {
      uid: null,
      owner: null
    }
  }
```

## Time to interact with Firebase
We need to import our `base`

```
import React from 'react';
import AddPlayerForm from './AddPlayerForm';
import base from '../base'; // add this line
```

### authenticate update and authHandler
```
authenticate(provider) {
  // console.log(`Trying to log in with ${provider}`);
  base.authWithOAuthPopup(provider, this.authHandler);
}

authHandler(err, authData) {
  console.log(authData);
}
```

#### Bind authHandler to Component
```
constructor() {
    super();
    this.renderRoster = this.renderRoster.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this); // add this line
    this.state = {
      uid: null,
      owner: null
    }
  }
```

## Click `Log in with Github` button
This window pops up

![github oauth](https://i.imgur.com/4tiOeuL.png)

Click Authorize application (first time you have to accept this and then future times you won't)

After a pause, we get back to console an Object with credential and user info

#### What do we want to do with this data?
Store it in state so we can re-render the Roster and replace the buttons with the team roster of the logged in user who is also the team owner

If the user authenticates, we need to grab a reference to our actual team (and then we'll `a)` claim it as our own and `b)` as well as update our state

we will contect directly to firebase, grab all the info about the current team, and then when that info comes back from Firebase

* At this point
    - We have all the info about the team
    - We know we have person who is logged in
    - We need to check if the person owns the team
        + if not, is someone else the owner?
        + if that is not true, we'll set them as the owner (they were the first person to log in)
        + otherwise we won't set them as owner

`base.database()` - will connect us directly with our Firebase database which will allow us to use any of the existing Firebase APIs

`base.database().ref()` - Just gives us a piece (just our team) of our database - not the entire database 

Normally we would use `base.database().ref('our-team-name')` - but we can't because we need this to be dynamic, so we will need to pass down the team

`App.js`

Update the Roster Component

```
<Roster
  addPlayer={this.addPlayer}
  loadSamples={this.loadSamples}
  players={this.state.players}
  updatePlayer={this.updatePlayer}
  removePlayer={this.removePlayer}
  teamId={this.props.params.teamId}
/>
```

* we added `this.props.params.teamId`
    - We can view this by Search React tab and looking under Props > params and we'll see `teamId`


`Roster.js`

We then add to our PropTypes for the Roster component

```
Roster.propTypes = {
  addPlayer: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  players: React.PropTypes.object.isRequired,
  removePlayer: React.PropTypes.func.isRequired,
  updatePlayer: React.PropTypes.func.isRequired,
  teamId: React.PropTypes.string.isRequired
}
```

Now we can point to the current team in Firebase

`const teamRef = base.database().ref(this.props.teamId);`

**note** `snapshot` is from Firebase and it is a snapshot of all the data

```
authHandler(err, authData) {
    //console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the team info
    const teamRef = base.database().ref(this.props.teamId);
    // query the firebase once for the team data
    teamRef.once('value', (snapshot) => {
      // get the data or store an empty object {}
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        teamRef.set({
          owner: authData.user.uid
        })
      }
    });
  }
```

* Look at Firebase team right now, no owner but if you log in with Github OAuth, you will see your team has a owner and you are the new owner!

But we can't load new players or see our roster or add new players

## Set the `state` locally in our application as well

```
if(!data.owner) {
    teamRef.set({
      owner: authData.user.uid
    });
  }

  this.setState({
    uid: authData.user.uid,
    owner: data.owner || authData.user.uid
  })
```

### Now when you log in with Github you can load the sample players, edit players create new players and add players to the lineup and remove them

### Problem
Every time you refresh, you have to log in again

### Time to use a Lifecyce again `componentDidMount()`

`Roster.js` (just above `handleChange()` method)

**good practice** - Put all Lifecycle stuff above custom stuff and put render() at bottom

`base` - our db

`.onAuth()` - ( kind of like a jQuery event on('auth') ) - will listen when we load the page, Firebase will try to immediately authenticate by itself if it can, and when that happens we will run the user, then we'll check if there is a user and if there is we'll call `this.authHandler()` again and we'll pass the user along with it

* we call authHandler once when the user get signed in the first time
* and also every single time we reload the page

```
componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }
```

Now when you refresh you don't see the log in buttons (you actually do see them for a second but then they disapper - you could use alternate Lifecycle to prevent the flash of login buttons ( same issue with refreshing the lineup))

## Hook up Log Out button on client side
