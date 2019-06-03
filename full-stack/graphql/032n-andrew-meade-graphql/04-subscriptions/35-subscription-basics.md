# Subscription Basics
* Set up a basic subscription allowing the client to subscribe to data changes on the server

## Think of subscriptions like this
* Subscription operation is similar to the Query operation because its main concern is allowing your client (whether GraphQL Playground or a web app) to fetch the data that it needs
    - With Query's we can get the data we need
    - With Subscriptions we can get the data we need

## What's the difference between Query's and Subscriptions?
* The difference is in **how the data is fetched**
* When we perform a Query like this:
    - We send Query off to the server
    - The server performs responds a single time with all of the data at that point in time
        + If after that one of the comments was deleted, updated, the client would not be notified of the changes
        + It would be up to the client to make the same request later to check for changes in the data
        + This leads to "server polling" where we run this operation from our client every minute in an attempt to keep our client updated (this is an attempt to show "real time data" to the user)
        + **This is not idea** because it is `expensive` and it requires us to perform operations every minute or sow and many times the data hasn't changed so we are effectively **wasting resources**

```
query {
  comments {
    id
    author {
      id
    }
    text
  }
}
```

## This is where Subscriptions can save the day!
* With the Subscription we use **web sockets** (an open connection between the client and the server), that allows the server to transmit data directly to the client
* Example: so when someone adds a new comment the server using Subscriptions can push that new comment down to all the `subscribed` **clients** in real time so that they can get the new comment data and they can render it to the UI keeping their app up to date
    - This effectively creates a real time application where you are seeing the latest data as it changes

## How do we set up a Subscription?
* It is more complex than setting up a Query or Mutation
* Because of this we won't create a practical Subscription that makes sense with our blogging app
* We will create a simple dummy Subscription just to see how it works then we will delete it

### Create a "dummy" Subscription
* We have to define all our Subscriptions inside our type definitions (typeDefs)

#### What will our subscription do?
* Just could up from 0 (zero)
* 0... 1.... 2... 3... etc
* We will perform one operation to subscribe every single time and in our response we will get a "stream of data" back (a new number every second)

`schema.graphql`

```
// MORE CODE

type Subscription {
  count: Int!
}

// MORE CODE
```

* Now we need to set up a root property on our resolver
* Create new file

`src/resolvers/Subscriptions.js`

```

```

* Import your resolver into our bootstrap `index.js`

`index.js`

```
// MORE CODE

import Subscription from './resolvers/Subscription';
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";


const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

// MORE CODE
```

### graphql-yoga
* [graphql-yogo github page](https://github.com/prisma/graphql-yoga)
* One of the reasons we used this library for Node is it comes baked in with all the stuff we need
* One thing we need is this library that is baked in to graphql-yoga
    - `graphql-subscriptions/subscriptions-transport-ws: GraphQL subscriptions server`
        + This will provide us a `pub/sub` utility
            * So we can pub (publish) and sub (subscribe) features to allow us to communicate around our application
            * [graphql-subscriptions docs](https://github.com/apollographql/graphql-subscriptions)

## How to use graphql-subscriptions
```
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
```

* Import PubSub
* Create a new `PubSub()` instance and we'll use 2 methods on that to wire everything up

## Setting up PubSub
* We import it from `graphql-yoga`

`index.js`

```
import { GraphQLServer, PubSub } from "graphql-yoga";

// MORE CODE
```

* PubSub is the constructor function allowing us to create a new PubSub utility

### Steps for setting up PubSub
1. Import it from `graphql-yogo`
2. Create a new instance of it
3. Add it to the `context` object

`index.js`

```
import { GraphQLServer, PubSub } from "graphql-yoga";

// MORE CODE

const pubsub = new PubSub();

const server = new GraphQLServer({
  // MORE CODE

  context: {
    db,
    pubsub
  }
});

// MORE CODE
```

* Now `pubsub` is accessible from all of our resolver methods

## Now let's see how `pubsub` helps us create real time subscriptions
* Unlike Query's and Mutation's Subscriptions are not methods but objects
* And on that object we set up a single method `subscribe()` that will run every single time someone tries to subscribe to count
* subscribe also has access to same arguments as Query and Mutation
    - parent, args, ctx, info
* We'll destructure `pubsub`

### Two necessary steps to set up a Subscription
1. Set up Subscription
2. Publish data to that Subscription

`Subscription.js`

```
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
    }
  }
}

export { Subscription as default };
```

#### The return value
* We Subscriptions working with the `return` value is different than with Queries or Mutations
    - With a Mutation the return value just matches up with whatever is defined over in the Schema
        + for createUser I return a User
    - The same is true for Queries
        + for posts query I return an array of posts
* Subscriptions DO NOT return an integer
    - Instead they return something that comes from the `pubsub` utility
        + asyncIterator()
        + asyncIterator is a function and it takes a single argument that is a string and the value here is referred to as a "channel name"
        + Think of a `channel name` like a slack chat application or a, think of a channel name like a chat room name

`Subscription.js`

```
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      return pubsub.asyncIterator('count');
    },
  },
};

export { Subscription as default };
```

## Test it out
* Open GraphQL Playground
* New tab

```
subscription {
  count
}
```

* Execute the Subscription and it will just keep spinning
* GraphQL Playground is not getting any data back, it's not resolving, it's still pending, it is actually listening for changes
    - It is waiting for the server to push data down to the client and when it does that new data will show up here

## We'll need to use `setInterval()`
* It will allow us to run some code after a set amount of time
* `setInterval(CODE_TO_RUN, TIME_TO_WAIT(ms))`
* We add the code we want to run in the callback and we make sure to publish our data with `pubsub.publish`
* Make sure to add the last argument of ms time before the code runs again

`Subscription.js`

```
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count
        });
      }, 1000);

      return pubsub.asyncIterator('count');
    },
  },
};

export { Subscription as default };
```

* asyncIterator is what sets up our channel
* `pubsub.publish()` allows us to publish new data to all of our subscribers
    - We pass in 2 arguments to `publish`
        + pubsub.publish('CHANNEL_NAME', {SUPPLY DATA THAT IS SENT TO CLIENT})
            * This should match up to our subscription type
        + We have to match it up exactly with the channel we created

## We are done - Ready to Test
```
subscription {
  count
}
```

* You will see an "could not connect" error but just refresh as we just temporarily lost our connection
* Star the subscription up again and now you see the data returns every second and the number increases by 1 each second

## Next
* Making our Subscription more practical
* We will be publishing inside our Mutations not inside Subscriptions
