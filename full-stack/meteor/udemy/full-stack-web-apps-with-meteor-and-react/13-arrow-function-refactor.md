# Arrow Function Refactor
Update `server/main.js` to look like:

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(function() {

});
```

Convert to ES6 arrow functions

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});
```

## Try to convert `client/main.js` to use ES6 Arrow functions
Here is my solution

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

* When converting you don't always have to make as small as possible
* I broke out my "points of point" function into it's own function just to keep my code from getting too long in one line (_I guess that was the point of that function :) - pun intended _)
* It is good to balance statement syntax and expression syntax
    - Sometimes expression syntax will make your lines really long and it is a good rule of thumb to keep you lines from exceeding 80 characters
    - Text Editors like Atom has lines to guide you from exceeding 80 characters and here is an [example of what that looks like](https://i.imgur.com/z1YKPB0.png) - The gray vertical line on the right
* If we had an object method in this file we would NOT have converted that into a arrow function

### Atom info
Atom has a package called [Wrap Guide](https://i.imgur.com/OKaQ0iU.png) that is activated by default and the gray vertical line will appear wherever your `Preferred Line Length` ([in Editor Settings](https://i.imgur.com/iO7F62Q.png)) is set (_80 is a common setting developers use but it can be changed to whatever you like_)
