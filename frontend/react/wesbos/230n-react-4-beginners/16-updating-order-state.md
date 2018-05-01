# Updating Lineup State

## Get Add to Lineup to work
Our button need to be dynamic. It needs to say `Add to Lineup`, `Injured`, `Out`

`Player.js`

```
class Player extends Component {
  render() {
    const { imageURL, firstName, lastName, comments, email, fee, fieldPosition, status } = this.props.details;
    const isAvailable = status !== 'injured';
    return (
      <li className="menu-player">
        <img src={imageURL} alt={firstName} />
        <h3 className="player-name">
          {firstName} {lastName}
          <span className="price">{formatPrice(fee)}</span>
        </h3>
        <p>{status}</p>
        <p>{fieldPosition}</p>
        <p>{email}</p>
        <p>{comments}</p>
        <button disabled={isAvailable}>Add To Cart</button>
      </li>
    );
  }
}
```

* We check each of our players to find their **status**
* We set variable `isAvailable` to **true** if our player has a status of ** not equal to "injured"**

## Test it out in browser
* If a player is not injured he is available for the game

* Here is our css

```css
button[disabled], input[type=submit][disabled] {
    color: #d12028;
    background: #fff;
    border-color: #d12028;
    transform: rotate(-10deg) scale(2) translateX(50%) translateY(-50%);
}
```

* And here is the button

`<button disabled={isAvailable}>Add To Cart</button>`

## Use React tab
* Find `Player` and change `status` of the first player to `active` and watch the button update dynamically
* It has a **CSS3 transition** applied to it so it will animate

* We improve on the logic and show a different button on the results of that logic

```
// MORE CODE
class Player extends Component {
  render() {
    const { imageURL, firstName, lastName, comments, email, fee, fieldPosition, status } = this.props.details;
    const isAvailable = status === 'active';
    return (
      <li className="menu-player">
        <img src={imageURL} alt={firstName} />
        <h3 className="player-name">
          {firstName} {lastName}
          <span className="price">{formatPrice(fee)}</span>
        </h3>
        <p>{status}</p>
        <p>{fieldPosition}</p>
        <p>{email}</p>
        <p>{comments}</p>
        <button disabled={!isAvailable}>{isAvailable ? 'Add To Game' : 'Injured'}</button>
      </li>
    );
  }
}
// MORE CODE
```

* **tip** Use Chrome dev tool, click on element in Elements tab, flip over to React tab and it will show you the equivalent DOM element in the React tab

## How to add Players to Lineup
* Our order state is empty
* Let's change it to `lineup` as it makes more sense

`App.js`

```
// MORE CODE
class App extends React.Component {
  state = {
    players: {},
    lineup: {},
  };
// MORE CODE
```

### Structure of component tips
1. `state` at top
2. lifecycle events
3. custom stuff
4. last but not least... render()

* Not mandatory but eslint airbnb rules inforce this

`App.js`

```
// MORE CODE

addToGame = (key) => {
  // 1. take a copy of state
  const lineup = { ...this.state.lineup };
  // 2. add to team
  lineup[key] = 1;
  // 3. call setState to update our state object
  this.setState({ lineup });
}

render() {

// MORE CODE
```

## Manually test if button is working
* chrome dev console
* react tab
* search for `App`
* See lineup under state is an empty object
* **tip** escape key toggles chrome dev console

`> $r.addToTeam('player1')`

`< undefined`

`> $r.addToTeam('player4')`

`< undefined`

### View lineup `state`
* You will see two players have been added to lineup

## Hook up `addToOrder` to our `Add To Game` button inside `Player`

## View in browser
Load sample players
**React** tab > `look for Player` > And you will see that `addToLineup()` method is bound to it

## Update `Player.js`

```
// MORE CODE
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Soccer Stars" />
        <ul className="players">
          {Object.keys(this.state.players).map(key => (
            <Player key={key} details={this.state.players[key]} addToGame={this.addToGame} />
          ))}
        </ul>
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
    </div>
  );
}
// MORE CODE
```

## Player component
* We have a button inside Player that when clicked expects a `key`

### How do you access a key inside a Player
* We use React tab and click Player and see the key in sidebar:

![key in sidebar](https://i.imgur.com/mpShMAd.png)

* But if you then click on chrome dev console and type $r and press return, you WILL NOT SEE THE KEY

**important** If you need access to the `key` you have to pass `key` a second time with a `prop` that is something other than `key`

```
// MORE CODE
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Soccer Stars" />
        <ul className="players">
          {Object.keys(this.state.players).map(key => (
            <Player key={key} index={key} details={this.state.players[key]} addToGame={this.addToGame} />
          ))}
        </ul>
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
    </div>
  );
}
// MORE CODE
```

* Now view React tab under Player and you'll see we have access to the key using `index`

![key as index](https://i.imgur.com/cNEEKG0.png)

* We don't have access to `key`
  - Can't do `this.props.key` to access that key
  - Only way to access it is to pass it a second time as another prop

```
// MORE CODE
class Player extends Component {
  handleAddToGameClick = () => {
    this.props.addToGame(this.props.index);
  };

  render() {
    const { imageURL, firstName, lastName, comments, email, fee, fieldPosition, status } = this.props.details;
    const isAvailable = status === 'active';
    return (
      <li className="menu-player">
        <img src={imageURL} alt={firstName} />
        <h3 className="player-name">
          {firstName} {lastName}
          <span className="price">{formatPrice(fee)}</span>
        </h3>
        <p>{status}</p>
        <p>{fieldPosition}</p>
        <p>{email}</p>
        <p>{comments}</p>
        <button disabled={!isAvailable} onClick={this.handleAddToGameClick}>
          {isAvailable ? 'Add To Game' : 'Injured'}
        </button>
      </li>
    );
  }
// MORE CODE
```

* We add a handler click event to the Add to Game button:

```
// MORE CODE
<button disabled={!isAvailable} onClick={this.handleAddToGameClick}>
  {isAvailable ? 'Add To Game' : 'Injured'}
</button>
// MORE CODE
```

* We add the **event handler** that will pass the `key` into the lineup `state` inside App

```
// MORE CODE
handleAddToGameClick = () => {
  this.props.addToGame(this.props.index);
};
```

### In case you want to do the same thing inline
* Rule of thumb is this is fine if you only have to do it once
* Otherwise it clutters up your code

```
// MORE CODE
<button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
  {isAvailable ? 'Add To Game' : 'Injured'}
</button>
// MORE CODE
```

