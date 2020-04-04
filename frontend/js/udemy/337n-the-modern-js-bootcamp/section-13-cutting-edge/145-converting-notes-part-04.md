# Converting Notes (part 4)
## Let's work from `notes-functions.js` from old app
* Most of the functions we moved into our new app
* Here is a list of functions we did not move
  - generateNoteDOM
  - renderNotes
  - generateLastEdited

## Views
* These three functions have to do with rendering things to the screen
  - generateNoteDOM
  - renderNotes
  - generateLastEdited
* A "view" is something that is added to the UI
* Let's create a file called `views.js`
* We'll add those 3 functions and export them

`views.js`

```
import moment from 'moment'
import { sortNotes } from './notes'

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('a')
  const textEl = document.createElement('p')
  const statusEl = document.createElement('p')

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = 'Unnamed note'
  }

  noteEl.classList.add('list-item__title')
  noteEl.appendChild(textEl)

  // Setup the link
  noteEl.setAttribute('href', `/edit.html#${note.id}`)
  noteEl.classList.add('list-item')

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl)

  return noteEl
}

// Render application notes
const renderNotes = (notes, filters) => {
  // store notes element as we use it more than once
  const notesEl = document.querySelector('#notes')
  notes = sortNotes(notes, filters.sortBy)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  )

  // empty notes element
  notesEl.innerHTML = ''

  // are there any notes?
  if (filteredNotes.length > 0) {
    // if there are notes, filter through them
    filteredNotes.forEach((note) => {
      // create a note
      const noteEl = generateNoteDOM(note)
      // add the note to the notels element
      notesEl.appendChild(noteEl)
    })
  } else {
    // no notes so create a paragraph element
    const emptyMessage = document.createElement('p')
    // set the text to alert the user there are not notes
    emptyMessage.textContent = 'There are no notes. Please add one to begin'
    // add a class
    emptyMessage.classList.add('empty-message')
    // add the paragraph of text to the notes element
    notesEl.appendChild(emptyMessage)
  }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, generateLastEdited }
```

## We'll alter renderNotes slightly
* We don't need to pass it arguments (notes and filters) as we can gain access to them now

```
// MORE CODE

// Render application notes
const renderNotes = () => {
  // store notes element as we use it more than once
  const notesEl = document.querySelector('#notes');
  const filters = getFilters();
  notes = sortNotes(notes, filters.sortBy)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  )

  // empty notes element
  notesEl.innerHTML = ''

  // are there any notes?
  if (filteredNotes.length > 0) {
    // if there are notes, filter through them
    filteredNotes.forEach((note) => {
      // create a note
      const noteEl = generateNoteDOM(note)
      // add the note to the notels element
      notesEl.appendChild(noteEl)
    })
  } else {
    // no notes so create a paragraph element
    const emptyMessage = document.createElement('p')
    // set the text to alert the user there are not notes
    emptyMessage.textContent = 'There are no notes. Please add one to begin'
    // add a class
    emptyMessage.classList.add('empty-message')
    // add the paragraph of text to the notes element
    notesEl.appendChild(emptyMessage)
  }
}
// MORE CODE
```

## sortNotes
* We altered this code to only take one argument so we update this method signature

### From this:

```
// MORE CODE

  notes = sortNotes(notes, filters.sortBy)

// MORE CODE
```

### To this:

```
// MORE CODE

  notes = sortNotes(filters.sortBy)

// MORE CODE
```

## Import them both to our file
`views.js`

```
import moment from 'moment'
import { sortNotes } from './notes'
import { getFilters } from './filters'

// MORE CODE
```

## renderNotes modifications
* We define notes

```
// MORE CODE

const renderNotes = () => {
  // store notes element as we use it more than once
  const notesEl = document.querySelector('#notes')
  const filters = getFilters()
  const notes = sortNotes(filters.sortBy)

// MORE CODE
```

## Final views.js
```
// MORE CODE

import moment from 'moment'
import { sortNotes } from './notes'
import { getFilters } from './filters'

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('a')
  const textEl = document.createElement('p')
  const statusEl = document.createElement('p')

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title
  } else {
    textEl.textContent = 'Unnamed note'
  }

  noteEl.classList.add('list-item__title')
  noteEl.appendChild(textEl)

  // Setup the link
  noteEl.setAttribute('href', `/edit-note.html#${note.id}`)
  noteEl.classList.add('list-item')

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl)

  return noteEl
}

// Render application notes
const renderNotes = () => {
  // store notes element as we use it more than once
  const notesEl = document.querySelector('#notes')
  const filters = getFilters()
  const notes = sortNotes(filters.sortBy)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  )

  // empty notes element
  notesEl.innerHTML = ''

  // are there any notes?
  if (filteredNotes.length > 0) {
    // if there are notes, filter through them
    filteredNotes.forEach((note) => {
      // create a note
      const noteEl = generateNoteDOM(note)
      // add the note to the notels element
      notesEl.appendChild(noteEl)
    })
  } else {
    // no notes so create a paragraph element
    const emptyMessage = document.createElement('p')
    // set the text to alert the user there are not notes
    emptyMessage.textContent = 'There are no notes. Please add one to begin'
    // add a class
    emptyMessage.classList.add('empty-message')
    // add the paragraph of text to the notes element
    notesEl.appendChild(emptyMessage)
  }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, generateLastEdited }

// MORE CODE
```

## Now let's work on index.js of our notes app 
* Import `notes-app.js` code into `index.js`

`index.js`

```
'use strict'

let notes = getSavedNotes()

const filters = {
  searchText: '',
  sortBy: 'byEdited',
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
  // const id = uuidv4()
  // const timestamp = moment().valueOf()
  //
  // notes.push({
  //   id: id,
  //   title: '',
  //   body: '',
  //   createdAt: timestamp,
  //   updatedAt: timestamp,
  // })
  saveNotes(notes)
  location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, filters)
  }
})
```

* We can remote `use strict`
* We can remove `getNotes` and `getFilters`
* We set up `renderNotes()` to fetch the data it needs to render the notes
  - We remove all arguments from all instances of `renderNotes()`

`index.js`

```
renderNotes()

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

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes()
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes()
  }
})
```

* We need to import `renderNotes`

`index.js`

```
// MORE CODE

import { renderNotes } from './views.js'

// MORE CODE
```

## Create note
* We only want stuff for creating note inside createNote
* We leave "location.assign(`/edit.html#${id}`)" where it is

`index.js`

```
renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
  createNote()
  location.assign(`/edit.html#${id}`)
})

// MORE CODE
```

## What about the `id` createNote expects?
* Easy we just alter our createNote() method to return the `id`
* And we assign it to a variable from our `createNote()` method

`index.js`

```
// MORE CODE

document.querySelector('#create-note').addEventListener('click', (e) => {
  const id = createNote(); // here we assign the "id"

  location.assign(`/edit-note.html#${id}`)
})

// MORE CODE
```

`notes.js`

```
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
  saveNotes()
  return id; // here we return the id
}

// MORE CODE
```

## setFilters
* We update these to use our new methods

```
// MORE CODE

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

// MORE CODE
```

* And we import our methods and use them like this:

```
// MORE CODE

import { getFilters, setFilters } from './filters'

// MORE CODE

document.querySelector('#search-text').addEventListener('input', (e) => {
  // filters.searchText = e.target.value
  setFilters({
    searchText: e.target.value
  })
  renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value
  })
  // filters.sortBy = e.target.value
  renderNotes(notes, filters)
})

// MORE CODE
```

## Finally our storage line
* We can completely remove this fragment of code
  - `notes = JSON.parse(e.newValue)` is redundant
    + notes is global
    + renderNotes is going to get the latest data anyway
  - The `storage` helps us keep our notes synced across tabs in the browser

```
// MORE CODE

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    renderNotes(notes, filters)
  }
})

// MORE CODE
```

* To this:

```
// MORE CODE

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    // notes = JSON.parse(e.newValue)
    renderNotes()
  }
})

// MORE CODE
```

## Remove imports we are not using
* Nothing wrong with importing stuff you are not using but it is a best practice to remove anything you are not using
* Here is the final:

`index.js`

```
import { createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
  const id = createNote()
  location.assign(`/edit-note.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value,
  })
  renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value,
  })
  renderNotes()
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    renderNotes()
  }
})
```

## Test index page
* You should be able to filter notes
* You should be able to sort notes
* You should see the notes listed
* Click `Create Note` and you should see a new note is created and the URL will say something similar to:
  - `http://localhost:8080/edit-note.html#5f8d24a6-96dd-43bc-9798-d50852b1a369`

## Wire up note-edit.html
* Copy `notes-edit.html` from old site and paste into `edit.js` in webpack notes app

`notes-edit.js`

```
'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})
```

* We'll delete `"use strict"`
* We keep our `const` variables

## What about this code fragment?
* Read comments to see what this code does

`notes-edit.js`

```
// MORE CODE

// grab all the notes
let notes = getSavedNotes()
// find the note with a matching "id"
let note = notes.find((note) => note.id === noteId)

// if no note redirect to home page
if (!note) {
    location.assign('/index.html')
}

// set the note title and body values to be what is inside the note
titleElement.value = note.title
bodyElement.value = note.body
// automatically set the date
dateElement.textContent = generateLastEdited(note.updatedAt)

// MORE CODE
```

* And this code is duplicated below

`notes-edit.html`

```
// MORE CODE

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})
```

* When you are trying to do the same use case twice it is time to convert it to a function
* Where will this function go?
  - Since it is pertaining to the UI, we'll put it inside `views.js`
  - We'll call it `initializeEditPage`

## We need access to `noteId`
`views.js`

```
// MORE CODE

const initializeEditPage = (noteId) => { // pass in noteId as arg
  let notes = getNotes()
  let note = notes.find((note) => note.id === noteId)

  if (!note) {
    location.assign('/index.html')
  }

  titleElement.value = note.title
  bodyElement.value = note.body
  dateElement.textContent = generateLastEdited(note.updatedAt)
  return note
}

// MORE CODE
```

* We also need access to the elements on the page inside the function

`views.js`

```
// MORE CODE

const initializeEditPage = (noteId) => {
  const titleElement = document.querySelector('#note-title')
  const bodyElement = document.querySelector('#note-body')
  const dateElement = document.querySelector('#last-edited')

// MORE CODE
```

* We also need to grab the `notes` with our `getNotes()` function
* And we need to import it

`views.js`

```
import moment from 'moment'
import { sortNotes, getNotes } from './notes'; // import getNotes

// MORE CODE

const initializeEditPage = (noteId) => {
  const titleElement = document.querySelector('#note-title')
  const bodyElement = document.querySelector('#note-body')
  const dateElement = document.querySelector('#last-edited')
  let notes = getNotes()

// MORE CODE
```

* Since we are never reassigning `notes` or `note` we change them from `let`

`views.js`

```
// MORE CODE

  let notes = getNotes()
  let note = notes.find((note) => note.id === noteId)

// MORE CODE
```

* To `const`

```
// MORE CODE

  const notes = getNotes()
  const note = notes.find((note) => note.id === noteId)

// MORE CODE
```

## Now we'll use our new method inside `edit.js`
`edit.js`

```
// MORE CODE

import moment from 'moment'
import { getNotes, removeNote, saveNotes } from './notes'
import { initializeEditPage, generateLastEdited } from './views'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

// MORE CODE

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initializeEditPage(noteId)
  }
})
```

## Problem with updates
`edit.js`

```
// MORE CODE

titleElement.addEventListener('input', (e) => {
  updateNote(note.id, {
    title: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt); 
})

bodyElement.addEventListener('input', (e) => {
  updateNote(note.id, {
    body: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt); 
})

// MORE CODE
```

* The above code has a problem in that we don't have access to `note`
* To get access we first have to alter the implementation of our updateNote method by returning the `note`

`notes.js`

```
// MORE CODE

const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id)
  const title = updates.title

  // if note not found
  if (!note) {
    // leave the function
    return
  }

  // note found
  // does title exist and is a string?
  if (typeof updates.title === 'string') {
    // update title
    note.title = title
    note.updatedAt = moment().valueOf()
  }

  // does body exist and is a string?
  if (typeof updates.body === 'string') {
    // update body
    note.body = updates.body
    note.updatedAt = moment().valueOf()
  }

  // save the note
  saveNotes()
  return note; // here we return the note
}
```

* Now we can set the returned value of calling this method to a variable and we'll have access to the `note`

`edit.js`

```
// MORE CODE

titleElement.addEventListener('input', (e) => {
  const note = updateNote(note.id, {
    title: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
  const note = updateNote(note.id, {
    body: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt)
})

// MORE CODE
```

## Remove a note
* Easy modification
* We just need to call our removeNote (import it) and pass it the `note.id`

`edit.js`

```
// MORE CODE

removeElement.addEventListener('click', (e) => {
  removeNote(note.id)
  location.assign('/index.html')
})

// MORE CODE
```

## Here is the final code:
`edit.js`

```
import moment from 'moment'
import { getNotes, removeNote, saveNotes, updateNote } from './notes'
import { initializeEditPage, generateLastEdited } from './views'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
  const note = updateNote(note.id, {
    title: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
  const note = updateNote(note.id, {
    body: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt)
})

removeElement.addEventListener('click', (e) => {
  removeNote(note.id)
  location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initializeEditPage(noteId)
  }
})
```

## Small fix
* We need to make sure we import `generatedLastEdited`
* We get ReferenceError: note is not defined
* Woops we just need to match it with what we called `noteId`

`edit.js`

```
// MORE CODE

removeElement.addEventListener('click', (e) => {
  removeNote(noteId)
  location.assign('/index.html')
})

// MORE CODE
```

* And update to `nodeId` again for our updateNote calls

`edit.js`

```
// MORE CODE

titleElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    body: e.target.value,
  })
  dateElement.textContent = generatedLastEdited(note.updatedAt)
})

// MORE CODE
```

* Also need to fix the spelling of `generateLastEdited` in edit.js

`edit.js`

```
// MORE CODE

titleElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value,
  })
  dateElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    body: e.target.value,
  })
  dateElement.textContent = generateLastEdited(note.updatedAt)
})

// MORE CODE
```

## You should now be able to test that the notes app is fully functional
* Delete `bundle.js` in `public/assets/js/bundle.js`
* Regenerate it

`$ npm run build`

* What do we get?
  - We get our bundle files (one for each HTML file)
    + edit-bundle.js
    + index-bundle.js
  - We also get source maps files too
    + edit-bundle.js.map
    + index-bundle.js.map
