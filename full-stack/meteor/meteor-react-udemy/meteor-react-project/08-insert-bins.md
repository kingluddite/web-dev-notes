# Insert Bins method
**note** Meteor methods are protected functions that are run both on the client and the server. By default in a Meteor project we don't have to implement these meteor methods because of the `insecure` package which lets any user full CRUD on any data they want

We will remove the `insecure` package right away

`$ meteor remove insecure`

Now our app is under `total lockdown` and if we want to create a new `bin` we will have to create a new meteor method

Usually a good idea to plan out all the meteor methods you'll need before you start

Usually you'll want to `insert`, `remove` `update` any meteor collection

## Add our insert collection meteor method
`imports/collections/bins.js`

```
Meteor.methods({
  'bins.insert': function() {
    return Bins.insert({
      
    });
  }
});
```

Why are we using the `function` keyword vs a fat arrow function?

### Default properties of our `Bin` collection
What are the default properties we want for a new `bin` collection?

We should always define reasonable default properties of our bin model

**note** We can store a date directly inside mongo and mongo will know how to store it. Other tutorials may use `new Date().valueOf()` and that would return a string of characters and store that in the database. We will use just `new Date()` because MongoDb natively knows how to deal with the Date() object and it knows how to do some pretty complex queries with the Date() object that it can't do if we use a string generated from `new Date().valueOf()`

Meteor treats authentication like a first class citizen and makes information about whether or not the current user is authenticated all over our application

**this is cool** Inside all of our Meteor methods the currently logged in user can be accessed by referencing `this.userId`

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
  }
});

export const Bins = new Mongo.Collection('bins');
```

So if our user is logged in, inside of a Meteor method we can just reference `this.userId`

### Back to fat arrow function vs our use of `function` keyword
If we used a fat arrow function here:

```
Meteor.methods({
  'bins.insert': function() {
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  }
});
```

Remember what a fat arrow function does. It binds the value of `this` to whatever to whatever the surrounding context is

But we want to make reference to `this.userId` in our Meteor Method and whenever this Meteor method is called it will be called with a certain context of `this` and if we used a fat arrow function here it would break `this.userId` (`this` would be assigned to the surrounding context which would not have `this` assigned to it) So that is why we use the keyword `function` in our meteor method so the value of `this` can be determined at runtime

In ES6 everyone is like why not use the fat arrow function all the time and this is not always what you want to do. Sometimes you will need to use the function keyword because you want to leave the value of `this` up to chance



