# Render filtered data
* We will render our data and filter it "on the fly" (meaning that as the search field changes, we'll update what gets shown to the user)

## Currently
* We do not render our Array of Notes objects at all
* The data we used before was just from a static set of paragraph tags
    - **note** The todo app does correctly render the todos array of objects
    - But we have a problem: The todo app only does it once, we need a way for it to render our data to the UI over and over again
    - **solution** To do something multiple times over and over again? We put it in a function and we call that function over and over again

## Our setup
* We'll need to set up a filters object
    - We'll model this object to just have a property of `searchText` that is set to a value of an empty string (that string value will change over time)

`script.js`

```
// MORE CODE

const filters = {
  searchText: '',
};

// MORE CODE
```

* We need to find a way to render the data above `notes` array of objects, but also taking into account `filters` object below it
    - To accomplish this:
        + We need to first call this new function right away to make sure data shows up (this is the initialize script)
        + Then we'll also need to call this function every single time this event fires
`script.js`

```
const notes = [
  {
    title: 'Go to gym',
    body: 'Work out shoulders',
  },
  {
    title: 'Go to gym',
    body: 'work out arms',
  },
  {
    title: 'Go to school',
    body: 'Teach a good class',
  },
  {
    title: 'do homework',
    body: 'Write lots of JavaScript',
  },
];

const filters = {
  searchText: '',
};

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  console.log(filteredNotes);
};

document.querySelector('#search-text').addEventListener('input', function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

// MORE CODE
```

* We deal with case sensitive searches using `toLowerCase()` string method
* We create a function that will take in notes and filters and filter out all note titles that match the filtered searchText (we set that property value every time we fill out the search input text field because we every time there is a change in input we call the renderNotes again and pass it the notes and filters that have updated from the previous function call)

## test it out
* If you type `homework` in the input you will only see 1 item
* If you type `Go` or `go` you will see 3 items in client console

## Now we need to render our items
* We currently only see them in the console
* We can use a forEach to loop through the matched items and render them to the page

`script.js`

```
// MORE CODE

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // console.log(filteredNotes);
  filteredNotes.forEach(function(note) {
    const noteEl = document.createElement('p');
    noteEl.textContent = note.title;
    document.querySelector('body').appendChild(noteEl);
  });
};

// MORE CODE
```

## That works but...
* As we search for more items, we append duplicates to our list
* We don't want this
* We need to clear all our items before each search
* We also need to add a `div` element and give it a name
* We also need to use `.innerHTML` to clear or wipe all the content in the element before each search

### First here's our HTML with a notes div container
`index.html`

```
// MORE CODE

  <body>
    <h1>Notes App</h1>
    <h2>Take notes whenever you want</h2>
    <input id="search-text" placeholder="Search Notes" type="text" />
    
    <div id="notes"></div>
   <!-- notes container  -->
    <button id="create-note">Create Note</button>

// MORE CODE
```

* And now here is our new JavaScript

`script.js`

```
// MORE CODE

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    // find if note contains filter text
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  // clear all notes from last search
  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(function(note) {
    const noteEl = document.createElement('p');
    noteEl.textContent = note.title;
    document.querySelector('#notes').appendChild(noteEl);
  });
};

// MORE CODE
```

* **note** We are no targeting our new `#notes` container

## Recap
* We set up a `div` (a `<div></div>` is a content divider)
* We target this `div` with an id of `notes`
* We created a `renderNotes` function
    - This function takes all of the notes and the filters and it figures out which one matches the filters
    - We clear all previously rendered notes using `innerHTML` and setting it to an empty string
    - The last thing we do is add just the filtered notes in
* Don't forget we called `renderNotes()` once globally so right when the script.js file runs initially we make sure something shows up on the page
    - Then we call `renderNotes()` again whenever the end user interacts with our search box and changes the filter

## Next
* Challenge to do same thing for the Todo app 
