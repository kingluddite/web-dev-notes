# Rendering List of Bins
**note** Whenever you add a list of items you need to add a `key` as well

`BinsList.js`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';

class BinsList extends Component {
  renderList() {
      return this.props.bins.map(bin => {
        return (
          <li className="list-group-item" key={bin._id}>
            Bin {bin._id}
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

## bcrypt
You may be asked to install bcrypt to speed things up. Feel free to install it if asked

`$ meteor npm install --save bcrypt`

### Test in browser
You should see when you click `Create Bin` the list will grow with `Bin ypbhG7zgnqMYGkq7J` (The word `Bin` with that bin `_id` MDB property). So we know it works

**note** When you add a bin we see that it is instantly created on the client but we know that the bin is also simultaneously created on the server and then it kind of merges the two together to make sure the bin was created appropriately

### Add remove button next to each bin in the list




