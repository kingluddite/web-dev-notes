# List Based Components
![wireframe](https://i.imgur.com/aQiyOBK.png)

## We will focus on rendering PlayerList Component
The PlayerList Component will get passed a list of all of the player

`PlayerList`

```
import React, { Component } from 'react';

class PlayerList extends React.Component {
  render() {
    return (
      <div>
        PlayerList
      </div>
    );
  }
};

export default PlayerList;
```

### Import it to:
`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';
import TitleBar from './../imports/ui/components/TitleBar';
import AddPlayer from './../imports/ui/components/AddPlayer';
import Player from './../imports/ui/components/Player';
import PlayerList from './../imports/ui/components/PlayerList'; // add this line
```

## Goal
We want to replace this code:

`{renderPlayers(players)}`

and this code:

```
const renderPlayers = playersList => {
   return playersList.map( player => {
      // add this line and pass to props
      return <Player key={player._id} player={player} />;
   });
}
```

With a single Component rendering

For now, let's just instantiate our static `PlayerList`

```
// more code
const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar title={title} slogan={slogan} />
        {renderPlayers(players)}
        <PlayerList />
        <AddPlayer />
      </div>
    );
// more code
```

### Give PlayersList all the players
```
Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const slogan = 'One contest at a time';
    const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar title={title} slogan={slogan} />
        {renderPlayers(players)}
        <PlayerList players={players} />
        <AddPlayer />
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```

* We use the `players` variable that is storing our array of player objects
* Now we can remove our call for `{renderPlayers(players)}` so we can remove it
* We cut the `renderPlayers()` function and paste it into `PlayersList`

`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker';
import TitleBar from './../imports/ui/components/TitleBar';
import AddPlayer from './../imports/ui/components/AddPlayer';
import Player from './../imports/ui/components/Player';
import PlayerList from './../imports/ui/components/PlayerList';

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();

    const title = 'Score Keep';
    const slogan = 'One contest at a time';
    const jsx = (
      <div>
        {/* Put new h1 here */}
        <TitleBar title={title} slogan={slogan} />
        <PlayerList />
        <AddPlayer />
      </div>
    );

    ReactDOM.render(jsx, document.getElementById('app'));
  });

});
```

`PlayerList`

```
import React, { Component } from 'react';

const renderPlayers = playersList => {
   return playersList.map( player => {
      // add this line and pass to props
      return <Player key={player._id} player={player} />;
   });
}

class PlayerList extends React.Component {
  render() {
    return (
      <div>
        PlayerList
      </div>
    );
  }
};

export default PlayerList;
```

* We need to import `Player`

`PlayerList`

```
import React, { Component } from 'react';
import Player from './Player'; // add this line
// more code
```

### We can remove import of Player inside `client/main.js`
Remove this: `import Player from './../imports/ui/components/Player';`

`PlayerList`

```
import React, { Component } from 'react';
import Player from './Player';

class PlayerList extends React.Component {

  renderPlayers() {
    return this.props.players.map( player => {
       // add this line and pass to props
       return <Player key={player._id} player={player} />;
    });
  }
  render() {
    return (
      <div>
        {this.renderPlayers()}
      </div>
    );
  }
};

export default PlayerList;
```

### Test in browser
![should work as before](https://i.imgur.com/sx6qCUe.png)

### Add PropTypes and requirements
```
import React, { Component } from 'react';
import Player from './Player';
import PropTypes from 'prop-types';

class PlayerList extends React.Component {

  renderPlayers() {
    return this.props.players.map( player => {
       // add this line and pass to props
       return <Player key={player._id} player={player} />;
    });
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
