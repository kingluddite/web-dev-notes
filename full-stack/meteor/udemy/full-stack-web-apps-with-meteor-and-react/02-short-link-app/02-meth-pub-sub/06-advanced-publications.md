# Advanced Publications
We will create a **Publications** that only returns **links** that the `currently logged in user` created

* If the user **is not logged in** they will get no links synced up to their `MiniMongo` Database
* If the user **is logged in** and has no links, they will see no links as they won't have access to **links** they didn't created

## Add userId to `links` Collection
For now we will associate links with the user that created them so in the links Collection we will have a field that has the userId on it but later we will improve on this technique by accomplishing the same end result but it will be done securely using Meteor Methods

`Link`

```
// more code
if (url) {
  Links.insert({ url, userId: Meteor.userId() });
  this.refs.url.value = '';
}
// more code
```

* This is not secure
    - Anyone could fake a `userId()`
    - We will improve this later using Meteor Methods
    - Our `links` Collection currently just has `_id` and `url` as its fields and we are adding one more field, `userId` which will store the currently logged in user
    - Since we are using `Meteor` we need to import it at the top of `Link` with

`Link`

```
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'; // add this line
import { Accounts } from 'meteor/accounts-base';
import { Links } from './../../api/links';
import LinksList from './LinksList';
//more code
```

### Test
Using **Meteor dev tools** `MiniMongo` tab

Add a link and see if the new field exists in that link (_the other links will not have the new `userId` field_)

![userId field added](https://i.imgur.com/zkfcFL1.png)

* Now we can query to include only links that have this `userId`

## Alter our publication
* Currently our **Publication** shows all links where `url` equals `oh-yeah`
* This is obviously a useless **Publication**

### ES6 arrow function issue
* The ES6 arrow function does not bind this to the function
* This will be an issue for us because we currently have this setup:

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', () => {
      return Links.find({userId: 'oh-yeah'});
  });
}
```

We need to get the `currently logged in user` and we should be able to do that with `this.userId`

[Documenation Link pubsub](http://docs.meteor.com/api/pubsub.html)

![this.userId](https://i.imgur.com/yKK9Fiu.png)

### undefined this.userid?
When we modify the following code we see that we get all links. What gives?

```
if (Meteor.isServer) {
  Meteor.publish('linksPub', () => {
    console.log(this.userId);
    return Links.find({userId: this.userId});
  });
}
```

* If we check the server Terminal we will see `undefined` is returned
* This means the query is ignored and we return all links

### Good ole regular functions
Here is a time where we need to bind `this` to the function and that is exactly what `function someName() {}` will do

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function() {
      return Links.find({userId: this.userId });
  });
}
```

* You will see the Terminal shows all the `userIds` but our query now is Publishing only links with the currently logged in user's `_id`
* `this.userId` is a **special Meteor property** that **Meteor** gives us for free so that inside **Publications** we can always know what the `id` is of the currently logged in user
* Why doesn't `Meteor.userId()` work on the server?
    - If you try to use it, you will get this error in the Terminal `Error: Meteor.userId can only be invoked in method calls. Use this.userId in publish functions.`
    - If you read [Meteor Docs](http://docs.meteor.com/api/accounts.html#Meteor-userId) you will see that `Meteor.userId()` can be used anywhere except **publish functions**

## Exercise
* Remove all links for the `links` Collection
* You have two users so log in as each and create three links
* Make sure you only see the currently logged in user's links

![showing only logged in users links](https://i.imgur.com/LbVVDZq.png)

* If you log out and look at Your Meteor dev tools `MiniMongo` tab you'll see once you log out your `links` go [from having Documents](https://i.imgur.com/QovaNvP.png) to [having zero Documents](https://i.imgur.com/PHaXvKL.png)

## Check out DDP
1. Log out and log in
2. Switch to DDP tab
3. Do a page refresh and we see a bunch of stuff

* We are interested in the pub sub stuff
* [We see info](https://i.imgur.com/QCz0qMR.png) that from subscribing to 'linksPub'
* [Then we see three](https://i.imgur.com/ilkUVlL.png) items added to Collection
* And if we expand them we'll see the [three links that the logged in user can see](https://i.imgur.com/E2TfaO3.png)
* We see our [subscription is ready](https://i.imgur.com/VNCBtmr.png)

* We can always use the DDP tab to see what is exactly happening with our **pub/subs**
* We don't have to worry about any of that as it is all part of Meteor's internal communication protocol
* All we really care about is what is happening in the Client in the `MiniMongo` and we are just concerned about locking down that data

## Next
Securely create, update and delete documents in our Meteor Application using Meteor Methods

