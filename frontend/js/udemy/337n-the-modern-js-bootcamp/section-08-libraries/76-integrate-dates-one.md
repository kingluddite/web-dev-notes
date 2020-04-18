# Integrating Dates (part 1)
## Delete moment code we were experimenting with
`notes-app.js`

```
// MORE CODE
// get representation of current point in time with moment js
// const now = moment();
// now
//   .year(2020)
//   .month(10)
//   .date(13);
// console.log(now.format('MMMM Do, YYYY')); // Tue Jan 26 2021 17:25:38 GMT-0800
// console.log(now.fromNow());
// console.log(now.valueOf());

// get representation of current point in time with moment js
// const then = moment();
// then
//   .year(1999)
//   .month(11)
//   .date(31);
// console.log(then.format('MMMM Do, YYYY')); // Tue Jan 26 2021 17:25:38 GMT-0800
// console.log(then.fromNow());
// const princeAndTheRevolutionTimestamp = then.valueOf();
// console.log(moment(princeAndTheRevolutionTimestamp).toString());

const coolGuyBirthday = moment()
  .month(6)
  .date(1)
  .year(1980);
// console.log(coolGuyBirthday.toString());
console.log(coolGuyBirthday.format('MMMM Do, YYYY'));
```

## Challenge
* In notes app
    - Add `createdAt` and `updatedAt` to the new notes (store timestamp)
    - Update `updatedAt` when someone edits a `title` or `body`
    - Delete all old notes before testing

### My Solution to Challenge
`notes-app.js`

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  const id = uuidv4();
  const now = new Date(); // add

  notes.push({
    id,
    title: '',
    body: '',
    createdAt: now.valueOf(), // add
    updatedAt: now.valueOf(), // add
  });

  saveNotes(notes);
  location.assign(`/edit-note.html#${id}`);
});

// MORE CODE
```

`notes-edit.js`

```
// MORE CODE

titleElement.addEventListener('change', function(e) {
  const now = new Date();
  note.title = e.target.value;
  note.updatedAt = now.valueOf();
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  const now = new Date();
  note.body = e.target.value;
  note.updatedAt = now.valueOf();
  saveNotes(notes);
});

// MORE CODE
```

## Cleaner solution using moment
`notes-app.js`

```
// MORE CODE

// change create note button text
document.querySelector('#create-note').addEventListener('click', function(e) {
  // e.target.textContent = 'first button text changed';
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  saveNotes(notes);
  location.assign(`/edit-note.html#${id}`);
});

// MORE CODE
```

`notes-edit.js`

* Now we update the updatedAt timestamp on any changes to note title or body

```
// MORE CODE

titleElement.addEventListener('change', function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  saveNotes(notes);
});

// MORE CODE
```

## Woops
* Don't forget to add moment to edit-note.html!

`edit-note.html`

* If you see `moment` is not define (this is your problem)

```
// MORE CODE
  <button id="remove-note-button">Remove Note</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
 <script src="/assets/js/notes-functions.js"></script>
 <script src="/assets/js/notes-edit.js"></script>
</body>
</html>
```

## Deleting old date from localStorage
* **note** To delete old data just venture into client console (Chrome) Application > Storage > Local Storage > http://127.0.0.1:8080 and click `X` to delete all localStorage data

### View timestamps

![view timestamps](https://i.imgur.com/LXoUrEi.png)

## Challenge #2
* Add info when note was last update

1. Add a DOM element between the title and body inputs (empty span)
2. Set text value: "Last edited 4 hours ago"
3. Update value on title/body/storage change

### Place span before textarea

```
// create the span
const lastUpdatedSpan = document.createElement('span');
// add an attribute so we can grab onto it later
lastUpdatedSpan.setAttribute('id', 'last-updated-span');
// Grab the textarea
const noteTextarea = document.querySelector('#note-body');
// place the span before the textarea
document
  .querySelector('#edit-note-form')
  .insertBefore(lastUpdatedSpan, noteTextarea);
// put in moment relative text representing the updatedAt timestamp
lastUpdatedSpan.textContent = moment(note.updatedAt).fromNow();
```

### Create a function
* To update the updatedAt moment friendly message in the span

`notes-functions.js`

```
// MORE CODE

const lastUpdated = function(note) {
  // grab the span
  const lastUpdatedSpan = document.querySelector('#last-updated-span');
  // update the updatedAt timestamp with moment friend relative time
  lastUpdatedSpan.textContent = moment(note.updatedAt).fromNow();
};
```

## Call the new function to update the time when editing a note
`notes-edit.js`

```
// MORE CODE

titleElement.addEventListener('change', function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastUpdated(note); // add 
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastUpdated(note); // add
  saveNotes(notes);
});

// MORE CODE
window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);

    let note = notes.find(function(note) {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign('/index.html');
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    lastUpdated(note); // add
  }
});

// MORE CODE
```

## Test
* You should now see the `3 minutes ago` or whatever moment friendly time update with every change to title and body of your note

## A better way
* We don't need to make life hard and generate a `span` when we can just add it to our HTML and give it an `id` of `last-edited`

`edit-note.html`

```
// MORE CODE

<body>
  <a href="/index.html">Home</a>
  <form id="edit-note-form">
   <input id="note-title" type="text" placeholder="Note Title" />
   <span id="last-edited"></span>
   <textarea id="note-body" name="noteBody" cols="30" rows="10" placeholder="Body of Note"></textarea>

// MORE CODE
```

* We can add that at a variable at the top of our `note-edit.js`
* We can customize our method

`notes-edit.js`

```
// MORE CODE

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;

// MORE CODE
```

## Create a function
`notes-function.js`

```
// MORE CODE

// Generate the last edited message
const generateLastEdited = function(timestamp) {
  return `Last edited ${moment(note.updatedAt).fromNow()}`;
};

// MORE CODE
```

## Final notes-edit.js
```
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note-button');
const dateElement = document.querySelector('#last-edited');
let notes = getSavedNotes();
const hash = location.hash;
const noteId = hash.substring(1);
let note = notes.find(function(note) {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('change', function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener('change', function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

// remove note button
removeElement.addEventListener('click', function() {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);

    let note = notes.find(function(note) {
      return note.id === noteId;
    });

    if (note === undefined) {
      location.assign('/index.html');
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited(note.updatedAt);
  }
});
```

