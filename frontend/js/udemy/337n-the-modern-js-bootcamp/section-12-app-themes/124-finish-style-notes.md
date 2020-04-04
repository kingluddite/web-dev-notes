# Style Notes app (part 2)
## Center our form elements on edit.html
`edit.html`

```
// MORE CODE

        <div class="container">
          <input id="note-title" placeholder="Note title">
          <textarea id="note-body" placeholder="Enter note text"></textarea>
          <button id="remove-note">Remove note</button>
        </div>
        <!-- ./container -->

// MORE CODE
```

![centered edit form](https://i.imgur.com/Li1yK1N.png)

## Make our edit form fields look nicer
```
// MORE CODE

        <div class="container">
          <input id="note-title" class="title-input" placeholder="Note title">
          <textarea id="note-body" class="body-input" placeholder="Enter note text"></textarea>
          <button id="remove-note" class="button">Remove note</button>
        </div>
        <!-- ./container -->

// MORE CODE
```

![edit form fields styled](https://i.imgur.com/CFoZzHN.png)

```
// MORE CODE

/* Note editor */

.title-input {
    border: 1px solid #DEDFE0;
    font-size: 2rem;
    font-weight: 300;
    display: block;
    margin: 2.4rem 0;
    padding: .8rem;
    width: 100%;
}

.body-input {
    border: 1px solid #DEDFE0;
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 300;
    display: block;
    margin: 2.4rem 0;
    min-height: 15rem;
    padding: .8rem;
    width: 100%;
}

// MORE CODE
```

## How we style other buttons
* We use a modifier

`edit.html`

```
// MORE CODE

        <div class="container">
          <input id="note-title" class="title-input" placeholder="Note title">
          <textarea id="note-body" class="body-input" placeholder="Enter note text"></textarea>
          <button id="remove-note" class="button button--secondary">Remove note</button>
        </div>
        <!-- ./container -->

// MORE CODE
```

`styles.css`

```
// MORE CODE

.button {
    background: #43799c;
    border: none;
    border-bottom: 2px solid #396684;
    color: white;
    font-size: 1.4rem;
    font-weight: 300;
    padding: .8rem;
    transition: background .3s ease;
}

.button:hover {
    background: #396684;
}

.button--secondary {
    background: #888888;
    border-bottom: 2px solid #717171;
}

.button--secondary:hover {
    background: #6E6E6E;
}

// MORE CODE
```

![gray button](https://i.imgur.com/AbowQpA.png)

## Let's deal with what happens when we have not notes on the home page
* Add a message that alerts the user there are no notes and add a note to get started
* So we'll render a `P` HTML element if there are no notes with a message inside
* This change will involve JavaScript

`notes-functions.js`

```
// MORE CODE

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

// MORE CODE
```

### Styles for empty message
`styles.css`

```
// MORE CODE

.empty-message {
    text-align: center;
    margin: 3.2rem 0;
}

// MORE CODE
```

![Our empty message styled](https://i.imgur.com/to0GBBq.png)

## Style our individual notes
* They look cramped and ugly right now

![poorly styled notes](https://i.imgur.com/mxZ1P3y.png)

## Style our notes home page
* We want the hole note to be clickable so we convert it from a `div` to an `a`

`notes-functions.js`

```
// MORE CODE

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement('div')
  const textEl = document.createElement('a')
  const button = document.createElement('button')

  // Setup the remove note button
  button.textContent = 'x'
  noteEl.appendChild(button)
  button.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    renderNotes(notes, filters)
  })

// MORE CODE
```

* And make this change
* We'll change the other `a` to be a `P` element
* We don't need the button code so we'll remove that completely
* And we'll add a second 'p' to hold the status

```
// MORE CODE

// Generate the DOM structure for a note
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

  noteEl.appendChild(textEl)

  // Setup the link
  noteEl.setAttribute('href', `/edit.html#${note.id}`)
  noteEl.appendChild(statusEl)

  return noteEl
}

// MORE CODE
```

![styled notes with new structure](https://i.imgur.com/y5ZWJBk.png)

## Now we'll programmically add classes via JavaScript
`notes-functions.js`

```
// MORE CODE

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

// MORE CODE
```

### Styles for notes list
`styles.css`

```
// MORE CODE

/* Note List Item */

.list-item {
    text-decoration: none;
    color: #333333;
    background: #F7F7F7;
    border: 1px solid #dedfe0;
    margin: 1.6rem 0;
    padding: 1.6rem;
    display: block;
    transition: background .3s ease;
}

.list-item:hover {
    background: #eeeeee;
}

.list-item__title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.list-item__subtitle {
    color: #666;
    font-size: 1.4rem;
    font-weight: 300;
    font-style: italic;
}

// MORE CODE
```

![what our notes styled looks like](https://i.imgur.com/dwjIajK.png)

## Now we'll style our button and center it
`index.html`

```
// MORE CODE

        <div class="container">
          <div id="notes"></div>
          <button id="create-note" class="button">Create Note</button>  
        </div>
        <!-- /.container -->

// MORE CODE
```

![final home page](https://i.imgur.com/YuXH6my.png)

