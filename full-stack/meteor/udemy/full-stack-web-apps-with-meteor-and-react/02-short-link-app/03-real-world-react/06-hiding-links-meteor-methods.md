# Hiding Links with Meteor Methods
We won't allow users to remove links, we'll only allow them to hide links. This will allow them to clean up their link list but it won't break links people are already using

Check out our links in the Mongo Shell

`$ meteor mongo`

`> db.links.find()`

Our data may differ but we all should have `_id`, `url` and `userId`

## Blowing up a Collection again?
Here's is an alternative. We want to add a field into our Collection and we can use a mongo modifier to add this to all records on the fly without blowing up our Collection. This technique will save you time

**tip** `cmd` + `k` clears Mongo Shell

`> db.links.updateMany({}, { $set: {visible: true} })`

Now check your `links` Collection

`> db.links.find()`

```
{
  "_id": "SPNwT9XkNSFiBmosB",
  "url": "http://example.com",
  "userId": "JoYEWyWF6ZBAsbsDJ",
  "visible": true
}
{
  "_id": "HyyL0ywRx",
  "url": "http://google.com",
  "userId": "JoYEWyWF6ZBAsbsDJ",
  "visible": true
}
{
  "_id": "HJZuK3vRe",
  "url": "http://kingluddite.com",
  "userId": "JoYEWyWF6ZBAsbsDJ",
  "visible": true
}
```

* We just added the `visible` field to all our records

## Change how new links are created
`links.js`

Update the insert method to include `visible: true`

```
// more code
Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true
    });
// more code
```

Add the new `visible` to PropTypes in `LinksListItem.js`

```
// more code
LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}
```

**note** We use `bool` and not `boolean`

## Render it to screen
`LinksListItem.js`

```
render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible}</p>
         <button ref="copy" data-clipboard-text={this.props.shortUrl}>
           {this.state.justCopied ? 'Copied' : 'Copy'}
         </button>
       </div>
    );
  }
```

### You can't render Booleans to the screen
That won't work because you can't render Booleans to the screen unless you use the `toString()` method

```
render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible.toString()}</p>
         <button ref="copy" data-clipboard-text={this.props.shortUrl}>
           {this.state.justCopied ? 'Copied' : 'Copy'}
         </button>
       </div>
    );
  }
```

### Test in browser
![render boolean to screen](https://i.imgur.com/6HArN2v.png)

Add a new link and make sure that works too

### Add Hide/Unhide button
`LinksListItem.js`

```
// more code
<button>
  {this.props.visible ? 'Hide' : 'Unhide'}
</button>
// more code
```

### Add Meteor.call()
#### Add the necessary import to use `Meteor.call()`
`LinksListItem.js`

```
import { Meteor } from 'meteor/meteor'; // add this line
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
// more code
```

### Add the `Meteor.call()` (we'll do it inlines this time)
`LinksListItem.js`

```
// more code
<button onClick={() => {
   Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
}}>
// more code
```

* We fall our Meteor Method naming convention `links.setVisibility`
* We pass two arguments `_id` and `visible` using **props**
    - We pass the opposite of the current `visible` boolean and that will enable us to toggle the value

### Completed `LinksListItem.js`

```
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

class LinksListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1000);
    }).on('error', () =>{
      alert('Unable to copy. Please manually copy the link.');
    });
  }
  componentWillUnmount() {
     this.clipboard.destroy();
  }

  render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible.toString()}</p>
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
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}

export default LinksListItem;
```

## Exercise
* Create the Meteor Method `links.setVisibility`
* Make sure you check if the user is logged in
    - Throw a Meteor error if they are not
* Set up a SimpleSchema
    - `_id` is a string with a length greater than 1
    - visible is a boolean
* Links.update
    - We don't need to use `Links.updateMany()` because we know we are only updating one record every time we call this method
    - Make sure `_id` and `this.userId` match the Document
    - Set the visible property to the visible argument

<details>
  <summary>Solution</summary>
`LinksListItem.js`

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
      visible: true
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
  }
});
```

Test and it should work when you click the `Hide` button it should change to `Unhide` and **true** should switch to **false**
</details>

## Next
Create a way to show a visible list of links and a hidden list of links
