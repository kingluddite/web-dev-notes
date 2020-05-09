# Writing to Firebase
`src/firebase/firebase.js`

* We just added an object with `firebase.database().ref().set()`

## Firebase can work with other data types:
* Strings
* Numbers
* Booleans
* Objects
* Arrays
* All of the above can be stored in your Firebase Database

### Let's set up more complex data for our Database
```
// MORE CODE
firebase.initializeApp(firebaseConfig);

firebase
  .database()
  .ref()
  .set({
    name: 'John Doe',
    age: 40,
    isSingle: false,
    location: {
      city: 'LA',
      country: 'US'
    }
  });
```

* Colors in Firebase let you know what changed
  - Orange is update
  - Green is new fresh stuff created
  - White is no change
* Check out fb and you will see the data updates just when you save this file

## fb has other stuff it can do
* We will use `firebase.database()` for database stuff and `firebase.auth()` for authentication stuff (we'll get to that later)

## Making life easier
* We'll store `firebase.database` in a variable for easier usage

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref().set({
  name: 'John Doe',
  age: 40,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'US',
  },
});
```

## What is ref() method and what is it doing?
* `ref()`
  - Is short for **reference**
  - Gives us access to a specific part of our Database

### Relation Database
* Think of MySQL or another type of relational Database
* MySQL has tables and they let us break our Database into individual pieces
  - users table
  - expenses table
  - todos table
  - notes table
      * all for our app and so we can break up our data into little pieces

### NoSQL Database
* Like MongoDB
  - It has `collections`
    + users collection
    + notes collection
    + expenses collection
    + todos collection

### Firebase Database
* We just have the ability to set up various references
  - It gives us the ability to store our information into different "parts" of our Database
    + I can store users `ref('/users')`
    + I can store todos `ref('/todos')`
    + I can store expenses `ref('/expenses)`
    + I can store notes `ref('/notes')`

### What if I don't pass anything in to `ref()`
* Then we are getting a reference to the `root` of our Database
* And that's what we did with our code and that's why all of our data shows up in the root

### set()
* set() can be called on a ref() `ref().set()`
* This will set a value for that `ref()` reference
* set() can take any of the data types we can store inside firebase
* set() will always take what you pass to it and it will **completely wipe** the database.ref()

#### What happens if I set an object and overwrite a property
* For this to work you need to run your app

`$ npm run dev-server`

* The browser window should pop up at `http://localhost:8080`
* Create your object with name, age, isSingle, location first
* See it in the fb database
* Then add the other `database.ref().set({age: 30});`
* You will see that the entire object gets replaced with just `age:30`
  - This is because we just completely overrode the database

## But what if we just wanted to update age?
* How could we accomplish that?
* By passing something to `ref()`
  - If we pass nothing to `ref()` we get a reference to the root of the Database
  - We can provide a location to `ref()` (a child) and that will give us access to a specific property

### So just to update age we would do this
```
// MORE CODE
database.ref().set({
  name: 'John Doe',
  age: 40,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'US',
  },
});

database.ref('age').set({
  age: 30,
});
```

* Now we see this:

![wrong age](https://i.imgur.com/q2ffuKS.png)

* That is not what we want
* We have age and then age inside it with a value of 30

## This is what we really want to do
```
// MORE CODE
database.ref().set({
  name: 'John Doe',
  age: 40,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'US',
  },
});

database.ref('age').set(30);
```

* Now we override age with a value of `30`
* **Lesson Learned** When we want to change a specific property we pass a location to `ref()` and a value to `set()` for that location

## How do we change nested properties
* Like `city` or `country`?

### To do this we need to set up a more complex reference
* Here's how I would update city to `Phila`

```
// MORE CODE
database.ref().set({
  name: 'John Doe',
  age: 40,
  isSingle: false,
  location: {
    city: 'LA',
    country: 'US',
  },
});

database.ref('age').set(30);
database.ref('location/city').set('Phila');
```

* Now we have updated a nested property to `Phila`

## Challenge
* Set up a new child on the root of this Database
* It will be an object with 2 properties of its own
  - Set up an `attributes` property that has an object as it's value with properties of `height` and `weight`
* Do this by adding on new database call after our previous ones
  - We don't want to wipe our existing data
* We will add a structure like this to our existing fb Database

```
attributes: {
  height: 100,
  weight: 220
}
```

* And this is what should your altered Database should look like

![altered db with attributes](https://i.imgur.com/YyZSNHo.png)

## NOTE: All these changes we just made are asynchronous
```
// MORE CODE

database.ref('age').set(30);
database.ref('location/city').set('Phila');
database.ref('attributes/height').set('100');
database.ref('attributes/weight').set('220');

// MORE CODE
```

* The lines above are not guaranteed to run in that order
* Our calls to set need to communicate with the fb servers
  - We have to initialize that request off to the server
  - The servers have to process that request
  - Then the servers have to respond letting us know if things went well or if they failed for some reason
    + like? Maybe there was some sort of permissions error

## It would be inappropriate to do this:
```
// MORE CODE

database.ref('age').set(30);
database.ref('location/city').set('Phila');
database.ref('attributes/height').set('100');
database.ref('attributes/weight').set('220');

console.log('Data changed');

// MORE CODE
```

* This is inappropriate because the data probably hasn't changed by the time the data runs
* This is a problem!

## Solution to problem: We need some way to actually know when the data has changed or failed to change for some reason
* A more appropriate console.log would be:

```
database.ref('age').set(30);
database.ref('location/city').set('Phila');
database.ref('attributes/height').set('100');
database.ref('attributes/weight').set('220');

console.log('I made a request to change the data');
```

## How can we know when the data has officially changed?
### Promises
* To actually know when the data has changed we need to integrate Promises

## Next `The Promises API` - Learning how to integrate Promises
* We'll first learn about the Promises API
* Then we'll see how Promises fit in to the Firebase API
  - This will give us better control over lots of things:
    + Handling success cases
    + Or handling error cases


