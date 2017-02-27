# Displaying State with JSX
We need to update our App to hold our list of players

## Update App render()
```
render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header tagline="Great Players" />
          <ul className="list-of-players">
            <Player />
          </ul>
        </div>
        <Lineup />
        <Roster addPlayer={this.addPlayer} loadSamples={this.loadSamples}/>
      </div>
    )
  }
```

## Create new Component called Player

`src/components/Player.js`

```
import React from 'react';

class Player extends React.Component {
  render() {
    return (
        <li className="menu-player">player 1</li>
    )
  }
}

export default Player;
```

## How do we loop over all players in our `state`?

**note** JSX has no logic built into it

* no `if` statements
* no `loops`

We just use regular JavaScript to loop through our state

Normally you use `.map()` to loop over something in JavaScript but `.map()` is only for arrays and our `state` is an Object

### Use React tab
To find App
Switch to console and:
`$r` -> Our App Object

`$r.state` -> Gives us our `state` Object

`$r.state.players` -> Empty Object

Load Sample Players again and `$r.state.players` gives us our 20 sample players

### Object.keys()
If we `Object.keys($r.state.players)` - it will give us an array of all our player keys and that is something we can loop over with `.map()`

```
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Great Players" />
        <ul className="list-of-players">
          {
            Object
            .keys(this.state.players)
            .map(key => <Player />)
          }
        </ul>
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} loadSamples={this.loadSamples}/>
    </div>
  )
}
```

Load sample players and you will see the player placeholder appear 20 times

![load sample data and see placeholder player](https://i.imgur.com/j3O61Km.png)

## Error
`Each child in an array or iterator should have a unique "key" prop`

We need to use a unique key because if our Players do not have them, React won't know which to update

![now with unique keys](https://i.imgur.com/GJ4dHGb.png)

## Pass all data about Player instance to the Player
Use `details` attribute

`src/components/App.js`

Update the `ul` to:

```
<ul className="list-of-players">
    {
      Object
      .keys(this.state.players)
      .map(key => <Player key={key} details={this.state.players[key]} />)
    }
</ul>
```

Now we associated each of our players with their data

We just added a new prop called `details`. It is an object that holds all the details for our players

![Players with details](https://i.imgur.com/lSMJbmU.png)

**note**

* We first used `Object.keys()` because we need to use `.map()` and that only works with Arrays so we converted it to an array with `Object.keys()`
* `.map()` is used a lot in React because it takes in something (each player in our players array) and it returns something else (a list of Player Components that have been set up with a unique key and their details)

## Update the HTML inside `Player.js`

**note** If you are setting the attribute value for JSX, you do not need to use double quotes

```
// bad
<img src="{this.props.details.image}" alt="" />

// good
<img src={this.props.details.image} alt="" />
```

```
render() {
    return (
        <li className="menu-player">
          <img src={this.props.details.image} alt={this.props.details.firstName} />
        {this.props.details.firstName} {this.props.details.lastName}
        </li>
    )
}
```

### Typing `this.props.details.WHATEVER`
Takes too long. We need a better way.

#### Refactor with
```
render() {
const details = this.props.details;
return (
    <li className="menu-player">
      <img src={details.image} alt={details.firstName} />
    {details.firstName} {details.lastName}
    </li>
)
}
```

### Refactor with Destructuring
We can do the same thing but using ES6 Destructuring

```
render() {
    const { details } = this.props;
    return (
        <li className="menu-player">
          <img src={details.image} alt={details.firstName} />
        {details.firstName} {details.lastName}
        </li>
    )
  }
```

## Finish HTML and format price
```
import React from 'react';
import { formatPrice } from '../helpers';

class Player extends React.Component {
  render() {
    const { details } = this.props;
    return (
        <li className="menu-player">
          <img src={details.image} alt={details.firstName} />
          <h3 className="fish-name">
            <span>{details.firstName}</span> <span>{details.lastName}</span>
            <span className="price">{formatPrice(details.fee)}</span>
          </h3>
          <p>{details.comments}</p>
          <button>Add To Lineup</button>
        </li>
    )
  }
}

export default Player;
```

View in browser and you'll see our players nicely formatted
