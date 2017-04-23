# Configure Link Analytics
* We want to know how many times people used our links
* We will add two new fields to our `links` Collection
    - visitedCount
    - lastVisitedAt (will start at null and switch to a timestamp)

## Massaging existing data
We don't want to blow up our existing Database, we want to append attributes and attribute values to it (we never want to ask our users to reinsert their data, right?)

### Mongo Shell time
`> db.links.find()`

## Exercise
Add `visitedCount` with a default value of `0` and `lastVisitedAt` to `null` for all existing Documents inside our links Collection

<details>
  <summary>Solution</summary>
`> db.links.updateMany({}, { $set: { visitedCount: 0, lastUpdatedAt: null }})`

Congrats! You just migrated your Database
</details>

## Update our `links` structure
`links.js`

```
// more code
Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastUpdatedAt: null
    });
// more code
```

## Test
Add a link and make sure it has new default fields

## How do we "track" a visit?
These are the three lines that set up our redirect

`server/main.js`

```
res.statusCode = 302;
res.setHeader('Location', link.url);
res.end();
```

### `links.trackVisit`
Will update the `visitCount` and it will set `lastVisitAt` a timestamp

`client/main.js`

```
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import { Links } from './../imports/api/links';
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
```

## Let's add the `links.trackVisit` Meteor Method
`links.js`

* We don't need to authenticate the user because this could be used by users who are not using our app

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    // check if the user is not logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({
      url
    });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastUpdatedAt: null
    });
  },
  'links.setVisibility'(_id, visible) {
    // check to make sure the user is logged in
    if (!this.userId) {
      // throw Meteor error
      throw new Meteor.Error('not-authorized');
    }

    // _id is a string with length greater than 1
    // visible is a boolean
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({
      _id, visible
    });

    // Links.update - where _id and this.userId match the doc
    // Set the visible property to the visible
    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    });
  },
  'links.trackVisit'(_id) {

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id
    });

    Links.update({
      _id
    }, {
      $set: {
        lastVisitAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });
  }
});
```

* `lastVisitAt: new Date().getTime()` - milliseconds since epoch
* `$inc` - We don't care about the current value we just want to increase it by one

## Add PropTypes
```
LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}
```

* We don't require `lastVisitedAt` because it starts at `null` and then we add the timestamp

## Render two new fields to screen
```
  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible.toString()}</p>
         <p>{this.props.visitedCount} - {this.props.lastVisitedAt}</p>
         <button ref="copy" data-clipboard-text={this.props.shortUrl}>
           {this.state.justCopied ? 'Copied' : 'Copy'}
         </button>
         <button onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
         }}>
           {this.props.visible ? 'Hide' : 'Unhide'}
         </button>
       </div>
    );
  }
```

## Test
Add a link and make sure the new fields are rendering to screen
* null won't print to screen so by default it's empty
