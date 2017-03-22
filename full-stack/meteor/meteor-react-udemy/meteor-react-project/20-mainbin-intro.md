# BinsMain Overview

![BinsMain diagram](https://i.imgur.com/ly2m1zN.png)

We are first going to focus on the `Input` panel and the `Output` panel

Users will enter markdown in `Input` (Editor Component)
User will see transpiled markdown (nice looking markdown) in `Output` (Viewer Component)

The editor and view Component both need a bin to operate on

So when a user navigates to this page and passes the binId we should get access to that bin so we can give this entir `page` access to that bins `props`

Whenever we hit the BinsMain Component we need to read some data out of our collection (whenever we say "read some data" we should start thinking it's time to `publish` and `subscribe`)

We already have a publication that already wires up all our bins for us

We just need to wireup `bin` name to a publication and then pick out the particular `bin` from that list (and that will be the particular bin that corresponds to the `id` in the URL)

## Step 1 - Convert BinsMain into a Container

`BinsMain`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';

class BinsMain extends Component {
  render() {
    
    return (
      <div>BinsMain</div>
    );
  }
}

export default createContainer(() => {
  
}, BinsMain);
```

## The bin that we care about
* The bin we care about's `id` is available in the URL
    - `props.params.binId`

**remember** This is where we set `binId` in router

`client/main.js`

`<Route path="/bins/:binId" component={BinsMain} />`

When anyone goes to a URL that looks like this (or matches this URL pattern) strip off this last part `/:binId` and make it available as a param called specifically `binId`

`Header.js`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';

class BinsMain extends Component {
  render() {
    console.log(this.props.params.binId);
    return (
      <div>BinsMain</div>
    );
  }
}

export default createContainer(() => {

}, BinsMain);
```

If you test this, you will see that we have access to the `binId` (you'll actually get an error but we'll fix that soon)

## We have a problem
We want to get access to the very particular `binId` inside of `createContainer()`

Becuase we don't want to pass the full list of bins inside of the BinsMain Component

The `bin` that we care about `binId` is available as a prop to the Component. We need to somehow get access to this Components `props` inside of this container wrapper:

```
export default createContainer(() => {

}, BinsMain);
```

### We can pass `props` to the container like this:
```
export default createContainer((props) => {

}, BinsMain);
```

The fat arrow function is called with one argument (which is `props`)
When ever anyone imports BinsMain (like we do in our router) and it gets used (aka 'rendered onto the screen'), if we pass BinsMain any props, they will show up inside of this `createContainer` function in addition to showing up inside of the component. So they just show up in both locations

### We grab the `binId`

```
export default createContainer((props) => {
  const { binId } = props.params;

}, BinsMain);
```

### We subscribe again!
```
export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');

}, BinsMain);
```

Why are we subscribing again?
Because that BinList subscription is only going to kick in if the user first navigates to the root route of our application

So if the user refreshes the page or have a bookmarked link that goes directly to a bin, we need to make sure that the BinsMain Components also knows how to subscribe to the list of bins as well

### Find our Bin!
```
export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');

  return { bin: Bins.findOne(binId) };

}, BinsMain);
```

Now we get rid of the error and when we click `Create Bin` we are taken to our new bin

### Test to make sure
```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';

class BinsMain extends Component {
  render() {
    console.log(this.props.bin);
    return (
      <div>BinsMain</div>
    );
  }
}

export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');

  return { bin: Bins.findOne(binId) };

}, BinsMain);
```

We throw in a `console.log(this.props.bin)` and then when we click to get to the bin page we see `undefined` - because we haven't loaded any data and then hen our subscription kicks in we get a second `console.log()` we see that we have returned the [bin object with all its details](https://i.imgur.com/KgLua5p.png) that we can use on the page

**note** Your url `binId` and the `_id` of the [object are the same](https://i.imgur.com/2dynyEr.png) (they have mapped to each other)
