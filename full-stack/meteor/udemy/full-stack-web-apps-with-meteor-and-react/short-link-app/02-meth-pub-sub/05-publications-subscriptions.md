# Creating Publications and Subscriptions
Time to start locking data our app's data with **Publications** and **Subscriptions**

This will enable us to sync a subset of our `Server-side` database to a **Client**

* We can use information specific about that **Client**
    - We can limit the `links` visible to just the links created by this logged in user
    - Maybe we have a notes app and we only want to show notes this user can edit
    - Maybe we are creating an email client and we only want to show emails sent to a specific email address

**note** Any of those scenarios can be accomplished by:

1.  Created a Publication
2.  And Subscribing to it

## Time for another user
To test that our data is logged down we need to create a second user

## We need to use another Browser
Let's use `Safari` as our other browser and create a user with a new email and password

Currently all links are visible to everyone

## What meteor packages are we running?
`$ meteor list`

### [autopublish](https://atmospherejs.com/meteor/autopublish)
"_Publish all server collections to the client. This package is useful for prototyping an app without worrying about which clients have access to certain data, but should be removed as soon as the app needs to restrict which data is seen by the client._"

* You will see that we have **autopublish** installed
* This package will publish the entire database to all clients (_only use this for prototyping not for production_)

## Remove `autopublish`
`$ meteor remove autopublish`

## Out site will break
Just a temporary inconvenience until we fix things. No links are showing up even though they exist in our database

By removing that package `MiniMongo` gets no information

## Publish
`Meteor.publish()` - This method is only available on the `Server`

`imports/api/links.js` (_This is where our Collection resides_)

### How can we run code only on the server
Our code will run on both client and server (_inside `imports/api/links.js`_)

* `Meteor.isServer()`
* `Meteor.isClient()`

Let's look at all the methods we have available to us and in console type:

`> require('meteor/meteor).Meteor`

You will see a ton of stuff but we want all the `is...` Booleans

![all is Meteor Booleans](https://i.imgur.com/u15ieTI.png)

Check out the object:

* You'll see:
  - `isServer` is **false** (_we are running it inside the Client_)
  - and `isClient` is **true**

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', () => {
      return Links.find();
  });
}
```

### How can we subscribe to that Publication?
We will jump to where the `links` are used so we open `LinksList` Component

We need to use `Meteor.subscribe()` so we need to import:

`import { Meteor } from 'meteor/meteor';`

```
// more code
componentDidMount() {
    console.log('componentsDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub'); // add this line
      const links = Links.find().fetch();

      this.setState({
        links
      });
    });
  }
// more code
```

* `Meteor.subscribe()` - only takes one argument (_the name of the Publication_)
* Now we can see our list of `links` again. 
  - But both users can see all links so we are right back where we started before we removed the `autopublish` package

## Exercise
1. Alter the **Publication** by tweaking the `Mongo Collection` query to only show a URL with `oh-yeah`
2. Add two **urls** with `oh-yeah` as their value
3. After you make the change, you should only see two links with `oh-yeah`, all the others will not be visible in your `Publication/Subscription`

<details>
  <summary>Solution</summary>
`imports/api/links.js`

```
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', () => {
      return Links.find({url: 'oh-yeah'});
  });
}
```
</details>

By querying for a subset of a Collection we can limit the data in the **Publication**

**note**

* If you try to call `Meteor.publish()` on the **Client** it will be `undefined`
* If you try to call `Meteor.subscribe()` on the **Server** it will be `undefined`

* `Meteor.publish()` is a subset of our data and what we put in the object of `.find({})` will be what data we can see in that **Publication** and we are telling anyone who subscribes to this **Publication** what they can see
    - That means that specific `Client's` **MiniMongo** database is only going to contain the results from this query
* When we subscribed we did that inside our `Tracker.autorun()` call and that was easy because we just used `Meteor.subscribe(name of publication)` and we just passed it the name of our **Publication** which was `linksPub`

## Next
We will alter our `Publication/Subscription` to only show links that our logged in user created
