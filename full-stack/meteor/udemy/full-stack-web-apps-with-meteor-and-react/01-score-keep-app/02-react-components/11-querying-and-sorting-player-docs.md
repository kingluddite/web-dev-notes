# Querying and Sorting Player Documents
We'll use MongoDB to sort because it has it built in

## We want to sort the players by their score
High scores on top, low scores on bottom

## Open Mongo
`> meteor mongo`

Find all players `> db.players.find()`

### sort() syntax
`db.COLLECTION.find().sort({ key-you-want-to-sort-by: 1|-1})`

#### Sort Ascending Order

`db.players.find().sort({name: 1})`

#### Sort Descending Order
`db.players.find().sort({score: -1})`

### Switching back to our Application
`client/main.js`

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from './../imports/ui/components/App';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find().fetch();
    const title = 'Score Keep';
    // const slogan = 'One contest at a time';
    ReactDOM.render(<App players={players} title={title} />, document.getElementById('app'));
  });

});
```

We want to look at:

`const players = Players.find().fetch();`

* `find()` takes an optional query
* We need to pass an empty object (_To get all the players_) as the first argument
    - Just so we can use the second argument, our `options` object

**note** The `sort` object gets passed on to the `options` object available on find (_So the syntax will look different in Meteor then in the MongoDB shell_)

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import App from './../imports/ui/components/App';
import { Players } from './../imports/api/players';

Meteor.startup(() => {

  Tracker.autorun(() => {
    const players = Players.find({}, {
      sort: {
        score: -1
      }
    }).fetch();
    const title = 'Score Keep';
    // const slogan = 'One contest at a time';
    ReactDOM.render(<App players={players} title={title} />, document.getElementById('app'));
  });

});
```

### Formatting
* You could format your code like this
* You decide what you think is more readable

```
const players = Players.find({}, {sort: { score: -1 }}).fetch();
```

[Sorting Documentation on Meteor](http://docs.meteor.com/api/collections.html#sortspecifiers)

[MongoDB Cursor Sorting Documenation](https://docs.mongodb.com/manual/reference/method/cursor.sort/)
