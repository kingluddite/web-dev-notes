# Removing Items From `state`
CRUD - Create, Read, Update, Delete

We've covered `Create`, `Read` and `Update`. Now we need to `Delete`

* Create - We create new players
* Read - We loop through and show all players
* Update - We can edit players
* Delete - ?

## Create removePlayer() method

`App.js`

* Under the `updatePlayer()` method add the `removePlayer()` method

```
removePlayer(key) {
  // make a copy of our players state
  const players = {...this.state.players};
  delete players[key];
}
```

We are using `this` not inside the `render()` method so we need to bind it to the component with:

`App.js`

```
constructor() {
    super();
    this.addPlayer = this.addPlayer.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToLineup = this.addToLineup.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this); // add this line

    // initial state (was known as 'getinitialstate' with React createClass)
    this.state = {
      players: {},
      lineup: {}
    };
  }
```

## Firebase issue
You can't use `delete` code:

```
removePlayer(key) {
  // make a copy of our players state
  const players = {...this.state.players};
  delete players[key]; // can't use delete with Firebase
}
```

In Firebase you need to do this - explicitly set it to `null`

```
removePlayer(key) {
  // make a copy of our players state
  const players = {...this.state.players};
  players[key] = null;
}
```

## And then update `state`

```
removePlayer(key) {
  // make a copy of our players state
  const players = {...this.state.players};
  players[key] = null;
  this.setState({ players });
}
```

## Delete a player using console
We don't have a delete button yet so let's just use the console

* Use `React` tab in inspector to find `App` and select it
* Switch to console and type `$r.removePlayer('player01')`

This will remove it from the Player, Lineup and Roster

## Remove Player on Click
We need to pass our `removePlayer()` method to our Roster

`App.js`

```
<Roster
  addPlayer={this.addPlayer}
  loadSamples={this.loadSamples}
  players={this.state.players}
  updatePlayer={this.updatePlayer}
  removePlayer={this.removePlayer}
/>
```

## Update Roster with `Remove Player`
```
<input type="text" value={player.imageURL} name="imageURL" placeholder="Image URL" onChange={(e) => this.handleChange(e, key)} />
<button onClick={() => this.props.removePlayer(key)}>Remove Player</button>
```

Click the `Remove Player` button and remove all the players

## Also add code to be able to remove Players from Lineup
Our lineup is not using Firebase so we can use `delete`

`App.js`

```
removeFromLineup(key) {
  // make a copy of our players state
  const lineup = {...this.state.lineup};
  delete lineup[key];
  this.setState({ lineup });
}
```

We are using `this` outside of `render()` so we must bind `this` to Component

```
constructor() {
  super();
  this.addPlayer = this.addPlayer.bind(this);
  this.loadSamples = this.loadSamples.bind(this);
  this.addToLineup = this.addToLineup.bind(this);
  this.updatePlayer = this.updatePlayer.bind(this);
  this.removePlayer = this.removePlayer.bind(this);
  this.removeFromLineup = this.removeFromLineup.bind(this); // add this line
  
  // initial state (was known as 'getinitialstate' with React createClass)
  this.state = {
    players: {},
    lineup: {}
  };
}
```

## Use console to remove player from lineup
1. Delete all players and Load Sample Players again
2. Add a couple of Bobby Austin and one Raymond Wood
3. Use React tab and search for App component
4. Switch to console and call with `$r.removeFromLineup('player04')`
5. Bobby is Removed from Lineup
6. Check console `Application` tab and see your current localstorage
7. In console type `$r.removeFromLineup('player09')`
8. You will see it is removed from Lineup but also from localstorage which now has an empty object

### Add removeFromLineup to button
Update `renderLineup()`

```
renderLineup(key) {
    const player = this.props.players[key];
    const count = this.props.lineup[key]

    if(!player || player.status !== 'active') {
      return <li key={key}>Sorry, {player ? player.firstName : 'player'} is no longer available</li>
    }

    return (
      <li key={key}>
        <span>{count} {player.firstName}</span>
        <span className="price">{formatPrice(count * player.fee)}</span>
        <button onClick={() => this.props.removeFromLineup(key)}>Remove</button>
      </li>
    )
  }
```

* We add our `onClick` handler inside the button and call `removeFromLineup(key)`

## Improve code
We can store JSX in a variable

`const removeButton = <button onClick={() => this.props.removeFromLineup(key)}>&times;</button>;`

And here is our improved code

```
renderLineup(key) {
    const player = this.props.players[key];
    const count = this.props.lineup[key];
    const removeButton = <button onClick={() => this.props.removeFromLineup(key)}>&times;</button>;

    if(!player || player.status !== 'active') {
      return <li key={key}>Sorry, {player ? player.firstName : 'player'} is no longer available {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>{count} {player.firstName} {removeButton}</span>
        <span className="price">{formatPrice(count * player.fee)}</span>
      </li>
    )
  }
```
