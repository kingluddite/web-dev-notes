# Markdown Viewer
## Goal
Enable person to preview markdown as it is edited

## Diagram
![build output for markdown](https://i.imgur.com/cKI4Sz5.png)

Build Markdown (which is `output` section)

`client/components/bins/BinsViewer.js`

```
import React, { Component } from 'react';

class BinsViewer extends Component {
  render() {
    return (
      <div className="col-xs-4">
        <h5>Output</h5>
      </div>
    )
  }
}

export default BinsViewer;
```

And we import `BinsViewer` into `BinsMain`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import BinsEditor from './BinsEditor';
import BinsViewer from './BinsViewer';

class BinsMain extends Component {
  render() {
    if (!this.props.bin) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <BinsEditor bin={this.props.bin}/>
        <BinsViewer bin={this.props.bin} />
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

### Changing Markdown into HTML
Take the Markdown that is entered, translate it into HTML and then we'll render that HTML directly onto the page

### Markdown package
We can use an `npm` package to change Markdown into HTML. This package can take a string of markdown and change it into HTML for us

[npm Markdown package]

### Install Markdown
`$ npm install --save markdown`

### Import Markdown library
`BinsViewer.js`

```
import React, { Component } from 'react';
import { markdown } from 'markdown'; // add this line
```

* Notice we import with `{}` curly braces. Markdown library exports an object that has a couple of different properties on it and we specifically want the property `markdown`
