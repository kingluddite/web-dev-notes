# BinEditor Component

* Please remove the `console.log()` inside the BinsMain Component

**note** The URL of our bin is completely bookmarkedable (_Is that even a word? It is now!_), so if a user wants to share this `bin` with anyone, they can

This is very impressive in a JavaScript single page application. If you come from Backbone framework you will be impressed

## The BinEditor
It will have the functionality of enabling the user to type markdown into it. It will be a Component so we will make it inside the `bins` folder

`bins/BinsEditor.js`

```
import React, { Component } from 'react';

class BinsEditor extends Component {
  render() {
    return (
       <p>Bins Editor</p>
    );
  }
}

export default BinsEditor;
```

### Add BinsEditor to BinsMain
```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './BinsEditor';

class BinsMain extends Component {
  render() {
    return (
      <div>
        <BinsEditor />
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

## Passing the Bins model into the BinsEditor
So we can update the content, operate on it, all that fun stuff

`BinsMain`

```
class BinsMain extends Component {
  render() {
    return (
      <div>
        <BinsEditor bin={this.props.bin}/>
      </div>
    );
  }
}
```

Now if you use React Dev Tools you can see we have access to the bin inside the `BinsEditor` Component


