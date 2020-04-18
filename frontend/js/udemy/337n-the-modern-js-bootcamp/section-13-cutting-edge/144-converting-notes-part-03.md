# Converting Notes (part 3)
## Remove notes
* Copy and paste into notes.js

`notes.js`

```
// MORE CODE

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
    saveNotes(); // updated
  }
}

export { getNotes, createNote, saveNotes, removeNote } // updated
```

* We keep everything the same but we save notes after we remove the note
  - This means we are only saving notes if we actually remove a note

## We'll need to grab an id from a note
`index.js`

```
import { getNotes, createNote, removeNote } from './notes'

console.log('index.js')
console.log(getNotes())
removeNote('34ed1ec1-b607-46b4-924c-77544a789668')
// createNote()
console.log(getNotes())
```

* You will see that a note is removed
* If you try to run the same code again, another note is not removed because the `id` didn't match and so the `saveNote` method does not run
* Our code is working as we planned

## sortNotes
* Move it to `notes.js`

`notes.js`

```
// MORE CODE

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'alphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return notes
  }
}

// MORE CODE
```

## Test
`index.js`

```
import { getNotes, createNote, removeNote, sortNotes } from './notes'

console.log('index.js')
console.log(getNotes())
// removeNote('34ed1ec1-b607-46b4-924c-77544a789668')
// createNote()
sortNotes('byCreated')
console.log(getNotes())
```

## updateNote
* Give us an easy way to update the notes title, body or both

### Currently we are updating code like this:
`old-notes-app/scripts/notes-edit.js`

```
// MORE CODE

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

// MORE CODE
```

### Now let's create updateNotes
* We'll create a function that takes 2 arguments
  - The `id` of the note
  - An `updates` object
    + This will take various properties that you want to update
      * We support:
        - title
        - body
* We'll use `notes.find()` to find one object in our array
  - notes.find((note) => note.id === id)
    + in the callback we have access to each note and we're are looking for a match of the id argument and the note we are checking in the loop
    + If we find a match it will get the object we are looking for, if not we'll get `undefined`

```
// MORE CODE

const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id)

  // if note not found
  if (!note) {
    // leave the function
    return
  }

  // note found
  if (typeof updates.title === 'string') {
    note.title = updates.title
  }
  saveNotes()
}

// MORE CODE
```

* Test if we can update the `title`

`index.js`

```
import {
  getNotes,
  createNote,
  removeNote,
  sortNotes,
  updateNote,
} from './notes'

console.log('index.js')
console.log(getNotes())
const updates = {
  title: 'I am a little teacup',
}
updateNote('b96a2295-4fb6-4023-a84f-e6e398cd5022', updates)
console.log(getNotes())
```

* You should see the title is getting updated
* **note** You could also just pass the object in as the 2nd argument

```
updateNote('b96a2295-4fb6-4023-a84f-e6e398cd5022', {
  title: 'I am a little teacup',
})
```

## Do the same for body
`notes.js`

```
// MORE CODE

const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id)

  // if note not found
  if (!note) {
    // leave the function
    return
  }

  // note found
  // does title exist and is a string?
  if (typeof updates.title === 'string') {
    // update title
    note.title = updates.title
    note.updatedAt = moment().value()
  }

  // does body exist and is a string?
  if (typeof updates.body === 'string') {
    // update body
    note.body = updates.body
    note.updatedAt = moment().value()
  }

  // save the note
  saveNotes()
}

export { getNotes, createNote, saveNotes, removeNote, sortNotes, updateNote }
```

## Add 3rd party validator
* [docs](https://www.npmjs.com/package/validator)

`$ npm i validator`

`notes.js`

```
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import validator from 'validator'

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
  // if (typeof updates.title === 'string') {
  if (validator.isUUID(title)) {
    // update title
    note.title = title
    note.updatedAt = moment().valueOf()
  }

  // does body exist and is a string?
  if (validator.isUUID(title)) {
    // update body
    note.body = updates.body
    note.updatedAt = moment().valueOf()
  }

  // save the note
  saveNotes()
}

export { getNotes, createNote, saveNotes, removeNote, sortNotes, updateNote }
```

## Create a file for filters
* Instead of an empty array for notes, this will be an object with default values

`filters.js`

```
import validator from 'validator'

const filters = {
  searchText: '',
  sortBy: 'byEdited',
}

// expose a function to get the filters
const getFilters = () => filters

const setFilters = (searchText, sortBy) => {
 //
}
  
export { getFilters  }
```

## A better way
* This fragment of code

```
// MORE CODE

const setFilters = (searchText, sortBy) => {
 //
}
// MORE CODE
```

* Let's modify it to this:

```
const setFilters = (updates) => {
 //
}
```

* Above gives us a way to just provide one argument that is an object where we can provide both values in side the object argument

`filters.js`

```
const filters = {
  searchText: '',
  sortBy: 'byEdited',
}

// expose a function to get the filters
const getFilters = () => filters

const setFilters = (updates) => {
  if (typeof updates.searchText === 'string') {
    // if (validator.isEmpty(updates.searchText)) {
    console.log('search')
    filters.searchText = updates.searchText
  }

  if (typeof updates.sortBy === 'string') {
    // if (validator.isUUID(updates.sortBy)) {
    console.log('sort')
    filters.sortBy = updates.sortBy
  }
}

export { getFilters, setFilters }
```

## Test it out
`index.js`

```
import {
  getNotes,
  createNote,
  removeNote,
  sortNotes,
  updateNote,
} from './notes'
import { getFilters, setFilters } from './filters'

// console.log('index.js')
// console.log(getNotes())
// let updates = {
//   title: 'I love rock and roll',
//   body: 'Put another dime in the jootbox',
// }
// updateNote('b96a2295-4fb6-4023-a84f-e6e398cd5022', updates)
// console.log(getNotes())

// check to make sure default filters are working
console.log(getFilters())
// now try to change filters
//  and update searchText and sortBy
setFilters({
  searchText: 'Yes',
  sortBy: 'byCreated',
})
console.log(getFilters())
```

* You should first see the defaults
* Then you should see both searchText and sortBy updated

## Could I use lodash to check if it is a string?
* This solution should suffice in 90% of your cases

`typeof str === 'string'`

* If you're interested in handling the String object as well (for example you expect some var from a 3rd party) then using lodash seems like a clear, simple and elegant solution
* **important** Be cautious with libraries such as `lodash` due to their size * Instead of doing

```
import _ from 'lodash'
...
_.isString(myVar)
```

* Which brings the whole huge lodash object
* Do this:

```
import { isString as _isString } from 'lodash'
...
_isString(myVar)
```

`filters.js`

```
import { isString as _isString } from 'lodash'

const filters = {
  searchText: '',
  sortBy: 'byEdited',
}

// expose a function to get the filters
const getFilters = () => filters

const setFilters = (updates) => {
  if (_isString(updates.searchText)) {
    filters.searchText = updates.searchText
  }

  if (_isString(updates.sortBy)) {
    filters.sortBy = updates.sortBy
  }
}

export { getFilters, setFilters }
```

* It will work the same
