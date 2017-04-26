# Custom Component Methods
We currently have our form rendered but we need to bring the `handleSubmit` behavior we had before into the `AddPlayer` Component

To do this we'll have to create a **Custom Method** on our React Component

`AddPlayer`

```
import React, { Component } from 'react';

const handleSubmit = event => {
  const playerName = event.target.playerName.value;

  event.preventDefault();

  if (playerName) {
    event.target.playerName.value = '';

    Players.insert({
      name: playerName,
      score: 1
    });
  }

};

export default class AddPlayer extends Component {
  render() {
    return (
      <form>
        <input type="text" name="playerName" placeholder="Player Name"/>
        <button>Add Player</button>
      </form>
    );
  }
}
```

* We cut `handleSubmit` from `client/main.js` and pasted it into the top of `AddPlayer`
* It is just a placeholder for now and we will take the code we need to make this transplant properly

## Import the Players collection
`AddPlayer`

```
import React, { Component } from 'react';
import { Players } from './../../api/players'; // add this line
```

## The special `render()` method
* So far all our component have one method `render()`
* It is a special method
* We never call it yet it always gets called

## Generic Methods
* We are about to create a **generic method**
* It is not used by **React**
* It will never be called unless we explicitly call it

`AddPlayer`

```
import React, { Component } from 'react';
import { Players } from './../../api/players';

export default class AddPlayer extends Component {
  handleSubmit(event) {
    const playerName = event.target.playerName.value;

    event.preventDefault();

    if (playerName) {
      event.target.playerName.value = '';

      Players.insert({
        name: playerName,
        score: 1
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="playerName" placeholder="Player Name"/>
        <button>Add Player</button>
      </form>
    );
  }
}
```

### Test `AddPlayer` Component
Make sure all the previous functionality of our Add Player form is now working after our code transplant

### Houston we have a problem
Let's add a score prop to `client/main.js`

`<AddPlayer score={10} />`

Now set it using `this.props.score` like this:

`AddPlayer`

```
handleSubmit(event) {
    const playerName = event.target.playerName.value;

    event.preventDefault();

    if (playerName) {
      event.target.playerName.value = '';

      Players.insert({
        name: playerName,
        score: this.props.score
      });
    }
  }
```

### Test in browser
* Add a player of `Hank`
* When you submit the form you will get an error that `can not read property 'score' of undefined`
* This is telling us React can't read the `props` object
* This is happening because inside of our custom method we are losing the `this` binding that we automatically get inside the `render()` method
* The `this` binding no longer refers to the `AddPlayer` Component
* Instead `this` is now referring to the **Global Window Object**

## This is not a **React** problem
This is a "vanilla" JavaScript problem and you'll come across it when working with Angular, Ember or anything else that involves JavaScript

### Let's fix this!
We'll address this issue but why is it happening?

#### Let's play on our server again
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {
  const obj = {
    name: 'King',
    printName() {
      console.log(`Name: ${this.name}`);
    }
  }

  obj.printName();
});
```

* We get `Name: King` in Terminal
* This works and all is well the problem is this is not what we are doing inside our `AddPlayer` Component
    - What we are doing there is we are registering the method as a **callback**
    - We're saying, "_Hey, call this `handleSubmit` method when this form gets submitted_"

