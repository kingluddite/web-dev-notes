# Removing Bins
**note** Whenever we need to `insert`, `update` or `delete` data we need to set up a Meteor Method

## Are we removing a bin or deleting a bin?
It is just a word but Meteor likes to use the word `remove` over the word `delete` so we should use `remove` in our Meteor Method instead of `deleting` or `destroying` them

`imports/collections/bins.js`

```
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'bins.insert': function() {
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  },

  'bins.remove': function (bin) {
    return Bins.remove(bin);
  }
});

export const Bins = new Mongo.Collection('bins');
```

### Add remove button
* We need to add our event handler
* To make sure the event handler is called with the correct bin we will wrap our event handler with a **fat arrow function**

`BinsList.js`

```
  renderList() {
      return this.props.bins.map(bin => {
        return (
          <li className="list-group-item" key={bin._id}>
            Bin {bin._id} <span className="pull-right"><button className="btn btn-danger" href="#" onClick={() => this.onBinRemove(bin)}>Remove</button></span>
          </li>
        );
      });
  }
```

* This is very different compared to how we normally define a **callback**
    - Normally we would say `this.onBinRemove.bind(this)`
    - Why are we using this new syntax?
        + As we loop through `bin` inside our `.map()` the value of `bin` is constantly changing
            * Each time we create a new button, we are creating a **new fat arrow function** and passing it to this `onClick` **prop**
            * Whenever a user clicks on this very particular button (_i.e. the 4th button that gets rendered in a list_), we will invoke the 4th **fat arrow function** that was created which has a reference to the 4th `bin` and that is the reason we are using **a fat arrow function** here to make sure we pass in the correct `bin`

 If we just did this instead:

 `onClick={this.onBinRemove(bin)}` this method would be instantly called which is definately not what we want. We only want this handler called once the user clicks on the button

```
onBinRemove(bin) {
   Meteor.call('bins.remove', bin);
}

renderList() {
  return this.props.bins.map(bin => {
     return (
      <li className="list-group-item" key={bin._id}>
        Bin {bin._id} <span className="pull-right"><button className="btn btn-danger" href="#" onClick={() => this.onBinRemove(bin)}>Remove</button></span>
      </li>
    );
  });
}
```

### Test in browser
Click on `X` and you will see the `bin` is removed

### Add some style
`client/style.css`

```css
.list-group-item {
  height: 55px;
}
```

### Test in browser
Nice! Our Remove button has more space and it looks like it is happy now

## Final code for BinList.js

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';

class BinsList extends Component {
  constructor() {
    super();
    this.onBinRemove = this.onBinRemove.bind(this);
  }

  onBinRemove(bin) {
    Meteor.call('bins.remove', bin);
  }

  renderList() {
      return this.props.bins.map(bin => {
         return (
          <li className="list-group-item" key={bin._id}>
            Bin {bin._id} <span className="pull-right"><button className="btn btn-danger" href="#" onClick={() => this.onBinRemove(bin)}>Remove</button></span>
          </li>
        );
      });
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('bins');

  return { bins: Bins.find({}).fetch() };
}, BinsList);
```


