# video #8

## ResolutionsWrapper.js

```js
import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Navigation } from './Navigation';
import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';

Resolutions = new Mongo.Collection('resolutions');

export default class ResolutionsWrapper extends TrackerReact(React.Component) {

  resolutions() {
    // find all resolutions
    return Resolutions.find().fetch()
  }

  render() {
    let res = this.resolutions();
    if(res.length < 1) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <h1>My Resolutions</h1>
        <Navigation />
        {this.props.children}
        <ResolutionsForm />
        <ul className="resolutions">
          {this.resolutions().map( (resolution)=>{
            return <ResolutionSingle key={resolution._id} resolution={resolution} />
          })}

        </ul>
      </div>
    )
  }
}
```

## Insecure
on console
`Resolutions.insert({text: "hi"})`

This will enter data into your database collection. Not good because it is obviously not safe. This is because you automatically have the insecure package running in meteor by default
Why? Because it makes prototyping so easy

Use meteortoys to see the effect

so remove insecure from packages
your app will break when you insert that into the console
use meteortoys to easily remove that document

now try to insert a record into your form and you will get insert denied

**note** atom sometimes tries to format files it shouldn't. for some reason atom thinks packages should be formatted with html. You need to change the syntax to simple Text. Undo formatting first and then change sytax.

You will get error `insert failed: Access denied` in the console
Why the error? Because we can't insert from the front end any longer

What is the solution?
Meteor Methods

## Meteor Methods

```js
import React, {Component} from 'react';
// import { render } from 'react-dom';
export default class ResolutionsForm extends Component {
  addResolution(event) {
    event.preventDefault();
    let text = this.refs.resolution.value.trim();

    Meteor.call('addResolution', text, ()=>{
      this.refs.resolution.value = '';
    });

  }

  render() {

    return (
      <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
       <input
         type="text"
         ref="resolution"
         placeholder="Ride Bike"
       />
      </form>
    )
  }
}
```

Now you can safely enter resolutions but they will be inserted server side and we use the call() method to do that

import **note**

the arrow function allows us to bind `this`

this is bound because of arrow function

```js
Meteor.call('addResolution', text, ()=>{
      this.refs.resolution.value = '';
});
```

this is not bound with traditional function()

```js
Meteor.call('addResolution', text, function() {
      this.refs.resolution.value = '';
});
```

you'll get an error like this
`Exception in delivering result of invoking 'addResolution': TypeError: Cannot read property 'resolution' of undefined`

**note** arrow function are not just a shorthand. it changes the context of `this`

now if you try to run this code in the console you will get an error

on console
`Resolutions.insert({text: "hi"})`

## AutoPublish
![query collection from client](https://i.imgur.com/K6LcrHv.png)

this is not good and should be disabled so remove autopublish from `.packages`

once removed, all our list of resolutions disappear
they are still in our collection but the collections are no longer pusblished from our server

rename `server/main.js` to `server/publish.js`

change the code to look like this:

```js
Resolutions = new Mongo.Collection('resolutions');

Meteor.publish('allResolutions');
```

### subscribing client side to collection

```js
import React from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Navigation } from './Navigation';
import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';

Resolutions = new Mongo.Collection('resolutions');

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
 constructor() {
   super();

   this.state = {
     subscription: {
       resolutions: Meteor.subscribe('allResolutions')
     }
   }
 }

  resolutions() {
    // find all resolutions
    return Resolutions.find().fetch()
  }

  render() {
    let res = this.resolutions();
    if(res.length < 1) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <h1>My Resolutions</h1>
        <Navigation />
        {this.props.children}
        <ResolutionsForm />
        <ul className="resolutions">
          {this.resolutions().map( (resolution)=>{
            return <ResolutionSingle key={resolution._id} resolution={resolution} />
          })}

        </ul>
      </div>
    )
  }
}
```

`server/publish.js`

```js
Resolutions = new Mongo.Collection('resolutions');

Meteor.publish('allResolutions', function() {
  return Resolutions.find();
});
```

Now all our data is back!

when we leave this page
when this component is no longer being used
we need to work with the life cycle and unmount
we don't want to remain subscribed to that data
we want to cancel that subscription

```js
componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }
```

use meteortoys to change one Resolutions document complete value to false

then inside the publish filter out all completes to show false like this

server/publish.js

```js
Meteor.publish('allResolutions', function() {
  return Resolutions.find({complete: false});
});
```

now all documents inside the Resolutions collection only show `complete` values of `false`


### video # 11
Updating and Removing data

`imports/ui/components/ResolutionSingle.js`

```js
import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

  toggleChecked() {
    console.log(this);
    Meteor.call('toggleResolution', this.props.resolution._id, this.props.resolution.complete);
  }
  render() {
    return (
      <li>
        <input type="checkbox"
          readOnly={true}
          checked={this.props.resolution.complete}
          onClick={this.toggleChecked.bind(this)} />
        {this.props.resolution.text}
        {this.props.resolution.complete.toString()}
      </li>
    )
  }
}
```

`server/method.js`

```js
Meteor.methods({
  addResolution(resolution) {
    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date()
    });
  },
  toggleResolution(id, status) {
    Resolutions.update(id, {
      $set: { complete: !status}
    });
  }
});
```

## Delete resolution

i updated the publish to show all docs and not hide docs that are not completed

```js
Resolutions = new Mongo.Collection('resolutions');

Meteor.publish('allResolutions', function() {
  // return Resolutions.find({complete: false});
  return Resolutions.find();
});
```

i added our delete method on the server

```js
Meteor.methods({
  addResolution(resolution) {
    Resolutions.insert({
      text: resolution,
      complete: false,
      createdAt: new Date()
    });
  },
  toggleResolution(id, status) {
    Resolutions.update(id, {
      $set: { complete: !status}
    });
  },
  deleteResolution(id) {
    Resolutions.remove(id);
  }
});
```

I added our call from the client to the server method to delete our resolution

```js
import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

  toggleChecked() {
    console.log(this);
    Meteor.call('toggleResolution', this.props.resolution._id, this.props.resolution.complete);
  }

  deleteResolution () {
    Meteor.call('deleteResolution', this.props.resolution._id);
  }
  render() {
    return (
      <li>
        <input type="checkbox"
          readOnly={true}
          checked={this.props.resolution.complete}
          onClick={this.toggleChecked.bind(this)} />
        {this.props.resolution.text}
        <button className="btn-cancel" onClick={this.deleteResolution.bind(this)}>&times;</button>
      </li>
    )
  }
}
```