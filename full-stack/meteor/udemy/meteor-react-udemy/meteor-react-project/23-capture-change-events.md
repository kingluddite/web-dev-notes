# Capture Change Events
We can type but nothing is saved

The CodeMirror component has a nearly identical API as input tags

We can set a value property on the component and codemirror will use that as the value it is going to show inside of the text box

`BinsEditor`

```
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class BinsEditor extends Component {
  onEditorChange(content) {
    console.log(content);
  }
  render() {
    return (
       <div className="col-xs-8">
         <h5>Input</h5>
         <CodeMirror
           onChange={this.onEditorChange.bind(this)}
           options={{ mode: 'markdown', lineNumbers: true }} />
       </div>
    );
  }
}

export default BinsEditor;
```

**note** `onChange` is passing the `onEditorChange()` event handler `content` and not an event

### Test in browser
See what appears in console as you type inside editor

## Fun part
Whenever we type something we need to immediately save it to our bin so we will need to `update the collection`. **IMPORTANT** Whenever we `update the collection` with **inserts**, **updates**, **removals** to a collection means we have to have a Meteor Method set up

Our Meteor Method will update a very particular `bin` (_which means `this.props.bin` (aka - the bin that we are currently operating on)_)

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
  },

  'bins.update': function(bin, newContent) {
    return Bins.update(bin._id, newContent);
  }
});

export const Bins = new Mongo.Collection('bins');
```

Can we just do this?

```
'bins.update': function(bin, newContent) {
    return Bins.update(bin._id, newContent);
  }
```

Sadly, it is not that easy because whenever we want to update records in a MongoDB Collection we have to use **Mongo Modifiers** (we used `$inc` previously for incrementing) but in this case we want to entirely replace the content in the model with this new updated content (**newContent**)

To do a full replacement of a property we can use `$set` operator and then pass in a set with the key and value of `content`

```
'bins.update': function(bin, newContent) {
    return Bins.update(bin._id, {$set: { content: newContent } });
  }
```

**What this means** - In the `Bins` collection, update the `bin` with this id (`bin._id`) and I want to set the value of `content` with `newContent`

**note** `{ $set: { content: newContent } }`

* `content` is the key and `newContent` is the value we want to set the `key` to

```
'bins.update': function(bin, content) {
  return Bins.update(bin._id, {$set: { content: content } });
}
```

* We change the value passed from `newContent` to just `content` as this is what most people will use when working with content.

And now we can refactor with ES6 to:

```
'bins.update': function(bin, content) {
  return Bins.update(bin._id, {$set: { content } });
}
```


