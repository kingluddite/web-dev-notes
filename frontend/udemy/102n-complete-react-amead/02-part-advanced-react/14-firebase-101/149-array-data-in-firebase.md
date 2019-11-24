# Array data in Firebase
* We know how to use Firebase to manage the Database for our app
* We know how to perform all the CRUD operations

## But we are missing out on very important information
* Apps store list based data
  - list of files
  - list of emails
  - list of unread emails
* How do we store list based data in Firebase?
  - MongoDB we store items in a collection of Documents
  - With SQL database we have a table with rows
  - With Firebase we need to store our list based data

## IMPORTANT - Firebase DOES NOT SUPPORT ARRAYS!
* We will need to switch up how we think about storing our data
* We want to eventually have a list of expenses for each user of the app

## Delete the entire Database
* Just click the main 'X' in the FB Database console
* Comment out all Firebase queries or CRUD operations

## Let me prove to you that Firebase doesn't support arrays
* Let's try to save an array

### Fake notes app
* Want to create a list of notes
* We will have an array of objects
  - This is what we currently have in the Expensify app

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const notes = [
  {
    id: '12',
    title: 'my first note',
    body: 'The content of my first note',
  },
  {
    id: '12abe2',
    title: 'my second note',
    body: 'The content of my second note',
  },
];
```

* The above array of objects is the data we want to work with at the end of the day
* We want to use this data to save it in the Redux store, to render the React components to the screen and we really can't work around that
  - WE NEED ARRAY DATA
  - Since Firebase doesn't support arrays let's see what happens if we try to save our above array to our Firebase Database

```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const notes = [
  {
    id: '12',
    title: 'my first note',
    body: 'The content of my first note',
  },
  {
    id: '12abe2',
    title: 'my second note',
    body: 'The content of my second note',
  },
];

database.ref('notes').set(notes);
```

* Run it and we see that we did not get an error
* But the data we have in fb is not what we expected

![array saved in Firebase](https://i.imgur.com/kwrEDXi.png)

* We are not getting an array
* Instead we are just getting child locations
* Instead of working with an array or data has been converted to an object like structure
  - Where the property on `notes` is just the index on the item in the array
  - Our first object shows up on the property of `0`
  - Our second object showsup on the property of `1`

## What does this mean?
* It is proof that fb doesn't support arrays
* We could work with this but...
  - Think about what we need to do with this data
  - We might want to update a note, remove a note, fetch a note and we'll need a unique key to do this like the `id`
  - Currently how would we find a note by `id`
  - `database.ref('notes/12`) would be a great way to grab a note but grabbing a note by a meaningless number from the array index won't do much good

## Let's now thing about our data a little differently
* We will be storing our data like this in firebase

```
// MORE CODE

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const firebaseNotes = {
  notes: {
    aasdfkljas: {
      title: 'note 1',
      body: 'note 1 content'
    },
    adkdsf83: {
      title: 'note 2',
      body: 'note 2 content'
    }
  }
}

// MORE CODE
```

* So then how do we go about creating and setting the unique random values for our objects in fb?

## push()
* Comment out all queries and crud in fb
* When we use push() fb will automatically create a new property on our notes
  - It will give it a random value
  - It will take what we pass into push() and set it inside the random value
  - If I want a list of objects I just pass that object into push()

### Let's try out push()
```
// MORE CODE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref('notes').push({
  title: 'notes title 1',
  body: 'notes body 1 content',
});
```

* And this is what it will look like

![our first list of objects using push](https://i.imgur.com/ZRy2pPx.png)

* This is how we will work with list based data inside of fb

## Another note
```
// MORE CODE

database.ref('notes').push({
  title: 'notes title 2',
  body: 'notes body 2 content',
});

// MORE CODE
```

* And we have another note

![2 notes in fb](https://i.imgur.com/q2UNC3d.png)

* Now we have a way to store list based data inside fb
* We can now easily access an individual item to manipulate it via CRUD

## Update a note
* How can we access our first note to manipulate it?
* Like this (copy id from fb to clipboard and pasted into your code like so):

```
// MORE CODE
const firebaseNotes = {
  notes: {
    aasdfkljas: {
      title: 'note 1',
      body: 'note 1 content',
    },
    adkdsf83: {
      title: 'note 2',
      body: 'note 2 content',
    },
  },
};

database.ref('notes/-LuRN8OjbkC6YcOeyd5w').update({
  title: 'A new title for my note',
});
```

* That will target the specific note (note 1) with that unique id and it will just update that title

## I want to completely remove that note
* Just use `remove()` on the ref()

```
// MORE CODE

database.ref('notes/-LuRNeG5WivZDvm2t33W').remove();

// MORE CODE
```

* That will completely remove one note

## Challenge
* Wipe the Database using fb console to start from scratch
* Focus on creating some expenses
* Setup 3 expense items with 3 push() calls
  - description
  - notes
  - amount (number)
  - createdAt (number)

### Challenge Solution
```
// MORE CODE
database.ref('expenses').push({
  description: 'monthly utility bill',
  notes: '',
  amount: 1000,
  createdAt: 15000,
});
database.ref('expenses').push({
  description: 'Weekly groceries',
  notes: '',
  amount: 5000,
  createdAt: 5000,
});
database.ref('expenses').push({
  description: 'car wash',
  notes: 'make car look cool',
  amount: 101000,
  createdAt: -15000,
});
```

## Recap
* We now know how to get data into Firebase that Firebase likes to work with
* We now know how to access individual items to manipulate them (update, set new values or deleting them)

## Next - Arrays Part 2
* How can we actually work with this data
* How do we fetch data out
* How do we get the data in a format that actually makes sense to us
* How do we use other event listeners to listen for when expenses updated removed or added
