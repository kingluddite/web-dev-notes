# Dynamic Classes and SCSS Functions
We will create dynamic classes for the first three positions

1. Green for first
2. Blue for Second
3. 3rd Place is red
4. All other positions will be white as they are now.

# Player
Here is our current file

```
import React, { Component } from 'react';
import { Players } from './../../api/players';
import PropTypes from 'prop-types';

class Player extends Component {

  checkPoints(playerPoints) {
    return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
  }

  render() {

    const { player } = this.props;

    return (
        <div key={player._id} className="item">
          <div className="player">
            <div>
              <h3 className="player__name">{player.name}</h3>
              <p className="player__stats">
                {player.score} {this.checkPoints(player.score)}.
              </p>
            </div>
            <div className="player__actions">
              <button className="button button--round" onClick={() => {
                Players.update( player._id, { $inc: { score: 1} } );
              }}>+1</button>
              <button className="button button--round" onClick={() => {
                Players.update( player._id, { $inc: { score: -1} } );
              }}>-1</button>
              <button className="button button--round" onClick={() =>  Players.remove(player._id)}>X</button>
            </div>
          </div>
        </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired
}

export default Player;
```

* We remove `rank` from the player box
* We just used it to test if it was working

`Player.js`

```
// more code
render() {
    const { player } = this.props;
    let itemClassName = `item item--position-${player.rank}`;

    return (
        <div key={player._id} className={itemClassName}>
// more code
```

### Inspect the code
After making our changes you will see the dynamic class working in the inspector

![dynamic classes in full effect](https://i.imgur.com/eBUniYD.png)

* **note** This is a **BEM** modifier

## Complete code

```
import React, { Component } from 'react';
import { Players } from './../../api/players';
import PropTypes from 'prop-types';

class Player extends Component {

  checkPoints(playerPoints) {
    return (playerPoints === 1 || playerPoints === -1) ? 'point' : 'points';
  }

  render() {
    const { player } = this.props;
    let itemClassName = `item item--position-${player.rank}`;

    return (
        <div key={player._id} className={itemClassName}>
          <div className="player">
            <div>
              <h3 className="player__name">{player.name}</h3>
              <p className="player__stats">
                {player.position} place - {player.score} {this.checkPoints(player.score)}.
              </p>
            </div>
            <div className="player__actions">
              <button className="button button--round" onClick={() => {
                Players.update( player._id, { $inc: { score: 1} } );
              }}>+1</button>
              <button className="button button--round" onClick={() => {
                Players.update( player._id, { $inc: { score: -1} } );
              }}>-1</button>
              <button className="button button--round" onClick={() =>  Players.remove(player._id)}>X</button>
            </div>
          </div>
        </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired
}

export default Player;
```

## Exercise
Add three selectors for our three BEM modifiers

* Green for 1st
* Blue for second
* Red for third

<details>
  <summary>Solution</summary>
`_item.scss`

```
.item {
  margin-bottom: 1.3rem;
  padding: 1.3rem;
  border: 1px solid #e8e8e8;
  background: #fff;
}

.item--position-1 {
  color: #fff;
  background: green;
}

.item--position-2 {
  color: #fff;
  background: blue;
}

.item--position-3 {
  color: #fff;
  background: red;
}

.item__message {
  font-size: 1.3rem;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
```
</details>

### Variables
Create `_variables.scss` 

```
$green: #e4ede0;
```

### import it into `_main.scss`

```
@import './components/variables'; // add import here
@import './components/title-bar';
@import './components/wrapper';
@import './components/item';
@import './components/button';
@import './components/player';
@import './components/form';
```

**note** Where it is imported is important. We want it to come first so that any files using variables will have access to them

`_item.scss`

```
// more code
.item--position-1 {
  background: $green;
}
// more code
```

## Sass functions - Darken a given value
[documenation on Sass functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)

```
darken($color, $amount)
Makes a color darker.
# Example
darken(hsl(25, 100%, 80%), 30%) => hsl(25, 100%, 50%)
darken(#800, 20%) => #200
```

`_variables.scss`

```
$green: #e4ede0;
$green-alt: darken($green, 15%);
```

Add to `_item.scss`

```
.item--position-1 {
  background: $green;
  border-color: $green-alt;
}
```

![dark border](https://i.imgur.com/6ZcOj9K.png)

### Give buttons transparent background
`_button.scss`

```
.button {
  // more code
  background: transparent;
  // more code
}
```

![transparent background](https://i.imgur.com/CuhLN5W.png)

## Exercise
Make a blue and blue-alt -> #dfe7ed
Make a red and red-alt -> # #eddfdf

### Solution
<details>
  <summary>Solution</summary>
`_variables.scss`

```
$red: #eddfdf;
$red-alt: darken($red, 15%);
$green: #e4ede0;
$green-alt: darken($green, 15%);
$blue: #dfe7ed;
$blue-alt: darken($blue, 15%);
```

`_item.scss`

```
// more code
.item--position-1 {
  background: $green;
  border-color: $green-alt;
}

.item--position-2 {
  background: $blue;
  border-color: $blue-alt;
}

.item--position-3 {
  background: $red;
  border-color: $red-alt;
}
// more code
```

![new colors](https://i.imgur.com/nZEybZp.png)
</details>

