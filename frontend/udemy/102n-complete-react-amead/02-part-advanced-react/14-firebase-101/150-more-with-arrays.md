# More with Arrays
* How we can fetch our array like data (our object structure that firebase stores) and do something meaningful with it
* **note** At the end of the day, Redux does expect an array

## Let's fetch all the expenses that already exist
* Comment out all query and CRUD fb code

### Let's try to read the data off of the expense ref()
* We point to the `expenses` ref()
* We use `once()` because we are not subscribing and we only want it to run once
* In our then() call we put our success case callback function and we know that we have access to snapshot as our first and only argument of this callback function
* We'll use the `val()` on snapshot
* We'll log out that value to the screen

```
// MORE CODE
database
  .ref('expenses')
  .once('value')
  .then(snapshot => {
    console.log(snapshot.val());
  })
  .catch(error => {
    console.log('error', error);
  });
```

* We open the console in Chrome and we see we get back an object
  - On that object we have various properties, each one being one of our unique id's
    + Those are objects themselves with properties and values inside
* But we don't have an array where all of the items have an id property on it and instead we have the STRANGE object structure

## To make this work we will have to do a little bit of conversion
* We will take this data and manipulate it slightly
* **GOOD TO KNOW** There are other methods on `snapshot` that make this a little easier

### Open the documentation for firebase.database.DataSnapshot
* [docs DataSnapshot](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot)
* This describes in detail everything about `snapshot` that we've been using and the only method on it we've used is `val()`
  - Alternatively you can traverse into the snapshot by calling `child()` to return child snapshots (which you then could use `val()` on)
  - `snapshot` is an immutable copy of the database
  - If you want to alter the data you call set() method directly

#### How can we iterate over a snapshot?
##### forEach()
* It guarantees the children of a DataSnapshot will be iterated in their query order
* The sample code shows you add `snapshot.forEach((childSnapshot) => {})`

```
// MORE CODE
database
  .ref('expenses')
  .once('value')
  .then(snapshot => {
    // console.log(snapshot.val());
    snapshot.forEach(childSnapshot => {
      console.log(childSnapshot.val());
    });
  })
  .catch(e => {
    console.log('error', e);
  });
```

* But we need to store our expenses in an array so we create an empty array for expenses
* We'll push in each of our expenses into our expenses array
* We'll push in an object

```
// MORE CODE
database
  .ref('expenses')
  .once('value')
  .then(snapshot => {
    const expenses = [];

    snapshot.forEach(childSnapshot => {
      expenses.push({

      })
    });
  })
  .catch(e => {
    console.log('error', e);
  });
```

* Each object needs all the information we currently expect in things like Redux and React
* We need an `id` so let's start there
  - **notes**
    + Every single reference in Firebase is to a specific location (we can get a reference to anything inside fb)
    + We actually get access to the text `createdAt`, our `random id` or `expenses` via another property on DataSnapshot called `key` (which is the last part of the path)
    + to grab the id of my expenses I can use `childSnapshot.key`
* What about all the other properties of our childSnapshot (we don't know what order their in so we'll use the JavaScript spread operator)

```
// MORE CODE
database
  .ref('expenses')
  .once('value')
  .then(snapshot => {
    const expenses = [];

    snapshot.forEach(childSnapshot => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });

    console.log(expenses);
  })
  .catch(e => {
    console.log('error', e);
  });
```

* And that will output an array of our expenses
* We have successfully converted the list of objects in Firebase into the array we need for Redux and React

## Challenge
* Set up a subscription to expenses
* You will use one with `value` and pass in a callback
* Every time the data changes you will go through process of converting it into an array and showing it to the screen

### Challenge Solution
```
// MORE CODE
database.ref('expenses').on(
  'value',
  snapshot => {
    const expenses = [];

    snapshot.forEach(childSnapshot => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });

    console.log(expenses);
  },
  error => {
    console.log('error', error);
  }
);
```

* Change the data directly in Firebase console and you will see the expenses array in the Chrome console update in real time

## We can use other events
* With our list of objects in Firebase

### child_removed event
* This will fire when one of our expenses gets deleted
* We will add a subscriber listening every single time a child is removed

```
// MORE CODE

// child_removed
database.ref('expenses').on('child_removed', snapshot => {
  console.log(snapshot.key, snapshot.val());
});

// MORE CODE
```

* Now directly delete an expense in Firebase console
* Then look in chrome console and you will see all the info about the expense you deleted
* **note** Using these other events we can get more specific info with regards to what has changed rather than one big "things changed" notification
  - If we did not have this granularity we may have to recalculate all our expenses to figure out what exactly changed

## child_changed event
* Fires when one of your data's children changes

## Challenge
* Set up child_changed

```
// MORE CODE

database.ref('expenses').on('child_changed', snapshot => {
  console.log(snapshot.key, snapshot.val());
});

// MORE CODE
```

* Now make a change in Firebase console
* You will see the expense we changed in the console with the new updated info

## child_added
* This will fire every time we add a new expense

```
// MORE CODE

database.ref('expenses').on('child_added', snapshot => {
  console.log(snapshot.key, snapshot.val());
});

// MORE CODE
```

* When you run it you will see this:
  - You will see 2 console logs printing and they aren't coming from the child_changed or child_removed, they are both coming from child_added
  - child_added will fire 1 time for all of the data already at that location
  - It will also re-run for all new expenses

## Let's add another expense with push()
```
// MORE CODE

database.ref('expenses').push({
  description: 'neat',
  notes: '',
  amount: 12345,
  createdAt: 132343423,
});

// MORE CODE
```

* And you will see the new expense has been logged to the Chrome console you will also see the logs from the existing data and one for the new data we just added - just remember that child_added works a little different, it doesn't just get called for new data but also for existing data

## Read the docs!
* You can pop open the `on()` docs and you'll see all the child events we just discuss
* Dig deeper to find out all these events can do

## We now have the fundamentals down for a Firebase Database

## Next - Integrate Firebase into Expensify
* Wireup the entire UI
* We'll make sure that it is reading data from Firebase
* And make sure that every time it saves data it saves data to Firebase
