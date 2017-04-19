 # Render Player List
## Exercise 1
Render the real players information to the page

**hints**

* This will happen on the `Client` side
* This will happen inside `Meteor.startup()`
* This should involve `Meteor.startup()`
* This should use `Tracker.autorun()` and in the **callback** you should created a variable that is equal to `Players.find().fetch()`
* Move all our current code inside `Meteor.startup()` inside `Tracker.autorun()`

<details>
  <summary>Solution</summary>
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
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```
</details>

## Exercise
Insert a new Document into the players Collection on the `client`. This will be a dummy document with static data.

**note** Comment out `server/main.js` so we won't keep adding Documents to our Players' Collection every time we restart our app

Grab that same code and use it outside of `Tracker.autorun()` but inside `Meteor.startup()`

We want to add `console.log()` to see our collection but we will add this log statement to the server and not to the client because our goal is to insert something into MiniMongo but have **DDP** sync up the data with MongoDB on our server

* **note** If you had two browser tabs open to the app, you will see the name you used will be entered twice. One tab inserted one, and the other tab inserted the other. The local inserts were synced to the **DDP** to the `server` and then the `server` synced them with all other `clients` and that's why we see the name twice

** To view in Mongo `> meteor mongo` and use `db.players.find()` to see all our players in our Players collection

### Take note of security implications
* Can any browser insert anything they want into the database?
* Can any browser fetch every single player? Including private information?
* Right now, the answer is yes but we can configure this to be very secure




