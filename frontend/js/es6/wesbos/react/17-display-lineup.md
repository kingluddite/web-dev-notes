# Display our Lineup
Update our UI

* Show Starting Linup
* Remove Players from lineup
* Show total fees of player
* Only allow 11 players

`App.js`

* we need all the players in our **lineup** and the **lineup**
    - Why not pass the entire `state`?
        + Not a good practice. Use what you need from `state` when you need it

`<Lineup players={this.state.player} lineup={this.state.lineup} />`

## Lineup.js
```
import React from 'react';

class Lineup extends React.Component {
  render() {
    const lineupIds = Object.keys(this.props.lineup);
    return (
      <div className="order-wrap">
        <h2>Your Starting Lineup</h2>
        <p>{lineupIds}</p>
      </div>
    )
  }
}

export default Lineup;
```

* The **lineup** got passed down to this component and we use `this.props.lineup` to access it. We use `Object.keys()` to make an array of all of our keys

Now if you view in browser, load Sample players and add some players to lineup you will see

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
* We count the number of times a player was added to the Lineup. Currently, we can add multiple of the same player but we only want to add one player once (You can't have the same player playing twice on the starting lineup)
* `const isAvailable = player && player.status === 'active';` - We first check to make sure this is a fish (_this is a real time app where things can change at any given moment_) and then we also check to make sure the player **status** is "active"

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
      <div className="order-wrap">
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
      <div className="order-wrap">
        <h2>Your Starting Lineup</h2>
        <ul className="order">
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
      
    )
```

## Render function
Sometimes you won't want to make a separate Component

You can have multiple `render()` functions inside your Component. They need different names.

```
return (
    <div className="order-wrap">
      <h2>Your Starting Lineup</h2>
      <ul className="order">
        {lineupIds.map(this.renderLineup)}
        <li className="total">
          <strong>Total:</strong>
          {formatPrice(total)}
        </li>
      </ul>
    </div>
  )
```

* We added `{lineupsIds.map(this.renderLineup)}`

We normally would code a map like this `{lineupIds.map(key => <li>{key}</li>)}`
and this would work fine but we have a lot more HTML to add. What can we do to keep our JSX managable?

We can shell it off to a render function with `{lineupIds.map(this.renderLineup)}` and that will call a different render method inside our component. We can place it above our existing render method and give it the name `renderLineup()`

```
renderLineup(key) {
  const player = this.props.players[key];
  const count = this.props.lineup[key]

  if(!player || player.status === 'unavailable') {
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



