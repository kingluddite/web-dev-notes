# Player Component
Time to create the Player Component

![diagram](https://i.imgur.com/8nFZJif.png)

* We will add `props` to this Component

## Let's create the Player class

```
import React, { Component } from 'react';

class Player extends Component {

  render() {

    return <p>dummy text</p>
  }
}

export default Player;
```

### Import and render Player instance
`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';
import TitleBar from './../imports/ui/components/TitleBar';
import AddPlayer from './../imports/ui/components/AddPlayer';
import Player from './../imports/ui/components/Player'; // add this line

const renderPlayers = playersList => {
   return playersList.map( player => {
      // add this line to prevent unique key error
      return <Player key={player._id} />;
   });
}
// more code
```

### Test in browser
No errors and should look like this:

![dummy text](https://i.imgur.com/E7Icpi0.png)

Congrats. Our static Player Component is set up

### Next Challenge
Take the JSX from `client/main.js` and transplant it to `Player`

### Passing `player`
The first thing is we have access to `player` inside our `.map()` method here in `client/main.js`

```
const renderPlayers = playersList => {
   return playersList.map( player => {
      // add this line and pass to props
      return <Player key={player._id} player={player} />;
   });
}
```

We use pass the `prop` of **player** to the `Player` Component and that means we have access to it inside `Player` with `this.props.player` so..

`Player`

```
import React, { Component } from 'react';

class Player extends Component {

  render() {

    return (
      <p key={this.props.player._id}>
        {this.props.player.name} has {this.props.player.score} {/* {this.checkPoints(this.props.player.score)}. */}
        <button onClick={() => {
          Players.update( this.props.player._id, { $inc: { score: 1} } );
        }}>+1</button>
        <button onClick={() => {
          Players.update( this.props.player._id, { $inc: { score: -1} } );
        }}>-1</button>
        <button onClick={() => Players.remove(this.props.player._id)}>X</button>
      </p>
    );
  }
}

export default Player;
```

But we get an error if we try to increment/decrement points because the Player Component does not have access to our Players Collection so we lazy load it in by importing it:

`Player`

```
import React, { Component } from 'react';
import { Players } from './../../api/players'; // add this line
```

Now we can increase and decrease scores

## Add our custom function
`Player`

```
import React, { Component } from 'react';
import { Players } from './../../api/players';

class Player extends Component {

  checkPoints(playerPoints) {
    return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
  }

  render() {
    const { player } = this.props;

    return (
      <p key={player._id}>
        {player.name} has {player.score} {this.checkPoints(player.score)}.
        <button onClick={() => {
          Players.update( player._id, { $inc: { score: 1} } );
        }}>+1</button>
        <button onClick={() => {
          Players.update( player._id, { $inc: { score: -1} } );
        }}>-1</button>
        <button onClick={() => Players.remove(player._id)}>X</button>
      </p>
    );
  }
}

export default Player;
```

Now our code works just as it did before but it is now more modular and easier to scale and manage

### Refactor using destructuring

```
import React, { Component } from 'react';
import { Players } from './../../api/players';

class Player extends Component {

  checkPoints(playerPoints) {
    return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
  }

  render() {

    const { player } = this.props;

    return (
      <p key={player._id}>
        {player.name} has {player.score} {this.checkPoints(player.score)}.
        <button onClick={() => {
          Players.update( player._id, { $inc: { score: 1} } );
        }}>+1</button>
        <button onClick={() => {
          Players.update( player._id, { $inc: { score: -1} } );
        }}>-1</button>
        <button onClick={() => Players.remove(player._id)}>X</button>
      </p>
    );
  }
}

export default Player;
```

### Add PropTypes
`Player` (_Place just below the last line export_)

```
Player.propTypes = {
  player: PropTypes.object.isRequired
}

export default Player;
```

**note** `key` is not a **prop**

#### Test without passing a player prop
Make sure you see the warning about required `player` **prop**
