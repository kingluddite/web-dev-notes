# Binding `this`

### Now let's illustrate the same flaw using "vanilla" JavaScript
We'll use `setTimeout()`

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

  setTimeout(obj.printName, 1000);
  // obj.printName();
});
```

* Now this code won't work as expected and we'll get `Name: undefined`
* We are not calling `printName()` but we are just referencing it and waiting one second (_1000 milliseconds_) until we run it
    - But in the process we have lost the `this` bindings
    - That is why referencing `this.name` returns `undefined`

## How do we Maintaining Bindings?
Good News! It's really simple

We just use a `bind()` method. It is available on every single function which means `obj.printName.bind` exists

* `obj.printName.bind()` - Gets called and it returns a brand new function
* But the difference is you can force a `this` binding
* You can say, "_Hey, no matter what use **this** as `this`_"
* In our example we want to continue to use `obj`

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

  setTimeout(obj.printName.bind(obj), 1000);

  // obj.printName();
});
```

* After the program refreshes we get: `Name: King`
* So, we now know what causes the problem. Let's use our knowlege to update our code
* Let's make `server/main.js` look like this:

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

});
```

`AddPlayer`

`<form onSubmit={this.handleSubmit}>`

What we need to do is bind the current value of `this` to **handleSubmit** using

`<form onSubmit={this.handleSubmit.bind(this)}>`

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
        score: this.props.score
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" name="playerName" placeholder="Player Name"/>
        <button>Add Player</button>
      </form>
    );
  }
}
```

### Test in browser
Add a player and you will see the name and the `10` score get passed. It works! 

### Takeaway
If you are passing in a method you've defined on your Component to some sort of event listener (_i.e. onClick, onSubmit..._) you will have to manually preserve the binding

Remove the **score** `prop` in `AddPlayer` and replace with just:

```
Players.insert({
        name: playerName,
        score: 0
      });
```

And in the instance `prop` of **score** from `client/main.js` so it should look like `<AddPlayer />` and not `<AddPlayer score={10} />`


