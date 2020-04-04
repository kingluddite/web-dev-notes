# Integrate Dates (part 2)
* We'll wireup the dropdown to sort by the 3 choices

## We set up the options like this:
`notes-app/index.html`

```
// MORE CODE

    <select id="filter-by-select">
      <option value="byEdited">Sort by last edited</option>
      <option value="byCreated">Sort by recently created</option>
      <option value="alphabetical">Sort alphabetically</option>
    </select>

// MORE CODE
```

* byEdited will be the default sort
* We'll store this option's value in the filters option in `notes-app.js`
    - It's not really a filter but this is as good a place as any to store that default value

`notes-app.js`

```
// MORE CODE

const filters = {
  searchText: '',
  sortBy: 'byEdited',
};

// MORE CODE
```

## Update our filter-by-select event handler
* Currently we are just logging out a value
* We will change that to change the filter and re-render the notes list
    - Similar to what we did in the search-text event handler

`notes-app.js`

* The below code won't do anything because we need to create a sort method that will actually sort notes
* We don't want to put this method all inside renderNotes or that function will grow to large and unmanageable
    - Instead we create a sortNotes method and use it inside rerenderNotes method

`notes-app.js`

```
// MORE CODE

document
  .querySelector('#filter-by-select')
  .addEventListener('change', function(e) {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
  });

// MORE CODE
```

`notes-functions.js`

```
// MORE CODE

// Render application notes
const renderNotes = function(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);

// MORE CODE
```

* We only pass in the filter we want `sortBy`

`notes-functions.js`

```
// MORE CODE

// Sort your notes by one of three ways
const sortNotes = function(notes, sortBy) {
  if (sortBy === 'byEdited') {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = function(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);

// MORE CODE
```

## Test if sort works as it should
* Open notes app in 2 tabs to view at same time
* In one tab edit a note and see if that changes the order of the notes in the other tab
    - Make sure you see which note was edited last so you know which one needs to be edited to alter the sort order

## Now we need to sort the other two options
### Challenge
* Add an if statement that sorts `byCreated`

#### Challenge solution
* After adding the below code you now should see you can sort by last edited or by last created

```
// MORE CODE

// Sort your notes by one of three ways
const sortNotes = function(notes, sortBy) {
  if (sortBy === 'byEdited') {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'alphabetical') {
    return notes.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// MORE CODE
```

* Now you can sort via 3 different options


