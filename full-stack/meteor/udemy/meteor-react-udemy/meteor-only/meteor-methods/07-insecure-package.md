# Insecure Package
We need to:

* Validate input
* Create token
* Save token to collection

**note** This will be more complex than you think and so we will go into detail with all the moving pieces of what we are about to do

## Topic - How we save data on the client side of a Meteor application
Last project we were generating and saving data on the server side of our application

Now we will save data on the client side of our application

The client wants to save data and see it saved into a collection. This time things are a little different then the way we did it before.

## Traditional Data in a Traditional App
This is how a normal JavaScript (a client-side JavaScript application) app will save data with a server
![normal saving data app diagram](https://i.imgur.com/yqZYS4m.png)

At some point in time a client will want to save data and persist it into the database (Just like we're trying to do now). When this happens the client is going to try and send this data to the server as JSON (data will be piped over via an AJAX request and it will end up over the server side). The server will receive the data. The server will validate the data. It will make sure the user is authorized to save the data (optional but let's assume the server cares about which user is saving which piece of data). The server will save the record to the database and then return a success message back to the client and most likely also return the saved record as well (If we are going to follow RESTful conventions)

**Most important parts** of this flow is `Validate Data`. We must make sure that we never save malicious or corrupt data. If you are saving banking information you would never want to assume that the client is saving valid legitimate data. Assume the worst from the client to protect the integrity of your data

## Now let's look at how Meteor saves data
There are two diagrams here. The first diagram is the default way Meteor saves data and the second diagram is how we will use (and alter) Meteor to save data

### First 'BAD' Diagram - How Meteor saves data by default
When we first generate a Meteor project and add no further configuration

![default meteor saves data diagram](https://i.imgur.com/vBX0i4a.png)

Before we created all of our fake client data on the server and used `Collection.insert()`

This way is insecure. It is not good by default and it is important to know how Meteor does things by default for an application

From the client, when we call `Collection.insert()` with a new record we are kicking off two separate flows in Meteor. This is a huge part of Meteor. On the client side, the `Collection.insert()` is INSTANTLY inserted into the local collection. Any React components that were watching that collection will instantly update with that record. By instant, I mean instant because it happens instantly without communicating with the server at all.

At the same time the client also kicks off a request to the backend (server). The new record gets added to the collection and it gets persisted in our MongoDB database

**important** By default in a Meteor application whenever a client wants to save data it is saved without any validation whatsoever unless we specifically write some validation. Any user can save, update or destroy any record they want to at any time and there is nothing the server can do about it

This is a real nightmare with a production application. For any app we build in the real world all our production apps must have a way to seriously validate all data before it gets saved and we need to make sure that the user who is trying to save data, is authenticated to do so. By default in a meteor app, it does not work that way. All meteor apps will be insecure by default

### Why would Meteor ship like this?
Because it makes it super easy to get started with meteor with this approach. By allowing any user to edit data it is incredibly easy to prototype apps super fast and that is exactly what meteor seeks to do

meteor wants to be the goto application for quick application development

### Second 'GOOD' Diagram - How we want to save data in our application

