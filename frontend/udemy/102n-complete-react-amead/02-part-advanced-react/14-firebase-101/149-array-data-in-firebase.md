# Array data in firebase
* CRUD
* Storing list based data is important
    - list of files
    - list of games
    - list of emails
    - list of unread emails
* How do we do that in firebase?
* Mongo has collections with documents
* MySQL has tables with rows

## Important
* Firebase does not support arrays

## Delete the entire database

## Let's show how firebase doens't support arrays

```js
firebase.initializeApp(config);

// change for refresh
const database = firebase.database();

firebase.initializeApp(config);

// change for refresh
const database = firebase.database();

const notes = [
  {
    id: '12',
    title: 'first note',
    body: 'This is my note',
  },
  {
    id: '3456',
    title: 'another note',
    body: 'this is my note',
  },
];

database.ref('notes').set(notes);
```

* After deleting the database
* We now see no error from firebase
* It stores our notes not inside an array but inside an object

## If you want to use arrays in firebase you need to create object like this:

```
const firebaseNotes = {
  notes: {
    asfddsf: {
      title: 'First note',
      body: 'my note'
    },
    alldiek: {
      title: 'One more note',
      body: 'cool stuff here'
    }
}
```

* Than access them with:

`database.ref('notes/asfddsf')`

* Comment out all stuff in firebase.js

## .push()
* When we use `.push()` firebase will create a new property on our reference
* It will give it a random value
* It will take what we pass into push and it will set it just like we did above

### Let's try this out
* Delete our DB
* Save our app
* Data will refresh on site
* Look at Firebase console

```
notes
    somerandomdomid
        body: 'go for a run'
        title: 'to do'
```

* This is how we work with list based data inside firebase
* What happens if we add a note?

```js
database.ref('notes').push({
  title: 'so cool!',
  body: 'yes it is neat',
});
```

## How do we access our firebase notes?
* copy an id of our firebase notes
* -L4D5hSwnWgv7u6HpHxW

### This will just update body in a specific note
```js
database.ref('notes/-L4D5hSwnWgv7u6HpHxW').update({
  body: 'Buy food',
});
```

### Remove a note
```
database.ref('notes/-L4D5hSwnWgv7u6HpHxW').remove();
```

## Add 3 expenses to firebase db
* Wipe db first
* should have
    - description
    - note
    - amount
    - createdAt

## How do we work with this data? 
