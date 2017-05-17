# Insert Players from a Form
* Right now we are working with dummy Documents
    - The names are always the same static players

## Next
* Now we'll ask the user of the app to supply the player name
* They won't be able to pick a score (_We'll always start them at zero_)
* The player name will get added when they submit the form

## Focus on JSX
* We'll now use dynamic variables in our Mongo `insert()` for the name
  - But the score will still be **static**
      + It will default to `0` whenever a **player** is inserted

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

const renderPlayers = function(playersList) {
   return playersList.map(function(player) {
    return <p key={player._id}>{player.name} has {player.score} {(player.score === 1 || player.score === -1) ? 'point' : 'points'}.</p>
   });
}

const handleSubmit = function (event) {
  const playerName = event.target.playerName.value;

  event.preventDefault();

  if (playerName) {
    event.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 0
    });
  }

};

Meteor.startup(function() {

  Tracker.autorun(function() {
    const players = Players.find().fetch();

    let title = 'Score Keep';
    let name = 'PEH2'
    let jsx = (
      <div>
        {/* Put new h1 here */}
        <h1>{title}</h1>
        <p>Hello {name}</p>
        <p>Second</p>
        {renderPlayers(players)}
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player Name"/>
          <button>Add Player</button>
        </form>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```

### How can we delete data?
It's starting to get long and unruly

There are several ways. Here's a quick, easy solution

#### Shut down meteor
* This is one of the few commands we can not run in another tab
* It needs to be executed when the meteor app is down.

`$ ctrl + c` then use `$ meteor reset` then `$ meteor run`

When app starts up, you will get a fresh install with no players listed. 

Add 3 players

## Review
* We created a form with pure HTML elements
* But we added an event listener by adding `onSubmit` attribute that pointed to the `handleSubmit` function
  - **event listener** - every time the form gets submitted we want to run this code
    - We get the player name
    - We prevent a full page refresh
    - If the player name is valid (_one was provided_)
        + We clear the form field (_usability improvement_)
        + Insert the player into the players Collection
    - **DDP** will make this sync to all other browsers
        + Test this out by opening two browsers side-by-side
            * Add a player in one browser and it will immediately appear in both browsers
            * This is all because of **DDP**
              - It syncs the `MiniMongo` database(s) on the `client`(s) with the **MongoDB** database that the `server` has access to, then that gets synced to all other connections
