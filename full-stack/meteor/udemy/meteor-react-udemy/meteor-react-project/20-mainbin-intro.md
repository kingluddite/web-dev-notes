# BinsMain Overview

![BinsMain diagram](https://i.imgur.com/ly2m1zN.png)

We are first going to focus on the `Input` panel and the `Output` panel

Users will enter markdown in `Input` (_Editor Component_)
User will see transpiled markdown (_nice looking markdown_) in `Output` (Viewer Component)

The editor and view Component both need a bin to operate on

So when a user navigates to this page and passes the `binId` we should get access to that `bin` so we can give this entire `page` access to that `bin`'s `props`

Whenever we hit the `BinsMain` Component we need to read some data out of our collection (_whenever we say "read some data" we should start thinking it's time to `publish` and `subscribe`_)

We already have a **publication** that already wires up all our `bins` for us

We just need to wireup `bin` name to a publication and then pick out the particular `bin` from that list (_and that will be the particular `bin` that corresponds to the `id` in the URL_)

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

When anyone goes to a URL that looks like this (_or matches this URL pattern_) strip off this last part `/:binId` and make it available as a param called specifically `binId`

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

//export default createContainer(() => {

//}, BinsMain);
export default BinsMain;
```

If you test this, you will see that we have access to the `binId`

If you delete `export default BinsMain;` and uncomment:

```
//export default createContainer(() => {

//}, BinsMain);
```

to this:

```
export default createContainer(() => {

}, BinsMain);
```

You will get an error because our new Container is currently not returning anything

## How can we pass our current bin to this new Container?
Our first hurdle to overcome

We want to get access to the very particular `binId` inside of `createContainer()` because we don't want to pass the full list of bins inside of the `BinsMain` Component

## The `bin` we care about
The `bin` that we care about `binId` is available as a `prop` to the Component. We need to somehow get access to this Components `props` inside of this container wrapper:

```
export default createContainer(() => {

}, BinsMain);
```

### We can pass `props` to the container like this:
```
export default createContainer((props) => {

}, BinsMain);
```

The **fat arrow function** is called with one argument (which is `props`)
When ever anyone imports `BinsMain` (_like we do in our router_) and it gets used (_aka 'rendered onto the screen'_), if we pass `BinsMain` any **props**, they will show up inside of this `createContainer` function in addition to showing up inside of the Component. So they just **show up in both locations**

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

#### Why are we subscribing again?
Because that `BinList` subscription is only going to kick in if the user first navigates to the **root route** of our application

So if the user refreshes the page or has a bookmarked link that goes directly to a `bin`, we need to make sure that the `BinsMain` Component also knows how to **subscribe** to the list of bins as well

### Find our Bin!
```
export default createContainer((props) => {
  const { binId } = props.params;
  Meteor.subscribe('bins');

  return { bin: Bins.findOne(binId) };

}, BinsMain);
```

Now we get rid of the error and when we click `Create Bin` we are taken to our new bin and we see the `console.log()` of our current `binId`

**note** Remove that `console.log()` as we don't need it anymore. Also note that the `binId` appeared twice showing you that not only are we generating a `console.log()` from our `render()` but all from our `Container`

### One more Test just to make sure
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

We throw in a `console.log(this.props.bin)` and then when we **click** to get to the `bin` page we see `undefined` (_because we haven't loaded any data yet_) and then our **subscription** kicks in we get a second `console.log()` we see that we have returned the `bin` object with all it's juicy details

![bin object with all its details](https://i.imgur.com/KgLua5p.png) 

Now we can use all those juicy details in this Component!

**note** Your url `binId` and the `_id` of the [object are the same](https://i.imgur.com/2dynyEr.png) (_they have mapped to each other_)
