# Querying Data on the Client with MiniMongo
* Real time app
* Will update on other tabs
* Meteor is real time by default

![Traditional Diagram](https://i.imgur.com/EA0yRqK.png)

* If we weren't using Meteor we could build it this way
* Note that Node and MongoDB are not synchronous but the API is Asynchronous

![Diagram of steps](https://i.imgur.com/OVRev5L.png)

1. User submits form
2. This sends the data to `Node.js` (_Adds a new player_)
    * Let's say it includes a default score as well as a player name
    * Could happen over `Web Sockets` or `HTTP`
3. `Node.js` will take the data, run some sanitation and validation and once it confirms that the player should get added it will issue a database request to issue a new player to Players Collection
4. `MongoDb` will do it work and insert the record and then it will respond to the `Node.js` request
5. Then `Node.js` can then respond to the `Client-side`
    * Here the `Client-side` JavaScript has the acknowledgment that the Player was successfully added
6. It can rerender the browser

## Houston We Have A Problem!
* The time it takes to do those 2 steps can get out of hand
* Each step can take hundreds of milliseconds which would be noticeable inside of a browser Application (_You click a button and you have to wait a bit to see that new player added - which results in a lame user experience_)
* There are ways to improve this without Meteor but it should be pointed out that the architecture that Meteor uses is awesome

## Here is the Meteor Setup
![The Meteor Way Diagram](https://i.imgur.com/WuIaZd1.png)

### `MiniMongo`
* **Client-side** implementation of MongoDB which is a set of JavaScript functions that manipulate a set of arrays and objects designed to work identically to how MongoDB works
* The difference is that in memory completely written in JavaScript (_which means that instead of having to make calls to a database server (MongoDB) to issue commands_)
* We just use a Synchronous set of functions (_API_) to change the data behind the scenes

### MiniMongo is awesome
This is what takes our last diagram and makes things more simple, efficient and fast which provides a better, cleaner user experience

### Steps
1. Same as above diagram. We submit data from a form
    * Our `Client-side` JavaScript sees we want to add a player
    * Here we don't go off to server and wait for a response (_which takes too long - even with Web Sockets_)
2. Instead we'll make a function call
    * A regular, boring Synchronous function call to a function provided by MiniMongo
    * This will add a new document to the MiniMongo database, the Client-side JavaScript will get that Document and it can do whatever it likes (_let's say we just want to render the new Player to the browser_)
    * **note** Here we are working just on the Client (_which means the total time from the submit of the form to rendering the new player is significantly reduced as to what it would be in a traditional setup_), we don't have to communicate with our server which takes too long, all we need to do is work with the Client
        - This means our data will get rendered instantly (_as opposed to a flicker of data a couple of milliseconds later_)
        - But do we never touch the Server-side? What really happens when we insert something into MiniMongo?

## DDP - Distributed Data Protocol
The Folks at Meteor created this Protocol and it is used to sync up distributed databases (_like the MongoDB on the Server and the MiniMongo database(s) on the Client_) If you have six tabs open and each are visiting the app, we have 7 databases total (_6 browser databases and 1 server database_) DDP will be syncing up all these databases behind the scenes

When I add a new player to MiniMongo DB on the client but I will simultaneously issue a DDP request to sync up the databases (_It will say, "Hey, on the Client I inserted a new Player, why don't you go ahead and do this on the Server so we can sync you up with everyone else"_), the Server will go ahead and insert the document, and if all goes well it will say "_Ok we got that record. Thank you_". It will then respond and nothing will change as far as the user knows (_We already had it rendered to the browser and it will stay there_)

**note** DDP will also handle **security** and **permission errors** Let's say I'm a user who can't add new players. But on the client I can add the new player and it shows up but when it gets to the Server, the call will fail (_It will say, "Hey, user 1? They can't add new players. We can't them update the database like that"_). DDP in turn will respond and say, "_Hey, that call failed_". Then MiniMongo will get updated, removing that player and the browser will have a little flicker (_about a hundred milliseconds later_)

Either way we have a flicker. The difference is that flicker always happens, even with successful requests. Inside Meteor, we'll only get the Meteor flicker only if something malicious happens. So with Meteor there will usually be 1% of the time we get the flicker but that is far better than 100% of the time getting the flicker which would be the case in a traditional web app

That was a high level overview of what is happening. On the `Client` we have a clone of MongoDB which means if we have players on the server, we have players on the `client`, we can query those players using regular Synchronous functions we can also manipulate this data (_insert, update or delete those players_), when we do make those changes we'll be able to sync up with the server but the DOM will be updated before that sync happens

## Time to Render the Players to the browser
How can we tap into the MiniMongo methods (_the Synchronous function calls that allow us to communicate with the MiniMongo database_)

### Add the Collection to `client/main.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players'; // add this line
```

This was the exact same line we used in `server/main.js`

Now we have access to the exact same function calls (_so if we copy `console.log(Players.find().fetch());` from the `server/main.js` to `client/main.js`_) it should show us our entire current Players Collection in the console

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

console.log('Players List', Players.find().fetch());
// more code
```

We get back an empty array in the `console`

![empty array](https://i.imgur.com/ydyci5i.png)

This is to be expected because when our app first starts up, **DDP** has not synced up our two databases, which means the data in MongoDB has yet to make it over to the `Client` MiniMongo. There is a way to fix this but we will use a "hacky" way first by using JavaScript's `setTimeout()` which allows us to run a function on a delay

```
setTimeout(arg1 - function, arg2 - #of milleseconds you want to wait) {}
```

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

setTimeout(function() {
  console.log('Players List', Players.find().fetch());
}, 1000);
```

And now we will see we [have 3 items in our Players List array](https://i.imgur.com/x9x1qBU.png) and that matches what is inside our Server-side MongoDB database players collection

**note** You may see duplicate names and scores (_but with different _id_ values_) because one default gets added each time our app starts

### Client side data
We now have a way to grab the MongoDB data on the `client` using it to re-render the Application

### Our current solutions sucks
We're using `setTimeout`, which will only fire once if the data updates, we're never going to see the updated data

#### Tracker to the rescue
Tracker is a feature built into Meteor

`Tracker` lets us track queries and rerun code when those queries change. When the players collection changes, we want to do something, we want to re-render what's shown to the browser

### Import Tracker
* Tracker is a named export

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';
import { Tracker } from 'meteor/tracker'; // add this line
```

### Use Tracker
`Tracker.autorun(takes a function to run and it will monitor the queries executed inside of this function, when one of those functions changes it rerenders the function)`

This means we can swap out our lame `setTimeout()`

```
setTimeout(function() {
  console.log('Players List', Players.find().fetch());
}, 1000);
```

With this new Tracker code

```
Tracker.autorun(function() {
  console.log('Players List', Players.find().fetch());
});
```

Now we get exactly what we expect. First the empty array because it the MongoDB server and MiniMongo haven't synced and then our next array (_because they are now in sync_) has the Players Collection
