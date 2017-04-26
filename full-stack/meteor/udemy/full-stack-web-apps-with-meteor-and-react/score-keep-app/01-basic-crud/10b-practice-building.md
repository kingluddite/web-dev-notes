# Practice building with Meteor
Create a new git branch called `sandbox`

`$ git checkout -b sandbox`

1. Highlight all code inside `client/main.js`
2. You will need JSX so import React

`import React from 'react';`

3. Create a variable to hold your JSX

```
const jsx = (
    <p>test</p>
);
```

4. Render JSX to page
5. You need to use the ReactDOM `render()` method so import it

`import ReactDOM from 'react-dom'`

6. Now render it using the Library you just imported

`ReactDOM.render(jsx, document.getElementById('app'));`

7. You will get an error `Target container is not a DOM element`

This means Meteor is to quick for the DOM and we need to wait until the DOM is ready before rendering so we need to import the **Meteor** named export and use the `startup()` method

`import { Meteor } from 'meteor/meteor'`

```
Meteor.startup(function() {
  const jsx = (
    <p>test</p>
  );
});
```

Now we'll see the page

**caution** - The following would give you an error. Watch our for misplaced semi-colons in JSX

```
const jsx = (
  <p>test</p>;
);
```

8. We want to access our `players` Collection so import the Players named export

`imports/api/players.js`

```
import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');
```

`import { Players } from './../imports/api/players`

9. Log it to the console to see if we see our `players` Collection

`console.log(players)`

We'll see an empty array. This is because when the page is first rendered we have yet to communicate with MiniMongo. We need to somehow rerender the page once we communicate with MiniMongo so we can see our `players` Collection

10. That is accomplished using Meteor's Tracker's `autorun()` method so import the Tracker named export

`import { Tracker } from 'meteor/tracker';`

11. And use it inside the Meteor `startup()` method

```
Meteor.startup(function() {
  Tracker.autorun(function() {
    const players = Players.find().fetch();
    console.log(players);
    const jsx = (
        <p>test</p>
    );
  
  ReactDOM.render(jsx, document.getElementById('app'));
  });
});
```

Now we'll first see an empty array and then we'll see our `players` collection filled with our current players

Here's our code so far:

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

Meteor.startup(function() {
  Tracker.autorun(function() {
    const players = Players.find().fetch();
    console.log(players);
    const jsx = (
      <div>
        <p>test</p>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});

```

12. We need to render our players to the page so we'll create a `renderPlayers()` function

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

Meteor.startup(function() {
  Tracker.autorun(function() {
    const renderPlayers = function() {
      console.log('test');
    }
    const players = Players.find().fetch();
    console.log(players);
    const jsx = (
      <div>
        {renderPlayers}
        <p>test</p>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});
```

**notes**

* If you use `{renderPlayers}` (_without parenthesees_), the function will never be called
* Our test is called twice because of Tracker working its re-rendering magic

13. Give `renderPlayers(playersList)` an argument that will accept our `players` collection

14. Call the function with a `players` parameter

`{renderPlayers(players)}` and change log to `console.log(players)` inside our `renderPlayers()` method

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

Meteor.startup(function() {
  Tracker.autorun(function() {
    const renderPlayers = function(playersList) {
      console.log(playersList);
    }
    const players = Players.find().fetch();
    const jsx = (
      <div>
        {renderPlayers(players)}
        <p>test</p>
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});
```

Our log should out the same as before our modifications to our code

15. Map through our array of objects

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';

Meteor.startup(function() {
  Tracker.autorun(function() {
    const renderPlayers = function(playersList) {
      console.log(playersList);
      return playersList.map(function(player) {
        return <li>{player.name} has a score of {player.score}</li>
      });
    }
    const players = Players.find().fetch();
    const jsx = (
      <ul>
        {renderPlayers(players)}
      </ul>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });
});
```

16. Add a unique key to each list item

`<li key={player._id}>...</li>`

17. Insert a player

`<form onSubmit={handleSubmit}>`

```
const handleSubmit = function(e) {
  const playerName = e.target.playerName.value;

  e.preventDefault();

  if (playerName) {
    e.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 0
    });
  }
}
```

**Important!**

Make sure you import the `Players` named export to both the client and server (in both `main.js` files inside `client` and `server`)

If you just have it client side, you'll get this error

![no server connection](https://i.imgur.com/bKCOXf3.png)

So just add this import to `server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players'; // add this line

Meteor.startup(function() {

});
```

And your imports will be good to go

