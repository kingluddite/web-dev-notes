# First React Component

`server/main.js`

Make it look like:

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  
});
```

## Our starting client side code
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

const checkPoints = (playerPoints) => {
  return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
}

const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: 1} } );
         }}>+1</button>
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: -1} } );
         }}>-1</button>
         <button onClick={() => Players.remove(player._id)}>X</button>
       </p>
     );
   });
}

const handleSubmit = event => {
  const playerName = event.target.playerName.value;

  event.preventDefault();

  if (playerName) {
    event.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 1
    });
  }

};

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const jsx = (
      <div>
        {/* Put new h1 here */}
        <h1>{title}</h1>
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

## Goal - Create <TitleBar />
Create Component that will rendered colored bar with Application title

![diagram](https://i.imgur.com/zcseWMa.png)

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

const checkPoints = (playerPoints) => {
  return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
}

const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: 1} } );
         }}>+1</button>
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: -1} } );
         }}>-1</button>
         <button onClick={() => Players.remove(player._id)}>X</button>
       </p>
     );
   });
}

const handleSubmit = event => {
  const playerName = event.target.playerName.value;

  event.preventDefault();

  if (playerName) {
    event.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 1
    });
  }

};

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>My App Name</h1>
       </div>
    );
  }
}

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar />
        <TitleBar />
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

We now have a reusable Component

```
const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar />
        <TitleBar />
        {renderPlayers(players)}
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player Name"/>
          <button>Add Player</button>
        </form>
      </div>
    );
```

`imports/ui/components/TitleBar.js`

Move the code from `client/main.js` to `TitleBar.js`

```
import React, { Component } from 'react';

class TitleBar extends React.Component {
  render() {
    return (
       <div>
         <h1>My App Name</h1>
       </div>
    );
  }
}

export default TitleBar;
```

* All our Components will reside inside `components`

## Import to client/main.js
`import TitleBar from './../imports/api/ui/components/TitleBar';`

Make the Add Player form a Component

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';
import TitleBar from './../imports/api/ui/components/TitleBar';
import AddPlayer from './../imports/api/ui/components/AddPlayer';

const checkPoints = (playerPoints) => {
  return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
}

const renderPlayers = playersList => {
   return playersList.map( player => {
     return (
       <p key={player._id}>
         {player.name} has {player.score} {checkPoints(player.score)}.
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: 1} } );
         }}>+1</button>
         <button onClick={() => {
           Players.update( player._id, { $inc: { score: -1} } );
         }}>-1</button>
         <button onClick={() => Players.remove(player._id)}>X</button>
       </p>
     );
   });
}

const handleSubmit = event => {
  const playerName = event.target.playerName.value;

  event.preventDefault();

  if (playerName) {
    event.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 1
    });
  }

};

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar />
        {renderPlayers(players)}
        <AddPlayer />
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```


