# More with the Context API & useContext Hook (Part 2)
* Docs > Advanced Guides > Context
    - [link to Docs for Context](https://reactjs.org/docs/context.html)
        + Context provides a way to pass data through the component tree without having to pass props down manually at every level
        + That sounds like a solution to the problem we are facing
            * The NoteApp component is passing props to NoteList and that's passing props to NoteItem all because NoteItem needs access to the `removeNote` function
            * With the Context API we can fix this and in turn create an application that is much easier to work with

## Let's introduce `context`
### Create our new context
* Context will give us a vehicle to share values between our components
    - Without having to manually pass down all of those props

### notes-context.js
* We will create a new folder and file
* This file won't do a lot, it will just create the context which is just a simple function call
    - It will be up to the NoteApp component and other components to wire things up

`src/context/notes-context.js`

* This is all we need to create our context

```
import React from 'react';

const NotesContext = React.createContext();

export { NotesContext as default };
```

* Now you will see a lot of similarity with context and Redux

`NoteApp.js`

```
// MORE CODE

import NotesContext from '../context/notes-context';

const NoteApp = () => {
   
  // MORE CODE

  return (
    <NotesContext.Provider>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </NotesContext.Provider>
  );
};

export { NoteApp as default };
```

* With that in place we are providing the context value to anything inside those takes `<NotesContext.Provider>...</NotesContext.Provider>` and their children's children

## Provide a `value` property
```
// MORE CODE

  return (
    <NotesContext.Provider value={}>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </NotesContext.Provider>
  );

// MORE CODE
```

* We pass to value all the things I'd like to share
    - I want to share:
        + The notes data
        + The dispatch function (so components that need to change the notes data can do so)

`NoteApp.js`

```
// MORE CODE

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Note App</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </NotesContext.Provider>
  );

// MORE CODE
```

* After that change `notes` and dispatch are being shared via our context
* Now it will be up to the individual components to extract what they need

## Let's refactor using context for NoteList
`NoteList.js`

```
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';
import NoteItem from './NoteItem';

const NoteList = ({ removeNote }) => {
  const { notes } = useContext(NotesContext);

  return notes.map(note => {
    return <NoteItem key={note.title} note={note} removeNote={removeNote} />;
  });
};

export { NoteList as default };
```

* Test and it will work just like it did before but we don't have to manually pass props!

## Now let's work with `removeNote`
`NoteApp.js`

```
// MORE CODE

const NoteApp = () => {
  
  // MORE CODE

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Note App</h1>
      <NoteList />
      <AddNoteForm dispatch={dispatch} />
    </NotesContext.Provider>
  );
};

export { NoteApp as default };
```

`NoteList.js`

```
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';
import NoteItem from './NoteItem';

const NoteList = () => {
  const { notes } = useContext(NotesContext);

  return notes.map(note => {
    return <NoteItem key={note.title} note={note} />;
  });
};

export { NoteList as default };
```

`NoteItem.js`

* NoteItem needs access to removeNote

```
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button
        onClick={() => dispatch({ type: 'REMOVE_NOTE', title: note.title })}
      >
        remove
      </button>
    </div>
  );
};

export default NoteItem;
```

* Test it and it should work like before but now we are using Context to make our code base easier to manage and components easier to reuse

### Note - When we combine useContext with useReducer we get our own little version of Redux
* Here we are able to share our dispatch and the data in our store (just like we were able to do with the Redux library)

### Does this make Redux obsolete?
* Not necessarily
* Redux might embrace hooks to take it to the next level
* Stay tuned to see what comes next
* Hooks are popular but lots of libraries are still not using them but it will evenually come

## Challenge
* Use context for `AddNoteForm`

`NoteApp.js`

```
// MORE CODE

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Note App</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );

// MORE CODE
```

`AddNoteForm.js`

* Here we hook into `dispatch` using context

```
// MORE CODE

import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context.js';

const AddNoteForm = () => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = e => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

// MORE CODE
```

## Recap
* We use React.createContext() to create some new context
* The NotesContext is an object that needs to be accessible to the component that's providing things and the component that's consuming things (that's why we put this in its own file)

```
import React from 'react';

const NotesContext = React.createContext();

export { NotesContext as default };
```

## Here is how we access the Provider
`NoteApp.js`

* We simply access the `Provider` property on the `NotesContext` object and render it
* We provide a prop of value (it can be any value we want to share)

```
// MORE CODE

import NotesContext from '../context/notes-context';

const NoteApp = () => {

  // MORE CODE

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Note App</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );
};

export { NoteApp as default };
```

## To consume
* We use React's built in hook `useContext` to access the data and we pass in the context we created

`AddNoteForm.js`

```
// MORE CODE

import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context.js';

const AddNoteForm = () => {
  const { dispatch } = useContext(NotesContext);

// MORE CODE
```
