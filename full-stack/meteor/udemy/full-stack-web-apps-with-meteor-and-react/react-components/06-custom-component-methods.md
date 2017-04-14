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

**note** We cut `handleSubmit` from `client/main.js` and pasted it into the top of `AddPlayer`. It is just a placeholder for now and we will take the code we need to make this transplant properly

## Import the Players collection
AddPlayer

```
import React, { Component } from 'react';
import { Players } from './../../api/players'; // add this line
```

So far all our component have one method `render()`. It is a special method. We never call it yet it always gets called. We are about to create a generic method. It is not used by React. It will never be called unless we explicitly call it

### Our working AddPlayer with custom method working
AddPlayer

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

### Test AddPlayer Component
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
Add a player of `Hank` and when you submit the form you will get an error that `can not read property 'score' of undefined`. This is telling us React can't read the `props` object. This is happening because inside of our custom method we are losing the `this` binding that we automatically get inside the `render()` method. The `this` binding no longer refers to the `AddPlayer` Component. Instead `this` is now referring to the **Global Window Object**

This is not a React problem. This is a JavaScript problem when working with Angular, Ember or anything else

### Fixer Upper
We'll address and fix this issue but first let's see why it's happening using core JavaScript features

We'll use `server/main.js` as it's easy to test and see results in Terminal

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

* We get `Name: King` in Terminal. This works and all is well the problem is this is not what we are doing inside our `AddPlayer` Component
    - What we are doing there is we are registering the method as a **callback**
        + We're saying, "Hey, call this `handleSubmit` method when this form gets submitted"

Now let's illustrate the same flaw using core JavaScript, we'll use `setTimeout()`

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
* **note** We are not calling printName() but we are just referencing it and waiting one second (1000 milliseconds) until we run it, but in the process we have lost the `this` bindings and that is why referencing `this.name` returns `undefined`

## Maintaining Bindings
Good News! It's really simple

We just use a `bind()` method. It is available on every single function which means `obj.printName.bind` exists

* `obj.printName.bind()` - Gets called and it returns a brand new function but the difference is you can force a `this` binding
* You can say, "Hey, no matter what use **this** as `this`"
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

Now we get after the program refreshes, `Name: King`

So that's the problem. Let's make `server/main.js` look like this:

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
If you are passing in a method you've defined on your Component to some sort of event listener (i.e. onClick, onSubmit...) you will have to manually preserve the binding

Remove the score prop in AddPlayer and replace with just:

```
Players.insert({
        name: playerName,
        score: 0
      });
```

And in the instance prop of score from `client/main.js` so it should look like `<AddPlayer />` and not `<AddPlayer score={10} />`


