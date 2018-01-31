# More with Arrays
* Redux will expect an array

## Fetch all expenses that already exist
* Delete 2 of 3 push calls for expenses
* Comment out first one

## Read data off of expense ref
* We view console in chrome
* We have an object
    - Inside that object we don't have an array
    - We have objects
    - This is a weird object struture
    - We need to manipulate this data so we can work with it
    - `snapshot` has other methods that make this a lot easier

## Docs for [DataSnapshot](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot?authuser=0)

* the following will help us create a new array
* forEach
    - key lets me access the id on the snapshot
        + childSnapshot.key
        + And add all other props using spread operator
            * ...childSnapshot.val()

```js
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
  });
```

* View the console and we will have an array of our expenses
* Now we have the exact structure we need to make firebase work with our structure

## Challenge
* Add a subscription

```js
database.ref('expenses').on('value', snapshot => {
  const expenses = [];
  snapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });

  console.log(expenses);
});
```

* Change the data in firebase and it will update in chrome console
* We'll comment out our code

## Add on a few subscribers
```js
database.ref('expenses').on('child_removed', snapshot => {
  console.log(snapshot.key, snapshot.val());
});
```

* child_removed is an event
* snapshot.key (grabs the firebase object id)
* snapshot.val()
    - we now have a subscriber
    - listening on expenses for every single time a child is removed
    - if we view the app we won't see a change until the app changes
    - Delete an expense
        + we see the deleted expense in the console
            * id and data

## Challenge
* child_changed
    - any changes to data and callback will be triggered

```js
database.ref('expenses').on('child_changed', snapshot => {
  console.log(snapshot.key, snapshot.val());
});
```

* child_added
    - fires every single time a child is added
    - gets called for both existing items and new items 
