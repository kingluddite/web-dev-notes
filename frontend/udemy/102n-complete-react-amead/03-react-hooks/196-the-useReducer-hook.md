# The useReducer Hook
* Here is another built-in hook for React called `useReducer`
* When state was a simple structure it was easy to manipulate
* But with more complex state we had to write more complex code
    - If we are managing an array of objects
        + Each object represents something like a note
        + We have to add code for adding new notes
        + Filtering notes
        + As our code grows we add more and more features like this into our components... this is not ideal

## Advantages of using Redux
* We would get a simpler way to describe those complex changes by defining reducers
* We also get the ability to not have to manually pass props around and around
* This is how our notes app is passing props

`index.js`

```
// MORE CODE

          <NoteItem key={note.title} note={note} removeNote={removeNote} />

// MORE CODE
```

* It would be nice if our `NoteItem` component had access to that data `note.title`, `note` and `removeNote` similar to what we saw when we used the `connect()` function provided by **Redux**

## Recreate connect() behavior without Redux
* Does this make Redux obsolete? No
    - But this tool may come in handy if you need just a simpler solution than Redux
    - In the future it is likely that Redux will include `hooks` of its own allowing you to use an API similar to what is described here

### import the `useReducer` hook
`index.js`

```
// MORE CODE

import React, { useState, useEffect, useReducer} from 'react';

// MORE CODE
```

#### Define first!
* We can use `useReducer` like we used `useState` and `useEffect` but the one difference is we first need to define `useReducer` before we use it
    - This reducer function will look identical to the type of reducers we are already used to creating with Redux

`index.js`

* notes:
    - The `state` is an array of notes
    - `action` contains information about the information being performed

```
import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import NoteItem from './NoteItem';

const notesReducer = (state, action) => {
  //
};

const NoteApp = () => {

// MORE CODE
```

* Now all the stuff inside `notesReducer` will look super similar to what we did inside Redux

`index.js`

```
// MORE CODE

import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import NoteItem from './NoteItem';

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    default:
      return state;
  }
};

const NoteApp = () => {

// MORE CODE
```

* Now that our reducer is in place let's use it below:
    - Make sure your app is running with 2 sample notes
    - If we don't have notes when we try to use the reducer as right now it doesn't support the ability to add a new note
    - We'll comment out existing code and swap it with this:
* `useReducer`, like `useState` returns an array with 2 very important things on it
    - 1. Your `state` (you can name this whatever you want - we'll name it `notes`)
    - 2. And a `dispatch` function (you can name it whatever you want)

## Comment out setNotes
* Currently it doesn't exist

`index.js`

```
// MORE CODE

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = e => {
    e.preventDefault();
    // setNotes([...notes, { title, body }]);
    setTitle('');
    setBody('');
  };

  const removeNote = title => {
    //
    // setNotes(notes.filter(note => note.title !== title));
  };

  useEffect(() => {
    console.log('getItem');
    const notesData = JSON.parse(localStorage.getItem('notes'));

    if (notesData) {
      //
      // setNotes(notesData);
    }
  }, []);

// MORE CODE
```

* Now we'll use `dispatch()`
    - It will look very similar to what we did with Redux

`index.js`

```
// MORE CODE

  useEffect(() => {
    console.log('getItem');
    const notesData = JSON.parse(localStorage.getItem('notes'));

    if (notesData) {
      dispatch({ type: 'POPULATE_NOTES', notes: notesData });
      // setNotes(notesData);
    }
  }, []);

// MORE CODE
```

* We can simplify our code by refactoring like this:

```
// MORE CODE

  useEffect(() => {
    console.log('getItem');
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
      // setNotes(notesData);
    }
  }, []);

// MORE CODE
```

### When I call dispatch what happens?
1. It take our notes
2. It takes our type `POPULATE_NOTES`
3. It will pass that through our reducer
4. And hopefully what we get is a list of notes showing up

`index.js`

```
// MORE CODE

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    default:
      return state;
  }
};

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = e => {
    e.preventDefault();
    // setNotes([...notes, { title, body }]);
    setTitle('');
    setBody('');
  };

  const removeNote = title => {
    //
    // setNotes(notes.filter(note => note.title !== title));
  };

  useEffect(() => {
    console.log('getItem');
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
      // setNotes(notesData);
    }
  }, []);

// MORE CODE
```

* You should see that your notes are still listed
* But we can't add or remove notes yet

## Now we need to add 2 actions
* add a note
* remove a note

### Challenge
* Goal: Setup support for adding and removing notes

1. Setup and dispatch an ADD_NOTE action
2. Setup and dispatch a REMOVE_NOTE action
3. Test your work

`index.js`

```
// MORE CODE

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [
        ...state,
        { title: action.title, body: action.body }
      ]
    case 'REMOVE_NOTE':
      return state.filter(note => note.title !== action.title);
    default:
      return state;
  }
};

// MORE CODE
```

* Now we'll dispatch and add a note

```
// MORE CODE

  const addNote = e => {
    e.preventDefault();
    // setNotes([...notes, { title, body }]);
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

// MORE CODE
```

* Test it out
* Add a note and it should work
* Refresh the page and the new note should remain

## Now we'll dispatch the remove note action here:
```
// MORE CODE

  const removeNote = title => {
    dispatch({ type: 'REMOVE_NOTE', title });
    // setNotes(notes.filter(note => note.title !== title));
  };

// MORE CODE
```

* Test it out
* Click button to remove a note
* It should disappear
* Refresh the page and you should only have 2 notes remaining
* The good news is we no longer need the component managing all of that code

## Recap
* Now with React hooks we have a simple way to manage component state
* **tip** If its really easy state we can use `useState()`
* If we find it is a little more complex we can switch over to use `useReducer()` - this gives us the ability to remove that logic from our component and store it in a separate function
    - This makes our component easier to manage
    - And makes the Reducer easier to reuse

## Note
* `useState` uses `useReducer` behind the scenes
    - So useState depends on useReducer to even work
    - People often get confused about the two because in the past we did have support for state so you can understand that is available in a different way
    - But in the past React had no support for a reducer and now it does
    - When we dispatch actions and the state changes our component rerenders with the new data (in this case it rerenders with the new notes)

## Next - The Context API
* Redux saved us from manually having to pass all our props between components
* The same is true when we have to use the context API 
