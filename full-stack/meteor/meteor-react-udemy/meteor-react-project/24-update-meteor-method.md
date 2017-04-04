# Update Meteor Method
We built our `update` Meteor Method so now we need to wire it up inside our event handler in the `BinsEditor` Component

`BinsEditor`

```
onEditorChange(content) {
    Meteor.call('bins.update', this.props.bin, content);
  }
```

* The order of the arguments is arbitrary
* First argument is the bin we are updating
* Second argument is our content
* If we want to change the order in our event handler we would just have to change the order on the other side (in our Meteor Method)

`imports/collections/bins.js`

```
'bins.update': function(bin, newContent) {
    return Bins.update(bin._id, {$set: { content: newContent } });
  }
```

### Test browser
Type code in editor and refresh and you'll see the code you typed is gone and was not saved

We need to make sure the content we are saving gets pushed back into the code editor as well

`BinsEditor`

```
// more code
  render() {
    return (
       <div className="col-xs-8">
         <h5>Input</h5>
         <CodeMirror
           value={this.props.bin.content}
           onChange={this.onEditorChange.bind(this)}
           options={{ mode: 'markdown', lineNumbers: true }} />
       </div>
    );
  }
// more code
```

* We add `value={this.props.bin.content`}

## Test in browser
We refresh the browser and we get an error of `Cannot read property 'content' of undefined`

What is wrong?

Let's review Lifecycle of our component

Let's look at the `BinsMain` Component

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './BinsEditor';

class BinsMain extends Component {
render() {
  console.log(this.props.bin);
  return (
    <div>
      <BinsEditor bin={this.props.bin}/>
    </div>
  );
}
}

export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');

  return { bin: Bins.findOne(binId) };

}, BinsMain);
```

Let's consider what's happening here:
When we render the BinsMain Component and it's child of `BinsEditor`, they render at the exact same time. When they render we want to get access to our list of `bins`

```
export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');

  return { bin: Bins.findOne(binId) };

}, BinsMain);
```

And at the exact same time we do a search for a Bin with a particular `id`

`Bins.findOne(binId)`

Our subscription fetches data off of our server

`Meteor.subscribe('bins');`

So the Component renders. It immediately tries to find a `bin` but no `bins` are yet available, therefore `this.props.bin` will show up as `undefined` and so `undefined` gets passed into `BinsEditor` and that is why we are getting the error `cannot read property 'content' of undefined`

## Adding a simple check
Into our `BinsMain` Component just to make sure a `bin` has been passed in before we attempt to show the editor

```
class BinsMain extends Component {
  render() {
    if (!this.props.bin) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <BinsEditor bin={this.props.bin}/>
      </div>
    );
  }
}
```

* This new `if` would be a great place to add a spinner component

## Test in browser
It should now save and you'll see the loading for a brief moment
