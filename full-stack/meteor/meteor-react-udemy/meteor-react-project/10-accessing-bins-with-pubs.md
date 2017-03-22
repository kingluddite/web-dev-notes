# Accessing bins with publications
With the `Bin Create` button that we just wired up we now have the ability to add records to our bins collection

## We want to see if we are creating bins
So we will create a new component to render a list of all the bins that this user has access to

## Task
* Get a list of all the user bins that this user has created
* That means we have to create a new component and use the createContainer helper (from mett) to inject data from a collection into the component

**note** We don't want to use the autopublish package
That would be cheating because it would make all data available to everyone
We are going to create a publication and a subscription here to make sure the list of bins is accessible to our user

## Remove autopublish package
`$ meteor remove autopublish`

**note** The autopublish package automatically sends all data to all different clients in our application which is something we really don't want to do here. We need to have some level of security to determine which users see which bins

## Define our `bins` publication
`server/main.js`

* Inside of our `meteor.startup()` block:

```
import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins.js'; // add this line

Meteor.startup(() => {
  Meteor.publish('bins', function() {

  });
});
```

* We are using the `function` keyword again and not the ES6 fat arrow function. Why?
    - Because inside of this publication we need to know who the current user is because we only want to publish records that the current user has access to (and that is why we are using the `function` keyword here)
        + Previously we use `this.userId` property that was available to us
            * That was available becuase we used the `function` keyword
            * If we used the fat arrow function the value of `this` would have been set to the surrounding context and we would not have `this.userId`

## Make sure we are publishing only the bins that are owned by the current user
bins where the value of the `ownerId` === `this.userId`

**note** Publications are another location where we have access to the `userId` (another spot where authentication in Meteor is a shining example of awesome)
    We get access to our userId for free inside of our publications

**note** This is the first time we have passed **find logic** or filtering to a find in a collection as well and by passing in an object here to find `{ ownerId: this.userId }`, MongoDB will search through all the records in the bin collection and only return the records where the `ownerId` is equal to `this.userId` (aka the user id)

