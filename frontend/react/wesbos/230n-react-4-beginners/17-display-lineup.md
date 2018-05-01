# Display our Lineup

`Lineup`

```
import React from 'react';

class Lineup extends React.Component {
  render() {
    return (
      <div className="lineup-wrap">
        <h2>Lineup</h2>
      </div>
    );
  }
}

export default Lineup;
```

# What information does the Lineup have available to me?
* Make sure you loaded sample players and added a player or two
* React tab
* Search for App
* You'll see lineup state has players inside it
* Search for Lineup
* No props available

![Props is empty](https://i.imgur.com/ZVMMYHe.png)

## How do we get stuff to a component?
* Via props
* So we need to pass our info to Lineup via props
  - We need to pass down players (this.state.players)
  - We also need to pass down the lineup state (this.state.lineup)

`App.js`

```
// MORE CODE
        <Lineup players={this.state.players} lineup={this.state.lineup} />
        <Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
      </div>
    );
  }
}

export default App;
```

![And now we have players and lineup in Lineup](https://i.imgur.com/4xTO0AA.png)

## Not a good shortcut for this
* `<Order {...this.state} />`
* Sure, less typing and it pulls in all your state but if you add to state you'll be pulling state into a component you may not be using and this is bad
* It is better to only explicitly pass props you use in that component

## How do we sum up our order?

`Lineup`

```
/* eslint react/prop-types: 0 */
import React from 'react';

class Lineup extends React.Component {
  render() {
    const lineupIds = Object.keys(this.props.lineup);
    return (
      <div className="lineup-wrap">
        <h2>Lineup</h2>
        {lineupIds}
      </div>
    );
  }
}

export default Lineup;
```

* Load players
* Add Players to game and they will appear in lineup

## Make a total of players
* We will use `reduce()`
  - Similar to for loop or map but instead of returning a new item or looping over and returning an external variable (like a for loop would)
  - Reduce will take in some data and return a sum of all items
    + (It does a bunch of other stuff too)

```
// MORE CODE
import { formatPrice } from './../utilities/helpers';

class Lineup extends React.Component {
  render() {
    const lineupIds = Object.keys(this.props.lineup);
    const total = lineupIds.reduce((prevTotal, key) => {
      const player = this.props.players[key];
      const count = this.props.lineup[key];
      const isAvailable = player && player.status === 'active';
      if (isAvailable) {
        return prevTotal + count * player.fee;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="lineup-wrap">
        <h2>Lineup</h2>
        {lineupIds}
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
// MORE CODE
```

* Not the price is totaled and output in dollars and sense using a utility function

## Loop over the lineupIds
`Lineup.js`

```
// MORE CODE
return (
  <div className="lineup-wrap">
    <h2>Lineup</h2>
    <ul>{lineupIds.map(key => <li key={key}>{key}</li>)}</ul>
    <div className="total">
      <strong>{formatPrice(total)}</strong>
    </div>
  </div>
);
```

* Shows you each player in a list item

![players listed](https://i.imgur.com/DumBxb1.png)

## Problem with big render functions
* If you have "too much going on" inside a render that means you are probably doing too much
  - You could probably move that logic to a separate component
  - But if you aren't going to be using it anywhere else you also could do something like this:

### Using separate render functions inside a component
`Lineup`

```
// MORE CODE
class Lineup extends React.Component {
  renderLineup = key => <li>{key}</li>;

  render() {
    const lineupIds = Object.keys(this.props.lineup);
    const total = lineupIds.reduce((prevTotal, key) => {
      const player = this.props.players[key];
      const count = this.props.lineup[key];
      const isAvailable = player && player.status === 'active';
      if (isAvailable) {
        return prevTotal + count * player.fee;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="lineup-wrap">
        <h2>Lineup</h2>
        <ul>{lineupIds.map(this.renderLineup)}</ul>
// MORE CODE
```

## Add players with fees and the total collected

![players, fees and total](https://i.imgur.com/woclDwL.png)

### State vs details of Players
* If you change the status inside Players details to `injuered` nothing happens
* But if you change App Component state of same player to `injured`
  - The total changes values

#### This causes a small problem
* We still show the player regardless if they are in the total or not

##### Solution - first check if Player is there
`Lineup.js`

```
// MORE CODE
class Lineup extends React.Component {
  renderLineup = key => {
    const player = this.props.players[key];
    const count = this.props.lineup[key];
    const isAvailable = player.status === 'active';

    if (!isAvailable) {
      return <li>Sorry {player ? player.firstName : 'player'} is no longer available</li>;
    }

    return (
      <li key={key}>
        {count} {player.firstName} {player.lastName}
        {formatPrice(count * player.fee)}
      </li>
    );
  };
// MORE CODE
```

* Now add a player and change his active state to `injured` in React tab and you'll see the total cost is `$0.00` and the `Player` is listed as **'Sorry Player Name is no longer available'**
* You ALWAYS have to return you JSX
  - It never gets to the next line after the if conditional because of that first `return` statement
* We add the **unique key** to remove that unique key warning

## Style the Lineup better
```
// MORE CODE
return (
  <div className="lineup-wrap">
    <h2>Lineup</h2>
    <ul className="lineup">{lineupIds.map(this.renderLineup)}</ul>
    <div className="total">
      <strong>{formatPrice(total)}</strong>
    </div>
  </div>
);
// MORE CODE
```

![lineup styled better](https://i.imgur.com/2uzob6b.png)

## Next - Persisting state
* Every time we reload the page, we lose our `state`






Update our UI

* Show Starting Lineup
* Remove Players from lineup
* Show total fees of player

`App.js`

* We need all the **players** and our entire **lineup** in state
    - Why not pass the entire `state`?
        + Not a good practice. Use what you need from `state` when you need it

`<Lineup players={this.state.players} lineup={this.state.lineup} />`

## Lineup.js
```
import React from 'react';

class Lineup extends React.Component {
  render() {
    const lineupIds = Object.keys(this.props.lineup);
    return (
      <div className="lineup-wrap">
        <h2>Your Starting Lineup</h2>
        <p>{lineupIds}</p>
      </div>
    )
  }
}

export default Lineup;
```

* The **lineup** got passed down to this component and we use `this.props.lineup` to access it. 
* We use `Object.keys()` to make an array of all of our keys

Now if you view in browser, **load Sample players** and add some players to lineup you will see

![lineup without style](https://i.imgur.com/bCV8p9g.png)

We want to show a bunch of other stuff with the players. Their details.

### What is `reduce()` for?

```js
const total = lineupIds.reduce((prevTotal, key) => {
  const player = this.props.players[key];
  const count = this.props.lineup[key];
  const isAvailable = player && player.status === 'active';
  if (isAvailable) {
    return prevTotal + (count * player.fee || 0);
  }
  return prevTotal;
}, 0);
```

Loop over an array and add up a whole bunch of stuff or return a new something (_Object, Array..._)

* The `0` at the end is where we want to start at
* We get the specific player with `this.props.players[key]`
* We count the number of times a player was added to the Lineup.
* `const isAvailable = player && player.status === 'active';` - We first check to make sure this is a player (_this is a real time app where things can change at any given moment_) and then we also check to make sure the player **status** is "active"

## Format properly
As we add the fees up, the format is wacky. How can we fix this?

```
import React from 'react';
import { formatPrice } from '../helpers.js';

class Lineup extends React.Component {
  render() {
    const lineupIds = Object.keys(this.props.lineup);
    const total = lineupIds.reduce((prevTotal, key) => {
      const player = this.props.players[key];
      const count = this.props.lineup[key];
      const isAvailable = player && player.status === 'active';
      if (isAvailable) {
        return prevTotal + (count * player.fee || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="lineup-wrap">
        <h2>Your Starting Lineup</h2>
        <p>{lineupIds}</p>
        {formatPrice(total)}
      </div>
    )
  }
}

export default Lineup;
```

### Update the HTML and CSS

`Lineup.js`

```
return (
      <div className="lineup-wrap">
        <h2>Your Starting Lineup</h2>
        <ul className="lineup">
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
      
    )
```

## Adding another Render function
Sometimes you won't want to make a separate Component

You can have multiple `render()` functions inside your Component. They need different names.

```
return (
    <div className="lineup-wrap">
      <h2>Your Starting Lineup</h2>
      <ul className="lineup">
        {lineupIds.map(this.renderLineup)}
        <li className="total">
          <strong>Total:</strong>
          {formatPrice(total)}
        </li>
      </ul>
    </div>
  )
```

* We added `{lineupIds.map(this.renderLineup)}`

We normally would code a map like this `{lineupIds.map(key => <li>{key}</li>)}`
and this would work fine but we have a lot more HTML to add. 

### What can we do to keep our JSX manageable?
We can shell it off to a render function with 

`{lineupIds.map(this.renderLineup)}` 

* And that will call a different render method inside our component
* We can place it above our existing render method and give it the name `renderLineup()`

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
    </li>
  )
}
```

**note** We can not use `this` inside a function that is not `render()` unless we bind it to the Component

`Lineup.js`

```
class Lineup extends React.Component {
  constructor() {
    super();
    this.renderLineup = this.renderLineup.bind(this);
  }
// MORE CODE
```

## View and you'll see it works



