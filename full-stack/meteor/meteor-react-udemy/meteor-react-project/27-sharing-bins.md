# Sharing Bins
![sharing bins diagram](https://i.imgur.com/DWag916.png)

* emails to share will be stored in an array inside `sharedWith`

* We will need a new Component
* Should have an input and a button
* When someone enters an email, it should be added into that `sharedWith` array
* (see the flip side of this) figure out if a user is allowed to see a particular bin
    - When user logs in, we need to figure out the list of bins that user has access to
    - Whenever we talk about data a user has access to, we almost always will be talking about creating a new publication
        + When `bill` logs in we will have a publication that says 'what bins do I have access to'

## BinsShare
`client/components/bins/BinsShare`

```
import React, { Component } from 'react';

class BinsShare extends Component {
  render() {
    return (
      <footer className="bins-share">
        BinsShare
      </footer>
    )
  }
}

export default BinsShare;
```

## Import into BinsMain
```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './BinsEditor';
import BinsViewer from './BinsViewer';
import BinsShare from './BinsShare'; // add this line

class BinsMain extends Component {
  render() {
    if (!this.props.bin) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <BinsEditor bin={this.props.bin}/>
        <BinsViewer bin={this.props.bin} />
        <BinsShare bin={this.props.bin} />
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

## Fix our CSS
Looks like this:

![current bad css footer](https://i.imgur.com/cPsDke5.png)

`main.css`

```
.bins-share {
  position: absolute;
  bottom: 0;
  width: 100%;
}
```

### Next Challenge
Adding functionality to our `BinsShare`
