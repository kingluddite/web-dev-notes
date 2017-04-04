# Publication for Links
We are now saving our list of links to the Links collection

## Create new component
Will take all links in Links collection and display them on the screen

This means we are going to need to take some data from a Meteor collection and stick it onto a React Component

This means we have to set up our `publish` and `subscribe` system

**remember** We use publish and subscribe to ensure that we aren't sending down millions of records to everyone who connects to our application

## Step 1 - For any publication subscription system - Remove `autopublish` package

`$ meteor remove autopublish`

Now our data is not shipped down to all `clients` - this is a very good thing

## Step 2 - Create our publication
We create publications server side - server side offers data out into the world

`server/main.js`

* We remove the default comment

```
Meteor.startup(() => {
  // code to run on server at startup
});
```

And type this:

```
Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});
```

**note** ES6 offers the fat arrow function but as you see above we are using the fat arrow for `Meteor.startup()` but we are not using it inside our `Meteor.publish()` and there is a really good reason why we are using the function keyword instead of the fat arrow function. We will learn why this is the case in the next application

* Above our code finds all the links and we just publish them to everyone
* This is doing the same thing that `autopublish` was doing and we are not being very responsible doing this, we're not showing users only the links they submit, but that is something else we will talk about in the next app we build as well

## Step 3 - The subscription
**remember** The subscription is what consumes data and the subscription is the flipside of the publication

Before we can do the subscription we need to create a component to show the list of links

### Let's create our LinkList component

`client/components/LinkList.js`

```
import React, { Component } from 'react';

class LinkList extends Component {
  render() {
    return (
      <div>List of Links to click</div>
    )
  }
}

export default LinkList;
```

**note**

Whenever we are consuming a publication with a subscription we need to turn our React Component into a `Container`

To do that we need to:

* Install the package and import the `createContainer` helper
* Import the `Links` collection into this file

### Add our imports
`client/components/LinkList.js`

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Links from '../../imports/collections/links';
```

### Create our Container
This Container will be used to inject some data into our Component

createContainer( first argument is fat arrow function, second argument is our component we want to inject the data into)

```
export default createContainer(() => {

}, LinkList);
```

```
export default createContainer(() => {
  Meteor.subscribe('links');

  return { links: Links.find({}).fetch() }
}, LinkList);
```

* We'll fetch all the links
* The links will be assigned to the `links` key { links: }
* That Object `{ links: Links.find({}).fetch() }` will show up inside the LinkList component as `this.props.links`

## Install our dependencies

`$ npm install --save react-addons-pure-render-mixin`

## Install react-meteor-data
`$ meteor add react-meteor-data`

**note** You may need to stop and restart Meteor with:

`ctrl + c` (stops meteor)

`$ meteor` (runs meteor)





