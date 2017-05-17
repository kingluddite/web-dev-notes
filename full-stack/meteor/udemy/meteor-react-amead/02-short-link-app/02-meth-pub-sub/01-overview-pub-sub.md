# Overview of Publications and Subscriptions

![diagram pub-sub and meth](https://i.imgur.com/fYeOyea.png)

## Publications
Publications enable you to lock down the data that gets sent to the `client`

`MiniMongo` on **Client** syncs up with `MongoDB` on **Server**

* This is fine in principal but once we start creating production level apps we want to ensure we only sync a subset of that data

### Example Scenario
We have two users

* user A has 3 links
* user B has 6 links

All 9 links are available to everyone

With **Publications** and **Subscriptions** we'll be able to know who is asking for the data (_because they'll be logged in_) and we'll be able to just give them the subset of data they are allowed to see (_i.e. - the links they created_)

We may associate a user with a link by adding a property onto the link (_like userId_) and setting it equal to that users `_id`

## What is a Publication?
The process for this is simple

It is just the **name of the Publication** and a **function** and that function returns some data from the `MongoDB` Database (_it is just a Mongo query_)

And when someone **subscribes** to that **Publication** (_by providing the exact same string name_) it will get <u>access to all that data</u>

## General Flow of Publications and Subscriptions

![Publications & Subscriptions - Reading Data](https://i.imgur.com/LenUnUJ.png)

`Client` says "_I'd like to subscribe to some links_" and the `Server` will go ahead and process that request

### Client Not Logged In
Maybe that `Client` isn't logged in and the `Server` could say "_Yo, there are no links_"

### Client Logged In
Or maybe the Client is logged in but they don't have any links and even though other users have links that user won't get access to their links. They are just going to get the stuff they are allowed to see

## Subscriptions
* When you do subscribe you will get updates to that data just like we did before (_when we updated the data in the Mongo console, the `Client` was refreshed - that still will happen_)
* The Subscription will stay intact unless you manually close it

![new data publications](https://i.imgur.com/VoP1UXb.png)

So that is **Publications** and **Subscriptions** which is 1/2 to the overall security puzzle. This is responsible for securely getting data on the Client
