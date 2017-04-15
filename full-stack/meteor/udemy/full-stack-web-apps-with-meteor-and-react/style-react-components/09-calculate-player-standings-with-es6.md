# Calculate Player Standings with ES6
* Object spread operator
* Object property shorthand

## Object spread operator
Let's you copy all the properties on one object onto another object

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});

const user = {
  name: 'King',
  location: 'LA'
};

const person = {
  age: 25
};

console.log(person); // output -> { age: 25 }
```

The object spread properties let's us spread out an object's properties inside of another object's definition

Example: We want person to use all the properties of `user`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});

const user = {
  name: 'King',
  location: 'LA'
};

const person = {
  ...user,
  age: 25
};

console.log(person); // --> { name: 'King', location: 'LA', age: 25 }
```

**note** Order matters
```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});

const user = {
  name: 'King',
  location: 'LA',
  age: 0
};

const person = {
  ...user,
  age: 25
};

console.log(person); // age will be 25
```

But if we switch the order

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});

const user = {
  name: 'King',
  location: 'LA',
  age: 0
};

const person = {
  age: 25,
  ...user
};

console.log(person); // age will be 0
```

## Object Property Shorthand
This is a way to define object properties when you have a variable of the same name

`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});

const team = 'Lakers';
const stuff = {
  team: team
};
console.log(stuff); // --> { team: 'Lakers' }
```

If the key and value are the same you can just use the word once and it will give you the same result

```
const team = 'Lakers';
const stuff = {
  team,
  laptop: 'Mac'
};
console.log(stuff); // --> { team: 'Lakers', laptop: 'Mac' }
```

We can use these two features of ES6 to make our lives and working with objects so much easier

## Challenge
```
const house = {
  bedrooms: 2,
  bathrooms: 1.5
};
const yearBuilt = 1995;
```

Create a new object that uses the spread operator and log it to the console and it should look like:

```
{
    bedrooms: 3,
    bathrooms: 1.5,
    yearBuilt: 1995,
    flooring: 'Carpet'
}
```

### Solutions
```
const houseStuff = {
  ...house,
  bedrooms: 3,
  yearBuilt,
  flooring: 'Carpet'
};
console.log(houseStuff);
```

Using ES6 we were able to create an object that used other objects and variables

`server/main.js`

Put back to the way it was:

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});
```

### Numeral.js
Great library for converting `1st`, `2nd`, `3rd` and formatting and manipulating numbers

#### [Formatting is useful](http://numeraljs.com/#format)
![formatting](https://i.imgur.com/s9WEXUv.png)

### Install numeral 
`$ meteor npm i numeral -S`

### Import numeral
`imports/api/players.js`

```
import { Mongo } from 'meteor/mongo';
import numeral from 'numeral'; // add this line
```

```
import { Mongo } from 'meteor/mongo';
import numeral from 'numeral';

export const Players = new Mongo.Collection('players');

export const calculatePlayerPositions = (players) => {
   let rank = 1;

   return players.map((player, index) => {
      if (index !== 0 && players[index - 1].score > player.score) {
        rank++;
      }

      return {
        ...player,
        rank,
        position: numeral(rank).format('0o');
      };
   });
};
```

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from './../imports/ui/components/App';
// add new function we created
import { Players, calculatePlayerPositions } from './../imports/api/players';

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find({}, {sort: { score: -1 }}).fetch();
    // add the next line
    const positionedPlayers = calculatePlayerPositions(players);
    const title = 'Score Keep';
    // const slogan = 'One contest at a time';
    // replace the players prop with positionedPlayers
    ReactDOM.render(<App players={positionedPlayers} title={title} />, document.getElementById('app'));
  });

});
```

Get the rank to show up on the screen

`Player`

```
// more code
return (
        <div key={player._id} className="item">
          <div className="player">
            <div>
              <h3 className="player__name">{player.name}</h3>
              <p className="player__stats">
                {player.rank} {player.position} {player.score} {this.checkPoints(player.score)}.
              </p>
            </div>
// more code
```

![standings](https://i.imgur.com/NrFl3os.png)


