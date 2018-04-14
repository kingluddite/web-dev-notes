# Other ways to bind in React
1. In the constructor

```
constructor() {
  super();
  this.goToTeam = this.goToTeam.bind(this);
}
```

* We use the `constructor()` method to that will take all the methods from the parent class (`React.Component`)
    - `super()` allows us to create a new instance of `React.Component` and name it **TeamPicker** and then sprinkle onto it our own methods like `goToTeam`
        + Then we can, through the constructor, specifically bind `this.goToTeam` by assigning it `this.goToTeam.bind(this);`
        + This is strange for people to wrap their head around
        + Knowing how ES6 classes work will help but you then have to do this for every method you want to bind to this
            * React developers use this for methods they use more than once

## 2. `{this.goToTeam.bind(this)}`

```
<form className="team-selector" onSubmit={this.goToTeam.bind(this)}>
```

```
import React from 'react';
import { getFunName } from '../helpers';

class TeamPicker extends React.Component {
  // no constructor used here
  goToTeam(e) {
    e.preventDefault();
    console.log('goToTeam() method fired!');
    // first grab text from text field
    console.log(this.teamInput );
    // second change URL from / to /team/:teamId
  }

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam.bind(this)}>
        {/* Look here */}
        <h2>Please Enter a Team</h2>
        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} ref={(input) => { this.teamInput = input }} />

        <button type="submit">Visit Team</button>
      </form>
    )
  }
}

export default TeamPicker;
```

### View in browser and you will see clicking the button returns the `input`
* If you change `console.log(this.teamInput )` to `console.log(this)` you will see the `TeamPicker` Component

## Binding with the Arrow function (The ES6 way)
* Binding the ES6 way with a fat arrow
    - Change this:

`onSubmit={this.goToTeam.bind(this)}`

To this:

`onSubmit={(e) => this.goToTeam(e)}`
