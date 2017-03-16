# Updating Order State

## Get Add to Lineup to work
Our button need to be dynamic. It needs to say `Add to Lineup`, `Injured`, `Out`

```
const isAvailable = details.status === 'active';
const buttonText = isAvailable ? 'Add To Lineup' : 'Out!';
```

We check each of our players to find their **status**. We set variable `isAvailable` to **true** if our player has a status of **"active"**

We create dynamic text on our button to either show `Add To Lineup` if player if `isAvailable` or `Out!` if they are not

## Use React tab
Change status of first player and watch the button update dynamically

It has a CSS3 transition applied to it so it will animate

### Disable button if not available
If player isn't active we need to disable their button

Update button with: `<button disabled={!isAvailable}>{buttonText}</button>`

* This is the HTML5 disabled property that we set to `true` if player status is not `active`

## Where do we create a method to add to the Order Component?
`App.js`

```
import React from 'react';
import Header from './Header';
import Lineup from './Lineup';
import Roster from './Roster';
import samplePlayers from '../sample-players';
import Player from './Player';

class App extends React.Component {

  constructor() {
    super();
    this.addPlayer = this.addPlayer.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToLineup = this.addToLineup.bind(this);
    // initial state (was known as 'getinitialstate' with React createClass)
    this.state = {
      players: {},
      lineup: {}
    };
  }

  addPlayer(player) {
    // update our state
    const players = {...this.state.players};
    // add in our new player
    const timestamp = Date.now();
    players[`player-${timestamp}`] = player;
    // this.state.players.player1 = player;
    // set state
    this.setState({ players });
  }

  loadSamples() {
    this.setState({
      players: samplePlayers
    });
  }

  addToLineup(key) {
    // take a copy of our state
    const lineup = {...this.state.lineup};
    // update or add the new number of players added to lineup
    lineup[key] = lineup[key] + 1 || 1;
    // update our state
    this.setState({ lineup });
  }

  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header tagline="Great Players" />
          <ul className="list-of-players">
            {
              Object
              .keys(this.state.players)
              .map(key =>
                <Player
                  key={key}
                  details={this.state.players[key]} addToLineup={this.addToLineup}
                />)
            }
          </ul>
        </div>
        <Lineup />
        <Roster
          addPlayer={this.addPlayer}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
}

export default App;
```

## View in browser
Load sample players
React tab > look for Player > And you will see that `addToLineup()` method is bound to it

## Update `Player.js`

```
return (
        <li className="menu-players">
          <img src={details.image} alt={details.firstName} />
          <h3 className="player-name">
            <span>{details.firstName}</span> <span>{details.lastName}</span>
            <span className="price">{formatPrice(details.fee)}</span>
          </h3>
          <p>{details.comments}</p>
          <button disabled={!isAvailable} onClick={this.props.addToLineup}>{buttonText}</button>
        </li>
    )
```

We add a click event to our button `<button disabled={!isAvailable} onClick={this.props.addToLineup}>{buttonText}</button>`

### How do you pass an argument to `addToLineup`?
We don't want the `addToLineup` to fire on page load but when they click the button

`<button disabled={!isAvailable} onClick={() =>this.props.addToLineup('player-1')}>{buttonText}</button>`

Now if you view in browser > `React` tab > Search for App > Look at lineup state > click `Add to Lineup` and you will see it increases every time

## Passing a dynamic argument
We don't want to hardcode `player-1`, `player-2`...

Can we access the Player instance key inside a Component? No. Not right now.
If you need to access the `key` attribute, you need to explicitly pass it down. They make it hard because the `key` is not for us, but if we do need it, we have to pass it down ourselves. To get around this we create another attribute called `index` that will pass the same `key` value. Something like this:

```
<ul className="list-of-players">
            {
              Object
              .keys(this.state.players)
              .map(key =>
                <Player
                  key={key} index={key}
                  details={this.state.players[key]} addToLineup={this.addToLineup}
                />)
            }
          </ul>
```

Notice how we added the `key` value with both `key` and `index` attributes

View `Player` in React tab and you will now see index

### Update button with index
`Player.js`

```
<button disabled={!isAvailable} onClick={() => this.props.addToLineup(this.props.index)}>{buttonText}</button>
```

Now view in browser > Load sample players > Click add to lineup > Search for App and you will see when you expand `state` that you added that specific player you added

![player index added](https://i.imgur.com/HEdPhfi.png)

## Refactor our code with ES6

**note** 

```
// this ES6 destructuring 
const { details, index } = this.props;
// is the same as this
const details = this.props.detail;
const index = this.props.index;
```

Let's refactor with ES6 as it saves us typing

```
render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'active';
    const buttonText = isAvailable ? 'Add To Lineup' : 'Out!';
    return (
        <li className="menu-players">
          <img src={details.image} alt={details.firstName} />
          <h3 className="player-name">
            <span>{details.firstName}</span> <span>{details.lastName}</span>
            <span className="price">{formatPrice(details.fee)}</span>
          </h3>
          <p>{details.comments}</p>
          <button disabled={!isAvailable} onClick={() => this.props.addToLineup(index)}>{buttonText}</button>
        </li>
    )
```

### Add just 1 player to lineup
Currently, we can click and we will add a player once and then more than once and the number will increase by one every time we click the button. We just want it to say `1` and never go higher

In `App.js` change this: `lineup[key] = lineup[key] + 1 || 1;`

To this: ``lineup[key] = 1;``

Now we need to update our UI to display our `Lineup`

### Update AddPlayerForm Component
Add all fields

```
import React from 'react';

class AddPlayerForm extends React.Component {
  constructor() {
    super();
    this.createPlayer = this.createPlayer.bind(this);
  }
  createPlayer(e) {
    e.preventDefault();
    const player = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      status: this.status.value,
      fieldPosition: this.fieldPosition.value,
      fee: this.fee.value,
      jerseyNumber: this.jerseyNumber.value,
      email: this.email.value,
      comments: this.comments.value,
      imageURL: this.imageURL.value
    }
    this.props.addPlayer(player);
    this.playerForm.reset();
  }
  render() {
    return (
      <form ref={(input) => this.playerForm = input} className="player-edit" onSubmit={this.createPlayer}>
      <input ref={(input) => this.firstName = input} type="text" placeholder="Player First Name" />
      <input ref={(input) => this.lastName = input} type="text" placeholder="Player Last name" />
      <select ref={(input) => this.status = input}>
        <option value="active">Active</option>
        <option value="injured">Injured</option>
        <option value="excused">Excused Absence</option>
        <option value="unexcused">Unexcused Absence</option>
      </select>
      <input ref={(input) => this.fieldPosition = input} type="text" placeholder="Field Position" />
      <input ref={(input) => this.fee= input} type="text" placeholder="Player Fee" />
      <input ref={(input) => this.jerseyNumber = input} type="text" placeholder="Jersey Number" />
      <input ref={(input) => this.email = input} type="text" placeholder="Email" />
      <input ref={(input) => this.imageURL = input} type="text" placeholder="Player Photo URL" />
      <textarea ref={(input) => this.comments = input} placeholder="Comments"></textarea>
      <button type="submit">+ Add Player</button>
      </form>

    )
  }
}

export default AddPlayerForm;
```
