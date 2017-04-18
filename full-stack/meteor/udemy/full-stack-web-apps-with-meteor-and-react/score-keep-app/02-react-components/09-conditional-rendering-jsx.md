# Conditional Rendering with JSX
Eventually makes its way into every single Application

## Task
If no players, let user know. We will do that in the `PlayerList` Component

**note** JSX does not support conditions by default. JSX supports JavaScript expressions and you can obviously use conditional code with `if` statements

We will work on the `renderPlayers()` function and determine what gets returned

```
renderPlayers() {
    return this.props.players.map( player => {
       return <Player key={player._id} player={player} />;
    });
  }
```

And here is our conditional logic that will alert the user to add players when there are none:

```
import React, { Component } from 'react';
import Player from './Player';
import PropTypes from 'prop-types';

class PlayerList extends React.Component {

  renderPlayers() {
    if (this.props.players.length === 0 ) {
      return <p>Please add players.</p>
    } else {
      return this.props.players.map( player => {
      return <Player key={player._id} player={player} />;
    });
  }

  }
  render() {
    return (
      <div>
        {this.renderPlayers()}
      </div>
    );
  }
};

PlayerList.propTypes = {
  players: PropTypes.array.isRequired
}

export default PlayerList;
```
