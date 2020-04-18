# Converting Notes (part 2)
* Converting this project will be slightly more complicated than hangman

## notes-app.js
* First thing `notes-app.js` does is it creates the `notes` array
* We get this value by calling `getSavedNotes()`

```
'use strict'

let notes = getSavedNotes()

// MORE CODE
```

`notes-functions.js`

* `getSavedNotes()` just reads data out of localStorage
* If there is no data inside localStorage then we just start off with an empty array

```
// MORE CODE

// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes')

  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// MORE CODE
```

## Render notes
`notes-app.js`

```
// MORE CODE

const filters = {
  searchText: '',
  sortBy: 'byEdited',
}

renderNotes(notes, filters)

// MORE CODE
```

* We render the notes to the UI

## And here is where we create a new note
`notes-app.js`

```
// MORE CODE

document.querySelector('#create-note').addEventListener('click', (e) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  saveNotes(notes)
  location.assign(`/edit.html#${id}`)
})

// MORE CODE
```

## This works now but won't work when we are using JavaScript Modules
* Because notes is used by multiple files
  - Other files like notes-functions.js is relying on `notes` existing as in the `removeNote` function

```
// MORE CODE

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
  }
}

// MORE CODE
```

* **WARNING** We can't access `notes` once we start using JavaScript modules
* Why?
  - Remember when using JavaScript modules each file has it's own scope (meaning we can share variables between files without explicitly exporting and importing them)
* We'll need to restructure our files to make this work better

## loadNotes
* We'll create a separate file called `notes.js`
* We'll start off by defining notes as an empty array
* We'll rename getSavedNotes to a name that is better suited for what it is doing... loadNotes

`src/notes.js`

```
let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem('notes')

  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// set notes to what's in localStorage or if empty keep array empty
notes = loadNotes()
```

* The notes array will be populated when this file runs

## Houston we have a problem
* The notes file runs but it doesn't give access to other files the notes array
* We need to use import and export

### We could export the notes array as a named export or default export like we talked about before BUT THERE IS A BETTER WAY

* Here is just exporting the `notes` array

```
let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem('notes')

  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// set notes to what's in localStorage or if empty keep array empty
notes = loadNotes()

export { notes as default }
```

## Here is how we export a getter function
```
let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem('notes')

  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// Expose notes from module
const getNotes = () => notes

// set notes to what's in localStorage or if empty keep array empty
notes = loadNotes()

export { getNotes }
```

## What's the benefit of exporting a getter function instead of exporting the variable itself?
* Instead of directly exposing the notes array as a named export, what's the benefit of exposing a getter function (`getNotes = () => notes`)?
* Similarly, instead of exporting the filters variable, we are exporting getFilters

### What's the benefit of doing so?
* If you want to change how the array is accessed then you only need to change it in one spot (the getter function) instead of every single place in your code where the array is accessed
* Either way works, the getter is just better for refactoring

## Import and consume our named export
`src/index.js`

```
import { getNotes } from './notes'

console.log('index.js')
console.log(getNotes())
```

* You should see the notes array in the client console

## Restructure how we create a note
* Before we had this create note inside another function
* We are going to create a note function on its own and put it inside `notes.js`

`notes.js`

```
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

let notes = []

// MORE CODE

const createNote = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  })
}

export { getNotes, createNote }
```

* We just moved the functionality from inside our old-notes folder into a separate file that holds all stuff related to notes
* We export it
* We make sure to import the 2 new modules we'll need

`$ npm install moment uuid`

## Import and test that it works
`index.js`

```
import { getNotes, createNote } from './notes'

console.log('index.js')
console.log(getNotes())
createNote() // we first use our new method

// and we output our notes to see the new note we just created
console.log(getNotes()) 
```

* View the client console and we now see our createNote method is creating notes!

## Move saveNotes into our notes.js
`notes.js`

```
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

let notes = []

// MORE CODE

// Save the notes to localStorage
const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes))
}

export { getNotes, createNote, saveNotes }
```

* This was just a copy and paste but we don't need to pass an argument because we have access to `notes` from the top of the page

## We'll also add saveNotes() inside our createNote method
`notes.js`

* I place saveNotes before createNote

```
// MORE CODE

// Save the notes to localStorage
const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes))
}

const createNote = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  notes.push({
    id: id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  saveNotes() // add this line
}

export { getNotes, createNote, saveNotes }

// MORE CODE
```

* Now create a note and see that it saves


