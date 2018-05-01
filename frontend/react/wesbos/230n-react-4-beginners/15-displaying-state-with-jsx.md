# Displaying State with JSX
* We need to update our `App` to hold our **list of players**
* We will deplay players under the logo
* We'll create a list of players
  - We start with the <ul> but it's best to create a component for player
  - Because we want to make reusable components we can use anywhere in the app
  - We don't want or need the list of players to be "tightly bound" to `App.js`

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

## Good-ole Regular JavaScript to the rescue!
* We just use regular JavaScript to loop through our state

## So we will use map()... nope!
* Normally you use `.map()` (or `.forEach()`) to loop over something in JavaScript but `.map()` is only for arrays
* But our `state` is an Object and you CAN NOT `map()` over an object

### Use React tab
1. To find `App`
2. Switch to **console** tab
3. Type: `$r`

* That will give us our `App` object

`$r.state` -> Gives us our `state` Object

`$r.state.players` -> Empty Object

#### Load Sample Players Again!
* And `$r.state.players` gives us our 20 sample players

![$r shows us how to get players as an array](https://i.imgur.com/cXih845.png)

### Object.keys()
* If we `Object.keys($r.state.players)` - it will give us an array of all our **player keys** and that is something we can loop over with `.map()`
* Let's try it out

`App.js`

```
// MORE CODE
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Soccer Stars" />
        <ul className="fishes">{Object.keys(this.state.players).map(key => <p>{key}</p>)}</ul>
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
    </div>
  );
}
// MORE CODE
```

## unique prop error
* We won't see any players until we hit the button and then we'll see them all
* We have an warning about not using Player (we'll fix that soon)
* We have the `each child in an array or iterator should have a unique "key" prop` error

### why the error?
* In order for React to be fast at updating the UI it needs to quickly get to the component that is updated
* If you want to change player5 to Diego Maradonna, then react needs to quickly get to player5 and that is the reason for the unique key
  - If you don't use this React will be slower and you'll always get this error

### Adding a unique key
```
// MORE CODE
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Soccer Stars" />
        <ul className="fishes">{Object.keys(this.state.players).map(key => <p key={key}>{key}</p>)}</ul>
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
    </div>
  );
}
// MORE CODE
```

* But instead of rendering out a `p` we will render a `<Player />`

```
<ul className="list-of-players">
    {
      Object
      .keys(this.state.players)
      .map(key => <Player key={key} />)
    }
</ul>
```

* You can also manually add a player and it will render to page because it was just added to state too

![now with unique keys](https://i.imgur.com/GJ4dHGb.png)

## How do we get the data from state over to our Player component?
* I can only access state if it gets passed in via `props`

### Getting the details
* Pass all data about the **player** instance to the `Player`

* Use `details` attribute

```
// MORE CODE
render() {
  return (
    <div className="team-of-the-day">
      <div className="menu">
        <Header tagline="Soccer Stars" />
        <ul className="fishes">{Object.keys(this.state.players).map(key => <Player key={key} details={this.state.players.player1}/>)}</ul>
      </div>
      <Lineup />
      <Roster addPlayer={this.addPlayer} loadSamplePlayers={this.loadSamplePlayers} />
    </div>
  );
}
// MORE CODE
```

* But that will only give me one player, how do I get a dynamic value that will pull them all in?
  - By using `this.state.players[key]`

`src/components/App.js`

* Update the `ul` to:

```
<ul className="list-of-players">
    {
      Object
      .keys(this.state.players)
      .map(key => <Player key={key} details={this.state.players[key]} />)
    }
</ul>
```

* Now we associated each of our players with their data
* We just added a new `prop` called `details`
* It is an object that holds all the details for our players

![Players with details](https://i.imgur.com/lSMJbmU.png)

**note**

* We first used `Object.keys()` because we need to use `.map()` and that only works with Arrays so we converted it to an array with `Object.keys()`
* `.map()` is used a lot in **React** because it takes in something (each player in our players array) and it returns something else (a list of Player Components that have been set up with a unique key and their details)

## Update the HTML inside `Player.js`

**note** If you are setting the attribute value for JSX, **you should not use** double quotes `""`

### Double quotes are not used for attribute values when the value is a JavaScript expression
```
// bad
<img src="{this.props.details.imageURL}" alt="" />

// good
<img src={this.props.details.imageURL} alt="" />
```

`Player.js`

```
render() {
    return (
        <li className="menu-player">
          <img src={this.props.details.imageURL} alt={this.props.details.firstName} />
        {this.props.details.firstName} {this.props.details.lastName}
        </li>
    )
}
```

### Typing `this.props.details.WHATEVER`
* This takes way too long to type
* We need a more efficent way to type this

#### Refactor with
```
render() {
const image = this.props.details.imageURL;
const firstName = this.props.details.firstName;
const lastName = this.props.details.lastName;

return (
    <li className="menu-player">
      <img src={image} alt={firstName lastName} />
      {firstName} {lastName}
    </li>
)
}
```

### EVEN BETTER! Refactor with Destructuring
* We can do the same thing but using ES6 Destructuring

```
class Player extends Component {
  render() {
    const { image, firstName, lastName, comments, email, fee, fieldPosition, status } = this.props.details;
    return (
      <li className="menu-player">
        <img src={image} alt={firstName} />
        <h3 className="player-name">
          {firstName} {lastName}
          <span className="price">{fee}</span>
        </h3>
      </li>
    );
  }
}

```

## Finish HTML and format price
```
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { formatPrice } from './../utilities/helpers';

class Player extends Component {
  render() {
    const { image, firstName, lastName, comments, email, fee, fieldPosition, status } = this.props.details;
    return (
      <li className="menu-player">
        <img src={image} alt={firstName} />
        <h3 className="player-name">
          {firstName} {lastName}
          <span className="price">{formatPrice(fee)}</span>
        </h3>
      </li>
    );
  }
}

export default Player;
```

* View in browser and you'll see our players nicely formatted
* **TIP** Display everything in sense because you can easily format them all at one time with a simple helper function

## Add to Cart button
* We won't wire it up not but we will later

```
// MORE CODE
class Player extends Component {
  render() {
    const { imageURL, firstName, lastName, comments, email, fee, fieldPosition, status } = this.props.details;
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
        <button>Add To Cart</button>
      </li>
    );
  }
}
// MORE CODE
```

![players info](https://i.imgur.com/k0mpg50.png)
