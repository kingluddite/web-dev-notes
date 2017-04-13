# Creating a MongoDB and MiniMongo Collection
Delete `imports/math.js` and `imports/utils.js` as we don't need them

Empty out `server/main.js` as we no longer need that code

## Create `imports/api`
Inside of `import/api` we will create a file for every Collection we create

### Create `players` Collection
`$ touch import/api/players.js`

* We first import the Mongo API
* It comes bundled with Meteor
* We follow the pattern of `meteor/something`
    + So far we used `meteor/meteor`
        We added that in the `client/main.js` so we could access stuff like `Meteor.startup()`
    + Now we import `meteor/mongo`
        * The thing we want to grab from Mongo is a **named export** named `Mongo`

`import { Mongo } from 'meteor/mongo';`

**note** `Mongo.Collection` is a **constructor function** so we need to call it with the `new` keyword

`new Mongo.Collection('players');`

When it comes back from the constructor function it is something we need it is an object that gives us access to a wide variety of methods for **fetching**, **updating** and **deleting** Documents (_so we definitely want to create a variable to store it_)

`imports/api/players.js`

```
import { Mongo } from 'meteor/mongo';

const Players = new Mongo.Collection('players');
```

## Important Naming Convention
We Capitalize the variable and spell the collection in lowercase. This is a Meteor/Mongo naming convention and recommended

## We also want to export Players

```
import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');
```

We export Players so any file that loads in Players can actually do something with the Players Collection (_read all the players, or update an individual player..._)

Since `players.js` resides inside `imports` we know it will not `eager load` and we'll have to manually load it 

We will import this Collection on `server/main.js`

`import { Players } from './../imports/api/players';`

We also need to `import` Meteor so we can use the **startup** so we know Meteor is completely ready before we start working on our Collection

**tip** Most of the Meteor APIs we're going to use are available on both the `client` and the `server`

## Benefit of full stack Javascript

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(function() {
  
});
```

* We are using the same code on the `client` and the `server`
* We don't have to learn different languages for `client` and `server` and so we can write JavaScript everywhere.

**note** Remember `Meteor.startup()` runs when the DOM is ready

## Insert a new player
`server/main.js`

```
import { Meteor } from 'meteor/meteor';
import { Players } from './../imports/api/players';

Meteor.startup(function() {
  Players.insert({
    name: 'King',
    score: 3
  });
  console.log(Players.find().fetch());
});
```

* The program will restart, it will run the above code and a new player will be inserted into our MongoDB Players Collection
* `Players.insert({})` takes a partial Document (_partial because we insert some properties and MongoDB will insert an _id for every Document inserted_)
* We also want to fetch the Players back (_to ensure the player we just inserted was correctly inserted_)
    - `Players.find()` - simply returns everything from the specified Collection
    - `find()` returns a **Cursor**
        + A **Cursor** is a pointer to some Documents in the database
        + To get an array of the Documents we have to call `.fetch()` like this:

`Players.find().fetch()`

## View in terminal and you'll see:
![output of inserted Document](https://i.imgur.com/IxJ1qWf.png)

## Synchronous?
Notice what we just did was **synchronous**

* We were able to fetch the data right after we inserted it without having to add a callback or a Promise chain
* How is this possible? 
  - This is because the Meteor MongoDB API is **synchronous**

## Open Mongo in Terminal
If you use `$ meteor help` you will see a [bunch of built-in commands](https://i.imgur.com/FCNFM1J.png) and that last one shows you how to open up Mongo inside the terminal with:

`$ meteor mongo`

Open a new Terminal tab and type `$ meteor mongo`

We need to check if things were actually inserted into the database

## Run a specific version of Meteor Mongo
If you need to use a specific version like `1.4.2.1` you could use `$ meteor mongo --release 1.4.2.1`

When you run `$ meteor mongo` it will check if a database server is up and if it is, it will connect to it

### Access our Players Collection via MongoDB shell
**note** I use `>` to designate MongoDB Shell and `$` to designate **Terminal**

`> db.players.find()`

* All of our collections are under the `db` object
* We don't use fetch because the `Mongo console` works differently and instead of returned a `Cursor` it simply return an array of all the matching Documents

## Exercise
Change the name and score and see if you can see it in the `Terminal` and then double check that you can see the new record in the `Mongo Shell`




